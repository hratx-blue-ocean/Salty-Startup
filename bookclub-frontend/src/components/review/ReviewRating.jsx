import React from 'react';
import reviewStyles from './reviewStyles.js';
import Rating from '@material-ui/lab/Rating';

const ReviewRating = ({avgRating}) => {
  const cl = reviewStyles();

  return (
    <div className={cl.rrBoxLMainRating}>
    <div className={cl.rrBoxLMainRatingR}>
    <div className={cl.rrBoxRatingWrapper}>
    <Rating
          name="simple-controlled"
          value={avgRating}
          precision={0.25}
          size="medium"
          mt="20"
          readOnly
        />
      </div>
    <div className={cl.rrBoxLMainRatingL}>{avgRating ? avgRating.toFixed(1) : ''}</div>
    <div className={cl.rrBoxLMainRatingLText}>{avgRating ? 'Average Rating: ' + avgRating.toFixed(1) : ''}</div>

    </div>
    </div>
  )
};

export default ReviewRating;