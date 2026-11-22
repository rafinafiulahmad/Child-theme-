import type { BookFormat } from '../utils/themeHelpers';

export interface HeroSlide {
  id: number;
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  subtitle: string;
  primaryText: string;
  primaryRoute: 'bookstore';
  secondaryText: string;
  secondaryRoute: 'course';
  image: string;
  imageAlt: string;
}

export interface ArticlePost {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  quote: string;
  readTimeOverride?: string;
}

export interface BookProduct {
  id: string;
  title: string;
  author: string;
  format: BookFormat;
  price: number;
  priceFormatted: string;
  isbn: string;
  pages: number;
  year: string;
  cover: string;
  summary: string;
}

export interface ReaderChapter {
  id: string;
  title: string;
  paragraphs: string[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    eyebrow: 'AI GOVERNANCE ACADEMY',
    titlePrefix: 'Building an Inclusive and Trustworthy',
    titleAccent: 'AI Future',
    subtitle:
      'Research, education and policy solutions for responsible AI governance in Bangladesh and beyond.',
    primaryText: 'Explore Our Books',
    primaryRoute: 'bookstore',
    secondaryText: 'Join Our Learning Programs',
    secondaryRoute: 'course',
    image: '/src/assets/images/hero_campus_1795390929154.jpg',
    imageAlt: 'AI Governance Academy campus building surrounded by greenery at golden hour',
  },
  {
    id: 2,
    eyebrow: 'POLICY & RESEARCH FELLOWSHIPS',
    titlePrefix: 'Advancing Evidence-Based Frameworks for',
    titleAccent: 'Public Trust',
    subtitle:
      'Interdisciplinary monographs, legislative toolkits, and comparative AI regulation studies for South Asia.',
    primaryText: 'Explore Our Books',
    primaryRoute: 'bookstore',
    secondaryText: 'Join Our Learning Programs',
    secondaryRoute: 'course',
    image: '/src/assets/images/hero_research_1795390928933.jpg',
    imageAlt: 'Scholars conducting AI policy research in the academy library hall',
  },
  {
    id: 3,
    eyebrow: 'EXECUTIVE & JUDICIAL DIALOGUES',
    titlePrefix: 'Equipping Regulators and Leaders for',
    titleAccent: 'Algorithmic Accountability',
    subtitle:
      'Cohort-based executive courses, policy labs, and global governance roundtables.',
    primaryText: 'Explore Our Books',
    primaryRoute: 'bookstore',
    secondaryText: 'Join Our Learning Programs',
    secondaryRoute: 'course',
    image: '/src/assets/images/hero_summit_1795390929876.jpg',
    imageAlt: 'International policymakers and researchers gathered at a governance roundtable',
  },
];

export const FEATURE_PILLARS = [
  { id: 'publications', line1: 'Premium', line2: 'Publications' },
  { id: 'learning', line1: 'Expert-Led', line2: 'Learning' },
  { id: 'research', line1: 'Evidence-Based', line2: 'Policy Research' },
  { id: 'community', line1: 'Global', line2: 'Community' },
] as const;

export const ARTICLES: ArticlePost[] = [
  {
    id: 'bangladesh-ai-charter',
    title: 'Designing Sovereign AI Governance for Emerging Public Institutions',
    category: 'AI Governance',
    date: 'Nov 18, 2026',
    author: 'Dr. Farhana Rahman',
    excerpt:
      'A comparative blueprint for algorithmic impact assessments, procurement transparency, and bilingual public accountability across South Asia.',
    image: '/src/assets/images/insight_featured_1795390929182.jpg',
    imageAlt: 'Policy researchers reviewing AI governance frameworks at an oak library table',
    readTimeOverride: '8 min read',
    quote:
      'Trustworthy AI governance begins not with abstract principles, but with enforceable procurement rules and transparent public recourse.',
    paragraphs: [
      'As public agencies in Bangladesh and across the Global South adopt automated decision systems in healthcare triage, credit scoring, and municipal service delivery, regulatory architecture must keep pace with institutional realities.',
      'Our multi-year study examines twelve public-sector deployments and demonstrates why ex-ante Algorithmic Impact Assessments (AIAs) reduce downstream administrative disputes when paired with bilingual citizen notice protocols.',
      'Rather than importing compliance templates verbatim from high-income jurisdictions, sovereign governance requires proportionality: tiered oversight calibrated to model risk, local data residency safeguards, and independent audit capacity inside statutory commissions.',
      'Crucially, interdisciplinary literacy bridges legal doctrine and engineering practice. When civil servants, judges, and developers share a common vocabulary of risk thresholds and explainability duties, accountability becomes operational rather than aspirational.',
    ],
  },
  {
    id: 'judicial-oversight-automation',
    title: 'Judicial Review in an Era of Automated Administrative Discretion',
    category: 'Legal Policy',
    date: 'Nov 10, 2026',
    author: 'Barrister Tariqul Islam',
    excerpt:
      'Examining evidentiary standards when statistical risk scores inform administrative rulings.',
    image: '/src/assets/images/hero_research_1795390928933.jpg',
    imageAlt: 'Legal and policy scholars reviewing bound volumes in a sunlit research hall',
    quote:
      'Procedural fairness demands that an affected citizen can inspect the decisive factors behind an automated determination.',
    paragraphs: [
      'Courts increasingly confront challenges where municipal or financial eligibility decisions rely on proprietary scoring models.',
      'Establishing clear disclosure duties for public vendors preserves constitutional due process without stalling technical modernization.',
    ],
  },
  {
    id: 'bengali-llm-benchmarks',
    title: 'Evaluating Civic Safety in Bangla Large Language Models',
    category: 'Technical Standards',
    date: 'Nov 02, 2026',
    author: 'Prof. Nusrat Jahan',
    excerpt:
      'Benchmarks for dialect robustness, factual grounding, and public-service accuracy in Bengali AI.',
    image: '/src/assets/images/hero_summit_1795390929876.jpg',
    imageAlt: 'Policy summit roundtable reviewing technical standards',
    quote:
      'Linguistic inclusion is a safety requirement: under-evaluated low-resource languages carry disproportionate hallucination risk.',
    paragraphs: [
      'Digital public infrastructure depends on multilingual reliability across urban and rural dialects.',
      'Open evaluation suites curated by regional scholars establish reproducible quality baselines for public deployments.',
    ],
  },
  {
    id: 'cross-border-data-trusts',
    title: 'Regional Data Trusts for Climate & Agricultural AI Research',
    category: 'Digital Economy',
    date: 'Oct 24, 2026',
    author: 'Dr. Mahmudul Hasan',
    excerpt:
      'Governance structures that enable shared research access while protecting smallholder data rights.',
    image: '/src/assets/images/hero_campus_1795390929154.jpg',
    imageAlt: 'AI Governance Academy campus',
    quote:
      'Shared stewardship unlocks collaborative research without surrendering community sovereignty.',
    paragraphs: [
      'Cooperative data trusts offer a middle path between closed silos and unrestricted extraction.',
      'Clear fiduciary rules align public research universities, agritech startups, and farmer collectives.',
    ],
  },
];

