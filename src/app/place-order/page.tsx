"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Settings, 
  ArrowRight, 
  Loader2, 
  FileText, 
  Paperclip, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  Scissors,
  Layers,
  Zap,
  Box,
  Hammer,
  X,
  Plus,
  MonitorCheck
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const SERVICES = [
  { id: "surface-grinding", name: "Surface Grinding", icon: Settings, detail: "Precision flat surface engineering" },
  { id: "fischer-cutter", name: "Fischer Cutter", icon: Scissors, detail: "High-integrity cutting systems" },
  { id: "bolster-plate", name: "Bolster Plate", icon: Layers, detail: "Heavy-duty foundation plates" },
  { id: "shearing-blade", name: "Shearing Blade", icon: Zap, detail: "High-impact shearing systems" },
  { id: "konstruct-blade", name: "Konstruct Blade", icon: Box, detail: "Structural blade engineering" },
  { id: "custom", name: "Custom Project", icon: Hammer, detail: "Specialized mechanical project" },
];

export default function PlaceOrderPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [specs, setSpecs] = useState("");
  const [drawings, setDrawings] = useState<{name: string, data: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("fischer_cutter_token");
    if (!token) {
      toast.info("Please sign in to place an order.");
      router.push("/login?redirect=/place-order");
    }
  }, [router]);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB
    let pendingSize = drawings.reduce((acc, d) => acc + (d.data.length * 0.75), 0);

    Array.from(files).forEach(file => {
      if (pendingSize + file.size > MAX_TOTAL_SIZE) {
        toast.error(`LIMIT EXCEEDED: Total allocation would exceed 10MB. Skipping ${file.name}`);
        return;
      }

      // Reserve the size immediately to prevent race conditions during bulk selection
      pendingSize += file.size;

      const reader = new FileReader();
      reader.onloadend = () => {
        setDrawings(prev => [...prev, { name: file.name, data: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeDrawing = (index: number) => {
    setDrawings(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedServices.length === 0) {
      toast.error("PLEASE SELECT AT LEAST ONE SERVICE.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("fischer_cutter_token");
      const serviceNames = selectedServices
        .map(id => SERVICES.find(s => s.id === id)?.name)
        .filter(Boolean) as string[];
      
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          services: serviceNames, 
          projectSpecifications: specs,
          files: drawings.map(d => ({ filename: d.name, content: d.data }))
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success("Industrial order request recorded.");
      } else {
        const data = await res.json();
        toast.error(data.message || "TRANSMISSION ERROR.");
      }
    } catch (err) {
      toast.error("COMMUNICATION FAILURE. OFFLINE.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#0B0C0E] flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
        <Toaster position="top-right" richColors />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="max-w-md w-full border-t-2 border-machine-green bg-[#111111] shadow-2xl relative overflow-hidden group p-12 lg:p-16">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldCheck className="w-32 h-32 text-machine-green" />
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-black border border-machine-green/20 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(50,205,50,0.1)]">
                <CheckCircle2 className="w-10 h-10 text-machine-green" />
              </div>
              <span className="text-machine-green text-[10px] font-black uppercase tracking-[0.5em] block mb-4">Submission Confirmed</span>
              <h2 className="text-3xl font-display font-black tracking-tighter uppercase text-white italic mb-10 leading-none">Order <span className="text-machine-green">Received.</span></h2>
              <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] leading-loose mb-12">
                Our production team is analyzing your specifications. A technical quote will be sent to your email address within 24 operational hours.
              </p>
              
              <Link href="/" className="flex items-center justify-center h-16 bg-machine-green text-black text-[12px] font-black uppercase tracking-[0.4em] hover:bg-neon-green transition-all shadow-[0_0_20px_rgba(50,205,50,0.2)]">
                Return to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0C0E] pb-24 overflow-hidden snap-container">
      <Navbar />
      <Toaster position="top-right" richColors />

      <Hero 
        tag="Service Request // Machining Standards"
        title1="Order"
        title2="Request."
        description="Provide mechanical specifications and tolerances. Our engineering team will evaluate feasibility and material compatibility for your specialized industrial components."
        backgroundImage="/images/projrct.png"
      />

      {/* Intake Interface */}
      <section className="py-32 bg-[#0B0C0E] border-t border-white/5 snap-section relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Operational Hub */}
          <div className="lg:w-1/3 flex flex-col gap-10">
            <div>
              <span className="text-machine-green text-[10px] font-black uppercase tracking-[0.4em] block mb-6 text-neon-green">Engineering Center</span>
              <h3 className="text-3xl lg:text-4xl font-black text-white mb-8 uppercase tracking-tighter font-display italic leading-none text-balance">Work <br /> <span className="text-machine-green">Management.</span></h3>
            </div>

            <div className="bg-[#111111] p-10 border-t-2 border-machine-green shadow-2xl relative overflow-hidden group min-h-[400px] flex flex-col justify-between">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <ShieldCheck className="w-24 h-24 text-machine-green" />
               </div>
               
               <div className="space-y-12">
                  <div className="flex gap-6 items-start">
                    <div className="w-10 h-10 bg-black border border-machine-green/20 flex items-center justify-center font-black text-[11px] text-machine-green shrink-0">01</div>
                    <div className="space-y-1">
                      <p className="text-[11px] text-white uppercase tracking-widest font-black leading-none">Project Analysis</p>
                      <p className="text-[9px] text-slate-600 uppercase tracking-wider font-black">Spatial Geometry Verification</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-10 h-10 bg-black border border-slate-700 flex items-center justify-center font-black text-[11px] text-slate-500 shrink-0">02</div>
                    <div className="space-y-1">
                      <p className="text-[11px] text-slate-400 uppercase tracking-widest font-black leading-none group-hover:text-white transition-colors">Engineering Review</p>
                      <p className="text-[9px] text-slate-600 uppercase tracking-wider font-black">Material Integrity Check</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-10 h-10 bg-black border border-slate-700 flex items-center justify-center font-black text-[11px] text-slate-500 shrink-0">03</div>
                    <div className="space-y-1">
                      <p className="text-[11px] text-slate-400 uppercase tracking-widest font-black leading-none group-hover:text-white transition-colors">Quote Finalization</p>
                      <p className="text-[9px] text-slate-600 uppercase tracking-wider font-black">Submit Official Quotation</p>
                    </div>
                  </div>
               </div>

               <div className="bg-black/50 p-6 border-l border-machine-green mt-12">
                  <div className="flex items-center gap-4 text-[9px] text-slate-500 font-black uppercase tracking-[0.3em]">
                    <ShieldCheck className="w-4 h-4 text-machine-green" /> Secure Data Transfer
                  </div>
               </div>
            </div>
          </div>

          {/* Right Side: Order Details Form */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-[#111111] border border-white/5 shadow-2xl relative overflow-hidden group p-12 lg:p-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-machine-green/5 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="mb-20 relative z-10 flex justify-between items-start">
                <div>
                   <span className="text-machine-green text-[10px] font-black uppercase tracking-[0.5em] block mb-4">Order Inquiry</span>
                   <h2 className="text-2xl lg:text-3xl font-display font-black tracking-tighter uppercase text-white italic leading-none">Record <span className="text-machine-green">Details.</span></h2>
                </div>
                <div className="px-5 py-3 border border-white/10 text-[9px] font-black text-slate-600 tracking-widest uppercase">
                  Service ID: ORD-2026
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-16 relative z-10">
                
                {/* Module Selection - Multi-Select Enabled */}
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-machine-green">Step [01] // Module Configuration</Label>
                    <span className="text-[9px] font-technical text-slate-500 tracking-[0.3em]">{selectedServices.length} Selected</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
                    {SERVICES.map((item) => {
                      const isActive = selectedServices.includes(item.id);
                      return (
                        <div 
                          key={item.id}
                          onClick={() => toggleService(item.id)}
                          className={cn(
                            "flex flex-col items-center justify-between p-10 h-[180px] bg-[#111111] transition-all cursor-pointer relative overflow-hidden group/item",
                            isActive ? "bg-machine-green/5 ring-1 ring-inset ring-machine-green/30" : "hover:bg-machine-green/[0.02]"
                          )}
                        >
                          <div className={cn(
                            "w-12 h-12 flex items-center justify-center border transition-all",
                            isActive ? "border-machine-green bg-black text-machine-green" : "border-white/10 text-slate-600 group-hover/item:border-machine-green group-hover/item:text-machine-green"
                          )}>
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div className="text-center">
                             <p className={cn(
                               "font-black text-[11px] uppercase tracking-widest mb-1 transition-colors",
                               isActive ? "text-white" : "text-slate-500"
                             )}>{item.name}</p>
                             <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{item.detail}</p>
                          </div>
                          {isActive && (
                            <div className="absolute top-2 right-2 flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-machine-green shadow-[0_0_10px_#32CD32]" />
                               <CheckCircle2 className="w-3 h-3 text-machine-green" />
                            </div>
                          )}
                          {!isActive && (
                            <div className="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                               <Plus className="w-3 h-3 text-slate-800" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Parameters Ledger */}
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="specs" className="text-[10px] font-black uppercase tracking-[0.4em] text-machine-green">Step [02] // Technical Specifications</Label>
                    <span className="text-[9px] font-technical text-machine-green/50 tracking-widest">Detail Required</span>
                  </div>
                  
                  {/* Live Specification Summary */}
                  {selectedServices.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-black/50 border border-machine-green/20 p-6 flex flex-wrap gap-4"
                    >
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] w-full mb-2">Integrated Modules:</span>
                      {selectedServices.map(id => (
                        <div key={id} className="flex items-center gap-3 bg-machine-green/5 px-4 py-2 border border-machine-green/10">
                           <MonitorCheck className="w-3 h-3 text-machine-green" />
                           <span className="text-[9px] font-black text-white uppercase tracking-widest">{SERVICES.find(s => s.id === id)?.name}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  <div className="relative">
                    <Textarea 
                      id="specs"
                      placeholder="DESCRIBE YOUR PROJECT:&#10;> MATERIAL GRADE&#10;> DIMENSIONS (LXWXH)&#10;> TOLERANCES&#10;> VOLUME"
                      className="min-h-[250px] bg-black border border-white/10 p-10 text-[11px] font-black text-white focus:border-machine-green focus:outline-none transition-all placeholder:text-slate-800 resize-none leading-loose tracking-widest uppercase rounded-none"
                      required
                      value={specs}
                      onChange={(e) => setSpecs(e.target.value)}
                    />
                  </div>
                </div>

                {/* Drawing Attachments Hub */}
                <div className="space-y-8">
                  <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-machine-green">Step [03] // Engineering Drawings</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative group/upload">
                      <input 
                        type="file" 
                        multiple 
                        accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.step,.stp"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                      <div className="h-40 bg-black border border-dashed border-white/10 group-hover/upload:border-machine-green transition-all flex flex-col items-center justify-center p-8 text-center ring-inset ring-machine-green/5 hover:ring-2">
                        <Paperclip className="w-8 h-8 text-slate-700 mb-4 group-hover/upload:text-machine-green transition-colors" />
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Upload Drawing Blueprints</p>
                        <p className="text-[8px] text-slate-700 mt-2">PDF, CAD (DWG/DXF), STEP, or Images // Total &lt; 10MB</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block">Allocated Assets:</span>
                      {drawings.length === 0 ? (
                        <div className="p-8 border border-white/5 bg-white/[0.01] text-center">
                          <p className="text-[9px] text-slate-800 font-black uppercase tracking-widest italic">No blueprints detected</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {drawings.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-black border border-white/5 group/file">
                              <div className="flex items-center gap-4">
                                <FileText className="w-4 h-4 text-machine-green" />
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest truncate max-w-[150px]">{doc.name}</span>
                              </div>
                              <button 
                                type="button"
                                onClick={() => removeDrawing(idx)}
                                className="text-slate-800 hover:text-red-500 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-end gap-10">
                  <div className="hidden md:block text-right">
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em] font-technical">Identity Verified // Authentication Active</p>
                  </div>
                  <Button type="submit" size="lg" className="w-full md:w-auto h-20 bg-machine-green px-12 text-black text-[12px] font-black uppercase tracking-[0.5em] transition-all hover:bg-neon-green shadow-[0_0_30px_rgba(50,205,50,0.2)] disabled:opacity-50" disabled={loading}>
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin text-black" />
                    ) : (
                      <span className="flex items-center gap-6">Initialize Production Request <ArrowRight className="w-6 h-6" /></span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
      {/* MASTER FOOTER */}
      <Footer />
    </main>
  );
}
