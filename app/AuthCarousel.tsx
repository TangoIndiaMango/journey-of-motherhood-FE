"use client";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1667132713689-dfe53c325445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW90aGVyaG9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    src: "https://plus.unsplash.com/premium_photo-1668303448765-4f0e448c7d59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fG1vdGhlcmhvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1678697980109-6c03a46abd27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8SnBnNktpZGwtSGt8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
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
      className={`h-1/6  w-full bg-cover bg-center bg-no-repeat bg-gray-600 relative transition ease-in-out md:h-screen md:w-1/2`}
    >
      <div className="flex gap-2 absolute bottom-10 left-1/2 -translate-x-1/2">
        {dots}
      </div>
    </div>
  );
};

export default AuthCarousel;
