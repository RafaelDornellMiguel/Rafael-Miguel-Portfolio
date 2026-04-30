import { Helmet } from 'react-helmet-async';

export default function StructuredData() {
  const schemaOrgData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rafael Dornell Miguel',
    url: 'https://rafael-miguel-portfolio.vercel.app',
    image: 'https://rafael-miguel-portfolio.vercel.app/img/rafael-profile.jpg.png',
    description: 'Desenvolvedor de Software e Engenheiro de Dados especializado em ETL, automação de processos e desenvolvimento com Python, SQL e Power BI.',
    jobTitle: 'Desenvolvedor de Software & Engenheiro de Dados',
    worksFor: {
      '@type': 'Organization',
      name: 'Rafael Dornell Miguel - Consultoria em Tecnologia'
    },
    sameAs: [
      'https://www.linkedin.com/in/rafael-dornell-miguel',
      'https://github.com/RafaelDornellMiguel',
      'https://wa.me/5547996825170'
    ],
    knowsAbout: [
      'ETL',
      'Power BI',
      'Python',
      'SQL',
      'Engenharia de Dados',
      'Automação',
      'Desenvolvimento Web',
      'Consultoria Tecnológica',
      'Dados',
      'Tecnologia'
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Engenheiro de Dados',
      description: 'Especialista em ETL, pipelines de dados e inteligência de negócios'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Orçamento',
      telephone: '+55 47 99682-5170',
      url: 'https://wa.me/5547996825170'
    }
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Rafael Dornell Miguel - Portfólio',
    url: 'https://rafael-miguel-portfolio.vercel.app',
    image: 'https://rafael-miguel-portfolio.vercel.app/img/rafael-profile.jpg.png',
    description: 'Soluções corporativas de dados e desenvolvimento com especialidade em ETL, automação e engenharia de dados.',
    telephone: '+55 47 99682-5170',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Orçamento',
      telephone: '+55 47 99682-5170',
      url: 'https://wa.me/5547996825170'
    },
    areaServed: 'BR',
    priceRange: '$$'
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://rafael-miguel-portfolio.vercel.app'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sobre',
        item: 'https://rafael-miguel-portfolio.vercel.app/#about'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Serviços',
        item: 'https://rafael-miguel-portfolio.vercel.app/#services'
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Projetos',
        item: 'https://rafael-miguel-portfolio.vercel.app/#work'
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Currículo',
        item: 'https://rafael-miguel-portfolio.vercel.app/#curriculo'
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Contato',
        item: 'https://rafael-miguel-portfolio.vercel.app/#contato'
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}
