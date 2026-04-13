import { LineChart, TrendingDown, TrendingUp, Minus } from "lucide-react";

export function CGPACard({ predictedCgpa, trend }: { predictedCgpa: number; trend: string }) {
  let TrendIcon = Minus;
  let trendColor = "text-slate-500 dark:text-zinc-400";
  let bgGradient = "from-slate-200/50 dark:from-zinc-500/10 to-transparent";

  if (trend === "DECLINING") {
    TrendIcon = TrendingDown;
    trendColor = "text-red-600 dark:text-red-400";
    bgGradient = "from-red-500/5 dark:from-red-500/10 to-transparent";
  } else if (trend === "IMPROVING") {
    TrendIcon = TrendingUp;
    trendColor = "text-emerald-600 dark:text-emerald-400";
    bgGradient = "from-emerald-500/5 dark:from-emerald-500/10 to-transparent";
  }

  return (
    <div className="relative overflow-hidden bg-white/70 dark:bg-[#0f0f12]/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 shadow-sm dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] group h-full transition-colors">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${bgGradient} rounded-bl-full opacity-50`}></div>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className="p-2 rounded-lg border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 transition-colors">
               <LineChart className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
             </div>
             <h3 className="text-sm font-medium tracking-tight text-slate-700 dark:text-zinc-300 uppercase transition-colors">CGPA Forecast</h3>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-zinc-100 mb-1 drop-shadow-sm dark:drop-shadow-md transition-colors">
            {predictedCgpa?.toFixed(2) || '0.00'}
          </div>
          <p className={`text-xs font-medium uppercase tracking-wide flex items-center gap-1.5 transition-colors ${trendColor}`}>
            <TrendIcon className="h-3.5 w-3.5" />
            {trend} Trajectory
          </p>
        </div>
      </div>
    </div>
  );
}
