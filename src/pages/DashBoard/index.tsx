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
  Fab,
  SpeedDial,
  Dialog,
  TextField,
  Button,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import { CardBot } from "../../components";
import { BotService } from "../../services/Bot";
import { ITeam } from "./page.props";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "../../components";
import { useBotSelected } from "../../hooks/botSelected";
import { useTeams } from "../../hooks/teams";
import { useAuth } from "../../hooks/auth";

interface IAddBot {
  name: string;
  nick: string;
  description: string;
}

const voidAddBot = {
  name: "",
  nick: "",
  description: "",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { selectBot } = useBotSelected();
  const { teams, updateTeams } = useTeams();
  const { setAuth } = useAuth();

  const botService = React.useMemo(() => new BotService(), []);

  const [searchedTeams, setSearchedTeams] = React.useState<ITeam[]>([]);
  const [botToAdd, setBotToAdd] = React.useState<IAddBot>(voidAddBot);
  const [botToAddError, setBotToAddError] = React.useState<IAddBot>(voidAddBot);
  const [loadingMyBots, setLoadingMyBots] = React.useState(true);
  const [loadingOtherBots, setLoadingOtherBots] = React.useState(false);
  const [addLoading, setAddLoading] = React.useState(false);
  const [addModal, setAddModal] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const loadBots = React.useCallback(async () => {
    try {
      const response = await botService.getBots();
      updateTeams(response?.teams || []);
      setAuth(response?.auth);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingMyBots(false);
    }
  }, [botService, updateTeams, setAuth]);

  React.useEffect(() => {
    loadBots();
  }, [loadBots]);

  async function searchBot(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setLoadingOtherBots(true);
    const nick = event.target.value;
    try {
      setSearchText(nick);
      if (nick.length !== 0) {
        const bots = await botService.getBotsByNick(event.target.value);
        const botsWithPermission = bots?.map((team) => {
          const findMyTeam = teams?.filter(
            (myTeam) => myTeam.botId === team.botId
          );
          const havePermissions = !!findMyTeam?.length;
          console.log("findMyTeam", havePermissions);
          return { ...team, havePermissions };
        });
        console.log(botsWithPermission);
        setSearchedTeams(botsWithPermission || []);
      } else {
        setSearchedTeams([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOtherBots(false);
    }
  }

  const handleChangeValue =
    (prop: keyof IAddBot) => (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChangeError(prop, "");
      setBotToAdd({ ...botToAdd, [prop]: event.target.value });
    };

  const handleChangeError = (prop: keyof IAddBot, error: string) => {
    setBotToAddError({ ...botToAddError, [prop]: error });
  };

  function toggleAddBotModal() {
    addModal && clearAddBotForm();
    setAddModal(!addModal);
  }

  const hasEmptyData = (data: IAddBot) => {
    const empty = {
      name: !botToAdd.name.length,
      nick: !botToAdd.nick.length,
      description: !botToAdd.description.length,
    };

    return Object.values(empty).some((item) => item === true);
  };

  function clearAddBotForm() {
    setBotToAdd(voidAddBot);
  }

  async function addBot() {
    setAddLoading(true);
    if (hasEmptyData(botToAdd)) {
      const errorMessage = "Campo obrigatório";
      setBotToAddError({
        name: !botToAdd.name.length ? errorMessage : "",
        nick: !botToAdd.nick.length ? errorMessage : "",
        description: !botToAdd.description.length ? errorMessage : "",
      });
      return;
    }

    try {
      const newBot = await botService.addBot(botToAdd)!;
      const newTeams: ITeam[] = teams ? [...teams, newBot!] : [newBot!];
      updateTeams(newTeams);
      toggleAddBotModal();
      console.log(newBot);
    } catch (error) {
      console.log(error);
    } finally {
      setAddLoading(false);
    }
  }

  function configBot(team: ITeam) {
    selectBot(team.bot);
    navigate(`/${team.bot.nick}/config`);
  }

  function openChat(team: ITeam) {
    selectBot(team.bot);
    navigate(`/${team.bot.nick}/chat`);
  }

  return (
    <Container>
      <Box mt={4}>
        <Grid container justifyContent="center">
          <Grid item sm={10} xs={12}>
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
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", right: "5%" }}
          onClick={toggleAddBotModal}
        >
          <Add />
        </Fab>
        {searchText && (
          <>
            {!loadingOtherBots ? (
              <Grid
                container
                direction="row"
                spacing={2}
                marginTop={2}
                alignItems="stretch"
              >
                {searchedTeams.length > 0 ? (
                  searchedTeams?.map((team) => (
                    <Grid item sm={4} md={3} xs={12} key={team.bot.id}>
                      <CardBot
                        name={team.bot.name}
                        nick={team.bot.nick}
                        description={team.bot.description}
                        onConfig={() => configBot(team)}
                        onClick={() => openChat(team)}
                        enableConfig={team.havePermissions}
                      />
                    </Grid>
                  ))
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    mt={4}
                    width="100%"
                  >
                    <Typography gutterBottom variant="subtitle1" align="center">
                      Nenhum bot encontrado
                    </Typography>
                  </Box>
                )}
              </Grid>
            ) : (
              <Box display="flex" justifyContent="center" mt={8}>
                <CircularProgress color="secondary" />
              </Box>
            )}
          </>
        )}

        {!loadingMyBots ? (
          <>
            <Box mt={4}>
              <Typography variant="h4">Seus Bots</Typography>
            </Box>
            <Grid
              container
              direction="row"
              spacing={2}
              marginTop={2}
              alignItems="stretch"
            >
              {teams && teams.length > 0 ? (
                teams?.map((team) => (
                  <Grid item sm={4} md={3} xs={12} key={team.bot.id}>
                    <CardBot
                      name={team.bot.name}
                      nick={team.bot.nick}
                      description={team.bot.description}
                      onConfig={() => configBot(team)}
                      onClick={() => openChat(team)}
                      enableConfig={team.havePermissions}
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
          </>
        ) : (
          <Box display="flex" justifyContent="center" mt={16}>
            <CircularProgress color="secondary" />
          </Box>
        )}
      </Box>
      <Dialog open={addModal} onClose={toggleAddBotModal}>
        <Box p={4}>
          <Typography variant="h6">Dados do bot</Typography>
          <TextField
            id="name-input"
            label="Name"
            variant="standard"
            value={botToAdd.name}
            onChange={handleChangeValue("name")}
            error={!!botToAddError.name.length}
            helperText={botToAddError.name}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            id="nick-input"
            label="Nickname"
            variant="standard"
            value={botToAdd.nick}
            onChange={handleChangeValue("nick")}
            error={!!botToAddError.nick.length}
            helperText={botToAddError.nick}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            id="description-input"
            label="Description"
            variant="standard"
            value={botToAdd.description}
            onChange={handleChangeValue("description")}
            error={!!botToAddError.description.length}
            helperText={botToAddError.description}
            fullWidth
            multiline
            sx={{ marginTop: 2 }}
          />
          <Box mt={2} display="flex" justifyContent="center">
            <LoadingButton
              loading={addLoading}
              variant="contained"
              fullWidth
              onClick={addBot}
            >
              Adicionar
            </LoadingButton>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
}
