import React from "react";
import "../App.css";
import { UilCloudSunTear } from "@iconscout/react-unicons";
import { UilMap } from "@iconscout/react-unicons";
import { UilSetting } from "@iconscout/react-unicons";

import {Link, NavLink, Outlet} from "react-router-dom";

function Navbar() {
  const menuItems = [
    {
      id: 1,
      title: "weather",
      value: "Weather",
      icon: <UilCloudSunTear />,
    },
    {
      id: 2,
      title: "map",
      value: "Map",
      icon: <UilMap />,
    },
    {
      id: 3,
      title: "about",
      value: "About",
      icon: <UilSetting />,
    },
  ];

  return (
    <div className="flex h-full">
      <div className="bg-white bg-opacity-80 flex flex-col rounded-xl w-fit mx-2 px-1 pt-8 gap-4">
        {menuItems.map((item) => (
            <NavLink
                key={item.id}
              to={item.title === "weather" ? "" : item.title}
                className={({isActive}) => isActive ? "w-full text-sm text-white flex flex-col items-center justify-center font-semibold rounded-md  bg-blue-500 p-1" :
                    "w-full text-sm flex flex-col items-center justify-center font-semibold  p-1 rounded-md hover:bg-gray-200"
                }
            >
              {item.icon}
              {item.value}
            </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
