import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './theme.js';
import { AuthProvider } from './context/AuthContext.js';
import { LanguageProvider } from './context/LanguageContext.js';
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
const NotificationsPage = React.lazy(() => import('./pages/NotificationsPage.js'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage.js'));

// LanguageProvider is imported from ./context/LanguageContext.js

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
                <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
                
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
                    <Route path="/notifications" element={<NotificationsPage />} />
                    
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
