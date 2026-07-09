
import { motion } from 'framer-motion';
import { User, Mail, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
        <User className="w-6 h-6 text-blue-600 dark:text-[#2563EB]" />
        User Profile
      </h1>

      <div className="skeuo-card p-8 flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-[#171717] border border-slate-200 dark:border-[#232323] flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-[#2563EB]">
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">{user?.name || 'Authorized User'}</h2>
          <p className="text-slate-500 dark:text-[#A3A3A3] flex items-center gap-2 mt-1">
            <Mail className="w-4 h-4" /> {user?.email || 'user@example.com'}
          </p>
          <span className="inline-flex items-center gap-1 px-2 py-1 mt-3 rounded-md bg-green-100 dark:bg-[#22C55E]/20 text-green-600 dark:text-[#22C55E] text-xs font-bold">
            <Shield className="w-3 h-3" /> Account Verified
          </span>
        </div>
      </div>

      <div className="skeuo-card p-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Edit Information</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-[#A3A3A3] uppercase mb-1">Full Name</label>
            <input type="text" defaultValue={user?.name || ''} className="w-full py-3 px-4 rounded-xl text-sm skeuo-input focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-[#A3A3A3] uppercase mb-1">Email Address</label>
            <input type="email" defaultValue={user?.email || ''} className="w-full py-3 px-4 rounded-xl text-sm skeuo-input focus:outline-none" />
          </div>
          <button type="button" className="skeuo-button-primary px-6 py-3 rounded-xl text-sm font-bold w-full mt-2">
            Save Changes
          </button>
        </form>
      </div>
    </motion.div>
  );
}
