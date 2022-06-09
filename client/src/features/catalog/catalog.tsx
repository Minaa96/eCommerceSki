import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Proizvod } from "../../app/layout/models/proizvod"
import ProizvodiList from "./ProizvodiList";

export default function Catalog() {

    const [proizvodi, setProizvodi] = useState<Proizvod[]>([]);
    const [loading, setLoading] = useState(true);

 useEffect(() => {
   agent.Catalog.list()
   .then(proizvodi => setProizvodi(proizvodi))
   .catch(error => console.log (error))
   .finally(() => setLoading(false))
   
    
 }, []) //kada koristimo prazan niz, znaci da ce se pozvati samo jednom! /[] da ga nema, bila bi beskonacna petlja

 if (loading) return <LoadingComponent message='Loading products...'/>

    return (
        <>
            <ProizvodiList proizvodi={proizvodi}/>
            
        </>
       
    )
}