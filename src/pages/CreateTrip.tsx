
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Map, Calendar, Image as ImageIcon, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CreateTrip() {
  const navigate = useNavigate();
  const { addTrip } = useTravel();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrip = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      startDate,
      endDate,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800',
      stops: [],
      status: 'Planning' as const,
      budget: { totalLimit: 50000, spent: 0 },
      notes: [],
      checklist: []
    };
    addTrip(newTrip);
    navigate(`/trip/${newTrip.id}/builder`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto space-y-8 md:space-y-12 pb-24 text-slate-900 dark:text-slate-100">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-black uppercase tracking-widest">Back to Dashboard</span>
      </button>

      <div className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic serif leading-[0.9] text-slate-900 dark:text-white">Start a new <br /><span className="text-orange-500 underline underline-offset-8">chapter.</span></h1>
        <p className="text-slate-400 dark:text-slate-500 text-base md:text-lg font-bold">Define the soul of your next Indian adventure.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
        <div className="space-y-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-[32px] md:rounded-[48px] p-6 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column: Core Info */}
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-[0.2em] font-black text-orange-500 ml-1 flex items-center gap-2">
                  <Map className="w-4 h-4 stroke-[3]" /> Itinerary Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Rajasthan Expedition"
                  className="w-full bg-transparent border-b-2 border-slate-100 dark:border-slate-800 py-4 md:py-6 text-2xl md:text-3xl font-black outline-none focus:border-orange-500 transition-colors text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800 uppercase tracking-tighter"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 dark:text-slate-600 ml-1 flex items-center gap-2">
                  <FileText className="w-4 h-4 stroke-[3]" /> Vision & Goals
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="The motivation behind this journey..."
                  rows={4}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl md:rounded-3xl p-6 outline-none focus:border-orange-500/50 transition-colors resize-none font-medium text-slate-600 dark:text-slate-400"
                />
              </div>
            </div>

            {/* Right Column: Dates & Meta */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-3">
                  <label className="text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 dark:text-slate-600 ml-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 stroke-[3]" /> Commencement
                  </label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 outline-none focus:border-orange-500/50 transition-colors font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 dark:text-slate-600 ml-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 stroke-[3]" /> Completion
                  </label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 outline-none focus:border-orange-500/50 transition-colors font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 dark:text-slate-600 ml-1 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 stroke-[3]" /> Visual Identity (URL)
                </label>
                <input 
                  type="url" 
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 outline-none focus:border-orange-500/50 transition-colors font-medium text-slate-900 dark:text-white"
                />
                <p className="text-[10px] text-slate-300 dark:text-slate-700 font-bold uppercase tracking-widest pl-1 pt-1 italic">Use professional imagery for better inspiration.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 md:gap-6 mt-8 md:mt-12">
           <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-10 py-5 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 font-black text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white transition-all uppercase tracking-widest text-xs"
           >
             Cancel Draft
           </button>
           <button 
            type="submit"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-16 py-5 rounded-3xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98] uppercase tracking-widest text-sm"
           >
             <Save className="w-5 h-5 stroke-[3]" />
             <span>Deploy Itinerary</span>
           </button>
        </div>
      </form>
    </div>
  );
}
