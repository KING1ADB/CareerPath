import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { Career, CareerAcademicStrength, CareerInterest, CareerSkill } from '@/types';
import { SEED_ACADEMIC_STRENGTHS, SEED_INTERESTS, SEED_SKILLS } from './taxonomyService';

const sb = supabase as any;

// Helper to look up by name
const getSkill = (name: string) => SEED_SKILLS.find((s) => s.name === name)!;
const getInterest = (name: string) => SEED_INTERESTS.find((i) => i.name === name)!;
const getAcademic = (name: string) => SEED_ACADEMIC_STRENGTHS.find((a) => a.name === name)!;

export const SEED_CAREERS: Career[] = [
  // 1. Software Engineer
  {
    id: 'car-01',
    title: 'Software Engineer',
    slug: 'software-engineer',
    summary: 'Designs, tests, and builds robust software applications and systems.',
    description: 'Software Engineers apply computer science and engineering principles to architect scalable frontend, backend, or full-stack software solutions. They collaborate in agile teams to ship reliable software that solves real user and enterprise problems.',
    industry: 'Technology',
    education_level: 'Bachelor of Science in Computer Science or related STEM field',
    typical_tasks: [
      'Architect and write clean, maintainable, modular code',
      'Conduct peer code reviews and unit/integration testing',
      'Collaborate with product managers and UI designers',
      'Debug, profile, and optimize application performance',
    ],
    salary_range_illustrative: 'Illustrative Entry: $75,000 - $95,000 | Mid-Senior: $115,000 - $160,000 (Indicative range)',
    job_outlook: 'Much faster than average (+25% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-01-1', career_id: 'car-01', skill_id: 'sk-02', importance_weight: 1.0, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('JavaScript / TypeScript') },
      { id: 'cs-01-2', career_id: 'car-01', skill_id: 'sk-01', importance_weight: 0.9, required_proficiency: 3, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Python Programming') },
      { id: 'cs-01-3', career_id: 'car-01', skill_id: 'sk-03', importance_weight: 0.85, required_proficiency: 3, is_required: true, created_at: new Date().toISOString(), skill: getSkill('SQL & Relational Databases') },
      { id: 'cs-01-4', career_id: 'car-01', skill_id: 'sk-04', importance_weight: 0.8, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Cloud Computing (AWS/GCP/Azure)') },
      { id: 'cs-01-5', career_id: 'car-01', skill_id: 'sk-20', importance_weight: 0.7, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Cross-Functional Communication') },
    ],
    career_interests: [
      { id: 'ci-01-1', career_id: 'car-01', interest_id: 'int-01', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Software Architecture & Coding') },
      { id: 'ci-01-2', career_id: 'car-01', interest_id: 'int-03', weight: 0.75, created_at: new Date().toISOString(), interest: getInterest('Cyber Defense & Forensics') },
    ],
    career_academic_strengths: [
      { id: 'ca-01-1', career_id: 'car-01', academic_strength_id: 'acad-02', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Computer Science Principles') },
      { id: 'ca-01-2', career_id: 'car-01', academic_strength_id: 'acad-01', weight: 0.8, created_at: new Date().toISOString(), academic_strength: getAcademic('Advanced Mathematics & Calculus') },
    ],
  },

  // 2. Data Scientist
  {
    id: 'car-02',
    title: 'Data Scientist',
    slug: 'data-scientist',
    summary: 'Transforms complex data into predictive models and actionable business insights.',
    description: 'Data Scientists combine statistical rigor, machine learning, and domain knowledge to extract signal from noisy enterprise data. They build predictive algorithms, design experiments, and deliver data-driven intelligence to decision makers.',
    industry: 'Technology',
    education_level: 'Bachelor or Master of Science in Data Science, Statistics, or Computer Science',
    typical_tasks: [
      'Clean, curate, and explore large heterogeneous datasets',
      'Train, validate, and tune machine learning models',
      'Design A/B tests and calculate statistical significance',
      'Create interactive dashboards and present findings to leadership',
    ],
    salary_range_illustrative: 'Illustrative Entry: $80,000 - $100,000 | Mid-Senior: $120,000 - $165,000 (Indicative range)',
    job_outlook: 'Much faster than average (+35% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-02-1', career_id: 'car-02', skill_id: 'sk-01', importance_weight: 1.0, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Python Programming') },
      { id: 'cs-02-2', career_id: 'car-02', skill_id: 'sk-07', importance_weight: 1.0, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Machine Learning & Statistics') },
      { id: 'cs-02-3', career_id: 'car-02', skill_id: 'sk-03', importance_weight: 0.9, required_proficiency: 3, is_required: true, created_at: new Date().toISOString(), skill: getSkill('SQL & Relational Databases') },
      { id: 'cs-02-4', career_id: 'car-02', skill_id: 'sk-12', importance_weight: 0.85, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Statistical Hypothesis Testing') },
      { id: 'cs-02-5', career_id: 'car-02', skill_id: 'sk-06', importance_weight: 0.8, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Data Visualization (Tableau/PowerBI)') },
    ],
    career_interests: [
      { id: 'ci-02-1', career_id: 'car-02', interest_id: 'int-02', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Data Science & Statistical Inquiry') },
      { id: 'ci-02-2', career_id: 'car-02', interest_id: 'int-01', weight: 0.8, created_at: new Date().toISOString(), interest: getInterest('Software Architecture & Coding') },
    ],
    career_academic_strengths: [
      { id: 'ca-02-1', career_id: 'car-02', academic_strength_id: 'acad-08', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Statistics & Probability') },
      { id: 'ca-02-2', career_id: 'car-02', academic_strength_id: 'acad-01', weight: 0.9, created_at: new Date().toISOString(), academic_strength: getAcademic('Advanced Mathematics & Calculus') },
      { id: 'ca-02-3', career_id: 'car-02', academic_strength_id: 'acad-02', weight: 0.85, created_at: new Date().toISOString(), academic_strength: getAcademic('Computer Science Principles') },
    ],
  },

  // 3. Cybersecurity Analyst
  {
    id: 'car-03',
    title: 'Cybersecurity Analyst',
    slug: 'cybersecurity-analyst',
    summary: 'Safeguards enterprise infrastructure, networks, and confidential data from breaches.',
    description: 'Cybersecurity Analysts monitor digital environments, investigate anomalous security alerts, evaluate threat vectors, and implement defensive security controls to protect critical digital assets.',
    industry: 'Technology',
    education_level: 'Bachelor in Cybersecurity, Computer Science, or Information Technology',
    typical_tasks: [
      'Monitor SIEM dashboards for security incidents and anomalous traffic',
      'Conduct vulnerability scanning and security audits',
      'Formulate and rehearse incident response playbooks',
      'Implement multi-factor authentication and endpoint protection policies',
    ],
    salary_range_illustrative: 'Illustrative Entry: $70,000 - $90,000 | Mid-Senior: $105,000 - $145,000 (Indicative range)',
    job_outlook: 'Much faster than average (+32% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-03-1', career_id: 'car-03', skill_id: 'sk-05', importance_weight: 1.0, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Network Security & Protocols') },
      { id: 'cs-03-2', career_id: 'car-03', skill_id: 'sk-13', importance_weight: 0.85, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Root Cause Problem Solving') },
      { id: 'cs-03-3', career_id: 'car-03', skill_id: 'sk-04', importance_weight: 0.8, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Cloud Computing (AWS/GCP/Azure)') },
      { id: 'cs-03-4', career_id: 'car-03', skill_id: 'sk-01', importance_weight: 0.75, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Python Programming') },
    ],
    career_interests: [
      { id: 'ci-03-1', career_id: 'car-03', interest_id: 'int-03', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Cyber Defense & Forensics') },
      { id: 'ci-03-2', career_id: 'car-03', interest_id: 'int-01', weight: 0.8, created_at: new Date().toISOString(), interest: getInterest('Software Architecture & Coding') },
    ],
    career_academic_strengths: [
      { id: 'ca-03-1', career_id: 'car-03', academic_strength_id: 'acad-02', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Computer Science Principles') },
      { id: 'ca-03-2', career_id: 'car-03', academic_strength_id: 'acad-08', weight: 0.75, created_at: new Date().toISOString(), academic_strength: getAcademic('Statistics & Probability') },
    ],
  },

  // 4. Cloud Solutions Architect
  {
    id: 'car-04',
    title: 'Cloud Solutions Architect',
    slug: 'cloud-solutions-architect',
    summary: 'Designs resilient, cost-effective, and scalable cloud computing ecosystems.',
    description: 'Cloud Solutions Architects bridge technical engineering and strategic business needs by translating infrastructure requirements into high-availability cloud deployments across providers such as AWS, Azure, and Google Cloud.',
    industry: 'Technology',
    education_level: 'Bachelor in Computer Science, Systems Engineering, or equivalent experience',
    typical_tasks: [
      'Design cloud-native microservice architectures and disaster recovery plans',
      'Evaluate compute, storage, and networking trade-offs',
      'Establish cloud security, compliance, and cost-governance guardrails',
      'Mentor engineering teams on cloud deployment best practices',
    ],
    salary_range_illustrative: 'Illustrative Entry: $90,000 - $115,000 | Mid-Senior: $135,000 - $185,000 (Indicative range)',
    job_outlook: 'Faster than average (+20% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-04-1', career_id: 'car-04', skill_id: 'sk-04', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Cloud Computing (AWS/GCP/Azure)') },
      { id: 'cs-04-2', career_id: 'car-04', skill_id: 'sk-05', importance_weight: 0.9, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Network Security & Protocols') },
      { id: 'cs-04-3', career_id: 'car-04', skill_id: 'sk-03', importance_weight: 0.85, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('SQL & Relational Databases') },
      { id: 'cs-04-4', career_id: 'car-04', skill_id: 'sk-20', importance_weight: 0.85, required_proficiency: 4, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Cross-Functional Communication') },
    ],
    career_interests: [
      { id: 'ci-04-1', career_id: 'car-04', interest_id: 'int-01', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Software Architecture & Coding') },
      { id: 'ci-04-2', career_id: 'car-04', interest_id: 'int-06', weight: 0.85, created_at: new Date().toISOString(), interest: getInterest('Entrepreneurship & Product Innovation') },
    ],
    career_academic_strengths: [
      { id: 'ca-04-1', career_id: 'car-04', academic_strength_id: 'acad-02', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Computer Science Principles') },
      { id: 'ca-04-2', career_id: 'car-04', academic_strength_id: 'acad-01', weight: 0.75, created_at: new Date().toISOString(), academic_strength: getAcademic('Advanced Mathematics & Calculus') },
    ],
  },

  // 5. UI/UX Designer
  {
    id: 'car-05',
    title: 'UI/UX Designer',
    slug: 'ui-ux-designer',
    summary: 'Crafts intuitive, visually engaging, and user-centered digital interfaces and experiences.',
    description: 'UI/UX Designers conduct behavioral user research, create information architectures, design wireframes and high-fidelity prototypes, and validate usability to create delightful digital products.',
    industry: 'Creative & Design',
    education_level: 'Bachelor in Human-Computer Interaction, Graphic Design, or Digital Media',
    typical_tasks: [
      'Conduct qualitative user interviews and usability testing sessions',
      'Build wireframes, flow diagrams, and interactive Figma prototypes',
      'Establish and maintain scalable design systems and typography scales',
      'Partner with frontend engineers to ensure design implementation fidelity',
    ],
    salary_range_illustrative: 'Illustrative Entry: $65,000 - $85,000 | Mid-Senior: $100,000 - $140,000 (Indicative range)',
    job_outlook: 'Faster than average (+16% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-05-1', career_id: 'car-05', skill_id: 'sk-09', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('UI/UX Prototyping (Figma)') },
      { id: 'cs-05-2', career_id: 'car-05', skill_id: 'sk-20', importance_weight: 0.9, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Cross-Functional Communication') },
      { id: 'cs-05-3', career_id: 'car-05', skill_id: 'sk-13', importance_weight: 0.75, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Root Cause Problem Solving') },
      { id: 'cs-05-4', career_id: 'car-05', skill_id: 'sk-02', importance_weight: 0.6, required_proficiency: 2, is_required: false, created_at: new Date().toISOString(), skill: getSkill('JavaScript / TypeScript') },
    ],
    career_interests: [
      { id: 'ci-05-1', career_id: 'car-05', interest_id: 'int-04', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Creative Visual Design & Ergonomics') },
      { id: 'ci-05-2', career_id: 'car-05', interest_id: 'int-06', weight: 0.8, created_at: new Date().toISOString(), interest: getInterest('Entrepreneurship & Product Innovation') },
    ],
    career_academic_strengths: [
      { id: 'ca-05-1', career_id: 'car-05', academic_strength_id: 'acad-07', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Design Theory & Human-Computer Interaction') },
      { id: 'ca-05-2', career_id: 'car-05', academic_strength_id: 'acad-09', weight: 0.75, created_at: new Date().toISOString(), academic_strength: getAcademic('Written Rhetoric & Technical Composition') },
    ],
  },

  // 6. Financial Analyst
  {
    id: 'car-06',
    title: 'Financial Analyst',
    slug: 'financial-analyst',
    summary: 'Guides corporate and investment capital allocation through rigorous financial modeling.',
    description: 'Financial Analysts examine financial statements, evaluate macroeconomic indicators, forecast revenue and expenses, and construct valuation models that steer major corporate decisions.',
    industry: 'Finance',
    education_level: 'Bachelor of Science in Finance, Economics, or Accounting',
    typical_tasks: [
      'Build three-statement financial models and scenario forecasts',
      'Track quarterly performance against budgets and variance analysis',
      'Perform industry benchmarking and valuation analysis (DCF, Multiples)',
      'Prepare executive investment memos and board presentation decks',
    ],
    salary_range_illustrative: 'Illustrative Entry: $68,000 - $88,000 | Mid-Senior: $100,000 - $140,000 (Indicative range)',
    job_outlook: 'Average (+9% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-06-1', career_id: 'car-06', skill_id: 'sk-11', importance_weight: 1.0, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Quantitative Financial Modeling') },
      { id: 'cs-06-2', career_id: 'car-06', skill_id: 'sk-19', importance_weight: 0.9, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Financial Accounting & Reporting') },
      { id: 'cs-06-3', career_id: 'car-06', skill_id: 'sk-06', importance_weight: 0.8, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Data Visualization (Tableau/PowerBI)') },
      { id: 'cs-06-4', career_id: 'car-06', skill_id: 'sk-03', importance_weight: 0.75, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('SQL & Relational Databases') },
    ],
    career_interests: [
      { id: 'ci-06-1', career_id: 'car-06', interest_id: 'int-05', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Financial Markets & Investment') },
      { id: 'ci-06-2', career_id: 'car-06', interest_id: 'int-02', weight: 0.75, created_at: new Date().toISOString(), interest: getInterest('Data Science & Statistical Inquiry') },
    ],
    career_academic_strengths: [
      { id: 'ca-06-1', career_id: 'car-06', academic_strength_id: 'acad-05', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Corporate Finance & Economics') },
      { id: 'ca-06-2', career_id: 'car-06', academic_strength_id: 'acad-08', weight: 0.85, created_at: new Date().toISOString(), academic_strength: getAcademic('Statistics & Probability') },
    ],
  },

  // 7. Investment Banking Analyst
  {
    id: 'car-07',
    title: 'Investment Banking Analyst',
    slug: 'investment-banking-analyst',
    summary: 'Executes mergers, acquisitions, debt issuance, and public equity offerings.',
    description: 'Investment Banking Analysts assist corporations and institutions in raising capital and structuring corporate transactions through in-depth financial analysis, due diligence, and pitching.',
    industry: 'Finance',
    education_level: 'Bachelor in Finance, Economics, Mathematics, or Business Administration',
    typical_tasks: [
      'Construct complex LBO, DCF, and merger accretion/dilution models',
      'Draft confidential information memorandums (CIM) and pitchbooks',
      'Coordinate transaction due diligence across legal, tax, and accounting teams',
      'Analyze market trends and comparable company trading multiples',
    ],
    salary_range_illustrative: 'Illustrative Entry: $100,000 - $125,000 + Bonus | Senior: $160,000 - $250,000+ (Indicative range)',
    job_outlook: 'Average (+8% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-07-1', career_id: 'car-07', skill_id: 'sk-11', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Quantitative Financial Modeling') },
      { id: 'cs-07-2', career_id: 'car-07', skill_id: 'sk-19', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Financial Accounting & Reporting') },
      { id: 'cs-07-3', career_id: 'car-07', skill_id: 'sk-20', importance_weight: 0.85, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Cross-Functional Communication') },
      { id: 'cs-07-4', career_id: 'car-07', skill_id: 'sk-18', importance_weight: 0.8, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Contract Negotiation & Governance') },
    ],
    career_interests: [
      { id: 'ci-07-1', career_id: 'car-07', interest_id: 'int-05', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Financial Markets & Investment') },
      { id: 'ci-07-2', career_id: 'car-07', interest_id: 'int-06', weight: 0.85, created_at: new Date().toISOString(), interest: getInterest('Entrepreneurship & Product Innovation') },
    ],
    career_academic_strengths: [
      { id: 'ca-07-1', career_id: 'car-07', academic_strength_id: 'acad-05', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Corporate Finance & Economics') },
      { id: 'ca-07-2', career_id: 'car-07', academic_strength_id: 'acad-01', weight: 0.85, created_at: new Date().toISOString(), academic_strength: getAcademic('Advanced Mathematics & Calculus') },
    ],
  },

  // 8. Management Consultant
  {
    id: 'car-08',
    title: 'Management Consultant',
    slug: 'management-consultant',
    summary: 'Solves high-stakes strategic, operational, and organizational dilemmas for corporations.',
    description: 'Management Consultants partner with executive leaders across industries to diagnose operational inefficiencies, identify market expansion opportunities, and execute transformation initiatives.',
    industry: 'Business',
    education_level: 'Bachelor or Master of Business Administration (MBA)',
    typical_tasks: [
      'Synthesize ambiguous organizational problems into structured workstreams',
      'Conduct stakeholder interviews, operational audits, and market surveys',
      'Perform quantitative cost-benefit analysis and operating model redesign',
      'Deliver high-impact recommendations to C-suite executive boards',
    ],
    salary_range_illustrative: 'Illustrative Entry: $85,000 - $110,000 | Senior: $140,000 - $210,000 (Indicative range)',
    job_outlook: 'Faster than average (+11% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-08-1', career_id: 'car-08', skill_id: 'sk-20', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Cross-Functional Communication') },
      { id: 'cs-08-2', career_id: 'car-08', skill_id: 'sk-17', importance_weight: 1.0, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Strategic Market Analysis') },
      { id: 'cs-08-3', career_id: 'car-08', skill_id: 'sk-13', importance_weight: 0.95, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Root Cause Problem Solving') },
      { id: 'cs-08-4', career_id: 'car-08', skill_id: 'sk-16', importance_weight: 0.8, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Agile & Scrum Project Management') },
    ],
    career_interests: [
      { id: 'ci-08-1', career_id: 'car-08', interest_id: 'int-06', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Entrepreneurship & Product Innovation') },
      { id: 'ci-08-2', career_id: 'car-08', interest_id: 'int-05', weight: 0.85, created_at: new Date().toISOString(), interest: getInterest('Financial Markets & Investment') },
    ],
    career_academic_strengths: [
      { id: 'ca-08-1', career_id: 'car-08', academic_strength_id: 'acad-05', weight: 0.95, created_at: new Date().toISOString(), academic_strength: getAcademic('Corporate Finance & Economics') },
      { id: 'ca-08-2', career_id: 'car-08', academic_strength_id: 'acad-09', weight: 0.9, created_at: new Date().toISOString(), academic_strength: getAcademic('Written Rhetoric & Technical Composition') },
    ],
  },

  // 9. Product Manager
  {
    id: 'car-09',
    title: 'Product Manager',
    slug: 'product-manager',
    summary: 'Guides product roadmap from inception to launch at the intersection of business, tech, and UX.',
    description: 'Product Managers define the "why", "what", and "when" of software features. They align engineering, design, and executive stakeholders around high-value customer problems and business goals.',
    industry: 'Business & Technology',
    education_level: 'Bachelor in Business, Computer Science, Engineering, or relevant experience',
    typical_tasks: [
      'Define product vision, strategic roadmap, and quarterly OKRs',
      'Write detailed user stories, PRDs, and acceptance criteria',
      'Prioritize feature backlogs using customer data and impact vs. effort matrices',
      'Analyze telemetry metrics (retention, conversion, churn) post-launch',
    ],
    salary_range_illustrative: 'Illustrative Entry: $75,000 - $98,000 | Mid-Senior: $120,000 - $170,000 (Indicative range)',
    job_outlook: 'Faster than average (+18% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-09-1', career_id: 'car-09', skill_id: 'sk-20', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Cross-Functional Communication') },
      { id: 'cs-09-2', career_id: 'car-09', skill_id: 'sk-16', importance_weight: 0.95, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Agile & Scrum Project Management') },
      { id: 'cs-09-3', career_id: 'car-09', skill_id: 'sk-17', importance_weight: 0.9, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Strategic Market Analysis') },
      { id: 'cs-09-4', career_id: 'car-09', skill_id: 'sk-09', importance_weight: 0.75, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('UI/UX Prototyping (Figma)') },
    ],
    career_interests: [
      { id: 'ci-09-1', career_id: 'car-09', interest_id: 'int-06', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Entrepreneurship & Product Innovation') },
      { id: 'ci-09-2', career_id: 'car-09', interest_id: 'int-01', weight: 0.8, created_at: new Date().toISOString(), interest: getInterest('Software Architecture & Coding') },
    ],
    career_academic_strengths: [
      { id: 'ca-09-1', career_id: 'car-09', academic_strength_id: 'acad-02', weight: 0.85, created_at: new Date().toISOString(), academic_strength: getAcademic('Computer Science Principles') },
      { id: 'ca-09-2', career_id: 'car-09', academic_strength_id: 'acad-07', weight: 0.85, created_at: new Date().toISOString(), academic_strength: getAcademic('Design Theory & Human-Computer Interaction') },
      { id: 'ca-09-3', career_id: 'car-09', academic_strength_id: 'acad-05', weight: 0.8, created_at: new Date().toISOString(), academic_strength: getAcademic('Corporate Finance & Economics') },
    ],
  },

  // 10. Digital Marketing Strategist
  {
    id: 'car-10',
    title: 'Digital Marketing Strategist',
    slug: 'digital-marketing-strategist',
    summary: 'Drives customer acquisition and brand equity through multi-channel data campaigns.',
    description: 'Digital Marketing Strategists architect omni-channel campaigns encompassing SEO, SEM, content marketing, and paid social, optimizing customer acquisition costs (CAC) and lifetime value (LTV).',
    industry: 'Marketing & Business',
    education_level: 'Bachelor in Marketing, Communications, or Business',
    typical_tasks: [
      'Design omni-channel growth campaigns across Google Ads and social channels',
      'Perform search engine optimization audits and organic keyword research',
      'Optimize landing page conversion funnels using multivariate A/B testing',
      'Build marketing attribution dashboards measuring ROI across channels',
    ],
    salary_range_illustrative: 'Illustrative Entry: $55,000 - $72,000 | Mid-Senior: $85,000 - $125,000 (Indicative range)',
    job_outlook: 'Faster than average (+10% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-10-1', career_id: 'car-10', skill_id: 'sk-17', importance_weight: 1.0, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Strategic Market Analysis') },
      { id: 'cs-10-2', career_id: 'car-10', skill_id: 'sk-20', importance_weight: 0.9, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Cross-Functional Communication') },
      { id: 'cs-10-3', career_id: 'car-10', skill_id: 'sk-06', importance_weight: 0.8, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Data Visualization (Tableau/PowerBI)') },
      { id: 'cs-10-4', career_id: 'car-10', skill_id: 'sk-09', importance_weight: 0.7, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('UI/UX Prototyping (Figma)') },
    ],
    career_interests: [
      { id: 'ci-10-1', career_id: 'car-10', interest_id: 'int-06', weight: 0.95, created_at: new Date().toISOString(), interest: getInterest('Entrepreneurship & Product Innovation') },
      { id: 'ci-10-2', career_id: 'car-10', interest_id: 'int-04', weight: 0.9, created_at: new Date().toISOString(), interest: getInterest('Creative Visual Design & Ergonomics') },
    ],
    career_academic_strengths: [
      { id: 'ca-10-1', career_id: 'car-10', academic_strength_id: 'acad-09', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Written Rhetoric & Technical Composition') },
      { id: 'ca-10-2', career_id: 'car-10', academic_strength_id: 'acad-08', weight: 0.8, created_at: new Date().toISOString(), academic_strength: getAcademic('Statistics & Probability') },
    ],
  },

  // 11. Mechanical Engineer
  {
    id: 'car-11',
    title: 'Mechanical Engineer',
    slug: 'mechanical-engineer',
    summary: 'Designs, manufactures, and tests physical mechanical and thermal systems.',
    description: 'Mechanical Engineers research and develop tools, engines, robots, and machinery. They analyze thermodynamic cycles, stress distributions, and fluid dynamics to build durable hardware.',
    industry: 'Engineering',
    education_level: 'Bachelor of Science in Mechanical Engineering',
    typical_tasks: [
      'Design complex parametric 3D parts and assemblies in CAD',
      'Perform finite element stress analysis (FEA) and computational fluid dynamics (CFD)',
      'Prototype functional mechanisms on CNC mills and rapid additive printers',
      'Conduct structural lifecycle and environmental fatigue testing',
    ],
    salary_range_illustrative: 'Illustrative Entry: $68,000 - $86,000 | Mid-Senior: $98,000 - $140,000 (Indicative range)',
    job_outlook: 'Average (+7% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-11-1', career_id: 'car-11', skill_id: 'sk-08', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('CAD & Simulation (SolidWorks/AutoCAD)') },
      { id: 'cs-11-2', career_id: 'car-11', skill_id: 'sk-13', importance_weight: 0.9, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Root Cause Problem Solving') },
      { id: 'cs-11-3', career_id: 'car-11', skill_id: 'sk-12', importance_weight: 0.75, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Statistical Hypothesis Testing') },
    ],
    career_interests: [
      { id: 'ci-11-1', career_id: 'car-11', interest_id: 'int-08', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Mechanical Systems & Hardware') },
      { id: 'ci-11-2', career_id: 'car-11', interest_id: 'int-09', weight: 0.7, created_at: new Date().toISOString(), interest: getInterest('Environmental & Structural Planning') },
    ],
    career_academic_strengths: [
      { id: 'ca-11-1', career_id: 'car-11', academic_strength_id: 'acad-03', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Physics & Mechanics') },
      { id: 'ca-11-2', career_id: 'car-11', academic_strength_id: 'acad-01', weight: 0.9, created_at: new Date().toISOString(), academic_strength: getAcademic('Advanced Mathematics & Calculus') },
    ],
  },

  // 12. Civil & Environmental Engineer
  {
    id: 'car-12',
    title: 'Civil & Environmental Engineer',
    slug: 'civil-environmental-engineer',
    summary: 'Plans and constructs vital sustainable physical infrastructure and environmental defenses.',
    description: 'Civil and Environmental Engineers design bridges, water purification systems, transport grids, and resilient urban structures while safeguarding natural ecosystems from degradation.',
    industry: 'Engineering & Environment',
    education_level: 'Bachelor of Science in Civil, Environmental, or Structural Engineering',
    typical_tasks: [
      'Conduct geotechnical soil surveys and site structural feasibility studies',
      'Calculate load tolerances, seismic factors, and hydraulic drainage models',
      'Prepare technical blueprints and environmental impact assessment reports',
      'Supervise on-site construction progress ensuring safety regulation compliance',
    ],
    salary_range_illustrative: 'Illustrative Entry: $65,000 - $82,000 | Mid-Senior: $95,000 - $135,000 (Indicative range)',
    job_outlook: 'Average (+7% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-12-1', career_id: 'car-12', skill_id: 'sk-08', importance_weight: 0.95, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('CAD & Simulation (SolidWorks/AutoCAD)') },
      { id: 'cs-12-2', career_id: 'car-12', skill_id: 'sk-13', importance_weight: 0.9, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Root Cause Problem Solving') },
      { id: 'cs-12-3', career_id: 'car-12', skill_id: 'sk-15', importance_weight: 0.75, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Supply Chain Optimization') },
    ],
    career_interests: [
      { id: 'ci-12-1', career_id: 'car-12', interest_id: 'int-09', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Environmental & Structural Planning') },
      { id: 'ci-12-2', career_id: 'car-12', interest_id: 'int-08', weight: 0.8, created_at: new Date().toISOString(), interest: getInterest('Mechanical Systems & Hardware') },
    ],
    career_academic_strengths: [
      { id: 'ca-12-1', career_id: 'car-12', academic_strength_id: 'acad-03', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Physics & Mechanics') },
      { id: 'ca-12-2', career_id: 'car-12', academic_strength_id: 'acad-01', weight: 0.9, created_at: new Date().toISOString(), academic_strength: getAcademic('Advanced Mathematics & Calculus') },
    ],
  },

  // 13. Biomedical Engineer
  {
    id: 'car-13',
    title: 'Biomedical Engineer',
    slug: 'biomedical-engineer',
    summary: 'Bridges engineering and biological science to create medical devices and prosthetics.',
    description: 'Biomedical Engineers apply engineering principles to medicine and biology. They innovate artificial organs, robotic surgical instruments, biosensors, and therapeutic technologies.',
    industry: 'Engineering & Healthcare',
    education_level: 'Bachelor of Science in Biomedical Engineering or Bioengineering',
    typical_tasks: [
      'Design biocompatible medical implants, prosthetics, and robotic tools',
      'Test instrumentation for medical efficacy, electrical safety, and biocompatibility',
      'Perform data analysis on physiological telemetry and neural signals',
      'Author technical regulatory dossiers for FDA 510(k) medical device clearance',
    ],
    salary_range_illustrative: 'Illustrative Entry: $68,000 - $88,000 | Mid-Senior: $98,000 - $145,000 (Indicative range)',
    job_outlook: 'Faster than average (+10% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-13-1', career_id: 'car-13', skill_id: 'sk-08', importance_weight: 0.95, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('CAD & Simulation (SolidWorks/AutoCAD)') },
      { id: 'cs-13-2', career_id: 'car-13', skill_id: 'sk-07', importance_weight: 0.85, required_proficiency: 3, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Machine Learning & Statistics') },
      { id: 'cs-13-3', career_id: 'car-13', skill_id: 'sk-13', importance_weight: 0.85, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Root Cause Problem Solving') },
    ],
    career_interests: [
      { id: 'ci-13-1', career_id: 'car-13', interest_id: 'int-07', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Healthcare Delivery & Patient Well-being') },
      { id: 'ci-13-2', career_id: 'car-13', interest_id: 'int-08', weight: 0.85, created_at: new Date().toISOString(), interest: getInterest('Mechanical Systems & Hardware') },
    ],
    career_academic_strengths: [
      { id: 'ca-13-1', career_id: 'car-13', academic_strength_id: 'acad-04', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Biological Sciences & Anatomy') },
      { id: 'ca-13-2', career_id: 'car-13', academic_strength_id: 'acad-03', weight: 0.9, created_at: new Date().toISOString(), academic_strength: getAcademic('Physics & Mechanics') },
    ],
  },

  // 14. Registered Clinical Nurse
  {
    id: 'car-14',
    title: 'Registered Clinical Nurse',
    slug: 'registered-clinical-nurse',
    summary: 'Delivers compassionate bedside healthcare, administers therapeutics, and advocates for patients.',
    description: 'Registered Nurses assess patient health conditions, coordinate clinical treatment plans with physicians, administer medications, and provide emotional support and education to patients and families.',
    industry: 'Healthcare',
    education_level: 'Bachelor of Science in Nursing (BSN) + NCLEX-RN Licensure',
    typical_tasks: [
      'Perform detailed clinical examinations and monitor patient vitals',
      'Administer intravenous medications and complex therapeutic regimens',
      'Maintain precise clinical charting within hospital EHR databases',
      'Educate patients and family caregivers on post-discharge management plans',
    ],
    salary_range_illustrative: 'Illustrative Entry: $60,000 - $78,000 | Mid-Senior: $85,000 - $115,000 (Indicative range)',
    job_outlook: 'Much faster than average (+12% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-14-1', career_id: 'car-14', skill_id: 'sk-21', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Empathy & Patient Care') },
      { id: 'cs-14-2', career_id: 'car-14', skill_id: 'sk-20', importance_weight: 0.95, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Cross-Functional Communication') },
      { id: 'cs-14-3', career_id: 'car-14', skill_id: 'sk-10', importance_weight: 0.8, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('EHR & Health Informatics Systems') },
    ],
    career_interests: [
      { id: 'ci-14-1', career_id: 'car-14', interest_id: 'int-07', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Healthcare Delivery & Patient Well-being') },
      { id: 'ci-14-2', career_id: 'car-14', interest_id: 'int-11', weight: 0.75, created_at: new Date().toISOString(), interest: getInterest('Education & Mentorship') },
    ],
    career_academic_strengths: [
      { id: 'ca-14-1', career_id: 'car-14', academic_strength_id: 'acad-04', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Biological Sciences & Anatomy') },
      { id: 'ca-14-2', career_id: 'car-14', academic_strength_id: 'acad-09', weight: 0.75, created_at: new Date().toISOString(), academic_strength: getAcademic('Written Rhetoric & Technical Composition') },
    ],
  },

  // 15. Health Informatics Specialist
  {
    id: 'car-15',
    title: 'Health Informatics Specialist',
    slug: 'health-informatics-specialist',
    summary: 'Optimizes clinical information systems, EHR workflows, and patient data security.',
    description: 'Health Informatics Specialists operate at the confluence of clinical medicine and information technology, ensuring hospital databases and clinical workflows meet high security, usability, and data-integrity standards.',
    industry: 'Healthcare & Technology',
    education_level: 'Bachelor or Master in Health Informatics, Nursing Informatics, or IT',
    typical_tasks: [
      'Audit and configure electronic health record (EHR) databases for hospital workflows',
      'Ensure strict HIPAA and healthcare compliance protocols across data pipelines',
      'Train clinical practitioners and physicians on informatics software systems',
      'Analyze hospital operational data to identify clinical care bottleneck trends',
    ],
    salary_range_illustrative: 'Illustrative Entry: $62,000 - $82,000 | Mid-Senior: $90,000 - $125,000 (Indicative range)',
    job_outlook: 'Much faster than average (+17% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-15-1', career_id: 'car-15', skill_id: 'sk-10', importance_weight: 1.0, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('EHR & Health Informatics Systems') },
      { id: 'cs-15-2', career_id: 'car-15', skill_id: 'sk-03', importance_weight: 0.9, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('SQL & Relational Databases') },
      { id: 'cs-15-3', career_id: 'car-15', skill_id: 'sk-06', importance_weight: 0.8, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Data Visualization (Tableau/PowerBI)') },
      { id: 'cs-15-4', career_id: 'car-15', skill_id: 'sk-05', importance_weight: 0.7, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Network Security & Protocols') },
    ],
    career_interests: [
      { id: 'ci-15-1', career_id: 'car-15', interest_id: 'int-07', weight: 0.95, created_at: new Date().toISOString(), interest: getInterest('Healthcare Delivery & Patient Well-being') },
      { id: 'ci-15-2', career_id: 'car-15', interest_id: 'int-02', weight: 0.9, created_at: new Date().toISOString(), interest: getInterest('Data Science & Statistical Inquiry') },
      { id: 'ci-15-3', career_id: 'car-15', interest_id: 'int-12', weight: 0.75, created_at: new Date().toISOString(), interest: getInterest('Logistics & Operational Order') },
    ],
    career_academic_strengths: [
      { id: 'ca-15-1', career_id: 'car-15', academic_strength_id: 'acad-04', weight: 0.9, created_at: new Date().toISOString(), academic_strength: getAcademic('Biological Sciences & Anatomy') },
      { id: 'ca-15-2', career_id: 'car-15', academic_strength_id: 'acad-02', weight: 0.85, created_at: new Date().toISOString(), academic_strength: getAcademic('Computer Science Principles') },
    ],
  },

  // 16. Corporate Legal Counsel
  {
    id: 'car-16',
    title: 'Corporate Legal Counsel',
    slug: 'corporate-legal-counsel',
    summary: 'Protects enterprise interests through contract negotiation, regulatory compliance, and advisory.',
    description: 'Corporate Counsel provide proactive legal advice to businesses, structuring high-value commercial agreements, mitigating legal liability, and navigating evolving industry regulatory frameworks.',
    industry: 'Law',
    education_level: 'Juris Doctor (JD) + Bar Admission',
    typical_tasks: [
      'Draft, review, and negotiate complex commercial contracts and vendor agreements',
      'Advise executive leadership on regulatory compliance and corporate governance',
      'Manage external litigation counsel and coordinate discovery documentation',
      'Conduct legal risk assessments for new product launches and expansions',
    ],
    salary_range_illustrative: 'Illustrative Entry: $95,000 - $130,000 | Senior: $160,000 - $240,000+ (Indicative range)',
    job_outlook: 'Average (+10% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-16-1', career_id: 'car-16', skill_id: 'sk-14', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Legal Research & Statutory Analysis') },
      { id: 'cs-16-2', career_id: 'car-16', skill_id: 'sk-18', importance_weight: 1.0, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Contract Negotiation & Governance') },
      { id: 'cs-16-3', career_id: 'car-16', skill_id: 'sk-22', importance_weight: 0.95, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Critical Thinking & Debate') },
      { id: 'cs-16-4', career_id: 'car-16', skill_id: 'sk-20', importance_weight: 0.9, required_proficiency: 4, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Cross-Functional Communication') },
    ],
    career_interests: [
      { id: 'ci-16-1', career_id: 'car-16', interest_id: 'int-10', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Legal Advocacy & Ethics') },
      { id: 'ci-16-2', career_id: 'car-16', interest_id: 'int-06', weight: 0.8, created_at: new Date().toISOString(), interest: getInterest('Entrepreneurship & Product Innovation') },
    ],
    career_academic_strengths: [
      { id: 'ca-16-1', career_id: 'car-16', academic_strength_id: 'acad-06', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Legal Studies & Jurisprudence') },
      { id: 'ca-16-2', career_id: 'car-16', academic_strength_id: 'acad-09', weight: 0.95, created_at: new Date().toISOString(), academic_strength: getAcademic('Written Rhetoric & Technical Composition') },
    ],
  },

  // 17. Intellectual Property Specialist
  {
    id: 'car-17',
    title: 'Intellectual Property Specialist',
    slug: 'intellectual-property-specialist',
    summary: 'Secures patents, trademarks, copyrights, and trade secret protections for innovations.',
    description: 'IP Specialists and Patent Attorneys examine novel technical inventions, conduct prior-art research, draft patent claims, and defend intellectual assets against infringement.',
    industry: 'Law & Technology',
    education_level: 'Bachelor in STEM (Engineering/CS/Biology) + JD or Patent Agent Registration',
    typical_tasks: [
      'Conduct rigorous prior-art searches across global patent repositories',
      'Draft comprehensive patent applications, specifications, and claims',
      'Respond to patent office actions and examiner rejections',
      'Advise innovators and founders on patentability and freedom-to-operate (FTO)',
    ],
    salary_range_illustrative: 'Illustrative Entry: $85,000 - $115,000 | Senior: $150,000 - $220,000 (Indicative range)',
    job_outlook: 'Average (+9% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-17-1', career_id: 'car-17', skill_id: 'sk-14', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Legal Research & Statutory Analysis') },
      { id: 'cs-17-2', career_id: 'car-17', skill_id: 'sk-22', importance_weight: 0.9, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Critical Thinking & Debate') },
      { id: 'cs-17-3', career_id: 'car-17', skill_id: 'sk-01', importance_weight: 0.6, required_proficiency: 2, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Python Programming') },
      { id: 'cs-17-4', career_id: 'car-17', skill_id: 'sk-20', importance_weight: 0.8, required_proficiency: 4, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Cross-Functional Communication') },
    ],
    career_interests: [
      { id: 'ci-17-1', career_id: 'car-17', interest_id: 'int-10', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Legal Advocacy & Ethics') },
      { id: 'ci-17-2', career_id: 'car-17', interest_id: 'int-01', weight: 0.85, created_at: new Date().toISOString(), interest: getInterest('Software Architecture & Coding') },
    ],
    career_academic_strengths: [
      { id: 'ca-17-1', career_id: 'car-17', academic_strength_id: 'acad-06', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Legal Studies & Jurisprudence') },
      { id: 'ca-17-2', career_id: 'car-17', academic_strength_id: 'acad-02', weight: 0.85, created_at: new Date().toISOString(), academic_strength: getAcademic('Computer Science Principles') },
    ],
  },

  // 18. Academic Advisor & Counselor
  {
    id: 'car-18',
    title: 'Academic Advisor & Counselor',
    slug: 'academic-advisor',
    summary: 'Empowers university students to achieve academic milestones and strategic career goals.',
    description: 'Academic Advisors guide undergraduate and graduate students through degree curriculum requirements, academic transitions, overcoming challenges, and discovering educational pathways.',
    industry: 'Education',
    education_level: 'Master in Higher Education Administration, Counseling, or Psychology',
    typical_tasks: [
      'Provide one-on-one advising sessions on course selection and degree progress',
      'Identify at-risk students and coordinate academic intervention resources',
      'Conduct workshops on university transition, study strategies, and graduate pathways',
      'Maintain compliance records with institutional accreditation guidelines',
    ],
    salary_range_illustrative: 'Illustrative Entry: $48,000 - $62,000 | Senior: $68,000 - $92,000 (Indicative range)',
    job_outlook: 'Average (+8% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-18-1', career_id: 'car-18', skill_id: 'sk-23', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Pedagogical Coaching & Mentorship') },
      { id: 'cs-18-2', career_id: 'car-18', skill_id: 'sk-20', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Cross-Functional Communication') },
      { id: 'cs-18-3', career_id: 'car-18', skill_id: 'sk-21', importance_weight: 0.9, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Empathy & Patient Care') },
    ],
    career_interests: [
      { id: 'ci-18-1', career_id: 'car-18', interest_id: 'int-11', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Education & Mentorship') },
      { id: 'ci-18-2', career_id: 'car-18', interest_id: 'int-07', weight: 0.8, created_at: new Date().toISOString(), interest: getInterest('Healthcare Delivery & Patient Well-being') },
    ],
    career_academic_strengths: [
      { id: 'ca-18-1', career_id: 'car-18', academic_strength_id: 'acad-09', weight: 0.95, created_at: new Date().toISOString(), academic_strength: getAcademic('Written Rhetoric & Technical Composition') },
      { id: 'ca-18-2', career_id: 'car-18', academic_strength_id: 'acad-06', weight: 0.8, created_at: new Date().toISOString(), academic_strength: getAcademic('Legal Studies & Jurisprudence') },
    ],
  },

  // 19. Instructional Designer
  {
    id: 'car-19',
    title: 'Instructional Designer',
    slug: 'instructional-designer',
    summary: 'Designs high-impact online courses, educational software, and interactive learning media.',
    description: 'Instructional Designers use cognitive learning principles to develop engaging digital curricula, multimedia learning modules, and assessment rubrics for universities and corporate training.',
    industry: 'Education & Technology',
    education_level: 'Bachelor or Master in Instructional Design, Educational Technology, or Education',
    typical_tasks: [
      'Collaborate with faculty and subject matter experts to outline learning objectives',
      'Author engaging online modules using LMS platforms and interactive authoring tools',
      'Design formative and summative learning evaluations and mastery rubrics',
      'Analyze student learning outcome analytics to iterate course content',
    ],
    salary_range_illustrative: 'Illustrative Entry: $58,000 - $76,000 | Mid-Senior: $82,000 - $112,000 (Indicative range)',
    job_outlook: 'Faster than average (+11% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-19-1', career_id: 'car-19', skill_id: 'sk-23', importance_weight: 1.0, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Pedagogical Coaching & Mentorship') },
      { id: 'cs-19-2', career_id: 'car-19', skill_id: 'sk-20', importance_weight: 0.9, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Cross-Functional Communication') },
      { id: 'cs-19-3', career_id: 'car-19', skill_id: 'sk-09', importance_weight: 0.85, required_proficiency: 3, is_required: true, created_at: new Date().toISOString(), skill: getSkill('UI/UX Prototyping (Figma)') },
      { id: 'cs-19-4', career_id: 'car-19', skill_id: 'sk-06', importance_weight: 0.6, required_proficiency: 2, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Data Visualization (Tableau/PowerBI)') },
    ],
    career_interests: [
      { id: 'ci-19-1', career_id: 'car-19', interest_id: 'int-11', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Education & Mentorship') },
      { id: 'ci-19-2', career_id: 'car-19', interest_id: 'int-04', weight: 0.85, created_at: new Date().toISOString(), interest: getInterest('Creative Visual Design & Ergonomics') },
    ],
    career_academic_strengths: [
      { id: 'ca-19-1', career_id: 'car-19', academic_strength_id: 'acad-07', weight: 1.0, created_at: new Date().toISOString(), academic_strength: getAcademic('Design Theory & Human-Computer Interaction') },
      { id: 'ca-19-2', career_id: 'car-19', academic_strength_id: 'acad-09', weight: 0.9, created_at: new Date().toISOString(), academic_strength: getAcademic('Written Rhetoric & Technical Composition') },
    ],
  },

  // 20. Supply Chain & Operations Manager
  {
    id: 'car-20',
    title: 'Supply Chain & Operations Manager',
    slug: 'supply-chain-manager',
    summary: 'Orchestrates global procurement, manufacturing logistics, inventory, and distribution.',
    description: 'Supply Chain Managers ensure products flow smoothly from raw material suppliers to final customer doorsteps, balancing cost efficiency, inventory lead times, and logistical disruptions.',
    industry: 'Business & Engineering',
    education_level: 'Bachelor in Supply Chain Management, Industrial Engineering, or Business',
    typical_tasks: [
      'Manage supplier relationship agreements and negotiate delivery SLA terms',
      'Develop predictive demand forecasting and dynamic safety-stock inventory models',
      'Optimize warehouse logistics, transport shipping routes, and freight costs',
      'Design business continuity plans to absorb global supply chain shocks',
    ],
    salary_range_illustrative: 'Illustrative Entry: $65,000 - $85,000 | Mid-Senior: $95,000 - $135,000 (Indicative range)',
    job_outlook: 'Faster than average (+13% over 10-year outlook)',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    career_skills: [
      { id: 'cs-20-1', career_id: 'car-20', skill_id: 'sk-15', importance_weight: 1.0, required_proficiency: 5, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Supply Chain Optimization') },
      { id: 'cs-20-2', career_id: 'car-20', skill_id: 'sk-16', importance_weight: 0.85, required_proficiency: 4, is_required: true, created_at: new Date().toISOString(), skill: getSkill('Agile & Scrum Project Management') },
      { id: 'cs-20-3', career_id: 'car-20', skill_id: 'sk-03', importance_weight: 0.8, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('SQL & Relational Databases') },
      { id: 'cs-20-4', career_id: 'car-20', skill_id: 'sk-18', importance_weight: 0.8, required_proficiency: 3, is_required: false, created_at: new Date().toISOString(), skill: getSkill('Contract Negotiation & Governance') },
    ],
    career_interests: [
      { id: 'ci-20-1', career_id: 'car-20', interest_id: 'int-12', weight: 1.0, created_at: new Date().toISOString(), interest: getInterest('Logistics & Operational Order') },
      { id: 'ci-20-2', career_id: 'car-20', interest_id: 'int-06', weight: 0.8, created_at: new Date().toISOString(), interest: getInterest('Entrepreneurship & Product Innovation') },
    ],
    career_academic_strengths: [
      { id: 'ca-20-1', career_id: 'car-20', academic_strength_id: 'acad-05', weight: 0.9, created_at: new Date().toISOString(), academic_strength: getAcademic('Corporate Finance & Economics') },
      { id: 'ca-20-2', career_id: 'car-20', academic_strength_id: 'acad-08', weight: 0.85, created_at: new Date().toISOString(), academic_strength: getAcademic('Statistics & Probability') },
    ],
  },
];

export const careerService = {
  async getCareers(): Promise<Career[]> {
    if (isSupabaseConfigured()) {
      const { data, error } = await sb
        .from('careers')
        .select(`
          *,
          career_skills(*, skill:skills(*)),
          career_interests(*, interest:interests(*)),
          career_academic_strengths(*, academic_strength:academic_strengths(*))
        `)
        .eq('is_active', true)
        .order('title');

      if (!error && data && data.length > 0) {
        return data as Career[];
      }
    }
    return SEED_CAREERS;
  },

  async getCareerBySlug(slug: string): Promise<Career | null> {
    const careers = await this.getCareers();
    return careers.find((c) => c.slug === slug) || null;
  },

  async getCareerById(id: string): Promise<Career | null> {
    const careers = await this.getCareers();
    return careers.find((c) => c.id === id) || null;
  },
};
