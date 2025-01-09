"use client";
import React from "react";
import styled from "styled-components";

import ChatList from "@/components/ChatList";
import Chat from "@/components/Chat";
import LoginForm from "@/components/LoginForm";
import useUser from "@/hooks/use-user";

export default function Home() {
  const [selectedChat, setSelectedChat] = React.useState({
    email: "",
    name: "",
  });

  const { userEmail } = useUser();
  if (userEmail === "") {
    return <LoginForm />;
  }

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
