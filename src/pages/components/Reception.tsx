import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";

function Reception() {
const container = useRef(
  null
) as unknown as React.MutableRefObject<HTMLDivElement>;

useEffect(() => {
  const instance = lottie.loadAnimation({
    container: container.current,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/hotel-bell.json",
  });

  // Return clean up function here
  return () => {
    instance.destroy();
  };
}, []);

  return (
    <section className="flex flex-col relative h-screen justify-center">
      <h1 id="reception" className="justify-self-start m-5 text-4xl">
        Reception
      </h1>
      <div className="flex flex-col-reverse md:flex-row gap-5 justify-center items-center">
        <p className="shadow-md border-black border-2 p-5 w-4/12 bg-cyan-300 rounded">
          Call 0 from your room if you need anything from reception. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Tempora reprehenderit
          ratione sint odit aperiam. Eveniet voluptate exercitationem voluptatem
          dolores corporis sit quo unde eius esse similique. Eum commodi vel
          impedit?
        </p>
        <div className="w-4/12" ref={container}></div>
      </div>
    </section>
  );
}

export default Reception;
