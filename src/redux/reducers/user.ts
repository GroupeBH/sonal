import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
  },
})

export const {
  setCurrentUser,
} = userSlice.actions

export default userSlice.reducer
