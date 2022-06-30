import { Delete } from "@mui/icons-material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Basket } from "../../app/models/basket";

export default function BasketPage() {
    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState<Basket | null>(null);

    useEffect(() => {
        agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally (() => setLoading(false))
    }, [])

    if (loading) return <LoadingComponent message='Ucitavanje korpe...' />

    if(!basket) return <Typography variant='h3'>Vasa korpa je prazna.</Typography>

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Proizvodi</TableCell>
              <TableCell align="right">Cena</TableCell>
              <TableCell align="right">Kolicina</TableCell>
              <TableCell align="right">Suma</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item => (
              <TableRow
                key={item.proizvodId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.ime}
                </TableCell>
                <TableCell align="right">{(item.cena).toFixed(2)}rsd</TableCell>
                <TableCell align="right">{item.kolicina}</TableCell>
                <TableCell align="right">{(item.cena * item.kolicina).toFixed(2)}rsd</TableCell>
                <TableCell align="right">
                    <IconButton color = 'error'> 
                        <Delete />
                    </IconButton>    
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}