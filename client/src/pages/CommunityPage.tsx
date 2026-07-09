import React from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function CommunityPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600 dark:text-[#2563EB]" />
          Community Intel
        </h1>
      </div>
      
      <div className="skeuo-card p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Trending Scams in your Region</h2>
        <div className="space-y-4">
          {[
            { title: "Fake Delivery SMS", risk: "High", time: "2h ago", icon: AlertTriangle, color: "text-red-500" },
            { title: "Bank KYC Call", risk: "Medium", time: "5h ago", icon: AlertTriangle, color: "text-orange-500" },
            { title: "Investment Telegram Group", risk: "Low", time: "1d ago", icon: ShieldCheck, color: "text-blue-500" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#171717] border border-slate-200 dark:border-[#232323] rounded-xl">
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-[#A3A3A3]">{item.time}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                item.risk === 'High' ? 'bg-red-100 text-red-600 dark:bg-[#EF4444]/20 dark:text-[#EF4444]' :
                item.risk === 'Medium' ? 'bg-orange-100 text-orange-600 dark:bg-[#F59E0B]/20 dark:text-[#F59E0B]' :
                'bg-blue-100 text-blue-600 dark:bg-[#2563EB]/20 dark:text-[#2563EB]'
              }`}>
                {item.risk} Risk
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
