import { Float } from "react-native/Libraries/Types/CodegenTypes";

// Interface for User
export interface UserInterface {
  userId: number; // ID of the user
  userName: string; // Name of the user
  userMail: string; // Email of the user
  userPassword: string; // Password of the user
  userWeight: Float; // Weight of the user
  userHeight: Float; // Height of the user
}
