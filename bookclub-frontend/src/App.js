import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import SearchPage from './pages/search'
import Book from './pages/book';
import Landing from './pages/landing';
import Profile from './pages/profile';
import './App.css';
import fire from './fire';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uidCookie, setUidCookie, removeUidCookie] = useCookies(['UID']);
  const [emailCookie, setEmailCookie, removeEmailCookie] = useCookies(['email']);
  const [book, setBook] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [snackbarStatus, setSnackbarStatus] = useState(false);
  const [uid, setUID] = useCookies(['UID']);


  fire.auth().onAuthStateChanged((user) => {
    //console.log('app level onAuthStatechanged')
    //console.log('this is the user object')
    //console.log(user);
    if (user) {
      setIsLoggedIn(true);
      setUID(user.uid);
      //console.log('this is the uid object')
      return /* console.log(uid) */;
    }
    return setIsLoggedIn(false);
    //return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });



  return (

    <div className="App" >
      <div style={{ height: '9vh' }}></div>

      <Router>
        <Switch>
          <Route path="/search/:searchTerm">
            <SearchPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              uidCookie={uidCookie}
              setUidCookie={setUidCookie}
              removeUidCookie={removeUidCookie}
              emailCookie={emailCookie}
              setEmailCookie={setEmailCookie}
              removeEmailCookie={removeEmailCookie}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              setBook={setBook}
            />
          </Route>
          <Route path="/book/:id">
            <Book
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              uidCookie={uidCookie}
              setUidCookie={setUidCookie}
              removeUidCookie={removeUidCookie}
              emailCookie={emailCookie}
              setEmailCookie={setEmailCookie}
              removeEmailCookie={removeEmailCookie}
              setSearchResults={setSearchResults}
              book={book}
            />
          </Route>
          <Route path="/profile">
            <Profile
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              uidCookie={uidCookie}
              setUidCookie={setUidCookie}
              removeUidCookie={removeUidCookie}
              emailCookie={emailCookie}
              setEmailCookie={setEmailCookie}
              removeEmailCookie={removeEmailCookie}
              setSearchResults={setSearchResults}
              setBook={setBook}

              uid={uid}

            />
          </Route>
          <Route path="/">
            <Landing
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              uidCookie={uidCookie}
              setUidCookie={setUidCookie}
              removeUidCookie={removeUidCookie}
              emailCookie={emailCookie}
              setEmailCookie={setEmailCookie}
              removeEmailCookie={removeEmailCookie}
              setSearchResults={setSearchResults}
              setBook={setBook}
            />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
