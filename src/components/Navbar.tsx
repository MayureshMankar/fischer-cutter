"use client";

import { motion } from "framer-motion";
import { Settings, User, Phone, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("fischer_cutter_token");
    const user = localStorage.getItem("fischer_cutter_user");
    if (token && user) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || "");
      } catch (e) {
        console.error("Auth sync error");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fischer_cutter_token");
    localStorage.removeItem("fischer_cutter_user");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const activeLinks = isLoggedIn 
    ? [...navLinks, { name: "Place Order", href: "/place-order" }]
    : navLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism h-20 flex items-center">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo Lockup */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-machine-green flex items-center justify-center rounded-none shadow-[0_0_20px_rgba(50,205,50,0.3)]">
            <Settings className="text-black w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl leading-none tracking-tighter text-white uppercase">
              SRI DEVI <span className="text-machine-green italic">ENGINEERS</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-1">PRECISION AT SCALE // SINCE 1994</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-10">
          {activeLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 py-1 border-b-2",
                pathname === link.href ? "text-machine-green border-machine-green" : "text-slate-400 border-transparent hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="tel:+919869671387" className="flex items-center gap-2 text-slate-400 hover:text-machine-green transition-colors">
            <Phone className="w-4 h-4 text-machine-green" />
            <span className="text-[10px] font-bold uppercase tracking-widest">+91 98696 71387</span>
          </Link>
          {isLoggedIn ? (
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="border-red-900/20 rounded-none h-11 px-6 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-900/10 hover:text-red-400 transition-all"
            >
              Sign Out
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="border-white/10 rounded-none h-11 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:bg-white/5 hover:text-white transition-all">
              Partner Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-industrial-matte border-b border-white/5 p-8 absolute top-20 left-0 right-0 z-40"
        >
          <div className="flex flex-col gap-8">
            {activeLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-[12px] font-bold uppercase tracking-widest",
                  pathname === link.href ? "text-machine-green" : "text-slate-400"
                )}
              >
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-[12px] font-bold uppercase tracking-widest text-red-500 mt-4 pt-4 border-t border-white/5 text-left">
                Sign Out
              </button>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-[12px] font-bold uppercase tracking-widest text-white mt-4 pt-4 border-t border-white/5">
                Partner Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
