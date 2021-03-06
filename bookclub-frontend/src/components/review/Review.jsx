import React from 'react';
// import { useCookies } from 'react-cookie';

import dummydata from './dummydata.js'
import { withStyles } from '@material-ui/core';
import ReviewRating from './ReviewRating.jsx';
import ReviewStars from './ReviewStars.jsx';
import ReviewList from './ReviewList.jsx';
import ReviewButtons from './ReviewButtons.jsx';
import { getBookReviews } from '../../services/bookclubServices.js';
import LoginAddReview from '../sessions/LoginAddReview.jsx';
import AddReviewBtn from './AddReviewBtn.jsx'





const useStyles = {
  rrCont: {
    marginTop: '30px',
    marginBottom: '30px',
  },
  rrTitleCont: {},
  rrBoxCont: {
    marginTop: '30px',
  },
  rrBoxL: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    '@media (max-width: 1000px)': {
      gridTemplateColumns: '1fr',
    },
  },
  rrBoxR: {
    
  },
  reviewCount: {
    fontWeight: '600',
    paddingLeft: '5px',
    fontSize: '1.1rem',
    opacity: '.8',
    '& select': {
      backgroundColor: 'transparent',
      border: 'none',
      fontWeight: '600',
      textDecoration: 'underline',
      fontSize: '1.1rem',
    },
  },
  rrButtons: {
    paddingTop: '5px',
  },
  AddReviewSpacer: {
    paddingBottom: '30px',
  },
  rrBoxL2: {
    '@media (max-width: 1000px)': {
      display: 'none',
    },
  },
};



class Review extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      avgRating: dummydata.avgRating,
      five: 75,
      four: 25,
      three: 10,
      two: 5,
      one: 5,
      ReviewSum: 0,
      reviewsRendered: [],
      reviewsRenderedNum: 0,
      reviewData: []
      
    }
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
  }

  componentDidMount() {
     getBookReviews(this.props.id)
    .then(data => {
      //get ratings
      let reviewSum = data.data.length;
      let avgRating;
      let five = 0;
      let four = 0;
      let three = 0;
      let two = 0;
      let one = 0;
      if (data.data.length === 0) {
        avgRating = null
      } else {
        let sum = 0
        for (let i = 0; i < data.data.length; i++) {
          sum += data.data[i].rating;
          if (data.data[i].rating === 5) { five++; }
          if (data.data[i].rating === 4) { four++; }
          if (data.data[i].rating === 3) { three++; }
          if (data.data[i].rating === 2) { two++; }
          if (data.data[i].rating === 1) { one++; }
        }
        avgRating = sum / reviewSum;
      };
      // get review percentages
      five = (five / reviewSum) * 100;
      four = (four / reviewSum) * 100;
      three = (three / reviewSum) * 100;
      two = (two / reviewSum) * 100;
      one = (one / reviewSum) * 100;
      //get reviews rendered
      let reviewsRendered = data.data.slice(0, 2)
      let reviewsRenderedNum = 0;
      if(reviewsRendered.length === 0) {reviewsRenderedNum = 0;} 
      else if (reviewsRendered.length === 1) {reviewsRenderedNum = 1;} 
      else {reviewsRenderedNum = 2;}

      this.setState({
        reviewData: data.data,
        reviewSum: reviewSum,
        avgRating: avgRating,
        five: five,
        four: four,
        three: three, 
        two: two,
        one: one,
        reviewsRendered: reviewsRendered,
        reviewsRenderedNum: reviewsRenderedNum
      })
    })
    .catch(err => {
      console.log('error at getBookReviews',err)
    });
  }

  handleMoreReviews() {
    var count = this.state.reviewsRenderedNum;
    this.setState({
      reviewsRendered: this.state.reviewData.slice(0, count + 2),
      reviewsRenderedNum: this.state.reviewsRenderedNum + 2
    })
  }

  render (props) {
    const { classes } = this.props;
    let AddReview;
    if(this.props.isLoggedIn){
      AddReview = <AddReviewBtn id={this.props.id} /> 
    } else {
      AddReview = <LoginAddReview />
    }
    return (
      <div className={classes.rrCont}>
      <div className={classes.rrTitleCont}>
      <h2>Ratings &#38; Reviews</h2>
      </div>
      {this.state.reviewSum > 0
      ? <div>
        <div className={classes.rrStarCont}>
          <div className={classes.rrBoxL}>
            <div className={classes.rrBoxL1}> <ReviewRating avgRating={this.state.avgRating} /></div>
            <div className={classes.rrBoxL2}> <ReviewStars five={this.state.five} four={this.state.four} three={this.state.three} two={this.state.two} one={this.state.one} /> </div>
          </div>  
        </div>
        <div className={classes.rrBoxCont}>
            {/* begin box right  */}
          <div className={classes.rrBoxR}>
            <div className={classes.reviewCount}><p>{this.state.reviewSum} reviews</p></div>
            {/* {filterTypeLine} */}
            <ReviewList reviewResults={this.state.reviewsRendered} />
            <div className={classes.rrButtons}>
            <ReviewButtons reviewsRenderedNum={this.state.reviewsRenderedNum} reviewSum={this.state.reviewSum} handleMoreReviews={this.handleMoreReviews} id={this.props.id} isLoggedIn={this.props.isLoggedIn} />
            </div>
          </div>
          {/* end box right  */}
        </div>
      </div>
        : <div><div>No Reviews</div> <div className={classes.AddReviewSpacer}>Be the first member to submit a review!</div> {AddReview}</div> }
  
   </div>


   )
  }
};


export default withStyles(useStyles)(Review);