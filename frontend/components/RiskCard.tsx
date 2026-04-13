import { AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

export function RiskCard({ riskLabel, riskScore }: { riskLabel: string; riskScore: number }) {
  let bgGradient = "from-emerald-500/5 dark:from-emerald-500/10 to-transparent";
  let borderColor = "border-emerald-200 dark:border-emerald-500/20";
  let textColor = "text-emerald-600 dark:text-emerald-400";
  let Icon = CheckCircle;
  let shadow = "shadow-[0_0_20px_rgba(16,185,129,0.05)] dark:shadow-[0_0_20px_rgba(16,185,129,0.15)]";

  if (riskLabel === "HIGH") {
    bgGradient = "from-red-500/5 dark:from-red-500/10 to-transparent";
    borderColor = "border-red-200 dark:border-red-500/20";
    textColor = "text-red-600 dark:text-red-400";
    Icon = ShieldAlert;
    shadow = "shadow-[0_0_20px_rgba(239,68,68,0.05)] dark:shadow-[0_0_20px_rgba(239,68,68,0.15)]";
  } else if (riskLabel === "MEDIUM") {
    bgGradient = "from-amber-500/5 dark:from-amber-500/10 to-transparent";
    borderColor = "border-amber-200 dark:border-amber-500/20";
    textColor = "text-amber-600 dark:text-amber-500";
    Icon = AlertTriangle;
    shadow = "shadow-[0_0_20px_rgba(245,158,11,0.05)] dark:shadow-[0_0_20px_rgba(245,158,11,0.15)]";
  }

  return (
    <div className={`relative overflow-hidden bg-white/70 dark:bg-[#0f0f12]/80 backdrop-blur-2xl border ${borderColor} rounded-[2rem] p-6 ${shadow} group h-full transition-colors`}>
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${bgGradient} rounded-bl-full opacity-50`}></div>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className={`p-2 rounded-lg border ${borderColor} bg-slate-50 dark:bg-black/20 transition-colors`}>
               <Icon className={`h-4 w-4 ${textColor}`} />
             </div>
             <h3 className="text-sm font-medium tracking-tight text-slate-700 dark:text-zinc-300 uppercase transition-colors">Dropout Analytics</h3>
          </div>
        </div>
        <div className="mt-4">
          <div className={`text-4xl font-black tracking-tight ${textColor} mb-1 drop-shadow-sm dark:drop-shadow-md`}>{riskLabel} RISK</div>
          <p className="text-xs font-medium text-slate-500 dark:text-zinc-500 flex items-center gap-1.5 uppercase tracking-wide transition-colors">
            <span className={`h-1.5 w-1.5 rounded-full ${textColor.replace('text-', 'bg-')}`}></span>
            {Math.round(riskScore * 100)}% Model Confidence
          </p>
        </div>
      </div>
    </div>
  );
}
