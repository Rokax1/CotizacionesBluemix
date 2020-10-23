import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
import {getProductsAction} from '../../redux/productDucks';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  
  avatar: {
    backgroundColor: red[500],
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

}));

export default function CategoryCard(props) {
  const classes = useStyles();
  const {category, handleClose} = props;
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleClick = (category) => {
    dispatch(getProductsAction(category));
    handleClose();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar variant="square" aria-label="recipe"  className={classes.avatar} style={{backgroundColor: "#EEC04A"}}>
              {category.name.toUpperCase().charAt(0)}
          </Avatar>
        }
        action={
          <div>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Sub Categorias"
              >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        }
        title={category.name}
        subheader={category.products.length + ' Productos' }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List>
            <ListItem button onClick={ () => handleClick(category.id) }>
              <ListItemText primary={category.name}/>
            </ListItem>
            {category.sub.map( (sub,index) => (
            <ListItem button key={index} onClick={ () => handleClick(sub.category.id) }>
              <ListItemText primary={sub.category.name} secondary={sub.category.products.length + ' Productos'}/>
            </ListItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}