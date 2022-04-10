import * as React from "react";
import {
  Alert as MuiAlert,
  Snackbar,
  AlertTitle,
  Button,
  Box,
} from "@mui/material";

import { IFeedbackProps } from "./component.props";

export function Alert({ data, onClose }: IFeedbackProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!!data.message.length}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <MuiAlert variant="filled" severity={data.type}>
        <AlertTitle>{data.message}</AlertTitle>
        <Box display="flex" flexDirection="row-reverse">
          {data.type === "success" && (
            <Button color="inherit" size="small">
              Login
            </Button>
          )}
        </Box>
      </MuiAlert>
    </Snackbar>
  );
}
