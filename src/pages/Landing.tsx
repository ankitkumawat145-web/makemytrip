
import { useEffect } from 'react';
import { useTravel } from '../context/TravelContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plane, ArrowRight, Shield, Globe, Zap } from 'lucide-react';

export default function Landing() {
  const { user } = useTravel();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white flex overflow-hidden text-slate-900">
      {/* Left Pane - Hero Content */}
      <div className="hidden lg:flex flex-col justify-between p-12 w-1/2 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1920" 
            alt="Taj Mahal" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Plane className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">Traveloop.</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[100px] leading-[0.85] font-black tracking-tighter mb-8 text-slate-900"
          >
            THE JOY OF <br />
            <span className="text-orange-500">TRAVEL.</span>
          </motion.h1>
          
          <p className="max-w-md text-slate-600 text-lg leading-relaxed font-medium">
            Experience Indian exploration redefined. Plan your perfect multi-city journey with our professional itinerary suite.
          </p>
        </div>

        <div className="relative z-10 flex gap-12 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
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

      {/* Right Pane - Call to Action */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm bg-white p-12 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 text-center"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-black mb-4 text-slate-900 tracking-tight leading-tight">
              Ready to <br /><span className="text-orange-500">Explore?</span>
            </h2>
            <p className="text-slate-500 font-medium">
              India's premium travel management platform for professional explorers.
            </p>
          </div>

          <div className="space-y-4">
            <Link 
              to="/login"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-6 rounded-2xl flex items-center justify-center gap-2 group transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]"
            >
              <span>Sign In to Account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/signup"
              className="w-full border-2 border-slate-100 hover:bg-slate-50 text-slate-600 py-6 rounded-2xl font-bold transition-all flex items-center justify-center"
            >
              Create New Identity
            </Link>
          </div>

          <p className="mt-16 text-[10px] text-slate-400 leading-relaxed uppercase tracking-[0.2em] font-black px-8">
            Secured by Supabase Cloud
          </p>
        </motion.div>
      </div>
    </div>
  );
}
