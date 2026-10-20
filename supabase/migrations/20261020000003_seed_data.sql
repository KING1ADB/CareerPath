-- ============================================================================
-- CareerPath Comprehensive Seed Migration (20261020000003_seed_data.sql)
-- Discover. Plan. Grow.
-- Contains 20+ diverse career profiles across 8 industries, foundational skills,
-- interests, academic strengths, questionnaire questions, and courses.
-- All salary figures are explicitly labeled as illustrative estimates.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. SEED SKILLS
-- ----------------------------------------------------------------------------
INSERT INTO public.skills (name, category, description) VALUES
-- Technical Skills
('Python Programming', 'technical', 'Core Python development, data manipulation, automation, and backend scripting.'),
('JavaScript / TypeScript', 'technical', 'Modern frontend and full-stack web application development.'),
('SQL & Relational Databases', 'technical', 'Schema design, querying, query tuning, and transactional data integrity.'),
('Cloud Computing (AWS/GCP/Azure)', 'technical', 'Architecting, deploying, and monitoring scalable cloud infrastructure.'),
('Network Security & Protocols', 'technical', 'Understanding TCP/IP, cryptographic standards, firewalls, and vulnerability mitigation.'),
('Data Visualization (Tableau/PowerBI)', 'technical', 'Transforming complex datasets into actionable analytical executive dashboards.'),
('Machine Learning & Statistics', 'technical', 'Supervised/unsupervised algorithms, evaluation metrics, and predictive modeling.'),
('CAD & Simulation (SolidWorks/AutoCAD)', 'technical', 'Computer-aided design, 3D modeling, and mechanical stress simulation.'),
('UI/UX Prototyping (Figma)', 'technical', 'User research, wireframing, high-fidelity mockups, and interaction design.'),
('EHR & Health Informatics Systems', 'technical', 'Clinical data standards (HL7/FHIR) and electronic health record administration.'),

-- Analytical Skills
('Quantitative Financial Modeling', 'analytical', 'Discounted cash flows, financial statement forecasting, and valuation analysis.'),
('Statistical Hypothesis Testing', 'analytical', 'Formulating hypotheses, p-value interpretation, and rigorous experiment design.'),
('Root Cause Problem Solving', 'analytical', 'Deconstructing complex engineering and operational bottlenecks into systemic fixes.'),
('Legal Research & Statutory Analysis', 'analytical', 'Case law synthesis, regulatory interpretation, and statutory compliance analysis.'),
('Supply Chain Optimization', 'analytical', 'Inventory control modeling, logistics efficiency, and vendor risk assessment.'),

-- Business & Leadership Skills
('Agile & Scrum Project Management', 'business', 'Sprint planning, backlog grooming, velocity tracking, and cross-functional leadership.'),
('Strategic Market Analysis', 'business', 'Competitive landscape evaluation, SWOT, TAM/SAM sizing, and positioning.'),
('Contract Negotiation & Governance', 'business', 'Commercial terms negotiation, dispute resolution, and vendor contract lifecycle.'),
('Financial Accounting & Reporting', 'business', 'GAAP/IFRS compliance, audit trail maintenance, and P&L accountability.'),

