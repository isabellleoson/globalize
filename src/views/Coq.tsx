import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

import burger1 from "../images/coqburger1.png";
import burger2 from "../images/coqburger2.png";
import burger3 from "../images/coqburger3.png";

function Coq() {
  return (
    <>
      <H1>COQ</H1>
      <P>COQ är vårt senaste äventyr. Mer info kommer snart</P>
      <div>
        <Carousel style={carouselStyle}>
          <Carousel.Item interval={5000}>
            <img
              style={imgStyle}
              className="d-block w-100"
              src={burger3}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              style={imgStyle}
              className="d-block w-100"
              src={burger1}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              style={imgStyle}
              className="d-block w-100"
              src={burger2}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

const H1 = styled.h1`
  font-size: 40px;
  max-width: auto;
`;

const P = styled.p`
  margin: 30px;
`;

const imgStyle = {
  width: "100px",
};

const carouselStyle = {
  padding: "20px",
  margin: "20px",
  border: "solid #ece9e4 2px",
  maxWidth: "auto",
};
export default Coq;
