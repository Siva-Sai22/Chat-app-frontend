"use client"
import * as React from "react";
import styled from "styled-components";

import { Message as MessageType } from "@/types";
import useUser from "@/hooks/use-user";

function Message({ message }: { message: MessageType }) {
  const { userEmail } = useUser();
  if(message.sender === userEmail) {
    return <RightMessage>{message.message}</RightMessage>;
  }

  return <LeftMessage>{message.message}</LeftMessage>;
}

const MessageBase = styled.p`
  padding: 6px 10px;
  border-radius: 10px;
  margin: 0px 16px;
  margin-bottom: 8px;
  max-width: 60%;
  word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  &:last-child {
    margin-top: 8px;
  }
`;

const RightMessage = styled(MessageBase)`
  background-color: #06f63e;
  color: white;
  align-self: flex-end;
`;

const LeftMessage = styled(MessageBase)`
  background-color: #098cf1;
  color: white;
  align-self: flex-start;
`;

export default Message;
