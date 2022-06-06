import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Proizvod } from "../../app/layout/models/proizvod";

interface Props {
    proizvod: Proizvod;
}

export default function ProizvodiCard({proizvod}: Props){
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
              {proizvod.cena.toFixed(2)} rsd
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {proizvod.brend} / {proizvod.tip}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Dodaj u kolica</Button>
          <Button size="small">Pregled</Button>
        </CardActions>
      </Card>
    )
}