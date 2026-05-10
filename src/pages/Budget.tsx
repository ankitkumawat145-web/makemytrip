
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
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-8 md:space-y-12 pb-32 text-slate-900 dark:text-slate-100 transition-colors">
      <header className="space-y-1 md:space-y-2">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic serif text-slate-900 dark:text-white leading-[0.9]">Fiscal <br /><span className="text-orange-500 underline underline-offset-8">Metrics.</span></h1>
        <p className="text-slate-400 dark:text-slate-500 text-sm md:text-lg font-bold">In-depth analysis of your travel investments across India.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] md:rounded-[48px] p-6 md:p-10 space-y-6 md:space-y-8 shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                 <p className="text-[9px] md:text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.2em]">Total Portfolio Investment</p>
                 <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic serif">{formatCurrency(totalSpent)}</h2>
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

         <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] md:rounded-[48px] p-8 md:p-10 flex flex-col justify-between group shadow-2xl shadow-slate-200/50 dark:shadow-none min-h-[200px] md:min-h-0">
            <div className="space-y-6 md:space-y-8">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                 <PieIcon className="w-6 h-6 md:w-8 md:h-8 stroke-[2.5]" />
               </div>
               <div className="space-y-1 md:space-y-2">
                 <h3 className="text-xl md:text-2xl font-black italic serif text-slate-900 dark:text-white">Budget Integrity</h3>
                 <p className="text-xs md:text-sm font-bold text-slate-400 dark:text-slate-500">{(totalSpent/totalLimit * 100 || 0).toFixed(1)}% Usage Rate.</p>
               </div>
            </div>
            <div className="w-full bg-slate-50 dark:bg-slate-800 h-2.5 md:h-3 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700 shadow-inner mt-6 md:mt-0">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(totalSpent/totalLimit * 100) || 0}%` }}
                className="h-full bg-orange-500 shadow-lg shadow-orange-500/20" 
               />
            </div>
         </div>

         <div className="bg-orange-500 text-white rounded-[32px] md:rounded-[48px] p-8 md:p-10 flex flex-col justify-between group cursor-pointer hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/20 active:scale-95 border-0 min-h-[200px] md:min-h-0">
            <div className="space-y-6 md:space-y-8">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-xl rounded-2xl md:rounded-3xl flex items-center justify-center">
                 <Wallet className="w-6 h-6 md:w-8 md:h-8 stroke-[2.5]" />
               </div>
               <div className="space-y-1 md:space-y-2">
                 <h3 className="text-xl md:text-2xl font-black italic serif">Capital Injection</h3>
                 <p className="text-xs md:text-sm font-bold text-orange-100/80">Replenish reserves via UPI.</p>
               </div>
            </div>
            <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 ml-auto group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform stroke-[3]" />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
         <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] md:rounded-[48px] p-8 md:p-12 space-y-8 md:space-y-10 shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <h3 className="text-2xl md:text-3xl font-black italic serif text-slate-900 dark:text-white">Distribution Analysis</h3>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={9} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                      contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={32}>
                       {chartData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                    </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] md:rounded-[48px] p-8 md:p-12 space-y-8 md:space-y-10 shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <h3 className="text-2xl md:text-3xl font-black italic serif text-slate-900 dark:text-white">Ledger</h3>
            <div className="space-y-6 md:space-y-8">
               {trips.length > 0 ? trips.map(trip => (
                 <div key={trip.id} className="flex justify-between items-center group cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-[28px] transition-all">
                    <div className="flex items-center gap-4 md:gap-5">
                       <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 dark:bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20 group-hover:text-orange-500 transition-all border border-slate-100 dark:border-slate-700">
                          <Clock className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
                       </div>
                       <div className="space-y-0.5 md:space-y-1">
                          <p className="font-black text-slate-900 dark:text-white text-base md:text-lg tracking-tight italic serif line-clamp-1">{trip.name}</p>
                          <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest">{formatDate(trip.startDate)}</p>
                       </div>
                    </div>
                    <div className="text-right shrink-0">
                       <p className="font-black text-slate-900 dark:text-white text-lg md:text-xl tracking-tighter">{formatCurrency(trip.budget.spent)}</p>
                       <p className="text-[9px] md:text-[10px] text-emerald-500 font-black uppercase tracking-widest">Liquidated</p>
                    </div>
                 </div>
               )) : (
                 <div className="h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-800 py-12 space-y-4">
                   <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center">
                    <BarIcon className="w-8 h-8 stroke-[1]" />
                   </div>
                   <p className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Zero Operational Data</p>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
