import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import articlesReducer from './articlesSlice';
import categoriesReducer from './categoriesSlice';
import categoriesDetailReducer from './categoryDetailSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
    categories: categoriesReducer,
    categoryDetail: categoriesDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;