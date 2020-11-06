import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { CardActionArea, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export default function CarruselHome(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
            
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]
 
    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}
const useStyle = makeStyles( {
    root: {
        maxWidth: 1920,
        minWidth:320
      },
      media: {
        height: 240,
      },
});


function Item({item})
{
    const classes = useStyle();
    return (
        <Card className={classes.root} elevation={3}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image="https://picsum.photos/1920/240"
                title={item.name}
                />
                <div style={{
                          position: 'absolute', 
                          color: 'white', 
                          top: 8, 
                          left: '50%', 
                          transform: 'translateX(-50%)'
                        }} >
                            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {item.description}
                </Typography>
                </CardContent>
                        </div>
                
            </CardActionArea>
        </Card>
    )
}