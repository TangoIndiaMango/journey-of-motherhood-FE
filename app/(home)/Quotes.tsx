"use client";

import { useState, useEffect } from "react";

const QuoteSlider = ({ ...quoteData }) => {
  const [currentIndex, setCurrentIndex] = useState<any>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev: any) =>
        prev > quoteData?.length - 1 ? (prev = 0) : prev + 1
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return <>{quoteData && quoteData[currentIndex]?.description}</>;
};

export default QuoteSlider;
