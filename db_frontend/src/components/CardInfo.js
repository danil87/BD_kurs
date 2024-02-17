import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
// import './CardInfo.css'

function CardInfo() {
    return (
        <Card className='CardInfo' sx={{ maxWidth: 345, maxHeight: 500, margin: '0 15px 30px 15px' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://mp6.siedlce.pl/wp/wp-content/uploads/2021/03/baner2.jpg"
                    alt="green iguana"
                />
                <CardContent sx={{backgroundColor: '#76c9ff'}}>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardInfo;