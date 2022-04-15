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

export default function Dashboard() {
  const botService = React.useMemo(() => new BotService(), []);

  const [teams, setTeams] = React.useState<ITeam[]>([]);
  const [loading, setLoading] = React.useState(true);

  const loadBots = React.useCallback(async () => {
    try {
      const response = await botService.getBots();
      console.log("response", response);
      setTeams(response || []);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, [botService]);

  React.useEffect(() => {
    loadBots();
  }, [loadBots]);

  async function searchBot(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setLoading(true);
    const nick = event.target.value;
    let bots: ITeam[] | undefined = [];
    try {
      if (nick.length === 0) {
        bots = await botService.getBots();
      } else {
        bots = await botService.getBotsByNick(event.target.value);
      }
      console.log("response", bots);
      setTeams(bots || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Box mt={4}>
        <Grid container justifyContent="center">
          <Grid item md={8}>
            <Paper elevation={3}>
              <Box
                display="flex"
                p={1}
                pl={2}
                alignItems="center"
                flexDirection="column"
              >
                <FormControl variant="standard" fullWidth>
                  <Input
                    id="search-input"
                    type="text"
                    disableUnderline
                    onBlur={searchBot}
                    endAdornment={
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {!loading ? (
          <Grid container flexDirection="row" spacing={2} marginTop={4}>
            {teams.length > 0 ? (
              teams?.map((team) => (
                <Grid item sm={4} md={3} xs={12} key={team.bot.id}>
                  <CardBot
                    name={team.bot.name}
                    nick={team.bot.nick}
                    description={team.bot.description}
                  />
                </Grid>
              ))
            ) : (
              <Box display="flex" justifyContent="center" mt={4} width="100%">
                <Typography gutterBottom variant="subtitle1" align="center">
                  Nenhum bot cadastrado ainda
                </Typography>
              </Box>
            )}
          </Grid>
        ) : (
          <Box display="flex" justifyContent="center" mt={16}>
            <CircularProgress color="secondary" />
          </Box>
        )}
      </Box>
    </Container>
  );
}
