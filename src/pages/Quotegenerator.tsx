import React, { useState, useMemo, lazy, Suspense, useEffect } from "react";
import {
  Autocomplete,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Comma from "../assets/svgs/Comma";
import Loader from "../components/Loader";
import axios from "axios";
import { categories, truncate } from "../algos";

type Quote = {
  quote: string;
  author: string;
  category?: string;
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
  const [quotes, setQuotes] = useState<Quote[]>([] as Quote[]);
  const [fullQuote, setFullQuote] = useState<boolean>(false); // <--- TODO: Implement this feature
  const [quoteIdx, setQuoteIdx] = useState<number>(-1);
  const [category, setCategory] = useState<string>("inspirational");
  const [fetching, setFetching] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [color, setColor] = useState<string>(colors[0]);
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const setRandomColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  const handleNext = () => {
    if (quoteIdx + 1 >= quotes.length) setTrigger((prev) => !prev);
    else setQuoteIdx((prev) => prev + 1);
    setRandomColor();
  };

  const handlePrevious = () => {
    if (quoteIdx - 1 < 0) return;
    setQuoteIdx((prev) => (prev - 1 + quotes.length) % quotes.length);
    setRandomColor();
  };

  useEffect(() => {
    setFetching(true);
    axios
      .get(`${process.env.REACT_APP_NINJA_URL}quotes?category=${category}`, {
        headers: {
          "X-Api-Key": process.env.REACT_APP_NINJA_API_KEY,
        },
      })
      .then((response) => {
        setQuoteIdx((prev) => prev + 1);
        setQuotes((prev) => [...prev, response.data[0]]);
        console.log(quotes);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error:", error.response.status, error.response.data);
        } else {
          console.error("Request failed:", error.message);
        }
      })
      .finally(() => {
        setFetching(false);
      });
  }, [trigger]);

  useEffect(() => {
    setQuoteIdx(-1);
    setQuotes([]);
    setTrigger((prev) => !prev);
  }, [category]);

  if (fetching) return <Loader />;

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: color,
        height: "93vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {quotes.length > 0 && (
        <div
          style={{
            display: "flex",
            paddingBottom: "20px",
            width: "100vw",
            height: "90%",
            backgroundColor: palette.common.white,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Autocomplete
            freeSolo
            id="combo-box-demo"
            options={categories}
            onChange={(event, value) => value && setCategory(value)}
            sx={{
              width: 300,
              marginTop: "20px",
              marginBottom: "20px",
              "& .MuiInputLabel-root.Mui-focused": {
                color: color, // Change label color on focus
              },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: "grey", // Set the initial border color
              },
              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: color, // Change border color on hover
              },
              "& .MuiOutlinedInput-root:focus-within fieldset": {
                borderColor: color, // Change border color on focus
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={category[0].toUpperCase() + category.slice(1)}
              />
            )}
          />
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
              {fullQuote
                ? quotes[quoteIdx].quote
                : truncate(quotes[quoteIdx].quote, 100, false)}
              {quotes[quoteIdx].quote.length > 100 && (
                <span
                  style={{
                    color: "#000",
                    fontSize: isNonMobileScreens ? "24px" : "16px",
                    cursor: "pointer",
                  }}
                  onClick={() => setFullQuote((prev) => !prev)}
                >
                  {fullQuote ? "...Read less" : "...Read more"}
                </span>
              )}
            </p>

            <p
              style={{
                fontSize: isNonMobileScreens ? "24px" : "16px",
                fontWeight: 500,
              }}
            >
              <span>-{quotes[quoteIdx].author}</span>
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
      )}
    </div>
  );
};

export default Quotegenerator;
