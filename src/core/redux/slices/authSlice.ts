// noinspection JSUnusedLocalSymbols

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../../../app/components/toastNotification/toastNotification";
import { noAuthAxiosInstance } from "../../../core/api/axios/axiosInstance";
import { AUTH } from "../../../core/utils/constants";
import { jwtDecode } from "jwt-decode";
import { UserService } from "../../../core/api/user/userService";
import {
  TUser,
  IUserPayload,
  AuthApiState,
  TLogin,
  TEdit,
} from "../../../core/models/user";

// ? pega a resposta do tipo jwtCustom e traduzindo em um usuário TResponseUserTO
const translateToken = (token: string | null): TUser | null => {
  if (token === null) {
    return null;
  }
  let userDecoded: IUserPayload = jwtDecode(token);
  let user: TUser = {
    id: userDecoded.id,
    roles: userDecoded.roles,
    login: userDecoded.sub || "",
    password: userDecoded.password,
    group: userDecoded.group,
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

const initialState: AuthApiState = {
  userInfo: null,
  status: "idle",
  error: null,
  client: null,
};

export const login = createAsyncThunk("login", async (data: TLogin) => {
  return await noAuthAxiosInstance
    .post(AUTH, data)
    .then((resp) => {
      localStorage.setItem("userInfo", resp.data.data);
      Notification("Login bem sucedido", "success");
      return resp.data.data;
    })
    .catch((err: any) => {
      Notification(err.response?.data?.errors[0], "error");
      return err;
    });
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data: TEdit) => {
    return await UserService.updateUser(data)
      .then((resp) => {
        return resp;
      })
      .catch((err: any) => {
        Notification(err.response?.data?.errors[0], "error");
        return err;
      });
  }
);

export type ITeste = {
  type: string;
  id: number;
};

export const fetchUserName = createAsyncThunk(
  "fetchUserName",
  async (data: ITeste) => {
    return await UserService.getUserName(data.type, data.id).then((resp) => {
      return resp.data;
    });
  }
);

export const logout = createAsyncThunk("logout", () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("user");
  localStorage.removeItem("persist:root");
  window.location.pathname = "/login";
});



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<TUser>) {},
    fetchUserName(state, action: PayloadAction<any>) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "idle";
        state.userInfo = translateToken(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<IUserPayload>) => {
          state.status = "idle";
          const roles = action.payload.roles?.map(
            (role: any) => "ROLE_" + role.name
          );
          state.userInfo = {
            ...action.payload,
            roles: roles,
          };
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Update failed";
      })
      .addCase(fetchUserName.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "idle";
        state.userInfo = {
          ...state.userInfo,
          name: action.payload.name || action.payload.coupon,
        };
        if (state.userInfo.group === "CLIENT") {
          state.client = action.payload;
        }
      });
  },
});

export default authSlice.reducer;
