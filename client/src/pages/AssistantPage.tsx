import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User } from 'lucide-react';

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: 'Hello! I am TrustNet AI. How can I help secure your digital life today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMsg = { id: Date.now(), role: 'user', text: input };
    setMessages([...messages, newMsg]);
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        text: 'I am analyzing that request. As an AI assistant, I can help you verify suspicious messages or check links.'
      }]);
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-600 dark:text-[#2563EB]" />
          AI Security Assistant
        </h1>
      </div>

      <div className="flex-1 skeuo-card p-4 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto trust-scroll p-2 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                m.role === 'user' ? 'bg-slate-200 dark:bg-[#171717] text-slate-600 dark:text-[#A3A3A3]' : 'bg-blue-100 dark:bg-[#2563EB]/20 text-blue-600 dark:text-[#2563EB]'
              }`}>
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 dark:bg-[#171717] text-slate-800 dark:text-white rounded-tl-none border border-slate-200 dark:border-[#232323]'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="mt-4 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a suspicious email or link..."
            className="w-full py-3.5 pl-4 pr-12 rounded-xl text-sm skeuo-input focus:outline-none"
          />
          <button type="submit" className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
