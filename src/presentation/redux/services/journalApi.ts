import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Journal,
  type CreateJournalDto,
  type UpdateJournalDto,
} from "../../../domain";
import type { UploadFileDto } from "../../../domain/dtos/files/uploadFilesDto";

const token = localStorage.getItem("token");

export const journalApi = createApi({
  reducerPath: "journalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/journal",
    prepareHeaders: (headers, { endpoint }) => {
      headers.set("Authorization", `Bearer ${token}`);
      // headers.set("Content-Type", "application/json");

     /*  if (endpoint === "uploadImages") {
        headers.set("Content-Type", "multipart/form-data");
      } else {
        headers.set("Content-Type", "application/json");
      }  */

      return headers;
    },
  }),
  tagTypes: ["Journal"],
  endpoints: (builder) => ({
    createJournal: builder.mutation<
      { [key: string]: string },
      CreateJournalDto
    >({
      query: (journalDto) => ({
        url: "/",
        method: "POST",
        body: journalDto.values,
      }),
      invalidatesTags: ["Journal"],
    }),

    updateJournal: builder.mutation<
      { [key: string]: string },
      UpdateJournalDto
    >({
      query: (journalDto) => ({
        url: `/${journalDto.id}`,
        method: "PUT",
        body: journalDto.values,
      }),
      invalidatesTags: ["Journal"],
    }),

    getJournals: builder.query<Journal[], { [key: string]: string }>({
      query: (object) => ({
        url: "/",
      }),
      transformResponse: (response: { data: [{ [key: string]: string }] }) => {
        return response.data.map((object) => {
          return Journal.getJournalFromObject(object);
        });
      },
      providesTags: ["Journal"],
    }),

    uploadImages: builder.mutation<string[], FormData>({

      queryFn: async (formData) => {
 
        const resp = await fetch('http://localhost:3000/api/journal/upload', {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`
          }, 
          body: formData,
          
        });
    
        if(!resp.ok) throw new Error("No se pudo subir la imagen");
    
        const imageUrl = await resp.json();

        return imageUrl;
      },
      invalidatesTags: ["Journal"],
    }),
  }),
});

export const {
  useCreateJournalMutation,
  useGetJournalsQuery,
  useUpdateJournalMutation,
  useUploadImagesMutation,
} = journalApi;
