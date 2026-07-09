
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6"
      >
        <ShieldAlert className="w-10 h-10 text-red-500" />
      </motion.div>
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">404 - Area Restricted</h1>
      <p className="text-slate-500 dark:text-[#A3A3A3] mb-8 max-w-md">
        The page you are looking for does not exist or you do not have the required clearance to access it.
      </p>
      <Link to="/dashboard" className="skeuo-button-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2">
        Return to Dashboard
      </Link>
    </div>
  );
}
