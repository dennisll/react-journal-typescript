import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateRegisterDto, UpdateRegisterDto } from "../../../domain";
import { Register } from "../../../domain/entities/register";

const token = localStorage.getItem("token");

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/register/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Register"],
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
      invalidatesTags: ["Register"],
    }),

    updateRegister: builder.mutation<
      { [key: string]: string },
      UpdateRegisterDto
    >({
      query: (registerDto) => ({
        url: `${registerDto.id}`,
        method: "PUT",
        body: registerDto.values,
      }),
      invalidatesTags: ["Register"],
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
      providesTags: ["Register"],
    }),

    uploadImages: builder.mutation<string[], FormData>({
      queryFn: async (formData) => {
        const resp = await fetch("http://localhost:3000/api/register/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!resp.ok) throw new Error("No se pudo subir la imagen");

        const imageUrl = await resp.json();

        return imageUrl;
      },
      invalidatesTags: ["Register"],
    }),
  }),
});

export const {
  useCreateRegisterMutation,
  useGetRegistersQuery,
  useUpdateRegisterMutation,
  useUploadImagesMutation
} = registerApi;
