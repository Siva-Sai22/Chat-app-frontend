"use client";
import * as React from "react";
import { User } from "react-feather";
import styled from "styled-components";

type ChatBannerProps = {
  name: string;
  lastMessage: string;
  onClick: () => void;
}

function ChatBanner({name, lastMessage, onClick}: ChatBannerProps) {
  return (
    <Wrapper onClick={onClick}>
      <PhotoWrapper>
        <User size={30} />
      </PhotoWrapper>
      <MessageWrapper>
        <Name>{name}</Name>
        <LastMessage>{lastMessage}</LastMessage>
      </MessageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  background-color: white;
  width: calc(100% - 16px);
  text-align: left;
  margin: 8px;
  padding: 8px 12px;
  height: 65px;
  border-radius: 8px;
  border: 1px solid hsl(0 0 80%);
  display: flex;
  cursor: pointer;
`;

const PhotoWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: hsl(0 0 85%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Name = styled.span`
  font-size: 1.25rem;
`;

const LastMessage = styled.span`
  font-size: 1rem;
  color: hsl(0 0 60%);
  line-height: 0.5;
`;

export default ChatBanner;
