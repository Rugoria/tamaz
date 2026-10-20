/**
 * All editable copy for the tamaz site lives here.
 *
 * Anything written in [square brackets] is a placeholder: it renders with a
 * yellow highlight on the page until you replace it with real content.
 *
 * This file is the English copy and the source for everything that is not text (links, images, numbers).
 * The other languages (src/content/locales/) translate its text only; anything they leave out falls back to
 * the English here. Components get the copy for the page's language from `getSiteContent()`
 * (src/content/server.ts), or as props in client components.
 */

export type NavLink = { label: string; href: string };

export type Case = {
  title: string;
  detail: string;
  before: { src: string; label: string; alt: string };
  after: { src: string; label: string; alt: string };
  /** Optional before → after clip (relative to public/). When the file exists it replaces the slider. */
  video?: string;
};

type StageCopy = { name: string; body: string };

/** `aligners` overrides the copy when the aligner view is selected. */
export type JourneyStage = StageCopy & { start: number; end: number; aligners?: StageCopy };

export type Appliance = "braces" | "aligners";


export type ProcessStep = { title: string; body: string; time: string };

export type GalleryImage = { src: string; label: string; size: string; alt: string };

export type Review = { quote: string; name: string; detail: string; initials: string; color: string };

export type Studio = { name: string; hours: string; address: string; phone: string };

export type Faq = { question: string; answer: string };

export const brand = {
  name: "tamaz",
  description:
    "Braces and clear aligners for kids, teens and adults, from board-certified orthodontists. A first visit with a 3D scan, a written plan and your monthly price.",
};

/** The floating WhatsApp button (bottom right). `number` is international, digits only: 0306 1336555 in Pakistan. */
export const whatsapp = {
  number: "923061336555",
  label: "Chat with tamaz on WhatsApp (0306 1336555)",
};

export const nav: { links: NavLink[]; cta: NavLink } = {
  links: [
    { label: "Your journey", href: "#journey" },
    { label: "Results", href: "#results" },
    { label: "Process", href: "#process" },
    { label: "For clinics", href: "#clinics" },
    { label: "Reviews", href: "#reviews" },
    { label: "Locations", href: "#visit" },
    { label: "Shop", href: "/shop" },
  ],
  cta: { label: "Book your appointment", href: "#consult" },
};

export const hero = {
  /** Shown under the "tamaz" wordmark. */
  tagline: "Better choice Better smile",
  eyebrow: "Braces & clear aligners · kids, teens, adults",
  headlineBefore: "Straighter smiles, one",
  headlineWord: "millimeter",
  headlineAfter: "at a time.",
  lede:
    "Board-certified orthodontists, four neighborhood studios and a free first visit. You leave with a 3D scan, a written treatment plan and your monthly price before you commit to anything.",
  primaryCta: { label: "Book your appointment", href: "#consult" },
  secondaryCta: { label: "See real results", href: "#results" },
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
    image: "images/hero-aligner-a-clear.png",
    /** 3D model (glTF binary, meters, Y up, front teeth toward +Z); turns on scroll. */
    model: "models/aligner.glb",
    width: 1121,
    height: 667,
    alt: "3D render of a clear aligner",
    title: "3D render of a clear aligner rotating",
  },
};

/** Two-column section after the hero. On scroll the hero aligner flies into `#aligner-slot` (left column). */
export const alignerAbout = {
  eyebrow: "Clear aligners",
  title: "Nearly invisible, and made for your teeth alone.",
  lede: "Every aligner is shaped from a 3D scan of your teeth. You switch to a new set every [1 to 2] weeks, and each one moves your teeth a fraction of a millimeter closer to your finished smile.",
  points: [
    { title: "Custom from a 3D scan", body: "No impression trays. A four-minute scan maps every tooth, and your orthodontist plans each move on screen." },
    { title: "Take them out to eat", body: "Remove them for meals, brushing and flossing, so there is no list of foods to avoid." },
    { title: "Worn 20 to 22 hours a day", body: "Thin, smooth plastic with no wires or brackets, so most people won’t notice you’re wearing them." },
  ],
  /** Shown after the average aligner treatment length from `journey.appliances`. */
  durationBody: "[How often you check in during treatment, e.g. a quick visit every 6 to 8 weeks.]",
  cta: { label: "Book your appointment", href: "#consult" },
  /** Phones only: the section shows a short version, and this opens the about page with all of it. */
  readMore: { label: "Read more", href: "/about" },
};