-- Soft Skills
('Cross-Functional Communication', 'soft', 'Articulating technical concepts clearly to non-technical stakeholders.'),
('Empathy & Patient Care', 'soft', 'Active listening, bedside manner, and sensitive stakeholder care delivery.'),
('Critical Thinking & Debate', 'soft', 'Objective evaluation of evidence, argumentation, and conflict resolution.'),
('Pedagogical Coaching & Mentorship', 'soft', 'Guiding learners, curriculum structuring, and developmental feedback.')
ON CONFLICT (name) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 2. SEED INTERESTS (Holland RIASEC Model)
-- ----------------------------------------------------------------------------
INSERT INTO public.interests (name, category, description) VALUES
('Software Architecture & Coding', 'investigative', 'Designing software systems, solving algorithmic puzzles, and building apps.'),
('Data Science & Statistical Inquiry', 'investigative', 'Finding patterns in data, exploring mathematical models, and testing theories.'),
('Cyber Defense & Forensics', 'investigative', 'Investigating security exploits, white-hat hacking, and reverse-engineering.'),
('Creative Visual Design & Ergonomics', 'artistic', 'Crafting visually harmonious interfaces, design systems, and aesthetic layouts.'),
('Financial Markets & Investment', 'enterprising', 'Tracking economic trends, portfolio management, and venture economics.'),
('Entrepreneurship & Product Innovation', 'enterprising', 'Building new ventures, defining product visions, and driving revenue growth.'),
('Healthcare Delivery & Patient Well-being', 'social', 'Improving human health outcomes, clinical diagnostics, and compassionate care.'),
('Mechanical Systems & Hardware', 'realistic', 'Tinkering with physical machinery, robotics, hardware prototypes, and engines.'),
('Environmental & Structural Planning', 'realistic', 'Building sustainable infrastructure, civil construction, and eco-systems.'),
('Legal Advocacy & Ethics', 'social', 'Upholding justice, defending rights, constitutional ethics, and public policy.'),
('Education & Mentorship', 'social', 'Teaching students, fostering academic growth, and instructional design.'),
('Logistics & Operational Order', 'conventional', 'Organizing processes, scheduling operations, and ensuring strict compliance.')
ON CONFLICT (name) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 3. SEED ACADEMIC STRENGTHS
-- ----------------------------------------------------------------------------
INSERT INTO public.academic_strengths (name, subject_area, description) VALUES
('Advanced Mathematics & Calculus', 'STEM', 'Differential calculus, linear algebra, vector calculus, and discrete logic.'),
('Computer Science Principles', 'STEM', 'Algorithms, data structures, operating systems, and computer networks.'),
('Physics & Mechanics', 'STEM', 'Classical mechanics, thermodynamics, fluid dynamics, and electromagnetism.'),
('Biological Sciences & Anatomy', 'Health Sciences', 'Cellular biology, human physiology, pharmacology, and genetics.'),
('Corporate Finance & Economics', 'Business', 'Microeconomics, macroeconomics, corporate valuation, and capital markets.'),
('Legal Studies & Jurisprudence', 'Law & Humanities', 'Constitutional law, torts, contracts, legal reasoning, and ethics.'),
('Design Theory & Human-Computer Interaction', 'Design', 'Cognitive psychology, typography, interaction design principles.'),
('Statistics & Probability', 'STEM', 'Probability distributions, regression models, Bayesian inference.'),
('Written Rhetoric & Technical Composition', 'Humanities', 'Academic prose, persuasive briefs, technical documentation, and essays.')
ON CONFLICT (name) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 4. SEED 20 DIVERSE CAREER PROFILES ACROSS 8 INDUSTRIES
-- All salary figures are explicitly labeled as illustrative estimates.
-- ----------------------------------------------------------------------------
INSERT INTO public.careers (title, slug, summary, description, industry, education_level, typical_tasks, salary_range_illustrative, job_outlook, is_active) VALUES

-- 1. Technology: Software Engineer
('Software Engineer', 'software-engineer', 
'Designs, tests, and builds robust software applications and systems.',
'Software Engineers apply computer science and engineering principles to architect scalable frontend, backend, or full-stack software solutions. They collaborate in agile teams to ship reliable software that solves real user and enterprise problems.',
'Technology', 'Bachelor of Science in Computer Science or related STEM field',
ARRAY['Architect and write clean, maintainable, modular code', 'Conduct peer code reviews and unit/integration testing', 'Collaborate with product managers and UI designers', 'Debug, profile, and optimize application performance'],
'Illustrative Entry: $75,000 - $95,000 | Mid-Senior: $115,000 - $160,000 (Indicative range)', 'Much faster than average (+25% over 10-year outlook)', true),

