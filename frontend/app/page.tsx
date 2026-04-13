"use client";

import { useState } from "react";
import { CGPACard } from "@/components/CGPACard";
import { RiskCard } from "@/components/RiskCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Loader2, Fingerprint, BookOpen, GraduationCap, Sparkles, Activity, FileText, CheckCircle2, ChevronRight } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    roll: "10293",
    semester: 4,
    sex: 1,
    attendance: 85,
    internal: 70,
    assignment: 80,
    backlog_count: 0,
    sgpa_history: "7.5, 7.8, 8.0",
    feedback_text: "I am having trouble keeping up with my assignments lately and feel stressed."
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        semester: Number(formData.semester),
        sex: Number(formData.sex),
        attendance: Number(formData.attendance),
        internal: Number(formData.internal),
        assignment: Number(formData.assignment),
        backlog_count: Number(formData.backlog_count),
        sgpa_history: formData.sgpa_history.split(",").map(s => parseFloat(s.trim()))
      };

      const res = await fetch("http://localhost:8000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setTimeout(() => {
        setResult(data);
        setLoading(false);
      }, 600);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch prediction");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-800 dark:text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-hidden transition-colors duration-500">
      <div className="fixed inset-0 z-0 flex justify-center pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 dark:bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 dark:bg-purple-900/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>
      
      <main className="relative z-10 container mx-auto px-6 py-8 lg:py-16 max-w-7xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/5 pb-6 transition-colors">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)] dark:shadow-[0_0_30px_rgba(99,102,241,0.3)] border border-indigo-400/20 dark:border-white/20">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 transition-colors">
                Nexus Intelligence
              </h1>
              <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 font-medium tracking-wide items-center flex gap-2 transition-colors">
                <Activity className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" /> 
                Live Academic Sentinel System
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-zinc-500 bg-white/50 dark:bg-zinc-900/50 px-4 py-2 rounded-full border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Operational
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-[2.5rem] blur-xl opacity-0 dark:opacity-50 dark:group-hover:opacity-75 transition duration-500"></div>
            <div className="relative bg-white/70 dark:bg-[#0f0f12]/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 shadow-xl dark:shadow-2xl overflow-hidden transition-colors">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-400/20 dark:via-white/20 to-transparent"></div>
              
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-800 dark:text-zinc-200 tracking-tight transition-colors">
                  <Fingerprint className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                  Student Metrics Engram
                </h2>
              </div>
              
              <form onSubmit={handlePredict} className="space-y-6">
                
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { label: "Name", name: "name", type: "text", required: true },
                    { label: "Identity UID", name: "roll", type: "text", required: true },
                    { label: "Semester", name: "semester", type: "number", min: "1", max: "8", required: true },
                    { label: "Attendance (%)", name: "attendance", type: "number", min: "0", max: "100", required: true },
                    { label: "Internal Mk", name: "internal", type: "number", required: true },
                    { label: "Assignment Mk", name: "assignment", type: "number", required: true },
                    { label: "Backlogs", name: "backlog_count", type: "number", required: true },
                    { label: "Sex (0=F, 1=M)", name: "sex", type: "number", min: "0", max: "1", required: true },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-xs font-medium text-slate-500 dark:text-zinc-400 tracking-wide uppercase px-1 transition-colors">{field.label}</label>
                      <input 
                        type={field.type} 
                        name={field.name} 
                        // @ts-ignore
                        value={formData[field.name]} 
                        onChange={handleChange} 
                        min={field.min}
                        max={field.max}
                        className="w-full bg-white dark:bg-[#18181b]/80 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-sm dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] placeholder:text-slate-400 dark:placeholder:text-zinc-600" 
                        required={field.required} 
                      />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-medium text-slate-500 dark:text-zinc-400 tracking-wide uppercase px-1 flex items-center justify-between transition-colors">
                    <span>Performance Matrix (SGPA)</span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-600 bg-slate-100 dark:bg-zinc-800/50 px-2 py-0.5 rounded transition-colors">Comma delimited</span>
                  </label>
                  <input type="text" name="sgpa_history" value={formData.sgpa_history} onChange={handleChange} className="w-full bg-white dark:bg-[#18181b]/80 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-sm dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] placeholder:text-slate-400 dark:placeholder:text-zinc-600" required placeholder="e.g. 7.5, 7.8, 8.0" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-500 dark:text-zinc-400 tracking-wide uppercase px-1 transition-colors">Qualitative Feedback Log</label>
                  <textarea name="feedback_text" value={formData.feedback_text} onChange={handleChange} rows={4} className="w-full bg-white dark:bg-[#18181b]/80 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-sm dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] resize-none leading-relaxed" required></textarea>
                </div>

                <button type="submit" disabled={loading} className="group relative w-full mt-4 bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-bold tracking-wide py-3.5 px-4 rounded-xl shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all active:scale-[0.98] flex justify-center items-center gap-2 overflow-hidden disabled:opacity-80 disabled:cursor-not-allowed disabled:active:scale-100">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-white dark:text-zinc-800" />
                      Processing Engine...
                    </>
                  ) : (
                    <>
                      Execute Neural Analysis
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col h-full">
            {!result && !loading ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white/40 dark:bg-[#0f0f12]/40 backdrop-blur-sm border border-slate-300 dark:border-white/5 rounded-[2rem] border-dashed transition-colors">
                <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 flex items-center justify-center mb-6 shadow-inner transition-colors">
                  <GraduationCap className="h-8 w-8 text-slate-400 dark:text-zinc-700" />
                </div>
                <h3 className="text-lg font-medium text-slate-600 dark:text-zinc-400 tracking-tight transition-colors">System Awaiting Data Input</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-600 mt-2 max-w-sm text-center px-4 transition-colors">Initialize the neural analysis from the student profile module to generate intelligent risk forecasts.</p>
              </div>
            ) : loading ? (
               <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white/40 dark:bg-[#0f0f12]/40 backdrop-blur-sm border border-slate-300 dark:border-white/5 rounded-[2rem] border-dashed transition-colors">
                <Loader2 className="h-10 w-10 text-indigo-500 animate-spin mb-6" />
                <h3 className="text-lg font-medium text-slate-700 dark:text-zinc-300 tracking-tight animate-pulse transition-colors">Running Neural Inference Core...</h3>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700 ease-out fill-mode-both">
                
                <div className="grid grid-cols-2 gap-6 w-full drop-shadow-xl dark:drop-shadow-2xl">
                  <div className="transform transition duration-500 hover:-translate-y-1">
                    <RiskCard riskLabel={result.risk.risk_label} riskScore={result.risk.risk_score} />
                  </div>
                  <div className="transform transition duration-500 hover:-translate-y-1 animate-in fade-in zoom-in-95 delay-100 fill-mode-both">
                    <CGPACard predictedCgpa={result.cgpa.predicted_cgpa} trend={result.cgpa.trend} />
                  </div>
                </div>

                <div className="bg-white/70 dark:bg-[#0f0f12]/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 shadow-xl dark:shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 delay-200 fill-mode-both group transition-colors">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <BookOpen className="h-24 w-24 transform rotate-12 text-slate-900 dark:text-white" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-500/10 rounded-lg border border-purple-200 dark:border-purple-500/20 transition-colors">
                            <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="text-base font-semibold tracking-tight text-slate-800 dark:text-zinc-200 transition-colors">Semantic Sentiment Scan</h3>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border transition-colors ${result.nlp.urgency === 'HIGH' || result.nlp.urgency === 'IMMEDIATE' ? 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20 dark:shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'}`}>
                          {result.nlp.urgency} URGENCY
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-semibold transition-colors">Primary Classifier</span>
                          <div className="flex items-center gap-2 text-slate-800 dark:text-zinc-200 text-lg font-medium transition-colors">
                            <CheckCircle2 className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                            {result.nlp.concern}
                          </div>
                        </div>

                        {result.nlp.keywords && result.nlp.keywords.length > 0 && (
                          <div className="mt-2">
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-semibold block mb-2 transition-colors">Extracted Entities</span>
                            <div className="flex flex-wrap gap-2">
                              {result.nlp.keywords.map((kw: string, i: number) => (
                                <span key={i} className="px-3 py-1.5 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/5 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-300 shadow-sm dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] transition-colors hover:border-slate-300 dark:hover:border-white/20">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                </div>

                <div className="bg-white/70 dark:bg-[#0f0f12]/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 shadow-xl dark:shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 delay-300 fill-mode-both transition-colors">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-bl-full blur-2xl"></div>
                   <div className="relative z-10">
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-100 dark:bg-indigo-500/10 rounded-lg border border-indigo-200 dark:border-indigo-500/20 transition-colors">
                            <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h3 className="text-base font-semibold tracking-tight text-slate-800 dark:text-zinc-200 transition-colors">Generative Intervention Script</h3>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#18181b]/80 border border-slate-200 dark:border-white/5 px-3 py-1.5 rounded-full shadow-inner dark:shadow-none transition-colors">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase tracking-widest font-semibold transition-colors">{result.letter_source} Engine</span>
                        </div>
                     </div>
                     <div className="relative">
                       <div className="absolute top-4 left-0 w-1 h-full bg-gradient-to-b from-indigo-500/30 dark:from-indigo-500/50 via-purple-500/30 dark:via-purple-500/50 to-transparent rounded-full"></div>
                       <blockquote className="pl-6 py-4 text-[15px] sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed font-medium selection:bg-indigo-500/30 transition-colors">
                         {result.letter}
                       </blockquote>
                     </div>
                   </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

