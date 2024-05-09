import React from "react";

type adminContextType = {
  isLogged: boolean;
  admin: string;
  setAdminName: Function;
  toggleIsLogged: Function;
};

const AdminContext = React.createContext({} as adminContextType);

export { AdminContext, adminContextType };
