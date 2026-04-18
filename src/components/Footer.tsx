"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-24 bg-black border-t border-white/5 snap-section">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-machine-green flex items-center justify-center mb-12 shadow-[0_0_30px_rgba(50,205,50,0.2)]">
            <Settings className="text-black w-8 h-8" />
          </div>
          <h5 className="font-display font-black text-3xl text-white uppercase mb-4 tracking-tighter italic">
            SRI DEVI <span className="text-machine-green">ENGINEERS</span>
          </h5>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-16">
            Precision Engineering Workshop // Since 1994 // Mumbai
          </p>
          
          <div className="flex flex-wrap justify-center gap-16 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
            <Link href="/about" className="hover:text-machine-green transition-all">Heritage</Link>
            <Link href="/services" className="hover:text-machine-green transition-all">Capability</Link>
            <Link href="/portfolio" className="hover:text-machine-green transition-all">Portfolio</Link>
            <Link href="/contact" className="hover:text-machine-green transition-all">Contact</Link>
            <Link href="/terms" className="hover:text-machine-green transition-all">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
