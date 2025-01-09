"use client";
import * as React from "react";

type UserContextType = {
  username: string;
  userEmail: string;
  authToken: string;
  setUser: (email: string, username: string, authToken: string) => void;
  logoutUser: () => void;
};

export const UserContext = React.createContext<UserContextType>({
  username: "",
  userEmail: "",
  authToken: "",
  setUser: () => {},
  logoutUser: () => {},
});

function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [authToken, setAuthToken] = React.useState("");

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { email, username } = JSON.parse(user);
      setUserEmail(email);
      setUsername(username);
    }
  }, []);

  function setUser(email: string, username: string, authToken: string) {
    setUserEmail(email);
    setUsername(username);
    setAuthToken(authToken);
    localStorage.setItem("user", JSON.stringify({ email, username }));
  }

  function logoutUser() {
    setUserEmail("");
    setUsername("");
    setAuthToken("");
    localStorage.removeItem("user");
  }

  const value = React.useMemo(
    () => ({ username, userEmail, authToken, setUser, logoutUser }),
    [username, userEmail, authToken]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
