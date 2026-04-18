"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  Lock,
  ArrowRight
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0B0C0E] pb-24 overflow-hidden snap-container">
      <Navbar />

      {/* SECTION 1: HERO */}
      <Hero 
        tag="Legal Node // Compliance Verified"
        title1="Terms of"
        title2="Service."
        description="Establishing the legal framework for technical collaboration and industrial service engagement. Last Updated: October 2024."
        backgroundImage="/images/10.png"
      />

      {/* SECTION 2: LEGAL SUMMARY - Stark Dark */}
      <section className="py-32 snap-section border-t border-white/5 bg-[#0B0C0E] relative">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Mutual Ethics", 
                desc: "We operate on high-integrity engineering standards. Service engagement requires mutual adherence to technical accuracy.",
                icon: ShieldCheck
              },
              { 
                title: "Data Integrity", 
                desc: "Your technical drawings and proprietary project metadata are treated as high-security industrial secrets.",
                icon: Lock
              },
              { 
                title: "Quality Lock", 
                desc: "Liability is limited to service rework or refund, protecting the continuity of industrial production cycles.",
                icon: Scale
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#111111] border border-white/5 p-12 hover:border-machine-green/40 transition-all group">
                <item.icon className="text-machine-green w-10 h-10 mb-8 group-hover:text-neon-green" />
                <h4 className="text-xl font-black text-white uppercase italic mb-4">{item.title}</h4>
                <p className="text-slate-500 text-xs uppercase tracking-widest leading-loose font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: DETAILED CONTENT - High Contrast Dark */}
      <section className="py-32 bg-black border-t border-white/5 snap-section">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-24">
            <div>
              <h2 className="text-2xl font-black text-machine-green uppercase tracking-widest mb-10 italic">1. Service Acceptance</h2>
              <p className="text-slate-400 text-sm leading-relaxed uppercase tracking-wider font-medium">
                Upon submitting an order through our portal, we will provide a quote based on your specifications. A contract is formed only once you approve the quote and we confirm receipt of the job. We reserve the right to refuse service for any reason.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-machine-green uppercase tracking-widest mb-10 italic">2. Specifications and Accuracy</h2>
              <p className="text-slate-400 text-sm leading-relaxed uppercase tracking-wider font-medium">
                The client is responsible for providing accurate technical specifications, drawings, and required tolerances. Standard industrial tolerances apply unless otherwise specified in the approved quote. We are not liable for errors resulting from incorrect client-provided data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-machine-green uppercase tracking-widest mb-10 italic">3. Delivery and Turnaround</h2>
              <p className="text-slate-400 text-sm leading-relaxed uppercase tracking-wider font-medium">
                Estimated turnaround times are provided in good faith but are not guaranteed. We strive to minimize downtime but are not liable for delayed production schedules due to complex reconditioning requirements or external factors.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-machine-green uppercase tracking-widest mb-10 italic">4. Liability Limitation</h2>
              <p className="text-slate-400 text-sm leading-relaxed uppercase tracking-wider font-medium">
                Sri Devi Engineers shall not be liable for any consequential loss, damage, or downtime resulting from the failure or wear of components serviced by us. Our liability is limited to the cost of the re-servicing of the component or a refund of the service fee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MASTER FOOTER */}
      <Footer />
    </main>
  );
}
