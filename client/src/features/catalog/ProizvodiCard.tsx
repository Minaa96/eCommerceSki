import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Proizvod } from "../../app/models/proizvod";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
    proizvod: Proizvod;
}

export default function ProizvodiCard({proizvod}: Props){
  const {status} = useAppSelector (state => state.basket);
  const dispatch = useAppDispatch();



    return (
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{bgcolor: 'secondary.main'}}>
                {proizvod.ime.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={proizvod.ime}
            titleTypographyProps={{
              sx: {fontWeight:'bold', color:'primary.main'}
            }}
          />
        <CardMedia
         sx={{ height: 140, backgroundSize:'contain', bgcolor: 'primary.light'}}
         image={proizvod.pictureUrl}
         title={proizvod.ime}
        />
        <CardContent>
          <Typography gutterBottom color='secondary' variant="h5" >
              {currencyFormat(proizvod.cena)} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {proizvod.brend} / {proizvod.tip}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton loading={status.includes('pendingAddItem' + proizvod.id)} 
                         onClick={() => dispatch(addBasketItemAsync({proizvodId: proizvod.id}))}
                         size="small">Dodaj u kolica</LoadingButton>
          <Button component={Link} to={`/catalog/${proizvod.id}`} size="small">Pregled</Button>
        </CardActions>
      </Card>
    )
}