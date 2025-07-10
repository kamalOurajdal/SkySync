import React, {useState} from "react";
import {Settings, Map, Cloud, Info, Menu, X} from "lucide-react";
import {NavLink, Outlet} from "react-router-dom";

const Navbar = () => {
    const [activeTab, setActiveTab] = useState("weather");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [{id: 1, title: "Weather", value: "weather", icon: Cloud}, {
        id: 2, title: "Map", value: "map", icon: Map
    }, {id: 3, title: "About", value: "about", icon: Info},];

    const handleNavClick = (title) => {
        setActiveTab(title.toLowerCase());
        setIsMobileMenuOpen(false);
    };

    return (
        <div
            className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

            {/* ─────────── Desktop Sidebar ─────────── */}
            <nav
                className="hidden lg:flex lg:flex-col lg:w-20 xl:w-24 bg-white/70 backdrop-blur-xl border-r border-white/20 shadow-xl">
                <div className="flex flex-col items-center py-8 space-y-6">
                    {/* logo */}
                    <div
                        className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Cloud className="w-6 h-6 text-white"/>
                    </div>

                    {/* links */}
                    <div className="flex flex-col space-y-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.title.toLowerCase();
                            return (<NavLink
                                key={item.id}
                                to={item.value}
                                onClick={() => handleNavClick(item.title)}
                                className={`
                                    group relative flex flex-col items-center p-3 rounded-2xl transition-all
                                    ${isActive ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105" : "text-slate-600 hover:bg-white/60 hover:text-slate-800 hover:scale-105 hover:shadow-lg"}
                                  `}
                                        >
                                <Icon className="w-6 h-6 mb-1"/>
                                <span className="text-xs font-medium opacity-80">
                                    {item.title}
                                </span>
                                {isActive && (
                                    <div
                                        className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"/>
                                )}
                            </NavLink>);
                        })}
                    </div>
                </div>
            </nav>

            {/* ─────────── Mobile Header (fixed) ─────────── */}
            <header
                className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                        <div
                            className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Cloud className="w-6 h-6 text-white"/>
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            WeatherApp
                        </h1>
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                        {isMobileMenuOpen ? (<X className="w-6 h-6 text-slate-600"/>) : (
                            <Menu className="w-6 h-6 text-slate-600"/>)}
                    </button>
                </div>
            </header>

            {/* ─────────── Slide‑in Mobile Menu ─────────── */}
            {isMobileMenuOpen && (<>
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                <aside
                    className="lg:hidden fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50 transition-transform">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-semibold">Navigation</h2>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200"
                            >
                                <X className="w-5 h-5 text-slate-600"/>
                            </button>
                        </div>

                        <nav className="space-y-3">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.title.toLowerCase();
                                return (
                                    <NavLink
                                        to={item.value}
                                        key={item.id}
                                        onClick={() => handleNavClick(item.title)}
                                        className={`
                                            w-full flex items-center space-x-4 p-4 rounded-2xl transition-all
                                            ${isActive ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25" : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"}
                                          `}
                                    >
                                        <Icon className="w-6 h-6"/>
                                        <span className="font-medium">{item.title}</span>
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>
                </aside>
            </>)}

            {/* ─────────── Main Content ─────────── */}
            <main className="flex-1 overflow-auto pt-16 pb-20 lg:pt-0 lg:pb-0 h-screen">
                <div className="p-4">
                    <Outlet/>
                </div>
            </main>
        </div>
    );
};

export default Navbar;
