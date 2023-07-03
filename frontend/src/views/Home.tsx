import { useEffect } from "react";
import { UserContext } from "../UserContext";
import { useContext } from "react";

// import "bootstrap/dist/css/bootstrap.min.css";

import { Link, useLocation } from "react-router-dom";

import styled from "styled-components";

import food1 from "../images/food1.jpg";
import food3 from "../images/food3.jpg";

import menytext from "../images/menytext.png";
import shoptext from "../images/shoptext.png";

import globalize from "../images/Globalize(4).png";
const Container = styled.div`
    display: grid;
    grid-gap: 20px;
    padding: 20px;
    grid-template-areas:
        " . ."
        " . ."
        " . .";
`;

const MenyDiv = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
`;
const CateringDiv = styled.div`
    width: auto;
    grid-ared: catering;

    background-color: rgba(255, 236, 236, 0.8);
    box-shadow: 1px 3px 5px 2px rgba(76, 75, 75, 0.1);

    color: rgb(10, 10, 10);
    padding: 20px;
`;
const CoqDiv = styled.div`
    grid-ared: coq;

    padding: 20px;

    background-color: rgba(255, 236, 236, 0.8);
    box-shadow: 1px 3px 5px 2px rgba(76, 75, 75, 0.1);

    color: rgb(10, 10, 10);
`;

const ShopDiv = styled.div`
    grid-ared: shop;

    align-items: center;
    display: flex;
    justify-content: center;
`;

const StyledImg1 = styled.div`
    align-items: center;
    box-shadow: 1px 3px 5px 2px rgba(76, 75, 75, 0.3);

    display: flex;
    justify-content: center;
`;

const StyledImg2 = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    box-shadow: 1px 3px 5px 2px rgba(76, 75, 75, 0.3);
`;

const StyledImg3 = styled.div``;

const Button = styled.button`
    border-radius: 20px;
`;
const imgStyle = {};

function Home() {
    const { pathname } = useLocation();
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log("route", pathname);
    }, [pathname]);

    return (
        <>
            <div>
                <img
                    style={{ width: "50%" }}
                    src={globalize}
                    alt="första bild hamburgare"
                />
                {/* <h1>Globalize BurgerShack</h1> */}
                <Container>
                    <MenyDiv>
                        {pathname === "/menu" ? null : (
                            <Link to="/menu">
                                <img
                                    src={menytext}
                                    alt="meny"
                                    style={{ width: "50%" }}
                                />
                            </Link>
                        )}
                    </MenyDiv>
                    <StyledImg1>
                        <img
                            style={imgStyle}
                            className="d-block w-100"
                            src={food3}
                            alt="första bild hamburgare"
                        />
                    </StyledImg1>

                    <CateringDiv>
                        <h2>Vi har Catering!</h2>
                        <h3>Boka oss för;</h3>

                        <ul>
                            <li>Bröllop</li>
                            <li>AW</li>
                            <li>Företagslunch</li>
                            <li>Festivaler</li>
                            <li>Stora brötiga hemmafester</li>
                            <li>Lugna middagar</li>
                        </ul>
                        <p>Men vi är på det mesta, så</p>
                        <Link to="/book">
                            <Button>Skicka en bokningsförfrågan!</Button>
                        </Link>
                    </CateringDiv>

                    <StyledImg3>
                        <span></span>
                    </StyledImg3>

                    <ShopDiv>
                        {pathname === "/webshop" ? null : (
                            <Link to={`/webshop/${user.name}`}>
                                <img
                                    src={shoptext}
                                    alt="meny"
                                    style={{ width: "70%" }}
                                />
                            </Link>
                        )}
                    </ShopDiv>

                    <CoqDiv>
                        <h2>COQ</h2>
                        <p>
                            Foodtrucken har nishat in sig på friterad kyckling!
                        </p>

                        <p>
                            Du hittar oss vanligen vid strandstugan på skrea
                            strand, men håll utkik på vår insta, vi kan stå lite
                            vart som helst!
                        </p>
                    </CoqDiv>

                    <StyledImg2>
                        <img
                            style={imgStyle}
                            className="d-block w-100"
                            src={food1}
                            alt="andra bilden hamburgare"
                        />
                    </StyledImg2>
                </Container>
            </div>
        </>
    );
}

export default Home;
