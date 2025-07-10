import React, { useState } from "react";
import { Cloud, Map, Info, Menu, X } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const menuItems = [
  { id: 1, title: "Weather", to: "/weather", icon: Cloud },
  { id: 2, title: "Map",     to: "/map",     icon: Map   },
  { id: 3, title: "About",   to: "/about",   icon: Info  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Desktop Sidebar */}
        <nav className="hidden lg:flex lg:flex-col lg:w-20 xl:w-24 bg-white/70 backdrop-blur-xl border-r border-white/20 shadow-xl">
          <div className="flex flex-col items-center py-8 space-y-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col space-y-4">
              {menuItems.map(({ id, title, to, icon: Icon }) => (
                  <NavLink
                      key={id}
                      to={to}
                      end
                      className={({ isActive }) =>
                          `group flex flex-col items-center p-3 rounded-2xl transition-all ${
                              isActive
                                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105"
                                  : "text-slate-600 hover:bg-white/60 hover:text-slate-800 hover:scale-105 hover:shadow-lg"
                          }`
                      }
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium opacity-80">{title}</span>
                    {/* active indicator */}
                    {location.pathname === to && (
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                    )}
                  </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SkySync
              </h1>
            </div>
            <button
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-600" />
              ) : (
                  <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Slide‑in Menu */}
        {isMobileMenuOpen && (
            <>
              <div
                  className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setIsMobileMenuOpen(false)}
              />
              <aside className="lg:hidden fixed top-0 right-0 h-full w-60 bg-white/95 backdrop-blur-xl shadow-2xl z-50">
                <div className="flex items-center justify-between p-4">
                  <h2 className="text-lg font-semibold">Navigation</h2>
                  <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200"
                  >
                    <X className="w-5 h-5 text-slate-600"/>
                  </button>
                </div>
                <div className="p-4 space-y-6">
                  {menuItems.map(({id, title, to, icon: Icon}) => (
                      <NavLink
                          key={id}
                          to={to}
                          end
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={({isActive}) =>
                              `flex items-center gap-4 p-3 rounded-xl transition-all ${
                                  isActive
                                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                              }`
                          }
                      >
                        <Icon className="w-6 h-6"/>
                        <span className="font-medium">{title}</span>
                      </NavLink>
                  ))}
                </div>
              </aside>
            </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto pt-20 pb-12 lg:pt-0 lg:pb-0">
          <div className="lg:p-6">
            <Outlet/>
          </div>
        </main>
      </div>
  );
}
