import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Proizvod } from "../../app/models/proizvod";
import { RootState } from "../../app/store/configureStore";

const proizvodAdapter = createEntityAdapter<Proizvod>();

export const fetchProizvodiAsync = createAsyncThunk<Proizvod[]> (
    'catalog/fetchProizvodiAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchProizvodAsync = createAsyncThunk<Proizvod, number> (
    'catalog/fetchProizvodAsync',
    async (proizvodId, thunkAPI) => {
        try {
            return await agent.Catalog.details(proizvodId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const catalogSlice = createSlice( {
    name: 'catalog',
    initialState: proizvodAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProizvodiAsync.pending, (state) => {
            state.status = 'pendidngFetchProizvodi';
        });
        builder.addCase(fetchProizvodiAsync.fulfilled, (state, action) => {
            proizvodAdapter.setAll(state, action.payload);
            state.status  = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProizvodiAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle'
        });

        builder.addCase(fetchProizvodAsync.pending,(state) => {
            state.status = 'pendingFetchProizvod'
        });
        builder.addCase(fetchProizvodAsync.fulfilled, (state, action) => {
            proizvodAdapter.upsertOne(state, action.payload);
            state.status = 'idle'
        });
        builder.addCase(fetchProizvodAsync.rejected,(state, action) => {
            console.log(action);
            state.status = 'idle';
        })
    })
})

export const productsSelectors = proizvodAdapter.getSelectors((state: RootState) => state.catalog)