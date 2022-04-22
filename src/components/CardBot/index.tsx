import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, IconButton, CardActionArea } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { ICardBotProps } from "./component.props";

export function CardBot({
  name,
  nick,
  description,
  onConfig,
  onClick,
  enableConfig = false,
}: ICardBotProps) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {enableConfig && (
        <Box display="flex" justifyContent="flex-end" width="100%">
          <IconButton
            sx={{ padding: 0, marginX: 1, marginTop: 1 }}
            onClick={onConfig}
          >
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
      <CardActionArea
        onClick={onClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "start",
          ".MuiCardContent-root": {
            ...(enableConfig ? { paddingTop: "0" } : { paddingTop: "28px" }),
          },
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            {nick}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
