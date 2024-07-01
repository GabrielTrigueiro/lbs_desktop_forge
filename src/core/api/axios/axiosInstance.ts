import axios, { AxiosResponse } from "axios";
import { BACKEND_BASE_URL } from "../../utils/constants";
import getMessageFromHttpStatus from "./axiosUtils";
import { IResponseBody } from "../../models/utils";
import useExpiredLoginHook from "../../../core/hooks/expiredLogin/expiredLoginHook";

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("userInfo");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const noAuthAxiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: any) => {
    if (error) {
      if (error.code === "ERR_NETWORK" && error.config.method === "get") {
        useExpiredLoginHook.getState().onOpen();
      }
      const errorMessage =
        getMessageFromBody(error.response) ||
        getMessageFromHttpStatus(error.response?.status) ||
        "erro de token";
      throw new Error(errorMessage);
    }
    throw error;
  }
);

function getMessageFromBody(
  response: AxiosResponse<IResponseBody<any>, any> | undefined
): string | undefined {
  return response?.data?.errors?.join(", ");
}

export { axiosInstance, noAuthAxiosInstance };
