import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useFormContext } from 'react-hook-form';
import AppCheckbox from '../../app/components/AppCheckBox';
import AppTextInput from '../../app/components/AppTextInput';

export default function AddressForm() {
    const { control, formState } = useFormContext();
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Adresa za slanje
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='PunoIme' label='Puno Ime' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} name='Addresa1' label='Adresa 1' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} name='Addresa2' label='Adresa 2' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='Grad' label='Grad' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='Opstina' label='Opstina' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='PostanskiBroj' label='Postanski broj' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='Drzava' label='Drzava' />
                </Grid>
                <Grid item xs={12}>
                    <AppCheckbox 
                        disabled={!formState.isDirty}
                        name='saveAddress' 
                        label='Sacuvaj kao svoju adresu' 
                        control={control} 
                    />
                </Grid>
            </Grid>
        </>
    );
}