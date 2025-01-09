"use client";
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "react-feather";
import styled from "styled-components";

import { UserContext } from "../UserProvider";
import VisuallyHidden from "../VisuallyHidden";

function AddChat() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const context = React.useContext(UserContext);
  const userEmail = context?.userEmail;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/user/contacts/${userEmail}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contactEmail: email }),
      }
    );
    if (response.status === 404) {
      alert("User not found");
      return;
    }

    setEmail("");
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <PlusButton>
          <Plus size={30} />
        </PlusButton>
      </Dialog.Trigger>
      <Content>
        <HeaderGroup>
          <Title>Add a new chat</Title>
          <Dialog.Description>
            <VisuallyHidden>
              {" "}
              Enter the email address of the user you want to chat with.
            </VisuallyHidden>
          </Dialog.Description>
          <CloseButton>
            <X size={20} />
          </CloseButton>
        </HeaderGroup>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </InputGroup>
          <Button type="submit">Add</Button>
        </Form>
      </Content>
    </Dialog.Root>
  );
}

const PlusButton = styled.button`
  background-color: white;
  border: 1px solid hsl(0 0 80%);
  border-radius: 50%;
  height: 43px;
  cursor: pointer;

  position: absolute;
  left: 230px;
  bottom: 25px;
`;

const Content = styled(Dialog.Content)`
  background-color: hsl(0 0 90);
  padding: 8px 16px;
  border-radius: 8px;
  position: fixed;
  bottom: 75px;
  left: 90px;
`;

const HeaderGroup = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const Title = styled(Dialog.Title)`
  font-size: 1.25em;
  margin-right: auto;
  font-weight: normal;
`;

const CloseButton = styled(Dialog.Close)`
  border: none;
  border-radius: 50%;
`;

const Form = styled.form`
  width: 100%;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const Label = styled.label`
  width: 50px;
`;

const Input = styled.input`
  padding: 2px 8px;
  border-radius: 8px;
  border: 1px solid hsl(40 25% 70%);
`;

const Button = styled.button`
  color: white;
  background-color: hsl(246 50% 65%);
  border: none;
  padding: 4px 8px;
  margin-top: 8px;
  margin-left: 225px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: hsl(246 50% 60%);
  }
`;

export default AddChat;
