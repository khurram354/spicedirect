'use client';
import {configureStore} from '@reduxjs/toolkit';
import searchSlice from './features/searchSlice';

export const makeStore=()=>{
    return configureStore({
        reducer:{
            search: searchSlice,
        }
    });
};

