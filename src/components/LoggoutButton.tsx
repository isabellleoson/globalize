import { useContext } from "react";
import { UserContext } from "../UserContext";

import styled from "styled-components";

const LoggoutButton = () => {
  const { loggOut } = useContext(UserContext);

  const handleLoggOut = () => {
    loggOut();
  };

  return (
    <div>
      <Button onClick={handleLoggOut}>Logga ut </Button>
    </div>
  );
};

const Button = styled.button`
  background-color: rgba(255, 236, 236, 0.8);
  box-shadow: none;
  font-size: 0.7rem;

  &:hover {
    background-color: rgba(255, 236, 236, 0.8);
    font-size: 0.8rem;
  }
`;

export default LoggoutButton;
