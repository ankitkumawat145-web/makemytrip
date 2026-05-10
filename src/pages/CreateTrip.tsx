
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newTrip = {
      id: Math.random().toString(36).substr(2, 9), // Temporary ID, Supabase will provide a real one
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
    
    try {
      await addTrip(newTrip);
      // We navigate to trips list because we might not know the new serial ID immediately 
      // depends on how we handle state. For now, redirect to the list.
      navigate('/trips');
    } catch (error) {
      console.error('Failed to create trip:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto space-y-12 pb-24 text-slate-900">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-black uppercase tracking-widest">Back to Dashboard</span>
      </button>

      <div className="space-y-2">
        <h1 className="text-6xl font-black tracking-tighter italic serif leading-[0.9]">Start a new <br /><span className="text-orange-500 underline underline-offset-8">chapter.</span></h1>
        <p className="text-slate-400 text-lg font-bold">Define the soul of your next Indian adventure.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-8 bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[48px] p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                  placeholder="e.g., Royal Rajasthan Expedition"
                  className="w-full bg-slate-50 border-b-2 border-slate-100 py-6 text-3xl font-black outline-none focus:border-orange-500 transition-colors text-slate-900 placeholder:text-slate-200 uppercase tracking-tighter"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1 flex items-center gap-2">
                  <FileText className="w-4 h-4 stroke-[3]" /> Vision & Goals
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="The motivation behind this journey..."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 outline-none focus:border-orange-500/50 transition-colors resize-none font-medium text-slate-600"
                />
              </div>
            </div>

            {/* Right Column: Dates & Meta */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 stroke-[3]" /> Commencement
                  </label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 outline-none focus:border-orange-500/50 transition-colors font-bold text-slate-900"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 stroke-[3]" /> Completion
                  </label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 outline-none focus:border-orange-500/50 transition-colors font-bold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 stroke-[3]" /> Visual Identity (URL)
                </label>
                <input 
                  type="url" 
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 outline-none focus:border-orange-500/50 transition-colors font-medium text-slate-900"
                />
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest pl-1 pt-1 italic">Use professional imagery for better inspiration.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-6 mt-12">
           <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="px-10 py-5 rounded-3xl border-2 border-slate-100 hover:bg-slate-50 font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest text-xs"
           >
             Cancel Draft
           </button>
           <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-600 text-white px-16 py-5 rounded-3xl font-black flex items-center gap-3 transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98] uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {isSubmitting ? (
               <span className="animate-pulse">Deploying...</span>
             ) : (
               <>
                 <Save className="w-5 h-5 stroke-[3]" />
                 <span>Deploy Itinerary</span>
               </>
             )}
           </button>
        </div>
      </form>
    </div>
  );
}
