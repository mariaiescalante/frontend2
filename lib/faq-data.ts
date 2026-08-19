export interface FaqCategoryItem {
  id: 'todas' | 'general' | 'articulos' | 'suscripciones' | 'tecnico'
  label: {
    es: string
    en: string
    pt: string
    'pt-BR': string
  }
}

export interface FaqItem {
  id: string
  categoryId: 'general' | 'articulos' | 'suscripciones' | 'tecnico'
  categoryLabel: {
    es: string
    en: string
    pt: string
    'pt-BR': string
  }
  question: {
    es: string
    en: string
    pt: string
    'pt-BR': string
  }
  answer: {
    es: string
    en: string
    pt: string
    'pt-BR': string
  }
}

export interface LocalizedFaqItem {
  id: string
  categoryId: string
  categoryLabel: string
  question: string
  answer: string
}

export const FAQ_CATEGORIES: FaqCategoryItem[] = [
  {
    id: 'todas',
    label: {
      es: 'Todas',
      en: 'All',
      pt: 'Todas',
      'pt-BR': 'Todas',
    },
  },
  {
    id: 'general',
    label: {
      es: 'General',
      en: 'General',
      pt: 'Geral',
      'pt-BR': 'Geral',
    },
  },
  {
    id: 'articulos',
    label: {
      es: 'Artículos & Contenido',
      en: 'Articles & Content',
      pt: 'Artigos e Conteúdo',
      'pt-BR': 'Artigos e Conteúdo',
    },
  },
  {
    id: 'suscripciones',
    label: {
      es: 'Suscripciones',
      en: 'Subscriptions',
      pt: 'Assinaturas',
      'pt-BR': 'Assinaturas',
    },
  },
  {
    id: 'tecnico',
    label: {
      es: 'Técnico',
      en: 'Technical',
      pt: 'Técnico',
      'pt-BR': 'Técnico',
    },
  },
]

