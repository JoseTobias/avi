import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#094682",
    },
    secondary: {
      main: "#248DF4",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#E3ECFE",
    },
  },
  shape: { borderRadius: 8 },
});

export default theme;
