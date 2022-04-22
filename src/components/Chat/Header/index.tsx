import * as React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IHeaderProps } from "./component.props";

export function HeaderChat({ nick }: IHeaderProps) {
  return (
    <Box
      px={2}
      py={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ borderBottom: "solid 1px", borderColor: "divider" }}
    >
      <Typography variant="h4">{nick}</Typography>

      <IconButton aria-label="send" size="large">
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
