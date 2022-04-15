import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Grid,
  GridProps,
  FormControl,
  FormControlProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const ContainerFullScreen = styled(Container)<ContainerProps>(() => ({
  height: "100%",
}));
