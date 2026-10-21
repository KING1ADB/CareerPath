-- ============================================================================
-- CareerPath Career Requirements Matrix Migration (20261020000004_career_requirements.sql)
-- Discover. Plan. Grow.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. SEED CAREER SKILLS (Requirements & Importance Weights)
-- ----------------------------------------------------------------------------

-- Software Engineer
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'software-engineer' AND s.name = 'JavaScript / TypeScript'
UNION ALL
SELECT c.id, s.id, 0.90, 3, true FROM public.careers c, public.skills s WHERE c.slug = 'software-engineer' AND s.name = 'Python Programming'
UNION ALL
SELECT c.id, s.id, 0.85, 3, true FROM public.careers c, public.skills s WHERE c.slug = 'software-engineer' AND s.name = 'SQL & Relational Databases'
UNION ALL
SELECT c.id, s.id, 0.80, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'software-engineer' AND s.name = 'Cloud Computing (AWS/GCP/Azure)'
UNION ALL
SELECT c.id, s.id, 0.70, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'software-engineer' AND s.name = 'Cross-Functional Communication'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Data Scientist
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'data-scientist' AND s.name = 'Python Programming'
UNION ALL
SELECT c.id, s.id, 1.00, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'data-scientist' AND s.name = 'Machine Learning & Statistics'
UNION ALL
SELECT c.id, s.id, 0.90, 3, true FROM public.careers c, public.skills s WHERE c.slug = 'data-scientist' AND s.name = 'SQL & Relational Databases'
UNION ALL
SELECT c.id, s.id, 0.85, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'data-scientist' AND s.name = 'Statistical Hypothesis Testing'
UNION ALL
SELECT c.id, s.id, 0.80, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'data-scientist' AND s.name = 'Data Visualization (Tableau/PowerBI)'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Cybersecurity Analyst
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'cybersecurity-analyst' AND s.name = 'Network Security & Protocols'
UNION ALL
SELECT c.id, s.id, 0.85, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'cybersecurity-analyst' AND s.name = 'Root Cause Problem Solving'
UNION ALL
SELECT c.id, s.id, 0.80, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'cybersecurity-analyst' AND s.name = 'Cloud Computing (AWS/GCP/Azure)'
UNION ALL
SELECT c.id, s.id, 0.75, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'cybersecurity-analyst' AND s.name = 'Python Programming'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Cloud Solutions Architect
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'cloud-solutions-architect' AND s.name = 'Cloud Computing (AWS/GCP/Azure)'
UNION ALL
SELECT c.id, s.id, 0.90, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'cloud-solutions-architect' AND s.name = 'Network Security & Protocols'
UNION ALL
SELECT c.id, s.id, 0.85, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'cloud-solutions-architect' AND s.name = 'SQL & Relational Databases'
UNION ALL
SELECT c.id, s.id, 0.85, 4, false FROM public.careers c, public.skills s WHERE c.slug = 'cloud-solutions-architect' AND s.name = 'Cross-Functional Communication'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- UI/UX Designer
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'ui-ux-designer' AND s.name = 'UI/UX Prototyping (Figma)'
UNION ALL
SELECT c.id, s.id, 0.90, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'ui-ux-designer' AND s.name = 'Cross-Functional Communication'
UNION ALL
SELECT c.id, s.id, 0.75, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'ui-ux-designer' AND s.name = 'Root Cause Problem Solving'
UNION ALL
SELECT c.id, s.id, 0.60, 2, false FROM public.careers c, public.skills s WHERE c.slug = 'ui-ux-designer' AND s.name = 'JavaScript / TypeScript'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Financial Analyst
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'financial-analyst' AND s.name = 'Quantitative Financial Modeling'
UNION ALL
SELECT c.id, s.id, 0.90, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'financial-analyst' AND s.name = 'Financial Accounting & Reporting'
UNION ALL
SELECT c.id, s.id, 0.80, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'financial-analyst' AND s.name = 'Data Visualization (Tableau/PowerBI)'
UNION ALL
SELECT c.id, s.id, 0.75, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'financial-analyst' AND s.name = 'SQL & Relational Databases'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Investment Banking Analyst
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'investment-banking-analyst' AND s.name = 'Quantitative Financial Modeling'
UNION ALL
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'investment-banking-analyst' AND s.name = 'Financial Accounting & Reporting'
UNION ALL
SELECT c.id, s.id, 0.85, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'investment-banking-analyst' AND s.name = 'Cross-Functional Communication'
UNION ALL
SELECT c.id, s.id, 0.80, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'investment-banking-analyst' AND s.name = 'Contract Negotiation & Governance'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Management Consultant
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'management-consultant' AND s.name = 'Cross-Functional Communication'
UNION ALL
SELECT c.id, s.id, 1.00, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'management-consultant' AND s.name = 'Strategic Market Analysis'
UNION ALL
SELECT c.id, s.id, 0.95, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'management-consultant' AND s.name = 'Root Cause Problem Solving'
UNION ALL
SELECT c.id, s.id, 0.80, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'management-consultant' AND s.name = 'Agile & Scrum Project Management'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Product Manager
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'product-manager' AND s.name = 'Cross-Functional Communication'
UNION ALL
SELECT c.id, s.id, 0.95, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'product-manager' AND s.name = 'Agile & Scrum Project Management'
UNION ALL
SELECT c.id, s.id, 0.90, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'product-manager' AND s.name = 'Strategic Market Analysis'
UNION ALL
SELECT c.id, s.id, 0.75, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'product-manager' AND s.name = 'UI/UX Prototyping (Figma)'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Digital Marketing Strategist
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'digital-marketing-strategist' AND s.name = 'Strategic Market Analysis'
UNION ALL
SELECT c.id, s.id, 0.90, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'digital-marketing-strategist' AND s.name = 'Cross-Functional Communication'
UNION ALL
SELECT c.id, s.id, 0.80, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'digital-marketing-strategist' AND s.name = 'Data Visualization (Tableau/PowerBI)'
UNION ALL
SELECT c.id, s.id, 0.70, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'digital-marketing-strategist' AND s.name = 'UI/UX Prototyping (Figma)'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Mechanical Engineer
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'mechanical-engineer' AND s.name = 'CAD & Simulation (SolidWorks/AutoCAD)'
UNION ALL
SELECT c.id, s.id, 0.90, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'mechanical-engineer' AND s.name = 'Root Cause Problem Solving'
UNION ALL
SELECT c.id, s.id, 0.75, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'mechanical-engineer' AND s.name = 'Statistical Hypothesis Testing'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Civil & Environmental Engineer
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 0.95, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'civil-environmental-engineer' AND s.name = 'CAD & Simulation (SolidWorks/AutoCAD)'
UNION ALL
SELECT c.id, s.id, 0.90, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'civil-environmental-engineer' AND s.name = 'Root Cause Problem Solving'
UNION ALL
SELECT c.id, s.id, 0.75, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'civil-environmental-engineer' AND s.name = 'Supply Chain Optimization'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Biomedical Engineer
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 0.95, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'biomedical-engineer' AND s.name = 'CAD & Simulation (SolidWorks/AutoCAD)'
UNION ALL
SELECT c.id, s.id, 0.85, 3, true FROM public.careers c, public.skills s WHERE c.slug = 'biomedical-engineer' AND s.name = 'Machine Learning & Statistics'
UNION ALL
SELECT c.id, s.id, 0.85, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'biomedical-engineer' AND s.name = 'Root Cause Problem Solving'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Registered Clinical Nurse
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'registered-clinical-nurse' AND s.name = 'Empathy & Patient Care'
UNION ALL
SELECT c.id, s.id, 0.95, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'registered-clinical-nurse' AND s.name = 'Cross-Functional Communication'
UNION ALL
SELECT c.id, s.id, 0.80, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'registered-clinical-nurse' AND s.name = 'EHR & Health Informatics Systems'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Health Informatics Specialist
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'health-informatics-specialist' AND s.name = 'EHR & Health Informatics Systems'
UNION ALL
SELECT c.id, s.id, 0.90, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'health-informatics-specialist' AND s.name = 'SQL & Relational Databases'
UNION ALL
SELECT c.id, s.id, 0.80, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'health-informatics-specialist' AND s.name = 'Data Visualization (Tableau/PowerBI)'
UNION ALL
SELECT c.id, s.id, 0.70, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'health-informatics-specialist' AND s.name = 'Network Security & Protocols'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Corporate Legal Counsel
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'corporate-legal-counsel' AND s.name = 'Legal Research & Statutory Analysis'
UNION ALL
SELECT c.id, s.id, 1.00, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'corporate-legal-counsel' AND s.name = 'Contract Negotiation & Governance'
UNION ALL
SELECT c.id, s.id, 0.95, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'corporate-legal-counsel' AND s.name = 'Critical Thinking & Debate'
UNION ALL
SELECT c.id, s.id, 0.90, 4, false FROM public.careers c, public.skills s WHERE c.slug = 'corporate-legal-counsel' AND s.name = 'Cross-Functional Communication'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Intellectual Property Specialist
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'intellectual-property-specialist' AND s.name = 'Legal Research & Statutory Analysis'
UNION ALL
SELECT c.id, s.id, 0.90, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'intellectual-property-specialist' AND s.name = 'Critical Thinking & Debate'
UNION ALL
SELECT c.id, s.id, 0.80, 4, false FROM public.careers c, public.skills s WHERE c.slug = 'intellectual-property-specialist' AND s.name = 'Cross-Functional Communication'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Academic Advisor & Counselor
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'academic-advisor' AND s.name = 'Pedagogical Coaching & Mentorship'
UNION ALL
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'academic-advisor' AND s.name = 'Cross-Functional Communication'
UNION ALL
SELECT c.id, s.id, 0.90, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'academic-advisor' AND s.name = 'Empathy & Patient Care'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Instructional Designer
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'instructional-designer' AND s.name = 'Pedagogical Coaching & Mentorship'
UNION ALL
SELECT c.id, s.id, 0.90, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'instructional-designer' AND s.name = 'Cross-Functional Communication'
UNION ALL
SELECT c.id, s.id, 0.85, 3, true FROM public.careers c, public.skills s WHERE c.slug = 'instructional-designer' AND s.name = 'UI/UX Prototyping (Figma)'
ON CONFLICT (career_id, skill_id) DO NOTHING;

