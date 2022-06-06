import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Proizvod } from "../../app/layout/models/proizvod";


export default function ProizvodDetails() {
    const {id}= useParams<{id: string}>();
    const [proizvod, setProizvodi] = useState<Proizvod | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        axios.get(`http://localhost:5202/api/proizvodi/${id}`)
        .then(response => setProizvodi(response.data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, [id])

    if (loading) 
    return <h3>Ucitavanje...</h3>

    if (!proizvod)
    return <h3>Proizvod nije pronadjen!</h3>

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={proizvod.pictureUrl} alt={proizvod.ime} style={{width: '100%'}} />
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