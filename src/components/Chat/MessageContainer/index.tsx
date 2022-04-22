import * as React from "react";
import { Typography, Box, IconButton, Grid } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AnotherMessage } from "../AnotherMessage";
import { MyMessage } from "../MyMessage";

export function ContainerChat() {
  return (
    <Box p={2} sx={{ overflow: "auto" }}>
      {/* <Grid container>
        <Grid item md={8}>
          <Typography variant="body2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
            saepe minus dignissimos eius voluptas eum iste, atque architecto.
            Cupiditate illo eius vitae officiis soluta a sint voluptas
            perspiciatis, aperiam voluptates.
          </Typography>
        </Grid>
        <Grid item md={8}>
          <Typography variant="body2">Teste Other</Typography>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item md={8}>
          <Box maxWidth="100%">
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="body2">Teste My</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid> */}
      <Box>
        <AnotherMessage />
      </Box>
      <Box mt={2}>
        <MyMessage />
      </Box>
      <Box mt={2}>
        <MyMessage />
      </Box>
      <Box mt={2}>
        <MyMessage />
      </Box>
      <Box mt={2}>
        <AnotherMessage />
      </Box>
      <Box mt={2}>
        <AnotherMessage />
      </Box>
      <Box mt={2}>
        <AnotherMessage />
      </Box>
      <Box mt={2}>
        <AnotherMessage />
      </Box>
    </Box>
  );
}
