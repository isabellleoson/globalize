import { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import Modal from "react-modal";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import styled from "styled-components";

interface Values {
  name: string;
  phone: number;
  mail: string;
  message: string;
}

function Booking() {
  const [name, setName] = useState(""),
    [phone, setPhone] = useState(""),
    [mail, setMail] = useState(""),
    [message, setMessage] = useState(""),
    [showConfirmation, setShowConfirmation] = useState(false),
    [startDate, setStartDate] = useState(new Date());
  const [showReservationModal, setShowReservationModal] = useState(false);

  const handleDateChange = (startDate: Date) => {
    setStartDate(startDate);
  };

  return (
    <>
      <h1>Boka Catering</h1>
      {showConfirmation && (
        <Modal isOpen={showReservationModal}>
          <div>
            <h2>Tack för din bokningsförfrågan!</h2>
            <p>Vi kontaktar dig snarast</p>
            <p>Reservation:</p>
            <p>Namn: {name}</p>
            <p>Email: {mail}</p>
            <p>Telefonnummer: {phone}</p>
            <p>Valt datum: {startDate.toString()}</p>
            <p>Meddelande: {message}</p>
          </div>
          <button onClick={() => setShowReservationModal(false)}>Stäng</button>
        </Modal>
      )}
      <Formik
        initialValues={{
          name: "",
          mail: "",
          phone: 0,
          message: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 3000);
          const recipient = "isabell.leoson@gmail.com";
          const subject = "Bokning";
          const body = `Reservation:
                  Namn: ${values.name},
                  Email: ${values.mail},
                  Telefonnummer: ${values.phone},
                  Valt datum: ${startDate},
                  Meddelande: ${values.message}
                `;

          const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(body)}`;

          setShowConfirmation(true);
          setShowReservationModal(true);

          // Rensar inputfälten
          setTimeout(() => {
            setName("");
            setPhone("");
            setMail("");
            setMessage("");
            setStartDate(new Date());
          }, 30000);

          window.location.href = mailtoLink;

          setSubmitting(true);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Container>
            <form onSubmit={handleSubmit}>
              <Label>
                <div className="datetimepicker-container">
                  <DatePickerStyled
                    selected={startDate}
                    onChange={handleDateChange}
                  />
                </div>
              </Label>

              <Label>
                <input
                  placeholder="Namn..."
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Label>
              <Label>
                <input
                  placeholder="Email..."
                  value={mail}
                  onChange={(event) => setMail(event.target.value)}
                />
              </Label>
              <Label>
                <input
                  placeholder="Telefonnummer..."
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Label>
              <Label>
                <textarea
                  placeholder="Skriv här.."
                  cols={20}
                  rows={10}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                ></textarea>
              </Label>
              <Label>
                <Button disabled={isSubmitting} type="submit">
                  Skicka bokningsförfrågan
                </Button>
              </Label>
            </form>
          </Container>
        )}
      </Formik>
    </>
  );
}

const DatePickerStyled = styled(DatePicker)`
  font-size: 16px;

  &:focus {
    outline: none;
    border: 1px solid orange;
  }
`;

const Button = styled.button`
  border-radius: 20px;
  margin: 10px;
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  padding: 10px;
`;

export default Booking;
