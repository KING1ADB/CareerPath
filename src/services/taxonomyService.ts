import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { AcademicStrength, Interest, Question, QuestionOption, Skill } from '@/types';

// Seed fallback data for robust demonstration and offline environments
export const SEED_SKILLS: Skill[] = [
  { id: 'sk-01', name: 'Python Programming', category: 'technical', description: 'Core Python development, data manipulation, automation, and backend scripting.', created_at: new Date().toISOString() },
  { id: 'sk-02', name: 'JavaScript / TypeScript', category: 'technical', description: 'Modern frontend and full-stack web application development.', created_at: new Date().toISOString() },
  { id: 'sk-03', name: 'SQL & Relational Databases', category: 'technical', description: 'Schema design, querying, query tuning, and transactional data integrity.', created_at: new Date().toISOString() },
  { id: 'sk-04', name: 'Cloud Computing (AWS/GCP/Azure)', category: 'technical', description: 'Architecting, deploying, and monitoring scalable cloud infrastructure.', created_at: new Date().toISOString() },
  { id: 'sk-05', name: 'Network Security & Protocols', category: 'technical', description: 'Understanding TCP/IP, cryptographic standards, firewalls, and vulnerability mitigation.', created_at: new Date().toISOString() },
  { id: 'sk-06', name: 'Data Visualization (Tableau/PowerBI)', category: 'technical', description: 'Transforming complex datasets into actionable analytical executive dashboards.', created_at: new Date().toISOString() },
  { id: 'sk-07', name: 'Machine Learning & Statistics', category: 'technical', description: 'Supervised/unsupervised algorithms, evaluation metrics, and predictive modeling.', created_at: new Date().toISOString() },
  { id: 'sk-08', name: 'CAD & Simulation (SolidWorks/AutoCAD)', category: 'technical', description: 'Computer-aided design, 3D modeling, and mechanical stress simulation.', created_at: new Date().toISOString() },
  { id: 'sk-09', name: 'UI/UX Prototyping (Figma)', category: 'technical', description: 'User research, wireframing, high-fidelity mockups, and interaction design.', created_at: new Date().toISOString() },
  { id: 'sk-10', name: 'EHR & Health Informatics Systems', category: 'technical', description: 'Clinical data standards (HL7/FHIR) and electronic health record administration.', created_at: new Date().toISOString() },
  { id: 'sk-11', name: 'Quantitative Financial Modeling', category: 'analytical', description: 'Discounted cash flows, financial statement forecasting, and valuation analysis.', created_at: new Date().toISOString() },
  { id: 'sk-12', name: 'Statistical Hypothesis Testing', category: 'analytical', description: 'Formulating hypotheses, p-value interpretation, and rigorous experiment design.', created_at: new Date().toISOString() },
  { id: 'sk-13', name: 'Root Cause Problem Solving', category: 'analytical', description: 'Deconstructing complex engineering and operational bottlenecks into systemic fixes.', created_at: new Date().toISOString() },
  { id: 'sk-14', name: 'Legal Research & Statutory Analysis', category: 'analytical', description: 'Case law synthesis, regulatory interpretation, and statutory compliance analysis.', created_at: new Date().toISOString() },
  { id: 'sk-15', name: 'Supply Chain Optimization', category: 'analytical', description: 'Inventory control modeling, logistics efficiency, and vendor risk assessment.', created_at: new Date().toISOString() },
  { id: 'sk-16', name: 'Agile & Scrum Project Management', category: 'business', description: 'Sprint planning, backlog grooming, velocity tracking, and cross-functional leadership.', created_at: new Date().toISOString() },
  { id: 'sk-17', name: 'Strategic Market Analysis', category: 'business', description: 'Competitive landscape evaluation, SWOT, TAM/SAM sizing, and positioning.', created_at: new Date().toISOString() },
  { id: 'sk-18', name: 'Contract Negotiation & Governance', category: 'business', description: 'Commercial terms negotiation, dispute resolution, and vendor contract lifecycle.', created_at: new Date().toISOString() },
  { id: 'sk-19', name: 'Financial Accounting & Reporting', category: 'business', description: 'GAAP/IFRS compliance, audit trail maintenance, and P&L accountability.', created_at: new Date().toISOString() },
  { id: 'sk-20', name: 'Cross-Functional Communication', category: 'soft', description: 'Articulating technical concepts clearly to non-technical stakeholders.', created_at: new Date().toISOString() },
  { id: 'sk-21', name: 'Empathy & Patient Care', category: 'soft', description: 'Active listening, bedside manner, and sensitive stakeholder care delivery.', created_at: new Date().toISOString() },
  { id: 'sk-22', name: 'Critical Thinking & Debate', category: 'soft', description: 'Objective evaluation of evidence, argumentation, and conflict resolution.', created_at: new Date().toISOString() },
  { id: 'sk-23', name: 'Pedagogical Coaching & Mentorship', category: 'soft', description: 'Guiding learners, curriculum structuring, and developmental feedback.', created_at: new Date().toISOString() },
];

