import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Proizvod } from "../../app/models/proizvod";


export default function ProizvodDetails() {
    const {basket, setBasket, removeItem} = useStoreContext();
    const {id}= useParams<{id: string}>();
    const [proizvod, setProizvodi] = useState<Proizvod | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.proizvodId === proizvod?.id);


    useEffect(() => {
        if (item) setQuantity(item.kolicina);
        agent.Catalog.details(parseInt(id))
        .then(response => setProizvodi(response))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));

        
    }, [id, item] )
    
    function handleInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
       
    }
    
    function handleUpdateCart() {
      setSubmitting(true);
      if (!item || quantity > item.kolicina) {
        const updatedQuantity = item ? quantity - item.kolicina : quantity;
        agent.Basket.addItem(proizvod?.id!, updatedQuantity)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setSubmitting(false))
      } else {
        const updatedQuantity = item.kolicina - quantity;
        agent.Basket.removeItem(proizvod?.id!, updatedQuantity)
            .then(() => removeItem(proizvod?.id!, updatedQuantity))
            .catch(error => console.log(error))
            .finally(() => setSubmitting(false));
      }
    }
   
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
                            loading={submitting}
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