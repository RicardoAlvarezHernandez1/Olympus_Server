import React from "react";

type userContextType = {
  isLogged: boolean;
  admin: string;
  setAdminName: Function;
  toggleIsLogged: Function;
  userId: number;
  setId: Function;
};

const UserContext = React.createContext({} as userContextType);

export { UserContext, userContextType };
