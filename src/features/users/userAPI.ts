import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIDomain } from '../../utils/APIDomain';
import type { RootState } from '../../app/store';


export type TUser = {
    userID: number; 
    firstName: string;
    lastName: string;
    email: string;
    contactPhone: string;
    address: string;
    role: string;
    isVerified: boolean;    
    verificationCode: string;
    verificationCodeExpiresAt: Date;
    image_url?: string;
};
export type TverifyUser = {
    email: string;
    code: string;
};
export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl : APIDomain,
         prepareHeaders: (headers, {getState}) => {
                  const token = (getState() as RootState).user.token;
                  if (token) {
                      headers.set('Authorization', `Bearer ${token}`);
                  }
                  headers.set('Content-Type', 'application/json');
                  return headers;
              } 
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        createUser: builder.mutation<TUser, Partial<TUser>>({
            query: (newUser) => ({
                url: '/user',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['Users'],
        }),
        VerifyUser: builder.mutation<{message:string}, TverifyUser >({
            query: (data) => ({
                url: '/user/verify',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
         getUsers: builder.query<TUser[], void>({
    query: () => '/user',
    transformResponse: (response: { users: TUser[] }) => response.users, 
    providesTags: ['Users'],
}),

    updateUser: builder.mutation<TUser, Partial<TUser> & { userID: number }>({
            query: (updatedUser) => ({
                url: `/user/${updatedUser.userID}`,
                method: 'PUT',
                body: updatedUser,
            }),
            invalidatesTags: ['Users']
        }),
       getUserById: builder.query<{ user: TUser }, number>({
    query: (userID) => `/user/${userID}`,
    providesTags: ['Users'],
}),

    }),
})
    
