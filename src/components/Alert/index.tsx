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
  function onClick() {
    data.onActionButton && data.onActionButton();
    onClose && onClose();
  }
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
            <>
              {data.actionButtonText && data.onActionButton ? (
                <Button color="inherit" size="small" onClick={onClick}>
                  {data.actionButtonText}
                </Button>
              ) : null}
            </>
          )}
        </Box>
      </MuiAlert>
    </Snackbar>
  );
}