export const MOCK_FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    categoryId: 'general',
    categoryLabel: {
      es: 'General',
      en: 'General',
      pt: 'Geral',
      'pt-BR': 'Geral',
    },
    question: {
      es: '¿Qué es TLUX?',
      en: 'What is TLUX?',
      pt: 'O que é a TLUX?',
      'pt-BR': 'O que é a TLUX?',
    },
    answer: {
      es: 'TLUX es un estudio digital independiente especializado en ingeniería de software avanzada, arquitectura web en Next.js, SEO/AEO de alto impacto y diseño de experiencias digitales de alto rendimiento que convierten negocios con ambición en realidades sólidas.',
      en: 'TLUX is an independent digital studio specializing in advanced software engineering, Next.js web architecture, high-impact SEO/AEO, and high-performance digital experience design that transform ambitious businesses into solid realities.',
      pt: 'A TLUX é um estúdio digital independente especializado em engenharia de software avançada, arquitetura web em Next.js, SEO/AEO de alto impacto e design de experiências digitais de alta performance que transformam negócios ambiciosos em realidades sólidas.',
      'pt-BR': 'A TLUX é um estúdio digital independente especializado em engenharia de software avançada, arquitetura web em Next.js, SEO/AEO de alto impacto e design de experiências digitais de alta performance que transformam negócios ambiciosos em realidades sólidas.',
    },
  },
  {
    id: 'faq-2',
    categoryId: 'general',
    categoryLabel: {
      es: 'General',
      en: 'General',
      pt: 'Geral',
      'pt-BR': 'Geral',
    },
    question: {
      es: '¿Para quién está pensado este contenido?',
      en: 'Who is this content intended for?',
      pt: 'Para quem este conteúdo é direcionado?',
      'pt-BR': 'Para quem este conteúdo é direcionado?',
    },
    answer: {
      es: 'Nuestros artículos, análisis y recursos están diseñados para desarrolladores frontend, ingenieros de software, directores de tecnología (CTOs) y líderes digitales que buscan construir productos web extremadamente rápidos, escalables y optimizados para buscadores tradicionales y motores de respuesta IA.',
      en: 'Our articles, technical breakdowns, and resources are crafted for frontend developers, software engineers, CTOs, and digital leaders looking to build blazingly fast, scalable web products optimized for search engines and AI answer engines.',
      pt: 'Nossos artigos, análises e recursos são projetados para desenvolvedores frontend, engenheiros de software, CTOs e líderes digitais que buscam construir produtos web extremamente rápidos, escaláveis e otimizados para motores de busca de IA.',
      'pt-BR': 'Nossos artigos, análises e recursos são projetados para desenvolvedores frontend, engenheiros de software, CTOs e líderes digitais que buscam construir produtos web extremamente rápidos, escaláveis e otimizados para motores de busca de IA.',
    },
  },
  {
    id: 'faq-3',
    categoryId: 'articulos',
    categoryLabel: {
      es: 'Artículos & Contenido',
      en: 'Articles & Content',
      pt: 'Artigos e Conteúdo',
      'pt-BR': 'Artigos e Conteúdo',
    },
    question: {
      es: '¿Con qué frecuencia publicáis nuevos artículos?',
      en: 'How often do you publish new articles?',
      pt: 'Com que frequência vocês publicam novos artigos?',
      'pt-BR': 'Com que frequência vocês publicam novos artigos?',
    },
    answer: {
      es: 'Publicamos análisis técnicos profundos, guías de arquitectura y experimentos de rendimiento de forma semanal. Además, enviamos un compendio mensual exclusivo con los mejores hallazgos a los suscriptores de nuestra newsletter técnica.',
      en: 'We publish deep technical analyses, architecture guides, and speed benchmarks weekly. Additionally, we send an exclusive monthly digest of key engineering insights to our newsletter subscribers.',
      pt: 'Publicamos análises técnicas aprofundadas, guias de arquitetura e experimentos de desempenho semanalmente. Além disso, enviamos um compilado mensal exclusivo para os assinantes da nossa newsletter.',
      'pt-BR': 'Publicamos análises técnicas aprofundadas, guias de arquitetura e experimentos de desempenho semanalmente. Além disso, enviamos um compilado mensal exclusivo para os assinantes da nossa newsletter.',
    },
  },
  {
    id: 'faq-4',
    categoryId: 'articulos',
    categoryLabel: {
      es: 'Artículos & Contenido',
      en: 'Articles & Content',
      pt: 'Artigos e Conteúdo',
      'pt-BR': 'Artigos e Conteúdo',
    },
    question: {
      es: '¿Puedo sugerir un tema para el blog?',
      en: 'Can I suggest a topic for the blog?',
      pt: 'Posso sugerir um tópico para o blog?',
      'pt-BR': 'Posso sugerir um tópico para o blog?',
    },
    answer: {
      es: '¡Por supuesto! Nos encanta recibir sugerencias e inquietudes técnicas de nuestra comunidad. Puedes enviarnos un mensaje directo a través de nuestra sección de contacto o por correo electrónico a hola@tlux.studio.',
      en: 'Absolutely! We love receiving technical suggestions and challenges from our community. You can reach out directly via our contact section or send us an email at hola@tlux.studio.',
      pt: 'Com certeza! Adoramos receber sugestões técnicas e desafios da nossa comunidade. Você pode nos enviar uma mensagem direta pela seção de contato ou por e-mail para hola@tlux.studio.',
      'pt-BR': 'Com certeza! Adoramos receber sugestões técnicas e desafios da nossa comunidade. Você pode nos enviar uma mensagem direta pela seção de contato ou por e-mail para hola@tlux.studio.',
    },
  },
  {
    id: 'faq-5',
    categoryId: 'suscripciones',
    categoryLabel: {
      es: 'Suscripciones',
      en: 'Subscriptions',
      pt: 'Assinaturas',
      'pt-BR': 'Assinaturas',
    },
    question: {
      es: '¿Qué incluye la suscripción?',
      en: 'What does the subscription include?',
      pt: 'O que a assinatura inclui?',
      'pt-BR': 'O que a assinatura inclui?',
    },
    answer: {
      es: 'La suscripción a nuestra newsletter técnica te da acceso exclusivo a análisis profundos de código, plantillas de arquitectura en Next.js, guías de AEO/SEO antes de su publicación general y de forma 100% libre de spam.',
      en: 'Subscribing to our technical newsletter gives you exclusive access to code deep dives, Next.js architecture templates, early-access AEO/SEO guides, and zero spam.',
      pt: 'A assinatura da nossa newsletter técnica concede acesso exclusivo a análises profundas de código, templates de arquitetura em Next.js, guias de AEO/SEO em primeira mão e 0% spam.',
      'pt-BR': 'A assinatura da nossa newsletter técnica concede acesso exclusivo a análises profundas de código, templates de arquitetura em Next.js, guias de AEO/SEO em primeira mão e 0% spam.',
    },
  },
  {
    id: 'faq-6',
    categoryId: 'suscripciones',
    categoryLabel: {
      es: 'Suscripciones',
      en: 'Subscriptions',
      pt: 'Assinaturas',
      'pt-BR': 'Assinaturas',
    },
    question: {
      es: '¿Puedo cancelar cuando quiera?',
      en: 'Can I cancel my subscription at any time?',
      pt: 'Posso cancelar minha assinatura a qualquer momento?',
      'pt-BR': 'Posso cancelar minha assinatura a qualquer momento?',
    },
    answer: {
      es: 'Sí, en cualquier momento y sin complicaciones. Cada correo que enviamos incluye un enlace directo al pie para cancelar tu suscripción con un solo clic.',
      en: 'Yes, anytime with zero hassle. Every single email we send includes a 1-click unsubscribe link at the footer.',
      pt: 'Sim, a qualquer momento sem complicações. Todos os e-mails enviados incluem um link direto no rodapé para cancelar a assinatura com um único clique.',
      'pt-BR': 'Sim, a qualquer momento sem complicações. Todos os e-mails enviados incluem um link direto no rodapé para cancelar a assinatura com um único clique.',
    },
  },
  {
    id: 'faq-7',
    categoryId: 'tecnico',
    categoryLabel: {
      es: 'Técnico',
      en: 'Technical',
      pt: 'Técnico',
      'pt-BR': 'Técnico',
    },
    question: {
      es: '¿Qué tecnologías utilizáis?',
      en: 'What technologies do you use?',
      pt: 'Quais tecnologias vocês utilizam?',
      'pt-BR': 'Quais tecnologias vocês utilizam?',
    },
    answer: {
      es: 'Construimos sobre la pila más moderna del ecosistema web: Next.js 16 (App Router), React 19, TypeScript estricto, Tailwind CSS v4, Framer Motion y funciones distribuida en el Edge para garantizar velocidades de respuesta sub-50ms.',
      en: 'We build on the modern web stack: Next.js 16 (App Router), React 19, strict TypeScript, Tailwind CSS v4, Framer Motion, and edge serverless execution for sub-50ms response times.',
      pt: 'Construímos sobre a stack web mais moderna: Next.js 16 (App Router), React 19, TypeScript estrito, Tailwind CSS v4, Framer Motion e execução distribuída no Edge para respostas abaixo de 50ms.',
      'pt-BR': 'Construímos sobre a stack web mais moderna: Next.js 16 (App Router), React 19, TypeScript estrito, Tailwind CSS v4, Framer Motion e execução distribuída no Edge para respostas abaixo de 50ms.',
    },
  },
  {
    id: 'faq-8',
    categoryId: 'tecnico',
    categoryLabel: {
      es: 'Técnico',
      en: 'Technical',
      pt: 'Técnico',
      'pt-BR': 'Técnico',
    },
    question: {
      es: '¿Los recursos son compatibles con Next.js?',
      en: 'Are your resources compatible with Next.js?',
      pt: 'Os recursos são compatíveis com Next.js?',
      'pt-BR': 'Os recursos são compatíveis com Next.js?',
    },
    answer: {
      es: 'Sí, el 100% de nuestros ejemplos de código, componentes UI y patrones de arquitectura están diseñados y probados específicamente para integrarse sin fricción en proyectos de Next.js App Router.',
      en: 'Yes, 100% of our code examples, UI components, and architectural patterns are specifically designed and tested for seamless integration with Next.js App Router.',
      pt: 'Sim, 100% dos nossos exemplos de código, componentes de UI e padrões de arquitetura são projetados e testados para integração perfeita no Next.js App Router.',
      'pt-BR': 'Sim, 100% dos nossos exemplos de código, componentes de UI e padrões de arquitetura são projetados e testados para integração perfeita no Next.js App Router.',
    },
  },
]

export function getAllFaqCategories(locale: string = 'es'): { id: string; label: string }[] {
  const langKey = locale.toLowerCase() === 'pt-br' ? 'pt-BR' : locale === 'en' ? 'en' : locale === 'pt' ? 'pt' : 'es'
  return FAQ_CATEGORIES.map((cat) => ({
    id: cat.id,
    label: cat.label[langKey] || cat.label.es,
  }))
}

export function getLocalizedFaqItems(locale: string = 'es'): LocalizedFaqItem[] {
  const langKey = locale.toLowerCase() === 'pt-br' ? 'pt-BR' : locale === 'en' ? 'en' : locale === 'pt' ? 'pt' : 'es'
  return MOCK_FAQ_ITEMS.map((item) => ({
    id: item.id,
    categoryId: item.categoryId,
    categoryLabel: item.categoryLabel[langKey] || item.categoryLabel.es,
    question: item.question[langKey] || item.question.es,
    answer: item.answer[langKey] || item.answer.es,
  }))
}
