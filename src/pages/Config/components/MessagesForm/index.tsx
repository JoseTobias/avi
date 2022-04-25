import * as React from "react";
import { Typography, Box, TextField } from "@mui/material";
import { MessageFormProps, ChangeType } from "./component.props";
import { LoadingButton } from "../../../../components";

export function MessagesForm({
  message,
  response,
  changeText,
  onSubmit,
  loading,
}: MessageFormProps) {
  const handleChangeValue =
    (prop: ChangeType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      changeText(event.target.value, prop);
    };

  return (
    <Box>
      <Typography variant="body1">
        Adicione mensagens para que o bot saiba como responder
      </Typography>
      <Box mt={1}>
        <TextField
          id="message-input"
          label="Mensagem"
          variant="standard"
          fullWidth
          multiline
          value={message}
          onChange={handleChangeValue("message")}
        />
      </Box>
      <Box mt={1}>
        <TextField
          id="response-input"
          label="Resposta"
          variant="standard"
          fullWidth
          multiline
          value={response}
          onChange={handleChangeValue("response")}
        />
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={onSubmit}
          fullWidth
        >
          Adicionar
        </LoadingButton>
      </Box>
    </Box>
  );
}
