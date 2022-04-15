import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import { CardPaddingLess } from "./styles";
import SettingsIcon from "@mui/icons-material/Settings";
import { ICardBotProps } from "./component.props";

export function CardBot({ name, nick, description }: ICardBotProps) {
  return (
    <Box position="relative">
      <Card>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <IconButton sx={{ padding: 0, marginX: 1, marginTop: 1 }}>
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Box>
        <CardPaddingLess>
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
        </CardPaddingLess>
      </Card>
    </Box>
  );
}
