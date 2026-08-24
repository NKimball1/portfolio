// ---------------------------------------------------------------------------
// All site copy lives here. Edit this file to change what the site says;
// the components are purely presentational and read from these exports.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Nicholas Kimball',
  role: 'Forward Deployed Engineer',
  location: 'Madison, WI',
  availability: 'Open to relocation & travel',
  email: 'nickkimball12@gmail.com',
  github: 'https://github.com/NKimball1',
  linkedin: 'https://www.linkedin.com/in/nicholas-kimball',
  resume: '/Nicholas-Kimball-Resume.pdf',
  lede:
    'I sit with customers, work out what they actually need, and build it end to end — discovery, architecture, deployment, cutover, and the support that comes after. Every engagement lands in a different stack, so ramping fast is the job.',
}

export const stats = [
  { value: '~1M', label: 'API requests/day at peak on a system I architected' },
  { value: '75', label: 'accounts supported across four industries' },
  { value: '92%', label: 'of tickets resolved without engineering escalation' },
  { value: '45%', label: 'of accounts returned for repeat engagements' },
]

export const work = [
  {
    title: 'cycling-agentic-flow',
    org: 'Personal',
    year: '2026',
    kind: 'Open source',
    summary:
      'An agentic training coach running unattended in production. It pulls each ride from Strava, computes multi-sport training load, analyzes it against my plan with Claude, and emails back a coaching brief — no manual steps.',
    detail:
      'Deliberately restrained agent design: deterministic gathering stays in plain Python, and the model only gets a tool where one genuinely earns its place — a typed, gateable write. It also ships an eval harness (frozen fixtures scored by an LLM judge against a rubric, logged to SQLite) so prompt changes get measured instead of guessed at. Live on AWS on a five-minute cron since August 2026.',
    tags: ['Python', 'Claude API', 'Tool use', 'Evals', 'AWS'],
    href: 'https://github.com/NKimball1/cycling-agentic-flow',
    linkLabel: 'View on GitHub',
    featured: true,
  },
  {
    title: 'Real-Time Multi-Carrier Rating Integration',
    org: 'ProShip',
    year: '2024 — 2026',
    kind: 'Professional',
    summary:
      'Architected the backend for a shipping-rate engine serving roughly a million API requests a day at peak, returning rates from up to six carriers in under two seconds.',
    detail:
      'The hard part was never the carrier APIs — it was holding the latency budget when any single carrier could be slow or down. Multi-server, multi-threaded fan-out with per-carrier timeouts and graceful degradation, so one bad upstream never holds the whole response hostage.',
    tags: ['System design', 'Concurrency', 'REST/SOAP', 'Performance'],
  },
  {
    title: 'Nationwide Distribution Rollout',
    org: 'ProShip',
    year: '2025',
    kind: 'Professional',
    summary:
      'Delivered an end-to-end shipping integration across 12 distribution centers for an enterprise customer moving millions of shipments a year.',
    detail:
      'A year-long engagement start to finish: discovery and requirements, statement of work, build, site-by-site deployment, cutover from the legacy system, and support through go-live. I was the technical throughline across the customer, their WMS vendors, and their outside consultants.',
    tags: ['Discovery', 'Cutover', 'WMS', 'Stakeholder management'],
  },
  {
    title: 'GarminIQ',
    org: 'Personal',
    year: '2026',
    kind: 'In progress',
    summary:
      'An on-device Connect IQ app that writes a real morning brief from your own watch data — a better Garmin Morning Report, built so anyone can run it, not just me.',
    detail:
      'On-device was chosen by elimination, and that constraint is the entire design. Every server-side path to Garmin data either wanted each user’s account password, was deprecated, or required applying as a legal entity — none of which survive the requirement that other people can actually use it. So the app calls the model straight from the watch, bring-your-own-key. Monkey C, targeting the fēnix 8 and Forerunner 965.',
    tags: ['Monkey C', 'Connect IQ', 'LLM', 'Constraint-driven design'],
  },
  {
    title: 'MariaDB Replication Proof of Concept',
    org: 'ProShip',
    year: '2025',
    kind: 'Professional',
    summary:
      'Built a working replication POC in MariaDB to meet a customer requirement without licensing SQL Server’s native replication — a potential $40K+ saving for them.',
    detail:
      'The requirement looked like a hard dependency on an expensive product feature. Prototyping the alternative turned out to be cheaper than arguing about it, so I built the thing and let it answer the question.',
    tags: ['MariaDB', 'SQL Server', 'Prototyping', 'Cost engineering'],
  },
  {
    title: 'Cross-Product Legacy Migration',
    org: 'ProShip',
    year: '2025',
    kind: 'Professional',
    summary:
      'Ramped onto a sister company’s unfamiliar product, migrated five legacy VBScript integrations to JavaScript — all under budget — then trained their engineers on our platform.',
    detail:
      'Dropped into a codebase and a product I had never seen, with their team as the eventual owners. Shipping the migrations was half the job; leaving the team able to maintain the result was the other half.',
    tags: ['VBScript', 'JavaScript', 'Legacy migration', 'Enablement'],
  },
]

