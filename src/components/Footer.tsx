import copywrite from "../assets/copyright.svg";

function Footer() {
  const footerStyle = {
    padding: "100px",
  };
  return (
    <>
      <div style={footerStyle}>
        <h1>Kontakt</h1>
        <p>Adress: Beach House, Klittervägen 90, Falkenberg</p>
        <p>Telefon: 0346-80114</p>
      </div>

      <div style={{ marginBottom: "50px", padding: "20px" }}>
        <img src={copywrite} alt="" style={{ width: "3%" }} />
        {" Isabell Leoson 2023"}
      </div>
    </>
  );
}

export default Footer;
