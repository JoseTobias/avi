import * as React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IMessageProps } from "./component.props";

export function MyMessage({ children }: IMessageProps) {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid item xs={4}></Grid>
      <Grid item md={8}>
        <Box maxWidth="100%" display="flex" justifyContent="flex-end">
          <Box
            sx={{ backgroundColor: theme.palette.secondary.light }}
            p={1}
            borderRadius={1}
          >
            <Typography variant="body2">{children}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
