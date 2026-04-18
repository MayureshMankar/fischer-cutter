"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { 
  Phone, 
  MapPin, 
  Send,
  Building2,
  ShieldCheck,
  Clock
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `SUBJECT: ${formData.subject}\n\n${formData.message}`
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.message || "SUBMISSION ERROR. PLEASE TRY AGAIN.");
      }
    } catch (err) {
      setError("COMMUNICATION ERROR. SYSTEM OFFLINE.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#0B0C0E] flex flex-col items-center justify-center p-6">
        <Navbar />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#111111] border border-machine-green p-16 text-center max-w-xl"
        >
          <div className="w-20 h-20 bg-machine-green flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(50,205,50,0.3)]">
            <ShieldCheck className="text-black w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-6">Inquiry Submitted.</h2>
          <p className="text-slate-400 text-sm uppercase tracking-widest leading-loose mb-10">
            Your technical request has been recorded. Our team will review the specifications and respond to your provided email address.
          </p>
          <Link href="/">
            <Button className="btn-machine-neon h-16 px-12 text-[10px] font-black uppercase tracking-widest">
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0C0E] pb-24 overflow-hidden snap-container">
      <Navbar />

      <Hero 
        tag="Professional Enquiries // Mumbai HQ"
        title1="Establish"
        title2="Contact."
        description="Direct channels for technical consulting and project inquiries in Mumbai. Connect with our engineering team to begin your precision manufacturing journey."
        backgroundImage="/images/7.png"
      />

      {/* CONTACT GRID */}
      <section className="py-32 snap-section bg-[#0B0C0E] border-t border-white/5 relative">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* COMMUNICATION NODES */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#111111] border-t-2 border-machine-green shadow-xl flex flex-col justify-between min-h-[400px] relative overflow-hidden group">
              {/* Live Google Map Embed */}
              <div className="absolute inset-0 z-0 bg-[#0B0C0E]">
                <iframe 
                  src="https://www.google.com/maps?q=Sri+Devi+Engineers+Sakinaka+Mumbai&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.5)' }} 
                  className="group-hover:filter-none transition-all duration-700"
                  allowFullScreen={true} 
                  loading="lazy" 
                  title="Sri Devi Engineers Mumbai Workshop Location"
                ></iframe>
              </div>

              <div className="absolute top-0 right-0 p-6 opacity-30 z-10 pointer-events-none">
                <MapPin className="w-20 h-20 text-machine-green" />
              </div>

              <div className="relative z-20 p-10 h-full flex flex-col justify-between pointer-events-none">
                <div className="w-12 h-12 bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center mb-10 group-hover:border-machine-green transition-all pointer-events-auto">
                  <Building2 className="text-machine-green w-6 h-6" />
                </div>
                <div className="pointer-events-auto">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-machine-green mb-4 block">Workshop Location</span>
                  <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4 leading-tight">Mumbai HQ</h4>
                  <p className="text-[11px] text-slate-300 font-body leading-relaxed uppercase tracking-[0.2em] font-black bg-black/40 backdrop-blur-sm p-4 border-l border-machine-green/30">
                    D/6, Ansa Industrial Estate, S V Road,<br />
                    Sakinaka, Andheri East, Mumbai – 400072.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] p-10 border-t-2 border-slate-700 shadow-xl flex flex-col justify-between min-h-[300px] group">
              <div className="space-y-8 mt-10">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 mb-2 block">Direct Call</span>
                  <p className="text-2xl font-black text-white font-display tracking-tight">+91 98696 71387</p>
                </div>
                <div className="h-px w-full bg-white/5" />
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 mb-2 block">Official Email</span>
                  <p className="text-sm lg:text-base font-black text-machine-green font-display tracking-tight break-all">srideviengineers@yahoo.in</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] p-10 border-t-2 border-machine-green/30 shadow-xl flex flex-col justify-between min-h-[200px] group">
              <div className="flex items-center gap-4 mb-10">
                <Clock className="w-5 h-5 text-machine-green" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Business Hours</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="text-slate-600">Mon - Sat</span>
                <span className="text-white italic">09:00 — 19:00</span>
              </div>
            </div>
          </div>

          {/* PROJECT SUBMISSION */}
          <div className="lg:col-span-7">
            <div className="bg-[#111111] border border-white/5 p-12 lg:p-20 shadow-2xl relative overflow-hidden group">
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div>
                  <span className="text-machine-green text-[10px] font-black uppercase tracking-[0.5em] block mb-4 text-neon-green">Enquiry Portal</span>
                  <h3 className="text-3xl lg:text-4xl font-black text-white uppercase font-display italic tracking-tighter leading-none">Project <span className="text-machine-green">Details.</span></h3>
                </div>
              </div>
              <form className="space-y-10 relative z-10" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Full Name</label>
                    <input type="text" placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full h-14 bg-black/50 border border-white/10 px-6 text-[12px] font-bold text-white focus:border-machine-green focus:outline-none transition-all placeholder:text-slate-800" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Email Identifier</label>
                    <input type="email" placeholder="Your @email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full h-14 bg-black/50 border border-white/10 px-6 text-[12px] font-bold text-white focus:border-machine-green focus:outline-none transition-all placeholder:text-slate-800" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Contact Number</label>
                    <input type="tel" placeholder="+91" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full h-14 bg-black/50 border border-white/10 px-6 text-[12px] font-bold text-white focus:border-machine-green focus:outline-none transition-all placeholder:text-slate-800" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Subject</label>
                    <input type="text" placeholder="e.g., PRECISION GRINDING" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full h-14 bg-black/50 border border-white/10 px-6 text-[12px] font-bold text-white focus:border-machine-green focus:outline-none transition-all placeholder:text-slate-800" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Technical Specifications</label>
                  <textarea placeholder="DESCRIBE YOUR PROJECT REQUIREMENTS..." rows={6} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-black/50 border border-white/10 p-8 text-[12px] font-bold text-white focus:border-machine-green focus:outline-none transition-all placeholder:text-slate-800 resize-none" />
                </div>
                {error && <div className="p-4 bg-red-950/20 border-l-2 border-red-500 text-[10px] font-black text-red-200 uppercase tracking-widest">{error}</div>}
                <Button type="submit" disabled={isSubmitting} className="w-full h-20 bg-machine-green hover:bg-neon-green text-black rounded-none text-[11px] font-black uppercase tracking-[0.5em] transition-all shadow-[0_0_30px_rgba(50,205,50,0.2)]">
                  {isSubmitting ? "TRANSMITTING..." : <>Send Message <Send className="w-5 h-5 ml-4" /></>}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

      <section className="py-32 bg-black border-t border-white/5 snap-section">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 text-center md:text-left">
            <ShieldCheck className="w-16 h-16 text-machine-green shrink-0 text-neon-green" />
            <div>
              <h4 className="text-[12px] font-black uppercase tracking-[0.6em] text-white mb-3">SECURE COMMUNICATION</h4>
              <p className="text-[11px] text-slate-600 font-bold uppercase tracking-widest leading-[2]">
                All technical drawings and project specifications provided through this portal are treated with absolute confidentiality by the Sri Devi Engineers management team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
