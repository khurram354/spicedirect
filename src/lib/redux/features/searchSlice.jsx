'use client'
import { createSlice } from "@reduxjs/toolkit";
const initialState=[];
export const searchSlice=createSlice({
    name:'searchSlice',
    initialState,
    reducers:{
        addSearch:(state,action)=>{
            return {
                ...state,
                searchfor: action.payload,
            }
        },
    }
});
export const {addSearch} = searchSlice.actions;
export default searchSlice.reducer;