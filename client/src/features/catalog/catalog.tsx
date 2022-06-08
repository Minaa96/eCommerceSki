import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Proizvod } from "../../app/layout/models/proizvod"
import ProizvodiList from "./ProizvodiList";

export default function Catalog() {

    const [proizvodi, setProizvodi] = useState<Proizvod[]>([]);

 useEffect(() => {
   agent.Catalog.list().then(proizvodi => setProizvodi(proizvodi))
 }, []) //kada koristimo prazan niz, znaci da ce se pozvati samo jednom! /[] da ga nema, bila bi beskonacna petlja


    return (
        <>
            <ProizvodiList proizvodi={proizvodi}/>
            
        </>
       
    )
}