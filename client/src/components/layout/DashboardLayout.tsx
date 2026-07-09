import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Scan, 
  Users, 
  Bot, 
  FileText, 
  User, 
  Settings, 
  Bell, 
  LogOut,
  Menu
} from 'lucide-react';
import ThemeToggle from '../ThemeToggle.js';

export default function DashboardLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Scanner', path: '/scanner', icon: Scan },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'AI Assistant', path: '/assistant', icon: Bot },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  const bottomNavItems = [
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-[#F5CBCB] dark:border-[#232323]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C5B3D3] dark:bg-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-slate-900 dark:text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">TrustNet AI</span>
        </div>
      </div>

      {/* Main Links */}
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto trust-scroll">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#C5B3D3]/20 dark:bg-[#2563EB]/10 text-[#C5B3D3] dark:text-[#2563EB]'
                  : 'text-slate-600 dark:text-[#A3A3A3] hover:bg-[#FBEFEF] dark:hover:bg-[#171717] hover:text-slate-900 dark:hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Bottom Links */}
      <div className="p-4 border-t border-[#F5CBCB] dark:border-[#232323] space-y-1">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#C5B3D3]/20 dark:bg-[#2563EB]/10 text-[#C5B3D3] dark:text-[#2563EB]'
                  : 'text-slate-600 dark:text-[#A3A3A3] hover:bg-[#FBEFEF] dark:hover:bg-[#171717] hover:text-slate-900 dark:hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-[#EF4444] hover:bg-red-50 dark:hover:bg-[#EF4444]/10 transition-all duration-200 mt-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBEFEF] dark:bg-[#050505] flex transition-colors duration-200">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 bg-[#FFE2E2] dark:bg-[#0B0B0B] border-r border-[#F5CBCB] dark:border-[#232323] fixed inset-y-0 left-0 z-40">
        <NavContent />
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 dark:bg-[#050505]/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-72 bg-[#FFE2E2] dark:bg-[#0B0B0B] z-50 lg:hidden"
            >
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-20 bg-[#FFE2E2]/80 dark:bg-[#0B0B0B]/80 backdrop-blur-xl border-b border-[#F5CBCB] dark:border-[#232323] sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-[#F5CBCB]/50 dark:text-[#A3A3A3] dark:hover:bg-[#171717] lg:hidden cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white hidden sm:block">
              {user?.name ? `Welcome back, ${user.name}` : 'TrustNet Platform'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="w-10 h-10 rounded-full bg-[#FBEFEF] dark:bg-[#171717] border border-[#F5CBCB] dark:border-[#232323] flex items-center justify-center font-bold text-[#C5B3D3] dark:text-[#2563EB]">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
