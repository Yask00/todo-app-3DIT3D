import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from '../types/types';

export const todosApiSlice = createApi({
  reducerPath: 'todos',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://example.com/todos' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/',
      providesTags: ['Todos'],
    }),
    addTodo: builder.mutation({
      query: (todo: Todo) => ({
        url: '/add',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    completeTodo: builder.mutation({
      query: (id) => {
        return {
          url: `/edit`,
          method: 'PATCH',
          body: id,
        };
      },
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => {
        return {
          url: `/delete`,
          method: 'DELETE',
          body: id,
        };
      },
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useCompleteTodoMutation,
  } = todosApiSlice;