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
  Card,
  Tabs,
  Tab,
  TextField,
  IconButton,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { CardChat, HeaderChat, ContainerChat } from "../../components";
import { ChatService, IChat } from "../../services";
import { ITeam } from "./page.props";
import { useParams, useSearchParams } from "react-router-dom";
import { IParams } from "./page.props";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../../hooks/auth";
import { useBotSelected } from "../../hooks/botSelected";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  const { authData } = useAuth();
  const { bot } = useBotSelected();
  console.log(bot);

  const { nick } = useParams<keyof IParams>();

  const chatService = React.useMemo(() => new ChatService(), []);

  const [loading, setLoading] = React.useState(true);
  const [sendingMessage, setSendingMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [title, setTitle] = React.useState(bot.nick);
  const [chats, setChats] = React.useState<IChat[]>();
  const [loadingChats, setLoadingChats] = React.useState(true);

  const [value, setValue] = React.useState(0);

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    chats && setTitle(chats[newValue].bot.nick);
  };

  function sendMessage() {
    setSendingMessage(true);
    setMessage("");
  }

  const loadChats = React.useCallback(async () => {
    setLoadingChats(true);
    if (bot.nick !== nick) {
      return navigate("/");
    }
    let chatsResponse: IChat[] | undefined;
    try {
      chatsResponse = await chatService.getChats();
      console.log("response", chatsResponse);
      const findThisChat = chatsResponse?.filter(
        (chat) => chat.bot.nick === nick
      );
      if (findThisChat?.length === 0) {
        const chat = await chatService.addChat(bot.id);
        chat && chatsResponse?.push(chat);
      }
      setChats(chatsResponse || []);
      const index = chatsResponse?.findIndex((item) => item.bot.nick === nick);
      setValue(index || 1);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingChats(false);
    }
  }, [chatService, nick, bot, navigate]);

  React.useEffect(() => {
    loadChats();
  }, [loadChats]);

  return (
    <Container
      sx={{
        paddingY: 4,
        height: "100vh",
        alignItems: "stretch",
        display: "flex",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          flexGrow: 1,
        }}
      >
        <HeaderChat nick={title} />
        {loadingChats ? (
          <Box display="flex" justifyContent="center" mt={8}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Grid
            container
            direction="row"
            sx={{
              flexGrow: 1,
              height: "90%",
            }}
          >
            <Grid item sm={3} sx={{ display: "flex", maxHeight: "100%" }}>
              <Tabs
                orientation="vertical"
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="Chats"
                sx={{ flexGrow: 1 }}
              >
                {chats?.map((chat, index) => (
                  <Tab
                    label={chat.bot.nick}
                    {...a11yProps(index)}
                    key={chat.id}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid
              item
              sm={9}
              sx={{ alignItems: "stretch", display: "flex", maxHeight: "100%" }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                sx={{
                  borderLeft: "solid 1px",
                  borderColor: "divider",
                }}
              >
                {value !== -1 && (
                  <>
                    <ContainerChat />
                    <Box
                      p={2}
                      display="flex"
                      borderTop="solid 1px"
                      borderColor="divider"
                    >
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Mensagem"
                        value={message}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setMessage(e.target.value)
                        }
                      />
                      <IconButton
                        aria-label="send"
                        size="large"
                        color="primary"
                        onClick={sendMessage}
                        disabled={sendingMessage}
                      >
                        {sendingMessage ? (
                          <CircularProgress color="inherit" size={28} />
                        ) : (
                          <SendIcon fontSize="inherit" />
                        )}
                      </IconButton>
                    </Box>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
}