-- Supply Chain & Operations Manager
INSERT INTO public.career_skills (career_id, skill_id, importance_weight, required_proficiency, is_required)
SELECT c.id, s.id, 1.00, 5, true FROM public.careers c, public.skills s WHERE c.slug = 'supply-chain-manager' AND s.name = 'Supply Chain Optimization'
UNION ALL
SELECT c.id, s.id, 0.85, 4, true FROM public.careers c, public.skills s WHERE c.slug = 'supply-chain-manager' AND s.name = 'Agile & Scrum Project Management'
UNION ALL
SELECT c.id, s.id, 0.80, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'supply-chain-manager' AND s.name = 'SQL & Relational Databases'
UNION ALL
SELECT c.id, s.id, 0.80, 3, false FROM public.careers c, public.skills s WHERE c.slug = 'supply-chain-manager' AND s.name = 'Contract Negotiation & Governance'
ON CONFLICT (career_id, skill_id) DO NOTHING;


-- ----------------------------------------------------------------------------
-- 2. SEED CAREER INTERESTS (Holland RIASEC Weights)
-- ----------------------------------------------------------------------------

-- Software Engineer
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'software-engineer' AND i.name = 'Software Architecture & Coding'
UNION ALL
SELECT c.id, i.id, 0.75 FROM public.careers c, public.interests i WHERE c.slug = 'software-engineer' AND i.name = 'Cyber Defense & Forensics'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Data Scientist
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'data-scientist' AND i.name = 'Data Science & Statistical Inquiry'
UNION ALL
SELECT c.id, i.id, 0.80 FROM public.careers c, public.interests i WHERE c.slug = 'data-scientist' AND i.name = 'Software Architecture & Coding'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Cybersecurity Analyst
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'cybersecurity-analyst' AND i.name = 'Cyber Defense & Forensics'
UNION ALL
SELECT c.id, i.id, 0.80 FROM public.careers c, public.interests i WHERE c.slug = 'cybersecurity-analyst' AND i.name = 'Software Architecture & Coding'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Cloud Solutions Architect
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'cloud-solutions-architect' AND i.name = 'Software Architecture & Coding'
UNION ALL
SELECT c.id, i.id, 0.85 FROM public.careers c, public.interests i WHERE c.slug = 'cloud-solutions-architect' AND i.name = 'Entrepreneurship & Product Innovation'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- UI/UX Designer
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'ui-ux-designer' AND i.name = 'Creative Visual Design & Ergonomics'
UNION ALL
SELECT c.id, i.id, 0.80 FROM public.careers c, public.interests i WHERE c.slug = 'ui-ux-designer' AND i.name = 'Entrepreneurship & Product Innovation'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Financial Analyst
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'financial-analyst' AND i.name = 'Financial Markets & Investment'
UNION ALL
SELECT c.id, i.id, 0.75 FROM public.careers c, public.interests i WHERE c.slug = 'financial-analyst' AND i.name = 'Data Science & Statistical Inquiry'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Investment Banking Analyst
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'investment-banking-analyst' AND i.name = 'Financial Markets & Investment'
UNION ALL
SELECT c.id, i.id, 0.85 FROM public.careers c, public.interests i WHERE c.slug = 'investment-banking-analyst' AND i.name = 'Entrepreneurship & Product Innovation'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Management Consultant
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'management-consultant' AND i.name = 'Entrepreneurship & Product Innovation'
UNION ALL
SELECT c.id, i.id, 0.85 FROM public.careers c, public.interests i WHERE c.slug = 'management-consultant' AND i.name = 'Financial Markets & Investment'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Product Manager
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'product-manager' AND i.name = 'Entrepreneurship & Product Innovation'
UNION ALL
SELECT c.id, i.id, 0.80 FROM public.careers c, public.interests i WHERE c.slug = 'product-manager' AND i.name = 'Software Architecture & Coding'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Digital Marketing Strategist
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 0.95 FROM public.careers c, public.interests i WHERE c.slug = 'digital-marketing-strategist' AND i.name = 'Entrepreneurship & Product Innovation'
UNION ALL
SELECT c.id, i.id, 0.90 FROM public.careers c, public.interests i WHERE c.slug = 'digital-marketing-strategist' AND i.name = 'Creative Visual Design & Ergonomics'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Mechanical Engineer
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'mechanical-engineer' AND i.name = 'Mechanical Systems & Hardware'
UNION ALL
SELECT c.id, i.id, 0.70 FROM public.careers c, public.interests i WHERE c.slug = 'mechanical-engineer' AND i.name = 'Environmental & Structural Planning'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Civil & Environmental Engineer
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'civil-environmental-engineer' AND i.name = 'Environmental & Structural Planning'
UNION ALL
SELECT c.id, i.id, 0.80 FROM public.careers c, public.interests i WHERE c.slug = 'civil-environmental-engineer' AND i.name = 'Mechanical Systems & Hardware'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Biomedical Engineer
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'biomedical-engineer' AND i.name = 'Healthcare Delivery & Patient Well-being'
UNION ALL
SELECT c.id, i.id, 0.85 FROM public.careers c, public.interests i WHERE c.slug = 'biomedical-engineer' AND i.name = 'Mechanical Systems & Hardware'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Registered Clinical Nurse
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'registered-clinical-nurse' AND i.name = 'Healthcare Delivery & Patient Well-being'
UNION ALL
SELECT c.id, i.id, 0.75 FROM public.careers c, public.interests i WHERE c.slug = 'registered-clinical-nurse' AND i.name = 'Education & Mentorship'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Health Informatics Specialist
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 0.95 FROM public.careers c, public.interests i WHERE c.slug = 'health-informatics-specialist' AND i.name = 'Healthcare Delivery & Patient Well-being'
UNION ALL
SELECT c.id, i.id, 0.90 FROM public.careers c, public.interests i WHERE c.slug = 'health-informatics-specialist' AND i.name = 'Data Science & Statistical Inquiry'
UNION ALL
SELECT c.id, i.id, 0.75 FROM public.careers c, public.interests i WHERE c.slug = 'health-informatics-specialist' AND i.name = 'Logistics & Operational Order'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Corporate Legal Counsel
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'corporate-legal-counsel' AND i.name = 'Legal Advocacy & Ethics'
UNION ALL
SELECT c.id, i.id, 0.80 FROM public.careers c, public.interests i WHERE c.slug = 'corporate-legal-counsel' AND i.name = 'Entrepreneurship & Product Innovation'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Intellectual Property Specialist
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'intellectual-property-specialist' AND i.name = 'Legal Advocacy & Ethics'
UNION ALL
SELECT c.id, i.id, 0.85 FROM public.careers c, public.interests i WHERE c.slug = 'intellectual-property-specialist' AND i.name = 'Software Architecture & Coding'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Academic Advisor & Counselor
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'academic-advisor' AND i.name = 'Education & Mentorship'
UNION ALL
SELECT c.id, i.id, 0.80 FROM public.careers c, public.interests i WHERE c.slug = 'academic-advisor' AND i.name = 'Healthcare Delivery & Patient Well-being'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Instructional Designer
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'instructional-designer' AND i.name = 'Education & Mentorship'
UNION ALL
SELECT c.id, i.id, 0.85 FROM public.careers c, public.interests i WHERE c.slug = 'instructional-designer' AND i.name = 'Creative Visual Design & Ergonomics'
ON CONFLICT (career_id, interest_id) DO NOTHING;

