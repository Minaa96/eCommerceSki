import { useState, useEffect } from "react";
import { Proizvod } from "../../app/layout/models/proizvod"
import ProizvodiList from "./ProizvodiList";

export default function Catalog() {

    const [proizvodi, setProizvodi] = useState<Proizvod[]>([]);

 useEffect(() => {
   fetch('http://localhost:5202/api/proizvodi')
   .then(response => response.json())
   .then(data => setProizvodi(data))
 }, []) //kada koristimo prazan niz, znaci da ce se pozvati samo jednom! /[] da ga nema, bila bi beskonacna petlja


    return (
        <>
            <ProizvodiList proizvodi={proizvodi}/>
            
        </>
       
    )
}