/** The about page (/about): the aligner section's copy in full, opened from its "Read more" on phones. */
export const aboutPage = {
  metaTitle: "About our aligners",
  back: { label: "Back to home", href: "/#aligners" },
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
  /**
   * Real-teeth animation, one photo per step (all 3:2): the start photo with the hero's 3D aligner
   * fitted over the lower teeth (Scan), the aligners worn (Align), then the straight smile (Retain).
   * `start` and `end` share the same framing (both cropped from the same shoot).
   */
  photos: {
    start: { src: "images/journey-start.jpg", alt: "Smile with crooked, uneven teeth before treatment" },
    /**
     * Where the hero's 3D aligner fits over the lower teeth (it flies down from the aligner section):
     * the center of its box and its width, in % of the frame.
     */
    landing: { x: 51, y: 58, width: 76 },
    worn: { src: "images/journey-retain.jpg", alt: "The smile wearing clear aligners on both arches" },
    end: { src: "images/journey-straight.jpg", alt: "The straightened smile after treatment" },
  },
  appliances: {
    // Placeholder average until the client confirms it; update `months` to match.
    aligners: { label: "Clear aligners", months: 12, average: "[12] months" },
    braces: { label: "Braces", months: 18, average: "18 months" },
  } satisfies Record<Appliance, { label: string; months: number; average: string }>,
  /** Three steps, one scroll each; start/end are fractions of the scroll through the section. */
  stages: [
    {
      name: "Scan", start: 0, end: 1 / 3,
      body: "Consultation and 3D scan, about four minutes with no impression trays. Your orthodontist plans every tooth’s move and shows you the result on screen.",
    },
    {
      name: "Align", start: 1 / 3, end: 2 / 3,
      body: "Brackets go on in about an hour, then the archwire gently pulls teeth into line. Adjustment visits every 6–8 weeks.",
      aligners: { name: "Align", body: "A new set of clear trays every one to two weeks, worn 22 hours a day, with check-ins every 8–10 weeks and refinement trays for the last fractions of a millimeter." },
    },
    {
      name: "Retain", start: 2 / 3, end: 1.01,
      body: "Brackets off, clear retainers on to hold your new smile in place. Your first set is included.",
      aligners: { name: "Retain", body: "Last trays done, clear retainers on to hold your new smile in place. Your first set is included." },
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

/**
 * For clinics (B2B): dentists and orthodontists who offer tamaz aligners in their own practice. Shaped after
 * aligner-lab provider pages (Vitaware OrthoLab, invisibleTx, SureSmile, 3Shape): send scans, get a plan,
 * we make and ship the aligners. Bracketed parts are the client's to fill in.
 */
export const clinics = {
  eyebrow: "For dentists & orthodontists",
  title: "Offer tamaz aligners in your own practice.",
  lede:
    "Send us your scans. Our orthodontists plan the case, our lab makes the aligners, and we ship them to your clinic, ready to hand over. You keep the patient and set the fee.",
  audiences: ["General dentists", "Orthodontists", "Dental groups"],
  cta: { label: "Become a partner clinic", href: "mailto:partners@your-domain.com" }, // TODO: real partners address
  contact: "Or email partners@[your-domain].com",
  benefits: [
    {
      title: "Any scanner, no new kit",
      body: "Upload intraoral scans straight from 3Shape TRIOS, Medit or iTero, or as STL files, with photos and X-rays.",
    },
    {
      title: "A plan in [2 to 3 days]",
      body: "An orthodontist designs every tooth movement and sends you a 3D plan to approve, change or discuss.",
    },
    {
      title: "Show the result chairside",
      body: "Share the 3D simulation with your patient at the consultation, so they can see their smile before they commit.",
    },
    {
      title: "One clear price per case",
      body: "[Case price] shown before you order. No subscription, no minimum volume, and refinements [included].",
    },
  ],
  steps: [
    { title: "Scan", body: "Upload the scan and photos from your practice.", time: "Day 1" },
    { title: "Plan", body: "Review the 3D plan and simulation; ask for changes until it is right.", time: "[2 to 3 days]" },
    { title: "Make", body: "We print, trim and check every aligner in our lab.", time: "[5 to 7 working days]" },
    { title: "Treat", body: "Aligners arrive in tamaz cases. We handle refinements and retainers with you.", time: "[Ongoing]" },
  ],
  support: "Every case has a named orthodontist you can message, from the first plan to the final retainer.",
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
          answer: "Aligners treat most mild to moderate cases, including crowding, spacing and simple overbites or underbites. More severe or complex bite problems may need traditional braces or a combination of both. The only way to know for sure is an orthodontic evaluation with a 3D scan and digital imaging, which is part of your consultation.",
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

export const consultation = {
  title: "Book your appointment.",
  lede: "Tell us a little about yourself and a coordinator will call to confirm a time within one business day.",
  perks: ["3D scan and exam", "Written plan and exact price", "No obligation, no pressure"],
  treatmentOptions: ["Not sure yet", "Metal braces", "Clear ceramic braces", "Clear aligners", "Early treatment for my child"],
  submit: "Request my appointment",
  note: "We’ll only use your details to arrange your appointment.",
  errors: {
    firstName: "Add your first name so we know who to ask for.",
    phone: "Add a phone number so a coordinator can reach you.",
    email: "Check the email address, or leave it blank.",
    server: "Something went wrong sending your request. Please try again or call your nearest studio.",
  },
  /** {name} and {studio} are filled in from the form. */
  success:
    "Thanks, {name}. We’ve received your request for the {studio} studio, and a coordinator will call to confirm a time within one business day.",
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
        { label: "Your journey", href: "#journey" },
        { label: "Before & after", href: "#results" },
        { label: "How it works", href: "#process" },
        { label: "For clinics", href: "#clinics" },
        { label: "Reviews", href: "#reviews" },
        { label: "Shop", href: "/shop" },
      ],
    },
    {
      title: "Patients",
      links: [
        { label: "Book an appointment", href: "#consult" },
        { label: "[Patient portal link]", href: "#" },
        { label: "[Pay my bill link]", href: "#" },
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

/**
 * The shop page (/shop): aligner plans, a starter kit, products by category and gift cards. Laid out after the
 * ALIGNERCO clear-aligner collection page, in tamaz's own words. There is no checkout yet: every "buy" button
 * opens a WhatsApp chat (`whatsapp.number`) with `whatsappMessage` filled in. Prices and plan details in
 * [brackets] are placeholders until the client confirms them. Images go in public/images/ (shop-*.jpg). `categories` filter the page; each
 * product has one `category`, the plans and the kit are "aligners".
 */
export const shop = {
  metaTitle: "Shop",
  back: { label: "Back to home", href: "/" },
  hero: {
    eyebrow: "tamaz shop",
    title: "Everything your smile needs.",
    lede: "Clear aligner plans, a starter kit to try first, and the care products that keep your aligners and retainers fresh.",
    image: { src: "images/shop-hero.jpg", label: "Shop hero", size: "1600 × 1200", alt: "tamaz clear aligners and care products" },
  },
  plans: {
    eyebrow: "Clear aligners",
    title: "Clear aligner plans for every smile.",
    lede: "Two ways to straighten your teeth: wear your aligners all day, or mostly while you sleep.",
    review: "Every plan is checked by a licensed orthodontist before you start. [If aligners aren’t right for you, you get a full refund.]",
    items: [
      {
        id: "all-day",
        name: "All-day plan",
        badge: "Best value",
        duration: "[4 to 6] months",
        wear: "22 hours a day",
        summary: "The quickest way to a straighter smile: wear your aligners day and night, taking them out only to eat and brush.",
        image: { src: "images/shop-plan-all-day.jpg", label: "All-day plan", size: "1600 × 900", alt: "tamaz clear aligners for the all-day plan" },
        oneTime: { price: "[Price]", was: "[Regular price]" },
        monthly: [
          { name: "[12] monthly payments", price: "[Price] / month" },
          { name: "[24] monthly payments", price: "[Price] / month" },
        ],
        includes: ["All your aligners, made from a 3D scan", "Free whitening kit", "Retainers to keep your new smile"],
      },
      {
        id: "night",
        name: "Night plan",
        badge: "Most popular",
        duration: "[6 to 8] months",
        wear: "10 hours a day",
        summary: "Wear your aligners in the evening and overnight, and go through your day without them.",
        image: { src: "images/shop-plan-night.jpg", label: "Night plan", size: "1600 × 900", alt: "tamaz clear aligners for the night plan" },
        oneTime: { price: "[Price]", was: "[Regular price]" },
        monthly: [
          { name: "[12] monthly payments", price: "[Price] / month" },
          { name: "[24] monthly payments", price: "[Price] / month" },
        ],
        includes: ["All your aligners, made from a 3D scan", "Free whitening kit", "Retainers to keep your new smile"],
      },
    ],
  },
  kit: {
    eyebrow: "Not sure yet?",
    title: "Start with an impression kit.",
    body: "Take impressions of your teeth at home and send them back. Our orthodontists check whether aligners are right for you before you choose a plan.",
    image: { src: "images/shop-kit.jpg", label: "Impression kit", size: "1200 × 900", alt: "The tamaz at-home impression kit" },
    price: "[Price]",
    was: "[Regular price]",
  },
  categoriesLabel: "Shop by category",
  categories: [{ id: "all", label: "All products" }, { id: "aligners", label: "Clear aligners" }, { id: "retainers", label: "Retainers" }, { id: "night-guard", label: "Night guard" }, { id: "mouth-guard", label: "Mouth guard" }, { id: "accessories", label: "Accessories" }],
  products: {
    eyebrow: "Products",
    title: "Care, protection and accessories.",
    items: [
      { id: "retainers", category: "retainers", name: "Retainers", price: "[Price]", was: "[Regular price]", badge: "[Sale: amount off]", image: { src: "images/shop-retainers.jpg", size: "1000 × 1000" } },
      { id: "night-guard", category: "night-guard", name: "Custom-fit soft night guard, both arches", price: "[Price]", was: "[Regular price]", badge: "[Sale: amount off]", image: { src: "images/shop-night-guard.jpg", size: "1000 × 1000" } },
      { id: "sports-guard", category: "mouth-guard", name: "Custom-fit sports mouth guard", price: "[Price]", was: "[Regular price]", badge: "[Sale: amount off]", image: { src: "images/shop-sports-guard.jpg", size: "1000 × 1000" } },
      { id: "uv-cleaner", category: "accessories", name: "UV ultrasonic cleaner", price: "[Price]", was: "[Regular price]", badge: "[Sale: amount off]", image: { src: "images/shop-uv-cleaner.jpg", size: "1000 × 1000" } },
      { id: "whitening-kit", category: "accessories", name: "Smart teeth whitening kit", price: "[Price]", was: "[Regular price]", badge: "[Sale: amount off]", image: { src: "images/shop-whitening-kit.jpg", size: "1000 × 1000" } },
      { id: "cleaner", category: "accessories", name: "Aligner cleaner + whitener", price: "[Price]", was: "[Regular price]", badge: "[Sale: amount off]", image: { src: "images/shop-cleaner.jpg", size: "1000 × 1000" } },
      { id: "tablets", category: "accessories", name: "Cleansing tablets for aligners, retainers & dentures, 120 pcs", price: "[Price]", was: "", badge: "", image: { src: "images/shop-tablets.jpg", size: "1000 × 1000" } },
      { id: "whitening-pen", category: "accessories", name: "Teeth whitening pen", price: "[Price]", was: "[Regular price]", badge: "[Sale: amount off]", image: { src: "images/shop-whitening-pen.jpg", size: "1000 × 1000" } },
      { id: "pull-tool", category: "accessories", name: "Aligner pull tool", price: "[Price]", was: "", badge: "", image: { src: "images/shop-pull-tool.jpg", size: "1000 × 1000" } },
      { id: "chewies", category: "accessories", name: "Chewies", price: "[Price]", was: "", badge: "", image: { src: "images/shop-chewies.jpg", size: "1000 × 1000" } },
      { id: "essentials", category: "accessories", name: "Aligner essentials kit", price: "[Price]", was: "[Regular price]", badge: "[Sale: amount off]", image: { src: "images/shop-essentials.jpg", size: "1000 × 1000" } },
      { id: "cheek-retractor", category: "accessories", name: "Cheek retractor", price: "[Price]", was: "", badge: "", image: { src: "images/shop-cheek-retractor.jpg", size: "1000 × 1000" } },
      { id: "case", category: "accessories", name: "Aligner case", price: "[Price]", was: "", badge: "", image: { src: "images/shop-case.jpg", size: "1000 × 1000" } },
    ],
  },
  gift: {
    eyebrow: "Gift cards",
    title: "Give someone a better smile.",
    body: "tamaz gift cards from [amount], to spend on any plan or product.",
  },
  cta: {
    title: "Ready to transform your smile?",
    lede: "Book a visit for a 3D scan and a written plan, or message us to ask anything first.",
    label: "Book your appointment",
    href: "/#consult",
  },
  /** Typed into WhatsApp when a buy button is pressed; {item} is the product and payment chosen. */
  whatsappMessage: "Hi tamaz, I’d like to order: {item}.",
  labels: {
    duration: "Treatment time",
    wear: "Wear time",
    oneTime: "One-time payment",
    monthly: "Or pay monthly",
    includes: "Included",
    was: "Regular price",
    buy: "Buy now",
    order: "Order now",
    giftCta: "Buy a gift card",
    giftItem: "a tamaz gift card",
  },
};

/** Labels and short texts used by the page's controls. `{x}` parts are filled in by the component. */
export const ui = {
  menu: "Menu",
  home: "{brand} home",
  language: "Language",
  before: "Before",
  after: "After",
  compare: "Compare case {n} before and after",
  caseClip: "Case {n} clip",
  caseClipTitle: "Case {n}: {title}, before to after",
  onAverage: "{average} on average",
  journeyLabel: "Treatment timeline",
  readouts: { crowding: "Crowding", average: "Average treatment", complete: "Plan complete" },
  clinicsAudiences: "Who it is for",
  clinicsSteps: "How a partner case works",
  stars: "5 out of 5 stars",
  directions: "Directions",
  map: { tabs: "Show studio on map", show: "Show map", loads: "Loads Google Maps", title: "Map of {name}" },
  form: {
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone",
    email: "Email",
    treatment: "Interested in",
    studio: "Preferred studio",
    message: "Anything we should know?",
    sending: "Sending…",
  },
};

/** All of the copy, as one object: the shape every language follows. */
export const content = {
  brand,
  whatsapp,
  nav,
  hero,
  alignerAbout,
  aboutPage,
  results,
  journey,
  process,
  clinics,
  reviews,
  locations,
  faq,
  consultation,
  footer,
  shop,
  ui,
};

export type SiteContent = typeof content;
