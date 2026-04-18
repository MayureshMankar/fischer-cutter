"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { 
  Settings, 
  Cpu, 
  Drill, 
  Hammer, 
  ShieldCheck, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

const capacities = [
  {
    id: "01",
    title: "Surface Grinding",
    description: "High-quality precision surface grinding services in Mumbai. We ensure every project meets industrial standards of flat geometry and micron-level accuracy.",
    icon: Drill,
    image: "/images/projrct.png",
    specs: ["Micron Precision", "Industrial Standards", "Verified Flatness"]
  },
  {
    id: "02",
    title: "Heavy Grinding",
    description: "Specialized heavy-duty surface grinding for large industrial bases and plates. Capable of handling massive workpieces with machine-finish quality.",
    icon: Hammer,
    image: "/images/die.png",
    specs: ["Heavy Capacity", "Machine Finish", "High Accuracy"]
  },
  {
    id: "03",
    title: "Industrial Reconditioning",
    description: "Comprehensive reconditioning of worn-out industrial components. Restoring machine parts to original OEM specifications with exceptional cost efficiency.",
    icon: Settings,
    image: "/images/aluminum.png",    
    specs: ["OEM Restore", "Lifecycle Extension", "Cost Efficiency"]
  },
  {
    id: "04",
    title: "Fischer & Konsta Grinding",
    description: "Expert precision grinding of Fischer Cutter Blades and Konsta Knives. Specialized services for major tyre manufacturers including MRF, Apollo, and JK.",
    icon: Cpu,
    image: "/images/fisher cutter 1700.png",
    specs: ["Tyre Industry Tech", "Precision Edges", "Blades & Knives"]
  }
];

const industries = [
  "MRF (Madras Rubber Factory)", "Apollo Tyres", "JK Tyre & Industries", "Ceat Tyres",
  "BKT Industries", "Yokohama India", "L&T", "Godrej", "M&M",
  "Crompton Greaves", "Elmach Packages", "Gajanan Dyes", "Industrial Manufacturing"
];

export default function ServicesClient() {
  return (
    <main className="min-h-screen bg-[#0B0C0E] pb-24 overflow-hidden snap-container">
      <Navbar />

      <Hero 
        tag="Machining Standards // Mumbai Workshop"
        title1="Precision"
        title2="Services."
        description="Delivering high-precision machining and grinding through verified mechanical standards. Engineering the foundation of industrial production for over 30 years."
        backgroundImage="/images/11.png"
      />

      {/* CAPACITY GRID */}
      <section className="py-32 snap-section bg-[#0B0C0E] border-t border-white/5 relative">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-white/5 border border-white/5 shadow-2xl">
          {capacities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-[#111111] p-10 hover:bg-machine-green/5 transition-all duration-700 flex flex-col justify-end min-h-[480px] overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 grayscale group-hover:opacity-30 group-hover:scale-105 transition-all duration-1000">
                <Image 
                  src={item.image} 
                  alt={`Sri Devi Engineers - Professional ${item.title} Service in Mumbai`} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#0B0C0E] border border-white/10 flex items-center justify-center mb-8 group-hover:border-machine-green transition-all">
                  <item.icon className="text-slate-500 w-6 h-6 group-hover:text-machine-green" />
                </div>
                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter font-display italic leading-tight">{item.title}</h3>
                <p className="text-[13px] text-slate-500 font-body leading-relaxed mb-10 max-w-sm group-hover:text-slate-400 transition-colors line-clamp-3">{item.description}</p>
                <div className="grid grid-cols-2 gap-8 mb-10 border-t border-white/5 pt-10">
                  {item.specs.map((spec, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-600 mb-2">Technical Standard</span>
                      <span className="text-technical text-[11px] font-black text-machine-green text-neon-green">{spec}</span>
                    </div>
                  ))}
                </div>
                <Link href="/place-order" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-machine-green group-hover:gap-8 transition-all">
                  Request Details <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      {/* QUALITY & INDUSTRIES */}
      <section className="py-32 bg-black border-t border-white/5 snap-section relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-32 mb-32 items-start">
            <div className="lg:w-1/2 p-16 bg-[#111111] border border-white/5 relative">
              <div className="absolute top-0 left-0 w-20 h-1 bg-machine-green shadow-[0_0_15px_rgba(50,205,50,0.5)]" />
              <ShieldCheck className="text-machine-green w-12 h-12 mb-10 text-neon-green" />
              <h3 className="text-2xl font-black text-white uppercase italic font-display mb-10 tracking-tighter">Quality <br /> Verification.</h3>
              <p className="text-slate-400 text-sm leading-relaxed uppercase tracking-wider font-medium mb-10">
                We are committed to high-quality engineering services. Our quality assurance involves rigorous inspection at our Mumbai workshop to ensure 100% compliance with precision blueprints.
              </p>
            </div>
            <div className="lg:w-1/2 p-16 bg-machine-green/5 border border-machine-green/20 relative flex flex-col justify-center">
              <h3 className="text-3xl font-black text-white uppercase italic font-display mb-8 tracking-tighter">Visit Our Plant.</h3>
              <p className="text-slate-500 text-xs uppercase tracking-[0.2em] leading-relaxed font-bold mb-12">Visit our Mumbai machining facility to verify our precision grinding capabilities first-hand.</p>
              <Link href="/contact" className="btn-machine-neon h-20 text-[12px] shadow-2xl transition-all hover:scale-105">Schedule Visit <ArrowRight className="w-6 h-6 ml-4" /></Link>
            </div>
          </div>

          <div className="border-t border-white/5 pt-24 text-center mb-20">
             <span className="text-machine-green text-[10px] font-black uppercase tracking-[0.5em] block mb-6 text-neon-green">Industrial Partners</span>
             <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter font-display leading-none text-center">Industries <span className="text-machine-green">Served.</span></h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {industries.map((item, i) => (
              <div key={i} className="bg-[#111111] p-12 lg:p-14 hover:bg-machine-green/10 transition-all group border border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center">
                <span className="text-sm sm:text-base lg:text-xl font-black text-slate-400 uppercase tracking-tighter group-hover:text-white transition-all font-display italic">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
