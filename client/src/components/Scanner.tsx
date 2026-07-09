import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  MessageSquare,
  Newspaper,
  Image as ImageIcon,
  ScanLine,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { analyze, SAMPLE_INPUTS } from '../utils/scannerLogic';
import type { ScannerMode, RiskLevel } from '../utils/scannerLogic';
import { useLanguage } from '../App';

const MODES: { id: ScannerMode; icon: typeof Globe; key: string }[] = [
  { id: 'url', icon: Globe, key: 'mode.url' },
  { id: 'sms', icon: MessageSquare, key: 'mode.sms' },
  { id: 'news', icon: Newspaper, key: 'mode.news' },
];

const LEVEL_META: Record<RiskLevel, { color: string; ring: string; icon: typeof ShieldCheck; key: string }> = {
  safe: { color: '#059669', ring: 'rgba(5,150,105,0.18)', icon: ShieldCheck, key: 'level.safe' },
  caution: { color: '#F59E0B', ring: 'rgba(245,158,11,0.18)', icon: AlertTriangle, key: 'level.caution' },
  danger: { color: '#DC2626', ring: 'rgba(220,38,38,0.18)', icon: ShieldAlert, key: 'level.danger' },
};

// Gauge geometry — strokeDashoffset derived from score.
const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Extract a string leaf from a union that may include nested objects. */
function str(v: unknown): string {
  return typeof v === 'string' ? v : String(v);
}

