import React from "react";
import { AdminContext, adminContextType } from "../context/AdminContext";
import { UserInterface } from "../assets/interfaces/UserInterface";

type AdminProviderProps = {
  children: JSX.Element | JSX.Element[];
};

// AdminProvider component definition
const AdminProvider = (props: AdminProviderProps) => {
  const { children } = props;

  // State for admin name
  const [admin, setadmin] = React.useState("");

  // State for user ID
  const [userId, setUserId] = React.useState(0);

  // Function to set the user ID
  const setId = (id: number) => setUserId(id);
  // Function to set the admin name
  const setAdminName = (adminname: string) => setadmin(adminname);

  // State to check if the user is logged in
  const [isLogged, setisLogged] = React.useState(false);

  // Function to toggle the logged-in state
  const toggleIsLogged = () => setisLogged(!isLogged);

  // Default values for AdminContext
  const defaultValue: adminContextType = {
    admin,
    isLogged,
    setAdminName,
    toggleIsLogged,
    userId,
    setId,
  };

  // Return the provider with the default values
  return (
    <AdminContext.Provider value={defaultValue}>
      {children}
    </AdminContext.Provider>
  );
};

// Export the AdminProvider component
export default AdminProvider;
