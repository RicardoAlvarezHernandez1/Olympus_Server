import { AchievementInterface } from "../assets/interfaces/AchievementInterface";
import { UserInterface } from "../assets/interfaces/UserInterface";
import { IP_DIRECTION } from "../constants/global.const";

// Defining the base URL for the API
const API_URL = `http://${IP_DIRECTION}:8082/olympus/v1`;

/**
 * Register a new admin.
 * @param adminName - Name of the admin.
 * @param adminMail - Email of the admin.
 * @param adminPassword - Password of the admin.
 * @returns The HTTP status code of the response.
 */
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

/**
 * Log in an admin.
 * @param adminMail - Email of the admin.
 * @param adminPassword - Password of the admin.
 * @returns The Response object from the fetch request.
 */
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

/**
 * Get a list of all users.
 * @returns An array of UserInterface objects.
 */
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

/**
 * Delete a user by their ID.
 * @param userId - The ID of the user to delete.
 * @returns The HTTP status code of the response.
 */
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

/**
 * Update a user's details.
 * @param id - The ID of the user.
 * @param name - The updated name of the user.
 * @param mail - The updated email of the user.
 * @param password - The updated password of the user.
 * @param height - The updated height of the user.
 * @param weight - The updated weight of the user.
 * @returns The HTTP status code of the response.
 */
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

/**
 * Add an achievement to a user.
 * @param userId - The ID of the user.
 * @param achievementId - The ID of the achievement to add.
 * @returns The HTTP status code of the response.
 */
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

/**
 * Get a list of all achievements.
 * @returns An array of AchievementInterface objects.
 */
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

/**
 * Get a list of all achievements for a specific user.
 * @param userId - The ID of the user.
 * @returns An array of AchievementInterface objects.
 */
export const getAllAchievementsFromUser = async (
  userId: number
): Promise<AchievementInterface[]> => {
  try {
    const response = await fetch(`${API_URL}/${userId}/achievements`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error on get all achievements from user request");
    }

    const achievements: AchievementInterface[] = await response.json();
    return achievements;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/**
 * Delete an achievement from a user.
 * @param userId - The ID of the user.
 * @param achievementId - The ID of the achievement to delete.
 * @returns The HTTP status code of the response.
 */
export const deleteAchievementFromUser = async (
  userId: number,
  achievementId: number
): Promise<number> => {
  try {
    const response = await fetch(
      `${API_URL}/achievements/${achievementId}/users/${userId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Error on get all achievements request");
    }

    return response.status;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