-- 2. Technology: Data Scientist
('Data Scientist', 'data-scientist',
'Transforms complex data into predictive models and actionable business insights.',
'Data Scientists combine statistical rigor, machine learning, and domain knowledge to extract signal from noisy enterprise data. They build predictive algorithms, design experiments, and deliver data-driven intelligence to decision makers.',
'Technology', 'Bachelor or Master of Science in Data Science, Statistics, or Computer Science',
ARRAY['Clean, curate, and explore large heterogeneous datasets', 'Train, validate, and tune machine learning models', 'Design A/B tests and calculate statistical significance', 'Create interactive dashboards and present findings to leadership'],
'Illustrative Entry: $80,000 - $100,000 | Mid-Senior: $120,000 - $165,000 (Indicative range)', 'Much faster than average (+35% over 10-year outlook)', true),

-- 3. Technology: Cybersecurity Analyst
('Cybersecurity Analyst', 'cybersecurity-analyst',
'Safeguards enterprise infrastructure, networks, and confidential data from breaches.',
'Cybersecurity Analysts monitor digital environments, investigate anomalous security alerts, evaluate threat vectors, and implement defensive security controls to protect critical digital assets.',
'Technology', 'Bachelor in Cybersecurity, Computer Science, or Information Technology',
ARRAY['Monitor SIEM dashboards for security incidents and anomalous traffic', 'Conduct vulnerability scanning and security audits', 'Formulate and rehearse incident response playbooks', 'Implement multi-factor authentication and endpoint protection policies'],
'Illustrative Entry: $70,000 - $90,000 | Mid-Senior: $105,000 - $145,000 (Indicative range)', 'Much faster than average (+32% over 10-year outlook)', true),

-- 4. Technology: Cloud Solutions Architect
('Cloud Solutions Architect', 'cloud-solutions-architect',
'Designs resilient, cost-effective, and scalable cloud computing ecosystems.',
'Cloud Solutions Architects bridge technical engineering and strategic business needs by translating infrastructure requirements into high-availability cloud deployments across providers such as AWS, Azure, and Google Cloud.',
'Technology', 'Bachelor in Computer Science, Systems Engineering, or equivalent experience',
ARRAY['Design cloud-native microservice architectures and disaster recovery plans', 'Evaluate compute, storage, and networking trade-offs', 'Establish cloud security, compliance, and cost-governance guardrails', 'Mentor engineering teams on cloud deployment best practices'],
'Illustrative Entry: $90,000 - $115,000 | Mid-Senior: $135,000 - $185,000 (Indicative range)', 'Faster than average (+20% over 10-year outlook)', true),

-- 5. Creative / Tech: UI/UX Designer
('UI/UX Designer', 'ui-ux-designer',
'Crafts intuitive, visually engaging, and user-centered digital interfaces and experiences.',
'UI/UX Designers conduct behavioral user research, create information architectures, design wireframes and high-fidelity prototypes, and validate usability to create delightful digital products.',
'Creative & Design', 'Bachelor in Human-Computer Interaction, Graphic Design, or Digital Media',
ARRAY['Conduct qualitative user interviews and usability testing sessions', 'Build wireframes, flow diagrams, and interactive Figma prototypes', 'Establish and maintain scalable design systems and typography scales', 'Partner with frontend engineers to ensure design implementation fidelity'],
'Illustrative Entry: $65,000 - $85,000 | Mid-Senior: $100,000 - $140,000 (Indicative range)', 'Faster than average (+16% over 10-year outlook)', true),

-- 6. Finance: Financial Analyst
('Financial Analyst', 'financial-analyst',
'Guides corporate and investment capital allocation through rigorous financial modeling.',
'Financial Analysts examine financial statements, evaluate macroeconomic indicators, forecast revenue and expenses, and construct valuation models that steer major corporate decisions.',
'Finance', 'Bachelor of Science in Finance, Economics, or Accounting',
ARRAY['Build three-statement financial models and scenario forecasts', 'Track quarterly performance against budgets and variance analysis', 'Perform industry benchmarking and valuation analysis (DCF, Multiples)', 'Prepare executive investment memos and board presentation decks'],
'Illustrative Entry: $68,000 - $88,000 | Mid-Senior: $100,000 - $140,000 (Indicative range)', 'Average (+9% over 10-year outlook)', true),

