import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProizvodiAsync, productsSelectors } from "./catalogSlice";
import ProizvodiList from "./ProizvodiList";

export default function Catalog() {

    const proizvodi = useAppSelector(productsSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    

 useEffect(() => {
    if (!productsLoaded) dispatch(fetchProizvodiAsync());
 }, [productsLoaded, dispatch]) //kada koristimo prazan niz, znaci da ce se pozvati samo jednom! /[] da ga nema, bila bi beskonacna petlja

 if (status.includes('pending')) return <LoadingComponent message='Loading products...'/>

    return (
        <>
            <ProizvodiList proizvodi={proizvodi}/>
            
        </>
       
    )
}