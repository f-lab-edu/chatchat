import styled from "@emotion/styled";
import React, { KeyboardEvent, useCallback, useRef, useState } from "react";

type UserType = "USER" | "SYSTEM";

interface Message {
  type: UserType;
  message: string;
}

const ChatContainer = styled.div({
  display: "flex",
  backgroundColor: "#fff",
  alignContent: "flex-start",
  flexDirection: "column",
  width: 940,
  height: 600,
  borderRadius: 10,
  border: "1px solid #e1e1e1",
  boxShadow: "0 8px 16px rgba(0, 0, 0, .125)",
  overflow: "hidden",
  boxSizing: "border-box",
});

interface ChatItemStyleProps {
  type: UserType;
}

const ChatItem = styled.div<ChatItemStyleProps>(({ type }) => ({
  display: "flex",
  columnGap: 40,
  padding: "14px 20px",
  flexDirection: type === "SYSTEM" ? "row-reverse" : "row",
  cursor: "pointer",
  transition: "background-color .3s ease",
}));

const ChatType = styled.span({
  color: "#333",
  fontWeight: 900,
});

interface ChatMessageStyleProps {
  type: UserType;
}

const ChatMessage = styled.span<ChatMessageStyleProps>(({ type }) => ({
  position: "relative",
  backgroundColor: type === "SYSTEM" ? "#e1fff0" : "#e1f0ff",
  padding: 20,
  borderRadius: 10,
  "&:before": {
    content: "''",
    position: "absolute",
    height: 24,
    width: 20,
    backgroundColor: type === "SYSTEM" ? "#e1fff0" : "#e1f0ff",
    top: "20%",
    ...(type === "SYSTEM" ? { right: -10 } : { left: -10 }),
    borderRadius: type === "SYSTEM" ? "0 100% 0 0" : "0 0 100% 0",
    transform: "rotate(90deg)",
  },
}));

const ChatInner = styled.div({
  flex: 1,
  padding: "30px 20px",
  overflowY: "auto",
});

const ChatInput = styled.input({
  display: "block",
  backgroundColor: "#fafafa",
  width: "100%",
  padding: "14px 20px",
  fontSize: 15,
  outline: "none",
  border: 0,
  borderTop: "1px solid #e1e1e1",
  boxSizing: "border-box",
});

const Chat: React.FC = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setMessages([
          ...messages,
          {
            type: "USER",
            message: inputRef?.current?.value ?? "",
          },
        ]);
        setTimeout(() => {
          chatRef?.current?.scrollTo(0, chatRef?.current?.scrollHeight);
        }, 0);
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "SYSTEM",
              message: "Hi USER",
            },
          ]);
          setTimeout(() => {
            chatRef?.current?.scrollTo(0, chatRef?.current?.scrollHeight);
          }, 0);
        }, 300);
        if (inputRef?.current?.value) inputRef.current.value = "";
      }
    },
    [messages]
  );

  return (
    <ChatContainer>
      <ChatInner ref={chatRef}>
        {messages.map(({ type, message }, i) => (
          <ChatItem key={i} type={type}>
            <ChatType>{type}</ChatType>
            <ChatMessage type={type}>{message}</ChatMessage>
          </ChatItem>
        ))}
      </ChatInner>
      <ChatInput ref={inputRef} type="text" onKeyDown={handleKeyDown} />
    </ChatContainer>
  );
};

export default Chat;