-- 7. Finance: Investment Banking Analyst
('Investment Banking Analyst', 'investment-banking-analyst',
'Executes mergers, acquisitions, debt issuance, and public equity offerings.',
'Investment Banking Analysts assist corporations and institutions in raising capital and structuring corporate transactions through in-depth financial analysis, due diligence, and pitching.',
'Finance', 'Bachelor in Finance, Economics, Mathematics, or Business Administration',
ARRAY['Construct complex LBO, DCF, and merger accretion/dilution models', 'Draft confidential information memorandums (CIM) and pitchbooks', 'Coordinate transaction due diligence across legal, tax, and accounting teams', 'Analyze market trends and comparable company trading multiples'],
'Illustrative Entry: $100,000 - $125,000 + Bonus | Senior: $160,000 - $250,000+ (Indicative range)', 'Average (+8% over 10-year outlook)', true),

-- 8. Business: Management Consultant
('Management Consultant', 'management-consultant',
'Solves high-stakes strategic, operational, and organizational dilemmas for corporations.',
'Management Consultants partner with executive leaders across industries to diagnose operational inefficiencies, identify market expansion opportunities, and execute transformation initiatives.',
'Business', 'Bachelor or Master of Business Administration (MBA)',
ARRAY['Synthesize ambiguous organizational problems into structured workstreams', 'Conduct stakeholder interviews, operational audits, and market surveys', 'Perform quantitative cost-benefit analysis and operating model redesign', 'Deliver high-impact recommendations to C-suite executive boards'],
'Illustrative Entry: $85,000 - $110,000 | Senior: $140,000 - $210,000 (Indicative range)', 'Faster than average (+11% over 10-year outlook)', true),

-- 9. Business / Tech: Product Manager
('Product Manager', 'product-manager',
'Guides product roadmap from inception to launch at the intersection of business, tech, and UX.',
'Product Managers define the "why", "what", and "when" of software features. They align engineering, design, and executive stakeholders around high-value customer problems and business goals.',
'Business & Technology', 'Bachelor in Business, Computer Science, Engineering, or relevant experience',
ARRAY['Define product vision, strategic roadmap, and quarterly OKRs', 'Write detailed user stories, PRDs, and acceptance criteria', 'Prioritize feature backlogs using customer data and impact vs. effort matrices', 'Analyze telemetry metrics (retention, conversion, churn) post-launch'],
'Illustrative Entry: $75,000 - $98,000 | Mid-Senior: $120,000 - $170,000 (Indicative range)', 'Faster than average (+18% over 10-year outlook)', true),

-- 10. Business / Creative: Digital Marketing Strategist
('Digital Marketing Strategist', 'digital-marketing-strategist',
'Drives customer acquisition and brand equity through multi-channel data campaigns.',
'Digital Marketing Strategists architect omni-channel campaigns encompassing SEO, SEM, content marketing, and paid social, optimizing customer acquisition costs (CAC) and lifetime value (LTV).',
'Marketing & Business', 'Bachelor in Marketing, Communications, or Business',
ARRAY['Manage digital ad spend, attribution modeling, and campaign ROI', 'Formulate SEO keyword strategies and organic content roadmaps', 'Perform conversion rate optimization (CRO) on key landing pages', 'Analyze campaign metrics and audience segment performance'],
'Illustrative Entry: $55,000 - $75,000 | Mid-Senior: $85,000 - $125,000 (Indicative range)', 'Faster than average (+10% over 10-year outlook)', true),

-- 11. Healthcare / Eng: Biomedical Engineer
('Biomedical Engineer', 'biomedical-engineer',
'Innovates medical devices, diagnostic instrumentation, and biomaterials to improve human health.',
'Biomedical Engineers fuse engineering mechanics, electronics, and biological science to invent and refine life-saving tools such as prosthetics, pacemakers, surgical robots, and diagnostic sensors.',
'Healthcare & Engineering', 'Bachelor or Master in Biomedical or Bioengineering',
ARRAY['Design and test prototypes for medical hardware or diagnostic assays', 'Ensure compliance with stringent FDA and ISO 13485 medical standards', 'Perform biomaterial compatibility testing and mechanical stress trials', 'Collaborate with clinical surgeons and medical teams to assess device efficacy'],
'Illustrative Entry: $65,000 - $85,000 | Mid-Senior: $95,000 - $135,000 (Indicative range)', 'Faster than average (+10% over 10-year outlook)', true),

