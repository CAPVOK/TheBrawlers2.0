import { AxiosResponse } from "axios";
import {
  IUserLoginData,
  IUserLoginResponse,
  IUserRegisterData,
  IUserRegisterResponse,
} from "./types";
import { authApi } from "./api";

export const loginUserRequest = async (
  body: IUserLoginData
): Promise<AxiosResponse<IUserLoginResponse>> => {
  try {
    const response: AxiosResponse<IUserLoginResponse> = await authApi.post(
      "/auth/login",
      body
    );
    return response;
  } catch (error) {
    console.error("Ошибка входа:", error);
    throw error;
  }
};

export const registerUserRequest = async (
  body: IUserRegisterData
): Promise<AxiosResponse<IUserRegisterResponse>> => {
  try {
    const response: AxiosResponse<IUserRegisterResponse> = await authApi.post(
      "/auth/register",
      body
    );
    return response;
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    throw error;
  }
};

export const logoutUserRequest = async (token: string) => {
  try {
    await authApi.post("/auth/logout", null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Ошибка выхода:", error);
    throw error;
  }
};
