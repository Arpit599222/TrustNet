import { motion } from 'framer-motion';
import { Bell, Info } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: 'Security Alert',
      message: 'Suspicious login attempt blocked from an unknown device.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'System Update',
      message: 'TrustNet core engine updated to v2.1 with improved phishing detection.',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      title: 'Weekly Summary',
      message: 'You scanned 14 links this week. All were marked as safe.',
      time: '3 days ago',
      read: true
    }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
        <Bell className="w-6 h-6 text-blue-600 dark:text-[#2563EB]" />
        Notifications
      </h1>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className={`skeuo-card p-4 flex gap-4 ${!notif.read ? 'border-l-4 border-l-blue-600 dark:border-l-[#2563EB]' : ''}`}>
            <div className="mt-1">
              <Info className={`w-5 h-5 ${!notif.read ? 'text-blue-600 dark:text-[#2563EB]' : 'text-slate-400'}`} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`text-sm font-bold ${!notif.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-[#A3A3A3]'}`}>
                  {notif.title}
                </h3>
                <span className="text-[10px] text-slate-500 font-medium">{notif.time}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-[#A3A3A3] mt-1">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
