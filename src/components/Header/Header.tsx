"use client";
import * as React from "react";
import Link from "next/link";
import styled from "styled-components";

import useUser from "@/hooks/use-user";

function Header() {
  const { userEmail, logoutUser } = useUser();

  function logout() {
    if (userEmail !== "") {
      logoutUser();
    }
  }

  return (
    <Wrapper>
      <Title href="/">Chat App</Title>
      <Button onClick={logout} href={userEmail === "" ? "/" : "/login"}>
        {userEmail !== "" ? "Logout" : "Login"}
      </Button>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid hsl(0 0 80%);
`;

export const Title = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 2rem;
  margin-right: auto;
  margin-left: 16px;
`;

export const Button = styled(Link)`
  color: white;
  text-decoration: none;
  background-color: hsl(219 84 60);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: hsl(219 84 50);
  }
`;

export default Header;
