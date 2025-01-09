"use client";
import * as React from "react";
import styled from "styled-components";

import { Contact } from "@/types";

function Chat({ selectedChat }: { selectedChat: Contact }) {
  if (selectedChat.email === "") {
    return (
      <NoMessageWrapper>Select a chat to start messaging</NoMessageWrapper>
    );
  }
  return (
    <Wrapper>
      <TopBar>{selectedChat.name}</TopBar>
      <MessageArea />
      <MessageBox placeholder="Write a message..." />
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

const MessageBox = styled.input`
  height: 45px;
  padding: 8px 16px;
  border: none;
  border-top: 1px solid hsl(0 0 80%);
  font-size: 1.1rem;

  &:focus {
    outline: hsl(0 0 40%) solid 1px;
  }
`;

export default Chat;
