import React, { useRef, useState } from "react";

function Test() {
  const [showSecondDiv, setShowSecondDiv] = useState(false);
  const show = useRef(false)

  const toggleSecondDiv = () => {
    show.current = !show.current;
    setShowSecondDiv(!showSecondDiv);
  };
  console.log("show :" ,show.current);

  return (
    <div className="w-screen h-screen bg-green-300 flex">
      <div className={`w-${show.current ? "1/2" : "full"} h-full bg-red-200 flex items-center justify-center transition-width duration-500 ease-in-out`}>
        <button className={`bg-${show.current ? "blue-500" : "red-500"} text-white p-3 rounded-lg`} onClick={toggleSecondDiv}>
          {show.current ? "Hide side div" : "Show side div"}
        </button>
      </div>

     {<div className={`flex-grow h-full bg-blue-300 transition-width duration-500 ease-in-out opacity-${show.current ? "100" : "0"} transition-opacity`}>
        {/* Content for the second div */}
      </div>}
    </div>
  );
}

export default Test;
