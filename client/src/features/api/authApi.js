import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn,  userLoggedOut  } from "../authSlice";

 // const USER_API = "http://localhost:8080/api/v1/user/";  // changed this 
      const USER_API = `${import.meta.env.VITE_API_URL}/user`;

export const authApi = createApi({
           reducerPath: "authApi",
           baseQuery: fetchBaseQuery({
            baseUrl: USER_API,
            credentials: 'include'
           }),
           endpoints: (builder) => ({
            registerUser: builder.mutation({
                query: (inputData) => ({
                    url: "register",
                    method: "POST",
                    body: inputData
            })
        }),
            loginUser: builder.mutation({
                query: (inputData) => ({
                    url: "login",
                    method: "POST",
                    body: inputData
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try{
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch(error){
                      const errorMessage =
        error?.error?.data?.message ||
        error?.error?.data?.error ||
        "Login failed. Please try again.";

      console.error("Login Error:", errorMessage);
       //console.log(error);

      // Optionally show toast or alert
      // toast.error(errorMessage);

                }
            } 
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "logout",
                method: "GET"
            }),
             async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try{
                    dispatch(userLoggedOut());
                } catch(error){
                    console.error("Logout error:", error);
                }
            } 
        }),
        loadUser: builder.query({
            query: () => ({
                url:"profile",
                method: "GET",
                credentials: "include" // added / updated
            }),
             async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try{
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch(error){
                    console.error("Load User Error:", error);
                }
            } 
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: "profile/update", 
                method: "PUT",
                body: formData,
                credentials: "include"
            })
        })

    })

});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation
    
} = authApi;