export const experience = [
  {
    role: 'Software Integration Engineer',
    org: 'ProShip',
    note: 'Enterprise shipping & logistics software · Remote',
    period: 'Apr 2024 — Present',
    points: [
      'Own the full lifecycle for enterprise customers: discovery, scoping and statements of work, build, deployment, cutover, and long-term support.',
      'Resolved 150+ support and integration tickets across 75 accounts, handling 92% without escalating to engineering by reading product source to separate user error from bugs from real product gaps.',
      'Delivered four major end-to-end integrations spanning three-month to year-long engagements across healthcare, financial, retail, and automotive customers.',
      'Use AI and agentic development tools daily — source analysis, proofs of concept, customer-facing documentation, architecture review, diagrams, and feasibility research.',
    ],
  },
  {
    role: 'Software Quality Engineer',
    org: 'Cognizant Technology Solutions',
    note: 'Remote',
    period: 'Jan 2021 — Apr 2023',
    points: [
      'Built automated regression suites for a real-time data-ingestion pipeline, saving 50+ hours of manual coverage biweekly.',
      'Automated a 10+ hour source-team onboarding process with Java, Cucumber, and Bash.',
      'Delivered 15+ releases with zero critical production issues.',
    ],
  },
  {
    role: 'B.S. Computer Science',
    org: 'University of Wisconsin–Madison',
    note: '',
    period: 'Dec 2019',
    points: [],
  },
]

export const skills = [
  {
    group: 'Building & Integration',
    items: [
      'End-to-end delivery',
      'Discovery & requirements',
      'System design',
      'REST / SOAP integration',
      'Data mapping',
      'Legacy migration',
      'Cutover',
      'POCs & prototypes',
    ],
  },
  {
    group: 'Languages & Data',
    items: ['Java', 'C#', 'JavaScript', 'Python', 'SQL', 'Bash', 'VBScript', 'XML', 'JSON'],
  },
  {
    group: 'AI & Agentic',
    items: [
      'Claude API & tool use',
      'Agent design',
      'Eval harnesses',
      'Prompt iteration',
      'Source-code analysis',
      'Agentic dev tooling, daily',
    ],
  },
  {
    group: 'Platforms',
    items: [
      'AWS',
      'Git',
      'Spring',
      'Maven',
      'MariaDB / SQL Server',
      'EDI & carrier exchange',
      'Unix / Linux',
      'Jira · Confluence · Zendesk',
    ],
  },
]

export const about = [
  'I’m a customer-facing engineer. The work starts in a room with people describing a problem in their own words, and ends with something running in their environment that I am still on the hook for months later.',
  'In practice I wear whatever role the engagement needs — development, architecture, DevOps, support, training. The judgment call I make most often isn’t how to build something, but whether to configure, automate, build, or simplify the requirement out of existence.',
  'Outside client work I build things to keep my own hands in it. Lately that means agentic systems: a training coach that has been running unattended in production since August, and an on-device LLM brief for a Garmin watch. Both exist because I wanted to find out where agents genuinely help and where they’re just ceremony.',
]

export const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]
