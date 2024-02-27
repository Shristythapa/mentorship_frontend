// PasswordResetSuccess.js

import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const SuccessContainer = styled.div`
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const SuccessHeader = styled.h2`
  color: #4caf50;

`;

const SuccessText = styled.p`
  color: #333;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: #2196f3;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

const PasswordResetSuccess = () => {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <SuccessHeader>Password Reset Successful</SuccessHeader>
      <br></br>
      <SuccessText>
        Your password has been reset successfully. You can now log in with your
        new password.
      </SuccessText>
      <br></br>
      <p>
        Back to <StyledLink to="/login">Login</StyledLink>
      </p>
    </div>
  );
};

export default PasswordResetSuccess;
