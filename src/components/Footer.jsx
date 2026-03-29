import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <img src="/favicon.png" className="w-6 h-6" alt="Nexus" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                Nexus
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              The next-generation platform for teams to collaborate, 
              track progress, and ship faster than ever before.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase text-xs tracking-widest">
              Platform
            </h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Product</Link></li>
              <li><Link to="/about" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link to="/login" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Sign In</Link></li>
            </ul>
          </div>

          {/* Social & Contact Column */}
          <div className="flex flex-col items-start md:items-end">
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase text-xs tracking-widest">
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { label: "TW", color: "hover:bg-blue-500" },
                { label: "GH", color: "hover:bg-slate-800" },
                { label: "LI", color: "hover:bg-blue-700" }
              ].map((social) => (
                <button 
                  key={social.label}
                  className={`w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-all hover:text-white hover:border-transparent ${social.color}`}
                >
                  {social.label}
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 md:text-right font-medium">
              support@nexus.io
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-slate-500 dark:text-slate-500">
            © {currentYear} <span className="font-semibold text-slate-700 dark:text-slate-300">Nexus Inc.</span> All rights reserved.
          </p>
          <div className="flex gap-6 text-[13px] text-slate-500 dark:text-slate-500 font-medium">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;