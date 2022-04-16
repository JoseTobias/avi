import { CircularProgress, Button } from "@mui/material";
import { LoadingButtonProps } from "./component.props";

export function LoadingButton(props: LoadingButtonProps) {
  return (
    <Button disabled={props.disabled || props.loading} {...props}>
      {props.loading ? (
        <CircularProgress color="inherit" size={26} />
      ) : (
        `${props.children}`
      )}
    </Button>
  );
}
