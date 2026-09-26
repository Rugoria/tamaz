/**
 * All editable copy for the tamaz site lives here.
 *
 * Anything written in [square brackets] is a placeholder: it renders with a
 * yellow highlight on the page until you replace it with real content.
 */

export type NavLink = { label: string; href: string };

export type Treatment = {
  /** Which icon to draw (see components/Treatments.tsx). */
  icon: "metal" | "ceramic" | "aligners" | "selfLigating" | "phase1" | "retainers";
  title: string;
  body: string;
  duration: string;
  price: string;
};

export type Doctor = {
  name: string;
  image: string;
  alt: string;
  credentials: string[];
  bio: string;
};

export type Case = {
  title: string;
  detail: string;
  before: { src: string; label: string; alt: string };
  after: { src: string; label: string; alt: string };
};

export type JourneyStage = { name: string; body: string; label: string; start: number; end: number };

export type BandColor = { name: string; hex: string };

export type CostOption = { label: string; price: number };

export type TechFeature = { kicker: string; title: string; body: string };

export type GalleryImage = { src: string; label: string; size: string; alt: string };

export type Review = { quote: string; name: string; detail: string; initials: string; color: string };

export type Studio = { name: string; hours: string; address: string; phone: string };

export type Faq = { question: string; answer: string };

export type Article = { image: GalleryImage; kicker: string; title: string; href: string };

export const brand = {
  name: "tamaz",
  description:
    "Braces and clear aligners for kids, teens and adults, from board-certified orthodontists. Free first visit with a 3D scan, a written plan and your monthly price.",
};

export const promo = {
  offer: "[Current offer]",
  text: "Free consultation + $500 off braces when you start by",
  date: "[date]",
  cta: { label: "Claim it →", href: "#consult" },
};

export const nav: { links: NavLink[]; cta: NavLink } = {
  links: [
    { label: "Treatments", href: "#treatments" },
    { label: "Our team", href: "#team" },
    { label: "Results", href: "#results" },
    { label: "Your journey", href: "#journey" },
    { label: "Cost", href: "#cost" },
    { label: "Locations", href: "#visit" },
  ],
  cta: { label: "Book free consult", href: "#consult" },
};

export const hero = {
  eyebrow: "Braces & clear aligners · kids, teens, adults",
  headlineBefore: "Straighter smiles, one",
  headlineWord: "millimeter",
  headlineAfter: "at a time.",
  lede:
    "Board-certified orthodontists, four neighborhood studios and a free first visit. You leave with a 3D scan, a written treatment plan and your monthly price before you commit to anything.",
  primaryCta: { label: "Book a free consultation", href: "#consult" },
  secondaryCta: { label: "Compare treatments", href: "#treatments" },
  trust: [
    { value: "4.9 ★", label: "2,300+ patient reviews" },
    { value: "$0 down", label: "interest-free plans" },
    { value: "Sat & evenings", label: "at every studio" },
  ],
  chips: { duration: "18 mo", durationLabel: "average treatment", scan: "Free 3D scan" },
  smileLabel: "Animated upper teeth moving from crowded to straight as braces are applied",
};

export const marquee = [
  "Metal braces",
  "Clear ceramic braces",
  "Clear aligners",
  "Self-ligating braces",
  "Early treatment, age 7+",
  "Adult orthodontics",
  "Retainers",
  "Same-week repairs",
];

export const treatments = {
  eyebrow: "Treatments",
  title: "The right appliance for your bite, age and schedule.",
  lede: "Every option is planned digitally by the same orthodontist who sees you at each visit. We’ll recommend one; you choose.",
  items: [
    {
      icon: "metal",
      title: "Metal braces",
      body: "The most precise tool for complex bites. Smaller brackets than you remember, plus colored bands you can change every visit.",
      duration: "18–24 months",
      price: "from $4,800",
    },
    {
      icon: "ceramic",
      title: "Clear ceramic braces",
      body: "Tooth-colored brackets that blend in, with the same control as metal. A favorite for adults and senior photos.",
      duration: "18–24 months",
      price: "from $5,600",
    },
    {
      icon: "aligners",
      title: "Clear aligners",
      body: "Removable trays you swap every one to two weeks. We check progress with in-office scans, not guesswork by mail.",
      duration: "6–18 months",
      price: "from $5,900",
    },
    {
      icon: "selfLigating",
      title: "Self-ligating braces",
      body: "Brackets with a built-in sliding door instead of bands. Lighter forces, fewer adjustments, quicker visits.",
      duration: "16–22 months",
      price: "from $5,300",
    },
    {
      icon: "phase1",
      title: "Early treatment (Phase 1)",
      body: "A check-up by age 7 can catch crossbites and crowding early. Most kids only need monitoring, and the visit is free.",
      duration: "ages 7–10",
      price: "from $2,900",
    },
    {
      icon: "retainers",
      title: "Retainers & adult relapse",
      body: "Had braces years ago and teeth shifted back? Short aligner courses and bonded retainers keep results for life.",
      duration: "3–9 months",
      price: "from $1,400",
    },
  ] satisfies Treatment[],
};

