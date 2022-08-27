import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { MetaData } from "../../app/models/pagination";
import { ProductParams, Proizvod } from "../../app/models/proizvod";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brend: string[];
    tip: string[];
    productParams: ProductParams;
    metaData: MetaData | null;
}

const proizvodAdapter = createEntityAdapter<Proizvod>();

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);

    if (productParams.searchTerm)
    params.append('searchTerm', productParams.searchTerm);

    if (productParams.brend?.length > 0)
    params.append('brend', productParams.brend.toString());

    if (productParams.tip.length > 0)
    params.append('tip', productParams.tip.toString());

    return params;
}

export const fetchProizvodiAsync = createAsyncThunk<Proizvod[], void, {state: RootState}> (
    'catalog/fetchProizvodiAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
        try {
            const response = await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
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

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

function initParams() {
    return {
            pageNumber: 1,
            pageSize: 6,
            orderBy: 'name',
            brend: [],
            tip: []
    }
}

export const catalogSlice = createSlice( {
    name: 'catalog',
    initialState: proizvodAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brend: [],
        tip: [],
        productParams: initParams(),
        metaData: null
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload, pageNumber: 1};
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload};
        },

        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetProductParams: (state) => {
            state.productParams = initParams();
        },
        setProduct: (state, action) => {
            proizvodAdapter.upsertOne(state, action.payload);
            state.productsLoaded = false;
        },
        removeProduct: (state, action) => {
            proizvodAdapter.removeOne(state, action.payload);
            state.productsLoaded = false;
        }
    },
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
        });
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brend = action.payload.brend;
            state.tip = action.payload.tip;
            state.filtersLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        })
    })
})

export const productsSelectors = proizvodAdapter.getSelectors((state: RootState) => state.catalog)

export const {setProductParams, resetProductParams, setMetaData, setPageNumber, setProduct, removeProduct} = catalogSlice.actions;