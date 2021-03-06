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
  Tabs,
  Tab,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { CardBot, LoadingButton } from "../../components";
import { ConfigService } from "../../services";
import { ITeam } from "./page.props";
import { useParams, useSearchParams } from "react-router-dom";
import { IParams, RenderOption, MessageDataState } from "./page.props";
import { MessagesForm, FormDate } from "./components";
import { useAlert } from "../../hooks/alert";
import { useBotSelected } from "../../hooks/botSelected";
import { useNavigate } from "react-router-dom";

const voidMessageData = {
  message: "",
  response: "",
};

export default function Config() {
  const { bot } = useBotSelected();
  const { setFeedback } = useAlert();
  const { nick } = useParams<keyof IParams>();
  const navigate = useNavigate();
  const configService = React.useMemo(() => new ConfigService(), []);

  const [value, setValue] = React.useState<RenderOption>(0);
  const [loadingEntity, setLoadingEntity] = React.useState(false);
  const [loadingActivity, setLoadingActivity] = React.useState(false);
  const [messageData, setMessageData] =
    React.useState<MessageDataState>(voidMessageData);

  function changeMessage(value: string, type: keyof MessageDataState) {
    setMessageData({ ...messageData, [type]: value });
  }

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: RenderOption
  ) => {
    setValue(newValue);
  };

  async function sendMessageConfig() {
    setLoadingEntity(true);
    const empty = {
      message: !messageData.message.length,
      response: !messageData.response.length,
    };
    if (empty.message || empty.response) {
      setFeedback({
        type: "error",
        message: "Os campos de Mensagem e Resposta s??o obrigat??rios",
      });
      setLoadingEntity(false);
      return;
    }
    try {
      await configService.sendEntity({
        input: messageData.message,
        output: messageData.response,
        botId: bot.id,
      });

      setFeedback({
        type: "success",
        message: "Resposta cadastrada com sucesso",
      });
      setMessageData(voidMessageData);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error,
      });
    } finally {
      setLoadingEntity(false);
    }
  }

  async function scheduleTrainer(date: string) {
    setLoadingActivity(true);
    try {
      const response = await configService.sendActivity({
        scheduledAt: date,
        botId: bot.id,
      });
      setFeedback({
        type: "success",
        message: "Treino cadastrado com sucesso",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error,
      });
    } finally {
      setLoadingActivity(false);
    }
  }

  React.useEffect(() => {
    if (bot.nick.length === 0) {
      return navigate("/");
    }
  }, [bot, navigate]);

  function renderConfigOption(item: RenderOption) {
    const options = {
      0: (
        <MessagesForm
          message={messageData.message}
          response={messageData.response}
          changeText={changeMessage}
          onSubmit={sendMessageConfig}
          loading={loadingEntity}
        />
      ),
      1: (
        <Box>
          <FormDate onSubmit={scheduleTrainer} loading={loadingActivity} />
        </Box>
      ),
      2: (
        <Box>
          <Typography variant="body1">
            Configure as permiss??es dos respons??veis por manter os bots
          </Typography>
        </Box>
      ),
    };
    return options[item];
  }

  return (
    <Container>
      <Box mt={4}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            flexGrow: 1,
          }}
        >
          <Box
            px={2}
            py={1}
            mb={1}
            // sx={{
            //   borderBottom: "solid 1px",
            //   borderColor: "divider",
            // }}
          >
            <Typography variant="h4">Configura????o do bot {nick}</Typography>
          </Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Mensagens" {...a11yProps(0)} />
            <Tab label="Treino" {...a11yProps(1)} />
            <Tab label="Time" {...a11yProps(2)} />
          </Tabs>
          <Box p={2}>{renderConfigOption(value)}</Box>
        </Paper>
      </Box>
    </Container>
  );
}
