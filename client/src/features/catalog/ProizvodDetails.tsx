import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProizvodAsync, productsSelectors } from "./catalogSlice";


export default function ProizvodDetails() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const {id}= useParams<{id: string}>();
    const proizvod = useAppSelector(state => productsSelectors.selectById(state, id));
    const {status: proizvodStatus} = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.proizvodId === proizvod?.id);


    useEffect(() => {
        if (item) setQuantity(item.kolicina);
        if (!proizvod) dispatch(fetchProizvodAsync(parseInt(id)));
    }, [id, item, dispatch, proizvod] )
    
    function handleInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
       
    }
    
    function handleUpdateCart() {
     
    
      if (!item || quantity > item.kolicina) {
        const updatedQuantity = item ? quantity - item.kolicina : quantity;
        dispatch(addBasketItemAsync({proizvodId: proizvod?.id!, kolicina: updatedQuantity}))
      } else {
        const updatedQuantity = item.kolicina - quantity;
        dispatch(removeBasketItemAsync({proizvodId: proizvod?.id!, kolicina: updatedQuantity}))
      }
    }
   
    if (proizvodStatus.includes ('pending')) 
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
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                            onChange={handleInputChange}
                            variant='outlined'
                            type='number'
                            label='Kolicina u kolicima'
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton 
                            disabled={item?.kolicina === quantity || !item && quantity === 0}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Azuriranje kolicine' : 'Dodaj u kolica'}
                        </LoadingButton>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}