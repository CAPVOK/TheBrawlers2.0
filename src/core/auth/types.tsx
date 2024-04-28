export interface IUserLoginData {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  access_token: string;
}

export interface IUserRegisterData {
  email: string;
  password: string;
}

export interface IUserRegisterResponse {
  user_id: number;
}

export interface IUser {
  id: number;
  email: string;
}
