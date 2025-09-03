'use client';
import {configureStore} from '@reduxjs/toolkit';
import searchSlice from './features/searchSlice';
import sidebarSlice  from './features/sidebarSlice';

export const makeStore=()=>{
    return configureStore({
        reducer:{
            search: searchSlice,
            sidebar: sidebarSlice,
        }
    });
};

