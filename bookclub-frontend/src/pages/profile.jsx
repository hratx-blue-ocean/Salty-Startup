import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../components/bookclub/Header.jsx';
import User from '../components/bookclub/UserInfo.jsx';
import withSlide from '../components/bookclub/BookGallery.jsx';
import {getUserData} from '../services/bookclubServices.js'

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 200,
    minHeight: '100vh',
  },
}));

const Profile = (props) => {
  const classes = useStyles();

  let prevRead;
  let faves;
  let toRead;
  let currReading;

  const [user, setUser] = useState([]);
  const [joinedDate, setJoinedDate] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [previouslyRead, setPreviouslyRead] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);

  useEffect(() => {
    if (props.uid.UID) {
      getUserData(props.uid.UID)
      .then((response) => {
        var results = response.data;
        setUser(results.name);
        setJoinedDate(results.joinedDate);
        setFavorites(results.lists.favorites);
        setPreviouslyRead(results.lists.alreadyRead);
        setWantToRead(results.lists.goingToRead);
        setCurrentlyReading(results.lists.currentlyReading);
      })
    }
    return;
  }, [])

  const faveList = {
    title: 'Favorites',
    className: 'fave',
    list: favorites, // <-- name of array of book objects
    removeBook: true,
    setter: setFavorites,
  };
  const prevList = {
    title: 'Previously Read',
    className: 'prevRead',
    list: previouslyRead,
    removeBook: true,
    setter: setPreviouslyRead,
  }
  const toReadList = {
    title: 'Want to Read',
    className: 'toRead',
    list: wantToRead,
    removeBook: true,
    setter: setWantToRead,
  }
  const currentList = {
    title: 'Currently Reading',
    className: 'currRead',
    list: currentlyReading,
    removeBook: true,
    setter: setCurrentlyReading,
  }

  return (
    // if props.uid.UID is undefined, redirect to landing page
    !props.uid.UID ? <Redirect to='/'/> :
    <div key={props.emailCookie.UID}>
      <Header
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.setIsLoggedIn}
        uidCookie={props.uidCookie}
        setUidCookie={props.setUidCookie}
        removeUidCookie={props.removeUidCookie}
        emailCookie={props.emailCookie}
        setEmailCookie={props.setEmailCookie}
        removeEmailCookie={props.removeEmailCookie}
        setSearchResults={props.setSearchResults}
      />
      <Container maxWidth='sm'>
        <User
          user={user}
          joinedDate={joinedDate}
          previouslyRead={previouslyRead}
        />
      </Container>
      <Container fixed={true} className={classes.root} maxWidth='lg'>
        {withSlide(faves, faveList, props.setBook)}
        {withSlide(currReading, currentList, props.setBook)}
        {withSlide(prevRead, prevList, props.setBook)}
        {withSlide(toRead, toReadList, props.setBook)}
      </Container>
    </div>
  )
}
export default Profile