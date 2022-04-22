import * as React from "react";
import { TextField } from "@mui/material";

export function InputChat() {
  return (
    <TextField
      fullWidth
      id="outlined-basic"
      variant="outlined"
      placeholder="Mensagem"
    />
  );
}
