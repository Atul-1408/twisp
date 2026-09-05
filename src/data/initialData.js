export const INITIAL_SERVICES = [
  {
    id: 'strategy',
    number: '01',
    title: 'Strategy',
    description: 'Understand the business, audience and goals before designing.',
    deliverables: [
      'Brand positioning & messaging',
      'User journey mapping & architecture',
      'Competitor & market analysis',
      'Conversion funnel strategy'
    ],
    highlight: 'Foundation'
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    description: 'Modern, user-focused interfaces designed around the brand.',
    deliverables: [
      'Design systems & UI components',
      'Desktop, tablet & mobile responsive design',
      'Interactive micro-animations',
      'Wireframing & rapid prototyping'
    ],
    highlight: 'Aesthetics'
  },
  {
    id: 'development',
    number: '03',
    title: 'Development',
    description: 'Fast, responsive and scalable websites built with modern technology.',
    deliverables: [
      'Clean modern code architecture',
      'Full cross-browser & mobile optimization',
      'CMS integration & custom workflows',
      'Lightning-fast load performance (90+ Core Web Vitals)'
    ],
    highlight: 'Performance'
  },
  {
    id: 'growth',
    number: '04',
    title: 'Growth',
    description: 'SEO-ready foundations, conversion improvements and ongoing optimization.',
    deliverables: [
      'Technical SEO & Schema markup',
      'Conversion rate optimization (CRO)',
      'Analytics & event tracking setup',
      'Ongoing technical maintenance & support'
    ],
    highlight: 'Results'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'kinetic-fitness',
    number: '01',
    category: 'Fitness & Wellness',
    title: 'KINETIC Athletic Club',
    tagline: 'High-Performance Training & Recovery Facility',
    description: 'A dark, editorial digital identity and booking portal for an elite metropolitan fitness club. Built with dynamic schedule integration, membership checkout, and high-impact visual storytelling.',
    industry: 'Fitness / Health',
    year: '2026',
    deliverables: ['UI/UX Redesign', 'Custom Web Architecture', 'Class Booking Portal', 'Mobile App Companion'],
    technologies: ['React', 'Three.js', 'Tailored CSS Tokens', 'Stripe Integration'],
    coverImage: '/assets/projects/kinetic-gym.jpg',
    liveUrl: '#',
    challenge: 'KINETIC needed to transition away from a generic gym template to reflect their premium $250/mo membership tiers and drive digital membership conversions.',
    solution: 'Designed an aggressive yet sophisticated dark emerald & charcoal aesthetic featuring dynamic trainer profiles, frictionless trial booking, and interactive facility walkthroughs.',
    metrics: [
      { label: 'Booking Flow Time', value: '45s' },
      { label: 'Mobile Performance', value: '98/100' },
      { label: 'Conversion Lift', value: '+42%' }
    ],
    features: [
      'Interactive live schedule filterable by coach and intensity',
      'Seamless multi-step membership sign-up with instant pass generation',
      'Adaptive dark mode with high-contrast emerald interactive accents',
      'Zero layout shift responsive design optimized for mobile athletes'
    ]
  },
  {
    id: 'laura-cucina',
    number: '02',
    category: 'Hospitality & Dining',
    title: "L'Aura Cucina & Bar",
    tagline: 'Michelin-Caliber Contemporary Italian Dining',
    description: 'An evocative digital dining experience celebrating seasonal Italian gastronomy. Features bespoke reservation architecture, interactive seasonal menu presentations, and cellar curation.',
    industry: 'Restaurant / Hospitality',
    year: '2026',
    deliverables: ['Brand Digital Identity', 'Interactive Menu Design', 'OpenTable API Integration', 'Event Booking'],
    technologies: ['Vite', 'React', 'Physical Canvas Shaders', 'Web Audio API'],
    coverImage: '/assets/projects/laura-restaurant.jpg',
    liveUrl: '#',
    challenge: 'The establishment required a digital presence that mirrored the warm, intimate atmosphere of their dining room while simplifying weekend reservation management.',
    solution: 'Engineered an editorial layout with rich typography, subtle ambient photography, a real-time wine cellar directory, and seamless table booking.',
    metrics: [
      { label: 'Table Booking Speed', value: '30s' },
      { label: 'Organic Search Traffic', value: '+68%' },
      { label: 'Mobile Experience', value: '99/100' }
    ],
    features: [
      'Interactive tasting menu with dietary allergen toggles and wine pairings',
      'Integrated private dining & corporate buyout inquiry module',
      'Fast table reservation workflow with zero external redirects',
      'Artisanal photography gallery with smooth micro-interactions'
    ]
  },
  {
    id: 'atelier-nord',
    number: '03',
    category: 'Architecture & Interiors',
    title: 'Atelier Nord Studio',
    tagline: 'Minimalist Scandinavian Architectural Interiors',
    description: 'An ultra-refined portfolio for a modern residential interior architecture studio. Focuses on spatial geometry, tactile material palettes, and expansive full-screen project archives.',
    industry: 'Interior Design / Architecture',
    year: '2026',
    deliverables: ['Digital Portfolio Architecture', 'Client Ingestion Questionnaire', 'Interactive Case Studies'],
    technologies: ['React', 'CSS Grid System', 'Responsive Image Pipeline', 'WebGL Parallax'],
    coverImage: '/assets/projects/atelier-nord.jpg',
    liveUrl: '#',
    challenge: 'Atelier Nord needed to showcase high-budget residential renovations without the site feeling cluttered, preserving a serene architectural whitespace.',
    solution: 'Constructed an architectural grid layout with deep margins, smooth project transitions, detailed blueprint overlays, and a streamlined project inquiry funnel.',
    metrics: [
      { label: 'Average Time On Site', value: '4m 12s' },
      { label: 'Qualified Inquiries', value: '+55%' },
      { label: 'Page Load Speed', value: '0.8s' }
    ],
    features: [
      'Full-screen architectural project galleries with before-and-after sliders',
      'Material palette inspect mode revealing stone, timber, and brass finishes',
      'Comprehensive project scope breakdown and client testimonials',
      'Editorial typography pairing Plus Jakarta Sans with crisp geometric figures'
    ]
  },
  {
    id: 'sol-skincare',
    number: '04',
    category: 'E-commerce & Beauty',
    title: 'Sōl Botanical Skincare',
    tagline: 'Bio-Fermented Clean Skincare Direct to Consumer',
    description: 'A modern direct-to-consumer e-commerce storefront for an organic botanical skincare line. Built for high conversion, subscription renewals, and transparent ingredient exploration.',
    industry: 'E-commerce / Retail',
    year: '2026',
    deliverables: ['Full E-commerce UX', 'Product Detail System', 'Subscription Portal UI', 'Checkout Optimization'],
    technologies: ['React', 'Headless Storefront', 'Shopify Storefront API', 'Framer Smooth Animations'],
    coverImage: '/assets/projects/sol-skincare.jpg',
    liveUrl: '#',
    challenge: 'Sōl needed to clarify complex botanical fermentation science while achieving high checkout conversion on mobile devices.',
    solution: 'Created an airy, tactile product experience with interactive ingredient breakdowns, routine builders, customer routine reviews, and a 2-click subscription flow.',
    metrics: [
      { label: 'Cart Conversion Rate', value: '4.8%' },
      { label: 'Subscription Take Rate', value: '36%' },
      { label: 'Mobile PageSpeed Score', value: '96/100' }
    ],
    features: [
      'Interactive skin routine recommendation builder with instant cart sync',
      'Transparent clinical ingredient glossary with clickable botanical origins',
      'One-tap checkout with Apple Pay and Google Pay support',
      'Flexible recurring subscription management portal'
    ]
  }
];

