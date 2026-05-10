
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Sparkles, Minus, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { CHATBOT_QA } from '../constants';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Namaste! I'm your Traveloop assistant. How can I help you plan your perfect Indian getaway today?" }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock response logic
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = "That's a great question! I'm still learning about that specific topic, but I can help with itinerary planning, budget tips, and destination recommendations in India.";
      
      const foundQA = CHATBOT_QA.find(qa => lowerInput.includes(qa.q.toLowerCase().split(' ').slice(0, 3).join(' ')));
      if (foundQA) {
        response = foundQA.a;
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Hello! Ready to explore the incredible diversity of India?";
      } else if (lowerInput.includes('budget')) {
        response = "Planning for a budget trip in India is very feasible. Consider exploring places like Hampi, Varanasi, or Gokarna which offer great experiences at lower costs.";
      }

      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="mb-8 w-[90vw] md:w-[420px] h-[500px] md:h-[600px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] md:rounded-[48px] overflow-hidden flex flex-col shadow-2xl shadow-slate-300 dark:shadow-none transition-all text-slate-900 dark:text-slate-100"
          >
            {/* Header */}
            <div className="p-6 md:p-8 bg-orange-500 flex justify-between items-center shadow-lg">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-xl rounded-[16px] md:rounded-[20px] flex items-center justify-center border border-white/20 shadow-sm">
                   <Sparkles className="text-white w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
                 </div>
                 <div className="space-y-0.5 text-white">
                   <h3 className="font-black text-base md:text-lg tracking-tight italic serif">Traveloop AI</h3>
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
                     <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Online Now</span>
                   </div>
                 </div>
               </div>
               <button 
                onClick={() => setIsOpen(false)}
                className="p-2 md:p-3 hover:bg-black/10 rounded-xl md:rounded-2xl transition-colors text-white"
               >
                 <X className="w-5 h-5 md:w-6 md:h-6 stroke-[3]" />
               </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 md:space-y-8 scroll-smooth bg-slate-50/30 dark:bg-slate-950/30"
            >
               {messages.map((msg) => (
                 <div key={msg.id} className={cn(
                    "flex gap-3 md:gap-4 max-w-[95%] md:max-w-[90%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                 )}>
                   <div className={cn(
                      "w-8 h-8 md:w-10 md:h-10 rounded-[12px] md:rounded-[14px] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm border border-slate-100 dark:border-slate-800",
                      msg.role === 'assistant' ? "bg-white dark:bg-slate-900 text-orange-500" : "bg-orange-500 text-white"
                   )}>
                     {msg.role === 'assistant' ? <Bot className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" /> : <User className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />}
                   </div>
                   <div className={cn(
                      "p-4 md:p-5 rounded-[24px] md:rounded-[28px] text-xs md:text-sm leading-relaxed shadow-xl",
                      msg.role === 'assistant' ? "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-50 dark:border-slate-700 font-medium" : "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-black"
                   )}>
                     {msg.content}
                   </div>
                 </div>
               ))}
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
               <div className="relative group">
                 <input 
                  type="text" 
                  placeholder="Inquire about your journey..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[24px] md:rounded-[28px] py-4 md:py-6 pl-6 md:pl-8 pr-14 md:pr-16 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all text-xs md:text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800"
                 />
                 <button 
                  onClick={handleSend}
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-orange-500 text-white rounded-[16px] md:rounded-[20px] hover:bg-orange-600 transition-all shadow-lg active:scale-90"
                 >
                   <Send className="w-4 h-4 md:w-5 md:h-5 stroke-[3]" />
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-orange-500 text-white rounded-[32px] flex items-center justify-center shadow-2xl shadow-orange-500/40 group relative overflow-hidden active:scale-90 transition-all"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        {isOpen ? <Minus className="w-8 h-8 relative z-10 stroke-[3]" /> : <MessageSquare className="w-8 h-8 relative z-10 stroke-[3]" />}
      </motion.button>
    </div>
  );
}
