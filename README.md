# CareerPath — Web-based Career Guidance and Recommendation System

> **Discover. Plan. Grow.**  
> Master's Degree Defense Project & Future Production SaaS Application.

---

## 🧭 Executive Overview

**CareerPath** is a web-based career guidance platform designed specifically for university students. Addressing the limitations of generic or black-box guidance tools, CareerPath implements a **transparent, deterministic, and explainable recommendation algorithm** that aligns students' self-assessed technical/soft competencies, Holland RIASEC passion areas, and academic strengths with demonstrable professional trajectories.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19 + TypeScript + Vite | High-performance modular SPA architecture |
| **Styling** | Tailwind CSS + shadcn/ui design tokens | Professional Navy & Teal SaaS aesthetic |
| **Routing** | React Router v7 | Protected routing with Role-Based Access Control (RBAC) |
| **State & Auth** | React Context + Supabase Auth | Session lifecycle, user profile state, and zero-trust guards |
| **Database** | Supabase PostgreSQL | Normalized relational schema (25 tables) with strict RLS |
| **Testing** | Vitest + Testing Library | Unit, component, and RBAC authorization verification |
| **Form Validation**| React Hook Form + Zod | Strict schema-driven client input validation |
| **Analytics & Reports** | Recharts + jsPDF | Analytical dashboards and defense audit reports |

---

## 🏛️ System Architecture & Formula Specification

### Deterministic Recommendation Engine
Recommendations are governed by versioned weight coefficients (`recommendation_rule_versions`):

$$\text{Score} = 0.40S + 0.30I + 0.20A + 0.10P$$

- **$S$ (Skills Compatibility — 40%):** Weighted comparison between student's proficiency (1–5) and career required competency levels.
- **$I$ (Interests Compatibility — 30%):** Holland RIASEC alignment across Realistic, Investigative, Artistic, Social, Enterprising, and Conventional themes.
- **$A$ (Academic Strengths — 20%):** Self-reported course performance in relevant academic disciplines.
- **$P$ (Work Personality — 10%):** Cognitive problem-solving style, team role preferences, and workplace value orientations.

---

## 🗄️ Database Design & Versioned Migrations

All DDL definitions and security triggers are versioned under `supabase/migrations/`:

1. `20261020000001_initial_schema.sql`:
   - 25 normalized tables with UUID primary keys, foreign keys, and indexes.
   - Core tables: `profiles`, `skills`, `student_skills`, `interests`, `student_interests`, `academic_strengths`, `student_academic_strengths`, `careers`, `career_skills`, `career_interests`, `career_academic_strengths`, `questions`, `question_options`, `recommendation_rule_versions`, `assessments`, `assessment_answers`, `assessment_skill_snapshots`, `assessment_interest_snapshots`, `assessment_academic_snapshots`, `recommendations`, `recommendation_explanations`, `courses`, `course_skills`, `career_courses`, `feedback`.
   - `handle_new_user()` trigger auto-provisions a `student` profile on auth signup.
2. `20261020000002_rls_policies.sql`:
   - Full Row Level Security (RLS) enabled on every single table.
   - `is_admin()` PostgreSQL security-definer helper function.
   - Multi-tenant student privacy isolation: Students can only read/write their own profiles, assessment snapshots, and feedback.
   - Public registration cannot escalate roles (`prevent_role_escalation()` trigger).
3. `20261020000003_seed_data.sql`:
   - 20 diverse, realistic career profiles across Technology, Finance, Business, Healthcare, Engineering, Design, Law, and Education.
   - 23 foundational skills, 12 RIASEC interests, 9 academic disciplines, questionnaire options, and foundational courses.
   - All salary figures are explicitly labeled as illustrative estimates.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v24 LTS recommended)
- **npm**: v9.0.0 or higher

### 2. Installation
```bash
git clone https://github.com/KING1ADB/CareerPath.git
cd CareerPath
npm install --legacy-peer-deps
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate your Supabase project credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
*(Note: If left with default placeholders, CareerPath automatically activates an interactive local demonstration sandbox for defense evaluations).*

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Running the Automated Test Suite
```bash
npm test
```
Executes Vitest unit tests, RBAC authorization barriers, and public navigation tests.

### 6. Building for Production
```bash
npm run build
```
Typechecks via `tsc -b` and produces optimized bundles in `dist/`.

---

## 👤 User Roles & Thesis Defense Quick Demonstration

| Role | Default Email | Default Password | Access Scope |
|---|---|---|---|
| **Student** | `student@careerpath.edu` | `demo1234` | Profile, Assessment, Recommendations, Skill-Gap Analysis, History, Feedback |
| **Administrator** | `admin@careerpath.edu` | `demo1234` | Career Management, Taxonomy, Recommendation Rules, Course Registry, Feedback Analytics |

*Tip for thesis reviewers:* The login screen includes 1-click **Student Demo** and **Admin Demo** pre-fill buttons, and both dashboard layouts provide an instant role-switcher in the top header.

---

## 📅 Roadmap & Phase Status

- [x] **Phase 1: Project Initialization, Routing, Design System, Database Migrations, RLS & Dashboards (COMPLETED)**
- [ ] **Phase 2: Student Profile, Skills Inventory, Interests, Academic Strengths & Questionnaire**
- [ ] **Phase 3: Server-Side Recommendation Engine, Weighted Scoring, Ranked Results & Explanations**
- [ ] **Phase 4: Career Catalogue, Career Details, Skill-Gap Analysis & Course Suggestions**
- [ ] **Phase 5: Assessment History, PDF Reports, Admin Features, Feedback & Analytics**
- [ ] **Phase 6: Testing, Deployment, Academic Documentation & Defense Preparation**

---

## 📄 License
MIT License. Copyright (c) 2026 King ADB.
