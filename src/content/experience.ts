export type Experience = {
  year: string;
  badge?: string;
  title: string;
  company: string;
  description: string;
};

export const experiences: Experience[] = [
  {
    year: "2026–",
    badge: "Atual",
    title: "Analista de Implantação & Integração de Dados",
    company: "Multiplier Tecnologia",
    description:
      "Implantação de soluções SaaS, análise e validação de dados relacionados à implementação de softwares e serviços da plataforma. Integrações técnicas em parceria com equipes de desenvolvimento, organização de fluxos operacionais, suporte técnico especializado, controle de chamados e processos de pós-venda. Responsável por: integração de sistemas, APIs REST, automação de processos, estruturação e validação de dados, gerenciamento de banco de dados, implantação de software, troubleshooting técnico e onboarding SaaS.",
  },
  {
    year: "2022–",
    title: "Desenvolvedor & Analista de Dados (ETL)",
    company: "Clinicorp Solution",
    description:
      "Desenvolvimento de pipelines ETL e automação de processos com Python e SQL. QA técnico em migrações críticas entre PostgreSQL, SQL Server e Firebird. Criação de ferramentas internas que reduziram significativamente o esforço operacional e aumentaram a eficiência da equipe.",
  },
];

export const coreSkills = [
  { label: "Python", level: 90 },
  { label: "SQL / PostgreSQL", level: 88 },
  { label: "ETL & Pipelines", level: 85 },
  { label: "APIs REST", level: 82 },
  { label: "Integração de Dados", level: 83 },
  { label: "Power BI", level: 80 },
  { label: "Flask / Pandas", level: 78 },
  { label: "TypeScript / Node.js", level: 72 },
];

export const additionalSkills = [
  "Postman",
  "Supabase",
  "Firebase",
  "Airflow",
  "Automação de Processos",
  "Implantação SaaS",
  "Troubleshooting Técnico",
  "Validação de Dados",
  "Integração de Sistemas",
  "Rust (aprendendo)",
  "PMI / Gestão",
  "Onboarding Técnico",
];
