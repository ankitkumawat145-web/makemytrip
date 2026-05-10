
import { useTravel } from '../context/TravelContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { 
  User, Mail, Globe, Wallet, Shield, Bell, MapPin, 
  ChevronRight, Edit3, Camera, Sun, Moon,
  Star, Map, Compass, Award, Briefcase, Settings as SettingsIcon
} from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function Profile() {
  const { user, trips } = useTravel();
  const { theme, toggleTheme } = useTheme();

  const stats = [
    { label: 'Trips Taken', value: trips.length, icon: Map },
    { label: 'Destinations', value: user?.savedDestinations.length || 0, icon: Compass },
    { label: 'Global Rank', value: '#124', icon: Award },
    { label: 'Trust Score', value: '4.9', icon: Star },
  ];

  const settingsGroups = [
    {
      title: 'Global Attributes',
      items: [
        { name: 'Portfolio Currency', value: user?.currency || 'INR', icon: Wallet },
        { name: 'Native Language', value: user?.language || 'English', icon: Globe },
        { name: 'System Notifications', value: 'Live', icon: Bell },
      ]
    },
    {
      title: 'Security Protocol',
      items: [
        { name: 'Access Key', value: '••••••••', icon: Shield },
        { name: 'Two-Step Verification', value: 'Inactive', icon: Shield },
      ]
    }
  ];

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto space-y-12 md:space-y-16 pb-32 text-slate-900 dark:text-slate-100 transition-colors">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic serif text-slate-900 dark:text-white leading-[0.9]">User <br /><span className="text-orange-500 underline underline-offset-8">Account.</span></h1>
          <p className="text-slate-400 dark:text-slate-500 text-base md:text-lg font-bold">Manage your professional identity and exploration parameters.</p>
        </div>
        <div className="flex gap-4">
           <button 
            onClick={toggleTheme}
            className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none text-slate-400 hover:text-orange-500 transition-all"
           >
            {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
           </button>
           <button className="p-4 bg-orange-500 text-white rounded-2xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all">
            <Edit3 className="w-6 h-6 stroke-[2.5]" />
           </button>
        </div>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-none space-y-4"
          >
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-500">
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black italic serif text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Left Column: Avatar & Dest */}
        <div className="space-y-10">
           <div className="relative group mx-auto w-56">
              <div className="w-56 h-56 rounded-[64px] overflow-hidden border-8 border-white dark:border-slate-900 bg-slate-50 dark:bg-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none transition-transform group-hover:scale-[1.02]">
                <img 
                  src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'} 
                  alt={user?.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 p-4 bg-orange-500 text-white rounded-3xl shadow-2xl shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-90 border-4 border-white dark:border-slate-900">
                <Camera className="w-6 h-6 stroke-[3]" />
              </button>
           </div>

           <div className="text-center space-y-2">
              <h2 className="text-3xl font-black italic serif text-slate-900 dark:text-white">{user?.name}</h2>
              <div className="flex items-center justify-center gap-2">
                <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-wider">Explorer Grade</div>
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" /> {user?.email}
              </p>
           </div>

           <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[40px] p-8 space-y-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <h3 className="text-[10px] uppercase font-black text-slate-300 dark:text-slate-600 tracking-[0.2em] ml-1">Favorite Territories</h3>
              <div className="flex flex-wrap gap-2">
                 {user?.savedDestinations.map(dest => (
                   <span key={dest} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 shadow-sm">
                     {dest}
                   </span>
                 ))}
                 <button className="px-4 py-2 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-600 hover:text-orange-500 hover:border-orange-500 transition-all cursor-pointer">
                   + Deploy New
                 </button>
              </div>
           </div>
        </div>

        {/* Right Column: Settings */}
        <div className="lg:col-span-2 space-y-12">
          {settingsGroups.map((group) => (
            <div key={group.title} className="space-y-6">
              <h3 className="text-[10px] uppercase font-black text-orange-500 tracking-[0.3em] ml-2">{group.title}</h3>
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[48px] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none divide-y divide-slate-50 dark:divide-slate-800">
                 {group.items.map((item) => (
                   <div key={item.name} className="p-8 flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.995]">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-[24px] flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20 group-hover:text-orange-500 transition-all border border-slate-100 dark:border-slate-700">
                          <item.icon className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-black text-slate-900 dark:text-white italic serif">{item.name}</p>
                          <p className="text-[10px] text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em] font-black">{item.value}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-200 dark:text-slate-800 group-hover:text-slate-900 dark:group-hover:text-white transition-all transform group-hover:translate-x-2" />
                   </div>
                 ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4">
             <button className="flex-1 border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-400 dark:text-slate-500 py-6 rounded-[32px] font-black uppercase tracking-widest text-[10px] transition-all active:scale-95">
               Deactivate Profile
             </button>
             <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-[32px] font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-orange-500/20 active:scale-95 border-0">
               Save Modifications
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
