import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import AddOrRemoveBook from './AddOrRemoveBook';
import Paper from '@material-ui/core/Paper';
import { specificBookData } from '../../services/bookclubServices';
import '@fontsource/roboto';
import { useParams } from 'react-router';


const BookInfo = () => {
  const { id } = useParams()
  const [book, setBook] = useState()

  useEffect(() => {
    specificBookData(id)
      .then((results) => {
        setBook(results[0])
      })
  }, [id])

  const useStyles = makeStyles((theme) => ({
    mainContainer: {
      paddingTop: '75px',
      display: 'flex',
      width: '100%',
      justifyContent: 'center'
    },
    parentContainer: {
      display: 'flex',
      width: '65%',
      justifyContent: 'center'
    },
    imageContainer: {
      paddingRight: '10%'
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    buttonRow: {
      width: '75%',
      paddingLeft: '25%'
    },
    titleRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    descriptionContainer: {
      width: '75%'
    },
    media: {
      height: '75%',
      maxHeight: '500px',
      width: '100%',
      maxWidth: '300px',
    },
    paper: {
      padding: '3%',
      backgroundColor: '#eae9e9'
    }
  }));
  const classes = useStyles();
  const image = book ? book.image : null;

  return (
    <>
      {book !== undefined
        ? <Grid container item className={classes.mainContainer} >
          <Grid container item className={classes.parentContainer}>
            <Grid container item direction='column' xs={3} className={classes.imageContainer}>
              <img
                className={classes.media}
                src={image}
                alt={book.title}
              />
            </Grid>
            <Grid container item direction='column' xs={8} >
              <Paper className={classes.paper} elevation={5}>
                <Grid >
                  <Grid container item direction='row' className={classes.titleRow}>
                    <Typography variant='h5'><b>{book.title}</b></Typography >
                    <Typography variant='h5'>{book.genre}</Typography>
                  </Grid>
                  <Grid container item direction='row'>
                    <Typography variant='h5'>Published: <b>{book.publishedDate}</b></Typography>
                  </Grid>
                </Grid>
                <Grid container item direction='column'>
                  <Grid direction='row'>
                    <Typography variant='h5'>{book.authors.join(', ')}</Typography>
                  </Grid>
                  <Grid direction='row' className={classes.titleContainer}>
                    <Typography className={classes.descriptionContainer} variant='subtitle1'>{book.description}</Typography>
                  </Grid>
                  <Grid direction="row" className={classes.buttonRow}>
                    <AddOrRemoveBook bookId={book.bookId} functionality={'both'} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        : null}
    </>
  )
}

export default BookInfo;