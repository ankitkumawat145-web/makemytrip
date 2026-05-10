
import { useState, useEffect } from 'react';
import { useTravel } from '../context/TravelContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plane, ArrowRight, Shield, Globe, Zap, Mail, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Landing() {
  const { login, user } = useTravel();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('ankit.traveler@india.com');
  const [password, setPassword] = useState('password');

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: 'Ankit Kumawat',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      currency: 'INR',
      language: 'English',
      savedDestinations: ['Jaipur', 'Goa']
    });
    // Explicitly navigate after login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex overflow-hidden text-slate-900 dark:text-slate-100 transition-colors">
      {/* Left Pane - Hero Content */}
      <div className="hidden lg:flex flex-col justify-between p-12 w-1/2 relative bg-white dark:bg-slate-950">
        <div className="absolute inset-0 z-0 opacity-80 dark:opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1920" 
            alt="Taj Mahal" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-white/40 dark:via-slate-950/40 to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Plane className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Traveloop.</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[60px] xl:text-[100px] leading-[0.85] font-black tracking-tighter mb-8 text-slate-900 dark:text-white"
          >
            THE JOY OF <br />
            <span className="text-orange-500">TRAVEL.</span>
          </motion.h1>
          
          <p className="max-w-md text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
            Experience Indian exploration redefined. Plan your perfect multi-city journey with our professional itinerary suite.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-12 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-orange-500" />
            <span>Pan-India Network</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-500" />
            <span>Secure Ecosystem</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-500" />
            <span>Smart Automation</span>
          </div>
        </div>
      </div>

      {/* Right Pane - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 bg-slate-50 dark:bg-slate-900">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm bg-white dark:bg-slate-950 p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800"
        >
          <div className="mb-10 text-center md:text-left">
             {/* Mobile Logo */}
             <div className="flex lg:hidden items-center justify-center gap-2 mb-6 mx-auto">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Plane className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-black text-slate-900 dark:text-white">Traveloop.</span>
             </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">
              {isLogin ? 'Welcome' : 'Join Us'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">
              {isLogin ? 'Access your elite travel dashboard' : 'Begin your professional journey'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-700 group-focus-within:text-orange-500 transition-colors" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all text-slate-900 dark:text-white font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-700 group-focus-within:text-orange-500 transition-colors" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all text-slate-900 dark:text-white font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] md:text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-orange-500 focus:ring-0" />
                <span className="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors font-medium">Keep me active</span>
              </label>
              <button type="button" className="text-orange-500 font-bold hover:text-orange-600 transition-colors">Recover password</button>
            </div>

            <button 
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98]"
            >
              <span>{isLogin ? 'Enter Dashboard' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-white dark:bg-slate-950 px-4 text-slate-300 dark:text-slate-700">SECURE ACCESS</span></div>
            </div>

            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 py-4 rounded-2xl font-bold transition-all"
            >
              {isLogin ? 'Sign up for free' : 'Return to login'}
            </button>
          </form>

          <p className="mt-8 md:mt-12 text-center text-[8px] md:text-[10px] text-slate-400 dark:text-slate-600 leading-relaxed uppercase tracking-[0.2em] font-bold px-4 md:px-8">
            Premium Travel Management Solutions
          </p>
        </motion.div>
      </div>
    </div>
  );
}