-- 12. Engineering: Mechanical Design Engineer
('Mechanical Design Engineer', 'mechanical-design-engineer',
'Conceives, analyzes, and oversees manufacturing of mechanical systems and products.',
'Mechanical Engineers design everything from electric vehicle drivetrains to industrial robotics and consumer electronics enclosures, validating structural durability and thermal properties.',
'Engineering', 'Bachelor of Science in Mechanical Engineering',
ARRAY['Develop parametric 3D CAD models, assemblies, and detailed drafting drawings', 'Conduct finite element analysis (FEA) and computational fluid dynamics (CFD)', 'Select manufacturing materials, specify tolerances (GD&T), and oversee tooling', 'Conduct physical prototype failure testing and design iterations'],
'Illustrative Entry: $68,000 - $88,000 | Mid-Senior: $98,000 - $138,000 (Indicative range)', 'Average (+7% over 10-year outlook)', true),

-- 13. Engineering: Civil & Environmental Engineer
('Civil & Environmental Engineer', 'civil-environmental-engineer',
'Plans, designs, and manages sustainable infrastructure, water systems, and transportation.',
'Civil Engineers design public and private infrastructure—including bridges, transit networks, water purification plants, and flood mitigation barriers—prioritizing environmental sustainability and public safety.',
'Engineering', 'Bachelor of Science in Civil or Environmental Engineering + FE/PE license',
ARRAY['Perform structural load calculations and geotechnical site surveys', 'Prepare civil construction blueprint specifications and environmental impact reports', 'Ensure adherence to building codes, safety regulations, and zoning laws', 'Manage construction vendor progress, budget allocations, and material audits'],
'Illustrative Entry: $66,000 - $86,000 | Mid-Senior: $95,000 - $135,000 (Indicative range)', 'Average (+8% over 10-year outlook)', true),

-- 14. Healthcare: Registered Nurse / Clinical Specialist
('Registered Nurse (RN)', 'registered-nurse',
'Delivers direct patient care, coordinates clinical treatments, and advocates for patient health.',
'Registered Nurses assess patient health conditions, administer medications, operate medical diagnostic equipment, and provide compassionate counseling and health education to patients and families.',
'Healthcare', 'Bachelor of Science in Nursing (BSN) + NCLEX-RN licensure',
ARRAY['Perform clinical assessments, triage symptoms, and record vital indicators', 'Administer prescribed medications, intravenous therapies, and wound treatments', 'Coordinate multi-disciplinary patient care plans with physicians and therapists', 'Educate patients on post-discharge self-care, nutrition, and disease prevention'],
'Illustrative Entry: $62,000 - $80,000 | Senior/Specialist: $88,000 - $120,000 (Indicative range)', 'Faster than average (+12% over 10-year outlook)', true),

-- 15. Healthcare / Tech: Health Informatics Specialist
('Health Informatics Specialist', 'health-informatics-specialist',
'Optimizes electronic health records, clinical data workflows, and patient care systems.',
'Health Informatics Specialists sit at the crossroads of medical practice and data science, ensuring electronic health records (EHR) comply with privacy regulations while empowering clinical decisions.',
'Healthcare & Technology', 'Bachelor or Master in Health Informatics, Nursing Informatics, or IT',
ARRAY['Audit and configure electronic health record (EHR) databases for hospital workflows', 'Ensure strict HIPAA and healthcare compliance protocols across data pipelines', 'Train clinical practitioners and physicians on informatics software systems', 'Analyze hospital operational data to identify clinical care bottleneck trends'],
'Illustrative Entry: $62,000 - $82,000 | Mid-Senior: $90,000 - $125,000 (Indicative range)', 'Much faster than average (+17% over 10-year outlook)', true),

