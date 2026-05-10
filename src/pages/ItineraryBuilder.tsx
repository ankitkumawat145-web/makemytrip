
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Plus, 
  MapPin, 
  Calendar as CalendarIcon, 
  X, 
  Map as MapIcon, 
  Search, 
  Info,
  Clock,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { INDIAN_CITIES, SUGGESTED_ACTIVITIES } from '../constants';
import { cn, formatCurrency } from '../lib/utils';
import { CityStop, Activity } from '../types';

export default function ItineraryBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips, updateTrip } = useTravel();
  const trip = trips.find(t => t.id === id);

  const [activeTab, setActiveTab] = useState<'cities' | 'activities'>('cities');
  const [selectedCity, setSelectedCity] = useState<typeof INDIAN_CITIES[0] | null>(null);
  const [stops, setStops] = useState<CityStop[]>([]);

  useEffect(() => {
    if (trip) setStops(trip.stops);
  }, [trip]);

  if (!trip) return <div>Trip not found</div>;

  const handleAddStop = async (city: typeof INDIAN_CITIES[0]) => {
    const newStop: CityStop = {
      id: Math.random().toString(36).substr(2, 9),
      city: city.name,
      state: city.state,
      arrivalDate: trip.startDate,
      departureDate: trip.endDate,
      activities: [],
      stayCost: city.costIndex === 'High' ? 5000 : 2500,
      transportCost: 1500
    };
    const newStops = [...stops, newStop];
    setStops(newStops);
    await updateTrip(trip.id, { stops: newStops });
  };

  const handleRemoveStop = async (stopId: string) => {
    const newStops = stops.filter(s => s.id !== stopId);
    setStops(newStops);
    await updateTrip(trip.id, { stops: newStops });
  };

  const handleAddActivity = async (stopId: string, activity: (typeof SUGGESTED_ACTIVITIES)[0]) => {
    const newActivity: Activity = {
      ...activity,
      id: Math.random().toString(36).substr(2, 9),
      category: activity.category as any
    };
    const newStops = stops.map(s => 
      s.id === stopId ? { ...s, activities: [...s.activities, newActivity] } : s
    );
    setStops(newStops);
    await updateTrip(trip.id, { stops: newStops });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans">
      {/* Left Pane: Stop Management */}
      <div className="w-1/2 p-10 overflow-y-auto scroll-smooth border-r border-slate-100 space-y-12 pb-40">
        <header className="space-y-6">
          <button 
            onClick={() => navigate(`/trip/${trip.id}`)}
            className="flex items-center gap-3 text-slate-400 hover:text-orange-500 transition-all group font-black uppercase tracking-[0.2em] text-[10px]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform stroke-[3]" />
            Back to Strategy
          </button>
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight italic serif text-slate-900 leading-tight">{trip.name}</h1>
            <div className="text-slate-400 flex items-center gap-3 uppercase tracking-widest text-[10px] font-black">
              <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
                <CalendarIcon className="w-4 h-4 text-orange-500 stroke-[2.5]" />
              </div>
              {trip.startDate} — {trip.endDate}
            </div>
          </div>
        </header>

        <section className="space-y-8">
          <h2 className="text-2xl font-black italic serif flex items-center gap-4">
            <div className="w-10 h-1 bg-orange-500 rounded-full" />
            Route Architecture
          </h2>

          <div className="space-y-6 relative">
             {stops.length > 1 && (
               <div className="absolute left-10 top-12 bottom-12 w-[4px] bg-slate-100 z-0 rounded-full" />
             )}
             
             {stops.length === 0 && (
               <div className="bg-white border-2 border-dashed border-slate-100 rounded-[40px] p-20 text-center space-y-6 shadow-sm">
                 <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto transition-transform hover:scale-110">
                  <MapIcon className="w-10 h-10 text-slate-200 stroke-[1]" />
                 </div>
                 <p className="text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] max-w-xs mx-auto leading-relaxed">Select a focal destination from the catalog to begin benchmarking your route.</p>
               </div>
             )}

             <AnimatePresence mode="popLayout">
               {stops.map((stop, index) => (
                 <motion.div 
                   key={stop.id}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="bg-white border border-slate-100 rounded-[40px] p-8 relative z-10 flex flex-col gap-8 shadow-2xl shadow-slate-200/50 hover:scale-[1.02] transition-all"
                 >
                   <div className="flex justify-between items-start">
                     <div className="flex gap-6">
                        <div className="w-16 h-16 bg-orange-500 text-white rounded-[24px] flex items-center justify-center font-black text-2xl shadow-xl shadow-orange-500/20 italic serif border-4 border-white">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-2xl font-black italic serif tracking-tight">{stop.city}</h3>
                          <p className="text-[10px] uppercase font-black text-slate-300 tracking-[0.2em]">{stop.state}</p>
                        </div>
                     </div>
                     <button 
                        onClick={() => handleRemoveStop(stop.id)}
                        className="p-3 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm active:scale-90"
                      >
                        <Trash2 className="w-5 h-5 stroke-[2.5]" />
                      </button>
                   </div>

                   <div className="space-y-6">
                     <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 border-b border-slate-50 pb-3">
                       <span>Operational Activities</span>
                       <span className="text-orange-500">{stop.activities.length} Total</span>
                     </div>
                     
                     <div className="flex flex-wrap gap-3">
                       {stop.activities.map(activity => (
                         <div key={activity.id} className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 group hover:bg-white transition-all shadow-sm">
                            <span className="text-slate-900">{activity.name}</span>
                            <span className="text-orange-500/80">{formatCurrency(activity.cost)}</span>
                         </div>
                       ))}
                       <button 
                        onClick={() => {
                          setSelectedCity(INDIAN_CITIES.find(c => c.name === stop.city) || null);
                          setActiveTab('activities');
                        }}
                        className="px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-orange-500 text-white hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95"
                       >
                         <Plus className="w-4 h-4 stroke-[3]" /> Add Event
                       </button>
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-50">
                      <div className="space-y-1">
                        <p className="text-[9px] uppercase font-black text-slate-300 tracking-[0.2em]">Logistic Base</p>
                        <p className="text-lg font-black text-slate-900 tracking-tighter">{formatCurrency(stop.stayCost + stop.transportCost)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] uppercase font-black text-slate-300 tracking-[0.2em]">Activity Budget</p>
                        <p className="text-lg font-black text-orange-500 tracking-tighter">
                          {formatCurrency(stop.activities.reduce((acc, a) => acc + a.cost, 0))}
                        </p>
                      </div>
                   </div>
                 </motion.div>
               ))}
             </AnimatePresence>
          </div>
        </section>

        <footer className="fixed bottom-0 left-0 w-1/2 p-8 bg-white/80 backdrop-blur-3xl border-r border-slate-100 flex justify-between items-center z-50 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.05)]">
           <div className="space-y-1">
             <p className="text-[10px] uppercase font-black text-slate-300 tracking-[0.3em]">Aggregate Valuation</p>
             <p className="text-4xl font-black italic serif text-slate-900 tracking-tighter">
               {formatCurrency(stops.reduce((acc, s) => acc + s.stayCost + s.transportCost + s.activities.reduce((a, act) => a + act.cost, 0), 0))}
             </p>
           </div>
           <button 
            onClick={() => navigate(`/trip/${trip.id}`)}
            className="bg-orange-500 text-white px-12 py-5 rounded-[28px] font-black text-lg shadow-2xl shadow-orange-500/40 hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 border-0"
           >
             Lock Itinerary <ChevronRight className="w-6 h-6 stroke-[3]" />
           </button>
        </footer>
      </div>

      {/* Right Pane: Catalog / Explorer */}
      <div className="w-1/2 bg-white h-full flex flex-col shadow-2xl shadow-slate-200">
        <div className="p-10 border-b border-slate-50 space-y-8 bg-slate-50/20">
          <div className="flex bg-white p-2 rounded-[28px] gap-2 border border-slate-100 shadow-sm">
            <button 
              onClick={() => setActiveTab('cities')}
              className={cn(
                "flex-1 py-4 font-black uppercase tracking-widest text-[10px] rounded-[22px] transition-all",
                activeTab === 'cities' ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20" : "text-slate-400 hover:text-slate-900"
              )}
            >
              Territories
            </button>
            <button 
              onClick={() => setActiveTab('activities')}
              className={cn(
                "flex-1 py-4 font-black uppercase tracking-widest text-[10px] rounded-[22px] transition-all",
                activeTab === 'activities' ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20" : "text-slate-400 hover:text-slate-900"
              )}
            >
              Curated Events
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500 transition-colors stroke-[2.5]" />
            <input 
              type="text" 
              placeholder={activeTab === 'cities' ? "Search for Indian territories..." : "Search for experiences..."}
              className="w-full bg-white border border-slate-100 shadow-sm rounded-[32px] py-6 pl-16 pr-6 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all text-sm font-bold text-slate-900 placeholder:text-slate-200"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 pt-6 space-y-8 scroll-smooth pb-32">
          <AnimatePresence mode="wait">
            {activeTab === 'cities' ? (
              <motion.div 
                key="cities-grid"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="grid grid-cols-2 gap-8"
              >
                 {INDIAN_CITIES.map(city => (
                   <div 
                    key={city.name} 
                    className="group relative h-64 rounded-[48px] overflow-hidden cursor-pointer shadow-2xl shadow-slate-200/50 hover:scale-[1.02] transition-all border border-white"
                    onClick={() => handleAddStop(city)}
                   >
                     <img src={city.image} alt={city.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" referrerPolicy="no-referrer" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent group-hover:from-slate-900/60 transition-all" />
                     <div className="absolute inset-0 p-8 flex flex-col justify-end gap-1">
                       <h4 className="font-black text-2xl text-white italic serif tracking-tight">{city.name}</h4>
                       <p className="text-[10px] uppercase font-black text-white/60 tracking-[0.3em]">{city.state}</p>
                       <div className="mt-4 overflow-hidden h-0 group-hover:h-12 transition-all duration-500">
                          <button className="w-full bg-white text-slate-900 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Integrate Destination</button>
                       </div>
                     </div>
                   </div>
                 ))}
              </motion.div>
            ) : (
              <motion.div 
                key="activities-list"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                {stops.length === 0 && (
                  <div className="p-16 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-100 space-y-6">
                    <div className="w-20 h-20 bg-white rounded-[32px] flex items-center justify-center mx-auto shadow-sm">
                      <Info className="w-10 h-10 text-orange-200 stroke-[1]" />
                    </div>
                    <p className="text-slate-300 text-[10px] uppercase font-black tracking-[0.2em] italic max-w-xs mx-auto leading-relaxed">Select at least one territorial benchmark to deploy relevant events for that protocol.</p>
                  </div>
                )}
                
                {stops.map(stop => (
                  <div key={stop.id} className="space-y-6 bg-slate-50/50 p-8 rounded-[40px] border border-slate-100 shadow-inner">
                    <h3 className="text-[10px] uppercase font-black text-orange-500 tracking-[0.3em] flex items-center gap-3 bg-white px-6 py-2.5 rounded-full border border-slate-100 shadow-sm self-start inline-flex">
                      <MapPin className="w-4 h-4 stroke-[2.5]" /> Protocols for {stop.city}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {SUGGESTED_ACTIVITIES.map(activity => (
                        <div 
                          key={activity.name}
                          className="bg-white border border-slate-100 rounded-[32px] p-6 flex justify-between items-center hover:border-orange-500 hover:scale-[1.02] transition-all cursor-pointer group shadow-sm active:scale-98"
                          onClick={() => handleAddActivity(stop.id, activity)}
                        >
                          <div className="flex gap-5">
                            <div className="w-14 h-14 bg-slate-50 rounded-[20px] flex items-center justify-center font-black text-slate-300 group-hover:bg-orange-50 group-hover:text-orange-500 transition-all border border-slate-100">
                              {activity.category[0]}
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-black text-lg italic serif text-slate-900 tracking-tight">{activity.name}</h4>
                              <div className="flex gap-4 text-[10px] text-slate-300 font-black uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 stroke-[2.5]" /> {activity.duration}</span>
                                <span>{activity.category}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="font-black text-lg text-slate-900 tracking-tighter">{formatCurrency(activity.cost)}</span>
                            <div className="p-2 bg-orange-50 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all text-orange-500 shadow-sm shadow-orange-500/5">
                              <Plus className="w-4 h-4 stroke-[3]" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
