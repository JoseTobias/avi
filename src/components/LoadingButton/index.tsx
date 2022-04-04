import { CircularProgress, Button } from "@mui/material";
import { LoadingButtonProps } from "./component.props";

export function LoadingButton({
  children,
  onClick,
  loading = false,
  disabled = false,
}: LoadingButtonProps) {
  return (
    <Button
      variant="contained"
      size="large"
      disabled={disabled || loading}
      fullWidth
      onClick={onClick}
    >
      {loading ? <CircularProgress color="inherit" size={26} /> : `${children}`}
      {/* <CircularProgress />
      {children} */}
    </Button>
  );
}
