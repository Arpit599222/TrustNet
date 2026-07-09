import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Languages, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  Loader2,
  AlertOctagon,
  XCircle
} from 'lucide-react';
import { useLanguage } from '../App.js';
import ThemeToggle from '../components/ThemeToggle.js';
import { useAuth } from '../context/AuthContext.js';

function LoginPage() {
  const { lang, toggleLang } = useLanguage();
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validationMsgs = {
    en: {
      emailReq: "Email is required",
      emailInvalid: "Please enter a valid email address",
      passReq: "Password must be at least 8 characters"
    },
    hi: {
      emailReq: "ईमेल पता आवश्यक है",
      emailInvalid: "कृपया एक वैध ईमेल पता दर्ज करें",
      passReq: "पासवर्ड कम से कम 8 वर्णों का होना चाहिए"
    }
  };

  const msgs = validationMsgs[lang];

  const loginSchema = z.object({
    email: z.string().min(1, { message: msgs.emailReq }).email({ message: msgs.emailInvalid }),
    password: z.string().min(8, { message: msgs.passReq }),
    rememberMe: z.boolean().optional(),
  });

  type LoginFields = z.infer<typeof loginSchema>;

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFields) => {
    setSubmitError(null);
    try {
      await login(data.email, data.password);
      setIsSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (err: any) {
      setSubmitError(err.message || 'Invalid email or password.');
    }
  };

  const labels = {
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to continue protecting your digital life.",
      email: "Email Address",
      password: "Password",
      show: "Show",
      hide: "Hide",
      rememberMe: "Remember Me",
      forgotPassword: "Forgot Password?",
      signIn: "Sign In",
      signingIn: "Signing In...",
      success: "Signed In Successfully!",
      divider: "OR",
      google: "Continue with Google",
      github: "Continue with GitHub",
      noAccount: "Don't have an account?",
      createAccount: "Create Account",
      logo: "TrustNet"
    },
    hi: {
      title: "वापसी पर स्वागत है",
      subtitle: "अपने डिजिटल जीवन की सुरक्षा जारी रखने के लिए साइन इन करें।",
      email: "ईमेल पता",
      password: "पासवर्ड",
      show: "दिखाएं",
      hide: "छिपाएं",
      rememberMe: "मुझे याद रखें",
      forgotPassword: "पासवर्ड भूल गए?",
      signIn: "साइन इन करें",
      signingIn: "साइन इन हो रहा है...",
      success: "सफलतापूर्वक साइन इन किया गया!",
      divider: "या",
      google: "Google के साथ जारी रखें",
      github: "GitHub के साथ जारी रखें",
      noAccount: "खाता नहीं है?",
      createAccount: "खाता बनाएं",
      logo: "ट्रस्टनेट"
    }
  };

  const t = labels[lang];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0C] text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors duration-200">
      
      {/* Header (Logo & Language Switcher) */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-md border border-blue-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-blue-900 dark:text-slate-100">{t.logo}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="skeuo-icon-btn py-2 px-3 rounded-full flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
            aria-label="Toggle Language"
          >
            <Languages className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>
          <ThemeToggle size="sm" />
        </div>
      </header>

      {/* Premium Toast Notification for Errors */}
      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
          >
            <div className="bg-white/80 dark:bg-[#111113]/90 backdrop-blur-xl border border-red-200/60 dark:border-red-900/40 shadow-2xl shadow-red-500/10 rounded-2xl p-4 flex items-start gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div className="flex-1 pt-0.5">
                <h4 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">Authentication Failed</h4>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{submitError}</p>
              </div>
              <button 
                onClick={() => setSubmitError(null)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Form Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full max-w-md skeuo-card p-8 rounded-[28px]"
        >
          {/* Header Texts */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed max-w-xs mx-auto">
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            
            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label 
                htmlFor="email" 
                className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider"
              >
                {t.email}
              </label>
              <div className="relative">
                <input 
                  id="email"
                  type="email"
                  placeholder="name@domain.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register('email')}
                  disabled={isSubmitting || isSuccess}
                  className={`w-full py-3.5 pl-10 pr-4 rounded-xl text-sm skeuo-input focus:outline-none transition-all ${
                    errors.email
                      ? 'border-red-500/60 focus:border-red-500'
                      : ''
                  }`}
                />
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
              </div>
              {errors.email && (
                <span id="email-error" className="text-red-600 dark:text-red-400 text-xs font-semibold mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label 
                htmlFor="password" 
                className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider"
              >
                {t.password}
              </label>
              <div className="relative">
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  {...register('password')}
                  disabled={isSubmitting || isSuccess}
                  className={`w-full py-3.5 pl-10 pr-10 rounded-xl text-sm skeuo-input focus:outline-none transition-all ${
                    errors.password
                      ? 'border-red-500/60 focus:border-red-500'
                      : ''
                  }`}
                />
                <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isSubmitting || isSuccess}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                  aria-label={showPassword ? t.hide : t.show}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <span id="password-error" className="text-red-600 dark:text-red-400 text-xs font-semibold mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs mt-1">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-500 dark:text-slate-400 select-none">
                <input 
                  type="checkbox" 
                  {...register('rememberMe')}
                  disabled={isSubmitting || isSuccess}
                  className="rounded text-blue-600 focus:ring-blue-500/30 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 w-4 h-4"
                />
                <span>{t.rememberMe}</span>
              </label>

              <a 
                href="#forgot" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
                onClick={(e) => e.preventDefault()}
              >
                {t.forgotPassword}
              </a>
            </div>

            {/* Primary Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting || isSuccess}
              className={`w-full py-3.5 rounded-xl text-white font-bold transition-all duration-200 flex items-center justify-center gap-2 mt-2 cursor-pointer ${
                isSuccess 
                  ? 'bg-green-600 hover:bg-green-600 border-green-700 shadow-md' 
                  : 'skeuo-button-primary'
              } disabled:opacity-80 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.signingIn}</span>
                </>
              ) : isSuccess ? (
                <>
                  <Check className="w-4 h-4 animate-bounce" />
                  <span>{t.success}</span>
                </>
              ) : (
                <span>{t.signIn}</span>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
            <span className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
              {t.divider}
            </span>
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
          </div>

          {/* Social Sign-In Buttons */}
          <div className="flex flex-col gap-3">
            {/* Google */}
            <button 
              type="button"
              onClick={async () => {
                try {
                  await loginWithGoogle();
                  setIsSuccess(true);
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  navigate('/dashboard');
                } catch (err: any) {
                  setSubmitError(err.message || 'Failed to sign in with Google');
                }
              }}
              disabled={isSubmitting || isSuccess}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 skeuo-button-secondary cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.64l3.15-3.15C17.45 1.74 14.9 1 12 1 7.35 1 3.4 3.65 1.49 7.52l3.77 2.92C6.18 7.37 8.87 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-2 3.73-4.94 3.73-8.55z" />
                <path fill="#FBBC05" d="M5.26 14.56c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18L1.49 7.28C.54 9.2.02 11.53.02 14s.52 4.8 1.47 6.72l3.77-2.92c-.23-.69-.36-1.42-.36-2.18z" />
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.7-2.87c-1.03.69-2.34 1.1-4.26 1.1-3.13 0-5.82-2.33-6.74-5.4L1.49 16.28C3.4 20.15 7.35 23 12 23z" />
              </svg>
              <span>{t.google}</span>
            </button>

            {/* GitHub */}
            <button 
              type="button"
              onClick={() => console.log("GitHub OAuth triggered")}
              disabled={isSubmitting || isSuccess}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 skeuo-button-secondary cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-slate-800 dark:text-slate-200" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>{t.github}</span>
            </button>
          </div>

          {/* Footer Text */}
          <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>{t.noAccount} </span>
            <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">
              {t.createAccount}
            </Link>
          </div>

        </motion.div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full py-6 text-center text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-200/40 dark:border-slate-800/40 flex flex-col sm:flex-row justify-center items-center gap-2">
        <span>Copyright © 2026 TrustNet. All rights reserved.</span>
        <span className="hidden sm:block text-slate-300 dark:text-slate-700">•</span>
        <span>Made by Khushi Verma, Arpit Raj, Ishani Gupta</span>
      </footer>

    </div>
  );
}

export default LoginPage;
