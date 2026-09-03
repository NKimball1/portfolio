// ---------------------------------------------------------------------------
// All site copy lives here. Edit this file to change what the site says;
// the components are purely presentational and read from these exports.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Nicholas Kimball',
  role: 'Forward Deployed Engineer',
  location: 'Madison, WI',
  availability: 'Open to remote & relocation',
  email: 'nickkimball12@gmail.com',
  github: 'https://github.com/NKimball1',
  linkedin: 'https://www.linkedin.com/in/nicholas-kimball-819194150/',
  resume: '/Nicholas-Kimball-Resume.pdf',
  lede:
    'I take end-to-end ownership of technical projects — requirements and prototyping through production and support. I build and deploy LLM-powered systems myself, and I bring deep enterprise-integration experience across ERPs, TMS, APIs, and messy legacy data.',
}

export const stats = [
  { value: '~1M', label: 'API requests/day at peak on a system I architected' },
  { value: '75+', label: 'customer environments owned, no two alike' },
  { value: '92%', label: 'of issues resolved without engineering escalation' },
  { value: '45%', label: 'of accounts returned for repeat engagements' },
]

export const work = [
  {
    title: 'Agentic LLM Coaching Workflow',
    org: 'Personal',
    year: '2026',
    kind: 'Deployed · Open source',
    summary:
      'An agentic workflow running unattended in production. It ingests activity data from the Strava API, analyzes it against a structured training plan using the Anthropic API with tool calling, and delivers automated coaching reports — no manual steps, on a cron on AWS.',
    detail:
      'Two decisions carry the design. First, deterministic computation stays out of the model: all the date math and load calculation happens in Python and arrives as stated fact, which eliminated a whole class of confident-but-wrong LLM output. Second, the model gets exactly one tool — a typed, gateable write — because a tool only earns its place for selective retrieval or a real side effect, not for dressing up work ordinary code already does. On top of that sits an eval layer: frozen fixtures scored by an LLM judge against a rubric, prompt versioning, and a SQLite run log, so prompt and model changes are measurable rather than vibes. I also benchmarked model quality against token cost and latency with a fixed judge, keeping eval noise and judge-independence in view. Provider and data-source seams mean swapping the LLM vendor or the input source is one adapter and zero business-logic changes.',
    tags: [
      'Python',
      'Anthropic API',
      'Tool use',
      'Evals & LLM-as-judge',
      'OAuth',
      'AWS',
      'SQLite',
    ],
    links: [{ label: 'View on GitHub', href: 'https://github.com/NKimball1/cycling-agentic-flow' }],
    featured: true,
  },
  {
    title: 'Better AI Playlists',
    org: 'Personal',
    year: '2026',
    kind: 'Open source',
    summary:
      'A natural-language playlist agent for Spotify that actually honors hard constraints — built because Spotify’s own AI playlist can’t handle “only songs I’ve already liked.” Generator/validator design: 99% constraint pass rate against a 57.6% naive baseline, measured on golden prompts.',
    detail:
      'The thesis is separating constraints from taste. One structured-output call compiles the prompt into a typed spec with two halves: hard constraints (source mode, counts, durations, year ranges, artist caps) enforced by code, and soft intent (vibe, energy arc) that the model is judged on but never trusted to enforce. Tool gating is policy, not prompt — in liked-only mode the Spotify search tool isn’t in the tool list at all, so the model can’t be talked into it. The agent can’t ship a playlist directly either: finalize runs a deterministic validator, and violations come back as structured repair instructions until the result is clean or the budget is exhausted. That validator is what makes model choice a cost knob instead of a correctness risk — Haiku at about five cents a run takes more repair rounds than Opus, not worse results. Spotify had also removed its recommendation and audio-feature endpoints, so retrieval is rebuilt from scratch: the library in SQLite with full-text search, genres reconstructed from MusicBrainz artist tags, hard filters pushed into SQL. The eval layer caught real problems, including a judge that agreed with my own blind preferences only 4 times in 10 and turned out to be popularity-biased — so it was demoted from scorer to context.',
    tags: [
      'Python',
      'Structured output',
      'Tool gating',
      'Deterministic validation',
      'Evals & LLM-as-judge',
      'SQLite / FTS5',
      'Model routing',
    ],
    links: [
      { label: 'View on GitHub', href: 'https://github.com/NKimball1/better-ai-playlists' },
      { label: 'Eval report', href: '/playlists-evals.html' },
    ],
    featured: true,
  },
  {
    title: 'Real-Time Multi-Carrier Rating Integration',
    org: 'ProShip',
    year: '2024 — 2026',
    kind: 'Professional',
    summary:
      'Architected a production integration serving roughly a million API requests a day at peak, returning rates from up to six carriers in under two seconds.',
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
      'Delivered an end-to-end integration across 12 distribution centers for an enterprise customer moving millions of shipments a year.',
    detail:
      'A year-long engagement start to finish: requirements and scoping, prototyping, building against their ERP, WMS, and carrier systems, site-by-site deployment, cutover from the legacy system, and production support after go-live. I was the technical throughline across the customer, their WMS vendors, and their outside consultants.',
    tags: ['Discovery', 'ERP / WMS', 'Cutover', 'Stakeholder management'],
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
      'Ramped onto a sister company’s unfamiliar product and shipped five legacy integration migrations, all under budget, then trained their engineers on our platform.',
    detail:
      'Dropped into a codebase and a product I had never seen, with their team as the eventual owners. Shipping the migrations was half the job; leaving the team able to maintain the result was the other half.',
    tags: ['Legacy migration', 'JavaScript', 'Enablement'],
  },
]

