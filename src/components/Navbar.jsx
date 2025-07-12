import React, { useState } from "react";
import { Cloud, Map, Info, Menu, X } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

const menuItems = [
  { id: 1, title: "Weather", to: "/weather", icon: Cloud },
  { id: 2, title: "Map",     to: "/map",     icon: Map   },
  { id: 3, title: "About",   to: "/about",   icon: Info  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();

  return (
      <div className="flex flex-col lg:flex-row min-h-screen transition-colors duration-300 ease-in-out bg-gradient-to-br from-light-background via-blue-50/50 to-indigo-50/50 dark:from-dark-background dark:via-slate-900/50 dark:to-slate-800/50">
        {/* Desktop Sidebar */}
        <nav className="hidden lg:flex lg:flex-col lg:w-20 xl:w-24 bg-light-surface/70 dark:bg-dark-surface/70 backdrop-blur-xl border-r border-light-border/20 dark:border-dark-border/20 shadow-xl transition-all duration-300 ease-in-out">
          <div className="flex flex-col items-center py-8 space-y-6">
            <div className="w-10 h-10 bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            
            {/* Theme Toggle */}
            <div className="flex flex-col items-center space-y-4">
              <ThemeToggle />
            </div>
            
            <div className="flex flex-col space-y-4">
              {menuItems.map(({ id, title, to, icon: Icon }) => (
                  <NavLink
                      key={id}
                      to={to}
                      end={false}
                      className={({ isActive }) =>
                          `group flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                              isActive
                                  ? "bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white shadow-lg scale-105"
                                  : "text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-accent/60 dark:hover:bg-dark-accent/60 hover:text-light-text dark:hover:text-dark-text hover:scale-105 hover:shadow-lg"
                          }`
                      }
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium opacity-80">{title}</span>
                    {/* active indicator */}
                    {location.pathname === to && (
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary rounded-full transition-all duration-300" />
                    )}
                  </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-xl border-b border-light-border/20 dark:border-dark-border/20 shadow-lg transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent transition-all duration-300">
                SkySync
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <button
                  onClick={() => setIsMobileMenuOpen((open) => !open)}
                  className="p-2 rounded-xl bg-light-accent dark:bg-dark-accent hover:bg-light-border dark:hover:bg-dark-border transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-light-textSecondary dark:text-dark-textSecondary" />
                ) : (
                    <Menu className="w-6 h-6 text-light-textSecondary dark:text-dark-textSecondary" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Slide‑in Menu */}
        {isMobileMenuOpen && (
            <>
              <div
                  className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setIsMobileMenuOpen(false)}
              />
              <aside className="lg:hidden fixed top-0 right-0 h-full w-60 bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-xl shadow-2xl z-50 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between p-4">
                  <h2 className="text-lg font-semibold text-light-text dark:text-dark-text">Navigation</h2>
                  <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-xl bg-light-accent dark:bg-dark-accent hover:bg-light-border dark:hover:bg-dark-border transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-light-textSecondary dark:text-dark-textSecondary"/>
                  </button>
                </div>
                <div className="p-4 space-y-6">
                  {menuItems.map(({id, title, to, icon: Icon}) => (
                      <NavLink
                          key={id}
                          to={to}
                          end={false}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={({isActive}) =>
                              `flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                                  isActive
                                      ? "bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white shadow-lg"
                                      : "text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-text dark:hover:text-dark-text"
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
        <main className="flex-1 overflow-auto pt-20 pb-12 lg:pt-0 lg:pb-0 transition-colors duration-300 ease-in-out">
          <div className="lg:p-6">
            <Outlet/>
          </div>
        </main>
      </div>
  );
}
