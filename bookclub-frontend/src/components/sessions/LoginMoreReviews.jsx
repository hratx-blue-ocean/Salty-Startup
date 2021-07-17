import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Modal } from 'react-bootstrap';
import Button2 from '@material-ui/core/Button';
import fire from '../../fire.js';
import { createUser } from '../../services/bookclubServices';

const useStyles = makeStyles((theme) => ({
   root: {
    width: 300,
    display: 'flex',
    alignItems: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '150ch',
    },
    buttons: {
      padding: '0px 10px 0px 0px',
    },
  },
}))



function LoginMoreReviews(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState();
  const [newUser, setNewUser] = useState(false);

  const classes = useStyles()

  // const wrapper = React.createRef()

  const handleSubmit = (e) => {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(email, password)
      .then((userRecord) => {
        let d = new Date();
        d.setTime(d.getTime() + (60 * 60 * 1000));
        props.setUidCookie('UID', userRecord.user.uid, true, { path: '/', expires: d });
        props.setEmailCookie('email', userRecord.user.email, true, { path: '/', expires: d })
      })
      .catch((error) => {
        console.log('error: ', error);
        alert('Incorrect username or password');
      });
  }

  const handleNewUserSubmit = (e) => {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(email, password)
      .then((userRecord) => {
        let d = new Date();
        d.setTime(d.getTime() + (60 * 60 * 1000));
        props.setUidCookie('UID', userRecord.user.uid, true, { path: '/', expires: d });
        props.setEmailCookie('email', userRecord.user.email, true, { path: '/', expires: d });
        createUser(userRecord.user.uid, userName, userRecord.user.email, d);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setNewUser(false);
  };

  const doubleFunc = (e) => {
    handleSubmit(e);
    handleClose();
  };

  const newUserDoubleFunc = (e) => {
    handleNewUserSubmit(e);
    handleClose();
  };

  return (
    <>
      <Button2 className={classes.buttons} variant="outlined" onClick={handleShow}>More Reviews</Button2>
      <Modal
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header>
          <Modal.Title>Log into your account</Modal.Title>
          {!newUser ? <Button onClick={setNewUser}>Create New User</Button> : null}
        </Modal.Header>
        <Modal.Body>
          <form>
            {newUser ?
              <input
                type="text"
                onChange={({ target }) =>
                  setUserName(target.value)}
                placeholder="Username"
              /> : null
            }
            <br />
            <input
              type="text"
              onChange={({ target }) =>
                setEmail(target.value)}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              onChange={({ target }) =>
                setPassword(target.value)}
              placeholder="Password"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={!newUser ? doubleFunc : newUserDoubleFunc}>
            {!newUser ? 'Login' : 'Create Account'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginMoreReviews;