export default function Scanner() {
  const { lang } = useLanguage();
  const [mode, setMode] = useState<ScannerMode>('url');
  const [input, setInput] = useState('');
  const [scanning, setScanning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const t = STRINGS[lang];

  const result = useMemo(
    () => (submitted && input.trim() ? analyze(input, mode) : null),
    [input, mode, submitted],
  );

  const handleScan = () => {
    if (!input.trim()) return;
    setScanning(true);
    setSubmitted(false);
    // Simulate a short network/analysis delay so the loader registers.
    window.setTimeout(() => {
      setScanning(false);
      setSubmitted(true);
    }, 650);
  };

  const pickSample = (value: string) => {
    setInput(value);
    setSubmitted(false);
  };

  const switchMode = (m: ScannerMode) => {
    setMode(m);
    setInput('');
    setSubmitted(false);
  };

  const meta = result ? LEVEL_META[result.level] : LEVEL_META.safe;
  const LevelIcon = meta.icon;
  const dashOffset = CIRCUMFERENCE * (1 - (result?.score ?? 0) / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      className="w-full max-w-5xl mx-auto skeuo-card rounded-[32px] overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 md:px-10 pt-8 pb-5 border-b border-slate-200/60 dark:border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <ScanLine className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {t.eyebrow}
          </span>
          <span className="ml-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40">
            {t.demoBadge}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          {t.title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-xl">{t.subtitle}</p>
      </div>

      {/* Mode tabs */}
      <div className="px-6 md:px-10 pt-6">
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => switchMode(m.id)}
                className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'skeuo-button-primary text-white'
                    : 'skeuo-button-secondary text-slate-600 dark:text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{str(t[m.key as keyof typeof t])}</span>
              </button>
            );
          })}
          <div className="flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-400 dark:text-slate-500 skeuo-tile opacity-70 cursor-not-allowed">
            <ImageIcon className="w-4 h-4" />
            <span>{t['mode.image']}</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              {t.soon}
            </span>
          </div>
        </div>
      </div>

      {/* Input + action */}
      <div className="px-6 md:px-10 pt-5">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setSubmitted(false);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              placeholder={str(t.placeholders[mode])}
              aria-label={t.inputLabel}
              className="w-full py-3.5 pl-10 pr-4 rounded-xl text-sm skeuo-input focus:outline-none"
            />
            <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>
          <button
            onClick={handleScan}
            disabled={!input.trim() || scanning}
            className="skeuo-button-primary py-3.5 px-7 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            {scanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.scanning}</span>
              </>
            ) : (
              <>
                <ScanLine className="w-4 h-4" />
                <span>{t.scanBtn}</span>
              </>
            )}
          </button>
        </div>

        {/* Sample chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {SAMPLE_INPUTS[mode].map((s) => (
            <button
              key={s.label}
              onClick={() => pickSample(s.value)}
              className="text-[10px] font-bold py-1.5 px-3 rounded-full skeuo-tile text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="px-6 md:px-10 py-7">
        <AnimatePresence mode="wait">
          {scanning ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 text-slate-400 dark:text-slate-500"
            >
              <Loader2 className="w-8 h-8 animate-spin mb-3 text-blue-500" />
              <span className="text-xs font-bold">{t.analyzing}</span>
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
              className="grid md:grid-cols-12 gap-6 items-center"
            >
              {/* Gauge */}
              <div className="md:col-span-4 flex flex-col items-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                    <circle
                      cx="56"
                      cy="56"
                      r={RADIUS}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-slate-100 dark:text-slate-800"
                    />
                    <motion.circle
                      cx="56"
                      cy="56"
                      r={RADIUS}
                      fill="none"
                      stroke={meta.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      initial={{ strokeDashoffset: CIRCUMFERENCE }}
                      animate={{ strokeDashoffset: dashOffset }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black" style={{ color: meta.color }}>
                      {result.score}
                    </span>
                    <span className="text-[9px] font-black tracking-wider text-slate-400 dark:text-slate-500">
                      {t.riskScore}
                    </span>
                  </div>
                </div>
                <div
                  className="mt-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs"
                  style={{ background: meta.ring, color: meta.color }}
                >
                  <LevelIcon className="w-4 h-4" />
                  <span>{str(t[meta.key as keyof typeof t])}</span>
                </div>
              </div>

              {/* Signals */}
              <div className="md:col-span-8">
                <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                  {t.detectedSignals}
                </p>
                {result.signals.length === 0 ? (
                  <div className="flex items-start gap-3 p-4 rounded-2xl skeuo-tile">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{t.noSignals}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.noSignalsDesc}</p>
                    </div>
                  </div>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {result.signals.map((s, i) => (
                      <li
                        key={`${s.key}-${i}`}
                        className="flex items-center justify-between gap-3 p-3 rounded-xl skeuo-tile"
                      >
                        <span className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                          <AlertTriangle
                            className="w-4 h-4 shrink-0"
                            style={{ color: meta.color }}
                          />
                          {t.signals[s.key as keyof typeof t.signals] ?? s.key}
                        </span>
                        <span
                          className="text-[10px] font-black px-2 py-0.5 rounded-full"
                          style={{ background: meta.ring, color: meta.color }}
                        >
                          +{s.weight}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-4 leading-relaxed">
                  {t.disclaimer}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <ShieldCheck className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3" />
              <p className="text-sm font-bold text-slate-400 dark:text-slate-500">{t.emptyHint}</p>
              <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">{t.emptyHintSub}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ---------- Localized strings (EN/HI) ---------- */
const STRINGS = {
  en: {
    eyebrow: 'Live Verification Demo',
    demoBadge: 'Demo',
    title: 'Verify before you click, share, or pay.',
    subtitle:
      'Paste a link, a suspicious SMS, or a news claim below and see how TrustNet evaluates risk. Illustrative heuristics — not a substitute for full backend verification.',
    inputLabel: 'Content to verify',
    scanBtn: 'Scan',
    scanning: 'Scanning…',
    analyzing: 'Analyzing patterns…',
    riskScore: 'RISK SCORE',
    detectedSignals: 'Detected risk signals',
    noSignals: 'No suspicious patterns detected',
    noSignalsDesc: 'No high-risk heuristics triggered. Always stay cautious and verify via official channels.',
    emptyHint: 'Nothing scanned yet',
    emptyHintSub: 'Pick a sample above or paste your own, then hit Scan.',
    soon: 'Soon',
    disclaimer:
      'Demo only. Scores are produced by front-end heuristics and may miss sophisticated threats. Never share OTPs, PINs, or passwords.',
    'mode.url': 'Website / URL',
    'mode.sms': 'SMS / Message',
    'mode.news': 'News / Claim',
    'mode.image': 'Image',
    'level.safe': 'Looks Safe',
    'level.caution': 'Use Caution',
    'level.danger': 'High Risk',
    placeholders: {
      url: 'Paste a URL, e.g. https://sbi-secure-portal-update.in',
      sms: 'Paste the full message text you received…',
      news: 'Paste the headline or claim to fact-check…',
    },
    signals: {
      'url.rawIp': 'Uses a raw IP address instead of a domain',
      'url.lookalike': 'Imitates a known brand with extra words',
      'url.manyHyphens': 'Domain packed with multiple hyphens',
      'url.riskyTld': 'Uses a top-level domain often abused in fraud',
      'url.shortener': 'Uses a link shortener that hides the real address',
      'url.credBait': 'Asks for login or credentials in the address',
      'sms.kycBlock': 'Threatens KYC / SIM block to create panic',
      'sms.lottery': 'Mentions lottery, prizes, or winnings',
      'sms.delivery': 'Demands a delivery / customs payment',
      'sms.upiAsk': 'Pushes a UPI payment or handle',
      'sms.linkClick': 'Asks you to click a link',
      'sms.urgency': 'Uses urgency language to force quick action',
      'sms.otpAsk': 'Requests an OTP, PIN, or password',
      'news.knownFake': 'Matches a known circulating fake pattern',
      'news.sensational': 'Uses sensational or clickbait language',
      'news.allCaps': 'Written largely in ALL CAPS (shouting)',
      'news.noSource': 'Cites unnamed or no credible source',
      'news.urgentShare': 'Pressures you to forward to everyone',
    },
  },
  hi: {
    eyebrow: 'लाइव सत्यापन डेमो',
    demoBadge: 'डेमो',
    title: 'क्लिक, शेयर या पेमेंट से पहले सत्यापित करें।',
    subtitle:
      'नीचे कोई लिंक, संदिग्ध SMS, या समाचार दावा चिपकाएँ और देखें कि TrustNet जोखिम का मूल्यांकन कैसे करता है। ये केवल उदाहरण हेयुरिस्टिक्स हैं — पूर्ण बैकएंड सत्यापन का विकल्प नहीं।',
    inputLabel: 'सत्यापित करने की सामग्री',
    scanBtn: 'स्कैन करें',
    scanning: 'स्कैन हो रहा है…',
    analyzing: 'पैटर्न का विश्लेषण हो रहा है…',
    riskScore: 'जोखिम स्कोर',
    detectedSignals: 'पहचाने गए जोखिम संकेत',
    noSignals: 'कोई संदिग्ध पैटर्न नहीं मिला',
    noSignalsDesc: 'कोई उच्च-जोखिम हेयुरिस्टिक ट्रिगर नहीं हुआ। सावधानी बरतें और आधिकारिक स्रोतों से पुष्टि करें।',
    emptyHint: 'अभी तक कुछ स्कैन नहीं हुआ',
    emptyHintSub: 'ऊपर कोई नमूना चुनें या अपना खुद का चिपकाएँ, फिर स्कैन दबाएँ।',
    soon: 'जल्द',
    disclaimer:
      'केवल डेमो। स्कोर फ्रंट-एंड हेयुरिस्टिक्स से बनते हैं और जटिल खतरों को छोड़ सकते हैं। OTP, PIN या पासवर्ड कभी साझा न करें।',
    'mode.url': 'वेबसाइट / URL',
    'mode.sms': 'SMS / संदेश',
    'mode.news': 'समाचार / दावा',
    'mode.image': 'छवि',
    'level.safe': 'सुरक्षित लगता है',
    'level.caution': 'सावधानी बरतें',
    'level.danger': 'उच्च जोखिम',
    placeholders: {
      url: 'URL चिपकाएँ, जैसे https://sbi-secure-portal-update.in',
      sms: 'जो संदेश मिला वह पूरा यहाँ चिपकाएँ…',
      news: 'तथ्य-जांच हेतु शीर्षक या दावा चिपकाएँ…',
    },
    signals: {
      'url.rawIp': 'डोमेन की जगह सीधा IP पते का उपयोग',
      'url.lookalike': 'ज्ञात ब्रांड की नकल अतिरिक्त शब्दों के साथ',
      'url.manyHyphens': 'डोमेन में कई हाइफन भरे हुए',
      'url.riskyTld': 'धोखाधड़ी में अक्सर दुरुपयोग होने वाला टॉप-लेवल डोमेन',
      'url.shortener': 'लिंक शॉर्टनर जो असली पता छिपाता है',
      'url.credBait': 'पते में लॉगिन या क्रेडेंशियल माँगता है',
      'sms.kycBlock': 'KYC / SIM ब्लॉक की धमकी देकर घबराता है',
      'sms.lottery': 'लॉटरी, पुरस्कार या जीत का जिक्र',
      'sms.delivery': 'डिलीवरी / कस्टम भुगतान माँगता है',
      'sms.upiAsk': 'UPI भुगतान या हैंडल के लिए दबाव',
      'sms.linkClick': 'लिंक क्लिक करने को कहता है',
      'sms.urgency': 'जल्दी कार्रवाई के लिए तत्काल भाषा',
      'sms.otpAsk': 'OTP, PIN या पासवर्ड माँगता है',
      'news.knownFake': 'ज्ञात प्रचलित फर्जी पैटर्न से मेल',
      'news.sensational': 'सनसनीखेज या क्लिकबेट भाषा',
      'news.allCaps': 'अधिकांश ALL CAPS में लिखा (चिल्लाना)',
      'news.noSource': 'बिना नाम या विश्वसनीय स्रोत का हवाला',
      'news.urgentShare': 'सबको फॉरवर्ड करने का दबाव',
    },
  },
} as const;
