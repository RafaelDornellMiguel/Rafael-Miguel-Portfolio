/**
 * Fonte única de verdade do conteúdo institucional.
 * Editar o site = editar dado, não JSX.
 */

export const site = {
  url: "https://rafael-miguel-portfolio.vercel.app",
  name: "Rafael Dornell Miguel",
  role: "Engenheiro de Dados & Desenvolvedor",
  title: "Rafael Dornell Miguel | Engenheiro de Dados & Desenvolvedor",
  description:
    "Engenheiro de Dados e Desenvolvedor de Software especializado em ETL, pipelines de dados, Python e SQL. Transformo dados em sistemas e decisões.",
  keywords: [
    "Rafael Dornell Miguel",
    "Engenheiro de Dados",
    "ETL",
    "Python",
    "SQL",
    "Power BI",
    "Automação",
    "Desenvolvedor",
  ],
  profileImage: "/img/rafael-profile.jpg.png",
  /** Coloque o PDF em public/ e aponte aqui (ex.: "/curriculo-rafael-miguel.pdf")
   *  para o botão de download aparecer. Null = botão oculto, sem link quebrado. */
  resumeUrl: null as string | null,
  whatsappNumber: "5547996825170",
  phoneDisplay: "+55 47 99682-5170",
  socials: {
    linkedin: "https://www.linkedin.com/in/rafael-dornell-miguel/",
    github: "https://github.com/RafaelDornellMiguel",
    whatsapp: "https://wa.me/5547996825170",
  },
  stats: [
    { value: "2+", labelKey: "hero.statsYears" },
    { value: "8+", labelKey: "hero.statsProjects" },
    { value: "13+", labelKey: "hero.statsClients" },
  ],
  aboutSkills: [
    "SQL Server",
    "Python",
    "Power BI",
    "Flask / Pandas",
    "ETL",
    "Automação",
    "TypeScript",
    "PostgreSQL",
  ],
} as const;

export const newsTags = [
  { id: "technology", label: "Tecnologia" },
  { id: "data", label: "Dados" },
  { id: "python", label: "Python" },
  { id: "sql", label: "SQL" },
  { id: "etl", label: "ETL" },
] as const;
