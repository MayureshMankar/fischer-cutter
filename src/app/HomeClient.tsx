"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { 
  ArrowRight, 
  Zap
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomeClient() {
  return (
    <main className="min-h-screen bg-[#0B0C0E] pb-24 overflow-hidden snap-container">
      <Navbar />
      
      {/* SECTION 1: HERO VIEWPORT */}
      <Hero 
        tag="Precision First // Est. 1994 // Mumbai"
        title1="SRI DEVI" 
        title2="ENGINEERS." 
        description="Authorized industrial reconditioning and high-tolerance surface grinding. Proving mechanical integrity for three decades in Mumbai's heavy manufacturing sector."
        backgroundImage="/images/about.png"
      />

      {/* SECTION 2: WORKSHOP CAPABILITY */}
      <section className="py-32 snap-section bg-[#0B0C0E] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-24 relative z-10 flex flex-col items-center">
          
          <div className="max-w-4xl text-center mb-24">
            <span className="text-machine-green text-[10px] font-black uppercase tracking-[0.6em] mb-8 block text-neon-green">Main Workshop // Mumbai, India</span>
            <h2 className="text-4xl lg:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-10">
              Engineering <span className="text-machine-green">Capability.</span>
            </h2>
            <p className="text-[12px] text-slate-500 font-body uppercase tracking-[0.4em] font-black max-w-2xl mx-auto leading-relaxed">
              Every micron measured. Every surface precision-finished. We provide high-tolerance reconditioning services for global industrial enterprises and heavy manufacturing units.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full relative aspect-[21/9] bg-[#111111] overflow-hidden border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.5)] group mb-12"
          >
            <div className="absolute inset-x-8 top-8 flex justify-between z-20 pointer-events-none opacity-40">
              <span className="text-[9px] font-technical text-machine-green uppercase tracking-[0.3em]">RECOVERY RANGE: 5000MM</span>
              <span className="text-[9px] font-technical text-machine-green uppercase tracking-[0.3em]">TOLERANCE: 0.005MM</span>
            </div>
            
            <Image 
              src="/images/2section.png"   
              alt="Sri Devi Engineers - Heavy Duty Surface Grinding Unit in Mumbai"
              fill
              className="object-cover grayscale saturate-50 contrast-125 opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute bottom-8 right-8 p-4 border-t border-machine-green bg-black/80 backdrop-blur-md z-30">
               <div className="text-white text-[9px] font-black uppercase tracking-[0.4em]">
                  Verified Equipment // Mumbai Workshop // Certified
               </div>
            </div>
          </motion.div>

          {/* TECHNICAL STANDARDS */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
            {[
              { label: "Precision Range", val: "±0.02mm", detail: "Surface Grinding Accuracy" },
              { label: "Capacity Limit", val: "5000mm", detail: "Heavy Component Machining" },
              { label: "Our Experience", val: "30+ YEARS", detail: "Professional Engineering Legacy" }
            ].map((spec, i) => (
              <div key={i} className="bg-[#0B0C0E] p-10 hover:bg-machine-green/5 transition-all group">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4 block group-hover:text-slate-400">{spec.label}</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-black text-white font-display italic tracking-tighter group-hover:text-machine-green transition-colors">{spec.val}</span>
                  <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">{spec.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link 
              href="/place-order" 
              className="btn-machine-neon h-20 px-16 text-[12px] font-black shadow-2xl transition-all hover:scale-105"
            >
              Get a Precision Machining Quote <ArrowRight className="w-6 h-6 ml-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PERFORMANCE STRIP */}
      <section className="py-24 snap-section bg-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-machine-green/20 rounded-full animate-ping" />
                <Zap className="text-machine-green w-8 h-8 relative z-10 text-neon-green" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-1">Engineering <span className="text-machine-green">Excellence.</span></h4>
                <p className="text-[9px] text-slate-600 uppercase font-black tracking-[0.4em]">Mumbai Surface Grinding Specialists // Since 1994</p>
              </div>
            </div>

            <div className="flex-1 max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
              {[
                { title: "Precision", val: "±0.002mm", label: "Deviation" },
                { title: "Capacity", val: "Industrial", label: "Bases" },
                { title: "Verification", val: "High-Grade", label: "Tolerances" }
              ].map((metric, i) => (
                <div key={i} className="flex flex-col border-l border-white/5 pl-8 group">
                  <span className="text-machine-green text-[9px] font-black uppercase tracking-[0.4em] mb-2">{metric.title}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white font-display italic tracking-tighter group-hover:text-machine-green transition-colors">{metric.val}</span>
                    <span className="text-[8px] text-slate-700 font-black uppercase tracking-widest">{metric.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
