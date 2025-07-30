import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice/authSlice'
import { clientSlice } from './clientSlice/clientSlice';
import { registerSlice } from './registerSlice/registerSlice';
import { journalSlice } from './journalSlice/journalSlice';
import { authApi } from './services/authApi';
// ...

export const store = configureStore({

  reducer: {
    auth: authSlice.reducer,
    client: clientSlice.reducer,
    register: registerSlice.reducer,
    journal: journalSlice.reducer,

    //services
    authApi: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'auth/login', 
          'authApi/executeMutation/rejected',
          'authApi/executeMutation/fulfilled',
          'auth/setMessage',
          'authApi/executeQuery/fulfilled',
          'authApi/executeQuery/fulfilled',
          'client/setActiveClient', 
          'client/setClients', 
          'client/setUpdateClient',
          'client/deleteClient',
          'register/setRegisters',
          'register/createRegister',
          'register/updateRegister',
          'register/deleteRegister',
          'journal/createJournal',
          'journal/setJournals',
          'journal/setActiveJournal',
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: [
          'auth.user',
          'client.active', 
          'client.clients', 
          'register.registers',
          'journal.journals',
          `journal.active`,
          'auth.errorMessage'
          ],
      },

    }).concat(authApi.middleware)
});

//setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch