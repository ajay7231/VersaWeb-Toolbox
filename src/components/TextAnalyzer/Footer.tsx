import React from "react";
import { Grid, useTheme } from "@mui/material";

const Footer = ({
  readTime,
  longestWord,
}: {
  readTime: number;
  longestWord: string;
}) => {
  const { palette } = useTheme();
  return (
    <Grid
      container
      sx={{
        marginTop: "20px",
        width: "80vw",
        borderRadius: "10px",
        backgroundColor: palette.common.white,
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        item
        xs={12}
        md={6}
      >
        <h3>Average Reading Time: ~{readTime}</h3>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        item
        xs={12}
        md={6}
      >
        <h3>Longest Word: {longestWord}</h3>
      </Grid>
    </Grid>
  );
};

export default Footer;
