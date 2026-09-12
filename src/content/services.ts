export type Service = {
  id: string;
  number: string;
  /** Ícone resolvido no componente — dado não carrega JSX. */
  icon: "chart" | "database" | "code" | "bulb";
  title: string;
  /** Rótulo curto para pills do formulário. */
  shortLabel: string;
  subtitle: string;
  modalTitle: string;
  price: string;
  time: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "etl",
    number: "01",
    icon: "chart",
    title: "ETL & BI",
    shortLabel: "ETL & BI",
    subtitle: "Pipelines automatizados e dashboards em tempo real. Dados brutos → decisões.",
    modalTitle: "ETL & Power BI",
    price: "R$ 2.500 – R$ 8.000",
    time: "15–30 dias",
    description:
      "Construção de pipelines automatizados que coletam dados de diversas fontes (CSV, SQL, Firebird) e entregam dashboards em tempo real. Integração com Power BI, Google Data Studio e ferramentas BI sob medida.",
  },
  {
    id: "dados",
    number: "02",
    icon: "database",
    title: "Eng. de Dados",
    shortLabel: "Eng. Dados",
    subtitle: "Arquitetura de bancos relacionais escaláveis e migração segura de dados.",
    modalTitle: "Engenharia de Dados",
    price: "Sob Consulta",
    time: "Mensal / Projeto",
    description:
      "Modelagem de bancos de dados escaláveis, migração entre sistemas (PostgreSQL, SQL Server, Firebird) e manutenção de integridade referencial em ambientes críticos.",
  },
  {
    id: "backend",
    number: "03",
    icon: "code",
    title: "Desenvolvimento de Sistemas",
    shortLabel: "Backend",
    subtitle: "APIs, microsserviços e automação de fluxos em Python e TypeScript.",
    modalTitle: "Dev Backend & Sistemas",
    price: "R$ 3.000+",
    time: "20–45 dias",
    description:
      "Desenvolvimento de APIs REST e microsserviços para automação interna, integrações entre sistemas e automação de processos operacionais com Python, Flask e Node.js.",
  },
  {
    id: "consultoria",
    number: "04",
    icon: "bulb",
    title: "Consultoria",
    shortLabel: "Consultoria",
    subtitle: "Diagnóstico técnico e planejamento estratégico de infraestrutura de dados.",
    modalTitle: "Consultoria TI",
    price: "R$ 350/h",
    time: "Agendado",
    description:
      "Análise da infraestrutura de dados atual, identificação de gargalos, proposta de arquitetura e roadmap de implementação. Ideal para times que precisam de direção técnica sênior.",
  },
];

/** Opções do formulário de contato — derivadas dos serviços, sem duplicar dado. */
export const serviceOptions = services.map((service) => ({
  value: service.id,
  label: service.shortLabel,
}));
