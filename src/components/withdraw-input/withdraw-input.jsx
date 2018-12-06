import React from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";

const Container = styled.div`
    display: flex;
    background-color: lightblue;
    height: 35px;
    margin: auto;
`;

const InputField = styled.input`
  height: 25px;
  width: 75px;
  color: black;
  background: lightgrey;
  border: 1px solid black;
  border-radius: 2.5px;
  margin: auto;
  font-size: 14px;
`;

const LongInputField = styled(InputField)`
    width: 350px;
`;

const Label = styled.div`
    display: flex;
    align-items: center;
    font: 15px arial, sans-serif;
`;

const Button = styled.button`
    margin: auto 5px;
    height: 25px;
    min-width: 50px;
    color: azure;
    background: blue;
    border: 3px;
    border-radius: 2.5px;
    font-size: 14px;
`;

const WithdrawInput = ({ projectDid, handleProjectDidChange, handleTokenWithdrawal }) => (
  <Container>
    <Label>Withdraw from Project: </Label>
    <LongInputField
        value={projectDid} 
        onChange={handleProjectDidChange} />
    <Button onClick={handleTokenWithdrawal}>Request</Button>
  </Container>
);
WithdrawInput.propTypes = {
    projectDid: PropTypes.string.isRequired,
    handleProjectDidChange: PropTypes.func.isRequired,
    handleTokenWithdrawal: PropTypes.func.isRequired
};
export default WithdrawInput;