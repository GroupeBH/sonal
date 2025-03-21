import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/user'

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
})

// export const persistor = persistStore(store)
export default store
