/**
 * All editable copy for the tamaz site lives here.
 *
 * Anything written in [square brackets] is a placeholder: it renders with a
 * yellow highlight on the page until you replace it with real content.
 */

export type NavLink = { label: string; href: string };

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
  /** Optional before → after clip (relative to public/). When the file exists it replaces the slider. */
  video?: string;
};

type StageCopy = { name: string; body: string; label: string };

/** `aligners` overrides the copy when the aligner view is selected. */
export type JourneyStage = StageCopy & { start: number; end: number; aligners?: StageCopy };

export type Appliance = "braces" | "aligners";

export type CostOption = { label: string; price: number };

export type PaymentPackage = {
  name: string;
  price: string;
  monthly: string;
  includes: string[];
  /** Highlights one card as the recommended package. */
  featured?: boolean;
};

export type ProcessStep = { title: string; body: string; time: string };

export type GalleryImage = { src: string; label: string; size: string; alt: string };

export type Review = { quote: string; name: string; detail: string; initials: string; color: string };

export type Testimonial = { name: string; detail: string; quote: string; video: string; poster?: string };

export type Studio = { name: string; hours: string; address: string; phone: string };

export type Faq = { question: string; answer: string };

/** `video` is a YouTube URL or a path relative to public/. */
export type VideoTip = { kicker: string; title: string; video: string; poster?: string };

export const brand = {
  name: "tamaz",
  description:
    "Braces and clear aligners for kids, teens and adults, from board-certified orthodontists. Free first visit with a 3D scan, a written plan and your monthly price.",
};

