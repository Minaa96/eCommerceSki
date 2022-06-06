import { Grid, List } from "@mui/material";
import { Proizvod } from "../../app/layout/models/proizvod";
import ProizvodiCard from "./ProizvodiCard";

interface Props {
    proizvodi: Proizvod[];
}

export default function ProizvodiList({proizvodi}: Props) {
    return (
        <Grid container spacing={4}>
            {proizvodi.map(proizvod => (
                <Grid item xs={3} key={proizvod.id}>
                    <ProizvodiCard proizvod={proizvod}/>

                </Grid>
            ))

            }



        </Grid>
    )
}