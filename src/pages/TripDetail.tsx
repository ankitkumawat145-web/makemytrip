
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Settings, 
  Share2, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Plus, 
  CheckCircle2, 
  Circle,
  FileText,
  Wallet,
  LayoutGrid,
  List,
  Edit3,
  Compass
} from 'lucide-react';
import { cn, formatCurrency, formatDate } from '../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips, updateTrip } = useTravel();
  const trip = trips.find(t => t.id === id);
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');

  if (!trip) return <div className="p-20 text-center font-black text-slate-400 tracking-widest uppercase italic serif">Journey Record Not Located</div>;

  const totalCost = trip.stops.reduce((acc, s) => acc + s.stayCost + s.transportCost + s.activities.reduce((a, act) => a + act.cost, 0), 0);
  
  const budgetData = [
    { name: 'Accommodations', value: trip.stops.reduce((acc, s) => acc + s.stayCost, 0), color: '#fb923c' },
    { name: 'Logistics', value: trip.stops.reduce((acc, s) => acc + s.transportCost, 0), color: '#f97316' },
    { name: 'Experiences', value: trip.stops.reduce((acc, s) => acc + s.activities.reduce((a, act) => a + act.cost, 0), 0), color: '#ea580c' },
  ];

  const toggleChecklistItem = async (itemId: string) => {
    const newChecklist = trip.checklist.map(item => 
      item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
    );
    await updateTrip(trip.id, { checklist: newChecklist });
  };

  const addChecklistItem = async (task: string) => {
    if (!task) return;
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      task,
      category: 'Essentials' as const,
      isCompleted: false
    };
    await updateTrip(trip.id, { checklist: [...trip.checklist, newItem] });
  };

  return (
    <div className="pb-32 text-slate-900 bg-slate-50 min-h-screen font-sans">
      {/* Hero Header */}
      <div className="h-[50vh] relative overflow-hidden group">
        <img 
          src={trip.coverImage || 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=1920'} 
          alt={trip.name} 
          className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="absolute inset-0 p-12 flex flex-col justify-between max-w-7xl mx-auto w-full">
          <header className="flex justify-between items-start">
             <button 
              onClick={() => navigate('/trips')}
              className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] hover:bg-white text-white hover:text-slate-900 transition-all shadow-2xl"
            >
              <ArrowLeft className="w-5 h-5 stroke-[3]" />
            </button>
            <div className="flex gap-4">
              <button className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] hover:bg-white text-white hover:text-slate-900 transition-all shadow-2xl">
                <Share2 className="w-5 h-5 stroke-[3]" />
              </button>
              <Link to={`/trip/${trip.id}/builder`} className="px-10 py-4 bg-orange-500 rounded-[28px] font-black text-white flex items-center gap-3 hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/40 active:scale-95">
                <Edit3 className="w-5 h-5 stroke-[3]" />
                Build Expedition
              </Link>
            </div>
          </header>

          <div className="space-y-6">
             <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-orange-400">
               <Calendar className="w-5 h-5" />
               {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
             </div>
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-black tracking-widest italic serif text-white leading-none">{trip.name}</h1>
                  <p className="text-slate-300 max-w-2xl font-medium leading-relaxed tracking-wide line-clamp-2 md:line-clamp-none">{trip.description}</p>
                </div>
                <div className="text-right space-y-2 bg-white/10 backdrop-blur-2xl p-6 md:p-8 rounded-[40px] border border-white/10 min-w-0 md:min-w-[240px]">
                   <p className="text-[10px] uppercase font-black tracking-[0.2em] text-orange-400">Total Investment</p>
                   <p className="text-3xl md:text-5xl font-black text-white tracking-widest">{formatCurrency(totalCost)}</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
        {/* Left Column: Itinerary View */}
        <div className="lg:col-span-2 space-y-12">
          <div className="flex justify-between items-center bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black tracking-widest text-slate-900 italic serif">The Roadmap</h2>
            <div className="flex bg-slate-50 p-2 rounded-[20px] gap-2 border border-slate-100">
               <button 
                onClick={() => setViewMode('timeline')}
                className={cn("p-2 md:p-3 rounded-2xl transition-all", viewMode === 'timeline' ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-slate-400 hover:text-slate-900")}
               >
                 <List className="w-5 h-5 stroke-[2.5]" />
               </button>
               <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-2 md:p-3 rounded-2xl transition-all", viewMode === 'grid' ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-slate-400 hover:text-slate-900")}
               >
                 <LayoutGrid className="w-5 h-5 stroke-[2.5]" />
               </button>
            </div>
          </div>

          <div className={cn(
            "grid gap-4 transition-all duration-500",
            viewMode === 'timeline' ? "grid-cols-1 border-l-4 border-dashed border-slate-200 ml-4 md:ml-8 pl-8 md:pl-16 space-y-12" : "grid-cols-1 md:grid-cols-2 gap-8"
          )}>
            {trip.stops.map((stop, sIdx) => (
              <motion.div 
                key={stop.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "bg-white border border-slate-100 rounded-[40px] md:rounded-[48px] p-8 md:p-10 relative shadow-2xl shadow-slate-200/50 group transition-all",
                  viewMode === 'timeline' && "after:content-[''] after:absolute after:top-14 after:-left-[54px] md:after:-left-[86px] after:w-10 md:after:w-12 after:h-10 md:after:h-12 after:bg-orange-500 after:rounded-full after:border-8 after:border-slate-50 after:shadow-lg after:shadow-orange-500/20 group-hover:scale-[1.02]"
                )}
              >
                <div className="flex justify-between items-start mb-8 md:mb-10">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black tracking-[0.3em] text-orange-500">Stop {String(sIdx + 1).padStart(2, '0')}</p>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 italic serif tracking-tight">{stop.city}</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2"><MapPin className="w-4 h-4" /> {stop.state}</p>
                  </div>
                  <div className="bg-slate-50 px-4 md:px-6 py-2 md:py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border border-slate-100">
                    {stop.activities.length} Events
                  </div>
                </div>

                <div className="space-y-8">
                  {stop.activities.map((activity, aIdx) => (
                    <div key={activity.id} className="flex gap-4 md:gap-6 group/item">
                      <div className="w-1 bg-slate-100 relative rounded-full">
                        <div className="absolute top-2 -left-1.5 w-4 h-4 rounded-full border-4 border-white bg-orange-500 group-hover/item:scale-125 transition-all shadow-sm" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-black text-slate-900 tracking-tight text-lg">{activity.name}</h4>
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{activity.duration}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed italic">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {trip.stops.length === 0 && (
              <div className="p-16 md:p-24 text-center bg-white rounded-[48px] border-2 border-dashed border-slate-100 shadow-sm space-y-6">
                 <div className="w-20 md:w-24 h-20 md:h-24 bg-orange-50 rounded-[32px] flex items-center justify-center mx-auto">
                   <Compass className="w-10 md:w-12 h-10 md:h-12 text-orange-200 stroke-[1]" />
                 </div>
                 <div className="space-y-2">
                   <h4 className="text-2xl md:text-3xl font-black text-slate-900 italic serif">A blank canvas.</h4>
                   <p className="text-slate-400 max-w-xs mx-auto font-bold uppercase tracking-widest text-[10px]">Your journey is waiting for its first landmark.</p>
                 </div>
                 <Link to={`/trip/${trip.id}/builder`} className="inline-block bg-orange-500 text-white px-8 md:px-10 py-4 rounded-2xl font-black shadow-lg shadow-orange-500/20 active:scale-95 transition-all">Start Building</Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar Widgets */}
        <div className="space-y-12">
          {/* Budget Widget */}
          <div className="bg-white border border-slate-100 rounded-[40px] md:rounded-[48px] p-8 md:p-10 space-y-8 shadow-2xl shadow-slate-200/50">
            <div className="flex justify-between items-center">
              <h3 className="text-xl md:text-2xl font-black flex items-center gap-4 italic serif text-slate-900">
                <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-orange-500" />
                </div>
                Financials
              </h3>
            </div>

            <div className="h-56 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest text-center">Protocol</span>
                 <span className="text-xl font-black text-slate-900 tracking-tighter">Budget</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
               {budgetData.map(item => (
                 <div key={item.name} className="flex items-center justify-between group cursor-help">
                   <div className="flex items-center gap-4">
                     <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.name}</span>
                   </div>
                   <span className="text-sm font-black text-slate-900">{formatCurrency(item.value)}</span>
                 </div>
               ))}
               <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                 <span className="font-black text-[10px] uppercase tracking-widest text-slate-400">Net Valuation</span>
                 <span className="text-2xl font-black text-orange-500 tracking-tighter">{formatCurrency(totalCost)}</span>
               </div>
            </div>
          </div>

          {/* Checklist Widget */}
          <div className="bg-white border border-slate-100 rounded-[40px] md:rounded-[48px] p-8 md:p-10 space-y-8 shadow-2xl shadow-slate-200/50">
             <div className="flex justify-between items-center">
                <h3 className="text-xl md:text-2xl font-black flex items-center gap-4 italic serif text-slate-900">
                   <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                   </div>
                   Essentials
                </h3>
             </div>

             <div className="space-y-4">
               {trip.checklist.map(item => (
                 <div 
                   key={item.id} 
                   className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-slate-50 rounded-2xl transition-all"
                   onClick={() => toggleChecklistItem(item.id)}
                 >
                   {item.isCompleted ? (
                     <CheckCircle2 className="w-6 h-6 text-emerald-500 stroke-[3]" />
                   ) : (
                     <Circle className="w-6 h-6 text-slate-100 hover:text-slate-300 transition-colors stroke-[3]" />
                   )}
                   <span className={cn("text-sm font-bold transition-all", item.isCompleted ? "text-slate-300 line-through italic" : "text-slate-600")}>
                     {item.task}
                   </span>
                 </div>
               ))}

               <div className="pt-6 relative">
                  <input 
                    type="text" 
                    placeholder="Enlist new item..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] py-5 pl-6 pr-12 text-sm outline-none focus:border-orange-500 font-bold text-slate-900 placeholder:text-slate-200 transition-all shadow-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addChecklistItem(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Plus className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 stroke-[3]" />
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
