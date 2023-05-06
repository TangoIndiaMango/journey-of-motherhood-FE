"use client";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    src: "/bg-logo.png",
  },
];

const AuthCarousel = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timeHandler = setInterval(
      () =>
        setActive((prev: number) => (prev >= data.length - 1 ? 0 : prev + 1)),
      3000
    );

    return () => {
      clearInterval(timeHandler);
    };
  }, [active]);

  const dots = data.map((_, i) => {
    return (
      <div
        className={`h-3 w-3 rounded-full ${
          i == active ? `bg-[var(--primaryColor)]` : "bg-white"
        } cursor-pointer `}
        key={i}
        onClick={() => setActive(i)}
      />
    );
  });
  return (
    <div
      style={{
        backgroundImage: `url(${data[active].src})`,
      }}
      className={`lg:block h-1/3  w-full bg-cover bg-bottom bg-no-repeat bg-black relative transition ease-in-out md:h-screen md:w-1/2`}
    >
      {/* <div className="flex gap-2 absolute bottom-10 left-1/2 -translate-x-1/2">
        {dots}
      </div> */}
    </div>
  );
};

export default AuthCarousel;
