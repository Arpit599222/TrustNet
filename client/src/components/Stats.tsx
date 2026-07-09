import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Users, Link2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.js';

interface Stat {
  icon: typeof ShieldCheck;
  value: string;
  labelKey: string;
}

const STATS: Stat[] = [
  { icon: Link2, value: '2.4M+', labelKey: 'stat.urls' },
  { icon: AlertTriangle, value: '180K+', labelKey: 'stat.flagged' },
  { icon: Users, value: '50K+', labelKey: 'stat.protected' },
  { icon: ShieldCheck, value: '24/7', labelKey: 'stat.monitor' },
];

export default function Stats() {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      className="w-full max-w-6xl mx-auto px-6"
      aria-label={t.title}
    >
      <div className="skeuo-card rounded-[28px] grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-200/60 dark:divide-white/5 overflow-hidden">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-2 p-6 md:p-8"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center mb-1">
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {s.value}
              </span>
              <span className="text-[11px] md:text-xs font-bold text-slate-500 dark:text-slate-400">
                {t[s.labelKey as keyof typeof t]}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-center text-[10px] text-slate-400 dark:text-slate-600 mt-3">
        {t.note}
      </p>
    </motion.section>
  );
}

const STRINGS = {
  en: {
    title: 'TrustNet impact',
    'stat.urls': 'URLs analyzed',
    'stat.flagged': 'Threats flagged',
    'stat.protected': 'Users protected',
    'stat.monitor': 'Active monitoring',
    note: 'Illustrative figures shown for product demonstration.',
  },
  hi: {
    title: 'TrustNet प्रभाव',
    'stat.urls': 'विश्लेषित URL',
    'stat.flagged': 'चिह्नित खतरे',
    'stat.protected': 'सुरक्षित उपयोगकर्ता',
    'stat.monitor': 'सक्रिय निगरानी',
    note: 'उत्पाद प्रदर्शन हेतु उदाहरणमूलक आँकड़े।',
  },
} as const;
