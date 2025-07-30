
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../../domain';


interface AuthState{
    status: string,
    user: User | null,
    errorMessage: string | null
}

const initialState: AuthState =
{
    status: 'checking',
    user: null,
    errorMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {

        login:(state, action: PayloadAction<User>)=>{
            
           state.status = 'authenticated';
           state.user = action.payload;
        },

        logout:(state)=>{
           state.status = 'not-authenticated';
           state.user = null;
           state.errorMessage = null;
        },

        checkingCredentials:(state)=>{
            state.status = 'checking';
            state.user = null;
            state.errorMessage = null;
        },

         setMessage: (state, action: PayloadAction<string | null>) => {
            state.errorMessage = action.payload;
         }
    },

});

export const {login, logout, checkingCredentials, setMessage} = authSlice.actions;