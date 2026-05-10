
import { useParams, Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Globe, ArrowRight, Plane } from 'lucide-react';
import { formatCurrency, formatDate } from '../lib/utils';

export default function SharedView() {
  const { id } = useParams();
  const { trips } = useTravel();
  const trip = trips.find(t => t.id === id);

  if (!trip) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="text-center space-y-8 bg-white p-16 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200">
        <h2 className="text-5xl font-black italic serif text-slate-900 tracking-tight">Expedition <br /><span className="text-orange-500">Not Found.</span></h2>
        <p className="text-slate-400 font-bold max-w-xs mx-auto leading-relaxed">The journey you're looking for might have been archived or relocated.</p>
        <Link to="/" className="inline-block bg-orange-500 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-orange-500/20 active:scale-95 transition-all">Go Home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-32 text-slate-900 font-sans">
       {/* Shared Header Banner */}
       <div className="bg-orange-500 py-4 text-center shadow-lg">
         <p className="text-white text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3">
           <Globe className="w-5 h-5" /> 
           Public Interface: You are analyzing a guest itinerary
         </p>
       </div>

       {/* Hero */}
       <div className="h-[60vh] relative overflow-hidden group">
         <img 
          src={trip.coverImage} 
          alt={trip.name} 
          className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110" 
          referrerPolicy="no-referrer" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
         <div className="absolute inset-0 p-12 flex flex-col justify-end max-w-7xl mx-auto w-full">
            <div className="space-y-6">
               <div className="flex items-center gap-3 text-orange-400 font-black uppercase tracking-[0.4em] text-[10px]">
                 <Calendar className="w-5 h-5" /> 
                 {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
               </div>
               <h1 className="text-6xl md:text-8xl font-black italic serif tracking-[0.05em] text-white leading-[0.8]">{trip.name}</h1>
               <div className="flex items-center gap-12 pt-8 border-t border-white/20 max-w-xl">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Route Benchmarks</p>
                    <p className="text-2xl font-black text-white italic serif">{trip.stops.length} Cities</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Protocol Valuation</p>
                    <p className="text-2xl font-black text-white italic serif">{formatCurrency(trip.budget.spent)}</p>
                  </div>
               </div>
            </div>
         </div>
       </div>

       <div className="p-6 md:p-12 max-w-5xl mx-auto space-y-16">
          <div className="space-y-3 bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm text-center">
            <h2 className="text-4xl font-black tracking-tight italic serif text-slate-900 leading-tight">The Journey Blueprint</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">A strategic breakdown of this Indian expedition architecture.</p>
          </div>

          <div className="space-y-16 border-l-4 border-dashed border-slate-100 pl-10 md:pl-16 ml-4 md:ml-8">
            {trip.stops.map((stop, i) => (
              <motion.div 
                key={stop.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[54px] md:-left-[86px] top-2 w-10 h-10 bg-orange-500 rounded-full border-8 border-slate-50 shadow-lg shadow-orange-500/20" />
                <div className="space-y-10 group">
                  <header className="space-y-1">
                    <p className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px]">Benchmark {i+1}</p>
                    <h3 className="text-4xl font-black italic serif text-slate-900 group-hover:text-orange-500 transition-colors">{stop.city}</h3>
                    <p className="text-slate-300 font-black uppercase tracking-[0.2em] text-[10px]">{stop.state}</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {stop.activities.map(activity => (
                      <div key={activity.id} className="bg-white border border-slate-100 p-8 rounded-[40px] space-y-4 hover:scale-[1.02] transition-all shadow-2xl shadow-slate-200/50">
                         <div className="flex justify-between items-start gap-4">
                           <h4 className="font-black text-xl italic serif text-slate-900 tracking-tight leading-none">{activity.name}</h4>
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap">{activity.duration}</span>
                         </div>
                         <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-3">{activity.description}</p>
                         <div className="pt-4 border-t border-slate-100">
                           <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Planned Activity</span>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-32 text-center space-y-12">
             <div className="space-y-4">
               <h3 className="text-5xl font-black italic serif tracking-[0.05em] text-slate-900">Inspired? Discover India.</h3>
               <p className="text-slate-400 font-bold max-w-sm mx-auto uppercase tracking-widest text-[10px] leading-relaxed">Architect your own professional itineraries with Traveloop's intelligent frameworks.</p>
             </div>
             <Link 
              to="/" 
              className="inline-flex items-center gap-4 bg-orange-500 text-white px-12 py-6 rounded-3xl font-black text-lg shadow-2xl shadow-orange-500/40 hover:bg-orange-600 transition-all hover:scale-105 group active:scale-95"
             >
               Deploy Your Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform stroke-[3]" />
             </Link>
          </div>
       </div>

       {/* Footer Branding */}
       <footer className="py-24 border-t border-slate-100 text-center space-y-6 bg-white">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Plane className="text-white w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-3xl font-black text-slate-900 tracking-tighter italic serif">Traveloop.</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.6em] font-black text-slate-300">Premium Indian Travel Intelligence Interface</p>
       </footer>
    </div>
  );
}
