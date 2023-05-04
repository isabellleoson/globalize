import styled from "styled-components";

function Menu() {
  return (
    <>
      <Container>
        <h1>Meny</h1>
        <P>Alla burgers går att få vegetariska</P>

        <ul>
          <li>
            <Heading>CHEESEBURGER</Heading>
            <p>115g BEEF, 2xCHEDDAR, HOMEMADE KETCHUP, PICKLES</p>
            <p>Enkel 104kr Dubbel 134kr</p>
          </li>
          <li>
            <Heading>BIG O</Heading>
            <p>
              115g BEEF, 2xCHEDDAR, KARAMELLISERAD LÖK, TRYFFEL, MAYO, SALLAD
            </p>
            <p>Enkel 104kr Dubbel 134kr</p>
          </li>
          <li>
            <Heading>OG</Heading>
            <p>115g BEEF, 2xCHEDDAR, TOMAT, RÖDLÖK, OG DRESSING, SALLAD</p>

            <p>Enkel 104kr Dubbel 134kr</p>
          </li>

          <li>
            <Heading>BUDDHA</Heading>

            <p>
              115g BEEF, 2xCHEDDAR, LIME-SYRAD RÖDLÖK, BUDDHA DRESSING, SALLAD
            </p>
            <p>Enkel 104kr Dubbel 134kr</p>
          </li>
          <li>
            <Heading>KRISPY</Heading>

            <p>115g BEEF, 2xCHEDDAR, BBQ-SÅS, MAYO, ROSTAD LÖK, SALLAD</p>
            <p>Enkel 104kr Dubbel 134kr</p>
          </li>

          <li>
            <Heading>KAHUNA</Heading>

            <p>
              115g BEEF, 2xCHEDDAR, RÖDLÖK, ANANASKETCHUP, CREME FRAICHE, SALLAD
            </p>
            <p>Enkel 104kr Dubbel 134kr</p>
          </li>
        </ul>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: rgba(255, 236, 236, 0.9);
  padding: 20px;
`;

const Heading = styled.div`
  font-weight: bold;
`;

const P = styled.div`
  padding: 30px;
`;

export default Menu;