export const nav: { links: NavLink[]; cta: NavLink } = {
  links: [
    { label: "Results", href: "#results" },
    { label: "Your journey", href: "#journey" },
    { label: "Process", href: "#process" },
    { label: "Cost", href: "#packages" },
    { label: "Reviews", href: "#reviews" },
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
  secondaryCta: { label: "See real results", href: "#before-after" },
  trust: [
    { value: "4.9 ★", label: "2,300+ patient reviews" },
    { value: "$0 down", label: "interest-free plans" },
    { value: "Sat & evenings", label: "at every studio" },
  ],
  chips: { duration: "18 mo", durationLabel: "average treatment", scan: "Free 3D scan" },
  smileLabel: "Animated upper teeth moving from crowded to straight as braces are applied",
  /**
   * 3D aligner display. A video (transparent background) wins if present: list the
   * HEVC-with-alpha .mov (Safari) before the VP9-with-alpha .webm (Chrome, Firefox, Edge).
   * Otherwise the still render is shown (a PNG with its white background cut out).
   * With neither file, the hero falls back to the animated smile card.
   */
  aligner: {
    sources: ["videos/hero-aligner.mov", "videos/hero-aligner.webm"],
    image: "images/hero-aligner-clear.png",
    width: 1121,
    height: 667,
    alt: "3D render of a clear aligner",
    hint: "Drag, or use the arrow keys, to turn the aligner",
    title: "3D render of a clear aligner rotating",
  },
};

/** Scroll-driven before → after wipe shown right after the hero. */
export const smileReveal = {
  eyebrow: "Before & after",
  title: "Scroll to see the difference.",
  lede: "[One line about this patient’s treatment, e.g. treatment type and months.]",
  label: "Compare this smile before and after treatment",
  aspect: "627/418",
  before: { src: "images/reveal-before.jpg", label: "Before", size: "627 × 418", alt: "Crowded, uneven front teeth before treatment" },
  after: { src: "images/reveal-after.jpg", label: "After", size: "627 × 418", alt: "Straight, even front teeth after treatment" },
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
  title: "Watch real smiles change.",
  lede: "Every case shown is a tamaz patient, shared with written consent. Drag the photos to compare before and after.",
  cases: [
    {
      title: "Crowding",
      detail: "Metal braces · 20 months",
      before: { src: "images/case-1-before.jpg", label: "Case 1 · before", alt: "Crowded teeth before treatment" },
      after: { src: "images/case-1-after.jpg", label: "Case 1 · after", alt: "Straight teeth after treatment" },
      video: "videos/case-1.mp4",
    },
    {
      title: "Spacing",
      detail: "Clear aligners · 9 months",
      before: { src: "images/case-2-before.jpg", label: "Case 2 · before", alt: "Gap between front teeth before treatment" },
      after: { src: "images/case-2-after.jpg", label: "Case 2 · after", alt: "Gap closed after treatment" },
      video: "videos/case-2.mp4",
    },
    {
      title: "Deep overbite",
      detail: "Ceramic braces · 22 months",
      before: { src: "images/case-3-before.jpg", label: "Case 3 · before", alt: "Overbite before treatment" },
      after: { src: "images/case-3-after.jpg", label: "Case 3 · after", alt: "Corrected bite after treatment" },
      video: "videos/case-3.mp4",
    },
  ] satisfies Case[],
};

export const journey = {
  /** {months} is replaced with the average for the selected appliance. */
  eyebrow: "Your {months}-month journey",
  title: "Scroll to watch a smile move into place.",
  lede: "Teeth move roughly one millimeter a month under light, steady force. Here is what that looks like from first scan to retainer.",
  /** Real-teeth animation: the after photo fades in over the before photo as you scroll. */
  photos: {
    before: { src: "images/journey-before.jpg", alt: "Smile with crooked, uneven teeth before treatment" },
    after: { src: "images/journey-after.jpg", alt: "The same smile with straight, even teeth after treatment" },
  },
  toggleLabel: "Show treatment with",
  appliances: {
    // Placeholder average until the client confirms it; update `months` to match.
    aligners: { label: "Clear aligners", months: 12, average: "[12] months" },
    braces: { label: "Braces", months: 18, average: "18 months" },
  } satisfies Record<Appliance, { label: string; months: number; average: string }>,
  /** start/end are fractions of the scroll through the section. */
  stages: [
    { name: "Scan", label: "Consultation", start: 0, end: 0.12, body: "Free consultation and 3D scan. About four minutes, with no impression trays." },
    { name: "Plan", label: "Treatment plan", start: 0.12, end: 0.22, body: "Your orthodontist sets a target position for every tooth and shows you the result on screen." },
    {
      name: "Bond", label: "Bonding day", start: 0.22, end: 0.32, body: "Brackets go on in about an hour. You pick your band colors.",
      aligners: { name: "Fit", label: "First trays", body: "You get your first set of clear trays and learn how to put them in and take them out." },
    },
    {
      name: "Align", label: "Alignment", start: 0.32, end: 0.8, body: "The archwire gently pulls teeth into line. Adjustment visits every 6–8 weeks.",
      aligners: { name: "Align", label: "Alignment", body: "A new set of trays every one to two weeks, worn 22 hours a day. Check-ins every 8–10 weeks." },
    },
    {
      name: "Detail", label: "Detailing", start: 0.8, end: 0.9, body: "Fine-tuning of the bite, root angles and the last fractions of a millimeter.",
      aligners: { name: "Refine", label: "Refinement", body: "Refinement trays fine-tune the bite and the last fractions of a millimeter." },
    },
    {
      name: "Retain", label: "Retention", start: 0.9, end: 1.01, body: "Brackets off, retainers on. Your first set is included.",
      aligners: { name: "Retain", label: "Retention", body: "Last trays done, retainers on. Your first set is included." },
    },
  ] satisfies JourneyStage[],
};

/** The aligner case pipeline, from scan to delivery. Durations are placeholders until the client confirms them. */
export const process = {
  eyebrow: "How it works",
  title: "From scan to your door.",
  lede: "Every aligner case moves through the same six stages, and we keep you updated at each one.",
  steps: [
    { title: "Scan received", body: "Your 3D scan reaches our lab and your case is opened.", time: "[Duration]" },
    { title: "Design & proposal", body: "Your orthodontist plans every tooth movement and shares the proposed result with you.", time: "[Duration]" },
    { title: "Modifications & refinements", body: "We adjust the plan with your feedback until you and your orthodontist approve it.", time: "[Duration]" },
    { title: "Production in progress", body: "Your custom aligners are manufactured and checked for fit and quality.", time: "[Duration]" },
    { title: "Out for delivery", body: "Your aligners are packed and on their way to you or your studio.", time: "[Duration]" },
    { title: "Delivered", body: "Your aligners arrive and your treatment begins.", time: "[Duration]" },
  ] satisfies ProcessStep[],
};

/** Package names, prices and inclusions are placeholders until the client confirms them. */
export const packages = {
  eyebrow: "Payment packages",
  title: "One price, everything included.",
  lede: "[Short intro to the packages from the client.]",
  items: [
    {
      name: "[Package 1 name]",
      price: "[$0,000]",
      monthly: "[or $000/mo]",
      includes: ["[Inclusion 1]", "[Inclusion 2]", "[Inclusion 3]"],
    },
    {
      name: "[Package 2 name]",
      price: "[$0,000]",
      monthly: "[or $000/mo]",
      includes: ["[Inclusion 1]", "[Inclusion 2]", "[Inclusion 3]", "[Inclusion 4]"],
      featured: true,
    },
    {
      name: "[Package 3 name]",
      price: "[$0,000]",
      monthly: "[or $000/mo]",
      includes: ["[Inclusion 1]", "[Inclusion 2]", "[Inclusion 3]", "[Inclusion 4]", "[Inclusion 5]"],
    },
  ] satisfies PaymentPackage[],
  featuredLabel: "Most popular",
  // Points at the booking form until online deposits (Stripe Checkout) are connected.
  cta: { label: "Reserve this package", href: "#consult" },
  calculatorLink: { label: "Or estimate your monthly payment", href: "#cost" },
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
  patientsTitle: "Our patients",
  patientsLede: "Real tamaz patients, shared with their permission.",
  patients: [
    { src: "images/patient-1.jpg", label: "Patient photo", size: "800 × 800", alt: "Patient smiling while wearing clear aligners" },
    { src: "images/patient-2.jpg", label: "Patient photo", size: "800 × 800", alt: "tamaz patient smiling" },
    { src: "images/patient-3.jpg", label: "Patient photo", size: "800 × 800", alt: "tamaz patient smiling" },
    { src: "images/patient-4.jpg", label: "Patient photo", size: "800 × 800", alt: "tamaz patient smiling" },
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
      color: "var(--deep)",
    },
  ] satisfies Review[],
  /**
   * Summary badge. These static reviews stand in until the Google Places API is
   * connected; `url` is the practice's Google Maps reviews link (hidden while empty).
   */
  google: { rating: "4.9", count: "[2,300+] Google reviews", url: "", linkLabel: "Read all reviews on Google" },
};

