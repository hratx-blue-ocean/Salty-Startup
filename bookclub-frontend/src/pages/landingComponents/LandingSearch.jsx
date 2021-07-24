import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import searchBackdrop from './assets/SearchBackdrop.jpeg'


const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: '0px 7px 15px -5px gray'
  },
  buttons: {
    alignItems: 'center',
    color: '#fee4ea',
    backgroundColor: '#004d86',
    boxShadow: '0px 7px 10px -5px black'
  },
  backdrop: {
    backgroundImage: `url(${searchBackdrop})`,
    backgroundSize: 'contain',
    height: '45vh'
  },
  searchInput: {
    // position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 0 30px 0px black'

  }
}))



const LandingSearch = (props) => {

  let submitButton = document.getElementById('submitButton')
  const [searchInput, setSearchInput] = useState((''))
  const classes = useStyles()

  const handleInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handleEnterSearch = (e) => {
    if (e.key === 'Enter') {
      submitButton.click();
    }
  }


  return (

    <Container fluid className={classes.container} >
      <div >
        <Row id="landingSearch" className={`align-items-center justify-items-center ${classes.backdrop}`}>
          <Col xs={3}>
          </Col>
          <Col xs={6}>
            <Form >
              <FormControl
                className={classes.searchInput}
                style={{ padding: "12px", marginBottom: "2vh" }}
                type="text"
                placeholder="Search Books, Authors or Genres!"
                onChange={handleInputChange}
                onKeyDown={handleEnterSearch}
              ></FormControl >
              {searchInput
                ? <Link to={`/search/${searchInput}`}>
                  <Button id='submitButton' className={classes.buttons}>Search Books</Button>
                </Link>
                : <Button className={classes.buttons} disabled>Search Books</Button>
              }
            </Form>
          </Col>
        </Row>
      </div>
    </Container>

  )
}

export default LandingSearch;