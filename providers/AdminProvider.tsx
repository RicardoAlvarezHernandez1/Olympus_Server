import React from "react";
import { AdminContext, adminContextType } from "../context/AdminContext";
import { UserInterface } from "../assets/interfaces/UserInterface";

type AdminProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const adminProvider = (props: AdminProviderProps) => {
  const { children } = props;

  const [admin, setadmin] = React.useState("");

  const [userId, setUserId] = React.useState(0);

  const setId = (id: number) => setUserId(id);
  const setAdminName = (adminname: string) => setadmin(adminname);

  const [isLogged, setisLogged] = React.useState(false);

  const toggleIsLogged = () => setisLogged(!isLogged);

  const defaultValue: adminContextType = {
    admin,
    isLogged,
    setAdminName,
    toggleIsLogged,
    userId,
    setId,
  };

  return (
    <AdminContext.Provider value={defaultValue}>
      {children}
    </AdminContext.Provider>
  );
};

export default adminProvider;
