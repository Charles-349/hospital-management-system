
import { userAPI } from "../features/users/userAPI";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';
import { loginAPI } from "../features/login/loginAPI";
import  userSlice  from "../features/users/userSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user', 'admin']
}
const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    user: userSlice,

   
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(userAPI.middleware)
      .concat(loginAPI.middleware)
   
});
export const persistedStore = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
    