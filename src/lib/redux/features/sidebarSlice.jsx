'use client'
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true, // default sidebar state
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSidebar: (state, action) => {
      state.isOpen = action.payload; // true / false
    },
  },
});

export const { toggleSidebar, setSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