export const SEED_INTERESTS: Interest[] = [
  { id: 'int-01', name: 'Software Architecture & Coding', category: 'investigative', description: 'Designing software systems, solving algorithmic puzzles, and building apps.', created_at: new Date().toISOString() },
  { id: 'int-02', name: 'Data Science & Statistical Inquiry', category: 'investigative', description: 'Finding patterns in data, exploring mathematical models, and testing theories.', created_at: new Date().toISOString() },
  { id: 'int-03', name: 'Cyber Defense & Forensics', category: 'investigative', description: 'Investigating security exploits, white-hat hacking, and reverse-engineering.', created_at: new Date().toISOString() },
  { id: 'int-04', name: 'Creative Visual Design & Ergonomics', category: 'artistic', description: 'Crafting visually harmonious interfaces, design systems, and aesthetic layouts.', created_at: new Date().toISOString() },
  { id: 'int-05', name: 'Financial Markets & Investment', category: 'enterprising', description: 'Tracking economic trends, portfolio management, and venture economics.', created_at: new Date().toISOString() },
  { id: 'int-06', name: 'Entrepreneurship & Product Innovation', category: 'enterprising', description: 'Building new ventures, defining product visions, and driving revenue growth.', created_at: new Date().toISOString() },
  { id: 'int-07', name: 'Healthcare Delivery & Patient Well-being', category: 'social', description: 'Improving human health outcomes, clinical diagnostics, and compassionate care.', created_at: new Date().toISOString() },
  { id: 'int-08', name: 'Mechanical Systems & Hardware', category: 'realistic', description: 'Tinkering with physical machinery, robotics, hardware prototypes, and engines.', created_at: new Date().toISOString() },
  { id: 'int-09', name: 'Environmental & Structural Planning', category: 'realistic', description: 'Building sustainable infrastructure, civil construction, and eco-systems.', created_at: new Date().toISOString() },
  { id: 'int-10', name: 'Legal Advocacy & Ethics', category: 'social', description: 'Upholding justice, defending rights, constitutional ethics, and public policy.', created_at: new Date().toISOString() },
  { id: 'int-11', name: 'Education & Mentorship', category: 'social', description: 'Teaching students, fostering academic growth, and instructional design.', created_at: new Date().toISOString() },
  { id: 'int-12', name: 'Logistics & Operational Order', category: 'conventional', description: 'Organizing processes, scheduling operations, and ensuring strict compliance.', created_at: new Date().toISOString() },
];

export const SEED_ACADEMIC_STRENGTHS: AcademicStrength[] = [
  { id: 'acad-01', name: 'Advanced Mathematics & Calculus', subject_area: 'STEM', description: 'Differential calculus, linear algebra, vector calculus, and discrete logic.', created_at: new Date().toISOString() },
  { id: 'acad-02', name: 'Computer Science Principles', subject_area: 'STEM', description: 'Algorithms, data structures, operating systems, and computer networks.', created_at: new Date().toISOString() },
  { id: 'acad-03', name: 'Physics & Mechanics', subject_area: 'STEM', description: 'Classical mechanics, thermodynamics, fluid dynamics, and electromagnetism.', created_at: new Date().toISOString() },
  { id: 'acad-04', name: 'Biological Sciences & Anatomy', subject_area: 'Health Sciences', description: 'Cellular biology, human physiology, pharmacology, and genetics.', created_at: new Date().toISOString() },
  { id: 'acad-05', name: 'Corporate Finance & Economics', subject_area: 'Business', description: 'Microeconomics, macroeconomics, corporate valuation, and capital markets.', created_at: new Date().toISOString() },
  { id: 'acad-06', name: 'Legal Studies & Jurisprudence', subject_area: 'Law & Humanities', description: 'Constitutional law, torts, contracts, legal reasoning, and ethics.', created_at: new Date().toISOString() },
  { id: 'acad-07', name: 'Design Theory & Human-Computer Interaction', subject_area: 'Design', description: 'Cognitive psychology, typography, interaction design principles.', created_at: new Date().toISOString() },
  { id: 'acad-08', name: 'Statistics & Probability', subject_area: 'STEM', description: 'Probability distributions, regression models, Bayesian inference.', created_at: new Date().toISOString() },
  { id: 'acad-09', name: 'Written Rhetoric & Technical Composition', subject_area: 'Humanities', description: 'Academic prose, persuasive briefs, technical documentation, and essays.', created_at: new Date().toISOString() },
];

