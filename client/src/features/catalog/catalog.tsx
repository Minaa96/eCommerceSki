import { Grid, Paper } from "@mui/material";
import AppPagination from "../../app/components/AppPagination";
import CheckboxButtons from "../../app/components/CheckBoxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import useProducts from "../../app/hooks/useProducts";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setPageNumber, setProductParams } from "./catalogSlice";
import ProductSearch from "./ProductSearch";
import ProizvodiList from "./ProizvodiList";

const sortOptions = [
    {value: 'name', label: 'Abecedno'},
    {value: 'priceDesc', label: 'Cena - visa ka nizoj'},
    {value: 'price', label: 'Cena - niza ka visoj'}
]

export default function Catalog() {

    const {proizvodi, brend, tip, filtersLoaded, productsLoaded, metaData} = useProducts();
    const {productParams} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();


 if (!filtersLoaded) return <LoadingComponent message='Loading products...'/>

    return (
        <Grid container columnSpacing={4}>
            <Grid item xs ={3}>
                <Paper sx={{mb: 2}}>
                    <ProductSearch />
                </Paper>

            <Paper sx={{mb: 2, p: 2}}>
                <RadioButtonGroup 
                    selectedValue={productParams.orderBy}
                    options={sortOptions}
                    onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
                />
            </Paper>
                
                <Paper sx={{mb: 2, p: 2}}>
                    <CheckboxButtons 
                        items={brend}
                        checked={productParams.brend}
                        onChange={(items: string[]) => dispatch(setProductParams({brend: items}))}
                    />
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                <CheckboxButtons 
                        items={tip}
                        checked={productParams.tip}
                        onChange={(items: string[]) => dispatch(setProductParams({tip: items}))}
                    />
                </Paper>

            </Grid>
            <Grid item xs={9}>
                <ProizvodiList proizvodi={proizvodi}/>
            </Grid>  
            <Grid item xs={3}/>
            <Grid item xs={9} sx={{mb: 2}}>
                {metaData &&
                <AppPagination 
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                />}
            </Grid>
                
              
        </Grid>
       
    )
}