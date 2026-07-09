import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Clock } from 'lucide-react';

export default function ReportsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600 dark:text-[#2563EB]" />
          Scan Reports
        </h1>
        <button className="skeuo-button-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export All
        </button>
      </div>

      <div className="skeuo-card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-[#0B0B0B] border-b border-slate-200 dark:border-[#232323] text-slate-500 dark:text-[#A3A3A3]">
            <tr>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Target</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#232323]">
            {[
              { date: "Today, 10:45 AM", type: "URL Scan", target: "bit.ly/claim-prize", status: "Malicious" },
              { date: "Yesterday, 2:30 PM", type: "SMS Scan", target: "Dear customer...", status: "Safe" },
              { date: "Oct 12, 09:15 AM", type: "Image Scan", target: "invoice.jpg", status: "Suspicious" },
            ].map((report, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-[#171717] transition-colors">
                <td className="p-4 text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {report.date}
                </td>
                <td className="p-4 text-slate-600 dark:text-[#A3A3A3]">{report.type}</td>
                <td className="p-4 text-slate-600 dark:text-[#A3A3A3] truncate max-w-[150px]">{report.target}</td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    report.status === 'Malicious' ? 'bg-red-100 text-red-600 dark:bg-[#EF4444]/20 dark:text-[#EF4444]' :
                    report.status === 'Suspicious' ? 'bg-orange-100 text-orange-600 dark:bg-[#F59E0B]/20 dark:text-[#F59E0B]' :
                    'bg-green-100 text-green-600 dark:bg-[#22C55E]/20 dark:text-[#22C55E]'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 dark:text-[#2563EB] hover:underline font-medium text-xs">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
