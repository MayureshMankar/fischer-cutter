"use client";

import { motion } from "framer-motion";
import { ArrowRight, Drill, Clock, Settings, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface HeroProps {
  tag: string;
  title1: string;
  title2: string;
  description: string;
  backgroundImage?: string;
}

export function Hero({ tag, title1, title2, description, backgroundImage }: HeroProps) {
  return (
    <section className="relative pt-48 pb-24 bg-black border-b-8 border-machine-green overflow-hidden">
      {/* Background - desaturated & technical like sub-pages */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <div className="absolute inset-0 z-0 opacity-100 grayscale-50 saturate-50 contrast-125 brightness-[0.8]">
            <Image 
              src={backgroundImage} 
              alt="Hero Background" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-3 py-1.5 bg-machine-green text-black text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-[0_0_30px_rgba(50,205,50,0.3)]"
          >
            {tag}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl md:text-9xl font-black text-white mb-12 leading-[0.8] tracking-tighter uppercase font-display italic"
          >
            {title1} <br />
            <span className="text-machine-green text-neon-green">{title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[14px] text-slate-500 max-w-2xl leading-loose font-body uppercase tracking-[0.2em] font-medium"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
