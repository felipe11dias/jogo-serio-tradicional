import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../util/constants";
import { setUser } from "../slices/userSlice";
import { User } from "../types/User";

export const disciplineApi = createApi({
  reducerPath: 'disciplineApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}disciplines`,
  }),
  endpoints: (builder) => ({
    registerDiscipline: builder.mutation<User, null>({
      query() {
        return {
          method: 'POST',
          url: 'register',
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
    listDisciplines: builder.mutation<User, null>({
      query() {
        return {
          url: '',
          method: 'GET'
        };
      },
    }),
  }),
});

export const {
  useRegisterDisciplineMutation,
  useListDisciplinesMutation
} = disciplineApi;
