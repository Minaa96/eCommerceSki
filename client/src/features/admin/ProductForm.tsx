import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import AppDropzone from "../../app/components/AppDropzone";
import AppSelectList from "../../app/components/AppSelectList";
import AppTextInput from "../../app/components/AppTextInput";
import useProducts from "../../app/hooks/useProducts";
import { Proizvod } from "../../app/models/proizvod";
import { useAppDispatch } from "../../app/store/configureStore";
import { validationSchema } from "../checkout/checkoutValidation";

interface Props {
    proizvod?: Proizvod;
    cancelEdit: () => void;
}

export default function ProductForm({ proizvod, cancelEdit }: Props) {
    const { control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting} } = useForm({
        mode: 'all',
        resolver: yupResolver<any>(validationSchema)
    });
    const { brend, tip } = useProducts();
    const watchFile = watch('file', null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (proizvod && !watchFile  && !isDirty) reset(proizvod);
        return () => {
            if (watchFile) URL.revokeObjectURL(watchFile.preview);
        }
    }, [proizvod, reset, watchFile, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Proizvod;
            if (proizvod) {
                //response = await agent.Admin.updateProduct(data);
            } else {
               // response = await agent.Admin.createProduct(data);
            }
          //  dispatch(setProduct(response));
            cancelEdit();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Product Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>  
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='ime' label='Ime proizvoda' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList items={brend} control={control} name='brend' label='Brend' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList items={tip} control={control} name='tip' label='Tip' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput type='number' control={control} name='cena' label='Cena' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput type='number' control={control} name='kolicinaNaStanju' label='Kolicina na stanju' />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput multiline={true} rows={4} control={control} name='opis' label='Opis' />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                            <AppDropzone control={control} name='pictureUrl' />
                            {watchFile ? (
                                <img src={watchFile.preview} alt='preview' style={{maxHeight: 200}} />
                            ) : (
                                <img src={proizvod?.pictureUrl} alt={proizvod?.ime} style={{maxHeight: 200}} />
                            )}
                        </Box>

                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                    <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
                </Box>
            </form>
        </Box>
    )
}