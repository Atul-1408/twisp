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
    description: 'A modern digital platform for an elite fitness club. Built with dynamic scheduling, membership checkout, and high-impact visual storytelling.',
    industry: 'Fitness & Wellness',
    year: '2026',
    deliverables: ['UI/UX Redesign', 'Custom Web Architecture', 'Class Booking Portal', 'Mobile App Companion'],
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
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
    category: 'Restaurant & Hospitality',
    title: "L’Aura Cucina & Bar",
    tagline: 'Michelin-Caliber Contemporary Italian Dining',
    description: 'An evocative digital dining experience with reservation features, interactive menus, and a seamless user journey from discovery to dining.',
    industry: 'Restaurant & Hospitality',
    year: '2026',
    deliverables: ['Brand Digital Identity', 'Interactive Menu Design', 'OpenTable API Integration', 'Private Event Booking'],
    technologies: ['Vite', 'React', 'Framer Motion'],
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
    description: 'A refined portfolio for a modern residential interior architecture studio. Showcases spatial storytelling, project galleries, and a seamless contact flow.',
    industry: 'Architecture & Interiors',
    year: '2026',
    deliverables: ['Digital Portfolio Architecture', 'Client Ingestion Questionnaire', 'Interactive Case Studies', 'Material Showcase'],
    technologies: ['React', 'CSS Grid', 'GSAP'],
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
      'Editorial typography pairing clean sans-serif with crisp geometric figures'
    ]
  },
  {
    id: 'lumiere-skincare',
    number: '04',
    category: 'E-commerce & Beauty',
    title: 'Lumière Skincare',
    tagline: 'High-Potency Clean Botanical Skincare Formulations',
    description: 'A clean and elegant online store for a premium skincare brand. Includes product catalog, secure checkout, and a content-rich brand experience.',
    industry: 'E-commerce & Beauty',
    year: '2026',
    deliverables: ['Full E-commerce UX', 'Product Catalog System', 'Stripe Checkout Pipeline', 'Brand Storytelling Experience'],
    technologies: ['Next.js', 'Stripe', 'Tailwind CSS'],
    coverImage: '/assets/projects/sol-skincare.jpg',
    liveUrl: '#',
    challenge: 'Lumière needed an elevated e-commerce experience that communicates pure botanical efficacy while optimizing mobile cart conversion rates.',
    solution: 'Created an airy, editorial shopping experience with clean product cards, transparent ingredient disclosures, customer routines, and a rapid 1-click checkout flow.',
    metrics: [
      { label: 'Cart Conversion Rate', value: '4.8%' },
      { label: 'Mobile Checkout Speed', value: '25s' },
      { label: 'Mobile PageSpeed Score', value: '97/100' }
    ],
    features: [
      'Interactive skin routine recommendation builder with instant cart sync',
      'Transparent clinical ingredient glossary with clickable botanical origins',
      'Frictionless checkout with Apple Pay and Stripe secure payment elements',
      'Refined micro-animations and responsive product imagery'
    ]
  },
  {
    id: 'taskly',
    number: '05',
    category: 'SaaS & Technology',
    title: 'Taskly',
    tagline: 'Next-Generation Team Collaboration & Sprint Management',
    description: 'A modern SaaS platform designed for seamless team collaboration. Features real-time updates, powerful dashboards, and a frictionless onboarding flow.',
    industry: 'SaaS & Technology',
    year: '2026',
    deliverables: ['Product UX/UI Architecture', 'Real-Time Dashboard UI', 'Onboarding Flow Optimization', 'Design System Systematization'],
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    coverImage: '/assets/projects/taskly-app.jpg',
    liveUrl: '#',
    challenge: 'Taskly needed to differentiate itself in a crowded productivity space with an ultra-responsive interface that eliminates project clutter and accelerates daily team standups.',
    solution: 'Engineered a minimalist, high-density dashboard with intuitive drag-and-drop kanban boards, real-time activity timelines, and an instant 3-step team onboarding sequence.',
    metrics: [
      { label: 'User Onboarding Speed', value: '60s' },
      { label: 'Daily Active Retention', value: '+38%' },
      { label: 'Dashboard Latency', value: '<50ms' }
    ],
    features: [
      'Real-time collaborative kanban boards with live teammate presence',
      'Interactive sprint velocity charts and automated progress summaries',
      'Modular widget dashboards customizable for engineering and design leads',
      'Frictionless OAuth onboarding with zero credit-card friction'
    ]
  },
  {
    id: 'roam-travel',
    number: '06',
    category: 'Travel & Tours',
    title: 'Roam Travel Co.',
    tagline: 'Curated Luxury Expeditions & Immersive Journeys',
    description: 'An immersive travel platform showcasing curated destinations, travel guides, and booking integrations for unforgettable experiences.',
    industry: 'Travel & Tours',
    year: '2026',
    deliverables: ['Editorial Travel Portal', 'Interactive Destination Maps', 'Custom CMS Architecture', 'Expedition Booking Engine'],
    technologies: ['Next.js', 'CMS', 'Map Integration'],
    coverImage: '/assets/projects/roam-travel.jpg',
    liveUrl: '#',
    challenge: 'Roam Travel Co. wanted to inspire travelers with magazine-caliber visuals while providing a reliable, step-by-step booking journey for complex multi-day tours.',
    solution: 'Constructed an immersive, imagery-led digital portal featuring interactive expedition maps, day-by-day itineraries, seasonal availability selectors, and custom CMS publishing.',
    metrics: [
      { label: 'Inquiry Conversion', value: '+52%' },
      { label: 'Average Session Depth', value: '5.4 pages' },
      { label: 'Mobile Page Load', value: '0.9s' }
    ],
    features: [
      'Interactive destination exploration map with route highlights and elevation profiles',
      'Comprehensive itinerary viewer with day-by-day logistics and gear checklists',
      'Custom headless CMS publishing for effortless field updates and editorial guides',
      'Direct booking inquiry pipeline integrated with automated customer reservations'
    ]
  },
  {
    id: 'aura-wellness',
    number: '07',
    category: 'Fitness & Wellness',
    title: 'AURA Modern Wellness',
    tagline: 'Modern Wellness, Movement & Everyday Ritual',
    description: 'A considered digital sanctuary for a modern wellness studio. Features holistic treatment reservations, mindful editorial journal, and serene spatial storytelling.',
    industry: 'Wellness & Sanctuary',
    year: '2026',
    deliverables: ['Digital Sanctuary Architecture', 'Treatment Booking Engine', 'Holistic Journal CMS', 'Mobile Web Experience'],
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    coverImage: '/assets/TWISP-V2-ASSETS/AURA/cover.webp',
    screens: [
      '/assets/TWISP-V2-ASSETS/AURA/desktop-01.webp',
      '/assets/TWISP-V2-ASSETS/AURA/desktop-02.webp',
      '/assets/TWISP-V2-ASSETS/AURA/desktop-03.webp',
      '/assets/TWISP-V2-ASSETS/AURA/mobile.webp'
    ],
    liveUrl: '#',
    challenge: 'AURA required a calming digital presence that translated their tactile, sensory in-studio sanctuary into a serene online ritual without friction.',
    solution: 'Constructed an ethereal, warm-neutral aesthetic featuring gentle micro-animations, effortless treatment reservations, and an editorial wellness journal.',
    metrics: [
      { label: 'Direct Booking Lift', value: '+48%' },
      { label: 'Mobile Engagement', value: '3m 40s' },
      { label: 'Page Performance', value: '99/100' }
    ],
    features: [
      'Bespoke treatment selection with therapist matching and instant reservation',
      'Mindful editorial journal covering movement, nourishment, and longevity',
      'Fluid responsive layout evoking natural daylight and warm architectural textures',
      'Zero-friction guest checkout with calendar integration and SMS reminders'
    ]
  },
  {
    id: 'forma-architecture',
    number: '08',
    category: 'Architecture & Interiors',
    title: 'FORMA Architecture & Spaces',
    tagline: 'Spaces with Intention · Human-Centered Architecture',
    description: 'An architectural monograph and digital portfolio for a premier architecture studio designing environments that inspire, endure, and elevate the human experience.',
    industry: 'Architecture & Spatial Design',
    year: '2026',
    deliverables: ['Architectural Portfolio UX', 'Full-Bleed Project Gallery', 'Studio Monograph CMS', 'Interactive Blueprint Viewer'],
    technologies: ['React', 'CSS Grid', 'GSAP'],
    coverImage: '/assets/TWISP-V2-ASSETS/FORMA/cover.webp',
    screens: [
      '/assets/TWISP-V2-ASSETS/FORMA/desktop-01.webp',
      '/assets/TWISP-V2-ASSETS/FORMA/desktop-02.webp',
      '/assets/TWISP-V2-ASSETS/FORMA/desktop-03.webp',
      '/assets/TWISP-V2-ASSETS/FORMA/mobile.webp'
    ],
    liveUrl: '#',
    challenge: 'FORMA needed a digital monograph that matched their brutalist, monolithic aesthetic while preserving fast load times for ultra-high-resolution architectural photography.',
    solution: 'Engineered an expansive grid system with bespoke image streaming, full-screen project walkthroughs, and minimal editorial typography.',
    metrics: [
      { label: 'Commercial Inquiries', value: '+62%' },
      { label: 'Average Session Time', value: '4m 55s' },
      { label: 'Image Load Latency', value: '<0.4s' }
    ],
    features: [
      'Interactive project showcase spanning private residences, studios, and cultural pavilions',
      'High-fidelity architectural film integration and material texture inspect modes',
      'Responsive editorial masonry grid tailored for multi-screen showcase',
      'Seamless project inquiry form with preliminary site brief uploading'
    ]
  },
  {
    id: 'mono-creative',
    number: '09',
    category: 'SaaS & Technology',
    title: 'MONO Creative Direction',
    tagline: 'Ideas Made Visible · Creative Direction & Digital Experiences',
    description: 'A bold, high-contrast digital portfolio for an international creative director and brand consultancy specializing in art direction, digital products, and brand identities.',
    industry: 'Creative Direction & Branding',
    year: '2026',
    deliverables: ['Brand Identity Architecture', 'Interactive Case Studies', 'Editorial Thinking Archive', 'Custom Dark Mode UX'],
    technologies: ['Vite', 'React', 'Framer Motion'],
    coverImage: '/assets/TWISP-V2-ASSETS/MONO/cover.webp',
    screens: [
      '/assets/TWISP-V2-ASSETS/MONO/desktop-01.webp',
      '/assets/TWISP-V2-ASSETS/MONO/desktop-02.webp',
      '/assets/TWISP-V2-ASSETS/MONO/desktop-03.webp',
      '/assets/TWISP-V2-ASSETS/MONO/mobile.webp'
    ],
    liveUrl: '#',
    challenge: 'MONO needed to push the boundaries of digital portfolio interaction with visceral dark-mode typography and seamless transitions without sacrificing accessibility.',
    solution: 'Created a stark black-and-vermilion typographic showcase with smooth cursor interactions, project case study archives, and an editorial thoughts engine.',
    metrics: [
      { label: 'Global Agency Inquiries', value: '+74%' },
      { label: 'Interaction Rate', value: '88%' },
      { label: 'Core Web Vitals', value: '100/100' }
    ],
    features: [
      'Curated case study grid showcasing brand identity, digital products, and experimental works',
      'Integrated "Notes & Ideas" intellectual writing platform with reader mode',
      'Kinetic typography and hover states built with high-performance CSS transitions',
      'Frictionless collaboration inquiry workflow for brands and enterprise clients'
    ]
  },
  {
    id: 'nexus-financial',
    number: '10',
    category: 'SaaS & Technology',
    title: 'NEXUS Financial Infrastructure',
    tagline: 'Move Money Forward · Next-Generation Global Payments',
    description: 'A modern financial infrastructure and treasury management platform empowering global businesses to move, convert, and manage capital across 190+ countries with speed and security.',
    industry: 'FinTech & Infrastructure',
    year: '2026',
    deliverables: ['FinTech Platform Architecture', 'Real-Time Financial Analytics', 'Global Payment Gateway UI', 'Enterprise Security Console'],
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    coverImage: '/assets/TWISP-V2-ASSETS/NEXUS/cover.webp',
    screens: [
      '/assets/TWISP-V2-ASSETS/NEXUS/desktop-01.webp',
      '/assets/TWISP-V2-ASSETS/NEXUS/desktop-02.webp',
      '/assets/TWISP-V2-ASSETS/NEXUS/desktop-03.webp',
      '/assets/TWISP-V2-ASSETS/NEXUS/mobile.webp'
    ],
    liveUrl: '#',
    challenge: 'NEXUS needed to convey enterprise-grade reliability and complex multi-currency capabilities through an intuitive, modern dashboard interface.',
    solution: 'Designed a dark-emerald financial command center featuring live transaction telemetry, interactive currency charts, and multi-tier permission controls.',
    metrics: [
      { label: 'Enterprise Uptime', value: '99.9%' },
      { label: 'Onboarding Speed', value: '40s' },
      { label: 'Demo Conversions', value: '+56%' }
    ],
    features: [
      'Real-time global transaction visualization with live settlement telemetry',
      'Smarter treasury management console with automated multi-currency hedging',
      'Instant API documentation explorer and sandbox testing integration',
      'Enterprise-grade security architecture with biometrics and role-based access'
    ]
  },
  {
    id: 'nova-intelligence',
    number: '11',
    category: 'SaaS & Technology',
    title: 'NOVA Intelligence Layer',
    tagline: 'Intelligence in Motion · Enterprise AI Decision Platform',
    description: 'An enterprise AI intelligence layer designed to unify data, automate cross-functional workflows, and empower executive teams to make high-confidence decisions 10x faster.',
    industry: 'AI & Big Data Analytics',
    year: '2026',
    deliverables: ['AI Platform Design System', 'Predictive Analytics Dashboard', 'Conversational AI Assistant UI', 'Enterprise Integration Hub'],
    technologies: ['React', 'Next.js', 'PostgreSQL'],
    coverImage: '/assets/TWISP-V2-ASSETS/NOVA/cover.webp',
    screens: [
      '/assets/TWISP-V2-ASSETS/NOVA/desktop-01.webp',
      '/assets/TWISP-V2-ASSETS/NOVA/desktop-02.webp',
      '/assets/TWISP-V2-ASSETS/NOVA/desktop-03.webp',
      '/assets/TWISP-V2-ASSETS/NOVA/mobile.webp'
    ],
    liveUrl: '#',
    challenge: 'NOVA needed to present complex neural analytics and workflow automation in a format that business operators could comprehend and act on in seconds.',
    solution: 'Engineered an ethereal, deep-space visual design system featuring proactive intelligence cards, interactive prediction graphs, and an integrated copilot drawer.',
    metrics: [
      { label: 'Insight Velocity', value: '10x' },
      { label: 'Workflow Efficiency', value: '+34%' },
      { label: 'Decision Confidence', value: '90%' }
    ],
    features: [
      'Proactive intelligence overview tracking total insights, project velocity, and cost optimization',
      'Contextual AI copilot modal answering natural-language queries across corporate repositories',
      'Multi-channel workflow automation builder with zero-code triggers',
      'High-density performance trends with predictive forecasting curves'
    ]
  },
  {
    id: 'orbit-essentials',
    number: '12',
    category: 'E-commerce & Beauty',
    title: 'ORBIT Everyday Essentials',
    tagline: 'Objects for Everyday Life · Mindful Modern Living',
    description: 'A minimalist direct-to-consumer lifestyle brand crafting sustainable home goods, workspace tools, and travel essentials designed for simplicity and intentional living.',
    industry: 'Consumer Goods & Lifestyle',
    year: '2026',
    deliverables: ['E-Commerce Digital Storefront', 'Quick-Shop Drawer UI', 'Curated Editorial Catalog', 'Stripe Multi-Currency Checkout'],
    technologies: ['Next.js', 'Stripe', 'Tailwind CSS'],
    coverImage: '/assets/TWISP-V2-ASSETS/ORBIT/cover.webp',
    screens: [
      '/assets/TWISP-V2-ASSETS/ORBIT/desktop-01.webp',
      '/assets/TWISP-V2-ASSETS/ORBIT/desktop-02.webp',
      '/assets/TWISP-V2-ASSETS/ORBIT/desktop-03.webp',
      '/assets/TWISP-V2-ASSETS/ORBIT/mobile.webp'
    ],
    liveUrl: '#',
    challenge: 'ORBIT required a digital shopping experience that emphasized product craftsmanship and tactile warmth while keeping checkout latency under 20 seconds.',
    solution: 'Created a warm stone-and-terracotta visual layout with quick-add cart drawers, multi-angle zoom galleries, and transparent sustainability disclosures.',
    metrics: [
      { label: 'Mobile Cart Conversion', value: '5.2%' },
      { label: 'Average Order Value', value: '+31%' },
      { label: 'Repeat Customer Rate', value: '44%' }
    ],
    features: [
      'Instant slide-over cart with live shipping calculation and 1-tap Apple Pay / Stripe',
      'Interactive category explorer spanning Home, Lifestyle, Workspace, and Accessories',
      'Material sustainability tracker outlining circular lifecycle for every SKU',
      'Editorial stories and founder film integrations driving brand affinity'
    ]
  },
  {
    id: 'pulse-healthcare',
    number: '13',
    category: 'Fitness & Wellness',
    title: 'PULSE Healthcare Connected',
    tagline: 'Healthcare, Connected · Next-Generation Patient Care',
    description: 'A connected healthcare and telehealth ecosystem connecting over 50,000 patients with verified physicians, seamless appointments, lab results, and personalized treatment plans.',
    industry: 'HealthTech & Telemedicine',
    year: '2026',
    deliverables: ['Telehealth Patient Portal', 'Physician Scheduling System', 'HIPAA-Compliant Records UI', 'Mobile Patient Application'],
    technologies: ['React', 'Node.js', 'WebRTC'],
    coverImage: '/assets/TWISP-V2-ASSETS/PULSE/cover.webp',
    screens: [
      '/assets/TWISP-V2-ASSETS/PULSE/desktop-01.webp',
      '/assets/TWISP-V2-ASSETS/PULSE/desktop-02.webp',
      '/assets/TWISP-V2-ASSETS/PULSE/desktop-03.webp',
      '/assets/TWISP-V2-ASSETS/PULSE/mobile.webp'
    ],
    liveUrl: '#',
    challenge: 'PULSE required an approachable, deeply trustworthy interface that made booking appointments and accessing confidential lab results effortless across all age demographics.',
    solution: 'Designed a clean, reassuring navy-and-mint visual design system with clear doctor profiles, intuitive symptom navigators, and unified patient records.',
    metrics: [
      { label: 'Patient Satisfaction', value: '4.9/5' },
      { label: 'Patients Served', value: '50K+' },
      { label: 'Booking Completion', value: '94%' }
    ],
    features: [
      'Instant appointment booking across Primary Care, Specialists, and Mental Health',
      'Secure patient health record vault with instant prescription refill requests',
      'Encrypted HD video consultation module with integrated clinical notes',
      'Companion mobile dashboard displaying daily vitals and medication reminders'
    ]
  },
  {
    id: 'vanta-fashion',
    number: '14',
    category: 'E-commerce & Beauty',
    title: 'VANTA Form in Motion',
    tagline: 'Sculpted for a Bolder Tomorrow · Luxury Avant-Garde Fashion',
    description: 'A sculptural luxury fashion monograph and haute couture portal exploring movement, contrast, and modern silhouettes through high-impact editorial storytelling.',
    industry: 'Luxury Fashion & Haute Couture',
    year: '2026',
    deliverables: ['Haute Couture Lookbook UX', 'Editorial Collection Runway', 'Private Client Concierge', 'High-Performance Media Engine'],
    technologies: ['React', 'Vite', 'CSS Grid'],
    coverImage: '/assets/TWISP-V2-ASSETS/VANTA/cover.webp',
    screens: [
      '/assets/TWISP-V2-ASSETS/VANTA/desktop-01.webp',
      '/assets/TWISP-V2-ASSETS/VANTA/desktop-02.webp',
      '/assets/TWISP-V2-ASSETS/VANTA/desktop-03.webp',
      '/assets/TWISP-V2-ASSETS/VANTA/mobile.webp'
    ],
    liveUrl: '#',
    challenge: 'VANTA needed a high-fashion digital runway that evoked the theatrical exclusivity of a Paris couture presentation while maintaining responsive precision across all devices.',
    solution: 'Engineered an obsidian, editorial layout with dramatic typographic contrast, fluid swipe-based lookbook galleries, and private concierge ordering.',
    metrics: [
      { label: 'Runway Engagement', value: '6m 12s' },
      { label: 'Private Order Inquiries', value: '+85%' },
      { label: 'Image Render Speed', value: '0.3s' }
    ],
    features: [
      'Full-bleed editorial runway galleries with tactile fabric texture magnification',
      'Private client concierge module for bespoke garment fittings and reservations',
      'Multi-chapter seasonal collection viewer with synchronized fashion film soundtracks',
      'Zero-friction private trunk show invitations and encrypted VIP checkouts'
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
