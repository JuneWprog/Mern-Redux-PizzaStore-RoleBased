/**
 * Carousel component for display images(promotions)
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import {Carousel} from 'react-bootstrap'
import image1 from '../../assets/pizzaDisplay1.jpg';
import image2 from '../../assets/pizzaDisplay2.jpg';
import image3 from '../../assets/pizzaDisplay3.jpg';


const CarouselComponent=()=> {
  
  return (
  <Carousel className="carousel">
  <Carousel.Item className="carouselItem" interval={5000}>
    <img
      className="d-block w-100"
      src={image1}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item  className="carouselItem" interval={5000}>
    <img
      className="d-block w-100"
      src= {image2}
      alt="Second slide"
    />
  </Carousel.Item>
  <Carousel.Item  className="carouselItem" interval={5000}>
    <img
      className="d-block w-100"
      src={image3}
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>
  );
}

export default CarouselComponent; 