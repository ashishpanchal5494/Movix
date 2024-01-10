import { createSlice } from '@reduxjs/toolkit'



export const HomeSlice = createSlice({
  name: 'Home',
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
   getApiConfigration: (state, action) => {
    state.url = action.payload
   },
   getGenres: (state, action) => {
    state.genres = action.payload
   }
  },
})

// Action creators are generated for each case reducer function
export const {getApiConfigration, getGenres } = HomeSlice.actions

export default HomeSlice.reducer