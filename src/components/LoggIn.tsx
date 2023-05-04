import { useState, useEffect } from "react";
import { Formik } from "formik";

import closeIcon from "../images/close.png";

import styled from "styled-components";

interface Props {
  onLogin: (username: string) => void;
  closeModal: () => void;
  onSubmit?: (values: { username: string }) => void;
}

function LoggIn(props: Props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    if (!usernameInput) {
      setIsOpen(true);
    }
  }, [usernameInput]);
  console.log(modalIsOpen);

  function handleLogIn(values: { username: string }) {
    props.onLogin(values.username);
    setUsernameInput("");
    props.closeModal();
  }

  return (
    <>
      <StyledModal>
        <StyledClosing>
          <img
            src={closeIcon}
            alt="Close menu"
            style={{ width: "3%", height: "3%", cursor: "pointer" }}
            onClick={props.closeModal}
          />
        </StyledClosing>

        <h1>Logga in</h1>
        <Formik
          initialValues={{
            username: "",
          }}
          onSubmit={handleLogIn}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Namn..."
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
              </label>

              <Button
                onClick={() => handleLogIn({ username: usernameInput })}
                disabled={isSubmitting}
                type="submit"
              >
                Logga in
              </Button>
            </form>
          )}
        </Formik>
      </StyledModal>
    </>
  );
}

const StyledClosing = styled.div`
  align-items: end;
  display: flex;
  flex-direction: column;
  img {
    transition: transform 0.1s ease-in-out;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const StyledModal = styled.div`
  background-color: rgba(255, 236, 236, 0.8);
  display: flex;
  flex-direction: column;
  margin: 50px;
`;

const Button = styled.button`
  border-radius: 20px;
  margin: 10px;
`;

export default LoggIn;
