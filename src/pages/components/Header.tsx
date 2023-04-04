import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";

function Header() {
  const container = useRef(null) as unknown as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/hotel-logo.json",
    });
    // Return clean up function here
    return () => instance.destroy();
  }, []);

  return (
    <header className="fixed w-full flex justify-between items-center px-5 shadow-xl z-10 bg-white top-0">
      <p className="md:text-5xl text-xs">Shayan Hotel server</p>
      <div ref={container} className="md:w-32 w-16 justify-self-center"></div>
      <ul className="flex gap-5">
        <li>
          <a
            className="hover:text-blue-600 text-xs md:text-xl"
            href="#booking"
          >
            Booking
          </a>
        </li>
        <li>
          <a
            className="hover:text-blue-600 text-xs md:text-xl"
            href="#reception"
          >
            Reception
          </a>
        </li>
        <li>
          <a className="hover:text-blue-600 text-xs md:text-xl" href="#table">
            Table
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
