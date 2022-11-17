import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import react components
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";

import axios from "../../api/axios";
import text from "../../services/localizationService";

function UserSubscription() {
	const minDate = new Date("2022-01-01").toISOString().split("T")[0];
	const maxDate = new Date().toISOString().split("T")[0];
	const cardNumber = useRef(0);
	const expiryDate = useRef(0);
	const securityCode = useRef(0);

	useEffect(() => {}, []);

	const submit = async e => {
		// if (checkValidDateTime()) {
		// 	await getData();
		// }
	};

	return (
		<div className="container">
			<div className="d-flex justify-content-center display-4">{text("Buy subscription")}</div>
			<div className="d-flex border border-dark w-100">
				<ProfileMenu />
			</div>
			<div className="container mt-3 border border-dark">
				<div className="d-inline-flex justify-content-center w-100">
					<h3>{text("Enter your card info to buy new subscription")}</h3>
				</div>
				<div>
					<div className="d-inline-flex justify-content-center w-100">
						<div className="w-25">{text("Card number")}:</div>
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
						<div className="w-25">{text("Card expiry date")}:</div>
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
						<div className="w-25">{text("Card security code")}:</div>
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
					<Button onClick={submit}>{text("Buy")}</Button>
				</div>
			</div>
		</div>
	);
}

export default UserSubscription;