export const SEED_QUESTIONS: Question[] = [
  {
    id: 'q-01',
    code: 'Q01',
    text: 'When faced with a complex challenge, which approach excites you the most?',
    category: 'work_style',
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-01-1', question_id: 'q-01', option_text: 'Writing code, building algorithmic models, or configuring automated systems', trait_key: 'investigative', score_value: 5, order_index: 1, created_at: new Date().toISOString() },
      { id: 'opt-01-2', question_id: 'q-01', option_text: 'Conducting statistical analysis and finding patterns in quantitative datasets', trait_key: 'investigative', score_value: 5, order_index: 2, created_at: new Date().toISOString() },
      { id: 'opt-01-3', question_id: 'q-01', option_text: 'Designing a visually clean, human-centered user interface or aesthetic concept', trait_key: 'artistic', score_value: 5, order_index: 3, created_at: new Date().toISOString() },
      { id: 'opt-01-4', question_id: 'q-01', option_text: 'Formulating a financial model, business case, or negotiation strategy', trait_key: 'enterprising', score_value: 5, order_index: 4, created_at: new Date().toISOString() },
      { id: 'opt-01-5', question_id: 'q-01', option_text: 'Directly assisting someone in need or coaching a team member toward improvement', trait_key: 'social', score_value: 5, order_index: 5, created_at: new Date().toISOString() },
    ],
  },
  {
    id: 'q-02',
    code: 'Q02',
    text: 'In your ideal work setting, what type of day-to-day activity brings you the highest satisfaction?',
    category: 'personality',
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-02-1', question_id: 'q-02', option_text: 'Deep focused intellectual problem-solving with minimal interruption', trait_key: 'investigative', score_value: 5, order_index: 1, created_at: new Date().toISOString() },
      { id: 'opt-02-2', question_id: 'q-02', option_text: 'Collaborating dynamically with diverse stakeholders and guiding discussions', trait_key: 'enterprising', score_value: 5, order_index: 2, created_at: new Date().toISOString() },
      { id: 'opt-02-3', question_id: 'q-02', option_text: 'Hands-on experimentation with physical equipment, prototypes, or machines', trait_key: 'realistic', score_value: 5, order_index: 3, created_at: new Date().toISOString() },
      { id: 'opt-02-4', question_id: 'q-02', option_text: 'Creative ideation, sketching, visual crafting, and sensory styling', trait_key: 'artistic', score_value: 5, order_index: 4, created_at: new Date().toISOString() },
      { id: 'opt-02-5', question_id: 'q-02', option_text: 'Compassionate one-on-one mentoring, teaching, or healthcare guidance', trait_key: 'social', score_value: 5, order_index: 5, created_at: new Date().toISOString() },
    ],
  },
  {
    id: 'q-03',
    code: 'Q03',
    text: 'How do you prefer to communicate your discoveries or project results?',
    category: 'work_style',
    order_index: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-03-1', question_id: 'q-03', option_text: 'Through interactive dashboards, reproducible code repositories, and technical memos', trait_key: 'investigative', score_value: 5, order_index: 1, created_at: new Date().toISOString() },
      { id: 'opt-03-2', question_id: 'q-03', option_text: 'Through persuasive executive pitches, pitchbooks, and strategy presentations', trait_key: 'enterprising', score_value: 5, order_index: 2, created_at: new Date().toISOString() },
      { id: 'opt-03-3', question_id: 'q-03', option_text: 'Through high-fidelity visual walkthroughs, interactive prototypes, and design stories', trait_key: 'artistic', score_value: 5, order_index: 3, created_at: new Date().toISOString() },
      { id: 'opt-03-4', question_id: 'q-03', option_text: 'Through formal legal briefs, statutory citations, and structured argumentation', trait_key: 'investigative', score_value: 5, order_index: 4, created_at: new Date().toISOString() },
      { id: 'opt-03-5', question_id: 'q-03', option_text: 'Through empathetic workshops, personal consultations, and supportive tutorials', trait_key: 'social', score_value: 5, order_index: 5, created_at: new Date().toISOString() },
    ],
  },
  {
    id: 'q-04',
    code: 'Q04',
    text: 'What kind of impact matters most to you in your future career?',
    category: 'values',
    order_index: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-04-1', question_id: 'q-04', option_text: 'Building scalable technologies that automate tasks and empower millions', trait_key: 'investigative', score_value: 5, order_index: 1, created_at: new Date().toISOString() },
      { id: 'opt-04-2', question_id: 'q-04', option_text: 'Fostering human well-being, saving lives, or nurturing individual potential', trait_key: 'social', score_value: 5, order_index: 2, created_at: new Date().toISOString() },
      { id: 'opt-04-3', question_id: 'q-04', option_text: 'Creating profitable economic ventures, financial stability, and market value', trait_key: 'enterprising', score_value: 5, order_index: 3, created_at: new Date().toISOString() },
      { id: 'opt-04-4', question_id: 'q-04', option_text: 'Designing beautiful, memorable experiences that inspire and delight people', trait_key: 'artistic', score_value: 5, order_index: 4, created_at: new Date().toISOString() },
      { id: 'opt-04-5', question_id: 'q-04', option_text: 'Building durable physical infrastructure that protects the environment and communities', trait_key: 'realistic', score_value: 5, order_index: 5, created_at: new Date().toISOString() },
    ],
  },
  {
    id: 'q-05',
    code: 'Q05',
    text: 'When working in a team project, which role do you naturally assume?',
    category: 'personality',
    order_index: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-05-1', question_id: 'q-05', option_text: 'The technical architect: ensuring correctness, system stability, and architecture', trait_key: 'investigative', score_value: 5, order_index: 1, created_at: new Date().toISOString() },
      { id: 'opt-05-2', question_id: 'q-05', option_text: 'The project leader: setting milestones, pitching the vision, and driving results', trait_key: 'enterprising', score_value: 5, order_index: 2, created_at: new Date().toISOString() },
      { id: 'opt-05-3', question_id: 'q-05', option_text: 'The creative lead: polishing aesthetics, user experience, and visual harmony', trait_key: 'artistic', score_value: 5, order_index: 3, created_at: new Date().toISOString() },
      { id: 'opt-05-4', question_id: 'q-05', option_text: 'The mediator and mentor: keeping team morale high, active listening, and teaching', trait_key: 'social', score_value: 5, order_index: 4, created_at: new Date().toISOString() },
      { id: 'opt-05-5', question_id: 'q-05', option_text: 'The analytical reviewer: auditing calculations, verifying evidence, and risk analysis', trait_key: 'conventional', score_value: 5, order_index: 5, created_at: new Date().toISOString() },
    ],
  },
];

export const taxonomyService = {
  async getSkills(): Promise<Skill[]> {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('skills').select('*').order('name');
      if (!error && data && data.length > 0) return data as Skill[];
    }
    return SEED_SKILLS;
  },

  async getInterests(): Promise<Interest[]> {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('interests').select('*').order('name');
      if (!error && data && data.length > 0) return data as Interest[];
    }
    return SEED_INTERESTS;
  },

  async getAcademicStrengths(): Promise<AcademicStrength[]> {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('academic_strengths').select('*').order('name');
      if (!error && data && data.length > 0) return data as AcademicStrength[];
    }
    return SEED_ACADEMIC_STRENGTHS;
  },

  async getQuestions(): Promise<Question[]> {
    if (isSupabaseConfigured()) {
      const { data: questions, error } = await supabase
        .from('questions')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (!error && questions && questions.length > 0) {
        const { data: options } = await supabase
          .from('question_options')
          .select('*')
          .order('order_index');

        return (questions as any[]).map((q) => ({
          ...(q as Question),
          options: (options as QuestionOption[])?.filter((opt) => opt.question_id === q.id) || [],
        }));
      }
    }
    return SEED_QUESTIONS;
  },
};
