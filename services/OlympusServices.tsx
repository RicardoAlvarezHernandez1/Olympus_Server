import { IpDirection } from "./IpDirection";

const REGISTRATION_API_URL = `http://${IpDirection()}:8888/olympus/v1`;
const REGISTRATION_PATH = "/admin";

export const registerAdmin = async (
  adminName: string,
  adminEmail: string,
  adminPassword: string
): Promise<number> => {
  const response = await fetch(`${REGISTRATION_API_URL}${REGISTRATION_PATH}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${adminName}`,
      email: `${adminEmail}`,
      password: `${adminPassword}`,
    }),
  });

  return response.status;
};
