import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Route from "./router";
import theme from "./theme";
import { createRoot } from "react-dom/client";
import "./basedStyles.css";
import { AlertProvider } from "./contexts";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AlertProvider>
      <Route />
    </AlertProvider>
  </ThemeProvider>
);
