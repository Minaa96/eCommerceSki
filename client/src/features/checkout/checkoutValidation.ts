import * as yup from 'yup';

export const validationSchema = [
    yup.object({
        PunoIme: yup.string().required('Puno ime je obavezno'),
        Addresa1: yup.string().required('Adresa 1 je obavezna'),
        Addresa2: yup.string().required(),
        Grad: yup.string().required(),
        Opstina: yup.string().required(),
        PostanskiBroj: yup.string().required(),
        Drzava: yup.string().required()
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required()
    })
]

   
    
