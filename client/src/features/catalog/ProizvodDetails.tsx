import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Proizvod } from "../../app/models/proizvod";


export default function ProizvodDetails() {
    const {id}= useParams<{id: string}>();
    const [proizvod, setProizvodi] = useState<Proizvod | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        agent.Catalog.details(parseInt(id))
        .then(response => setProizvodi(response))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));

        
    }, [id] )
    
    
    
   
    if (loading) 
    return <LoadingComponent message="Loading products..."/>

    if (!proizvod)
    return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={"/"+proizvod.pictureUrl} alt={proizvod.ime} style={{width: '100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{proizvod.ime}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant='h4' color='secondary'>{proizvod.cena.toFixed(2)} rsd</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Ime</TableCell>
                                <TableCell>{proizvod.ime}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Opis</TableCell>
                                <TableCell>{proizvod.opis}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Velicina</TableCell>
                                <TableCell>{proizvod.velicina}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Boja</TableCell>
                                <TableCell>{proizvod.boja}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brend</TableCell>
                                <TableCell>{proizvod.brend}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tip</TableCell>
                                <TableCell>{proizvod.tip}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Kolicina na stanju</TableCell>
                                <TableCell>{proizvod.kolicinaNaStanju}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}