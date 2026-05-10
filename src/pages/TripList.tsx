
import { useTravel } from '../context/TravelContext';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Plane, Calendar, MapPin, Search, Plus, Filter, Trash2, MoreVertical } from 'lucide-react';
import { formatCurrency, formatDate } from '../lib/utils';
import { useState } from 'react';

export default function TripList() {
  const { trips, deleteTrip } = useTravel();
  const [search, setSearch] = useState('');

  const filteredTrips = trips.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-12 max-w-7xl mx-auto space-y-12 pb-32 text-slate-900">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-6xl font-black tracking-tighter italic serif text-slate-900 leading-[0.9]">My <br /><span className="text-orange-500 underline underline-offset-8">Journeys.</span></h1>
          <p className="text-slate-400 text-lg font-bold">A collection of your past and future Indian explorations.</p>
        </div>
        <Link 
          to="/create-trip"
          className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-3xl font-black flex items-center gap-3 transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 stroke-[4]" />
          Plan New Adventure
        </Link>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search trips by destination or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-100 shadow-sm rounded-[32px] py-6 pl-16 pr-8 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all text-lg font-bold text-slate-900 placeholder:text-slate-200"
          />
        </div>
        <button className="px-8 py-6 bg-white border border-slate-100 shadow-sm rounded-[32px] flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all active:scale-95 font-black uppercase tracking-widest text-xs">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredTrips.map((trip) => (
          <motion.div 
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white border border-slate-100 rounded-[48px] overflow-hidden flex flex-col h-full shadow-2xl shadow-slate-200/50 hover:scale-[1.02] transition-all"
          >
            <div className="h-64 relative overflow-hidden">
               <img 
                src={trip.coverImage || 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800'} 
                alt={trip.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
               />
               <div className="absolute top-8 left-8 flex gap-2">
                 <span className="px-5 py-2 bg-orange-500 text-white shadow-xl shadow-orange-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                   {trip.status}
                 </span>
               </div>
               <button 
                onClick={(e) => { e.preventDefault(); deleteTrip(trip.id); }}
                className="absolute top-8 right-8 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
               >
                 <Trash2 className="w-4 h-4 stroke-[3]" />
               </button>
            </div>

            <div className="p-10 flex-1 flex flex-col justify-between space-y-8">
               <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tighter text-slate-900 italic serif">{trip.name}</h3>
                    <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed">{trip.description}</p>
               </div>

               <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {trip.stops.slice(0, 3).map((stop, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-orange-100 flex items-center justify-center text-[10px] font-black text-orange-600 uppercase shadow-sm">
                          {stop.city[0]}
                        </div>
                      ))}
                      {trip.stops.length > 3 && (
                        <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                          +{trip.stops.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{trip.stops.length} Stops</span>
                  </div>
                  <Link 
                    to={`/trip/${trip.id}`}
                    className="text-orange-500 text-xs font-black hover:underline uppercase tracking-widest"
                  >
                    Details
                  </Link>
               </div>
            </div>
          </motion.div>
        ))}

        {filteredTrips.length === 0 && (
          <div className="col-span-full py-24 text-center space-y-6 bg-white border border-dashed border-slate-200 rounded-[48px] shadow-sm">
             <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto">
               <Plane className="w-12 h-12 text-slate-200 stroke-[1]" />
             </div>
             <div className="space-y-2">
               <h3 className="text-3xl font-black text-slate-900 italic serif tracking-tight">No journeys found.</h3>
               <p className="text-slate-400 max-w-xs mx-auto font-bold uppercase tracking-widest text-[10px]">Start planning your next Indian expedition</p>
             </div>
             <Link to="/create-trip" className="inline-block bg-orange-500 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-orange-500/20 active:scale-95 transition-all">Plan Trip</Link>
          </div>
        )}
      </div>
    </div>
  );
}
