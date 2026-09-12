import Head from "next/head";

import { site } from "@/content/site";

type Props = {
  title?: string;
  description?: string;
  path?: string;
  /** JSON-LD só na home: schema de Person + LocalBusiness. */
  withStructuredData?: boolean;
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}${site.profileImage}`,
  description: site.description,
  jobTitle: site.role,
  sameAs: [site.socials.linkedin, site.socials.github, site.socials.whatsapp],
  knowsAbout: [
    "ETL",
    "Power BI",
    "Python",
    "SQL",
    "Engenharia de Dados",
    "Automação",
    "Desenvolvimento Web",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Engenheiro de Dados",
    description: "Especialista em ETL, pipelines de dados e inteligência de negócios",
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${site.name} — Consultoria em Dados`,
  url: site.url,
  image: `${site.url}${site.profileImage}`,
  description:
    "Soluções corporativas de dados e desenvolvimento com especialidade em ETL, automação e engenharia de dados.",
  telephone: site.phoneDisplay,
  areaServed: "BR",
  priceRange: "$$",
};

export default function Seo({ title, description, path = "/", withStructuredData }: Props) {
  const pageTitle = title ?? site.title;
  const pageDescription = description ?? site.description;
  const canonical = `${site.url}${path}`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={site.keywords.join(", ")} />
      <meta name="author" content={site.name} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${site.url}${site.profileImage}`} />
      <meta name="twitter:card" content="summary_large_image" />

      {withStructuredData && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
          />
        </>
      )}
    </Head>
  );
}
