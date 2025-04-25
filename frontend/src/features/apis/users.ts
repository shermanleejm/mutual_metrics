import { UserDto, UserInfo } from "@/features/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/users/" }),
  endpoints: (build) => ({
    registerUser: build.mutation<UserInfo, UserDto>({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: build.mutation<string, UserDto>({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = usersApi;

export default usersApi;
