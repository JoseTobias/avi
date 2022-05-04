import React from "react";
import TimeKeeper, { TimeOutput } from "react-timekeeper";

import DatePicker from "sassy-datepicker";
import { Box, Dialog, Backdrop, CircularProgress } from "@mui/material";
import { IDataFormProps } from "./component.props";

export function FormDate({ onSubmit, loading = false }: IDataFormProps) {
  const [time, setTime] = React.useState("12:34");
  const [date, setDate] = React.useState(new Date());
  const [showTime, setShowTime] = React.useState(false);
  const [formattedTime, setFormattedTime] = React.useState("");

  const onChangeDay = (date: Date) => {
    setDate(date);
    setShowTime(true);
  };

  const onChangeTime = async (newTime: TimeOutput) => {
    setTime(newTime.formatted24);
    const timeArray = newTime.formatted24.split(":");
    const hour = Number(timeArray[0]) < 10 ? `0${timeArray[0]}` : timeArray[0];

    const dateArray = date.toISOString().split("T");
    const hourArray = dateArray[1].split(":");
    const formattedHour = `${dateArray[0]}T${hour}:${timeArray[1]}:${hourArray[2]}`;
    setFormattedTime(formattedHour);
  };

  const submit = () => {
    if (formattedTime.length > 0) {
      onSubmit(formattedTime);
      setShowTime(false);
      setFormattedTime("");
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={showTime} onClose={() => setShowTime(false)}>
        <TimeKeeper
          time={time}
          onChange={onChangeTime}
          onDoneClick={submit}
          hour24Mode
          switchToMinuteOnHourSelect
        />
      </Dialog>
      <Box>
        <DatePicker onChange={onChangeDay} />
      </Box>
    </Box>
  );
}
