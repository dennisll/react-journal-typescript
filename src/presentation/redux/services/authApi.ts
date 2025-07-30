// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateUserDto, LoginDto } from "../../../domain";
import type { EmailDto } from "../../../domain/dtos/auth/email.dto";
import type { PasswordDto } from "../../../domain/dtos/auth/password.dto";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/auth/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json"); // O el tipo de contenido correcto
      return headers;
    },
  }),
  tagTypes: ["ValidateEmail"],
  endpoints: (builder) => ({
    
    registerUser: builder.mutation<{ [key: string]: string }, CreateUserDto>({
      //{[key: string]: string}
      query: (userDto) => ({
        url: `register`,
        method: "POST",
        body: userDto.values,
      }),
      //invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    login: builder.mutation<{ [key: string]: string }, LoginDto>({
      query: (loginDto) => ({
        url: `login`,
        method: "POST",
        body: loginDto.values,
      }),
    }),

    sendEmail: builder.mutation<{ [key: string]: string }, EmailDto>({
      query: (emailDto) => ({
        url: `email-reset-pass`,
        method: "POST",
        body: { email: emailDto.email },
      }),
    }),

    resetPassword: builder.mutation<
      { [key: string]: string },
      { token: string; passwordDto: PasswordDto }
    >({
      query: ({ token, passwordDto }) => ({
        url: `reset-password/${token}`,
        method: "POST",
        body: { password: passwordDto.password },
      }),
    }),

    renewToken: builder.query<{ [key: string]: string }, string>({
      query: (token) => `renew/${token}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useRegisterUserMutation,
  useSendEmailMutation,
  useResetPasswordMutation,
  useRenewTokenQuery
} = authApi;