-- 16. Law: Corporate Legal Counsel
('Corporate Legal Counsel', 'corporate-legal-counsel',
'Protects enterprise interests through contract negotiation, regulatory compliance, and advisory.',
'Corporate Counsel provide proactive legal advice to businesses, structuring high-value commercial agreements, mitigating legal liability, and navigating evolving industry regulatory frameworks.',
'Law', 'Juris Doctor (JD) + Bar Admission',
ARRAY['Draft, review, and negotiate complex commercial contracts and vendor agreements', 'Advise executive leadership on regulatory compliance and corporate governance', 'Manage external litigation counsel and coordinate discovery documentation', 'Conduct legal risk assessments for new product launches and expansions'],
'Illustrative Entry: $95,000 - $130,000 | Senior: $160,000 - $240,000+ (Indicative range)', 'Average (+10% over 10-year outlook)', true),

-- 17. Law / Tech: Intellectual Property Specialist
('Intellectual Property Specialist', 'intellectual-property-specialist',
'Secures patents, trademarks, copyrights, and trade secret protections for innovations.',
'IP Specialists and Patent Attorneys examine novel technical inventions, conduct prior-art research, draft patent claims, and defend intellectual assets against infringement.',
'Law & Technology', 'Bachelor in STEM (Engineering/CS/Biology) + JD or Patent Agent Registration',
ARRAY['Conduct rigorous prior-art searches across global patent repositories', 'Draft comprehensive patent applications, specifications, and claims', 'Respond to patent office actions and examiner rejections', 'Advise innovators and founders on patentability and freedom-to-operate (FTO)'],
'Illustrative Entry: $85,000 - $115,000 | Senior: $150,000 - $220,000 (Indicative range)', 'Average (+9% over 10-year outlook)', true),

-- 18. Education: Academic Advisor & Counselor
('Academic Advisor & Counselor', 'academic-advisor',
'Empowers university students to achieve academic milestones and strategic career goals.',
'Academic Advisors guide undergraduate and graduate students through degree curriculum requirements, academic transitions, overcoming challenges, and discovering educational pathways.',
'Education', 'Master in Higher Education Administration, Counseling, or Psychology',
ARRAY['Provide one-on-one advising sessions on course selection and degree progress', 'Identify at-risk students and coordinate academic intervention resources', 'Conduct workshops on university transition, study strategies, and graduate pathways', 'Maintain compliance records with institutional accreditation guidelines'],
'Illustrative Entry: $48,000 - $62,000 | Senior: $68,000 - $92,000 (Indicative range)', 'Average (+8% over 10-year outlook)', true),

-- 19. Education / Tech: Instructional Designer
('Instructional Designer', 'instructional-designer',
'Designs high-impact online courses, educational software, and interactive learning media.',
'Instructional Designers use cognitive learning principles to develop engaging digital curricula, multimedia learning modules, and assessment rubrics for universities and corporate training.',
'Education & Technology', 'Bachelor or Master in Instructional Design, Educational Technology, or Education',
ARRAY['Collaborate with faculty and subject matter experts to outline learning objectives', 'Author engaging online modules using LMS platforms and interactive authoring tools', 'Design formative and summative learning evaluations and mastery rubrics', 'Analyze student learning outcome analytics to iterate course content'],
'Illustrative Entry: $58,000 - $76,000 | Mid-Senior: $82,000 - $112,000 (Indicative range)', 'Faster than average (+11% over 10-year outlook)', true),

-- 20. Business / Eng: Supply Chain & Operations Manager
('Supply Chain & Operations Manager', 'supply-chain-manager',
'Orchestrates global procurement, manufacturing logistics, inventory, and distribution.',
'Supply Chain Managers ensure products flow smoothly from raw material suppliers to final customer doorsteps, balancing cost efficiency, inventory lead times, and logistical disruptions.',
'Business & Engineering', 'Bachelor in Supply Chain Management, Industrial Engineering, or Business',
ARRAY['Manage supplier relationship agreements and negotiate delivery SLA terms', 'Develop predictive demand forecasting and dynamic safety-stock inventory models', 'Optimize warehouse logistics, transport shipping routes, and freight costs', 'Design business continuity plans to absorb global supply chain shocks'],
'Illustrative Entry: $65,000 - $85,000 | Mid-Senior: $95,000 - $135,000 (Indicative range)', 'Faster than average (+13% over 10-year outlook)', true)
ON CONFLICT (slug) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 5. SEED QUESTIONNAIRE QUESTIONS & OPTIONS (Personality / RIASEC / Work Style)
-- ----------------------------------------------------------------------------
INSERT INTO public.questions (code, text, category, order_index) VALUES
('Q01', 'When faced with a complex challenge, which approach excites you the most?', 'work_style', 1),
('Q02', 'In your ideal work setting, what type of day-to-day activity brings you the highest satisfaction?', 'personality', 2),
('Q03', 'How do you prefer to communicate your discoveries or project results?', 'work_style', 3),
('Q04', 'What kind of impact matters most to you in your future career?', 'values', 4),
('Q05', 'When working in a team project, which role do you naturally assume?', 'personality', 5)
ON CONFLICT (code) DO NOTHING;

