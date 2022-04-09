import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Grid,
  GridProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const ContainerFullScreen = styled(Container)<ContainerProps>(() => ({
  height: "100%",
}));

export const BoxGradient = styled(Box)<BoxProps>(() => ({
  background:
    "linear-gradient(315deg, rgba(18,67,117,1) 35%, rgba(36,141,244,1) 100%)",
  height: "100%",
}));

export const GridFullScreen = styled(Grid)<GridProps>(() => ({
  height: "100%",
}));
