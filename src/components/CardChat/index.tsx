import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, IconButton, CardActionArea } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export function CardChat() {
  return (
    <Card sx={{ borderRadius: "0" }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Nick
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
