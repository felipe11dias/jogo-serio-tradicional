import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { ILoginInputs } from "../../pages/access-control/components/forms/form-login/FormLogin";
import { BASE_URL } from "../../util/constants";
import { logout } from "../slices/userSlice";
import { Auth } from "../types/Auth";
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
          toast.success(`Olá ${data.role == "STUDENT" ? 'estudante' : 'professor'} ${data.name}, você acessou sua conta com sucesso!`);
        } catch (error) {}
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
            localStorage.removeItem("persist:jogosSerios")
            localStorage.removeItem("auth")
            dispatch(logout());
          } catch (error) {}
        },
      }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
