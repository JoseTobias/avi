import * as React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function AnotherMessage() {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid item md={8}>
        <Box maxWidth="100%" display="flex">
          <Box
            sx={{ backgroundColor: theme.palette.background.default }}
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
      {/* <Grid item md={8}>
        <Typography variant="body2">Teste Other</Typography>
      </Grid> */}
    </Grid>
  );
}
