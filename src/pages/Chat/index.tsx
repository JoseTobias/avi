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
import { useChatMessage } from "../../hooks/chatMessage";
import { useNavigate } from "react-router-dom";
import { useTeams } from "../../hooks/teams";
import { useBotSelected } from "../../hooks/botSelected";

export default function Chat() {
  const { teams } = useTeams();
  const navigate = useNavigate();
  const { authData } = useAuth();
  const { bot, selectBot } = useBotSelected();
  const { addChat, messages, overwriteChat } = useChatMessage();

  const { nick } = useParams<keyof IParams>();

  const chatService = React.useMemo(() => new ChatService(), []);

  const [sendingMessage, setSendingMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [title, setTitle] = React.useState(bot.nick);
  const [chats, setChats] = React.useState<IChat[]>();
  const [loadingChats, setLoadingChats] = React.useState(true);
  const [loadingMessages, setLoadingMessages] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const chatId = React.useMemo(() => {
    return chats ? chats[value].id : "";
  }, [value, chats]);

  const botChatIsMine = React.useMemo(() => {
    const find = teams?.filter((team) => team.bot.nick === title);
    return find && find.length > 0;
  }, [title, teams]);

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

  function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  async function sendMessage() {
    setSendingMessage(true);
    setMessage("");

    try {
      await chatService.sendMessage({ chatId, data: message });
      if(chats) {
        const response = await chatService.getMessages({
          userId: authData.id,
          chatId: chats[value].id,
        });
        overwriteChat(response || [], chatId);

      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setSendingMessage(false);
    }
  }

  const loadChats = React.useCallback(async () => {
    setLoadingChats(true);
    if (bot.nick !== nick || bot.nick.length === 0) {
      return navigate("/");
    }
    let chatsResponse: IChat[] | undefined;
    try {
      chatsResponse = await chatService.getChats();
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

  const loadMessages = React.useCallback(async () => {
    setLoadingMessages(true);
    try {
      const hasMessages = messages && !!messages[chatId];
      if (chats && !hasMessages) {
        const response = await chatService.getMessages({
          userId: authData.id,
          chatId: chats[value].id,
        });
        addChat(response || [], chatId);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingMessages(false);
    }
  }, [chatService, value, chats, authData, addChat, chatId, messages]);

  React.useEffect(() => {
    loadChats();
  }, [loadChats]);

  React.useEffect(() => {
    loadMessages();
  }, [loadMessages, value]);

  function onConfig() {
    const find = teams?.filter((team) => team.bot.nick === title);
    if (find && find.length > 0) {
      const botSelected = find[0].bot;
      selectBot(botSelected);
      navigate(`/${botSelected.nick}/config`);
    }
  }

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
        <HeaderChat
          nick={title}
          onConfig={onConfig}
          enableConfig={botChatIsMine}
        />
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
                  flexGrow: 1,
                }}
              >
                {!loadingMessages ? (
                  <>
                    <ContainerChat
                      messages={messages ? messages[chatId] : undefined}
                    />
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
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    height="100%"
                    alignItems="center"
                  >
                    <CircularProgress color="primary" size={28} />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
}