-- Supply Chain & Operations Manager
INSERT INTO public.career_interests (career_id, interest_id, weight)
SELECT c.id, i.id, 1.00 FROM public.careers c, public.interests i WHERE c.slug = 'supply-chain-manager' AND i.name = 'Logistics & Operational Order'
UNION ALL
SELECT c.id, i.id, 0.80 FROM public.careers c, public.interests i WHERE c.slug = 'supply-chain-manager' AND i.name = 'Entrepreneurship & Product Innovation'
ON CONFLICT (career_id, interest_id) DO NOTHING;


-- ----------------------------------------------------------------------------
-- 3. SEED CAREER ACADEMIC STRENGTHS (Discipline Weights)
-- ----------------------------------------------------------------------------

-- Software Engineer
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'software-engineer' AND a.name = 'Computer Science Principles'
UNION ALL
SELECT c.id, a.id, 0.80 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'software-engineer' AND a.name = 'Advanced Mathematics & Calculus'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Data Scientist
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'data-scientist' AND a.name = 'Statistics & Probability'
UNION ALL
SELECT c.id, a.id, 0.90 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'data-scientist' AND a.name = 'Advanced Mathematics & Calculus'
UNION ALL
SELECT c.id, a.id, 0.85 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'data-scientist' AND a.name = 'Computer Science Principles'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Cybersecurity Analyst
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'cybersecurity-analyst' AND a.name = 'Computer Science Principles'
UNION ALL
SELECT c.id, a.id, 0.75 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'cybersecurity-analyst' AND a.name = 'Statistics & Probability'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Cloud Solutions Architect
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'cloud-solutions-architect' AND a.name = 'Computer Science Principles'
UNION ALL
SELECT c.id, a.id, 0.75 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'cloud-solutions-architect' AND a.name = 'Advanced Mathematics & Calculus'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- UI/UX Designer
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'ui-ux-designer' AND a.name = 'Design Theory & Human-Computer Interaction'
UNION ALL
SELECT c.id, a.id, 0.75 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'ui-ux-designer' AND a.name = 'Written Rhetoric & Technical Composition'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Financial Analyst
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'financial-analyst' AND a.name = 'Corporate Finance & Economics'
UNION ALL
SELECT c.id, a.id, 0.85 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'financial-analyst' AND a.name = 'Statistics & Probability'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Investment Banking Analyst
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'investment-banking-analyst' AND a.name = 'Corporate Finance & Economics'
UNION ALL
SELECT c.id, a.id, 0.85 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'investment-banking-analyst' AND a.name = 'Advanced Mathematics & Calculus'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Management Consultant
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 0.95 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'management-consultant' AND a.name = 'Corporate Finance & Economics'
UNION ALL
SELECT c.id, a.id, 0.90 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'management-consultant' AND a.name = 'Written Rhetoric & Technical Composition'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Product Manager
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 0.85 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'product-manager' AND a.name = 'Computer Science Principles'
UNION ALL
SELECT c.id, a.id, 0.85 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'product-manager' AND a.name = 'Design Theory & Human-Computer Interaction'
UNION ALL
SELECT c.id, a.id, 0.80 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'product-manager' AND a.name = 'Corporate Finance & Economics'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Digital Marketing Strategist
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'digital-marketing-strategist' AND a.name = 'Written Rhetoric & Technical Composition'
UNION ALL
SELECT c.id, a.id, 0.80 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'digital-marketing-strategist' AND a.name = 'Statistics & Probability'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Mechanical Engineer
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'mechanical-engineer' AND a.name = 'Physics & Mechanics'
UNION ALL
SELECT c.id, a.id, 0.90 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'mechanical-engineer' AND a.name = 'Advanced Mathematics & Calculus'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Civil & Environmental Engineer
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'civil-environmental-engineer' AND a.name = 'Physics & Mechanics'
UNION ALL
SELECT c.id, a.id, 0.90 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'civil-environmental-engineer' AND a.name = 'Advanced Mathematics & Calculus'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Biomedical Engineer
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'biomedical-engineer' AND a.name = 'Biological Sciences & Anatomy'
UNION ALL
SELECT c.id, a.id, 0.90 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'biomedical-engineer' AND a.name = 'Physics & Mechanics'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Registered Clinical Nurse
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'registered-clinical-nurse' AND a.name = 'Biological Sciences & Anatomy'
UNION ALL
SELECT c.id, a.id, 0.75 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'registered-clinical-nurse' AND a.name = 'Written Rhetoric & Technical Composition'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Health Informatics Specialist
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 0.90 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'health-informatics-specialist' AND a.name = 'Biological Sciences & Anatomy'
UNION ALL
SELECT c.id, a.id, 0.85 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'health-informatics-specialist' AND a.name = 'Computer Science Principles'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Corporate Legal Counsel
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'corporate-legal-counsel' AND a.name = 'Legal Studies & Jurisprudence'
UNION ALL
SELECT c.id, a.id, 0.95 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'corporate-legal-counsel' AND a.name = 'Written Rhetoric & Technical Composition'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Intellectual Property Specialist
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'intellectual-property-specialist' AND a.name = 'Legal Studies & Jurisprudence'
UNION ALL
SELECT c.id, a.id, 0.85 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'intellectual-property-specialist' AND a.name = 'Computer Science Principles'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Academic Advisor & Counselor
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 0.95 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'academic-advisor' AND a.name = 'Written Rhetoric & Technical Composition'
UNION ALL
SELECT c.id, a.id, 0.80 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'academic-advisor' AND a.name = 'Legal Studies & Jurisprudence'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Instructional Designer
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 1.00 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'instructional-designer' AND a.name = 'Design Theory & Human-Computer Interaction'
UNION ALL
SELECT c.id, a.id, 0.90 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'instructional-designer' AND a.name = 'Written Rhetoric & Technical Composition'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;

-- Supply Chain & Operations Manager
INSERT INTO public.career_academic_strengths (career_id, academic_strength_id, weight)
SELECT c.id, a.id, 0.90 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'supply-chain-manager' AND a.name = 'Corporate Finance & Economics'
UNION ALL
SELECT c.id, a.id, 0.85 FROM public.careers c, public.academic_strengths a WHERE c.slug = 'supply-chain-manager' AND a.name = 'Statistics & Probability'
ON CONFLICT (career_id, academic_strength_id) DO NOTHING;
