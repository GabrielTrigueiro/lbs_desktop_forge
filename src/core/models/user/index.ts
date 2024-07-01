import { JwtPayload } from "jwt-decode";
import { TNewClientBodyRequest } from "../client";

export type TLogin = {
  login: string;
  password: string;
};

export type TUser = {
  id?: number;
  login?: string;
  group?: string;
  password?: string;
  roles?: string[];
  name?: string;
};

export type TEdit = {
  id: number;
  login: string;
  password: string;
  name: string;
  type: string;
};

export type IUserPayload = JwtPayload & TUser;

export type AuthApiState = {
  userInfo?: IUserPayload | null;
  client?: TNewClientBodyRequest | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

export type TMessege = {
  login: string;
  type: string;
};

export type TVerificationToken = {
  cod: string;
  password: string;
  login: string;
};
