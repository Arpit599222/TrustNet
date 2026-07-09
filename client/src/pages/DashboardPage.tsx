import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Scan, ShieldAlert, CheckCircle, Activity, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      
      {/* Overview & Trust Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 skeuo-card p-8 flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Your Security Overview</h2>
            <p className="text-slate-500 dark:text-[#A3A3A3] max-w-md mb-6">
              TrustNet is actively monitoring your digital footprint. No imminent threats detected in the last 24 hours.
            </p>
            <div className="flex gap-4">
              <Link to="/scanner" className="skeuo-button-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                <Scan className="w-5 h-5" /> Quick Scan
              </Link>
              <Link to="/reports" className="skeuo-button-secondary px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                View Reports
              </Link>
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute right-0 bottom-0 opacity-10 dark:opacity-5 pointer-events-none">
            <ShieldCheck className="w-64 h-64 -mr-16 -mb-16" />
          </div>
        </div>

        <div className="skeuo-card p-8 flex flex-col items-center justify-center text-center">
          <div className="text-sm font-bold text-slate-500 dark:text-[#A3A3A3] uppercase tracking-wider mb-4">Overall Trust Score</div>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-100 dark:text-[#171717]" />
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="25.12" className="text-green-500 dark:text-[#22C55E]" strokeLinecap="round" />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-slate-900 dark:text-white">90</span>
              <span className="text-xs font-bold text-green-500 dark:text-[#22C55E]">Excellent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Scan URL', desc: 'Check a link for phishing', icon: Globe, path: '/scanner', color: 'text-blue-500' },
            { title: 'Verify News', desc: 'Check article authenticity', icon: ShieldCheck, path: '/scanner', color: 'text-green-500' },
            { title: 'Community Alerts', desc: 'View trending scams', icon: ShieldAlert, path: '/community', color: 'text-orange-500' },
            { title: 'System Health', desc: 'View active protections', icon: Activity, path: '/reports', color: 'text-purple-500' },
          ].map((action, i) => (
            <Link key={i} to={action.path} className="skeuo-card p-4 flex items-center gap-4 group hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-[#171717] border border-slate-100 dark:border-[#232323] flex items-center justify-center group-hover:scale-110 transition-transform">
                <action.icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#2563EB] transition-colors">{action.title}</h4>
                <p className="text-xs text-slate-500 dark:text-[#A3A3A3]">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
