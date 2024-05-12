import { UserInterface } from "../assets/interfaces/UserInterface";
import { IpDirection } from "./IpDirection";

const API_URL = `http://${IpDirection()}:8082/olympus/v1`;
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

export const getUsers = async (): Promise<UserInterface[]> => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener usuarios");
    }

    const users: UserInterface[] = await response.json();
    return users;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const deleteUser = async (userId: number): Promise<number> => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.status;
};

export const updateUser = async (
  id: number,
  name: string,
  mail: string,
  password: string,
  height: number,
  weight: number
): Promise<number> => {
  console.log("Log desde el servicio : ", id);

  const response = await fetch(`${API_URL}/user/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: `${name}`,
      userMail: `${mail}`,
      userPassword: `${password}`,
      userHeight: height,
      userWeight: weight,
    }),
  });

  return response.status;
};
