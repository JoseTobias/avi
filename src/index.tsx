import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Route from "./router";
import theme from "./theme";
import { createRoot } from "react-dom/client";
import "./basedStyles.css";
import {
  AlertProvider,
  AuthProvider,
  BotSelectedProvider,
  ChatMessageProvider,
  TeamsProvider,
} from "./contexts";
import { CookiesProvider } from "react-cookie";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AlertProvider>
      <AuthProvider>
        <CookiesProvider>
          <BotSelectedProvider>
            <ChatMessageProvider>
              <TeamsProvider>
                <Route />
              </TeamsProvider>
            </ChatMessageProvider>
          </BotSelectedProvider>
        </CookiesProvider>
      </AuthProvider>
    </AlertProvider>
  </ThemeProvider>
);