export const BOOKS: BookProduct[] = [
  {
    id: 'handbook-ai-governance-bd',
    title: 'Foundations of AI Governance in Bangladesh & South Asia',
    author: 'Dr. Farhana Rahman & AGA Fellows',
    format: 'digital',
    price: 24,
    priceFormatted: '$24.00',
    isbn: '978-984-9910-01-4',
    pages: 312,
    year: '2026',
    cover: '/src/assets/images/book_cover_governance_1795390929708.jpg',
    summary:
      'Comprehensive digital monograph covering algorithmic accountability, public procurement clauses, data protection, and sector-specific regulatory sandboxes.',
  },
  {
    id: 'constitutional-tech-regulation',
    title: 'Constitutional Rights & Algorithmic Administration (Hardcover)',
    author: 'Barrister Tariqul Islam',
    format: 'physical',
    price: 42,
    priceFormatted: '$42.00',
    isbn: '978-984-9910-02-1',
    pages: 384,
    year: '2026',
    cover: '/src/assets/images/book_cover_governance_1795390929708.jpg',
    summary:
      'Clothbound printed edition examining administrative law, automated decision-making, and judicial remedies across Commonwealth jurisdictions.',
  },
  {
    id: 'policy-lab-workbook',
    title: 'Algorithmic Impact Assessment: Practitioner Field Manual',
    author: 'AI Governance Academy Research Desk',
    format: 'digital',
    price: 18,
    priceFormatted: '$18.00',
    isbn: '978-984-9910-03-8',
    pages: 196,
    year: '2026',
    cover: '/src/assets/images/book_cover_governance_1795390929708.jpg',
    summary:
      'Interactive digital field manual with model audit checklists, stakeholder consultation templates, and risk-tier rubrics.',
  },
];

export const READER_CHAPTERS: ReaderChapter[] = [
  {
    id: 'ch-1',
    title: 'Chapter 1: Institutional Foundations of AI Policy',
    paragraphs: [
      'Governance architectures succeed when legal mandates, technical verification, and institutional incentives reinforce one another. Across South Asia, rapid digitization of public registries and welfare distribution has outpaced traditional administrative oversight.',
      'This opening chapter maps the core regulatory bottlenecks facing ministries, central banks, and municipal bodies—identifying where statutory authority already exists and where targeted rulemaking is essential.',
      'By distinguishing high-stakes biometric and credit determinations from routine back-office automation, policymakers can focus scarce audit capacity where human rights and economic livelihoods face greatest exposure.',
    ],
  },
  {
    id: 'ch-2',
    title: 'Chapter 2: Procurement Clauses & Vendor Transparency',
    paragraphs: [
      'Public procurement is often the most pragmatic lever for responsible AI adoption. Long before omnibus legislation passes, model contract schedules can require error-rate reporting, demographic disaggregation, and human-in-the-loop escalation paths.',
      'We present three standardized procurement clauses tested with municipal IT teams, balancing legitimate trade-secret protection with mandatory public auditability.',
    ],
  },
  {
    id: 'ch-3',
    title: 'Chapter 3: Bilingual Notice & Redress Mechanisms',
    paragraphs: [
      'Accountability fails if citizens cannot understand why an automated system flagged or denied a public benefit. Providing clear explanations in both Bangla and English, accompanied by accessible human review timelines, transforms abstract transparency into practical justice.',
    ],
  },
];