export const INITIAL_PROCESS = [
  {
    step: '01',
    title: 'Discover',
    tagline: 'Understand & Align',
    description: 'We dive deep into your business model, target audience, competitive landscape, and primary conversion objectives before touching any design software.',
    details: [
      'Stakeholder alignment interview',
      'Target client persona definition',
      'Content audit & sitemap structure',
      'Key performance indicator (KPI) benchmarks'
    ]
  },
  {
    step: '02',
    title: 'Plan',
    tagline: 'Architecture & Strategy',
    description: 'We establish the information architecture, low-fidelity wireframes, and design system direction to guarantee flawless user navigation and clear messaging.',
    details: [
      'Wireframe prototypes & page flows',
      'Color palette, typography & design token setup',
      'Visual moodboards & design direction',
      'Copywriting direction & messaging refinement'
    ]
  },
  {
    step: '03',
    title: 'Develop',
    tagline: 'Build & Polish',
    description: 'We build your website with clean, performant, modern code. Every interaction is tested across all screen resolutions, browsers, and network speeds.',
    details: [
      'Responsive, component-driven development',
      'Micro-interactions and fluid CSS transitions',
      'Form validation, security & honeypot spam traps',
      'Technical SEO, meta tags & Schema.org markup'
    ]
  },
  {
    step: '04',
    title: 'Launch',
    tagline: 'Deploy & Grow',
    description: 'We handle production deployment, domain connection, DNS configuration, and provide clear training or ongoing support so your business can move forward.',
    details: [
      'Pre-launch 40-point quality assurance check',
      'Google Search Console & analytics configuration',
      'Domain & SSL production deployment',
      'Client handover training & 30-day warranty'
    ]
  }
];

export const INITIAL_LEADS = [
  {
    id: 'lead-1001',
    name: 'Marcus Vance',
    business: 'Vance Capital & Advisory',
    email: 'marcus@vancecap.com',
    phone: '+1 (415) 890-3341',
    website: 'https://vancecap.com',
    service: 'Strategy & Web Design',
    budget: '$2,500+',
    message: 'Looking to completely modernize our private advisory website. We need a dark, high-trust editorial aesthetic that appeals to institutional tech founders.',
    date: '2026-09-03T14:22:00Z',
    status: 'Qualified'
  },
  {
    id: 'lead-1002',
    name: 'Elena Rostova',
    business: 'Rostova Contemporary Interiors',
    email: 'elena@rostovastudio.com',
    phone: '+1 (212) 441-9872',
    website: 'https://rostovastudio.com',
    service: 'Full Design & Development',
    budget: '$1,000–$2,500',
    message: 'Our existing Squarespace site feels sluggish and dated. We want a fast, minimalist showcase for our Manhattan interior renovation projects.',
    date: '2026-09-04T09:15:00Z',
    status: 'New'
  },
  {
    id: 'lead-1003',
    name: 'Jordan Hayes',
    business: 'Apex Craft Roasters',
    email: 'jordan@apexcoffee.co',
    phone: '',
    website: 'https://apexcoffee.co',
    service: 'E-commerce & Web Development',
    budget: '$2,500+',
    message: 'We are expanding our wholesale and direct subscription coffee model. Need a custom storefront with high mobile conversion.',
    date: '2026-09-04T18:40:00Z',
    status: 'Contacted'
  }
];
