import React from "react";
import TimeKeeper from "react-timekeeper";

export function FormDate() {
  const [time, setTime] = React.useState("12:34pm");
  const [showTime, setShowTime] = React.useState(true);

  return (
    <div>
      {showTime && (
        <TimeKeeper
          time={time}
          onChange={(newTime) => setTime(newTime.formatted12)}
          onDoneClick={() => setShowTime(false)}
          hour24Mode
          switchToMinuteOnHourSelect
        />
      )}
      <span>Time is {time}</span>
      {!showTime && <button onClick={() => setShowTime(true)}>Show</button>}
    </div>
  );
}
