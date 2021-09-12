import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://training.pixbit.in/api/`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query(data) {
        return {
          url: `register`,
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query(data) {
        return {
          url: `login`,
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: data,
        };
      },
    }),
    getEmployees: builder.query({
      query: () => {
        return {
          url: `employees`,
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
        };
      },
    }),
    createEmployee: builder.mutation({
      query(data) {
        return {
          url: `employees`,
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
          body: data,
        };
      },
    }),
    updateEmployee: builder.mutation({
      query(data) {
        const { id, ...employee } = data;
        return {
          url: `employees/${id}`,
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
          body: employee,
        };
      },
    }),
    deleteEmployee: builder.mutation({
      query(id) {
        return {
          url: `employees/${id}`,
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
        };
      },
    }),
    getDesignations: builder.query({
      query: () => {
        return {
          url: `designations`,
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
        };
      },
    }),
    createDesignation: builder.mutation({
      query(data) {
        return {
          url: `designations`,
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
          body: data,
        };
      },
    }),
    updateDesignation: builder.mutation({
      query(data) {
        const { id, ...list } = data;
        return {
          url: `designations/${id}`,
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
          body: list,
        };
      },
    }),
    deleteDesignation: builder.mutation({
      query: (id) => {
        return {
          url: `designations/${id}`,
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("loginUser")),
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetDesignationsQuery,
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,
} = usersApi;