-- Options for Q01
INSERT INTO public.question_options (question_id, option_text, trait_key, score_value, order_index)
SELECT id, 'Writing code, building algorithmic models, or configuring automated systems', 'investigative', 5, 1 FROM public.questions WHERE code = 'Q01'
UNION ALL
SELECT id, 'Conducting statistical analysis and finding patterns in quantitative datasets', 'investigative', 5, 2 FROM public.questions WHERE code = 'Q01'
UNION ALL
SELECT id, 'Designing a visually clean, human-centered user interface or aesthetic concept', 'artistic', 5, 3 FROM public.questions WHERE code = 'Q01'
UNION ALL
SELECT id, 'Formulating a financial model, business case, or negotiation strategy', 'enterprising', 5, 4 FROM public.questions WHERE code = 'Q01'
UNION ALL
SELECT id, 'Directly assisting someone in need or coaching a team member toward improvement', 'social', 5, 5 FROM public.questions WHERE code = 'Q01'
ON CONFLICT DO NOTHING;

-- Options for Q02
INSERT INTO public.question_options (question_id, option_text, trait_key, score_value, order_index)
SELECT id, 'Deep focused intellectual problem-solving with minimal interruption', 'investigative', 5, 1 FROM public.questions WHERE code = 'Q02'
UNION ALL
SELECT id, 'Collaborating dynamically with diverse stakeholders and guiding discussions', 'enterprising', 5, 2 FROM public.questions WHERE code = 'Q02'
UNION ALL
SELECT id, 'Hands-on experimentation with physical equipment, prototypes, or machines', 'realistic', 5, 3 FROM public.questions WHERE code = 'Q02'
UNION ALL
SELECT id, 'Creative ideation, sketching, visual crafting, and sensory styling', 'artistic', 5, 4 FROM public.questions WHERE code = 'Q02'
UNION ALL
SELECT id, 'Compassionate one-on-one mentoring, teaching, or healthcare guidance', 'social', 5, 5 FROM public.questions WHERE code = 'Q02'
ON CONFLICT DO NOTHING;

-- Options for Q03
INSERT INTO public.question_options (question_id, option_text, trait_key, score_value, order_index)
SELECT id, 'Through interactive dashboards, reproducible code repositories, and technical memos', 'investigative', 5, 1 FROM public.questions WHERE code = 'Q03'
UNION ALL
SELECT id, 'Through persuasive executive pitches, pitchbooks, and strategy presentations', 'enterprising', 5, 2 FROM public.questions WHERE code = 'Q03'
UNION ALL
SELECT id, 'Through high-fidelity visual walkthroughs, interactive prototypes, and design stories', 'artistic', 5, 3 FROM public.questions WHERE code = 'Q03'
UNION ALL
SELECT id, 'Through formal legal briefs, statutory citations, and structured argumentation', 'investigative', 5, 4 FROM public.questions WHERE code = 'Q03'
UNION ALL
SELECT id, 'Through empathetic workshops, personal consultations, and supportive tutorials', 'social', 5, 5 FROM public.questions WHERE code = 'Q03'
ON CONFLICT DO NOTHING;

