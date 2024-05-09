import { IpDirection } from "./IpDirection";

const API_URL = `http://192.168.1.33:8081/olympus/v1`;
const REGISTRATION_PATH = "/admin";

export const registerAdmin = async (
  adminName: string,
  adminMail: string,
  adminPassword: string
): Promise<number> => {
  const response = await fetch(`${API_URL}${REGISTRATION_PATH}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      adminName: `${adminName}`,
      adminMail: `${adminMail}`,
      adminPassword: `${adminPassword}`,
    }),
  });

  return response.status;
};

export const loginAdmin = async (adminName: string): Promise<Response> => {
  const response = await fetch(`${API_URL}/admins/${adminName.trim()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response;
};
