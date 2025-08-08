import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 // const COURSE_PURCHASE_API = "http://localhost:8080/api/v1/purchase";    // changed this
 //   const COURSE_PURCHASE_API = `${import.meta.env.VITE_API_URL}/purchase`;   // also this
     const COURSE_PURCHASE_API = `${import.meta.env.VITE_API_URL.replace(/\/$/,"")}/purchase`;  



export const purchaseApi = createApi({
       reducerPath: "purchaseApi",
       baseQuery: fetchBaseQuery({
        baseUrl: COURSE_PURCHASE_API,
        credentials: "include"
       }),
       endpoints: (builder) => ({
        createCheckoutSession: builder.mutation({
            query: (courseId) => ({
                url: "/checkout/create-checkout-session",
                method: "POST",
                body: {courseId}
            })
        }),

        getCourseDetailWithStatus: builder.query({
            query: (courseId) => ({
                url: `/course/${courseId}/detail-with-status`,
                method: "GET"
            })
        }),

        getPurchasedCourses: builder.query({
            query: () => ({
                url: `/`,
                method: "GET"
            })
        })

     })
})

export const {useCreateCheckoutSessionMutation,  useGetPurchasedCoursesQuery, useGetCourseDetailWithStatusQuery} = purchaseApi;