export const team = {
  eyebrow: "Meet your orthodontists",
  title: "Specialists who finished two to three extra years of orthodontic training.",
  lede: "You see the same doctor from your first scan to the day your braces come off.",
  doctors: [
    {
      name: "Dr. [Full name], DDS, MS",
      image: "images/doctor-1.jpg",
      alt: "Portrait of the founding orthodontist",
      credentials: ["Founder", "Board certified"],
      bio: "[Short bio: residency, years in practice, what patients like about them.]",
    },
    {
      name: "Dr. [Full name], DMD, MS",
      image: "images/doctor-2.jpg",
      alt: "Portrait of an orthodontist",
      credentials: ["Adult & aligner care"],
      bio: "[Short bio: residency, focus areas, languages spoken.]",
    },
    {
      name: "Dr. [Full name], DDS, MS",
      image: "images/doctor-3.jpg",
      alt: "Portrait of an orthodontist",
      credentials: ["Early treatment"],
      bio: "[Short bio: residency, focus areas, community work.]",
    },
  ] satisfies Doctor[],
};

export const results = {
  eyebrow: "Real results",
  title: "Drag to compare before and after.",
  lede: "Every case shown is a tamaz patient, shared with written consent.",
  cases: [
    {
      title: "Crowding",
      detail: "Metal braces · 20 months",
      before: { src: "images/case-1-before.jpg", label: "Case 1 · before", alt: "Crowded teeth before treatment" },
      after: { src: "images/case-1-after.jpg", label: "Case 1 · after", alt: "Straight teeth after treatment" },
    },
    {
      title: "Spacing",
      detail: "Clear aligners · 9 months",
      before: { src: "images/case-2-before.jpg", label: "Case 2 · before", alt: "Gap between front teeth before treatment" },
      after: { src: "images/case-2-after.jpg", label: "Case 2 · after", alt: "Gap closed after treatment" },
    },
    {
      title: "Deep overbite",
      detail: "Ceramic braces · 22 months",
      before: { src: "images/case-3-before.jpg", label: "Case 3 · before", alt: "Overbite before treatment" },
      after: { src: "images/case-3-after.jpg", label: "Case 3 · after", alt: "Corrected bite after treatment" },
    },
  ] satisfies Case[],
};

export const journey = {
  eyebrow: "Your 18-month journey",
  title: "Scroll to watch a smile move into place.",
  lede: "Teeth move roughly one millimeter a month under light, steady force. Here is what that looks like from first scan to retainer.",
  smileLabel: "Teeth moving from crowded to straight across treatment stages",
  /** start/end are fractions of the scroll through the section. */
  stages: [
    { name: "Scan", label: "Consultation", start: 0, end: 0.12, body: "Free consultation and 3D scan. About four minutes, with no impression trays." },
    { name: "Plan", label: "Treatment plan", start: 0.12, end: 0.22, body: "Your orthodontist sets a target position for every tooth and shows you the result on screen." },
    { name: "Bond", label: "Bonding day", start: 0.22, end: 0.32, body: "Brackets go on in about an hour. You pick your band colors." },
    { name: "Align", label: "Alignment", start: 0.32, end: 0.8, body: "The archwire gently pulls teeth into line. Adjustment visits every 6–8 weeks." },
    { name: "Detail", label: "Detailing", start: 0.8, end: 0.9, body: "Fine-tuning of the bite, root angles and the last fractions of a millimeter." },
    { name: "Retain", label: "Retention", start: 0.9, end: 1.01, body: "Brackets off, retainers on. Your first set is included." },
  ] satisfies JourneyStage[],
};

export const bandStudio = {
  eyebrow: "Band color studio",
  title: "Make your braces yours.",
  lede: "Pick new colors at every adjustment. Try a combination here and we’ll have it ready at your next visit.",
  hint: "Tip: tap any band on the smile to paint just that tooth.",
  smileLabel: "Preview of braces with your chosen band colors",
  colors: [
    { name: "Coral", hex: "#E9543F" },
    { name: "Sunflower", hex: "#F4B400" },
    { name: "Mint", hex: "#3CC8A0" },
    { name: "Sky", hex: "#3E9BE8" },
    { name: "Violet", hex: "#8B6BE8" },
    { name: "Rose", hex: "#F27BB0" },
    { name: "Midnight", hex: "#1E2A5A" },
    { name: "Glow", hex: "#C7F464" },
    { name: "Pearl", hex: "#E9EEF2" },
    { name: "Ruby", hex: "#B3163A" },
  ] satisfies BandColor[],
  defaults: { a: "#E9543F", b: "#3E9BE8" },
};

