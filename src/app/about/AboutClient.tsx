"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { 
  ShieldCheck, 
  Award, 
  Settings
} from "lucide-react";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function AboutClient() {
  return (
    <main className="min-h-screen bg-[#0B0C0E] pb-24 overflow-hidden snap-container">
      <Navbar />

      <Hero 
        tag="The Workshop // Est. 1994 // Mumbai"
        title1="Heritage"
        title2="Precision."
        description="Over thirty years of absolute precision in Mumbai's industrial heart. We balance mechanical power with high-tech engineering expertise and guaranteed reconditioning standards for domestic and global clients."
        backgroundImage="/images/5.png"
      />

      {/* SECTION 2: HERITAGE OVERVIEW */}
      <section className="py-32 snap-section border-t border-white/5 bg-[#0B0C0E] relative">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          
          <div className="max-w-4xl mx-auto text-center mb-24">
             <h3 className="text-3xl lg:text-5xl font-black text-white mb-10 uppercase tracking-tighter font-display leading-tight italic">Engineering Legacy, <br /> Excellence Always.</h3>
             <div className="space-y-8">
                <p className="text-lg lg:text-xl text-slate-300 font-body leading-relaxed font-bold uppercase tracking-widest">
                  Founded in 1994, Sri Devi Engineers has specialized in top-tier <span className="text-machine-green text-neon-green">surface grinding and reconditioning</span>. With three decades of mechanical expertise in Mumbai, we deliver precision and quality without compromise to the heavy industry sector.
                </p>
             </div>
          </div>

          <div className="relative aspect-[21/7] bg-[#141619] overflow-hidden border border-white/5 shadow-2xl group">
            <Image 
              src="/images/99.png"    
              alt="Sri Devi Engineers Workshop - Established 1994" 
              fill 
              className="object-cover grayscale saturate-50 contrast-125 opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 p-4 border-t border-machine-green bg-black/80 backdrop-blur-md">
                <div className="text-white text-[9px] font-black uppercase tracking-[0.4em] text-center">
                   Authorized Engineering Workshop // Mumbai HQ // Quality Guaranteed
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FOUNDATION GRID */}
      <section className="py-24 bg-black border-y border-white/5 snap-section relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <span className="text-machine-green text-[10px] font-black uppercase tracking-[0.5em] block mb-4 text-neon-green">Foundational Values</span>
              <h2 className="text-3xl lg:text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Operational <span className="text-machine-green">Integrity.</span></h2>
            </div>
            <p className="text-slate-600 text-[8px] font-black uppercase tracking-[0.4em] text-right hidden lg:block">Verifying professional leadership and verified technical documents.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
            <div className="bg-[#111111] p-12 group hover:bg-machine-green/5 transition-all flex flex-col justify-between min-h-[380px] border-t-2 border-machine-green shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-16 h-16 text-machine-green" />
              </div>
              <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center mb-10 group-hover:border-machine-green transition-all">
                <Award className="text-machine-green w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-machine-green mb-4 block">Workshop Proprietor</span>
                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2 leading-none">Vinod Shetty</h4>
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] leading-relaxed">30+ Years of Manufacturing Expertise in Precision Surface Reconditioning</p>
              </div>
            </div>

            <div className="bg-[#111111] p-12 group hover:bg-machine-green/5 transition-all flex flex-col justify-between min-h-[380px] border-t-2 border-slate-700 shadow-xl relative overflow-hidden">
              <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center mb-10 group-hover:border-machine-green transition-all">
                <Settings className="text-slate-500 w-6 h-6 group-hover:text-machine-green" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-4 block group-hover:text-slate-400">Operations Planning</span>
                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2 leading-none">Mangesh Mankar</h4>
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] leading-relaxed">Facility Oversight & Precision Quality Maintenance</p>
              </div>
            </div>

            <div className="bg-[#111111] p-12 group hover:bg-machine-green/5 transition-all flex flex-col justify-between min-h-[380px] border-t-2 border-machine-green/30 shadow-xl relative overflow-hidden">
               <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center mb-10 group-hover:border-machine-green transition-all">
                  <ShieldCheck className="text-slate-500 w-6 h-6 group-hover:text-machine-green" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-6 block group-hover:text-slate-400">Our Commitments</span>
                  <div className="space-y-4">
                    {["Customer Satisfaction", "Quality Commitment", "Integrity & Transparency", "Applied Innovation"].map((v, idx) => (
                      <div key={idx} className="flex items-center gap-4 group/item">
                        <div className="text-[8px] font-black text-machine-green w-6 h-6 border border-machine-green/20 flex items-center justify-center group-hover/item:bg-machine-green group-hover/item:text-black transition-all">0{idx + 1}</div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CERTIFIED EXCELLENCE REPOSITORY */}
      <section className="py-32 bg-[#0B0C0E] border-t border-white/5 snap-section relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-machine-green text-[10px] font-black uppercase tracking-[0.5em] block mb-6 text-neon-green">Official Accreditation</span>
              <h3 className="text-3xl lg:text-5xl font-black text-white uppercase italic tracking-tighter font-display leading-none">Standards & <span className="text-machine-green">Certification.</span></h3>
            </div>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.4em] max-w-sm text-right leading-loose">Maintaining high-integrity industrial compliance through verified government and technical registries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { id: "SDE-94/TAX", title: "GST Certificate", detail: "Tax Identification Documentation", path: "/images/gst.pdf" },
              { id: "UDYAM-MH-19", title: "Udyam Registry", detail: "Government MSME Certification", path: "/images/udyam1.pdf" },
              { id: "SDE-CORP/24", title: "Introduction Letter", detail: "Official Company Profile", path: "/images/introduction.pdf" }
            ].map((cert, i) => (
              <div key={i} className="bg-[#111111] p-12 hover:bg-machine-green/5 transition-all group border border-white/5 relative flex flex-col justify-between min-h-[400px]">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Award className="w-24 h-24 text-machine-green" />
                </div>
                <div className="relative z-10">
                  <span className="text-machine-green text-[9px] font-black tracking-[0.3em] uppercase mb-4 block">ID: {cert.id}</span>
                  <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4 leading-tight">{cert.title}</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black leading-loose">{cert.detail}</p>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="h-px w-full bg-white/5 mb-8" />
                  <div className="grid grid-cols-2 gap-4">
                    <a href={cert.path} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 h-14 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white transition-all">View</a>
                    <a href={cert.path} download className="flex items-center justify-center gap-3 h-14 bg-machine-green text-black text-[10px] font-black uppercase tracking-widest hover:bg-neon-green transition-all shadow-[0_0_15px_rgba(50,205,50,0.3)]">Download</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
