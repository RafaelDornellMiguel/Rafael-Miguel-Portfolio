import { z } from "zod";

import { ValidationError } from "@/lib/api/errors";
import { createApiHandler, getClientIp } from "@/lib/api/handler";
import { enforceRateLimit } from "@/lib/api/rateLimit";
import { insertContact } from "@/lib/db/client";
import { services } from "@/content/services";

const serviceIds = services.map((service) => service.id) as [string, ...string[]];

const bodySchema = z.object({
  service: z.enum(serviceIds),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(8).max(20),
  message: z.string().trim().min(10).max(2_000),
});

export const config = {
  api: {
    bodyParser: { sizeLimit: "8kb" },
  },
};

export default createApiHandler({
  POST: async (req, res) => {
    enforceRateLimit({
      key: `contact:${getClientIp(req)}`,
      limit: 3,
      windowMs: 10 * 60_000,
      errorLocationCode: "API:V1:CONTACT:RATE_LIMIT_EXCEEDED",
    });

    const parsed = bodySchema.safeParse(req.body);

    if (!parsed.success) {
      throw new ValidationError({
        message: "Os dados enviados não passaram na validação.",
        action:
          "Informe nome (2–120), WhatsApp (8–20) e uma descrição com pelo menos 10 caracteres.",
        errorLocationCode: "API:V1:CONTACT:INVALID_BODY",
        internalContext: { issues: parsed.error.issues.map((issue) => issue.path.join(".")) },
      });
    }

    const { service, name, phone, message } = parsed.data;
    const digits = phone.replace(/\D/g, "");
    const serviceLabel = services.find((item) => item.id === service)?.title ?? service;

    // O canal primário do lead é o WhatsApp; o banco é registro secundário.
    // Banco fora do ar degrada para persisted:false — o contato não se perde.
    let persisted = false;
    try {
      persisted = await insertContact({
        name,
        // Coluna legada NOT NULL: o formulário não pede e-mail, então não inventamos um contato real.
        email: `${digits || "sem-telefone"}@whatsapp.local`,
        phone: phone.slice(0, 20),
        subject: `Interesse em: ${serviceLabel}`,
        message,
      });
    } catch (cause) {
      console.error(
        JSON.stringify({
          level: "error",
          scope: "API:V1:CONTACT",
          error_location_code: "API:V1:CONTACT:PERSIST_FAILED",
          message: cause instanceof Error ? cause.message : "erro desconhecido",
        }),
      );
    }

    // Log de auditoria sem dado pessoal: só o suficiente para medir o funil.
    console.info(
      JSON.stringify({
        level: "info",
        scope: "API:V1:CONTACT",
        event: "lead_received",
        service,
        persisted,
      }),
    );

    res.status(201).json({
      status: "received",
      service,
      persisted,
    });
  },
});
