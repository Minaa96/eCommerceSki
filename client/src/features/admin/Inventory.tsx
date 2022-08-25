import { Edit, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";
import AppPagination from "../../app/components/AppPagination";
import useProducts from "../../app/hooks/useProducts";
import { Proizvod } from "../../app/models/proizvod";
import { useAppDispatch } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { setPageNumber } from "../catalog/catalogSlice";
import ProductForm from "./productForm";

export default function Inventory() {
    const {proizvodi, metaData} = useProducts();
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Proizvod | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);

    function handleSelectProduct(product: Proizvod) {
        setSelectedProduct(product);
        setEditMode(true);
    }

    function handleDeleteProduct(id: number) {
        setLoading(true);
        setTarget(id);
       // agent.Admin.deleteProduct(id)
           // .then(() => dispatch(removeProduct(id)))
           // .catch((error: any) => console.log(error))
           // .finally(() => setLoading(false));
    }

    function cancelEdit() {
        if (selectedProduct) setSelectedProduct(undefined);
        setEditMode(false);
    }

    if (editMode) return <ProductForm proizvod={selectedProduct} cancelEdit={cancelEdit} />

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Inventory</Typography>
                <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Kreiraj</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Proizvod</TableCell>
                            <TableCell align="right">Cena</TableCell>
                            <TableCell align="center">Tip</TableCell>
                            <TableCell align="center">Brend</TableCell>
                            <TableCell align="center">Kolicina</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {proizvodi.map((proizvod) => (
                            <TableRow
                                key={proizvod.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {proizvod.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={proizvod.pictureUrl} alt={proizvod.ime} style={{ height: 50, marginRight: 20 }} />
                                        <span>{proizvod.ime}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(proizvod.cena)}</TableCell>
                                <TableCell align="center">{proizvod.tip}</TableCell>
                                <TableCell align="center">{proizvod.brend}</TableCell>
                                <TableCell align="center">{proizvod.kolicinaNaStanju}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectProduct(proizvod)} startIcon={<Edit />} />
                                    <LoadingButton 
                                        loading={loading && target === proizvod.id} 
                                        startIcon={<Delete />} color='error' 
                                        onClick={() => handleDeleteProduct(proizvod.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {metaData && 
                <Box sx={{pt: 2}}>
                    <AppPagination 
                        metaData={metaData} 
                        onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                    />
                </Box>
            }
        </>
    )
}