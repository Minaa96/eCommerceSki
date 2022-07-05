import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();


   

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
                                 loading={status === 'pendingRemoveItem' + item.proizvodId + 'rem'}
                                 onClick={() => dispatch(removeBasketItemAsync({
                                  proizvodId: item.proizvodId, kolicina: 1, name: 'rem'
                                }))} 
                                 color='error'>
                    <Remove />
                  </LoadingButton>
                  {item.kolicina}
                  <LoadingButton 
                                 loading={status === 'pendingAddItem' + item.proizvodId}
                                 onClick={() => dispatch(addBasketItemAsync({proizvodId: item.proizvodId}))}
                                 color='secondary'>
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{(item.cena * item.kolicina).toFixed(2)}rsd</TableCell>
                <TableCell align="right">
                    <LoadingButton 
                                loading={status === 'pendingRemoveItem' + item.proizvodId + 'del'}
                                onClick={() => dispatch(removeBasketItemAsync({
                                  proizvodId: item.proizvodId, kolicina: item.kolicina, name: 'del'
                                }))}
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