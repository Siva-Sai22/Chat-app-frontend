"use client"
import * as React from "react";
import styled from "styled-components";
import {format, isToday} from "date-fns";

import { Message as MessageType } from "@/types";
import useUser from "@/hooks/use-user";

function Message({ message }: { message: MessageType }) {
  const { userEmail } = useUser();

  const formatMessageTime = (date:Date) => {
    if (isToday(date)) {
      return format(date, "HH:mm");
    }
    return format(date, "dd MMM, HH:mm");
  }

  if (message.sender === userEmail) {
    return (
      <MessageContainer align="flex-end">
        <RightMessage>{message.message}</RightMessage>
        <TimeStamp align="right">
          {formatMessageTime(message.timestamp)}
        </TimeStamp>
      </MessageContainer>
    );
  }

  return (
    <MessageContainer align="flex-start">
      <LeftMessage>{message.message}</LeftMessage>
      <TimeStamp align="left">{formatMessageTime(message.timestamp)}</TimeStamp>
    </MessageContainer>
  );
}

const MessageContainer = styled.div<{ align: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
`;

const MessageBase = styled.p`
  padding: 6px 10px;
  border-radius: 10px;
  margin: 0px 16px;
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

const TimeStamp = styled.span<{ align: string }>`
  font-size: 0.75rem;
  color: #666;
  margin: 0px 20px;
  margin-bottom: 8px;
  text-align: ${(props) => props.align};
`;

export default Message;
