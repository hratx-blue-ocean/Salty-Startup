import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import withSlide from '../../components/bookclub/BookGallery.jsx'
import {getRecentlyReviewed, recommendedBooks} from '../../services/bookclubServices.js';


const Carousel = (props) => {
  const [recommendations, setRecommendations] = useState([]);
  const [recReviewed, setRecReviewed] = useState([]);
  // const [latestread, setLatestRead] = useState([]);

  useEffect(() => {
    return recommendedBooks()
      .then((results) => {
        setRecommendations(results)
      })
  }, [])

  useEffect(() => {
    return getRecentlyReviewed()
      .then((results) => {
        setRecReviewed(results)
      })
  }, [])

  let clubRecs;
  let recentlyRev;
  // let recentlyRead;

  const recList = {
    title: 'Recommendations from Book Squid',
    className: 'recSquid',
    list: recommendations, // <-- name of array of book objects
    removeBook: false,
  };

  const recRevList = {
    title: 'Recently Reviewed',
    className: 'recentlyRev',
    list: recReviewed,
    removeBook: false,
  }

  // const recReadList = {
  //   title: 'Recently Read',
  //   className: 'recentlyRead',
  //   list: wantToRead,
  //   removeBook: false,
  // }


  return (
    <Container fluid='md' >
      {withSlide(clubRecs, recList, props.setBook)}
      {withSlide(recentlyRev, recRevList, props.setBook)}
      {/* {withSlide(recentlyRead, recReadList, props.setBook)} */}
    </Container>
  )

}

export default Carousel;