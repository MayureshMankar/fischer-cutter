"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

const proofs = [
  {
    id: "LOG-101X",
    tag: "Heavy Grinding",
    title: "1600mm Hydraulic Bolster",
    desc: "Achieved absolute surface parallelism across a reinforced die bolster. Finished at our Mumbai workshop to exact industrial standards.",
    spec: "Surface: ±0.005mm Flat",
    image: "/images/1.png"
  },
  {
    id: "LOG-102C",
    tag: "Machining",
    title: "Precision Die Base",
    desc: "Corrective grinding on high-tensile die bases for automotive stamping manufacturers in Mumbai. Micron-level accuracy.",
    spec: "Parallel: ±0.002mm",
    image: "/images/2.png"
  },
  {
    id: "LOG-103S",
    tag: "Reconditioning",
    title: "Industrial Way Refacing",
    desc: "Complete restoration of factory-standard surface finishes on machine bed ways and slide guides for heavy manufacturing.",
    spec: "Finish: Ra 0.2",
    image: "/images/3.png"
  },
  {
    id: "LOG-104B",
    tag: "Cutter Ops",
    title: "Shearing Blade Match",
    desc: "Critical pair-matching for industrial shearing blades. Ensures zero-gap operational geometry for cutting units.",
    spec: "Edge: Factory Profile",
    image: "/images/4.png"
  },
  {
    id: "LOG-105G",
    tag: "Heavy Plate",
    title: "Large Scale Flatness Sync",
    desc: "Verifying and correcting flatness across 1500mm+ heavy steel plates for industrial infrastructure in India.",
    spec: "Limit: 1700mm Cap",
    image: "/images/5.png"
  },
  {
    id: "LOG-106F",
    tag: "Fischer Tooling",
    title: "OEM Cutter Reset",
    desc: "Technical restoration of Fischer-standard cutters at our facility. Restoring original metallurgy and sharp edge.",
    spec: "Verify: Industrial Standards",
    image: "/images/6.png"
  },
  {
    id: "LOG-107K",
    tag: "Blade Precision",
    title: "Konsta Knife Precision",
    desc: "High-precision sharpening of Konsta-style circular and straight knives for tyre manufacturing giants (MRF, Apollo).",
    spec: "Angle: Precision Insp.",
    image: "/images/7.png"
  },
  {
    id: "LOG-108M",
    tag: "Machining",
    title: "Machine Tool Restoration",
    desc: "Restoring the geometry of precision machine tool components for high-speed CNC centers in Mumbai.",
    spec: "Accuracy: Micron Level",
    image: "/images/8.png"
  },
  {
    id: "LOG-109H",
    tag: "Industrial",
    title: "Core Geometry Restoration",
    desc: "Complete industrial geometry restoration of complex machine bases and frames. Fully documented results.",
    spec: "Verification: Guaranteed",
    image: "/images/99.png"
  },
  {
    id: "LOG-110P",
    tag: "Metrology",
    title: "Surface Topography Scan",
    desc: "Validating surface integrity across large-batch industrial plates with zero-deviation at our Mumbai workshop.",
    spec: "Deviation: Zero-Point",
    image: "/images/10.png"
  },
  {
    id: "LOG-111J",
    tag: "Sharpening",
    title: "Tyre Industry Knife Set",
    desc: "Bulk sharpening of precision knife sets for leading tyre manufacturers (MRF, Apollo, JK) at Sri Devi Engineers.",
    spec: "Batch: High Volume",
    image: "/images/11.png"
  },
  {
    id: "LOG-112L",
    tag: "Heavy Ops",
    title: "Massive Bolster Grind",
    desc: "Maximum capacity (1700mm+) surface grinding for oversized hydraulic bolsters and machine foundations.",
    spec: "Scale: 1700mm Max",
    image: "/images/12.png"
  }
];

export default function PortfolioClient() {
  return (
    <main className="min-h-screen bg-[#0B0C0E] pb-24 overflow-hidden snap-container">
      <Navbar />

      <Hero
        tag="Engineering Results // Mumbai Workshop"
        title1="Proven"
        title2="Results."
        description="Validating technical capabilities through delivered outcomes. Since 1994, our Mumbai-based workshop has been the trusted partner for precision grinding and reconditioning."
        backgroundImage="/images/6.png"
      />

      {/* PORTFOLIO GRID */}
      <section className="py-32 snap-section bg-[#0B0C0E] border-t border-white/5 relative">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {proofs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-[#111111] border border-white/5 overflow-hidden hover:border-machine-green/40 transition-all duration-700 shadow-2xl flex flex-col h-full"
              >
                <div className="aspect-[16/9] relative grayscale saturate-0 contrast-125 opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000">
                  <Image 
                    src={item.image} 
                    alt={`Sri Devi Engineers Case Study - ${item.title}`} 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute top-8 left-8 p-3 bg-black/80 backdrop-blur-md text-white text-[9px] font-black tracking-[0.4em] uppercase border-l-4 border-machine-green">
                    LOG REF: {item.id}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-machine-green text-neon-green">{item.tag}</span>
                    <div className="bg-black/40 px-2 py-1 border border-white/5 italic font-technical text-[8px] font-black text-slate-500 tracking-widest leading-none">
                      CERTIFIED // 2026
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-white uppercase font-display mb-6 tracking-tighter leading-tight italic">{item.title}</h3>
                  <p className="text-[13px] text-slate-500 font-body leading-relaxed mb-10 line-clamp-4">{item.desc}</p>
                  <div className="mt-auto">
                    <div className="p-6 bg-black/40 border-l-2 border-machine-green mb-8 backdrop-blur-sm">
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 block mb-2">Technical Delivery</span>
                      <span className="text-technical text-sm font-black text-white">{item.spec}</span>
                    </div>
                    <Link href="/place-order" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-machine-green group-hover:gap-6 transition-all">
                      Project Details <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
