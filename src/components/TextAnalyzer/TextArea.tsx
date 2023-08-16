import React from "react";
import { useTheme, TextField } from "@mui/material";

const TextArea = ({
  handleChange,
  value,
}: {
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}) => {
  const { palette } = useTheme();
  return (
    <>
      <TextField
        onChange={handleChange}
        sx={{
          width: "80vw",
          marginTop: "20px",
          borderColor: "transparent !important",
          backgroundColor: palette.common.white,
          padding: "10px",
          borderRadius: "10px",
        }}
        value={value}
        variant="standard"
        rows={10}
        maxRows={20}
        id="outlined-textarea"
        label=""
        placeholder="Paste your text here..."
        multiline
      />
    </>
  );
};

export default TextArea;
