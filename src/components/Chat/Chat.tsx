"use client";
import * as React from "react";
import styled from "styled-components";
import { Send } from "react-feather";

import { Contact } from "@/types";

function Chat({ selectedChat }: { selectedChat: Contact }) {
  const [messageContent, setMessageContent] = React.useState("");

  function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    if (messageContent === "") {
      return;
    }
    console.log(`Sending message: ${messageContent}`);
    setMessageContent("");
  }

  if (selectedChat.email === "") {
    return (
      <NoMessageWrapper>Select a chat to start messaging</NoMessageWrapper>
    );
  }
  return (
    <Wrapper>
      <TopBar>{selectedChat.name}</TopBar>
      <MessageArea />
      <form onSubmit={sendMessage}>
        <MessageBox>
          <Input
            type="text"
            placeholder="Write a message..."
            value={messageContent}
            onChange={(event) => setMessageContent(event.target.value)}
          />
          <Button type="submit">
            <Send size={20} />
          </Button>
        </MessageBox>
      </form>
    </Wrapper>
  );
}

const NoMessageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  height: 45px;
  border-bottom: 1px solid hsl(0 0 80%);
  padding: 8px 16px;
  font-size: 1.25rem;
`;

const MessageArea = styled.div`
  flex: 1;
`;

const MessageBox = styled.div`
  height: 45px;
  border-top: 1px solid hsl(0 0 80%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 16px;
`;

const Input = styled.input`
  height: 43px;
  border: none;
  font-size: 1.1rem;
  padding: 8px 16px;
  margin-right: 12px;
  flex: 1;

  &:focus {
    outline: hsl(0 0 40%) solid 1px;
  }
`;

const Button = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
`

export default Chat;
