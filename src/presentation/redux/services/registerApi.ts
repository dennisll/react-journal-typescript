import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateRegisterDto, UpdateRegisterDto } from "../../../domain";
import { Register } from "../../../domain/entities/register";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/register/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({

    createRegister: builder.mutation<
      { [key: string]: string },
      CreateRegisterDto
    >({
      query: (registerDto) => ({
        url: ``,
        method: "POST",
        body: registerDto.values,
      }),
    }),

    updateRegister: builder.mutation<
      { [key: string]: string },
      UpdateRegisterDto
    >({

      query: (registerDto) => ({
        url: `${registerDto.id}`,
        method: 'PUT',
        body: registerDto.values,
      }),
    }),

    getRegisters: builder.query<Register[], { [key: string]: string }>({
      query: (object) => ({
        url: `?idUser=${object.idUser}&date=${object.date}`,
      }),
      transformResponse: (response: { data: [{ [key: string]: string }] }) => {
        return response.data.map((object) => {
          return Register.getRegisterFromObject(object);
        });
      },
    }),
  }),
});

export const { useCreateRegisterMutation, useGetRegistersQuery, useUpdateRegisterMutation } = registerApi;
