import { Notification } from "../../../app/components/toastNotification/toastNotification";
import { axiosInstance } from "../axios/axiosInstance";
import { AxiosError } from "axios";
import { TEdit, TVerificationToken } from "../../../core/models/user";
import { SEND_MESSEGE, VERIFICATION_TOKEN } from "../../../core/utils/constants";
import { urlByUserType } from "../../../core/utils/globalFunctions";

const updateUser = async (userNewInfos: TEdit): Promise<any> => {
  return await axiosInstance
    .put(urlByUserType(userNewInfos.type, userNewInfos.id, true), userNewInfos)
    .then((response) => {
      if (response instanceof AxiosError) {
        return response.response?.data;
      }
      return response.data.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

const getUserName = async (
  userType?: string,
  id?: number | null
): Promise<any> => {
  if (userType && id) {
    return await axiosInstance
      .get(urlByUserType(userType, id))
      .then((response) => response.data);
  } else {
    return "";
  }
};

export const UserService = {
  updateUser,
  getUserName,
};

export const sendMessegeService = async (login: string): Promise<any> => {
  return await axiosInstance
    .post(SEND_MESSEGE, { login, type: "RESET_PASSWORD" })
    .then((res) => {
      if (res instanceof AxiosError) {
        Notification(res.response?.data, "error");
        console.log("axios");
        return res;
      }
      Notification(res.data.data, "success");
      return res;
    })
    .catch((err) => {
      Notification(String(err), "error");
    });
};

export const verificationTokenService = async (
  token: TVerificationToken
): Promise<any> => {
  return await axiosInstance
    .post(VERIFICATION_TOKEN, { ...token, type: "RESET_PASSWORD" })
    .then((res) => {
      if (res instanceof AxiosError) {
        Notification(res.response?.data, "error");
      }
      Notification(res.data.data, "success");
      return res;
    })
    .catch((err) => {
      Notification(String(err), "error");
    });
};
