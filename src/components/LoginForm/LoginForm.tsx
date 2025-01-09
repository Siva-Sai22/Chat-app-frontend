"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import useUser from "@/hooks/use-user";
import styled from "styled-components";

function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();

  const { setUser } = useUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response?.status === 401) {
      alert("Invalid email or password");
      return;
    } else if (response?.status === 404) {
      alert("User not found");
      return;
    }

    const data = await response.json();
    if (response?.status === 200) {
      setUser(email, data.username, data.accessToken);
      router.push("/");
    }
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <InsideWrapper>
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                minLength={6}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </InputGroup>
            <Button type="submit">Login</Button>
            <Para>
              Don&apos;t have an account. <Link href="/signup">Sign Up</Link>
            </Para>
          </InsideWrapper>
        </Form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  height: 80%;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  min-height: 100%;
  display: grid;
  place-content: center;
  gap: 16px;
`;

const InsideWrapper = styled.div`
  display: grid;
  place-content: center;
  gap: 16px;
  background-color: white;
  border: 1px solid hsl(0 0 80%);
  padding: 48px 64px;
  padding-bottom: 32px;
  border-radius: 16px;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const Label = styled.label`
  width: 80px;
`;

const Input = styled.input`
  padding: 2px 8px;
  border-radius: 8px;
  border: 1px solid hsl(40 25% 70%);
`;

const Button = styled.button`
  color: white;
  background-color: hsl(212 44% 50%);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: hsl(212 44% 45%);
  }
`;

const Para = styled.p`
  text-align: center;
`;

export default LoginForm;
