
import { useTravel } from '../context/TravelContext';
import { motion } from 'motion/react';
import { Plus, ArrowUpRight, Clock, MapPin, TrendingUp, Calendar, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INDIAN_CITIES } from '../constants';
import { formatCurrency, formatDate } from '../lib/utils';

export default function Dashboard() {
  const { trips, user } = useTravel();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight text-slate-900"
          >
            Namaste, <span className="text-orange-500">{(user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Voyager').split(' ')[0]}</span>.
          </motion.h1>
          <p className="text-slate-500 font-bold tracking-tight">Your world is waiting for you to explore it.</p>
        </div>
        <Link 
          to="/create-trip"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          <span>Plan New Journey</span>
        </Link>
      </header>

      {/* Main Stats/Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-100 rounded-[40px] p-8 space-y-6 relative overflow-hidden group shadow-xl shadow-slate-200/50">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Calendar className="text-blue-500 w-6 h-6" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-4xl font-black text-slate-900">{trips.length}</p>
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">Active Itineraries</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[40px] p-8 space-y-6 relative overflow-hidden group shadow-xl shadow-slate-200/50">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
              <MapPin className="text-orange-500 w-6 h-6" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-4xl font-black text-slate-900">{trips.reduce((acc, t) => acc + t.stops.length, 0)}</p>
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">Cities Visited</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[40px] p-8 space-y-6 relative overflow-hidden group shadow-xl shadow-slate-200/50">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <TrendingUp className="text-emerald-500 w-6 h-6" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-4xl font-black text-slate-900">{formatCurrency(trips.reduce((acc, t) => acc + t.budget.spent, 0))}</p>
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">Total Investment</p>
          </div>
        </div>
      </div>

      {/* Recent Trips Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-3">
            Recent Journeys
            <span className="text-[10px] font-black text-white px-3 py-1 bg-orange-500 rounded-full">{trips.length} Total</span>
          </h2>
          <Link to="/trips" className="text-orange-500 text-sm font-black hover:underline flex items-center gap-1 group uppercase tracking-widest">
            View All <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trips.slice(0, 2).map((trip) => (
              <Link 
                to={`/trip/${trip.id}`} 
                key={trip.id}
                className="group relative h-[350px] rounded-[48px] overflow-hidden shadow-2xl shadow-slate-200 border-4 border-white transition-all hover:scale-[1.02]"
              >
                <img 
                  src={trip.coverImage || 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800'} 
                  alt={trip.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10 space-y-2 w-full">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                  </div>
                  <h3 className="text-3xl font-black text-white italic serif">{trip.name}</h3>
                  <div className="flex justify-between items-center pt-6 mt-4 border-t border-white/20">
                    <span className="text-xs font-bold text-white/70">{trip.stops.length} Cities</span>
                    <span className="text-lg font-black text-white">{formatCurrency(trip.budget.spent)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-100 rounded-[48px] p-20 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-orange-50 rounded-[32px] flex items-center justify-center">
              <Compass className="text-orange-500 w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black">No expeditions yet.</h3>
              <p className="text-slate-400 max-w-xs font-medium">Start your professional Indian travel story today.</p>
            </div>
            <Link 
              to="/create-trip"
              className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-orange-500/20 active:scale-[0.98]"
            >
              Get Started Now
            </Link>
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">Curated Destinations</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDIAN_CITIES.map((city) => (
            <motion.div 
              key={city.name}
              whileHover={{ y: -10 }}
              className="group bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-xl shadow-slate-200/50"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-5 left-5">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                    city.costIndex === 'High' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {city.costIndex} Tier
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-black text-xl text-slate-900">{city.name}</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">{city.state}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{city.popularity}</span>
                  <button className="text-orange-500 text-xs font-black hover:underline uppercase tracking-widest">Plan trip</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
