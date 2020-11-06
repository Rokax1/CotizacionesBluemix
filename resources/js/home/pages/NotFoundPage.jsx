import React from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import img404 from '../../img/404.svg'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

export default function NotFoundPage() {
  const classes = useStyles();

  return (

      <Box
      style={{marginTop: '40px'}}
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h2"
          >
            404: Página no Econtrada
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            Por favor revisa el enlace que escribiste
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src={img404}
            />
          </Box>
        </Container>
      </Box>
  );
};