export const testimonials = {
  eyebrow: "Testimonials",
  title: "In their own words.",
  items: [
    { name: "[Patient name]", detail: "[Treatment]", quote: "[Short quote from the video.]", video: "videos/testimonial-1.mp4", poster: "images/testimonial-1.jpg" },
    { name: "[Patient name]", detail: "[Treatment]", quote: "[Short quote from the video.]", video: "videos/testimonial-2.mp4", poster: "images/testimonial-2.jpg" },
    { name: "[Patient name]", detail: "[Treatment]", quote: "[Short quote from the video.]", video: "videos/testimonial-3.mp4", poster: "images/testimonial-3.jpg" },
  ] satisfies Testimonial[],
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
  title: "FAQ",
  groups: [
    {
      title: "General & technology",
      items: [
        {
          question: "What are clear aligners, and how are they different from metal braces?",
          answer: "Clear aligners are removable, custom-made trays of clear thermoplastic that fit snugly over your teeth. Unlike braces, they’re barely noticeable, you take them out to eat so there are no food restrictions, and there are no metal brackets or wires to rub your cheeks and gums.",
        },
        {
          question: "How do aligners actually move my teeth?",
          answer: "Each set of aligners is digitally designed to apply gentle, precise pressure to specific teeth. You wear each set for one to two weeks, and every new set moves your teeth a little further, in small planned steps, toward the final position your orthodontist has prescribed.",
        },
      ],
    },
    {
      title: "Candidacy & duration",
      items: [
        {
          question: "Am I a suitable candidate for clear aligners?",
          answer: "Aligners treat most mild to moderate cases, including crowding, spacing and simple overbites or underbites. More severe or complex bite problems may need traditional braces or a combination of both. The only way to know for sure is an orthodontic evaluation with a 3D scan and digital imaging, which is part of your free consultation.",
        },
        {
          question: "How long will my treatment take?",
          answer: "Most aligner treatment takes 6 to 18 months, depending on how complex your case is. The biggest factor you control is wear time: leaving aligners out too often is the most common reason treatment takes longer than planned.",
        },
      ],
    },
    {
      title: "Lifestyle & wear time",
      items: [
        {
          question: "How important is wearing my aligners every day?",
          answer: "It’s essential. Aligners need to be worn 20 to 22 hours a day and taken out only to eat, to drink anything other than plain water, and to brush your teeth. Aligners that stay in their case don’t move teeth.",
        },
        {
          question: "Can I eat or drink with my aligners in?",
          answer: "Take them out to eat, and for anything other than plain, cool water. Hot drinks can warp the plastic, and sugary or colored drinks can stain the trays and trap sugar and acid against your teeth, which raises the risk of cavities.",
        },
      ],
    },
    {
      title: "Care & comfort",
      items: [
        {
          question: "How do I clean my aligners?",
          answer: "Clean them every day with a soft toothbrush and a mild, non-abrasive soap or an approved cleaning solution, using cool or lukewarm water. Hot water can damage the material. After eating, brush and floss before you put them back in so food isn’t trapped against your teeth.",
        },
        {
          question: "Do clear aligners hurt?",
          answer: "You may feel some pressure or tenderness for a day or two when you switch to a new set. That’s a sign they’re working. Most people find aligners much more comfortable than metal braces.",
        },
      ],
    },
    {
      title: "Process & aftercare",
      items: [
        {
          question: "Will aligners affect my speech or cause a lisp?",
          answer: "Some people have a slight lisp for the first few days while their tongue gets used to a new set. It usually goes away quickly, and aligners have very little effect on speech overall.",
        },
        {
          question: "Will I need a retainer after treatment?",
          answer: "Yes. Teeth naturally tend to drift back toward their old positions, so everyone needs some form of retainer after treatment to keep their new smile in place. Your first retainer is included.",
        },
      ],
    },
  ] satisfies { title: string; items: Faq[] }[],
};

export const smileGuide = {
  eyebrow: "Video tips",
  title: "Tips for life with braces and aligners.",
  tips: [
    { kicker: "Braces care · [0:00]", title: "[Tutorial 1 title]", video: "videos/tip-1.mp4", poster: "images/tip-1.jpg" },
    { kicker: "Aligners · [0:00]", title: "[Tutorial 2 title]", video: "videos/tip-2.mp4", poster: "images/tip-2.jpg" },
    { kicker: "Parents · [0:00]", title: "[Tutorial 3 title]", video: "videos/tip-3.mp4", poster: "images/tip-3.jpg" },
  ] satisfies VideoTip[],
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
      title: "Explore",
      links: [
        { label: "Before & after", href: "#before-after" },
        { label: "Your journey", href: "#journey" },
        { label: "How it works", href: "#process" },
        { label: "Payment packages", href: "#packages" },
        { label: "Reviews", href: "#reviews" },
      ],
    },
    {
      title: "Patients",
      links: [
        { label: "Book a consultation", href: "#consult" },
        { label: "Cost & financing", href: "#cost" },
        { label: "[Patient portal link]", href: "#" },
        { label: "[Pay my bill link]", href: "#" },
        { label: "Video tips", href: "#resources" },
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
