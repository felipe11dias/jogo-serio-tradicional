import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../util/constants";
import { setUser } from "../slices/userSlice";
import { User } from "../types/User";

export const userApi = createApi({
  reducerPath: 'userApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}users`,
  }),
  endpoints: (builder) => ({
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
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetMeQuery
} = userApi;
