import React, {useState} from "react";
import "../App.css";
import {Cloud} from "lucide-react";
import {Settings} from "luxon";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("weather");

  const menuItems = [
    { id: 1, title: "weather", value: "Weather", icon: Cloud },
    { id: 2, title: "map", value: "Map", icon: Map },
    { id: 3, title: "about", value: "About", icon: Settings },
  ];

  return (
      <div className="flex h-full">
        <nav className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 mr-6">
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.title;

              return (
                  <button
                      key={item.id}
                      onClick={() => setActiveTab(item.title)}
                      className={`
                  flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300
                  ${isActive
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }
                `}
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">{item.value}</span>
                  </button>
              );
            })}
          </div>
        </nav>

        <div className="flex-1">
          {/* Content would go here */}
        </div>
      </div>
  );
};

export default Navbar;
