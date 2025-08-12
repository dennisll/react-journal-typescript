import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateClientDto, UpdateClientDto } from "../../../domain";
import { Client } from "../../../domain/entities/client";

const token = localStorage.getItem('token');

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/client/",
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ['Client'],
  endpoints: (builder) => ({

    createClient: builder.mutation<{ [key: string]: string }, CreateClientDto>({
      query: (clientDto) => ({
        url: "",
        method: "POST",
        body: clientDto.values,
      }),
      invalidatesTags: ['Client'],
    }),

    updateClient: builder.mutation<
          { [key: string]: string },
          UpdateClientDto
        >({
    
          query: (clientDto) => ({
            url: `${clientDto.id}`,
            method: 'PUT',
            body: clientDto.values,
          }),
         invalidatesTags: ['Client'],
        }),

    getClients: builder.query<Client[], { [key: string]: string }>({
      query: (object) => ({
        url: "",
      }),
      transformResponse: (response: { data: [{ [key: string]: string }] }) => {
        return response.data.map((object) => {
          return Client.getClientFromObject(object);
        });
      },
      providesTags: ['Client'],
    }),
  }),
});

export const { useCreateClientMutation, useGetClientsQuery, useUpdateClientMutation } = clientApi;
