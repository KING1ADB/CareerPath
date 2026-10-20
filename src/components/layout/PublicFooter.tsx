import { Logo } from '@/components/common/Logo';
import { Compass, GraduationCap, Heart, ShieldCheck } from 'lucide-react';
import React from 'react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Career<span className="text-teal-400">Path</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Discover. Plan. Grow. An explainable, rule-based career guidance platform designed for university students to align competencies, interests, and academic strengths with demonstrable professional trajectories.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <GraduationCap className="h-4 w-4" />
              <span>Master's Degree Defense Project &amp; Future SaaS Platform</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-teal-400 transition-colors">Recommendation Model</a></li>
              <li><a href="#careers" className="hover:text-teal-400 transition-colors">Career Pathways</a></li>
              <li><a href="#gap-analysis" className="hover:text-teal-400 transition-colors">Skill-Gap Analysis</a></li>
              <li><a href="#defense-notes" className="hover:text-teal-400 transition-colors">Academic Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Security &amp; Ethics</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>PostgreSQL Row Level Security</span>
              </li>
              <li><span>Zero-Trust Student Isolation</span></li>
              <li><span>Transparent Algorithmic Weighting</span></li>
              <li><span>Illustrative Benchmark Data</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CareerPath. Built for Master's Degree Demonstration.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="h-3.5 w-3.5 text-teal-500" /> for University Student Success
          </p>
        </div>
      </div>
    </footer>
  );
};
