import * as React from "react";
import { Box } from "@mui/material";
import { AnotherMessage } from "../AnotherMessage";
import { MyMessage } from "../MyMessage";
import { IMessageContainerProps } from "./component.props";

export function ContainerChat({ messages }: IMessageContainerProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box p={2} sx={{ overflow: "auto" }}>
      {messages ? (
        <>
          {messages.map((message, index) => (
            <Box key={index} mt={index ? 2 : index}>
              {message.isMyMessage ? (
                <MyMessage>{message.message}</MyMessage>
              ) : (
                <AnotherMessage>{message.message}</AnotherMessage>
              )}
            </Box>
          ))}
          <div ref={scrollRef} />
        </>
      ) : null}
    </Box>
  );
}
