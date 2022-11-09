import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../api/axios";

import Login from "../Login/Login.js";

function Registration() {
	const inputLogin = useRef("");
	const inputPassword = useRef("");
	const inputPasswordRepeat = useRef("");
	const inputEmail = useRef("");
	const inputCompanyName = useRef("");

	function passworCorrect() {
		if (inputPassword.current.value == inputPasswordRepeat.current.value) {
			return true;
		}
		return false;
	}

	function isAllRequiredFieldsAreFilled() {
		if (
			inputLogin.current.value === "" ||
			inputPassword.current.value === "" ||
			inputPasswordRepeat.current.value === ""
		) {
			return false;
		}
		return true;
	}

	const register = async e => {
		e.preventDefault();
		if (!passworCorrect()) {
			alert("Password is not the same"); // TODO language
			return;
		}
		if (!isAllRequiredFieldsAreFilled()) {
			alert("Not all required fields are filled"); // TODO language
			return;
		}
		// New updated user
		let User = {
			Login: inputLogin.current.value,
			Password: inputPassword.current.value,
			Email: inputEmail.current.value,
			CompanyName: inputCompanyName.current.value,
			Type: "User"
		};
		try {
			const response = await axios.post("/Authentication/Registration", User);
			if (response.status === 200) {
				window.location.href = "/Login";
			}
		} catch (err) {
			// errors that expected from back
			alert(err.response.data); // TODO language
		}
	};

	return (
		<div className="d-flex justify-content-center mt-5">
			<div className="border p-2 w-50">
				{/* // TODO language  */}
				<div className="display-3 text-center mb-5">Registration</div>
				<div className="d-inline-flex w-100 p-3">
					<div className="w-25 d-inline-flex">
						{/* // TODO language  */}
						<h6>Login:</h6> <p className="ml-2 text-danger">*</p>
					</div>
					<div className="w-75">
						<InputGroup className="mb-3">
							<FormControl
								aria-label="Default"
								placeholder="login"
								type="text"
								size="sm"
								maxLength="50"
								ref={inputLogin}
								aria-describedby="inputGroup-sizing-default"
							/>
						</InputGroup>
					</div>
				</div>
				<div className="d-inline-flex w-100 p-3">
					<div className="w-25 d-inline-flex">
						{/* // TODO language  */}
						<h6>Password:</h6> <p className="ml-2 text-danger">*</p>
					</div>
					<div className="w-75">
						<InputGroup className="mb-3">
							<FormControl
								aria-label="Default"
								placeholder="*****"
								type="password"
								maxLength="50"
								size="sm"
								ref={inputPassword}
								aria-describedby="inputGroup-sizing-default"
							/>
						</InputGroup>
					</div>
				</div>
				<div className="d-inline-flex w-100 p-3">
					<div className="w-25 d-inline-flex">
						{/* // TODO language  */}
						<h6>Repeat password:</h6> <p className="ml-2 text-danger">*</p>
					</div>
					<div className="w-75">
						<InputGroup className="mb-3">
							<FormControl
								aria-label="Default"
								placeholder="*****"
								type="password"
								maxLength="50"
								size="sm"
								ref={inputPasswordRepeat}
								aria-describedby="inputGroup-sizing-default"
							/>
						</InputGroup>
					</div>
				</div>
				<div className="d-inline-flex w-100 p-3">
					<div className="w-25">
						{/* // TODO language  */}
						<h6>Email:</h6>
					</div>
					<div className="w-75">
						<InputGroup className="mb-3">
							<FormControl
								aria-label="Default"
								placeholder="user@gmail.com"
								type="email"
								maxLength="150"
								size="sm"
								ref={inputEmail}
								aria-describedby="inputGroup-sizing-default"
							/>
						</InputGroup>
					</div>
				</div>
				<div className="d-inline-flex w-100 p-3">
					<div className="w-25">
						{/* // TODO language  */}
						<h6>Company name:</h6>
					</div>
					<div className="w-75">
						<InputGroup className="mb-3">
							<FormControl
								aria-label="Default"
								placeholder="user@gmail.com"
								type="text"
								maxLength="50"
								size="sm"
								ref={inputCompanyName}
								aria-describedby="inputGroup-sizing-default"
							/>
						</InputGroup>
					</div>
				</div>
				<div className="w-100 text-center">
					<Button onClick={register} className="w-100 text-center">
						{/* // TODO language  */}
						<h5>Register</h5>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Registration;
