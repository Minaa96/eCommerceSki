import { useEffect } from "react";
import { fetchFilters, fetchProizvodiAsync, productsSelectors } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";

export default function useProducts() {
    const proizvodi = useAppSelector(productsSelectors.selectAll);
    const {productsLoaded, filtersLoaded, brend, tip, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    

 useEffect(() => {
    if (!productsLoaded) dispatch(fetchProizvodiAsync());
    

 }, [productsLoaded,dispatch]) //kada koristimo prazan niz, znaci da ce se pozvati samo jednom! /[] da ga nema, bila bi beskonacna petlja

 useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
 }, [dispatch, filtersLoaded])

 return {
    proizvodi,
    productsLoaded,
    filtersLoaded,
    brend,
    tip,
    metaData
 }
}