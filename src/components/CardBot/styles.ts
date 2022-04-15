import { CardActionArea, CardActionAreaProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CardPaddingLess = styled(CardActionArea)<CardActionAreaProps>(
  () => ({
    ".MuiCardContent-root": { paddingTop: "0" },
  })
);
