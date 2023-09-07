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
      title: "about",
      icon: <UilSetting />,
    },
  ];

  return (
    <div className="flex h-full">
      <div className="bg-white bg-opacity-80 flex flex-col  rounded-xl w-fit mx-2 ">
        {menuItems.map((item) => (
          <button key={item.id} className="py-2 w-full px-1 my-2 mt-6 rounded-lg hover:bg-white hover:shadow-md ">
            <Link
              to={item.title === "weather" ? "" : item.title}
              className="h-full w-full flex flex-col items-center justify-center"
            >
              {item.icon}
              {item.title}
            </Link>
          </button>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default LeftMenu;
