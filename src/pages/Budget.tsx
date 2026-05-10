
import { useTravel } from '../context/TravelContext';
import { motion } from 'motion/react';
import { Wallet, TrendingUp, TrendingDown, Clock, ArrowUpRight, PieChart as PieIcon, BarChart as BarIcon } from 'lucide-react';
import { formatCurrency, formatDate } from '../lib/utils';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

export default function Budget() {
  const { trips } = useTravel();
  
  const totalSpent = trips.reduce((acc, t) => acc + t.budget.spent, 0);
  const totalLimit = trips.reduce((acc, t) => acc + t.budget.totalLimit, 0);

  const chartData = trips.map(t => ({
    name: t.name.split(' ')[0],
    amount: t.budget.spent
  }));

  const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'];

  return (
    <div className="p-12 max-w-7xl mx-auto space-y-12 pb-32 text-slate-900">
      <header className="space-y-1">
        <h1 className="text-6xl font-black tracking-tighter italic serif text-slate-900 leading-[0.9]">Fiscal <br /><span className="text-orange-500 underline underline-offset-8">Metrics.</span></h1>
        <p className="text-slate-400 text-lg font-bold">In-depth analysis of your travel investments across India.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <div className="md:col-span-2 bg-white border border-slate-100 rounded-[48px] p-10 space-y-8 shadow-2xl shadow-slate-200/50">
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Total Portfolio Investment</p>
                 <h2 className="text-5xl font-black tracking-tighter text-slate-900 italic serif">{formatCurrency(totalSpent)}</h2>
               </div>
               <div className="px-5 py-2.5 bg-emerald-50 text-emerald-500 rounded-2xl text-[10px] font-bold flex items-center gap-2 border border-emerald-100 shadow-sm">
                 <TrendingUp className="w-3.5 h-3.5" /> +12.4% Momentum
               </div>
            </div>
            <div className="h-64 w-full pt-4">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                      itemStyle={{ color: '#f97316', fontWeight: '900', fontSize: '10px', textTransform: 'uppercase' }}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorAmt)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white border border-slate-100 rounded-[48px] p-10 flex flex-col justify-between group shadow-2xl shadow-slate-200/50">
            <div className="space-y-8">
               <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                 <PieIcon className="w-8 h-8 stroke-[2.5]" />
               </div>
               <div className="space-y-2">
                 <h3 className="text-2xl font-black italic serif">Budget Integrity</h3>
                 <p className="text-sm font-bold text-slate-400">{(totalSpent/totalLimit * 100 || 0).toFixed(1)}% Usage Rate.</p>
               </div>
            </div>
            <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden border border-slate-100 shadow-inner">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(totalSpent/totalLimit * 100) || 0}%` }}
                className="h-full bg-orange-500 shadow-lg shadow-orange-500/20" 
               />
            </div>
         </div>

         <div className="bg-orange-500 text-white rounded-[48px] p-10 flex flex-col justify-between group cursor-pointer hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/20 active:scale-95 border-0">
            <div className="space-y-8">
               <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center">
                 <Wallet className="w-8 h-8 stroke-[2.5]" />
               </div>
               <div className="space-y-2">
                 <h3 className="text-2xl font-black italic serif">Capital Injection</h3>
                 <p className="text-sm font-bold text-orange-100/80">Replenish your travel reserves via digital UPI gateway.</p>
               </div>
            </div>
            <ArrowUpRight className="w-10 h-10 ml-auto group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform stroke-[3]" />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="bg-white border border-slate-100 rounded-[48px] p-12 space-y-10 shadow-2xl shadow-slate-200/50">
            <h3 className="text-3xl font-black italic serif">Distribution Analysis</h3>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#cbd5e1" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                      contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="amount" radius={[12, 12, 12, 12]} barSize={40}>
                       {chartData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                    </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white border border-slate-100 rounded-[48px] p-12 space-y-10 shadow-2xl shadow-slate-200/50">
            <h3 className="text-3xl font-black italic serif">Transaction Ledger</h3>
            <div className="space-y-8">
               {trips.length > 0 ? trips.map(trip => (
                 <div key={trip.id} className="flex justify-between items-center group cursor-pointer p-2 hover:bg-slate-50 rounded-3xl transition-all">
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-orange-50 group-hover:text-orange-500 transition-all border border-slate-100">
                          <Clock className="w-6 h-6 stroke-[2.5]" />
                       </div>
                       <div className="space-y-1">
                          <p className="font-black text-slate-900 text-lg tracking-tight italic serif">{trip.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{formatDate(trip.startDate)}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="font-black text-slate-900 text-xl tracking-tighter">{formatCurrency(trip.budget.spent)}</p>
                       <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Liquidated</p>
                    </div>
                 </div>
               )) : (
                 <div className="h-full flex flex-col items-center justify-center text-slate-300 py-12 space-y-4">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
                    <BarIcon className="w-8 h-8 stroke-[1]" />
                   </div>
                   <p className="font-black text-[10px] uppercase tracking-[0.2em]">Zero Operational Data</p>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
