import type { Translation } from "../index";

/** French. Text only; links, images and numbers come from the English copy (site.ts). */
export const fr: Translation = {
  brand: {
    description:
      "Appareils dentaires et aligneurs transparents pour enfants, ados et adultes, par des orthodontistes diplômés. Une première visite avec scan 3D, un plan écrit et votre mensualité.",
  },
  whatsapp: { label: "Discuter avec tamaz sur WhatsApp (0306 1336555)" },
  nav: {
    links: [
      { label: "Votre parcours" },
      { label: "Résultats" },
      { label: "Étapes" },
      { label: "Pour les cliniques" },
      { label: "Avis" },
      { label: "Adresses" },
      { label: "Boutique" },
    ],
    cta: { label: "Prendre rendez-vous" },
  },
  hero: {
    tagline: "Meilleur choix, meilleur sourire",
    eyebrow: "Appareils et aligneurs transparents · enfants, ados, adultes",
    headlineBefore: "Des sourires plus droits, un",
    headlineWord: "millimètre",
    headlineAfter: "à la fois.",
    lede: "Des orthodontistes diplômés, quatre cabinets de quartier et une première visite gratuite. Vous repartez avec un scan 3D, un plan de traitement écrit et votre mensualité avant tout engagement.",
    primaryCta: { label: "Prendre rendez-vous" },
    secondaryCta: { label: "Voir de vrais résultats" },
    trust: [
      { value: "4,9 ★", label: "plus de 2 300 avis de patients" },
      { value: "0 € d’apport", label: "paiements sans intérêts" },
      { value: "Samedis et soirées", label: "dans chaque cabinet" },
    ],
    chips: { duration: "18 mois", durationLabel: "traitement moyen", scan: "Scan 3D gratuit" },
    smileLabel: "Animation de dents du haut qui passent de chevauchées à alignées à la pose de l’appareil",
    aligner: { alt: "Rendu 3D d’un aligneur transparent", title: "Rendu 3D d’un aligneur transparent qui tourne" },
  },
  alignerAbout: {
    eyebrow: "Aligneurs transparents",
    title: "Presque invisibles, et faits pour vos dents uniquement.",
    lede: "Chaque aligneur est façonné à partir d’un scan 3D de vos dents. Vous passez à une nouvelle série toutes les [1 à 2] semaines, et chacune rapproche vos dents d’une fraction de millimètre de votre sourire final.",
    points: [
      { title: "Sur mesure grâce au scan 3D", body: "Pas de porte-empreintes. Un scan de quatre minutes cartographie chaque dent, et votre orthodontiste planifie chaque mouvement à l’écran." },
      { title: "Retirez-les pour manger", body: "Enlevez-les pour les repas, le brossage et le fil dentaire : aucun aliment n’est interdit." },
      { title: "Portés 20 à 22 heures par jour", body: "Un plastique fin et lisse, sans fils ni bagues : la plupart des gens ne remarqueront pas que vous les portez." },
    ],
    durationBody: "[La fréquence des contrôles pendant le traitement, par ex. une courte visite toutes les 6 à 8 semaines.]",
    cta: { label: "Prendre rendez-vous" },
    readMore: { label: "En savoir plus" },
  },
  aboutPage: { metaTitle: "Nos aligneurs", back: { label: "Retour à l’accueil" } },
  results: {
    eyebrow: "Vrais résultats",
    title: "Regardez de vrais sourires changer.",
    lede: "Chaque cas présenté est un patient tamaz, partagé avec son accord écrit. Faites glisser les photos pour comparer avant et après.",
    cases: [
      {
        title: "Chevauchement",
        detail: "Bagues métalliques · 20 mois",
        before: { label: "Cas 1 · avant", alt: "Dents chevauchées avant le traitement" },
        after: { label: "Cas 1 · après", alt: "Dents alignées après le traitement" },
      },
      {
        title: "Espacement",
        detail: "Aligneurs transparents · 9 mois",
        before: { label: "Cas 2 · avant", alt: "Espace entre les dents de devant avant le traitement" },
        after: { label: "Cas 2 · après", alt: "Espace refermé après le traitement" },
      },
      {
        title: "Supraclusion profonde",
        detail: "Bagues céramiques · 22 mois",
        before: { label: "Cas 3 · avant", alt: "Supraclusion avant le traitement" },
        after: { label: "Cas 3 · après", alt: "Occlusion corrigée après le traitement" },
      },
    ],
  },
  journey: {
    eyebrow: "Votre parcours de {months} mois",
    title: "Faites défiler pour voir un sourire se mettre en place.",
    lede: "Les dents se déplacent d’environ un millimètre par mois sous une force légère et constante. Voici à quoi cela ressemble, du premier scan à la contention.",
    photos: {
      start: { alt: "Sourire aux dents de travers et irrégulières avant le traitement" },
      worn: { alt: "Le sourire avec des aligneurs transparents sur les deux arcades" },
      end: { alt: "Le sourire aligné après le traitement" },
    },
    appliances: {
      aligners: { label: "Aligneurs transparents", average: "[12] mois" },
      braces: { label: "Bagues", average: "18 mois" },
    },
    stages: [
      {
        name: "Scan",
        body: "Consultation et scan 3D, environ quatre minutes et sans porte-empreintes. Votre orthodontiste planifie le mouvement de chaque dent et vous montre le résultat à l’écran.",
      },
      {
        name: "Alignement",
        body: "Les bagues sont posées en une heure environ, puis l’arc aligne doucement les dents. Visites de réglage toutes les 6 à 8 semaines.",
        aligners: { name: "Alignement", body: "Une nouvelle série de gouttières transparentes toutes les une à deux semaines, portées 22 heures par jour, avec des contrôles toutes les 8 à 10 semaines et des gouttières de finition pour les dernières fractions de millimètre." },
      },
      {
        name: "Contention",
        body: "Les bagues retirées, des contentions transparentes maintiennent votre nouveau sourire. La première est incluse.",
        aligners: { name: "Contention", body: "Dernières gouttières terminées, des contentions transparentes maintiennent votre nouveau sourire. La première est incluse." },
      },
    ],
  },
  process: {
    eyebrow: "Comment ça marche",
    title: "Du scan jusqu’à chez vous.",
    lede: "Chaque cas d’aligneurs passe par les mêmes six étapes, et nous vous tenons informé à chacune d’elles.",
    steps: [
      { title: "Scan reçu", body: "Votre scan 3D arrive à notre laboratoire et votre dossier est ouvert.", time: "[Durée]" },
      { title: "Conception et proposition", body: "Votre orthodontiste planifie chaque mouvement dentaire et vous présente le résultat proposé.", time: "[Durée]" },
      { title: "Modifications et ajustements", body: "Nous ajustons le plan selon vos retours jusqu’à ce que vous et votre orthodontiste l’approuviez.", time: "[Durée]" },
      { title: "En fabrication", body: "Vos aligneurs sur mesure sont fabriqués et contrôlés pour l’ajustement et la qualité.", time: "[Durée]" },
      { title: "En cours de livraison", body: "Vos aligneurs sont emballés et en route vers vous ou votre cabinet.", time: "[Durée]" },
      { title: "Livré", body: "Vos aligneurs arrivent et votre traitement commence.", time: "[Durée]" },
    ],
  },
  clinics: {
    eyebrow: "Pour les dentistes et orthodontistes",
    title: "Proposez les aligneurs tamaz dans votre cabinet.",
    lede: "Envoyez-nous vos scans. Nos orthodontistes planifient le cas, notre laboratoire fabrique les aligneurs et nous les expédions à votre cabinet, prêts à remettre. Le patient reste le vôtre et vous fixez vos honoraires.",
    audiences: ["Dentistes généralistes", "Orthodontistes", "Groupes dentaires"],
    cta: { label: "Devenir cabinet partenaire" },
    contact: "Ou écrivez à partners@[votre-domaine].com",
    benefits: [
      { title: "Tout scanner, sans nouvel équipement", body: "Envoyez des scans intra-oraux directement depuis 3Shape TRIOS, Medit ou iTero, ou en fichiers STL, avec photos et radiographies." },
      { title: "Un plan en [2 à 3 jours]", body: "Un orthodontiste conçoit chaque mouvement dentaire et vous envoie un plan 3D à approuver, modifier ou discuter." },
      { title: "Montrez le résultat au fauteuil", body: "Partagez la simulation 3D avec votre patient lors de la consultation, pour qu’il voie son sourire avant de s’engager." },
      { title: "Un prix clair par cas", body: "[Prix par cas] affiché avant la commande. Sans abonnement, sans volume minimum, finitions [incluses]." },
    ],
    steps: [
      { title: "Scanner", body: "Envoyez le scan et les photos depuis votre cabinet.", time: "Jour 1" },
      { title: "Planifier", body: "Examinez le plan 3D et la simulation ; demandez des modifications jusqu’à ce qu’il vous convienne.", time: "[2 à 3 jours]" },
      { title: "Fabriquer", body: "Nous imprimons, découpons et contrôlons chaque aligneur dans notre laboratoire.", time: "[5 à 7 jours ouvrés]" },
      { title: "Traiter", body: "Les aligneurs arrivent dans des étuis tamaz. Nous gérons avec vous les finitions et les contentions.", time: "[En continu]" },
    ],
    support: "Chaque cas a un orthodontiste attitré que vous pouvez contacter, du premier plan à la contention finale.",
  },
  reviews: {
    eyebrow: "Témoignages de patients",
    title: "Noté 4,9 par plus de 2 300 patients et parents.",
    items: [
      { quote: "Ils ont montré à ma fille son sourire final à l’écran dès la première visite. Ensuite, elle comptait les mois.", detail: "Parent · bagues métalliques" },
      { quote: "J’ai 41 ans et j’appréhendais de commencer. Bagues céramiques, rendez-vous le samedi, et personne au travail n’a rien remarqué pendant des mois.", detail: "Adulte · bagues céramiques" },
      { quote: "Mon aligneur s’est abîmé un vendredi et ils l’ont réparé le lendemain matin. Le plan de paiement était exactement celui du devis.", detail: "Aligneurs transparents" },
    ],
    google: { rating: "4,9", count: "[Plus de 2 300] avis Google", linkLabel: "Lire tous les avis sur Google" },
  },
  locations: {
    eyebrow: "Cabinets",
    title: "Quatre cabinets, ouverts en soirée et le samedi.",
    studios: [
      { hours: "Lun–Ven 8h–19h", name: "[Nom du cabinet 1]", address: "[Adresse, ville, code postal]", phone: "[Numéro de téléphone]" },
      { hours: "Lun–Ven 9h–20h", name: "[Nom du cabinet 2]", address: "[Adresse, ville, code postal]", phone: "[Numéro de téléphone]" },
      { hours: "Lun–Ven 8h–18h", name: "[Nom du cabinet 3]", address: "[Adresse, ville, code postal]", phone: "[Numéro de téléphone]" },
      { hours: "Sam 8h–14h", name: "[Nom du cabinet 4]", address: "[Adresse, ville, code postal]", phone: "[Numéro de téléphone]" },
    ],
    map: { label: "Carte des cabinets", alt: "Carte des quatre cabinets tamaz" },
  },
  faq: {
    eyebrow: "Questions",
    title: "FAQ",
    groups: [
      {
        title: "Généralités et technologie",
        items: [
          {
            question: "Que sont les aligneurs transparents, et en quoi diffèrent-ils des bagues métalliques ?",
            answer: "Les aligneurs transparents sont des gouttières amovibles sur mesure en thermoplastique transparent, qui épousent vos dents. Contrairement aux bagues, ils se voient à peine, vous les retirez pour manger donc aucun aliment n’est interdit, et il n’y a ni bagues ni fils métalliques qui frottent contre les joues et les gencives.",
          },
          {
            question: "Comment les aligneurs déplacent-ils vraiment mes dents ?",
            answer: "Chaque série d’aligneurs est conçue numériquement pour exercer une pression douce et précise sur certaines dents. Vous portez chaque série une à deux semaines, et chaque nouvelle série déplace vos dents un peu plus, par petites étapes planifiées, vers la position finale prescrite par votre orthodontiste.",
          },
        ],
      },
      {
        title: "Indications et durée",
        items: [
          {
            question: "Suis-je un bon candidat pour les aligneurs transparents ?",
            answer: "Les aligneurs traitent la plupart des cas légers à modérés, dont le chevauchement, les espaces et les supraclusions ou classes III simples. Les problèmes d’occlusion plus sévères ou complexes peuvent nécessiter des bagues classiques ou une combinaison des deux. Le seul moyen d’en être sûr est un bilan orthodontique avec scan 3D et imagerie numérique, compris dans votre consultation.",
          },
          {
            question: "Combien de temps durera mon traitement ?",
            answer: "La plupart des traitements par aligneurs durent de 6 à 18 mois, selon la complexité de votre cas. Le facteur le plus important qui dépend de vous est le temps de port : retirer trop souvent ses aligneurs est la raison la plus fréquente d’un traitement plus long que prévu.",
          },
        ],
      },
      {
        title: "Quotidien et temps de port",
        items: [
          {
            question: "Est-ce important de porter mes aligneurs tous les jours ?",
            answer: "C’est essentiel. Les aligneurs doivent être portés 20 à 22 heures par jour et retirés uniquement pour manger, pour boire autre chose que de l’eau plate et pour vous brosser les dents. Des aligneurs qui restent dans leur étui ne déplacent pas les dents.",
          },
          {
            question: "Puis-je manger ou boire avec mes aligneurs ?",
            answer: "Retirez-les pour manger, et pour boire autre chose que de l’eau plate et fraîche. Les boissons chaudes peuvent déformer le plastique, et les boissons sucrées ou colorées peuvent tacher les gouttières et retenir sucre et acide contre vos dents, ce qui augmente le risque de caries.",
          },
        ],
      },
      {
        title: "Entretien et confort",
        items: [
          {
            question: "Comment nettoyer mes aligneurs ?",
            answer: "Nettoyez-les chaque jour avec une brosse à dents souple et un savon doux non abrasif ou une solution de nettoyage adaptée, à l’eau froide ou tiède. L’eau chaude peut abîmer le matériau. Après avoir mangé, brossez-vous les dents et passez le fil avant de les remettre, pour qu’aucun aliment ne reste contre vos dents.",
          },
          {
            question: "Les aligneurs transparents font-ils mal ?",
            answer: "Vous pouvez ressentir une pression ou une sensibilité pendant un jour ou deux en passant à une nouvelle série. C’est le signe qu’ils agissent. La plupart des gens trouvent les aligneurs bien plus confortables que les bagues métalliques.",
          },
        ],
      },
      {
        title: "Déroulement et suivi",
        items: [
          {
            question: "Les aligneurs vont-ils changer ma façon de parler ou me faire zozoter ?",
            answer: "Certaines personnes zozotent légèrement les premiers jours, le temps que la langue s’habitue à une nouvelle série. Cela passe généralement vite, et les aligneurs ont très peu d’effet sur l’élocution.",
          },
          {
            question: "Aurai-je besoin d’une contention après le traitement ?",
            answer: "Oui. Les dents ont naturellement tendance à revenir vers leur ancienne position, donc chacun a besoin d’une forme de contention après le traitement pour garder son nouveau sourire. Votre première contention est incluse.",
          },
        ],
      },
    ],
  },
  consultation: {
    title: "Prenez rendez-vous.",
    lede: "Parlez-nous un peu de vous et un coordinateur vous appellera pour confirmer un horaire sous un jour ouvré.",
    perks: ["Scan 3D et examen", "Plan écrit et prix exact", "Sans engagement, sans pression"],
    treatmentOptions: ["Je ne sais pas encore", "Bagues métalliques", "Bagues céramiques transparentes", "Aligneurs transparents", "Traitement précoce pour mon enfant"],
    submit: "Demander mon rendez-vous",
    note: "Nous utiliserons vos coordonnées uniquement pour organiser votre rendez-vous.",
    errors: {
      firstName: "Indiquez votre prénom pour que nous sachions qui demander.",
      phone: "Indiquez un numéro de téléphone pour qu’un coordinateur puisse vous joindre.",
      email: "Vérifiez l’adresse e-mail, ou laissez le champ vide.",
      server: "Une erreur s’est produite lors de l’envoi de votre demande. Réessayez ou appelez le cabinet le plus proche.",
    },
    success: "Merci, {name}. Nous avons bien reçu votre demande pour le cabinet {studio}, et un coordinateur vous appellera pour confirmer un horaire sous un jour ouvré.",
  },
  footer: {
    blurb: "Appareils dentaires et aligneurs transparents pour enfants, ados et adultes, par des orthodontistes diplômés.",
    columns: [
      {
        title: "Découvrir",
        links: [{ label: "Votre parcours" }, { label: "Avant / après" }, { label: "Comment ça marche" }, { label: "Pour les cliniques" }, { label: "Avis" }, { label: "Boutique" }],
      },
      {
        title: "Patients",
        links: [{ label: "Prendre rendez-vous" }, { label: "[Lien vers l’espace patient]" }, { label: "[Lien pour régler ma facture]" }],
      },
      {
        title: "Contact",
        links: [{ label: "[Numéro de téléphone principal]" }, { label: "bonjour@[votre-domaine].com" }, { label: "Urgences : appelez votre cabinet" }, { label: "Toutes les adresses" }],
      },
    ],
    license: "[Licence / n° d’enregistrement du cabinet]",
    legal: [{ label: "Politique de confidentialité" }, { label: "Accessibilité" }, { label: "Conditions" }, { label: "Avis sur la protection des données" }],
  },
  shop: {
    metaTitle: "Boutique",
    back: { label: "Retour à l’accueil" },
    hero: {
      eyebrow: "Boutique tamaz",
      title: "Tout ce dont votre sourire a besoin.",
      lede: "Des formules d’aligneurs transparents, un kit pour commencer et les produits d’entretien qui gardent vos aligneurs et contentions impeccables.",
      image: { label: "Image de la boutique", alt: "Aligneurs transparents et produits d’entretien tamaz" },
    },
    plans: {
      eyebrow: "Aligneurs transparents",
      title: "Des formules d’aligneurs pour chaque sourire.",
      lede: "Deux façons d’aligner vos dents : porter vos aligneurs toute la journée, ou surtout pendant votre sommeil.",
      review: "Chaque formule est validée par un orthodontiste diplômé avant de commencer. [Si les aligneurs ne vous conviennent pas, vous êtes intégralement remboursé.]",
      items: [
        {
          name: "Formule jour et nuit",
          badge: "Meilleur prix",
          duration: "[4 à 6] mois",
          wear: "22 heures par jour",
          summary: "Le moyen le plus rapide d’obtenir un sourire aligné : portez vos aligneurs jour et nuit, en les retirant seulement pour manger et vous brosser les dents.",
          image: { label: "Formule jour et nuit", alt: "Aligneurs transparents tamaz de la formule jour et nuit" },
          monthly: [{ name: "[12] mensualités", price: "[Prix] / mois" }, { name: "[24] mensualités", price: "[Prix] / mois" }],
          oneTime: { price: "[Prix]", was: "[Prix habituel]" },
          includes: ["Tous vos aligneurs, fabriqués à partir d’un scan 3D", "Kit de blanchiment offert", "Contentions pour garder votre nouveau sourire"],
        },
        {
          name: "Formule nuit",
          badge: "La plus choisie",
          duration: "[6 à 8] mois",
          wear: "10 heures par jour",
          summary: "Portez vos aligneurs le soir et la nuit, et passez vos journées sans eux.",
          image: { label: "Formule nuit", alt: "Aligneurs transparents tamaz de la formule nuit" },
          monthly: [{ name: "[12] mensualités", price: "[Prix] / mois" }, { name: "[24] mensualités", price: "[Prix] / mois" }],
          oneTime: { price: "[Prix]", was: "[Prix habituel]" },
          includes: ["Tous vos aligneurs, fabriqués à partir d’un scan 3D", "Kit de blanchiment offert", "Contentions pour garder votre nouveau sourire"],
        },
      ],
    },
    kit: {
      eyebrow: "Pas encore décidé ?",
      title: "Commencez par un kit d’empreintes.",
      body: "Prenez les empreintes de vos dents chez vous et renvoyez-les. Nos orthodontistes vérifient si les aligneurs vous conviennent avant que vous choisissiez une formule.",
      image: { label: "Kit d’empreintes", alt: "Le kit d’empreintes tamaz à domicile" },
      price: "[Prix]",
      was: "[Prix habituel]",
    },
    categoriesLabel: "Acheter par catégorie",
    categories: [{ label: "Tous les produits" }, { label: "Aligneurs transparents" }, { label: "Contentions" }, { label: "Gouttières de nuit" }, { label: "Protège-dents" }, { label: "Accessoires" }],
    products: {
      eyebrow: "Produits",
      title: "Entretien, protection et accessoires.",
      items: [
        { name: "Contentions", price: "[Prix]", was: "[Prix habituel]", badge: "[Promo : réduction]" },
        { name: "Gouttière de nuit souple sur mesure, deux arcades", price: "[Prix]", was: "[Prix habituel]", badge: "[Promo : réduction]" },
        { name: "Protège-dents de sport sur mesure", price: "[Prix]", was: "[Prix habituel]", badge: "[Promo : réduction]" },
        { name: "Nettoyeur à ultrasons UV", price: "[Prix]", was: "[Prix habituel]", badge: "[Promo : réduction]" },
        { name: "Kit de blanchiment dentaire intelligent", price: "[Prix]", was: "[Prix habituel]", badge: "[Promo : réduction]" },
        { name: "Nettoyant + blanchissant pour aligneurs", price: "[Prix]", was: "[Prix habituel]", badge: "[Promo : réduction]" },
        { name: "Pastilles nettoyantes pour aligneurs, contentions et prothèses, 120 pièces", price: "[Prix]", was: "", badge: "" },
        { name: "Stylo blanchissant", price: "[Prix]", was: "[Prix habituel]", badge: "[Promo : réduction]" },
        { name: "Crochet de retrait pour aligneurs", price: "[Prix]", was: "", badge: "" },
        { name: "Chewies (rouleaux à mâcher)", price: "[Prix]", was: "", badge: "" },
        { name: "Kit essentiel pour aligneurs", price: "[Prix]", was: "[Prix habituel]", badge: "[Promo : réduction]" },
        { name: "Écarteur de joues", price: "[Prix]", was: "", badge: "" },
        { name: "Étui pour aligneurs", price: "[Prix]", was: "", badge: "" },
      ],
    },
    gift: {
      eyebrow: "Cartes cadeaux",
      title: "Offrez un plus beau sourire.",
      body: "Cartes cadeaux tamaz à partir de [montant], valables sur toutes les formules et tous les produits.",
    },
    cta: {
      title: "Prêt à transformer votre sourire ?",
      lede: "Prenez rendez-vous pour un scan 3D et un plan écrit, ou écrivez-nous d’abord pour poser vos questions.",
      label: "Prendre rendez-vous",
    },
    whatsappMessage: "Bonjour tamaz, je souhaite commander : {item}.",
    labels: {
      duration: "Durée du traitement",
      wear: "Temps de port",
      oneTime: "Paiement unique",
      monthly: "Ou payez en plusieurs fois",
      includes: "Inclus",
      was: "Prix habituel",
      buy: "Acheter",
      order: "Commander",
      giftCta: "Acheter une carte cadeau",
      giftItem: "une carte cadeau tamaz",
    },
  },
  ui: {
    menu: "Menu",
    home: "Accueil {brand}",
    language: "Langue",
    before: "Avant",
    after: "Après",
    compare: "Comparer avant et après pour le cas {n}",
    caseClip: "Vidéo du cas {n}",
    caseClipTitle: "Cas {n} : {title}, de l’avant à l’après",
    onAverage: "{average} en moyenne",
    journeyLabel: "Étapes du traitement",
    readouts: { crowding: "Chevauchement", average: "Traitement moyen", complete: "Plan réalisé" },
    clinicsAudiences: "À qui ça s’adresse",
    clinicsSteps: "Déroulement d’un cas partenaire",
    stars: "5 étoiles sur 5",
    directions: "Itinéraire",
    map: { tabs: "Afficher le cabinet sur la carte", show: "Afficher la carte", loads: "Charge Google Maps", title: "Carte de {name}" },
    form: {
      firstName: "Prénom",
      lastName: "Nom",
      phone: "Téléphone",
      email: "E-mail",
      treatment: "Intéressé(e) par",
      studio: "Cabinet préféré",
      message: "Quelque chose à nous dire ?",
      sending: "Envoi…",
    },
  },
};
