import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Proizvod } from "../../app/models/proizvod";
import { currencyFormat } from "../../app/util/util";

interface Props {
    proizvod: Proizvod;
}

export default function ProizvodiCard({proizvod}: Props){
  const [loading, setLoading] = useState(false);
  const {setBasket} = useStoreContext();

  function handleAddItem(proizvodId: number) {
    setLoading(true);
    agent.Basket.addItem(proizvodId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading (false))
    }

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
          <LoadingButton loading={loading} onClick={() => handleAddItem(proizvod.id)}
                       size="small">Dodaj u kolica</LoadingButton>
          <Button component={Link} to={`/catalog/${proizvod.id}`} size="small">Pregled</Button>
        </CardActions>
      </Card>
    )
}