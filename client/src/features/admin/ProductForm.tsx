import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import AppSelectList from "../../app/components/AppSelectList";
import AppTextInput from "../../app/components/AppTextInput";
import { Proizvod } from "../../app/models/proizvod";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {yupResolver} from '@hookform/resolvers/yup';
import { validationSchema } from "./productValidation";
import agent from "../../app/api/agent";
import { setProduct } from "../catalog/catalogSlice";
import { LoadingButton } from "@mui/lab";

interface Props {
    product?: Proizvod;
    cancelEdit: () => void;
}

export default function ProductForm({ product, cancelEdit}: Props) {
    const { control, reset, handleSubmit, formState: {isDirty, isSubmitting} } = useForm({
        mode: 'all',
        resolver: yupResolver<any>(validationSchema)
    });
    const {brend, tip} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (product && !isDirty) reset (product);
    }, [product, reset, isDirty]);

 async function handleSubmitData(data: FieldValues) {
    try {
        let response: Proizvod;
        if (product) {
            response = await agent.Admin.updateProduct(data);
        } else {
             response = await agent.Admin.createProduct(data);
            }

            dispatch(setProduct(response));
            cancelEdit();

    } catch (error) {
        console.log(error)
    }
   }

    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Product Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='ime' label='Product name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppSelectList control={control} items={brend} name='brend' label='Brand' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppSelectList control={control} items={tip} name='tip' label='Type' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput type='number' control={control} name='cena' label='Price' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput type='number' control={control} name='kolicinaNaStanju' label='Quantity in Stock' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput multiline={true} rows={4} control={control} name='opis' label='Description' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} name='pictureUrl' label='Image' />
                </Grid>
            </Grid>
            <Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
                <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
            </Box>
         </form>
        </Box>
    )
}