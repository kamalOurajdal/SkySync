import React from "react";
import {
    Cloud,
    Code,
    Database,
    Droplets,
    Eye,
    Palette,
    Map,
    Zap,
    Shield,
    Target,
    Sparkles,
    Star,
    Coffee,
    Heart,
    Github,
    Linkedin
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function WeatherAbout() {
    const { isDark } = useTheme();
    
    const features = [
        { icon: <Zap className="w-6 h-6 text-yellow-500" />, title: "Real‑time", desc: "Fresh data every 10 min" },
        { icon: <Shield className="w-6 h-6 text-green-500" />, title: "Accurate", desc: "Pro‑grade stations" },
        { icon: <Target className="w-6 h-6 text-red-500" />, title: "Geo precise", desc: "GPS‑level targeting" },
        { icon: <Sparkles className="w-6 h-6 text-purple-500" />, title: "Modern UI", desc: "Clean & intuitive" },
    ];

    const tech = [
        { id: 1, name: "React",          icon: <Code   className="w-8 h-8 text-blue-500" />,  color: "bg-blue-50 dark:bg-blue-900/20",  version: "18.3" },
        { id: 2, name: "Tailwind CSS",   icon: <Palette className="w-8 h-8 text-cyan-500" />, color: "bg-cyan-50 dark:bg-cyan-900/20",  version: "3.3" },
        { id: 3, name: "Leaflet",        icon: <Map    className="w-8 h-8 text-green-500" />, color: "bg-green-50 dark:bg-green-900/20", version: "1.9" },
    ];

    const apis = [
        { id: 1, name: "OpenWeather", icon: <Droplets className="w-8 h-8 text-orange-500" />, color: "bg-orange-50 dark:bg-orange-900/20", desc: "Global real‑time weather." },
        { id: 2, name: "GeoNames",    icon: <Eye      className="w-8 h-8 text-purple-500" />, color: "bg-purple-50 dark:bg-purple-900/20", desc: "Worldwide geocoding." },
    ];

    return (
        <section className="min-h-screen bg-gradient-to-br from-light-background via-blue-50/50 to-indigo-50/50 dark:from-dark-background dark:via-slate-900/50 dark:to-slate-800/50 p-6 transition-all duration-300 ease-in-out">
            <header className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
                <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary shadow-xl transition-all duration-300">
                    <Cloud className="w-14 h-14 text-white" />
                </div>
                <h1 className="text-4xl font-extrabold text-light-text dark:text-dark-text mb-4 transition-colors duration-300">
                    About <span className="text-transparent bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text">SkySync</span>
                </h1>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-lg max-w-2xl mx-auto transition-colors duration-300">
                    A lightweight, accurate & beautifully simple weather experience.
                </p>
            </header>

            {/* features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
                {features.map((f, index) => (
                    <div 
                        key={f.title} 
                        className="bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur rounded-2xl p-4 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 animate-scale-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {f.icon}
                        <h3 className="mt-3 font-semibold text-light-text dark:text-dark-text transition-colors duration-300">{f.title}</h3>
                        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300">{f.desc}</p>
                    </div>
                ))}
            </div>

            {/* tech */}
            <section className="max-w-6xl mx-auto mb-20 animate-fade-in">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 text-light-text dark:text-dark-text transition-colors duration-300">
                    <Code className="w-7 h-7 text-light-primary dark:text-dark-primary transition-colors duration-300" /> Technologies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tech.map((t, index) => (
                        <article 
                            key={t.id} 
                            className="bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur p-6 rounded-3xl shadow-lg border border-light-border/40 dark:border-dark-border/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-scale-in"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`p-3 rounded-2xl shadow ${t.color} transition-colors duration-300`}>{t.icon}</div>
                                <div>
                                    <h3 className="text-lg font-bold text-light-text dark:text-dark-text transition-colors duration-300">{t.name}</h3>
                                    <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300">{t.version}</span>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* apis */}
            <section className="max-w-5xl mx-auto mb-24 animate-fade-in">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 text-light-text dark:text-dark-text transition-colors duration-300">
                    <Database className="w-7 h-7 text-green-500" /> Data Sources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {apis.map((a, index) => (
                        <article 
                            key={a.id} 
                            className="bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur p-6 rounded-3xl shadow-lg border border-light-border/40 dark:border-dark-border/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-scale-in"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <div className="flex gap-4">
                                <div className={`p-3 rounded-2xl shadow ${a.color} transition-colors duration-300`}>{a.icon}</div>
                                <div>
                                    <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-1 transition-colors duration-300">{a.name}</h3>
                                    <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm leading-relaxed transition-colors duration-300">{a.desc}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* footer */}
            <footer className="text-center py-10 border-t border-light-border/60 dark:border-dark-border/60 max-w-4xl mx-auto animate-fade-in">
                <div className="flex flex-wrap justify-center gap-6 mb-4 text-light-textSecondary dark:text-dark-textSecondary text-sm transition-colors duration-300">
                    <div className="flex items-center gap-1"><Coffee className="w-4 h-4" /> Crafted with care</div>
                    <div className="flex items-center gap-1 text-red-500"><Heart className="w-4 h-4 fill-current" /> For all users</div>
                </div>
                {/* social links */}
                <div className="flex justify-center gap-4 mb-6">
                    <a
                        href="https://github.com/kamalourajdal/SkySync"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-light-accent dark:bg-dark-accent hover:bg-light-border dark:hover:bg-dark-border shadow transition-all duration-300 hover:scale-110"
                    >
                        <Github className="w-5 h-5 text-light-text dark:text-dark-text transition-colors duration-300" />
                    </a>
                    <a
                        href="https://linkedin.com/in/kamalourajdal"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-light-accent dark:bg-dark-accent hover:bg-light-border dark:hover:bg-dark-border shadow transition-all duration-300 hover:scale-110"
                    >
                        <Linkedin className="w-5 h-5 text-light-text dark:text-dark-text transition-colors duration-300" />
                    </a>
                </div>
                <div className="inline-flex items-center gap-1 bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white px-4 py-2 rounded-full shadow transition-all duration-300 hover:scale-105">
                    <Sparkles className="w-4 h-4" /> v2.0.0
                </div>
            </footer>
        </section>
    );
}