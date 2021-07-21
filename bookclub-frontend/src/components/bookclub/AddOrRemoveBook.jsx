import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToList, removeFromList } from '../../services/bookclubServices';

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  remove: {
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    top: '1%',
    right: '1%',
    color: 'red',
    backgroundColor: '#FEE4EA',
    padding: '0px',
    '&:hover': { backgroundColor: '#FEE4EA' },
  },
}));

const AddOrRemoveBook = (props) => {
  const [listName, setListName] = useState()
  const classes = useStyles();

  let list;
  if (props.listName === 'Favorites') {
    list = 'favorites'
  } else if (props.listName === 'Previously Read') {
    list = 'alreadyRead'
  } else if (props.listName === 'Want to Read') {
    list = 'goingToRead'
  } else if (props.listName === 'Currently Reading') {
    list = 'currentlyReading'
  }

  const handleSubmit = (option) => {
    if (option === 'delete X button') {
      let index = props.list.findIndex((book) => props.bookId === book.bookId)
      removeFromList(list, props.bookId)
      .then(() => {
        let storedList = props.list
        storedList.splice(index, 1)
        props.removeFunc(storedList)
      })
    } else if (option === 'add') {
      // add to a selected list
      addToList(listName, props.bookId)
    } else if (option === 'remove from selected list') {
      // remove from selected list
      removeFromList(listName, props.bookId)
    }
  };

  const handleChange = (event) => {
    setListName(event.target.value)
  }

  return (
    <Grid container item direction='row' className={classes.formControl}>

      {props.functionality === 'remove' ? null :
        <FormControl >
          <Select
            value={listName}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Lists:
            </MenuItem>
            <MenuItem value={'favorites'}>Favorite</MenuItem>
            <MenuItem value={'currentlyReading'}>Currently Reading</MenuItem>
            <MenuItem value={'alreadyRead'}>Previously Read</MenuItem>
            <MenuItem value={'goingToRead'}>Want To Read</MenuItem>
          </Select>
          <FormHelperText>Select a list</FormHelperText>
        </FormControl>
      }

      {/* <Grid container item direction="row" > */}
      {props.functionality === 'remove' ?

        <IconButton className={classes.icon} aria-label="delete button" onClick={() => {
          handleSubmit('delete X button')
        }}>
          <HighlightOffIcon type="submit" />
        </IconButton>

        :
          <IconButton aria-label="add button" disabled={listName ? false : true} onClick={() => {
            handleSubmit('add')
          }}>
            <PlaylistAddIcon type="submit" />
          </IconButton>
      }
      {props.functionality === 'both' ?
          <IconButton aria-label="delete button" disabled={listName ? false : true} onClick={() => {
            handleSubmit('remove from selected list')
          }}>
            <DeleteOutlineIcon type="submit" />
          </IconButton>
        : null}
      {/* </Grid> */}

    </Grid>
  )
};

export default AddOrRemoveBook;