import React from "react";
import { AdminContext, adminContextType } from "../context/AdminContext";

type AdminProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const adminProvider = (props: AdminProviderProps) => {
  const { children } = props;

  const [admin, setadmin] = React.useState("");

  const setAdminName = (adminname: string) => setadmin(adminname);

  const [isLogged, setisLogged] = React.useState(false);

  const toggleIsLogged = () => setisLogged(!isLogged);

  const defaultValue: adminContextType = {
    admin,
    isLogged,
    setAdminName,
    toggleIsLogged,
  };

  return (
    <AdminContext.Provider value={defaultValue}>
      {children}
    </AdminContext.Provider>
  );
};

export default adminProvider;
