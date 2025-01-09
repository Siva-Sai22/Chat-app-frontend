"use client";
import React from "react";
import styled from "styled-components";

import ChatList from "@/components/ChatList";
import Chat from "@/components/Chat";

export default function Home() {
  const [selectedChat, setSelectedChat] = React.useState({email: "", name: ""});

  return (
    <Wrapper>
      <ChatList setSelectedChat={setSelectedChat} />
      <Chat selectedChat={selectedChat} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 90%;
  display: flex;
`;
