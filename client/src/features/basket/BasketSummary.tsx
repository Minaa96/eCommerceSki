import { TableContainer, Paper, Table, TableBody, TableRow, TableCell} from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";

export interface Props {
    subtotal?: number;
}

export default function BasketSummary({subtotal} : Props) {
    const {basket} = useAppSelector(state => state.basket);
    if (subtotal === undefined)
    subtotal = basket?.items.reduce((sum, item) => sum + (item.kolicina * item.cena), 0) ?? 0;
    const deliveryFee = subtotal > 15000 ? 0 : 1800;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Suma</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Dostava*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Ukupno</TableCell>
                            <TableCell align="right">{subtotal + deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Dostava preko 10000rsd se ne naplacuje</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}