export const technology = {
  eyebrow: "Technology",
  title: "See your finished smile before day one.",
  scanLabel: "Animation of an intraoral 3D scan building a point cloud of a tooth",
  stats: [
    { label: "Scan accuracy", value: "±20 µm" },
    { label: "Scan time", value: "~4 min" },
    { label: "Radiation", value: "0 mSv" },
  ],
  features: [
    { kicker: "3D INTRAORAL SCAN", title: "No goopy impressions", body: "A wand captures thousands of points per second to build a model of every tooth, accurate to about 20 microns." },
    { kicker: "DIGITAL SETUP", title: "A plan you can watch", body: "We move each tooth virtually and show you the path, the timeline and the final bite on screen at your consultation." },
    { kicker: "LOW-DOSE IMAGING", title: "Less radiation, more detail", body: "Digital X-rays use a fraction of film dose, and we only take them when they change a decision." },
  ] satisfies TechFeature[],
};

export const cost = {
  eyebrow: "Cost & financing",
  title: "Know your monthly payment in 20 seconds.",
  lede: "Interest-free plans on every treatment. We bill most insurance plans directly and apply your orthodontic benefit up front.",
  options: [
    { label: "Metal", price: 4800 },
    { label: "Ceramic", price: 5600 },
    { label: "Aligners", price: 5900 },
    { label: "Phase 1", price: 2900 },
  ] satisfies CostOption[],
  /** Estimated benefit = min(maxInsurance, fee × insuranceShare). */
  maxInsurance: 1500,
  insuranceShare: 0.5,
  down: { min: 0, max: 1500, step: 50, initial: 0 },
  months: { min: 6, max: 36, step: 1, initial: 24 },
  insuranceLabel: "My insurance includes orthodontic coverage",
  note: "Sample pricing for illustration. Your exact fee is set at your free consultation.",
  logosIntro: "In-network with most major plans, including:",
  logos: ["Insurance logo 1", "Insurance logo 2", "Insurance logo 3", "Insurance logo 4", "Insurance logo 5", "Financing partner"],
};

export const gallery = {
  eyebrow: "Inside our studios",
  title: "Bright rooms, short waits and a coffee bar for parents.",
  images: [
    { src: "images/studio-1.jpg", label: "Studio interior, wide", size: "1600 × 1200", alt: "Treatment area at a tamaz studio" },
    { src: "images/studio-2.jpg", label: "Reception", size: "800 × 600", alt: "Reception desk" },
    { src: "images/studio-3.jpg", label: "3D scanner in use", size: "800 × 600", alt: "Patient having a 3D scan" },
    { src: "images/studio-4.jpg", label: "Team photo", size: "800 × 600", alt: "The tamaz clinical team" },
    { src: "images/studio-5.jpg", label: "Smiling patient", size: "800 × 600", alt: "Patient smiling after braces removal" },
  ] satisfies GalleryImage[],
};

export const reviews = {
  eyebrow: "Patient stories",
  title: "Rated 4.9 by 2,300+ patients and parents.",
  items: [
    {
      quote: "They showed my daughter her finished smile on the screen at the first visit. She counted down the months after that.",
      name: "Maria R.",
      detail: "Parent · metal braces",
      initials: "MR",
      color: "var(--accent)",
    },
    {
      quote: "I’m 41 and was nervous to start. Ceramic brackets, Saturday appointments, and nobody at work noticed for months.",
      name: "Daniel K.",
      detail: "Adult · ceramic braces",
      initials: "DK",
      color: "var(--aqua)",
    },
    {
      quote: "My aligner popped a bump on a Friday and they fixed it the next morning. The payment plan was exactly what they quoted.",
      name: "Aisha T.",
      detail: "Clear aligners",
      initials: "AT",
      color: "#6B5BD6",
    },
  ] satisfies Review[],
};

