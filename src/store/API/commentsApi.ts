import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/baseUrl";

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getPostComments: builder.query<any, string>({
      query: (postId: string) => `/comment?post_id=${postId}`,
    }),
    addCommentToPost: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/comment",
        method: "POST",
        body: payload,
      }),
    }),
    editPostComment: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/comment",
        method: "PUT",
        body: payload,
      }),
    }),
    deletePostComment: builder.mutation<any, string>({
      query: (comment_id) => ({
        url: `/post/?post_id=${comment_id}`,
        method: "DELETE",
      }),
    }),
  })
})