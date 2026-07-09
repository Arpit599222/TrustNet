import React, { useState, useEffect, createContext, useContext, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme.js';
import { AuthProvider } from './context/AuthContext.js';
import { ProtectedRoute } from './routes/ProtectedRoute.js';
import DashboardLayout from './components/layout/DashboardLayout.js';
import { Loader2 } from 'lucide-react';

// Eagerly loaded public pages
import LandingPage from './pages/LandingPage.js';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';

// Lazy loaded protected pages
const DashboardPage = React.lazy(() => import('./pages/DashboardPage.js'));
const ScannerPage = React.lazy(() => import('./pages/ScannerPage.js'));
const CommunityPage = React.lazy(() => import('./pages/CommunityPage.js'));
const AssistantPage = React.lazy(() => import('./pages/AssistantPage.js'));
const ReportsPage = React.lazy(() => import('./pages/ReportsPage.js'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage.js'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage.js'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage.js'));

// Simple Context for language translation
interface LanguageContextType {
  lang: 'en' | 'hi';
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

// ponytail: i18n context, keep local state for simple translation mapping
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  // Keep <html lang> in sync so SEO/accessibility reflect the active language.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Loading Fallback for Suspense
const PageLoader = () => (
  <div className="h-full min-h-[50vh] flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-blue-600 dark:text-[#2563EB] animate-spin" />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                
                {/* Protected Routes Wrapper */}
                <Route element={<ProtectedRoute />}>
                  {/* Dashboard Layout Wrapper */}
                  <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/scanner" element={<ScannerPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/assistant" element={<AssistantPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    
                    {/* Fallback 404 inside dashboard layout */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
