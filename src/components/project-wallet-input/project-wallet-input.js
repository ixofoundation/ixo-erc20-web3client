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
	erc20ContractAddress,
	handleTokenAddressChange,
	authContractAddress,
	handleAuthAddressChange,
	projectName,
	handelProjectNameChange,
	handleCreateProjectWallet
}) => (
	<Container>
		<Label>Token Address</Label>
		<LongInputField type={'string'} value={erc20ContractAddress} onChange={handleTokenAddressChange} />
		<Label>Auth Address</Label>
		<LongInputField type={'string'} value={authContractAddress} onChange={handleAuthAddressChange} />
		<Label>Project Name</Label>
		<LongInputField type={'string'} value={projectName} onChange={handelProjectNameChange} />
		<Button onClick={handleCreateProjectWallet}>Create Project Wallet</Button>
	</Container>
);
ProjectWalletInput.propTypes = {
	erc20ContractAddress: PropTypes.string.isRequired,
	handleTokenAddressChange: PropTypes.func.isRequired,
	authContractAddress: PropTypes.string.isRequired,
	handleAuthAddressChange: PropTypes.func.isRequired,
	projectName: PropTypes.string.isRequired,
	handelProjectNameChange: PropTypes.func.isRequired,
	handleCreateProjectWallet: PropTypes.func.isRequired
};
export default ProjectWalletInput;
