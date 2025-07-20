import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Client } from "../../../domain/entities/client";

interface ClientState {
  isLoading: boolean;
  clients: Client[] | null;
  active: Client | null;
  message: string | null;
}

const initialState: ClientState = {
  isLoading: false,
  clients: [],
  active: null,
  message: null
};

export const clientSlice = createSlice({
  name: "client",
  initialState: initialState,
  reducers: {

    setLoadingClient: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      state.message = null;
    },

    setActiveClient: (state, action: PayloadAction<Client>) => {
      state.isLoading = false;
      state.active = action.payload;
    },

    setClients: (state, action: PayloadAction<Client[]>) => {
      state.isLoading = false;
      state.clients = action.payload;
    },

    setUpdateClient: (state, action: PayloadAction<Client>) => {
      state.isLoading = false;
      state.clients!.map((client) => {
        if (client.id === action.payload.id) return action.payload;
        return client;
      });
      state.active = null;
    },

    setClientsAfterLogout: (state) => {
      state.isLoading = false;
      state.clients = [];
      state.message = null;
      state.active = null;
    },

    setMessage: (state, action: PayloadAction<string | null>) => {
        state.message = action.payload;
        state.isLoading = false;
    },

    deleteClient: (state, action: PayloadAction<Client>)=> {
      state.isLoading = false;
      state.clients = state.clients!.filter( client => (client.id !== action.payload.id));
      state.active = null;
    }
  },
});

export const {
  setLoadingClient,
  setActiveClient,
  setClients,
  setUpdateClient,
  setClientsAfterLogout,
  setMessage,
  deleteClient
} = clientSlice.actions;
