import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/baseUrl";

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPostPhotosList: builder.query<any, null>({
      query: () => "/photo",
    }),
    getPostPhotoItem: builder.query<any, string>({
      query: (photo_id) => `/photo?photo_id=${photo_id}`,
    }),
    addPostPhoto: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/add-photo",
        method: "POST",
        body: payload,
        headers: {
          contentType: "multipart/form-data",
        },
      }),
    }),
    deletePostPhoto: builder.mutation<any, string>({
      query: (photo_id: string) => ({
        url: `/photo/?photo_id=${photo_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useAddPostPhotoMutation, useDeletePostPhotoMutation } =
  photosApi;