export const locations = {
  eyebrow: "Studios",
  title: "Four studios, open evenings and Saturdays.",
  studios: [
    { hours: "Mon–Fri 8a–7p", name: "[Studio 1 name]", address: "[Street address, city, ZIP]", phone: "[Phone number]" },
    { hours: "Mon–Fri 9a–8p", name: "[Studio 2 name]", address: "[Street address, city, ZIP]", phone: "[Phone number]" },
    { hours: "Mon–Fri 8a–6p", name: "[Studio 3 name]", address: "[Street address, city, ZIP]", phone: "[Phone number]" },
    { hours: "Sat 8a–2p", name: "[Studio 4 name]", address: "[Street address, city, ZIP]", phone: "[Phone number]" },
  ] satisfies Studio[],
  map: {
    src: "images/map.jpg",
    label: "Map of studio locations",
    size: "1600 × 900 (static map image or screenshot)",
    alt: "Map showing the four tamaz studios",
  } satisfies GalleryImage,
};

export const faq = {
  eyebrow: "Questions",
  title: "Before you book",
  items: [
    { question: "Is the first consultation really free?", answer: "Yes. It includes the exam, a 3D scan, any X-rays we need, and a written plan with pricing. There’s no obligation to start." },
    { question: "Do braces hurt?", answer: "Most people feel pressure and mild soreness for two or three days after bonding and after adjustments. Soft foods and an over-the-counter pain reliever usually cover it." },
    { question: "How often are appointments?", answer: "Braces patients visit every 6–8 weeks. Aligner patients usually come in every 8–10 weeks, and each visit takes 20–30 minutes." },
    { question: "What if a bracket breaks?", answer: "Call the studio. We keep same-week repair slots open at every location, and Saturday hours for school and work schedules." },
    { question: "At what age should my child be checked?", answer: "The American Association of Orthodontists recommends a first check by age 7. Most children won’t need treatment yet, but early checks catch crossbites and crowding." },
  ] satisfies Faq[],
};

export const smileGuide = {
  eyebrow: "Smile guide",
  title: "Tips for life with braces and aligners.",
  articles: [
    {
      image: { src: "images/blog-1.jpg", label: "Article image", size: "1200 × 750", alt: "Braces-friendly foods" },
      kicker: "Braces care · 4 min",
      title: "What you can eat in the first week with braces",
      href: "#resources",
    },
    {
      image: { src: "images/blog-2.jpg", label: "Article image", size: "1200 × 750", alt: "Clear aligner case" },
      kicker: "Aligners · 5 min",
      title: "How to wear aligners 22 hours a day without noticing",
      href: "#resources",
    },
    {
      image: { src: "images/blog-3.jpg", label: "Article image", size: "1200 × 750", alt: "Child at an orthodontic check-up" },
      kicker: "Parents · 3 min",
      title: "Why an orthodontic check at age 7 matters",
      href: "#resources",
    },
  ] satisfies Article[],
};

export const consultation = {
  title: "Book your free consultation.",
  lede: "Tell us a little about yourself and a coordinator will call to confirm a time within one business day.",
  perks: ["3D scan and exam", "Written plan and exact price", "No obligation, no pressure"],
  treatmentOptions: ["Not sure yet", "Metal braces", "Clear ceramic braces", "Clear aligners", "Early treatment for my child"],
  submit: "Request my consultation",
  note: "We’ll only use your details to arrange your consultation.",
  errors: {
    firstName: "Add your first name so we know who to ask for.",
    phone: "Add a phone number so a coordinator can reach you.",
    email: "Check the email address, or leave it blank.",
    server: "Something went wrong sending your request. Please try again or call your nearest studio.",
  },
  success: (name: string, studio: string) =>
    `Thanks, ${name}. We’ve received your request for the ${studio} studio, and a coordinator will call to confirm a time within one business day.`,
};

export const footer = {
  blurb: "Braces and clear aligners for kids, teens and adults, from board-certified orthodontists.",
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "YouTube", href: "#" },
  ] as const,
  columns: [
    {
      title: "Treatments",
      links: [
        { label: "Metal braces", href: "#treatments" },
        { label: "Clear ceramic braces", href: "#treatments" },
        { label: "Clear aligners", href: "#treatments" },
        { label: "Early treatment", href: "#treatments" },
        { label: "Retainers", href: "#treatments" },
      ],
    },
    {
      title: "Patients",
      links: [
        { label: "Book a consultation", href: "#consult" },
        { label: "Cost & financing", href: "#cost" },
        { label: "[Patient portal link]", href: "#" },
        { label: "[Pay my bill link]", href: "#" },
        { label: "Smile guide", href: "#resources" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "[Main phone number]" },
        { label: "hello@[your-domain].com" },
        { label: "Emergency repairs: call your studio" },
        { label: "All locations", href: "#visit" },
      ],
    },
  ] satisfies { title: string; links: { label: string; href?: string }[] }[],
  copyright: "© 2026 tamaz",
  license: "[Practice license / registration no.]",
  legal: [
    { label: "Privacy policy", href: "#" },
    { label: "Accessibility", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Notice of privacy practices", href: "#" },
  ],
};
