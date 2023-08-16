import React from "react";
import { Grid, useTheme } from "@mui/material";

export interface HeaderProps {
  words: number;
  characters: number;
  sentences: number;
  paragraphs: number;
  pronouns: number;
}

const Header = ({
  words,
  characters,
  sentences,
  paragraphs,
  pronouns,
}: HeaderProps) => {
  const data = [
    {
      name: "Words",
      value: words,
    },
    {
      name: "Characters",
      value: characters,
    },
    {
      name: "Sentences",
      value: sentences,
    },
    {
      name: "Paragraphs",
      value: paragraphs,
    },
    {
      name: "Pronouns",
      value: pronouns,
    },
  ];

  // get screen width
  const width = window.innerWidth;
  const { palette } = useTheme();
  console.log(width);

  return (
    <Grid
      container
      sx={{
        marginTop: "200px",
        width: "80vw",
        borderRadius: "10px",
        backgroundColor: palette.common.white,
      }}
    >
      {data.map((item, key) => (
        <Grid
          item
          md={2.4}
          xs={6}
          key={key}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4
            style={{
              color: palette.primary.main,
            }}
          >
            {item.name}
          </h4>
          <h3>{item.value}</h3>
        </Grid>
      ))}
    </Grid>
  );
};

export default Header;
