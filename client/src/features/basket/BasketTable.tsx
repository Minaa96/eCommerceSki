import { Remove, Add, Delete } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material"
import { BasketItem } from "../../app/models/basket";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice"

interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}

export default function BasketTable({items, isBasket = true}: Props) {

    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    
    return  (

<TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }}>
  <TableHead>
    <TableRow>
      <TableCell>Proizvodi</TableCell>
      <TableCell align="right">Cena</TableCell>
      <TableCell align="center">Kolicina</TableCell>
      <TableCell align="right">Suma</TableCell>
      {isBasket &&
      <TableCell align="right"></TableCell>}
    </TableRow>
  </TableHead>
  <TableBody>
    {items.map(item => (
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
        {isBasket &&
          <LoadingButton 
                         loading={status === 'pendingRemoveItem' + item.proizvodId + 'rem'}
                         onClick={() => dispatch(removeBasketItemAsync({
                          proizvodId: item.proizvodId, kolicina: 1, name: 'rem'
                        }))} 
                         color='error'>
            <Remove />
          </LoadingButton> }
          {item.kolicina}
          {isBasket &&
          <LoadingButton 
                         loading={status === 'pendingAddItem' + item.proizvodId}
                         onClick={() => dispatch(addBasketItemAsync({proizvodId: item.proizvodId}))}
                         color='secondary'>
            <Add />
          </LoadingButton> }
        </TableCell>
        <TableCell align="right">{(item.cena * item.kolicina).toFixed(2)}rsd</TableCell>
        {isBasket &&
        <TableCell align="right">
            <LoadingButton 
                        loading={status === 'pendingRemoveItem' + item.proizvodId + 'del'}
                        onClick={() => dispatch(removeBasketItemAsync({
                          proizvodId: item.proizvodId, kolicina: item.kolicina, name: 'del'
                        }))}
                        color = 'error'> 
                <Delete />
            </LoadingButton>    
        </TableCell> }
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>

    )
}


