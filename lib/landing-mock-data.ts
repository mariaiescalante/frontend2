import { FullLandingContent } from '../types/landing'

export const initialLandingData: FullLandingContent = {
  hero: {
    tag: '[ ESTUDIO_DIGITAL_INDEPENDIENTE / 2026 ]',
    title: 'Tecnología líder en experiencia de usuario.',
    boldIntro: 'La innovación a tu alcance —',
    description:
      'En un mundo donde la tecnología y el marketing avanzan a pasos agigantados, nosotros te ofrecemos las herramientas y estrategias necesarias para transformar tus ideas en realidades.',
    ctaText: 'Ver nuestro enfoque',
    ctaUrl: '#servicios',
    systemTag: '[ TLUX_SYSTEM // 01 ]',
    designTag: '[ INNOVACIÓN_Y_DISEÑO ]',
    heroImageUrl: 'https://res.cloudinary.com/dri5k0qio/image/upload/v1787503210/corptlux/landing/hezsd5kqpbeltohvnnll.jpg',
  },
  stats: {
    projectsCount: '+15',
    projectsLabel: 'Proyectos creados',
    clientsCount: '8',
    clientsLabel: 'Clientes felices',
    yearsCount: '+5',
    yearsLabel: 'Años de experiencia',
  },
  clients: {
    tag: '[ CONFIANZA_Y_PARTNERS ]',
    titlePart1: 'Marcas con ',
    titleBold1: 'ambición',
    titlePart2: ' que ',
    titleBold2: 'confían',
    titlePart3: ' en nuestra arquitectura digital.',
    description:
      'Diseñamos y desarrollamos plataformas de alto rendimiento para compañías que buscan dominar su categoría.',
    items: [
      { id: 'c1', companyName: 'BDL Cap', logoUrl: '/BDL-Cap.webp', websiteUrl: '' },
      { id: 'c2', companyName: 'Elizabeth Costa', logoUrl: '/Elizabeth-Costa-Top-Real-Estate-Agent-Doral-logo-fondo-nergo.webp', websiteUrl: '' },
      { id: 'c3', companyName: 'Forget Me Not', logoUrl: '/Forget-me-not.webp', websiteUrl: '' },
      { id: 'c4', companyName: 'Maraka', logoUrl: '/Maraka.webp', websiteUrl: '' },
      { id: 'c5', companyName: 'Open Market', logoUrl: '/Open-Market-company.webp', websiteUrl: '' },
      { id: 'c6', companyName: 'Trailvision Optics', logoUrl: '/Trailvision-Optics.webp', websiteUrl: '' },
      { id: 'c7', companyName: 'Vistalite', logoUrl: '/Vistalite_color-version.webp', websiteUrl: '' },
    ],
  },
  services: {
    tag: '[ 01 / SERVICIOS & SOLUCIONES ]',
    titlePart1: 'Soluciones y servicios ',
    titleBold: 'hechos a tu medida.',
    description:
      'No usamos fórmulas. Encontramos la oportunidad específica que tu mercado está esperando.',
    items: [
      {
        id: 's1',
        title: 'Desarrollo Web a Medida',
        kicker: 'Tecnología que escala',
        description:
          'Creamos soluciones personalizadas que se adaptan a las necesidades específicas de tu negocio, garantizando un rendimiento y escalabilidad óptimos.',
        deliverables: [
          'Soluciones 100% personalizadas',
          'Rendimiento y escalabilidad óptimos',
          'Arquitectura moderna',
        ],
        result: 'Más control. Máximo rendimiento.',
      },
      {
        id: 's2',
        title: 'Desarrollo de E-commerce',
        kicker: 'Conversión que se siente',
        description:
          'Creamos plataformas de comercio electrónico personalizadas y optimizadas que permiten vender en línea de manera efectiva, con gestión de inventario y pasarelas de pago seguras.',
        deliverables: [
          'Pasarelas de pago seguras',
          'Gestión avanzada de inventario',
          'Experiencias de usuario atractivas',
        ],
        result: 'Más ventas. Menos fricción.',
      },
      {
        id: 's3',
        title: 'Marketing Digital Estratégico',
        kicker: 'Alcance que importa',
        description:
          'Implementamos estrategias efectivas de marketing digital que incluyen SEO, PPC y campañas en redes sociales para aumentar tu visibilidad y atraer tráfico relevante.',
        deliverables: [
          'Estrategia SEO, PPC y SEM',
          'Campañas en redes sociales',
          'Tráfico relevante y calificado',
        ],
        result: 'Más visibilidad. Tráfico de valor.',
      },
      {
        id: 's4',
        title: 'Software de Backend',
        kicker: 'Infraestructura sólida',
        description:
          'Proporcionamos sistemas robustos y seguros que gestionan eficientemente tus operaciones y datos, asegurando una integración fluida con tus plataformas.',
        deliverables: [
          'Sistemas robustos y seguros',
          'Gestión eficiente de datos',
          'Integración fluida de plataformas',
        ],
        result: 'Operaciones estables. Cero fallos.',
      },
      {
        id: 's5',
        title: 'Email Marketing',
        kicker: 'Comunicación que conecta',
        description:
          'Diseñamos campañas de email marketing segmentadas que resuenan con tu audiencia y fomentan la lealtad de los clientes a través de diseños de alto impacto.',
        deliverables: [
          'Campañas de email segmentadas',
          'Diseños de alto impacto',
          'Fidelización de clientes',
        ],
        result: 'Más retención. Mayor lealtad.',
      },
      {
        id: 's6',
        title: 'Consultoría Digital',
        kicker: 'Estrategia con visión',
        description:
          'Asesoramos a las empresas en su proceso de digitalización, ayudándoles a adoptar tecnologías que optimicen sus procesos y mejoren su competitividad.',
        deliverables: [
          'Asesoría en digitalización',
          'Adopción de nuevas tecnologías',
          'Optimización de procesos internos',
        ],
        result: 'Más eficiencia. Alta competitividad.',
      },
      {
        id: 's7',
        title: 'SEO | SEM',
        kicker: 'Visibilidad orgánica',
        description:
          'Ofrecemos servicios expertos de SEO y SEM para potenciar tu presencia online y atraer tráfico de calidad. Campañas SEM estratégicas que maximizan tu ROI.',
        deliverables: [
          'Posicionamiento destacado en buscadores',
          'Campañas SEM estratégicas',
          'Resultados inmediatos y ROI alto',
        ],
        result: 'Posiciones destacadas. Tráfico de calidad.',
      },
      {
        id: 's8',
        title: 'Integración de CRM',
        kicker: 'Clientes en el centro',
        description:
          'Centralizamos y optimizamos la gestión de clientes integrando un CRM adaptado a tus procesos, automatizando tareas y brindando datos en tiempo real.',
        deliverables: [
          'Centralización de gestión de clientes',
          'Tareas automatizadas en tiempo real',
          'Productividad e informes avanzados',
        ],
        result: 'Mayor productividad. Fidelización real.',
      },
    ],
  },
  features: {
    tag: '[ 02 / FUNCIONES ]',
    titlePart1: 'Ofrecemos Funciones Importantes para el ',
    titleBold1: 'Desarrollo Web',
    titlePart2: ' y el ',
    titleBold2: 'Marketing Digital.',
    description:
      'En TLUX, creemos en ofrecer soluciones digitales integrales que mejoren su presencia en línea y generen resultados.',
    items: [
      {
        id: 'f1',
        title: 'Consulta de Optimización Gratuita',
        kicker: 'Auditoría & Estrategia',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'f2',
        title: 'Desarrollo Full Stack',
        kicker: 'Código & Arquitectura Escalable',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'f3',
        title: 'Optimización de Contenido',
        kicker: 'UX Writing & Copywriting',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'f4',
        title: 'Análisis de Sitio Web',
        kicker: 'Performance & Core Web Vitals',
        imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'f5',
        title: 'Seguimiento y Reporte de Rendimiento',
        kicker: 'Métricas & Conversión en Tiempo Real',
        imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'f6',
        title: 'Gestión de Redes Sociales',
        kicker: 'Branding & Presencia Digital',
        imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
      },
    ],
  },
  about: {
    tag: '[ 03 // NOSOTROS ]',
    titlePart1: 'Impulsamos tu negocio, ',
    titleBold: 'revolucionando',
    titlePart2: ' la experiencia de usuario.',
    description:
      'En TLUX, transformamos la interacción digital con soluciones tecnológicas innovadoras que ponen al usuario en el centro.',
    missionTag: '[ 01 // MISIÓN ]',
    missionTitle: 'MISIÓN',
    missionDesc:
      'Nuestro objetivo es empoderar a las empresas para que ofrezcan experiencias digitales excepcionales, enfocándonos en la facilidad de uso, la accesibilidad y la satisfacción del cliente.',
    visionTag: '[ 02 // VISIÓN ]',
    visionTitle: 'VISIÓN',
    visionDesc:
      'Ser la empresa líder en soluciones tecnológicas que redefinen la experiencia de usuario a nivel global, mediante productos intuitivos y de vanguardia.',
  },
  techStack: {
    tag: '[ 05 // SYSTEM_STACK ]',
    titlePart1: 'Tecnologías más ',
    titleBold: 'usadas',
    description:
      'Estas son las tecnologías que mayormente implementamos en el desarrollo de nuestros proyectos para adaptarnos a tus necesidades específicas.',
    items: [
      { id: 't1', name: 'Next.js', category: 'FRAMEWORK', description: 'El estándar moderno de Next.js para renderizado híbrido (SSR, SSG, ISR) y compilación ultrarrápida.', usageCase: 'E-commerce headless y plataformas web de alto rendimiento.', logoUrl: '/Nextjs.webp' },
      { id: 't2', name: 'React', category: 'UI LIBRARY', description: 'La librería UI más popular para construir interfaces declarativas y reactivas.', usageCase: 'SPAs de alto rendimiento y microfrontends.', logoUrl: '/React.webp' },
      { id: 't3', name: 'TypeScript', category: 'LANGUAGE', description: 'Superset tipado de JavaScript que garantiza mantenibilidad a largo plazo y refactorización segura.', usageCase: 'Grandes bases de código y contratos de datos seguros.', logoUrl: '/Typescript_logo_2020.svg.webp' },
      { id: 't4', name: 'Tailwind CSS', category: 'STYLING', description: 'Motor CSS de última generación para crear sistemas de diseño responsivos de alto impacto.', usageCase: 'Interfaces premium y sistemas de diseño corporativos.', logoUrl: '/Tailwind_CSS_Logo.svg.webp' },
      { id: 't5', name: 'Node.js', category: 'RUNTIME', description: 'Entorno de ejecución orientado a eventos para servicios en tiempo real y microservicios escalables.', usageCase: 'APIs RESTful y backends distribuidos en la nube.', logoUrl: '/Node.js_logo.svg.webp' },
      { id: 't6', name: 'PostgreSQL', category: 'DATABASE', description: 'La base de datos relacional más avanzada, especializada en integridad y búsquedas vectoriales.', usageCase: 'Almacenamiento transaccional y datos estructurados.', logoUrl: '/Postgresql_elephant.svg.webp' },
    ],
  },
  ratings: {
    tag: '[ 01.1 / REPUTACIÓN & OPINIONES ]',
    titlePart1: 'Lo que dicen nuestros ',
    titleBold: 'clientes',
    description:
      'La satisfacción de quienes confían en nosotros se refleja en su experiencia directa, atención dedicada y resultados reales.',
    score: '4.98',
    verifiedLabel: 'Opiniones de Clientes Reales',
    items: [
      { id: 'r1', clientName: 'Carlos Mendoza', tag: '[ DESARROLLO WEB ]', comment: 'Quedé impresionado con el trabajo. Entregaron el sitio web exactamente en la fecha acordada y la velocidad de carga mejoró muchísimo.', rating: 5 },
      { id: 'r2', clientName: 'Valeria Sotomayor', tag: '[ DISEÑO & EXPERIENCIA ]', comment: 'Atención de primera. Entendieron exactamente lo que buscábamos desde la primera reunión y supieron plasmar la idea a la perfección.', rating: 5 },
      { id: 'r3', clientName: 'Andrés Guarch', tag: '[ REDISEÑO COMPLETO ]', comment: 'Buscábamos un rediseño completo y el resultado superó nuestras expectativas. La experiencia para nuestros usuarios es mucho más fluida ahora.', rating: 5 },
      { id: 'r4', clientName: 'Elena Rostova', tag: '[ OPTIMIZACIÓN WEB ]', comment: 'Excelente servicio. Nos ayudaron a optimizar la estructura de nuestras páginas y el sitio responde súper rápido.', rating: 5 },
      { id: 'r5', clientName: 'Mateo Benítez', tag: '[ DESARROLLO A MEDIDA ]', comment: 'Muy profesionales y dedicados. Resolvieron cada detalle técnico que les pedimos y la comunicación fue impecable.', rating: 5 },
      { id: 'r6', clientName: 'Sofia Alarcón', tag: '[ IDENTIDAD DIGITAL ]', comment: 'Un trabajo impecable. La estética de nuestro sitio web se ve seria y elegante, justo lo que queríamos.', rating: 5 },
      { id: 'r7', clientName: 'Gabriel Torres', tag: '[ NAVEGACIÓN & SOPORTE ]', comment: 'Súper atentos a cada requerimiento. Hicieron la web fácil de navegar para nuestros usuarios.', rating: 5 },
      { id: 'r8', clientName: 'Lucía Fernández', tag: '[ PLATAFORMA DIGITAL ]', comment: 'Cumplieron con todo lo prometido. La plataforma quedó rápida, moderna y sin errores.', rating: 5 },
      { id: 'r9', clientName: 'Diego Ramírez', tag: '[ ADAPTACIÓN MÓVIL ]', comment: 'Increíble trabajo de desarrollo. El diseño quedó muy limpio y la adaptación a celulares funciona perfecto.', rating: 5 },
    ],
  },
  contact: {
    tag: '[ 04 / CONTACTO ]',
    titlePart1: '¿Qué espacio quieres ',
    titlePart2: 'ocupar?',
    ctaText: 'Empezar una conversación',
    whatsappNumber: '573203249742',
    whatsappDefaultMessage: 'Hola, me gustaría obtener más información sobre sus servicios de desarrollo web y tecnología.',
    contactEmail: 'hola@tlux.studio',
    tagline: 'Estudio de ingeniería y arquitectura digital. Transformamos visión estratégica en plataformas web de alto rendimiento.',
    rights: '© 2026 TLUX Studio. Todos los derechos reservados.',
    timezone: 'América / España • [ UTC -4 / UTC +1 ]',
  },
  customSections: [],
  blog: {
    heroTag: '[ 06 // PUBLICACIONES_Y_RECURSOS ]',
    heroTitlePart1: 'Conocimiento ',
    heroTitleItalic: 'e infraestructura de contenido.',
    heroDescription:
      'Análisis técnicos, tendencias y mejores prácticas sobre arquitectura de desarrollo web, ingeniería en Next.js, SEO/AEO de vanguardia y experiencia de usuario optimizada para la conversión.',
    recentTag: '[ 07 // EXPLORAR_PUBLICACIONES ]',
    recentTitlePart1: 'Nuestros ',
    recentTitleItalic: 'artículos ',
    recentTitlePart2: 'más recientes.',
  },
  faq: {
    heroTag: '[ 01 // PREGUNTAS_FRECUENTES ]',
    heroBadge: 'CENTRO DE AYUDA & SOPORTE TÉCNICO',
    heroTitlePart1: 'Respuestas claras ',
    heroTitleItalic: 'para decisiones estratégicas.',
    heroDescription:
      'Todo lo que necesitas saber sobre nuestra metodología de desarrollo, arquitectura de software, tiempos de entrega y modelos de colaboración.',
  },
}
