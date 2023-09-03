import React from "react";
import "../App.css";
import { UilCloudSunTear } from "@iconscout/react-unicons";
import { UilMap } from "@iconscout/react-unicons";
import { UilSetting } from "@iconscout/react-unicons";

import { Link, Outlet } from "react-router-dom";

function LeftMenu() {
  const menuItems = [
    {
      id: 1,
      title: "weather",
      icon: <UilCloudSunTear />,
    },
    {
      id: 2,
      title: "map",
      icon: <UilMap />,
    },
    {
      id: 3,
      title: "settings",
      icon: <UilSetting />,
    },
  ];

  return (
    <div className="flex h-full">
      <div className="bg-white bg-opacity-50 flex flex-col  rounded-xl w-fit mx-2 ">
        {menuItems.map((item) => (
          <Link key={item.id} to={ item.title === "weather" ? "" : item.title}>
            <button className="py-2 w-full px-1 my-2 mt-6 rounded-lg hover:bg-white flex flex-col items-center">
              <img src="" alt="" />
              {item.icon}
              {item.title}
            </button>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default LeftMenu;
