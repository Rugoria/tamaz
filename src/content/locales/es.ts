import type { Translation } from "../index";

/** Spanish. Text only; links, images and numbers come from the English copy (site.ts). */
export const es: Translation = {
  brand: {
    description:
      "Brackets y alineadores transparentes para niños, adolescentes y adultos, de ortodoncistas certificados. Una primera visita con escaneo 3D, un plan por escrito y tu precio mensual.",
  },
  whatsapp: { label: "Chatea con tamaz por WhatsApp (0306 1336555)" },
  nav: {
    links: [
      { label: "Tu tratamiento" },
      { label: "Resultados" },
      { label: "Proceso" },
      { label: "Para clínicas" },
      { label: "Opiniones" },
      { label: "Ubicaciones" },
      { label: "Tienda" },
    ],
    cta: { label: "Reserva tu cita" },
  },
  hero: {
    tagline: "Mejor elección, mejor sonrisa",
    eyebrow: "Brackets y alineadores transparentes · niños, adolescentes, adultos",
    headlineBefore: "Sonrisas más rectas, un",
    headlineWord: "milímetro",
    headlineAfter: "a la vez.",
    lede: "Ortodoncistas certificados, cuatro clínicas de barrio y una primera visita gratuita. Te vas con un escaneo 3D, un plan de tratamiento por escrito y tu precio mensual antes de comprometerte a nada.",
    primaryCta: { label: "Reserva tu cita" },
    secondaryCta: { label: "Ver resultados reales" },
    trust: [
      { label: "más de 2.300 opiniones de pacientes" },
      { value: "0 $ de entrada", label: "planes sin intereses" },
      { value: "Sábados y tardes", label: "en todas las clínicas" },
    ],
    chips: { duration: "18 meses", durationLabel: "tratamiento promedio", scan: "Escaneo 3D gratis" },
    smileLabel: "Dientes superiores animados que pasan de apiñados a rectos al colocar los brackets",
    aligner: { alt: "Render 3D de un alineador transparente", title: "Render 3D de un alineador transparente girando" },
  },
  alignerAbout: {
    eyebrow: "Alineadores transparentes",
    title: "Casi invisibles y hechos solo para tus dientes.",
    lede: "Cada alineador se fabrica a partir de un escaneo 3D de tus dientes. Cambias a un juego nuevo cada [1 a 2] semanas, y cada uno acerca tus dientes una fracción de milímetro a tu sonrisa final.",
    points: [
      { title: "A medida desde un escaneo 3D", body: "Sin cubetas de impresión. Un escaneo de cuatro minutos registra cada diente, y tu ortodoncista planifica cada movimiento en pantalla." },
      { title: "Quítatelos para comer", body: "Retíralos para comer, cepillarte y usar hilo dental, así que no hay alimentos prohibidos." },
      { title: "De 20 a 22 horas al día", body: "Plástico fino y liso, sin alambres ni brackets, así que casi nadie notará que los llevas." },
    ],
    durationBody: "[Cada cuánto vienes a control durante el tratamiento, p. ej. una visita breve cada 6 a 8 semanas.]",
    cta: { label: "Reserva tu cita" },
    readMore: { label: "Leer más" },
  },
  aboutPage: { metaTitle: "Sobre nuestros alineadores", back: { label: "Volver al inicio" } },
  results: {
    eyebrow: "Resultados reales",
    title: "Mira cómo cambian sonrisas reales.",
    lede: "Cada caso es un paciente de tamaz, compartido con su consentimiento por escrito. Arrastra las fotos para comparar el antes y el después.",
    cases: [
      {
        title: "Apiñamiento",
        detail: "Brackets metálicos · 20 meses",
        before: { label: "Caso 1 · antes", alt: "Dientes apiñados antes del tratamiento" },
        after: { label: "Caso 1 · después", alt: "Dientes rectos después del tratamiento" },
      },
      {
        title: "Espacios",
        detail: "Alineadores transparentes · 9 meses",
        before: { label: "Caso 2 · antes", alt: "Espacio entre los dientes delanteros antes del tratamiento" },
        after: { label: "Caso 2 · después", alt: "Espacio cerrado después del tratamiento" },
      },
      {
        title: "Sobremordida profunda",
        detail: "Brackets cerámicos · 22 meses",
        before: { label: "Caso 3 · antes", alt: "Sobremordida antes del tratamiento" },
        after: { label: "Caso 3 · después", alt: "Mordida corregida después del tratamiento" },
      },
    ],
  },
  journey: {
    eyebrow: "Tu tratamiento de {months} meses",
    title: "Desplázate para ver cómo una sonrisa se pone en su sitio.",
    lede: "Los dientes se mueven aproximadamente un milímetro al mes con una fuerza suave y constante. Así se ve, del primer escaneo al retenedor.",
    photos: {
      start: { alt: "Sonrisa con dientes torcidos e irregulares antes del tratamiento" },
      worn: { alt: "La sonrisa con alineadores transparentes en ambas arcadas" },
      end: { alt: "La sonrisa alineada después del tratamiento" },
    },
    appliances: {
      aligners: { label: "Alineadores transparentes", average: "[12] meses" },
      braces: { label: "Brackets", average: "18 meses" },
    },
    stages: [
      {
        name: "Escaneo",
        body: "Consulta y escaneo 3D, unos cuatro minutos y sin cubetas de impresión. Tu ortodoncista planifica el movimiento de cada diente y te muestra el resultado en pantalla.",
      },
      {
        name: "Alineación",
        body: "Los brackets se colocan en una hora aproximadamente y el arco alinea los dientes con suavidad. Visitas de ajuste cada 6 a 8 semanas.",
        aligners: { name: "Alineación", body: "Un juego nuevo de alineadores transparentes cada una o dos semanas, 22 horas al día, con controles cada 8 a 10 semanas y alineadores de refinamiento para las últimas fracciones de milímetro." },
      },
      {
        name: "Retención",
        body: "Fuera los brackets y a ponerse retenedores transparentes para mantener tu nueva sonrisa. El primer juego está incluido.",
        aligners: { name: "Retención", body: "Terminados los últimos alineadores, llegan los retenedores transparentes para mantener tu nueva sonrisa. El primer juego está incluido." },
      },
    ],
  },
  process: {
    eyebrow: "Cómo funciona",
    title: "Del escaneo a tu puerta.",
    lede: "Cada caso de alineadores pasa por las mismas seis etapas, y te mantenemos informado en cada una.",
    steps: [
      { title: "Escaneo recibido", body: "Tu escaneo 3D llega a nuestro laboratorio y se abre tu caso.", time: "[Duración]" },
      { title: "Diseño y propuesta", body: "Tu ortodoncista planifica cada movimiento dental y comparte contigo el resultado propuesto.", time: "[Duración]" },
      { title: "Cambios y ajustes", body: "Ajustamos el plan con tus comentarios hasta que tú y tu ortodoncista lo aprueben.", time: "[Duración]" },
      { title: "En producción", body: "Tus alineadores a medida se fabrican y se revisan en ajuste y calidad.", time: "[Duración]" },
      { title: "En camino", body: "Tus alineadores se empaquetan y van de camino a ti o a tu clínica.", time: "[Duración]" },
      { title: "Entregado", body: "Llegan tus alineadores y empieza tu tratamiento.", time: "[Duración]" },
    ],
  },
  clinics: {
    eyebrow: "Para dentistas y ortodoncistas",
    title: "Ofrece alineadores tamaz en tu propia consulta.",
    lede: "Envíanos tus escaneos. Nuestros ortodoncistas planifican el caso, nuestro laboratorio fabrica los alineadores y los enviamos a tu clínica, listos para entregar. El paciente sigue siendo tuyo y tú fijas los honorarios.",
    audiences: ["Dentistas generales", "Ortodoncistas", "Grupos dentales"],
    cta: { label: "Hazte clínica asociada" },
    contact: "O escribe a partners@[tu-dominio].com",
    benefits: [
      { title: "Cualquier escáner, sin equipo nuevo", body: "Sube escaneos intraorales directamente desde 3Shape TRIOS, Medit o iTero, o como archivos STL, con fotos y radiografías." },
      { title: "Un plan en [2 a 3 días]", body: "Un ortodoncista diseña cada movimiento dental y te envía un plan 3D para aprobar, modificar o comentar." },
      { title: "Muestra el resultado en el sillón", body: "Comparte la simulación 3D con tu paciente en la consulta, para que vea su sonrisa antes de decidirse." },
      { title: "Un precio claro por caso", body: "[Precio por caso] visible antes de pedir. Sin suscripción, sin volumen mínimo y con refinamientos [incluidos]." },
    ],
    steps: [
      { title: "Escanear", body: "Sube el escaneo y las fotos desde tu consulta.", time: "Día 1" },
      { title: "Planificar", body: "Revisa el plan 3D y la simulación; pide cambios hasta que esté bien.", time: "[2 a 3 días]" },
      { title: "Fabricar", body: "Imprimimos, recortamos y revisamos cada alineador en nuestro laboratorio.", time: "[5 a 7 días hábiles]" },
      { title: "Tratar", body: "Los alineadores llegan en estuches tamaz. Gestionamos contigo los refinamientos y los retenedores.", time: "[Continuo]" },
    ],
    support: "Cada caso tiene un ortodoncista asignado al que puedes escribir, desde el primer plan hasta el retenedor final.",
  },
  reviews: {
    eyebrow: "Historias de pacientes",
    title: "Valorados con 4,9 por más de 2.300 pacientes y padres.",
    items: [
      { quote: "Le mostraron a mi hija su sonrisa final en la pantalla en la primera visita. Desde entonces contaba los meses.", detail: "Madre · brackets metálicos" },
      { quote: "Tengo 41 años y me daba miedo empezar. Brackets cerámicos, citas los sábados, y en el trabajo nadie se dio cuenta durante meses.", detail: "Adulto · brackets cerámicos" },
      { quote: "Mi alineador se rozó un viernes y me lo arreglaron a la mañana siguiente. El plan de pago fue exactamente el que me presupuestaron.", detail: "Alineadores transparentes" },
    ],
    google: { count: "[Más de 2.300] opiniones en Google", linkLabel: "Lee todas las opiniones en Google" },
  },
  locations: {
    eyebrow: "Clínicas",
    title: "Cuatro clínicas, abiertas por las tardes y los sábados.",
    studios: [
      { hours: "Lun–Vie 8:00–19:00", name: "[Nombre de la clínica 1]", address: "[Dirección, ciudad, código postal]", phone: "[Número de teléfono]" },
      { hours: "Lun–Vie 9:00–20:00", name: "[Nombre de la clínica 2]", address: "[Dirección, ciudad, código postal]", phone: "[Número de teléfono]" },
      { hours: "Lun–Vie 8:00–18:00", name: "[Nombre de la clínica 3]", address: "[Dirección, ciudad, código postal]", phone: "[Número de teléfono]" },
      { hours: "Sáb 8:00–14:00", name: "[Nombre de la clínica 4]", address: "[Dirección, ciudad, código postal]", phone: "[Número de teléfono]" },
    ],
    map: { label: "Mapa de las clínicas", alt: "Mapa con las cuatro clínicas tamaz" },
  },
  faq: {
    eyebrow: "Preguntas",
    title: "Preguntas frecuentes",
    groups: [
      {
        title: "General y tecnología",
        items: [
          {
            question: "¿Qué son los alineadores transparentes y en qué se diferencian de los brackets metálicos?",
            answer: "Los alineadores transparentes son férulas removibles, hechas a medida en termoplástico transparente, que se ajustan a tus dientes. A diferencia de los brackets, apenas se notan, te los quitas para comer, así que no hay restricciones de comida, y no hay brackets ni alambres metálicos que rocen las mejillas y las encías.",
          },
          {
            question: "¿Cómo mueven realmente los dientes los alineadores?",
            answer: "Cada juego de alineadores se diseña digitalmente para aplicar una presión suave y precisa sobre dientes concretos. Llevas cada juego una o dos semanas, y cada juego nuevo mueve tus dientes un poco más, en pequeños pasos planificados, hacia la posición final que ha indicado tu ortodoncista.",
          },
        ],
      },
      {
        title: "Candidatos y duración",
        items: [
          {
            question: "¿Soy buen candidato para los alineadores transparentes?",
            answer: "Los alineadores tratan la mayoría de los casos leves a moderados, como apiñamiento, espacios y sobremordidas o mordidas cruzadas sencillas. Los problemas de mordida más graves o complejos pueden necesitar brackets tradicionales o una combinación de ambos. La única forma de saberlo con seguridad es una evaluación ortodóncica con escaneo 3D e imágenes digitales, que forma parte de tu consulta.",
          },
          {
            question: "¿Cuánto durará mi tratamiento?",
            answer: "La mayoría de los tratamientos con alineadores duran de 6 a 18 meses, según la complejidad de tu caso. El factor más importante que depende de ti es el tiempo de uso: quitarse los alineadores con demasiada frecuencia es la razón más común de que el tratamiento dure más de lo previsto.",
          },
        ],
      },
      {
        title: "Día a día y tiempo de uso",
        items: [
          {
            question: "¿Qué importancia tiene llevar los alineadores todos los días?",
            answer: "Es esencial. Los alineadores deben llevarse de 20 a 22 horas al día y quitarse solo para comer, para beber algo que no sea agua sola y para cepillarse los dientes. Los alineadores que se quedan en su estuche no mueven los dientes.",
          },
          {
            question: "¿Puedo comer o beber con los alineadores puestos?",
            answer: "Quítatelos para comer y para tomar cualquier cosa que no sea agua fresca. Las bebidas calientes pueden deformar el plástico, y las bebidas azucaradas o con color pueden manchar los alineadores y retener azúcar y ácido contra los dientes, lo que aumenta el riesgo de caries.",
          },
        ],
      },
      {
        title: "Cuidado y comodidad",
        items: [
          {
            question: "¿Cómo limpio mis alineadores?",
            answer: "Límpialos cada día con un cepillo suave y un jabón suave no abrasivo o una solución de limpieza aprobada, con agua fría o tibia. El agua caliente puede dañar el material. Después de comer, cepíllate y usa hilo dental antes de volver a ponértelos para que no queden restos de comida contra los dientes.",
          },
          {
            question: "¿Duelen los alineadores transparentes?",
            answer: "Puedes notar algo de presión o sensibilidad durante uno o dos días al cambiar a un juego nuevo. Es señal de que están funcionando. A la mayoría de las personas los alineadores les resultan mucho más cómodos que los brackets metálicos.",
          },
        ],
      },
      {
        title: "Proceso y después del tratamiento",
        items: [
          {
            question: "¿Afectarán los alineadores a mi forma de hablar o me harán cecear?",
            answer: "Algunas personas cecean un poco los primeros días mientras la lengua se acostumbra a un juego nuevo. Suele desaparecer rápido, y en general los alineadores apenas afectan al habla.",
          },
          {
            question: "¿Necesitaré un retenedor después del tratamiento?",
            answer: "Sí. Los dientes tienden de forma natural a volver a su posición anterior, así que todo el mundo necesita algún tipo de retenedor después del tratamiento para mantener su nueva sonrisa. Tu primer retenedor está incluido.",
          },
        ],
      },
    ],
  },
  consultation: {
    title: "Reserva tu cita.",
    lede: "Cuéntanos un poco sobre ti y un coordinador te llamará para confirmar una hora en un día hábil.",
    perks: ["Escaneo 3D y revisión", "Plan por escrito y precio exacto", "Sin compromiso ni presión"],
    treatmentOptions: ["Aún no lo sé", "Brackets metálicos", "Brackets cerámicos transparentes", "Alineadores transparentes", "Tratamiento temprano para mi hijo"],
    submit: "Solicitar mi cita",
    note: "Solo usaremos tus datos para organizar tu cita.",
    errors: {
      firstName: "Añade tu nombre para saber por quién preguntar.",
      phone: "Añade un número de teléfono para que un coordinador pueda contactarte.",
      email: "Revisa el correo electrónico o déjalo en blanco.",
      server: "Algo salió mal al enviar tu solicitud. Inténtalo de nuevo o llama a tu clínica más cercana.",
    },
    success: "Gracias, {name}. Hemos recibido tu solicitud para la clínica {studio} y un coordinador te llamará para confirmar una hora en un día hábil.",
  },
  footer: {
    blurb: "Brackets y alineadores transparentes para niños, adolescentes y adultos, de ortodoncistas certificados.",
    columns: [
      {
        title: "Explorar",
        links: [{ label: "Tu tratamiento" }, { label: "Antes y después" }, { label: "Cómo funciona" }, { label: "Para clínicas" }, { label: "Opiniones" }, { label: "Tienda" }],
      },
      {
        title: "Pacientes",
        links: [{ label: "Reservar una cita" }, { label: "[Enlace al portal del paciente]" }, { label: "[Enlace para pagar mi factura]" }],
      },
      {
        title: "Contacto",
        links: [{ label: "[Teléfono principal]" }, { label: "hola@[tu-dominio].com" }, { label: "Urgencias: llama a tu clínica" }, { label: "Todas las ubicaciones" }],
      },
    ],
    license: "[Licencia / n.º de registro de la clínica]",
    legal: [{ label: "Política de privacidad" }, { label: "Accesibilidad" }, { label: "Términos" }, { label: "Aviso de prácticas de privacidad" }],
  },
  shop: {
    metaTitle: "Tienda",
    back: { label: "Volver al inicio" },
    hero: {
      eyebrow: "Tienda tamaz",
      title: "Todo lo que necesita tu sonrisa.",
      lede: "Planes de alineadores transparentes, un kit de inicio para probar primero y los productos de cuidado que mantienen frescos tus alineadores y retenedores.",
      image: { label: "Portada de la tienda", alt: "Alineadores transparentes y productos de cuidado tamaz" },
    },
    plans: {
      eyebrow: "Alineadores transparentes",
      title: "Planes de alineadores para cada sonrisa.",
      lede: "Dos formas de alinear tus dientes: lleva los alineadores todo el día, o sobre todo mientras duermes.",
      review: "Un ortodoncista titulado revisa cada plan antes de empezar. [Si los alineadores no son para ti, te devolvemos todo el dinero.]",
      items: [
        {
          name: "Plan día completo",
          badge: "Mejor precio",
          duration: "[4 a 6] meses",
          wear: "22 horas al día",
          summary: "La forma más rápida de conseguir una sonrisa alineada: lleva los alineadores día y noche y quítatelos solo para comer y cepillarte.",
          image: { label: "Plan día completo", alt: "Alineadores transparentes tamaz del plan día completo" },
          monthly: [{ name: "[12] pagos mensuales", price: "[Precio] / mes" }, { name: "[24] pagos mensuales", price: "[Precio] / mes" }],
          oneTime: { price: "[Precio]", was: "[Precio habitual]" },
          includes: ["Todos tus alineadores, hechos a partir de un escaneo 3D", "Kit de blanqueamiento gratis", "Retenedores para mantener tu nueva sonrisa"],
        },
        {
          name: "Plan noche",
          badge: "El más elegido",
          duration: "[6 a 8] meses",
          wear: "10 horas al día",
          summary: "Lleva los alineadores por la tarde y durante la noche, y pasa el día sin ellos.",
          image: { label: "Plan noche", alt: "Alineadores transparentes tamaz del plan noche" },
          monthly: [{ name: "[12] pagos mensuales", price: "[Precio] / mes" }, { name: "[24] pagos mensuales", price: "[Precio] / mes" }],
          oneTime: { price: "[Precio]", was: "[Precio habitual]" },
          includes: ["Todos tus alineadores, hechos a partir de un escaneo 3D", "Kit de blanqueamiento gratis", "Retenedores para mantener tu nueva sonrisa"],
        },
      ],
    },
    kit: {
      eyebrow: "¿Aún no lo tienes claro?",
      title: "Empieza con un kit de impresiones.",
      body: "Toma las impresiones de tus dientes en casa y envíanoslas. Nuestros ortodoncistas comprueban si los alineadores son para ti antes de que elijas un plan.",
      image: { label: "Kit de impresiones", alt: "El kit de impresiones tamaz para casa" },
      price: "[Precio]",
      was: "[Precio habitual]",
    },
    categoriesLabel: "Comprar por categoría",
    categories: [{ label: "Todos los productos" }, { label: "Alineadores transparentes" }, { label: "Retenedores" }, { label: "Férulas de noche" }, { label: "Protectores bucales" }, { label: "Accesorios" }],
    products: {
      eyebrow: "Productos",
      title: "Cuidado, protección y accesorios.",
      items: [
        { name: "Retenedores", price: "[Precio]", was: "[Precio habitual]", badge: "[Oferta: descuento]" },
        { name: "Férula nocturna blanda a medida, ambas arcadas", price: "[Precio]", was: "[Precio habitual]", badge: "[Oferta: descuento]" },
        { name: "Protector bucal deportivo a medida", price: "[Precio]", was: "[Precio habitual]", badge: "[Oferta: descuento]" },
        { name: "Limpiador ultrasónico UV", price: "[Precio]", was: "[Precio habitual]", badge: "[Oferta: descuento]" },
        { name: "Kit inteligente de blanqueamiento dental", price: "[Precio]", was: "[Precio habitual]", badge: "[Oferta: descuento]" },
        { name: "Limpiador + blanqueador de alineadores", price: "[Precio]", was: "[Precio habitual]", badge: "[Oferta: descuento]" },
        { name: "Pastillas limpiadoras para alineadores, retenedores y prótesis, 120 uds.", price: "[Precio]", was: "", badge: "" },
        { name: "Lápiz blanqueador dental", price: "[Precio]", was: "[Precio habitual]", badge: "[Oferta: descuento]" },
        { name: "Herramienta para retirar alineadores", price: "[Precio]", was: "", badge: "" },
        { name: "Chewies (mordedores)", price: "[Precio]", was: "", badge: "" },
        { name: "Kit esencial para alineadores", price: "[Precio]", was: "[Precio habitual]", badge: "[Oferta: descuento]" },
        { name: "Separador de mejillas", price: "[Precio]", was: "", badge: "" },
        { name: "Estuche para alineadores", price: "[Precio]", was: "", badge: "" },
      ],
    },
    gift: {
      eyebrow: "Tarjetas regalo",
      title: "Regala una sonrisa mejor.",
      body: "Tarjetas regalo tamaz desde [importe], para cualquier plan o producto.",
    },
    cta: {
      title: "¿Listo para transformar tu sonrisa?",
      lede: "Reserva una visita para un escaneo 3D y un plan por escrito, o escríbenos antes para preguntar lo que quieras.",
      label: "Reserva tu cita",
    },
    whatsappMessage: "Hola tamaz, me gustaría pedir: {item}.",
    labels: {
      duration: "Duración del tratamiento",
      wear: "Tiempo de uso",
      oneTime: "Pago único",
      monthly: "O paga a plazos",
      includes: "Incluye",
      was: "Precio habitual",
      buy: "Comprar ahora",
      order: "Pedir ahora",
      giftCta: "Comprar tarjeta regalo",
      giftItem: "una tarjeta regalo tamaz",
    },
  },
  ui: {
    menu: "Menú",
    home: "Inicio de {brand}",
    language: "Idioma",
    before: "Antes",
    after: "Después",
    compare: "Comparar el antes y el después del caso {n}",
    caseClip: "Vídeo del caso {n}",
    caseClipTitle: "Caso {n}: {title}, del antes al después",
    onAverage: "{average} de media",
    journeyLabel: "Etapas del tratamiento",
    readouts: { crowding: "Apiñamiento", average: "Tratamiento promedio", complete: "Plan completado" },
    clinicsAudiences: "Para quién es",
    clinicsSteps: "Cómo funciona un caso asociado",
    stars: "5 de 5 estrellas",
    directions: "Cómo llegar",
    map: { tabs: "Mostrar la clínica en el mapa", show: "Mostrar mapa", loads: "Carga Google Maps", title: "Mapa de {name}" },
    form: {
      firstName: "Nombre",
      lastName: "Apellidos",
      phone: "Teléfono",
      email: "Correo electrónico",
      treatment: "Me interesa",
      studio: "Clínica preferida",
      message: "¿Algo que debamos saber?",
      sending: "Enviando…",
    },
  },
};
