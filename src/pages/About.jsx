import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { useState } from "react";
import Navbar from "../components/Navbar";

function About() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-purple-100">
      {user ? (
        <Navbar user={user} />
      ) : (
        <PublicNavbar />
      )}

      <main className="relative overflow-hidden pt-32 pb-24">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-5%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 blur-[120px] dark:bg-blue-900/10" />
          <div className="absolute bottom-[20%] left-[-5%] w-[30%] h-[30%] rounded-full bg-purple-200/20 blur-[120px] dark:bg-purple-900/10" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          
          {/* HERO SECTION */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              The mission behind <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Nexus.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              We built Nexus to eliminate the friction in team collaboration. 
              One platform to unite your leaders, members, and missions.
            </p>
          </div>

          {/* FEATURES GRID */}
          <div className="grid md:grid-cols-3 gap-8 mb-32">
            {[
              { title: "Role-Based Access", desc: "Granular control for Leaders and Members to ensure security and focus.", icon: "👑" },
              { title: "Task Management", desc: "Real-time updates and seamless assignment workflows that just work.", icon: "📋" },
              { title: "Deep Analytics", desc: "Visualize progress with automated insights and performance tracking.", icon: "📊" }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                <div className="w-12 h-12 text-2xl flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* HOW IT WORKS (The Stepper) */}
          <div className="max-w-5xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">How It Works</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { step: "01", title: "Smart Login", text: "Secure Google Auth lets you jump in as a Leader or Member instantly." },
                { step: "02", title: "Team Setup", text: "Leaders deploy tasks and onboard members in a few simple clicks." },
                { step: "03", title: "Ship Projects", text: "Track the journey from 'To-Do' to 'Done' with live status updates." }
              ].map((item, i) => (
                <div key={i} className="relative text-center">
                  <span className="text-6xl font-black text-slate-100 dark:text-slate-900 absolute -top-10 left-1/2 -translate-x-1/2 -z-10 select-none">
                    {item.step}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FINAL CTA */}
          <div className="relative rounded-[3rem] p-12 overflow-hidden text-center bg-slate-900 dark:bg-white transition-all shadow-2xl">
             {/* Background glow for CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px]"></div>
            
            <h2 className="text-3xl font-bold text-white dark:text-slate-900 mb-6 relative z-10">
              Ready to streamline your workflow?
            </h2>
            <p className="text-slate-400 dark:text-slate-500 mb-10 max-w-xl mx-auto relative z-10">
              Join hundreds of teams already scaling with Nexus. Start your journey today.
            </p>
            <a
              href="/login"
              className="inline-block px-10 py-4 rounded-full text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-950 hover:scale-105 active:scale-95 transition-all relative z-10"
            >
              Get Started Now 🚀
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;