export const experience = [
  {
    role: 'Software Integration Engineer',
    org: 'ProShip',
    note: 'Enterprise shipping & logistics software · Remote',
    period: 'Apr 2024 — Present',
    points: [
      'Lead end-to-end delivery of enterprise integrations: requirements and scoping with customers, prototyping, building against their ERP, TMS/WMS, and carrier systems, deployment, cutover, and production support.',
      'Own the customer relationship and the code across 75+ environments, no two alike; resolve 92% of issues without escalating to engineering by tracing source to root cause.',
      'Architected a production integration handling ~1M API requests/day at peak — multi-server, multi-threaded, sub-two-second results across up to six carriers.',
      'Partner with sales and stakeholders to gather requirements, present system designs, and communicate progress and risk to technical and non-technical audiences; codify reusable delivery playbooks.',
    ],
  },
  {
    role: 'Software Quality Engineer',
    org: 'Cognizant Technology Solutions',
    note: 'Remote',
    period: 'Jan 2021 — Apr 2023',
    points: [
      'Built automated regression suites for a real-time data-ingestion pipeline, saving 50+ hours of manual coverage biweekly.',
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
    group: 'LLM & Agentic',
    items: [
      'Building & deploying LLM systems',
      'Agentic design with tool use',
      'LLM-as-judge evaluation',
      'Model benchmarking',
      'Prompt versioning',
      'Deterministic-vs-judgment separation',
      'Anthropic API',
    ],
  },
  {
    group: 'Building & Integration',
    items: [
      'End-to-end delivery',
      'Enterprise integrations (ERP, TMS)',
      'REST / SOAP APIs',
      'OAuth',
      'Data pipelines',
      'System design',
      'Production support',
    ],
  },
  {
    group: 'Languages & Data',
    items: ['Python', 'Java', 'C#', 'JavaScript', 'SQL', 'SQLite', 'Bash', 'XML', 'JSON'],
  },
  {
    group: 'Platforms',
    items: ['AWS', 'Git', 'Spring', 'Maven', 'MariaDB / SQL Server', 'Jira', 'Confluence'],
  },
]

export const about = [
  'I’m a customer-facing engineer. The work starts in a room with people describing a problem in their own words, and ends with something running in their environment that I’m still on the hook for months later.',
  'In practice I wear whatever role the engagement needs — development, architecture, DevOps, support, training. The judgment call I make most often isn’t how to build something, but whether to configure, automate, build, or simplify the requirement out of existence.',
  'The same instinct shows up in how I use LLMs. I build and deploy them myself rather than talking about them abstractly, and most of what I’ve learned is about restraint: keep deterministic work in ordinary code, let a validator rather than the model decide when the output is correct, give the model a tool only when one genuinely earns its place, and measure prompt changes instead of trusting how they feel.',
]

export const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]
