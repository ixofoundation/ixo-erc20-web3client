import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const ProjectWalletInput = ({
	projectDid,
	handelProjectDidChange,
	handleCreateProjectWallet,
	handleGetProjectWalletAddress
}) => (
	<Container>
		<Label>Project DID</Label>
		<LongInputField type={'string'} value={projectDid} onChange={handelProjectDidChange} />
		<Button onClick={handleCreateProjectWallet}>Create Project Wallet</Button>
		<Button onClick={handleGetProjectWalletAddress}>Get Project Wallet</Button>
	</Container>
);
ProjectWalletInput.propTypes = {
	projectDid: PropTypes.string.isRequired,
	handelProjectDidChange: PropTypes.func.isRequired,
	handleCreateProjectWallet: PropTypes.func.isRequired,
	handleGetProjectWalletAddress: PropTypes.func.isRequired
};
export default ProjectWalletInput;
