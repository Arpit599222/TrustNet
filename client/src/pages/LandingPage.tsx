import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Globe,
  MessageSquare,
  Newspaper,
  Image as ImageIcon,
  ArrowRight,
  Lock,
  Users,
  Languages,
  Fingerprint,
  ChevronRight,
  AlertTriangle,
  ShieldAlert,
  GraduationCap,
  Heart,
  Briefcase,
  Store,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.js';
import { useAuth } from '../context/AuthContext.js';
import ThemeToggle from '../components/ThemeToggle';
import Scanner from '../components/Scanner';
import Stats from '../components/Stats';

function LandingPage() {
  const { lang, toggleLang } = useLanguage();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const t = translations[lang];

  const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const navLinks = [
    { href: '#about', label: t.navAbout },
    { href: '#why', label: t.navWhy },
    { href: '#who', label: t.whoTitle },
    { href: '#features', label: t.navFeatures },
    { href: '#purpose', label: t.navPurpose },
  ];

  return (
    <div className="trust-backdrop min-h-screen bg-slate-50 dark:bg-[#07080B] text-slate-800 dark:text-slate-100 flex flex-col items-center transition-colors duration-300">

      {/* 1. Floating Pill Navigation Bar */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl skeuo-glass py-2.5 px-4 sm:px-6 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-md border border-blue-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-blue-900 dark:text-slate-100">{t.brand}</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-500 dark:text-slate-400">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition">{l.label}</a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="skeuo-icon-btn py-1.5 px-2.5 rounded-full flex items-center gap-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
            aria-label="Toggle Language"
          >
            <Languages className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>
          <ThemeToggle size="sm" />
          {user ? (
            <>
              <span className="hidden sm:inline-flex text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider items-center gap-1">
                {user.name.split(' ')[0]}
              </span>
              <button 
                onClick={logout} 
                className="skeuo-button-secondary py-1.5 px-3.5 rounded-full text-[10px] font-bold cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:inline-flex skeuo-button-secondary py-1.5 px-3.5 rounded-full text-[10px] font-bold">
                {t.login}
              </Link>
              <Link to="/signup" className="hidden sm:inline-flex skeuo-button-primary py-1.5 px-3.5 rounded-full text-[10px] font-bold text-white">
                {t.signup}
              </Link>
            </>
          )}
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="lg:hidden skeuo-icon-btn p-2 rounded-full text-slate-600 dark:text-slate-300 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-4xl skeuo-card rounded-2xl p-4 flex flex-col gap-2 lg:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 px-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition"
            >
              {l.label}
            </a>
          ))}
          {user ? (
            <button 
              onClick={() => { setMenuOpen(false); logout(); }} 
              className="w-full text-center skeuo-button-secondary py-2.5 rounded-xl text-xs font-bold cursor-pointer mt-2"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-2 mt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center skeuo-button-secondary py-2.5 rounded-xl text-xs font-bold">{t.login}</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="flex-1 text-center skeuo-button-primary py-2.5 rounded-xl text-xs font-bold text-white">{t.signup}</Link>
            </div>
          )}
        </div>
      )}

      {/* 2. Hero Section */}
      <section id="home" className="w-full max-w-6xl px-6 pt-28 pb-12 md:pt-36 md:pb-20 grid md:grid-cols-12 gap-10 md:gap-12 items-center">

        {/* Left column content */}
        <motion.div
          className="md:col-span-7 flex flex-col text-center md:text-left items-center md:items-start"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 py-1.5 px-3 rounded-full text-[10px] font-black text-blue-700 dark:text-blue-400 mb-6 uppercase tracking-wider">
            <Fingerprint className="w-3.5 h-3.5" />
            <span>{t.heroBadge}</span>
          </span>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
            {t.heroTitle}
          </h1>

          <p className="mt-4 text-blue-700/80 dark:text-blue-300/70 font-bold text-base md:text-lg font-sans italic">
            "{t.heroHindi}"
          </p>

          <p className="mt-5 text-slate-600 dark:text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
            {t.heroSub}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {user ? (
              <a href="#scanner" className="skeuo-button-primary py-3.5 px-8 rounded-2xl text-white font-bold text-center flex items-center justify-center gap-2">
                <span>Try Scanner</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <Link to="/signup" className="skeuo-button-primary py-3.5 px-8 rounded-2xl text-white font-bold text-center flex items-center justify-center gap-2">
                <span>{t.getStarted}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <a href="#about" className="skeuo-button-secondary py-3.5 px-8 rounded-2xl font-bold text-center flex items-center justify-center">
              {t.learnMore}
            </a>
          </div>
        </motion.div>

        {/* Right column mockup */}
        <motion.div
          className="md:col-span-5 flex justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="w-full max-w-[340px] bg-slate-200/50 dark:bg-slate-800/20 p-3 rounded-[40px] border border-white/80 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="bg-slate-50 dark:bg-[#0D1117] rounded-[32px] overflow-hidden border border-slate-200/60 dark:border-white/5 relative">

              {/* Speaker notch */}
              <div className="h-6 bg-slate-900 dark:bg-[#07080B] w-28 mx-auto rounded-b-2xl mb-4 flex items-center justify-center">
                <div className="w-8 h-0.5 bg-slate-700 rounded-full"></div>
              </div>

              {/* In-app design */}
              <div className="p-5 flex flex-col gap-4">
                {/* Simulated URL input */}
                <div className="bg-white dark:bg-[#161A22] p-3 rounded-xl border border-slate-100 dark:border-white/5 flex items-center gap-2 shadow-sm">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-bold overflow-hidden text-ellipsis whitespace-nowrap">sbi.bank-secure-portal.in</span>
                </div>

                {/* Score panel */}
                <div className="skeuo-card p-5 rounded-2xl flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{t.scoreLabel}</span>
                  <div className="relative w-24 h-24 flex items-center justify-center mt-3">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                      <circle cx="56" cy="56" r="46" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="6" fill="transparent" />
                      <circle cx="56" cy="56" r="46" stroke="#DC2626" strokeWidth="6" fill="transparent"
                        strokeDasharray="289" strokeDashoffset="254" strokeLinecap="round" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-red-600 dark:text-red-500">12</span>
                      <span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold tracking-wider">{t.heroRisky}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 bg-red-50 dark:bg-red-950/30 px-3 py-1 rounded-full border border-red-200/60 dark:border-red-900/40">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    <span className="text-red-700 dark:text-red-400 text-xs font-bold">{t.heroPhishing}</span>
                  </div>
                </div>

                {/* Mock Alert card */}
                <div className="bg-white dark:bg-[#161A22] p-4 rounded-xl border border-slate-100 dark:border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">{t.heroDeceptive}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">{t.heroRegistered}</span>
                  </div>
                </div>
              </div>

              {/* Bottom line */}
              <div className="h-6 bg-white dark:bg-[#0D1117] flex items-center justify-center mt-4">
                <div className="w-20 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Scanner demo */}
      <section id="scanner" className="w-full max-w-6xl px-6 pb-16 md:pb-20">
        <Scanner />
      </section>

      {/* 4. Stats */}
      <section className="w-full pb-16 md:pb-20">
        <Stats />
      </section>

      {/* 5. About TrustNet */}
      <section id="about" className="w-full bg-white dark:bg-[#0D1117] border-y border-slate-200/60 dark:border-white/5 py-16 px-6 flex justify-center">
        <motion.div
          className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div>
            <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-2">{t.navAbout}</span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t.aboutTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mt-3 font-medium leading-relaxed">{t.aboutSub}</p>
          </div>
          <div className="flex flex-col gap-6 text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            <p>{t.aboutDesc1}</p>
            <p>{t.aboutDesc2}</p>
          </div>
        </motion.div>
      </section>

      {/* 6. Why We Built TrustNet */}
      <section id="why" className="w-full max-w-6xl px-6 py-20">
        <motion.div
          className="text-center max-w-xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-2">{t.whyEyebrow}</span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t.whyTitle}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">{t.whySub}</p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {[
            { icon: AlertTriangle, color: 'red', title: t.whyPoint1, desc: t.whyPoint1Desc },
            { icon: Lock, color: 'amber', title: t.whyPoint2, desc: t.whyPoint2Desc },
            { icon: Newspaper, color: 'blue', title: t.whyPoint3, desc: t.whyPoint3Desc },
            { icon: ImageIcon, color: 'purple', title: t.whyPoint4, desc: t.whyPoint4Desc },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={i} className="skeuo-card p-6 rounded-[24px] flex flex-col justify-between" variants={fadeIn}>
                <div>
                  <div className={`w-10 h-10 rounded-xl bg-${card.color}-50 dark:bg-${card.color}-950/30 border border-${card.color}-100 dark:border-${card.color}-900/40 flex items-center justify-center mb-6`}>
                    <Icon className={`w-5 h-5 text-${card.color}-600 dark:text-${card.color}-400`} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-3 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 7. Who Is It For? */}
      <section id="who" className="w-full bg-white dark:bg-[#0D1117] border-y border-slate-200/60 dark:border-white/5 py-20 px-6 flex justify-center">
        <div className="w-full max-w-6xl">
          <motion.div
            className="text-center max-w-xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-2">{t.whoEyebrow}</span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t.whoTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">{t.whoSub}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: GraduationCap, title: t.whoStudents, desc: t.whoStudentsDesc },
              { icon: Heart, title: t.whoParents, desc: t.whoParentsDesc },
              { icon: Users, title: t.whoSeniors, desc: t.whoSeniorsDesc },
              { icon: Briefcase, title: t.whoPro, desc: t.whoProDesc },
              { icon: Store, title: t.whoSme, desc: t.whoSmeDesc },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={i} className="bg-slate-50 dark:bg-[#07080B] p-6 rounded-[24px] border border-slate-200/60 dark:border-white/5 flex flex-col items-center text-center" variants={fadeIn}>
                  <div className="w-11 h-11 bg-white dark:bg-[#161A22] border border-slate-100 dark:border-white/5 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-2 leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 8. Core Features Preview */}
      <section id="features" className="w-full max-w-6xl px-6 py-20">
        <motion.div
          className="text-center max-w-xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-2">{t.featEyebrow}</span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t.featTitle}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">{t.featSub}</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {[
            { icon: Globe, color: 'blue', title: t.featWeb, desc: t.featWebDesc },
            { icon: MessageSquare, color: 'green', title: t.featMsg, desc: t.featMsgDesc },
            { icon: Newspaper, color: 'amber', title: t.featNews, desc: t.featNewsDesc },
            { icon: ImageIcon, color: 'purple', title: t.featImg, desc: t.featImgDesc },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={i} className="skeuo-card p-8 rounded-[28px] flex flex-col justify-between" variants={fadeIn}>
                <div>
                  <div className={`w-12 h-12 bg-${card.color}-50 dark:bg-${card.color}-950/30 border border-${card.color}-100 dark:border-${card.color}-900/40 rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed max-w-md">{card.desc}</p>
                </div>
                <div className="mt-8 flex justify-end">
                  <Link to="/signup" className="skeuo-icon-btn py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1">
                    <span>{t.learnMore}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 9. Our Mission */}
      <section id="purpose" className="w-full bg-gradient-to-br from-[#101627] to-[#0B1018] text-white py-20 px-6 flex justify-center border-t border-white/5">
        <motion.div
          className="w-full max-w-4xl text-center flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="text-xs font-black text-blue-400 uppercase tracking-wider block mb-2">{t.purposeTitle}</span>
          <h2 className="text-3xl md:text-4xl font-black max-w-2xl leading-tight">
            {t.purposeHindi}
          </h2>
          <p className="text-slate-300 text-base md:text-lg mt-6 leading-relaxed max-w-2xl">
            {t.purposeDesc}
          </p>
        </motion.div>
      </section>

      {/* 10. Call to Action Card */}
      <section className="w-full max-w-4xl px-6 py-20">
        <motion.div
          className="w-full skeuo-card p-8 md:p-12 rounded-[32px] flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t.ctaTitle}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 max-w-md leading-relaxed">{t.ctaSub}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {user ? (
              <a href="#scanner" className="skeuo-button-primary py-3.5 px-8 rounded-2xl text-white font-bold text-center">
                Try the Scanner
              </a>
            ) : (
              <>
                <Link to="/signup" className="skeuo-button-primary py-3.5 px-8 rounded-2xl text-white font-bold text-center">
                  {t.ctaBtn}
                </Link>
                <Link to="/login" className="skeuo-button-secondary py-3.5 px-8 rounded-2xl font-bold text-center">
                  {t.login}
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* 11. Footer */}
      <motion.footer
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="w-[calc(100%-2rem)] max-w-5xl mx-auto mb-8 px-6 md:px-14 py-8 md:py-7 rounded-[32px] md:rounded-full bg-gradient-to-br from-[#101627]/95 to-[#1C1F28]/95 backdrop-blur-[14px] border border-white/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] text-slate-400 flex flex-col gap-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full z-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 max-w-[220px]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-md border border-blue-500/20">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">{t.brand}</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed font-medium">{t.footerAbout}</p>
          </div>

          <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs font-bold text-slate-400">
            <a href="#about" className="hover:text-blue-400 hover:scale-105 transition duration-200">{t.footerAbout2}</a>
            <a href="#" className="hover:text-blue-400 hover:scale-105 transition duration-200">{t.footerPrivacy}</a>
            <a href="#" className="hover:text-blue-400 hover:scale-105 transition duration-200">{t.footerTerms}</a>
            <a href="#" className="hover:text-blue-400 hover:scale-105 transition duration-200">{t.navContact}</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:scale-105 transition duration-200">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:scale-105 transition duration-200">LinkedIn</a>
          </nav>

          <div className="flex flex-col sm:flex-row md:flex-col items-center md:items-end gap-3">
            <button
              onClick={toggleLang}
              className="py-1.5 px-3 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-slate-200 border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
            </button>
            <span className="inline-flex items-center gap-1 bg-blue-950/40 border border-blue-900/40 py-1 px-3 rounded-full text-[10px] font-bold text-blue-300">
              {t.trustedBadge}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 w-full z-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-slate-500 text-[10px] font-medium gap-3 w-full z-10">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>{t.rights}</span>
            <span className="hidden sm:block text-slate-600">•</span>
            <span>Made by Khushi Verma, Arpit Raj, Ishani Gupta</span>
          </div>
          <span className="flex items-center gap-1">{t.madeFor}</span>
        </div>
      </motion.footer>
    </div>
  );
}

const translations = {
  en: {
    brand: "TrustNet",
    navHome: "Home",
    navFeatures: "Features",
    navAbout: "About",
    navWhy: "Why Us",
    navPurpose: "Purpose",
    navContact: "Contact",
    login: "Log In",
    signup: "Sign Up",

    heroBadge: "Digital Identity Guard",
    heroTitle: "Protect Your Digital Life.",
    heroSub: "TrustNet helps people identify scams, phishing websites, fake news, manipulated images, and online fraud before they become victims.",
    heroHindi: "सुरक्षित इंटरनेट, सुरक्षित भारत। ऑनलाइन धोखाधड़ी से बचें।",
    getStarted: "Try the Scanner",
    learnMore: "Learn More",

    scoreLabel: "Trust Score",
    heroRisky: "RISKY",
    heroPhishing: "Unsafe / Phishing",
    heroDeceptive: "Deceptive Domain",
    heroRegistered: "Domain registered 2 days ago.",

    aboutTitle: "What is TrustNet?",
    aboutSub: "We build modern, human-centric security tools that empower everyday users to browse, read, and connect securely.",
    aboutDesc1: "TrustNet is a digital trust platform built to bridge the gap between complex cybersecurity algorithms and everyday internet users. We analyze digital content in real time to protect you and your family.",
    aboutDesc2: "By checking links, text messages, and media elements, TrustNet acts as a friendly digital guardian, alerting you before you click, share, or transfer money.",

    whyEyebrow: "The Problem",
    whyTitle: "Why We Built TrustNet",
    whySub: "The internet has evolved rapidly, but online safety has not kept pace. We are building the infrastructure for a responsible digital society.",
    whyPoint1: "Rising Cyber Fraud",
    whyPoint1Desc: "Thousands of citizens lose their hard-earned savings daily to spoofed banking portals and identity theft.",
    whyPoint2: "Phishing & Scams",
    whyPoint2Desc: "Deceptive URLs and social engineering attacks trick even tech-savvy professionals into sharing credentials.",
    whyPoint3: "Fake News & Disinformation",
    whyPoint3Desc: "Unverified claims and synthetic news items spread unchecked, harming social cohesion and trust.",
    whyPoint4: "Synthetic Media",
    whyPoint4Desc: "AI-manipulated images and deepfakes make it impossible to trust digital evidence without automated verification.",

    whoEyebrow: "User Profiles",
    whoTitle: "Who is TrustNet For?",
    whoSub: "Everyone deserves to browse the web with absolute confidence. Our platform is tailormade for all user profiles.",
    whoStudents: "Students",
    whoStudentsDesc: "Verify sources for academic work and avoid student loan or job scams online.",
    whoParents: "Parents",
    whoParentsDesc: "Protect family members from unsafe websites and predatory online spaces.",
    whoSeniors: "Senior Citizens",
    whoSeniorsDesc: "Browse safely with simplified, highly visible alerts that protect against pension and banking scams.",
    whoPro: "Professionals",
    whoProDesc: "Keep business credentials secure and avoid spear-phishing attempts in your inbox.",
    whoSme: "Small Businesses",
    whoSmeDesc: "Prevent invoice fraud, website spoofing, and protect your local brand presence.",

    featEyebrow: "Our Solutions",
    featTitle: "Core Verification Suite",
    featSub: "Simple tools to verify the integrity of the digital content you interact with daily.",
    featWeb: "Website Verification",
    featWebDesc: "Verify bank sites, e-commerce stores, and government portals before entering details.",
    featMsg: "Scam Message Detection",
    featMsgDesc: "Detect lottery scams, fake delivery notifications, and KYC blocking messages.",
    featNews: "News Verification",
    featNewsDesc: "Cross-reference claims with trusted fact-checking registries and credible records.",
    featImg: "Image Analysis",
    featImgDesc: "Scan metadata, compression artifacts, and visual signals to detect synthetic alterations.",

    purposeTitle: "Our Purpose",
    purposeHindi: "हमारा उद्देश्य एक सुरक्षित और जिम्मेदार डिजिटल समाज बनाना है।",
    purposeDesc: "TrustNet exists to help build a safer, more responsible digital society by making online verification simple, accessible, and trustworthy. We believe safe browsing is a fundamental digital right for every citizen.",

    ctaTitle: "Ready to Stay Safe Online?",
    ctaSub: "Create a free account today to activate active scanning and scam notification filters.",
    ctaBtn: "Create Free Account",

    footerAbout: "Building trust for every digital interaction. Safe browsing, verified media, secure communication.",
    footerAbout2: "About",
    footerPrivacy: "Privacy",
    footerTerms: "Terms",
    trustedBadge: "Trusted Digital Platform",
    madeFor: "Made for a Responsible Digital Society 🌍",
    rights: "Copyright © 2026 TrustNet. All rights reserved."
  },
  hi: {
    brand: "ट्रस्टनेट",
    navHome: "मुख्य पृष्ठ",
    navFeatures: "विशेषताएं",
    navAbout: "हमारे बारे में",
    navWhy: "हम क्यों",
    navPurpose: "उद्देश्य",
    navContact: "संपर्क",
    login: "लॉग इन",
    signup: "साइन अप",

    heroBadge: "डिजिटल पहचान रक्षक",
    heroTitle: "अपने डिजिटल जीवन की रक्षा करें।",
    heroSub: "ट्रस्टनेट लोगों को शिकार बनने से पहले घोटालों, फ़िशिंग वेबसाइटों, फर्जी खबरों, हेरफेर की गई छवियों और ऑनलाइन धोखाधड़ी की पहचान करने में मदद करता है।",
    heroHindi: "सुरक्षित इंटरनेट, सुरक्षित भारत। ऑनलाइन धोखाधड़ी से बचें।",
    getStarted: "स्कैनर आज़माएँ",
    learnMore: "अधिक जानें",

    scoreLabel: "सुरक्षा स्कोर",
    heroRisky: "जोखिम",
    heroPhishing: "असुरक्षित / फ़िशिंग",
    heroDeceptive: "भ्रामक डोमेन",
    heroRegistered: "डोमेन 2 दिन पहले पंजीकृत।",

    aboutTitle: "ट्रस्टनेट क्या है?",
    aboutSub: "हम आधुनिक, मानव-केंद्रित सुरक्षा उपकरण बनाते हैं जो उपयोगकर्ताओं को सुरक्षित रूप से ब्राउज़ करने और जुड़ने में मदद करते हैं।",
    aboutDesc1: "ट्रस्टनेट एक डिजिटल ट्रस्ट प्लेटफॉर्म है जो जटिल साइबर सुरक्षा एल्गोरिदम और आम इंटरनेट उपयोगकर्ताओं के बीच की दूरी को पाटता है।",
    aboutDesc2: "लिंक, टेक्स्ट संदेश और मीडिया तत्वों की जांच करके, ट्रस्टनेट आपके क्लिक करने या पैसे ट्रांसफर करने से पहले आपको सचेत करता है।",

    whyEyebrow: "समस्या",
    whyTitle: "हमने TrustNet क्यों बनाया?",
    whySub: "इंटरनेट तेजी से विकसित हुआ है, लेकिन ऑनलाइन सुरक्षा उतनी मजबूत नहीं हुई है। हम एक जिम्मेदार डिजिटल समाज के निर्माण में लगे हैं।",
    whyPoint1: "बढ़ती साइबर धोखाधड़ी",
    whyPoint1Desc: "हजारों नागरिक बैंक धोखाधड़ी और पहचान की चोरी के कारण अपनी गाढ़ी कमाई खो देते हैं।",
    whyPoint2: "फ़िशिंग और स्कैम",
    whyPoint2Desc: "धोखाधड़ी वाले लिंक और सोशल इंजीनियरिंग जाल से पेशेवर भी झांसे में आ जाते हैं।",
    whyPoint3: "फर्जी खबरें और दुष्प्रचार",
    whyPoint3Desc: "असत्यापित दावे तेजी से फैलते हैं, जिससे समाज में अविश्वास और तनाव बढ़ता है।",
    whyPoint4: "कृत्रिम मीडिया (डीपफेक)",
    whyPoint4Desc: "एआई-जनित छवियां और वीडियो बिना तकनीक के पहचानना असंभव हो गया है।",

    whoEyebrow: "उपयोगकर्ता प्रोफ़ाइल",
    whoTitle: "ट्रस्टनेट किसके लिए है?",
    whoSub: "हर कोई आत्मविश्वास के साथ इंटरनेट का उपयोग करने का हकदार है। हमारा प्लेटफॉर्म सभी के लिए बनाया गया है।",
    whoStudents: "छात्र",
    whoStudentsDesc: "शैक्षणिक कार्यों के लिए स्रोतों की पुष्टि करें और नौकरी या ऋण संबंधी घोटालों से बचें।",
    whoParents: "अभिभावक",
    whoParentsDesc: "परिवार के सदस्यों को असुरक्षित वेबसाइटों और धोखाधड़ी से दूर रखें।",
    whoSeniors: "वरिष्ठ नागरिक",
    whoSeniorsDesc: "सरल और स्पष्ट चेतावनियों के साथ सुरक्षित रूप से इंटरनेट का उपयोग करें जो बैंक घोटालों से बचाती हैं।",
    whoPro: "पेशेवर",
    whoProDesc: "अपने क्रेडेंशियल्स को सुरक्षित रखें और ईमेल फ़िशिंग हमलों से बचें।",
    whoSme: "छोटे व्यवसाय",
    whoSmeDesc: "वेबसाइट क्लोनिंग और वित्तीय धोखाधड़ी से अपने व्यवसाय को सुरक्षित रखें।",

    featEyebrow: "हमारे समाधान",
    featTitle: "मुख्य सत्यापन सुइट",
    featSub: "आपके द्वारा दैनिक रूप से उपयोग की जाने वाली डिजिटल सामग्री की सत्यता की जांच करने के लिए सरल उपकरण।",
    featWeb: "वेबसाइट सत्यापन",
    featWebDesc: "पैसे ट्रांसफर करने से पहले बैंक साइटों, ई-कॉमर्स स्टोर और सरकारी पोर्टलों की जांच करें।",
    featMsg: "संदिग्ध संदेश पहचान",
    featMsgDesc: "लॉटरी स्कैम, फर्जी डिलीवरी नोटिफिकेशन और केवाईसी ब्लॉक संदेशों को तुरंत पहचानें।",
    featNews: "समाचार सत्यापन",
    featNewsDesc: "सत्यापित डेटाबेस और सरकारी फैक्ट-चेक रिकॉर्ड के साथ दावों की सत्यता जांचें।",
    featImg: "छवि विश्लेषण",
    featImgDesc: "नकली या एआई-जनित बदलावों का पता लगाने के लिए इमेज मेटाडेटा और विज़ुअल सिग्नल स्कैन करें।",

    purposeTitle: "हमारा उद्देश्य",
    purposeHindi: "हमारा उद्देश्य एक सुरक्षित और जिम्मेदार डिजिटल समाज बनाना है।",
    purposeDesc: "ट्रस्टनेट का उद्देश्य ऑनलाइन सत्यापन को सरल, सुलभ और विश्वसनीय बनाकर एक सुरक्षित, अधिक जिम्मेदार डिजिटल समाज बनाने में मदद करना है।",

    ctaTitle: "सुरक्षित डिजिटल भारत के लिए तैयार हैं?",
    ctaSub: "एक्टिव स्कैनिंग और स्कैम नोटिफिकेशन फिल्टर सक्रिय करने के लिए आज ही मुफ्त खाता बनाएं।",
    ctaBtn: "मुफ़्त खाता बनाएं",

    footerAbout: "हर डिजिटल अंतःक्रिया के लिए विश्वास बनाना। सुरक्षित ब्राउज़िंग, सत्यापित मीडिया, सुरक्षित संचार।",
    footerAbout2: "हमारे बारे में",
    footerPrivacy: "गोपनीयता",
    footerTerms: "शर्तें",
    trustedBadge: "विश्वसनीय डिजिटल प्लेटफॉर्म",
    madeFor: "जिम्मेदार डिजिटल समाज के लिए बनाया गया 🌍",
    rights: "कॉपीराइट © 2026 ट्रस्टनेट। सर्वाधिकार सुरक्षित।"
  }
};

export default LandingPage;
