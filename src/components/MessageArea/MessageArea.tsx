"use client";
import * as React from "react";
import styled from "styled-components";

import useUser from "@/hooks/use-user";
import LoadingSpinner from "../LoadingSpinner";
import Message from "../Message";
import { Message as MessageType, Contact } from "@/types";

function MessageArea({
  selectedChat,
  messages,
  setMessages,
}: {
  selectedChat: Contact;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}) {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const messageAreaRef = React.useRef<HTMLDivElement>(null);

  const authToken = useUser().authToken;

  const loadMessages = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    console.log("loading messages");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/message/${selectedChat.email}?page=${page}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      const newMessages = await response.json();

      if (newMessages.length > 0) {
        setMessages((prev) => [...prev, ...newMessages]);
        setPage((p) => p + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    async function loadInitialMessages() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/message/${selectedChat.email}?page=${page}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      const messages = await response.json();

      setMessages(messages);
      setPage(1);
      setHasMore(messages.length > 0);
    }

    loadInitialMessages();

    return () => {
      setMessages([]);
      setPage(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    const element = messageAreaRef.current;
    if (!element) return;

    if (element.scrollTop < -100 * page) {
      loadMessages();
    }
  };

  return (
    <Wrapper ref={messageAreaRef} onScroll={handleScroll}>
      {loading && <Loading loading={loading} />}
      {messages.map((message) => (
        <Message key={crypto.randomUUID()} message={message} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
`;

const Loading = styled(LoadingSpinner)`
  height: 50px;
`;

export default MessageArea;
