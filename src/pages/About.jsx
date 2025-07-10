import React from "react";
import {
    Cloud,
    Code,
    Database,
    Droplets,
    Wind,
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

/**
 * Lightweight "About" page for the WeatherApp
 * Adds GitHub & LinkedIn links in the footer.
 */
export default function WeatherAbout() {
    const features = [
        { icon: <Zap className="w-6 h-6 text-yellow-500" />, title: "Real‑time", desc: "Fresh data every 10 min" },
        { icon: <Shield className="w-6 h-6 text-green-500" />, title: "Accurate", desc: "Pro‑grade stations" },
        { icon: <Target className="w-6 h-6 text-red-500" />, title: "Geo precise", desc: "GPS‑level targeting" },
        { icon: <Sparkles className="w-6 h-6 text-purple-500" />, title: "Modern UI", desc: "Clean & intuitive" },
    ];

    const tech = [
        { id: 1, name: "React",          icon: <Code   className="w-8 h-8 text-blue-500" />,  color: "bg-blue-50",  version: "18.2" },
        { id: 2, name: "Tailwind CSS",   icon: <Palette className="w-8 h-8 text-cyan-500" />, color: "bg-cyan-50",  version: "3.4" },
        { id: 3, name: "Leaflet",        icon: <Map    className="w-8 h-8 text-green-500" />, color: "bg-green-50", version: "1.9" },
    ];

    const apis = [
        { id: 1, name: "OpenWeather", icon: <Droplets className="w-8 h-8 text-orange-500" />, color: "bg-orange-50", desc: "Global real‑time weather." },
        { id: 2, name: "GeoNames",    icon: <Eye      className="w-8 h-8 text-purple-500" />, color: "bg-purple-50", desc: "Worldwide geocoding." },
    ];

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            <header className="max-w-4xl mx-auto text-center mb-16">
                <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl">
                    <Cloud className="w-14 h-14 text-white" />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
                    About <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">WeatherApp</span>
                </h1>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    A lightweight, accurate & beautifully simple weather experience.
                </p>
            </header>

            {/* features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
                {features.map((f) => (
                    <div key={f.title} className="bg-white/80 backdrop-blur rounded-2xl p-4 flex flex-col items-center text-center shadow-md">
                        {f.icon}
                        <h3 className="mt-3 font-semibold text-slate-800">{f.title}</h3>
                        <p className="text-xs text-slate-500">{f.desc}</p>
                    </div>
                ))}
            </div>

            {/* tech */}
            <section className="max-w-6xl mx-auto mb-20">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
                    <Code className="w-7 h-7 text-blue-500" /> Technologies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tech.map((t) => (
                        <article key={t.id} className="bg-white/90 backdrop-blur p-6 rounded-3xl shadow-lg border border-white/40 hover:-translate-y-1 transition">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`p-3 rounded-2xl shadow ${t.color}`}>{t.icon}</div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{t.name}</h3>
                                    <span className="text-xs text-slate-500">{t.version}</span>
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
            <section className="max-w-5xl mx-auto mb-24">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
                    <Database className="w-7 h-7 text-green-500" /> Data Sources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {apis.map((a) => (
                        <article key={a.id} className="bg-white/90 backdrop-blur p-6 rounded-3xl shadow-lg border border-white/40 hover:-translate-y-1 transition flex gap-4">
                            <div className={`p-3 rounded-2xl shadow ${a.color}`}>{a.icon}</div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-1">{a.name}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{a.desc}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* footer */}
            <footer className="text-center py-10 border-t border-slate-200/60 max-w-4xl mx-auto">
                <div className="flex flex-wrap justify-center gap-6 mb-4 text-slate-600 text-sm">
                    <div className="flex items-center gap-1"><Coffee className="w-4 h-4" /> Crafted with care</div>
                    <div className="flex items-center gap-1 text-red-500"><Heart className="w-4 h-4 fill-current" /> For all users</div>
                </div>
                {/* social links */}
                <div className="flex justify-center gap-4 mb-6">
                    <a
                        href="https://github.com/kamalourajdal/SkySync"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 shadow transition"
                    >
                        <Github className="w-5 h-5 text-slate-700" />
                    </a>
                    <a
                        href="https://linkedin.com/in/kamalourajdal"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 shadow transition"
                    >
                        <Linkedin className="w-5 h-5 text-slate-700" />
                    </a>
                </div>
                <div className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow">
                    <Sparkles className="w-4 h-4" /> v2.0.0
                </div>
            </footer>
        </section>
    );
}