-- Options for Q04
INSERT INTO public.question_options (question_id, option_text, trait_key, score_value, order_index)
SELECT id, 'Building scalable technologies that automate tasks and empower millions', 'investigative', 5, 1 FROM public.questions WHERE code = 'Q04'
UNION ALL
SELECT id, 'Fostering human well-being, saving lives, or nurturing individual potential', 'social', 5, 2 FROM public.questions WHERE code = 'Q04'
UNION ALL
SELECT id, 'Creating profitable economic ventures, financial stability, and market value', 'enterprising', 5, 3 FROM public.questions WHERE code = 'Q04'
UNION ALL
SELECT id, 'Designing beautiful, memorable experiences that inspire and delight people', 'artistic', 5, 4 FROM public.questions WHERE code = 'Q04'
UNION ALL
SELECT id, 'Building durable physical infrastructure that protects the environment and communities', 'realistic', 5, 5 FROM public.questions WHERE code = 'Q04'
ON CONFLICT DO NOTHING;

-- Options for Q05
INSERT INTO public.question_options (question_id, option_text, trait_key, score_value, order_index)
SELECT id, 'The technical architect: ensuring correctness, system stability, and architecture', 'investigative', 5, 1 FROM public.questions WHERE code = 'Q05'
UNION ALL
SELECT id, 'The project leader: setting milestones, pitching the vision, and driving results', 'enterprising', 5, 2 FROM public.questions WHERE code = 'Q05'
UNION ALL
SELECT id, 'The creative lead: polishing aesthetics, user experience, and visual harmony', 'artistic', 5, 3 FROM public.questions WHERE code = 'Q05'
UNION ALL
SELECT id, 'The mediator and mentor: keeping team morale high, active listening, and teaching', 'social', 5, 4 FROM public.questions WHERE code = 'Q05'
UNION ALL
SELECT id, 'The analytical reviewer: auditing calculations, verifying evidence, and risk analysis', 'conventional', 5, 5 FROM public.questions WHERE code = 'Q05'
ON CONFLICT DO NOTHING;

-- ----------------------------------------------------------------------------
-- 6. SEED FOUNDATIONAL COURSES
-- ----------------------------------------------------------------------------
INSERT INTO public.courses (title, provider, url, description, difficulty_level, duration_hours, is_active) VALUES
('Full Stack Web Development with React & TypeScript', 'freeCodeCamp & OpenCourseWare', 'https://www.freecodecamp.org/', 'Comprehensive guide to building production React apps, TypeScript typing, and REST/GraphQL APIs.', 'intermediate', 45, true),
('Applied Machine Learning and Data Science in Python', 'University Open Learning', 'https://ocw.mit.edu/', 'Practical machine learning: feature engineering, scikit-learn, regression, classification, and validation.', 'intermediate', 50, true),
('Introduction to Cloud Architecture & AWS Services', 'AWS Educate', 'https://aws.amazon.com/education/', 'Learn core compute, storage, networking, IAM security policies, and cost-effective cloud design.', 'beginner', 30, true),
('Figma for UI/UX Design: From Wireframe to Interactive Prototype', 'DesignLab Open Guide', 'https://www.figma.com/resource-library/', 'Master typography, color harmony, responsive autolayout, components, and user testing methodology.', 'beginner', 25, true),
('Financial Statement Analysis & DCF Valuation', 'Corporate Finance Institute', 'https://corporatefinanceinstitute.com/', 'Deconstruct balance sheets, cash flow statements, and build discounted cash flow financial models.', 'intermediate', 35, true),
('Cybersecurity Fundamentals: Network Defense & Threats', 'Cisco Networking Academy', 'https://www.netacad.com/', 'Understanding cryptographic primitives, perimeter defense, intrusion detection, and incident response.', 'beginner', 40, true),
('Clinical Healthcare Communication & Medical Ethics', 'Open University Health', 'https://www.open.edu/', 'Essential empathetic patient interaction, medical confidentiality, HIPAA standards, and clinical care.', 'beginner', 20, true),
('Parametric 3D CAD Modeling & Engineering Simulation', 'Autodesk Design Academy', 'https://academy.autodesk.com/', 'Design solid models, assemblies, dimensional tolerances, and execute mechanical stress analysis.', 'intermediate', 40, true)
ON CONFLICT DO NOTHING;
