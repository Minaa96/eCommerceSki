import { Grid } from "@mui/material";
import { Proizvod } from "../../app/models/proizvod";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProizvodiCard from "./ProizvodiCard";

interface Props {
    proizvodi: Proizvod[];
}

export default function ProizvodiList({proizvodi}: Props) {
    const {productsLoaded} = useAppSelector(state => state.catalog);

    return (
        <Grid container spacing={4}>
            {proizvodi.map(proizvod => (
                <Grid item xs={4} key={proizvod.id}>
                    {!productsLoaded ? (
                        <ProductCardSkeleton />
                    ) : (
                        <ProizvodiCard proizvod={proizvod}/>
                    )}
                    

                </Grid>
            ))

            }



        </Grid>
    )
}