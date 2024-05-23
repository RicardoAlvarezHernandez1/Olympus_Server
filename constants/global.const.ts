// Constant for IP address
export const IP_DIRECTION = "192.168.11.39";

// Constant for Olympus server background image
export const OLYMPUS_SERVER_BACKGROUND_IMAGE = require("../assets/images/Fondo_Olympus_Server.png");

// Regular expression for validating email format
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Function to validate email using the EMAIL_REGEX
export const validateEmail = (email: string) => {
  return email.match(EMAIL_REGEX) !== null;
};
