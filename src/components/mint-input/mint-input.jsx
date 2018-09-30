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
    padding: 0px 5px;
    display: flex;
    align-items: center;
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

const MintInput = ({ quantity, handleQuantityChange, beneficiaryAddress, handleBeneficiaryAddressChange, handleTokenMinting }) => (
  <Container>
    <Label>Distribute</Label>
    <InputField
        type={"number"} 
        value={quantity} 
        onChange={handleQuantityChange} 
        step={10000} min={0} />
    <Label>to</Label>
    <LongInputField
        value={beneficiaryAddress} 
        onChange={handleBeneficiaryAddressChange} />
    <Button onClick={handleTokenMinting}>Mint</Button>
  </Container>
);
MintInput.propTypes = {
    quantity: PropTypes.number.isRequired,
    handleQuantityChange: PropTypes.func.isRequired,
    beneficiaryAddress: PropTypes.string.isRequired,
    handleBeneficiaryAddressChange: PropTypes.func.isRequired,
    handleTokenMinting: PropTypes.func.isRequired
};
export default MintInput;