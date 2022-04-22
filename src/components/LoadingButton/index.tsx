import { CircularProgress, Button } from "@mui/material";
import { LoadingButtonProps } from "./component.props";

export function LoadingButton({
  loading = false,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={props.disabled || loading} {...props}>
      {loading ? (
        <CircularProgress color="inherit" size={26} />
      ) : (
        `${props.children}`
      )}
    </Button>
  );
}
