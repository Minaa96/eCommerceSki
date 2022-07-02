import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton, loadingButtonClasses } from "@mui/lab";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useStepperContext } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
    const {basket, setBasket, removeItem} = useStoreContext();
    const [status, setStatus] = useState({
      loading: false,
      name: ''
    });

    function handleAddItem(proizvodId: number, name: string) {
      setStatus({loading: true, name});
      agent.Basket.addItem(proizvodId)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setStatus({loading: false, name: ''}))

    }

    function handleRemoveItem(proizvodId: number, kolicina = 1, name: string) {
      setStatus({loading: true, name});
      agent.Basket.removeItem(proizvodId, kolicina) 
        .then(() => removeItem(proizvodId, kolicina))
        .catch(error => console.log(error))
        .finally(() => setStatus({loading: false, name: ''}))
    }

    if(!basket) return <Typography variant='h3'>Vasa korpa je prazna.</Typography>

    return (
        <>
             <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Proizvodi</TableCell>
              <TableCell align="right">Cena</TableCell>
              <TableCell align="center">Kolicina</TableCell>
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
                  <Box display='flex' alignItems='center'>
                      <img src={item.pictureUrl} alt={item.ime} style={{height: 50, marginRight: 20}} />
                      <span>{item.ime}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{(item.cena).toFixed(2)}rsd</TableCell>
                <TableCell align="center">
                  <LoadingButton
                                 loading={status.loading && status.name === 'rem' + item.proizvodId}
                                 onClick={() => handleRemoveItem(item.proizvodId, 1, 'rem' + item.proizvodId)} 
                                 color='error'>
                    <Remove />
                  </LoadingButton>
                  {item.kolicina}
                  <LoadingButton 
                                 loading={status.loading && status.name === 'add' + item.proizvodId}
                                 onClick={() => handleAddItem(item.proizvodId, 'add' + item.proizvodId)}
                                 color='secondary'>
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{(item.cena * item.kolicina).toFixed(2)}rsd</TableCell>
                <TableCell align="right">
                    <LoadingButton 
                                loading={status.loading && status.name === 'del' + item.proizvodId}
                                onClick={() => handleRemoveItem(item.proizvodId, item.kolicina, 'del' + item.proizvodId)}
                                color = 'error'> 
                        <Delete />
                    </LoadingButton>    
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
    <Grid container>
      <Grid item xs={6} />
      <Grid item xs={6} >
        <BasketSummary />
        <Button 
              component={Link}
              to='/checkout'
              variant='contained'
              size='large'
              fullWidth

          >
              Checkout
        </Button>
    </Grid>
    </Grid>
  </>
  )
}