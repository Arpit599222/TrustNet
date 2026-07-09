import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Lock, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-blue-600 dark:text-[#2563EB]" />
        Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation/Tabs could go here, but for now we just show sections */}
        <div className="md:col-span-3 space-y-6">
          
          <div className="skeuo-card p-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-slate-400" /> Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Push Notifications</h4>
                  <p className="text-xs text-slate-500 dark:text-[#A3A3A3]">Receive alerts for suspicious activities.</p>
                </div>
                <div className="w-10 h-6 bg-blue-600 dark:bg-[#2563EB] rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Email Digests</h4>
                  <p className="text-xs text-slate-500 dark:text-[#A3A3A3]">Weekly summary of your security score.</p>
                </div>
                <div className="w-10 h-6 bg-slate-200 dark:bg-[#232323] rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white dark:bg-[#A3A3A3] rounded-full absolute left-1 top-1"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="skeuo-card p-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-slate-400" /> Security
            </h3>
            <div className="space-y-4">
              <button className="skeuo-button-secondary w-full py-3 px-4 rounded-xl text-sm font-semibold text-left flex justify-between items-center">
                Change Password
                <span className="text-xs text-slate-400">Last changed 30 days ago</span>
              </button>
              <button className="skeuo-button-secondary w-full py-3 px-4 rounded-xl text-sm font-semibold text-left flex justify-between items-center">
                Two-Factor Authentication
                <span className="text-xs text-slate-400">Disabled</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
