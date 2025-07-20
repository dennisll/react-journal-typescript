import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice/authSlice'
import { clientSlice } from './clientSlice/clientSlice';
import { registerSlice } from './registerSlice/registerSlice';
import { journalSlice } from './journalSlice/journalSlice';
// ...

export const store = configureStore({

  reducer: {
    auth: authSlice.reducer,
    client: clientSlice.reducer,
    register: registerSlice.reducer,
    journal: journalSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'auth/login', 
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
          'journal/setActiveJournal'
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
          `journal.active`
          ],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch