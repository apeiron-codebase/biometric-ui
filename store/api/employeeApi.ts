// store/api/employeeApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { Employee } from "@/types/employee";
import { baseQueryWithReauth } from "./baseQuery";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => "/employees",
      providesTags: ["Employee"],
    }),

    createEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation<Employee, { id: string; data: Partial<Employee> }>({
    
      query: ({ id, data }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),

    deleteEmployee: builder.mutation<Employee, { id: string }>({
      query: ({ id }) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
    getEmployeeById: builder.query<Employee, string>({
      query: (id) => `/employees/${id}`,
      providesTags: (result, error, id) => [{ type: "Employee", id }],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeeByIdQuery,
} = employeeApi;
