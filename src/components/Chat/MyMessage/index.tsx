import * as React from "react";
import { Typography, Box, Grid } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@mui/material/styles";

export function MyMessage() {
  const theme = useTheme();
  console.log(theme);
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
            <Typography variant="body2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
              saepe minus dignissimos eius voluptas eum iste, atque architecto.
              Cupiditate illo eius vitae officiis soluta a sint voluptas
              perspiciatis, aperiam voluptates.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
