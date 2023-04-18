import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginInputs } from "../../pages/access-control/components/forms/form-login/FormLogin";
import { BASE_URL } from "../../util/constants";
import { logout } from "../slices/userSlice";
import { Auth } from "../types/Auth";
import { User } from "../types/User";
import { userApi } from "./userApi";

type UserLogin = {
  id: number;
  name: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}auth`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, ILoginInputs>({
      query(data) {
        return {
          url: 'register',
          method: 'POST',
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<
      UserLogin,
      ILoginInputs
    >({
      query(data) {
        return {
          url: 'authenticate',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const auth: Auth = { access_token: data.access_token, refresh_token: data.refresh_token }
          localStorage.setItem('auth', JSON.stringify(auth));
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
      verifyEmail: builder.mutation<
        any,
        { verificationCode: string }
      >({
        query({ verificationCode }) {
          return {
            url: `verifyemail/${verificationCode}`,
            method: 'GET',
          };
        },
      }),
      logoutUser: builder.mutation<void, void>({
        query() {
          return {
            url: 'logout',
            credentials: 'include',
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(logout());
            localStorage.remove("user")
            localStorage.remove("auth")
          } catch (error) {}
        },
      }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useVerifyEmailMutation,
} = authApi;
