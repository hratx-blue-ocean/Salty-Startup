import React from 'react';
import Slider from 'react-slick';
import { Card } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const withSlide = (wrappedComponent, selectData) => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };
  return (
    <div>
      <h2>{selectData.title}</h2>
      <Slider {...settings}>
        {selectData.list.map((book) => {
          return (
            <div>
              <Card style={{ width: '10rem' }}>
                <Card.Img variant='top' src={book.thumbnail} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.author}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </Slider>
    </div>
  );
}

export default withSlide;
