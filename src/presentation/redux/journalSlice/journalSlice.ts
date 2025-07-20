
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Journal } from "../../../domain";

interface JournalState{

    isLoading: boolean;
    journals: Journal [] | null;
    active: Journal | null;
    errorMessage: string | null;
}

const initialState: JournalState = {
    isLoading: false,
    journals: [],
    active: null,
    errorMessage: null
}


export const journalSlice = createSlice({
    name: 'journal',
    initialState: initialState,
    reducers: {

        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        createJournal: (state, action: PayloadAction<Journal>) => {

            if (state.journals === null) {
                state.journals = [action.payload];
            }
            else{
                state.journals = [action.payload, ...state.journals];
            } 

           state.active = null;
           state.isLoading = false;
        },

        updateJournal: (state, action: PayloadAction<Journal>) => {

            state.journals = state.journals!.map( journal => {
                if( journal.id === action.payload.id) return action.payload;
                return journal;
            });

            state.active = null;
            state.isLoading = false;
        },

        setActiveJournal: (state, action: PayloadAction<Journal | null>) => {

            state.active = action.payload;
        },

        setJournals: (state, action: PayloadAction<Journal []>) => {

            state.journals = action.payload;
            state.isLoading = false;
        },

        deleteJournal: (state, action: PayloadAction<Journal>) =>{

            state.journals = state.journals!.filter(
                journal => (journal.id !== action.payload.id)
            );

            state.isLoading = false;
        },

        setStateAfterLogout: (state) => {
            state.isLoading = false;
            state.active = null;
            state.journals = null;
            state.errorMessage = null
        },

        setErrorMessage: (state, action: PayloadAction<string | null>) => {
           state.errorMessage = action.payload;
        }

    },
});

export const {
    setIsLoading, 
    createJournal, 
    updateJournal, 
    deleteJournal,
    setActiveJournal,
    setErrorMessage,
    setJournals,
    setStateAfterLogout} = journalSlice.actions;