import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { IRecoverPasswordInputs } from "../../pages/access-control/components/forms/form-forget-password/FormForgetPassword";
import { ISignUpInputs } from "../../pages/access-control/components/forms/form-sign-up/FormSignUp";
import { BASE_URL } from "../../util/constants";
import { logout, setUser } from "../slices/userSlice";
import { Auth } from "../types/Auth";
import { User } from "../types/User";

type UserRegisterLogin = {
  id: number;
  name: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}users`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserRegisterLogin, ISignUpInputs>({
      query(data) {
        return {
          url: 'register',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const auth: Auth = { access_token: data.access_token, refresh_token: data.refresh_token }
          localStorage.removeItem('auth');
          localStorage.setItem('auth', JSON.stringify(auth));
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
    recoverPassword: builder.mutation<String, IRecoverPasswordInputs>({
      query(data) {
        return {
          url: 'recover-password',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(data)
        } catch (error) {}
      },
    }),
    getMe: builder.query<User, null>({
      query() {
        return {
          method: 'GET',
          url: 'profile',
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth') || '')?.access_token || ''}` }
        };
      },
      transformResponse: (result: User) =>
        result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error: any) {
          const access_token = JSON.parse(localStorage.getItem("auth") || 'null')?.access_token;
          if(error.error.status === 500 && access_token) {
            const decodedJwt = parseJwt(access_token);
            if (decodedJwt.exp * 1000 < Date.now()) {
              toast.error('Sua sessão expirou, por favor acesse novamente sua conta para atualizar suas credenciais.')
              localStorage.removeItem("persist:jogosSerios")
              localStorage.removeItem("auth")
              dispatch(logout());
            }
          }
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useRecoverPasswordMutation,
  useGetMeQuery
} = userApi;

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

/*
CÓDIGO PARA FAZER REFRESH TOKEN 
getMe: builder.query<User, null>({
      query() {
        return {
          method: 'GET',
          url: 'profile',
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth') || '')?.access_token || ''}` }
        };
      },
      transformResponse: (result: User) =>
        result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          localStorage.setItem("refreshedToken", "false")
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error: any) {
          const access_token = JSON.parse(localStorage.getItem("auth") || 'null')?.access_token;
          if(error.error.status === 500 && access_token) {
              const decodedJwt = parseJwt(access_token);
              if (decodedJwt.exp * 1000 < Date.now()) {
                const response: any = await refreshToken(error);
                if(response !== null) {
                  const auth: Auth = { access_token: response.data.access_token, refresh_token: response.data.refresh_token }
                  localStorage.setItem('auth', JSON.stringify(auth));
                  dispatch(setUser(response.data))
                  if(response.data?.role === ROLES[ROLES.TEACHER]) {
                    window.location.replace("../environment/teacher/home")
                  }else if(response.data?.role === ROLES[ROLES.STUDENT]) {
                    window.location.replace("../environment/student/game-select")
                  }
                }else {
                  toast.error("Não foi possivel atualizar sua sessão. Por favor realize o login novamente.")
                  dispatch(logout());
                  localStorage.removeItem("persist:jogosSerios")
                  localStorage.removeItem("auth")
                }
              }
          }else {
            toast.error("Não foi possivel recupear seus dados de sessão. Realize o login novamente.")
            dispatch(logout());
            localStorage.removeItem("persist:jogosSerios")
            localStorage.removeItem("auth")
          }
          localStorage.setItem("refreshedToken", "false")
        }
      },
    }),

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

async function refreshToken(error: any) {
  return new Promise((resolve, reject) => {
    try {
      const refresh_token = JSON.parse(localStorage.getItem("auth") || 'null')?.refresh_token;
      const header = {
        "Content-Type": "application/json",
      };
      const parameters = {
        method: "POST",
        headers: header,
      };
      const body = {
        refreshToken: refresh_token,
      };
      api
        .post(
          BASE_URL + "auth/refresh-token",
          body,
          parameters
        )
        .then(async (res) => {
          // Fazer algo caso seja feito o refresh token
          return resolve(res);
        })
        .catch((err) => {
          // Fazer algo caso não seja feito o refresh token
          return reject(error);
        });
    } catch (err) {
      return reject(err);
    }
  });
};

*/