import { AchievementInterface } from "../assets/interfaces/AchievementInterface";
import { UserInterface } from "../assets/interfaces/UserInterface";
import { IP_DIRECTION } from "../constants/global.const";

const API_URL = `http://${IP_DIRECTION}:8082/olympus/v1`;

export const registerAdmin = async (
  adminName: string,
  adminMail: string,
  adminPassword: string
): Promise<number> => {
  const response = await fetch(`${API_URL}/admin`, {
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

export const loginAdmin = async (
  adminMail: string,
  adminPassword: string
): Promise<Response> => {
  const response = await fetch(`${API_URL}/admins/verifyAdmin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      adminMail: adminMail,
      adminPassword: adminPassword,
    }),
  });

  return response;
};

export const getUsers = async (): Promise<UserInterface[]> => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error getting users");
    }

    const users: UserInterface[] = await response.json();
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
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

export const addAchievementToUser = async (
  userId: number,
  achievementId: number
): Promise<number> => {
  const response = await fetch(
    `${API_URL}/achievements/${achievementId}/users/${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.status;
};

export const getAllAchievementsList = async (): Promise<
  AchievementInterface[]
> => {
  try {
    const response = await fetch(`${API_URL}/achievements`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error on get all achievements request");
    }

    const achievements: AchievementInterface[] = await response.json();
    return achievements;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
