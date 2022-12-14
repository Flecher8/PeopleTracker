import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
import text from "../../services/localizationService";

function Login() {
	const inputLogin = useRef("");
	const inputPassword = useRef("");

	useEffect(() => {}, []);

	const login = async e => {
		e.preventDefault();
		// New updated user
		let LoginModel = {
			Login: inputLogin.current.value,
			Password: inputPassword.current.value
		};
		try {
			const response = await axios.post("/Authentication/Login", LoginModel);
			if (response.status === 200) {
				localStorage.setItem("PeopleTracker-userId", response.data.userId);
				localStorage.setItem("PeopleTracker-userType", response.data.userType);
				localStorage.setItem("PeopleTracker-userToken", response.data.token);
				if (localStorage.getItem("PeopleTracker-userType") === "User") {
					window.location.href = "/UserProfile";
				}
				if (localStorage.getItem("PeopleTracker-userType") === "Admin") {
					window.location.href = "/AdminPanelPlacements";
				}
			}
		} catch (err) {
			// errors that expected from back
			if (err.response?.status === 400) {
				alert(text("Missing Password or Login"));
			} else if (err.response?.status === 401) {
				alert(text("Unathorized"));
			} else {
				alert(text("Login failed"));
			}
		}
	};

	return (
		<div className="d-flex justify-content-center mt-5">
			<div className="border p-2">
				<div className="display-3 text-center mb-5">{text("Sign in")}</div>
				<div className="d-inline-flex w-100 p-3">
					<div className="w-25 d-inline-flex">
						<h4>{text("Login")}:</h4> <p className="ml-2 text-danger">*</p>
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
						<h4>{text("Password")}:</h4> <p className="ml-2 text-danger">*</p>
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
				<div className="w-100 text-center">
					<Button onClick={login} className="w-100 text-center">
						<h5>{text("Sign in")}</h5>
					</Button>
				</div>
				<div className="d-inline-flex justify-content-center w-100 m-2">
					<div className="p-2">{text("Not registered yet?")}</div>
					<div className="p-2">
						<Link to="/Registration" className="text-decoration-none">
							{text("Registration")}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Login;
