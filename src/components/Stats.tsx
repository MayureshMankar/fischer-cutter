import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Stats() {
  return (
    <section className="relative z-10 bg-[#0B0C0E] border-y border-white/5 py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="flex flex-wrap gap-12 lg:gap-20">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-4">Verification Tolerance</span>
              <span className="text-4xl font-black text-machine-green font-technical tracking-tighter text-neon-green">±0.005mm</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-4">Intake Scale Limit</span>
              <span className="text-4xl font-black text-white font-technical tracking-tighter">1700mm+</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-4">Personnel Status</span>
              <span className="text-4xl font-black text-white font-technical tracking-tighter uppercase italic">Verified</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-12 lg:justify-end">
            <Link 
              href="/place-order" 
              className="btn-machine-neon h-16 px-10 text-[11px] font-black inline-flex items-center gap-6 shadow-2xl transition-all hover:scale-105 min-w-[280px]"
            >
              Analyze Technical Scope <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/services" 
              className="text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-machine-green transition-all border-b-2 border-machine-green/20 pb-1"
            >
              System Capacity
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
