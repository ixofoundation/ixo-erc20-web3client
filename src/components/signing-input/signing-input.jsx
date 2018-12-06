import React from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";

const Container = styled.div`
    display: flex;
    background-color: lightblue;
    margin: auto;
`;

const InputField = styled.textarea`
  width: 75px;
  color: black;
  background: lightgrey;
  border: 1px solid black;
  border-radius: 2.5px;
  margin: auto;
  font-size: 14px;
`;

const LongInputField = styled(InputField)`
    width: 1000px;
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

const SigningInput = ({ encodingIsBase64, handleBase64EncodingChange, messageToSign, handleMessageToSignChange, handleSignMessage }) => (
  <Container>
    <Label>
        base64
    </Label>    
    <Checkbox
		type={"checkbox"} 
        onChange={handleBase64EncodingChange}
        defaultChecked={encodingIsBase64}
	/>
    <LongInputField
        rows="5"
        value={messageToSign} 
        onChange={handleMessageToSignChange} />
    <Button onClick={handleSignMessage}>Sign</Button>
  </Container>
);
SigningInput.propTypes = {
    encodingIsBase64: PropTypes.bool.isRequired,
    handleBase64EncodingChange: PropTypes.func.isRequired,
    messageToSign: PropTypes.string.isRequired,
    handleMessageToSignChange: PropTypes.func.isRequired,
    handleSignMessage: PropTypes.func.isRequired
};
export default SigningInput;