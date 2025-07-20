import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Register } from "../../../domain/entities/register";

interface RegisterState{

    isLoading: boolean;
    registers: Register [] | null;
    active: Register | null;
    errorMessage: string | null;
}

const initialState: RegisterState = {
    isLoading: false,
    registers: [],
    active: null,
    errorMessage: null
}


export const registerSlice = createSlice({
    name: 'register',
    initialState: initialState,
    reducers: {

        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        createRegister: (state, action: PayloadAction<Register>) => {

            if (state.registers == null) {
                state.registers = [action.payload];
            }

           state.registers = [action.payload, ...state.registers];

         /*   state.registers!.forEach( register => {
            console.log(register.createdAt)
          }) */

           state.active = null;
           state.isLoading = false;
        },

        updateRegister: (state, action: PayloadAction<Register>) => {

            state.registers = state.registers!.map( register => {
                if( register.id === action.payload.id) return action.payload;
                return register;
            });

            state.active = null;
            state.isLoading = false;
        },

        setActiveRegister: (state, action: PayloadAction<Register>) => {

            state.active = action.payload;
        },

        setRegisters: (state, action: PayloadAction<Register []>) => {

            state.registers = action.payload;
            state.isLoading = false;
        },

        deleteRegister: (state, action: PayloadAction<Register>) =>{

            state.registers = state.registers!.filter(
                register => (register.id !== action.payload.id)
            );

            state.isLoading = false;
        },

        setStateAfterLogout: (state) => {
            state.isLoading = false;
            state.active = null;
            state.registers = null;
            state.errorMessage = null
        },

        setErrorMessage: (state, action: PayloadAction<string | null>) => {
           state.errorMessage = action.payload;
        }

    },
});

export const {
    setIsLoading, 
    createRegister, 
    updateRegister, 
    deleteRegister,
    setActiveRegister,
    setErrorMessage,
    setRegisters,
    setStateAfterLogout} = registerSlice.actions;