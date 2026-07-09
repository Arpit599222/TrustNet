
import { motion } from 'framer-motion';
import { Scan, Link as LinkIcon, MessageSquare, Newspaper, Image as ImageIcon } from 'lucide-react';

export default function ScannerPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Scan className="w-6 h-6 text-blue-600 dark:text-[#2563EB]" />
          Deep Scan Analysis
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Website Scanner", icon: LinkIcon, desc: "Check URLs for phishing and malware." },
          { title: "Message Scanner", icon: MessageSquare, desc: "Analyze SMS and emails for scam patterns." },
          { title: "News Verification", icon: Newspaper, desc: "Cross-reference facts to detect fake news." },
          { title: "Image Upload", icon: ImageIcon, desc: "Detect AI-generated deepfakes." }
        ].map((tool, i) => (
          <div key={i} className="skeuo-card p-6 flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-[#171717] border border-blue-100 dark:border-[#232323] flex items-center justify-center">
              <tool.icon className="w-6 h-6 text-blue-600 dark:text-[#2563EB]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{tool.title}</h3>
              <p className="text-sm text-slate-500 dark:text-[#A3A3A3] mb-4">{tool.desc}</p>
              <button className="skeuo-button-secondary px-4 py-2 rounded-lg text-sm font-semibold w-full">
                Open Tool
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
