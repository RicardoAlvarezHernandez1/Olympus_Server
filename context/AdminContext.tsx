import React from "react";

// Define the type for AdminContext
type adminContextType = {
  isLogged: boolean; // Indicates if the user is logged in
  admin: string; // Name of the admin
  setAdminName: Function; // Function to set the admin's name
  toggleIsLogged: Function; // Function to toggle the logged-in state
  userId: number; // ID of the user
  setId: Function; // Function to set the user ID
};

// Create a context with default values as an empty object with type adminContextType
const AdminContext = React.createContext({} as adminContextType);

// Export the AdminContext and adminContextType
export { AdminContext, adminContextType };
