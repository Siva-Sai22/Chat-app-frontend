"use client";
import * as React from "react";
import styled from "styled-components";
import { Search } from "react-feather";

import ChatBanner from "@/components/ChatBanner";
import AddChat from "../AddChat";
import { Contact } from "@/types";
import useUser from "@/hooks/use-user";

function ChatList({
  setSelectedChat,
  selectedChat,
}: {
  setSelectedChat: React.Dispatch<React.SetStateAction<Contact>>;
  selectedChat: Contact;
}) {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const { authToken } = useUser();

  function handleSelection(contact: Contact) {
    setSelectedChat(contact);
  }

  const fetchContacts = React.useCallback(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/user/contacts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      }
    );
    const contacts = await response.json();
    setContacts(contacts);
  }, [authToken]);

  React.useEffect(() => {
    if (!authToken) return;

    fetchContacts();
  }, [authToken, fetchContacts]);

  return (
    <Container selectedchat={selectedChat}>
      <SearchBar>
        <Input type="text" />
        <Button>
          <Search />
        </Button>
      </SearchBar>
      {contacts.map((contact: Contact) => (
        <ChatBanner
          key={contact.email}
          name={contact.name}
          lastMessage="Hello there!"
          onClick={() => handleSelection(contact)}
        />
      ))}
      <AddChat fetchContacts={fetchContacts} />
    </Container>
  );
}

const Container = styled.aside<{ selectedchat: Contact }>`
  max-width: 300px;
  width: 100%;
  height: 100%;
  padding: 8px 0px;
  border-right: 1px solid hsl(0 0 80%);

  @media (max-width: 480px) {
    max-width: 480px;
    display: ${({ selectedchat }) => (selectedchat.email === "" ? "revert" : "none")};
  }
`;

const SearchBar = styled.div`
  background-color: white;
  border-radius: 8px;
  margin: 0px 8px;
  display: flex;
  gap: 2px;
  align-items: center;
  border: 1px solid hsl(0 0 80%);
`;

const Input = styled.input`
  padding: 4px 8px;
  border: none;
  border-radius: 8px;
  flex: 1;

  &:focus {
    outline: hsl(0 0 40%) solid 1px;
  }
`;

const Button = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  color: hsl(0 0 60);

  &:hover {
    color: hsl(0 0 40);
  }
`;

export default ChatList;
