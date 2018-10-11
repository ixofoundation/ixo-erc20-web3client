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
    width: 1450px;
    margin-left: 5px;
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

const Checkbox = styled.input`
    margin: auto;
    font-size: 14px;
`;

const SigningInput = ({ quantity, handleQuantityChange, beneficiaryAddress, handleBeneficiaryAddressChange, handleTokenMinting }) => (
  <Container>
    <Label>
        base64
    </Label>    
    <Checkbox
		type={"checkbox"} 
	/>
    <LongInputField
        value={beneficiaryAddress} 
        onChange={handleBeneficiaryAddressChange} />
    <Button onClick={handleTokenMinting}>Sign</Button>
  </Container>
);
SigningInput.propTypes = {
    beneficiaryAddress: PropTypes.string.isRequired,
    handleBeneficiaryAddressChange: PropTypes.func.isRequired,
    handleTokenMinting: PropTypes.func.isRequired
};
export default SigningInput;