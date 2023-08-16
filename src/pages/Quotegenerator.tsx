import React, { useState, useMemo, lazy, Suspense } from "react";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import Comma from "../assets/svgs/Comma";
import { quotes } from "../algos";
import Loader from "../components/Loader";
import { fetchQuotes } from "../api/quotes";

type Quote = {
  quote: string;
  author: string;
};

const generateSweetLightColors = () => {
  const colors = [];

  for (let i = 0; i < 10; i++) {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 40) + 40; // 40-80%
    const lightness = Math.floor(Math.random() * 30) + 60; // 60-90%

    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    colors.push(color);
  }

  return colors;
};

const colors = generateSweetLightColors();

// Lazy-loaded imports
const LazyArrowCircleLeftIcon = lazy(
  () => import("@mui/icons-material/ArrowCircleLeft")
);
const LazyArrowCircleRightIcon = lazy(
  () => import("@mui/icons-material/ArrowCircleRight")
);

const Quotegenerator: React.FC = () => {
  const [quoteIdx, setQuoteIdx] = useState<number>(0);
  const [color, setColor] = useState<string>(colors[0]);
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { isLoading, error, data } = fetchQuotes("inspirational");

  if (!isLoading) console.log(data);
  // const { data, isLoading, error } = useGetQuotesQuery("motivational");

  const setRandomColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  const handleNext = () => {
    setQuoteIdx((prev) => (prev + 1) % quotes.length);
    setRandomColor();
  };

  const handlePrevious = () => {
    setQuoteIdx((prev) => (prev - 1 + quotes.length) % quotes.length);
    setRandomColor();
  };

  const currentQuote: Quote = quotes[quoteIdx];

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: color,
        height: "93.7%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          paddingBottom: "20px",
          width: "100vw",
          height: "90%",
          backgroundColor: palette.common.white,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <Comma size={isNonMobileScreens ? 60 : 40} />
          <p
            style={{
              color: palette.primary.dark,
              fontSize: isNonMobileScreens ? "36px" : "24px",
              fontWeight: 500,
              width: isNonMobileScreens ? "50vw" : "90vw",
            }}
          >
            {currentQuote.quote}
          </p>
          <p
            style={{
              fontSize: isNonMobileScreens ? "24px" : "16px",
              fontWeight: 500,
            }}
          >
            <span>-{currentQuote.author}</span>
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={handlePrevious}>
              <Suspense fallback={<Loader />}>
                <LazyArrowCircleLeftIcon
                  sx={{
                    fontSize: "50px",
                    color: color,
                  }}
                />
              </Suspense>
            </IconButton>
            <IconButton onClick={handleNext}>
              <Suspense fallback={<Loader />}>
                <LazyArrowCircleRightIcon
                  sx={{
                    fontSize: "50px",
                    color: color,
                  }}
                />
              </Suspense>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotegenerator;
