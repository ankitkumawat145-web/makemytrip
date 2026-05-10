
import { useTravel } from '../context/TravelContext';
import { motion } from 'motion/react';
import { User, Mail, Globe, Wallet, Shield, Bell, MapPin, ChevronRight, Edit3, Camera } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function Profile() {
  const { user } = useTravel();

  const settingsGroups = [
    {
      title: 'Global Attributes',
      items: [
        { name: 'Portfolio Currency', value: user?.user_metadata?.currency || 'INR', icon: Wallet },
        { name: 'Native Language', value: user?.user_metadata?.language || 'English', icon: Globe },
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

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Voyager';
  const avatarUrl = user?.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
  const savedDestinations = user?.user_metadata?.savedDestinations || ['Paris', 'Tokyo', 'London'];

  return (
    <div className="p-12 max-w-4xl mx-auto space-y-16 pb-32 text-slate-900">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-6xl font-black tracking-tighter italic serif text-slate-900 leading-[0.9]">User <br /><span className="text-orange-500 underline underline-offset-8">Account.</span></h1>
          <p className="text-slate-400 text-lg font-bold">Manage your professional identity and exploration parameters.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Left Column: Avatar & Basic Info */}
        <div className="space-y-10">
           <div className="relative group mx-auto w-56">
              <div className="w-56 h-56 rounded-[64px] overflow-hidden border-8 border-white bg-slate-50 shadow-2xl shadow-slate-200 transition-transform group-hover:scale-[1.02]">
                <img 
                  src={avatarUrl} 
                  alt={fullName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button title="Change Avatar" className="absolute -bottom-2 -right-2 p-4 bg-orange-500 text-white rounded-3xl shadow-2xl shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-90 border-4 border-white">
                <Camera className="w-6 h-6 stroke-[3]" />
              </button>
           </div>

           <div className="text-center space-y-2">
              <h2 className="text-3xl font-black italic serif text-slate-900">{fullName}</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" /> {user?.email}
              </p>
           </div>

           <div className="bg-white border border-slate-100 rounded-[40px] p-8 space-y-6 shadow-xl shadow-slate-200/50">
              <h3 className="text-[10px] uppercase font-black text-slate-300 tracking-[0.2em] ml-1">Favorite Territories</h3>
              <div className="flex flex-wrap gap-2 text-slate-900">
                 {savedDestinations.map((dest: string) => (
                   <span key={dest} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 shadow-sm">
                     {dest}
                   </span>
                 ))}
                 <button className="px-4 py-2 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-orange-500 hover:border-orange-500 transition-all cursor-pointer">
                   + Deploy New
                 </button>
              </div>
           </div>
        </div>

        {/* Right Column: Settings & Actions */}
        <div className="md:col-span-2 space-y-12">
          {settingsGroups.map((group) => (
            <div key={group.title} className="space-y-6">
              <h3 className="text-[10px] uppercase font-black text-orange-500 tracking-[0.3em] ml-2">{group.title}</h3>
              <div className="bg-white border border-slate-100 rounded-[48px] overflow-hidden shadow-2xl shadow-slate-200/50 divide-y divide-slate-50">
                 {group.items.map((item) => (
                   <div key={item.name} className="p-8 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-all active:scale-[0.995]">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-slate-50 rounded-[24px] flex items-center justify-center text-slate-300 group-hover:bg-orange-50 group-hover:text-orange-500 transition-all border border-slate-100">
                          <item.icon className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-black text-slate-900 italic serif">{item.name}</p>
                          <p className="text-[10px] text-slate-300 uppercase tracking-[0.2em] font-black">{item.value}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-slate-900 transition-all transform group-hover:translate-x-2" />
                   </div>
                 ))}
              </div>
            </div>
          ))}

          <div className="flex gap-6 pt-4">
             <button className="flex-1 border-2 border-slate-100 hover:bg-slate-50 text-slate-400 py-6 rounded-[32px] font-black uppercase tracking-widest text-[10px] transition-all active:scale-95">
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
