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
    <header className="fixed w-full flex justify-between items-center px-5 shadow-xl z-10 bg-cyan-300">
      <p className="text-5xl">Shayan Hotel server</p>
      <div ref={container} className="w-32 justify-self-center"></div>
      <ul className="flex gap-5">
        <li>
          <a href="#booking">Booking</a>
        </li>
        <li>
          <a href="#reception">Reception</a>
        </li>
        <li>
          <a href="#">Table</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
