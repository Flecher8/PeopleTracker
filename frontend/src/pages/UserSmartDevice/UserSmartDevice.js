import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import react components
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";

import axios from "../../api/axios";

function UserSmartDevice() {
	const minDate = new Date("2022-01-01").toISOString().split("T")[0];
	const maxDate = new Date().toISOString().split("T")[0];
	const cardNumber = useRef(0);
	const expiryDate = useRef(0);
	const securityCode = useRef(0);
	const config = {
		headers: { Authorization: `Bearer ${localStorage["PeopleTracker-userToken"]}` }
	};

	useEffect(() => {}, []);

	const submit = async e => {
		// if (checkValidDateTime()) {
		// 	await getData();
		// }
	};

	return (
		<div className="container">
			{/* // TODO language */}
			<div className="d-flex justify-content-center display-4">Buy Smart Device</div>
			<div className="d-flex border border-dark w-100">
				<ProfileMenu />
			</div>
			<div className="container mt-3 border border-dark">
				<div className="d-inline-flex justify-content-center w-100">
					<h3>Enter your card info to buy new smart device</h3>
				</div>
				<div>
					<div className="d-inline-flex justify-content-center w-100">
						{/* // TODO language */}
						<div className="w-25">Card number:</div>
						<InputGroup className="mb-3">
							<FormControl
								aria-label="Default"
								placeholder="1234567890"
								pattern="^[0-9]+$"
								maxLength="10"
								type="text"
								size="sm"
								ref={cardNumber}
								aria-describedby="inputGroup-sizing-default"
							/>
						</InputGroup>
					</div>
				</div>
				<div>
					<div className="d-inline-flex justify-content-center w-100">
						{/* // TODO language */}
						<div className="w-25">Card expiry date:</div>
						<InputGroup className="mb-3">
							<FormControl
								aria-label="Default"
								placeholder="1234567890"
								pattern="^[0-9]+$"
								maxLength="10"
								type="date"
								size="sm"
								ref={expiryDate}
								min={minDate}
								max={maxDate}
								aria-describedby="inputGroup-sizing-default"
							/>
						</InputGroup>
					</div>
				</div>
				<div>
					<div className="d-inline-flex justify-content-center w-100">
						{/* // TODO language */}
						<div className="w-25">Card security code:</div>
						<InputGroup className="mb-3">
							<FormControl
								aria-label="Default"
								placeholder="123"
								pattern="^[0-9]+$"
								maxLength="3"
								type="text"
								size="sm"
								ref={securityCode}
								aria-describedby="inputGroup-sizing-default"
							/>
						</InputGroup>
					</div>
				</div>
				<div className="d-inline-flex justify-content-start w-100 mb-5">
					{/* // TODO language */}
					<Button onClick={submit}>Buy</Button>
				</div>
			</div>
		</div>
	);
}

export default UserSmartDevice;
