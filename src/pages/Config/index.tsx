import * as React from "react";
import {
  Paper,
  Grid,
  Box,
  Container,
  FormControl,
  Input,
  InputAdornment,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { CardBot } from "../../components";
import { BotService } from "../../services/Bot";
import { ITeam } from "./page.props";
import { useParams, useSearchParams } from "react-router-dom";
import { IParams } from "./page.props";

export default function Config() {
  const { nick } = useParams<keyof IParams>();
  const botService = React.useMemo(() => new BotService(), []);
  const [loading, setLoading] = React.useState(true);
  console.log(nick);

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h1">Config {nick}</Typography>
      </Box>
    </Container>
  );
}
