"use client";
import * as React from "react";
import styled from "styled-components";
import { Search } from "react-feather";

import ChatBanner from "@/components/ChatBanner";
import AddChat from "../AddChat";
import { UserContext } from "../UserProvider";
import { Contact } from "@/types";

function ChatList({
  setSelectedChat,
}: {
  setSelectedChat: React.Dispatch<React.SetStateAction<Contact>>;
}) {
  const [contacts, setContacts] = React.useState([]);
  const context = React.useContext(UserContext);
  const userEmail = context?.userEmail;

  function handleSelection(contact: Contact) {
    setSelectedChat(contact);
  }

  React.useEffect(() => {
    if (!userEmail) return;

    async function fetchContacts(email: string) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/user/contacts/${email}`
      );
      const contacts = await response.json();
      setContacts(contacts);
    }
    fetchContacts(userEmail);
  }, [userEmail]);

  return (
    <Container>
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
      <AddChat />
    </Container>
  );
}

const Container = styled.aside`
  max-width: 300px;
  width: 100%;
  height: 100%;
  padding: 8px 0px;
  border-right: 1px solid hsl(0 0 80%);
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
