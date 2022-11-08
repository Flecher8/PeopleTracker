import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../api/axios";

function Login() {
	const inputLogin = useRef("");
	const inputPassword = useRef("");
	useEffect(() => {}, []);
	const token =
		"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2OTc4MjYyODN9.hgb_oAHjpWdXIK6cYjjFm8v-hY5wH9CummxTjU0H121004nWGdkDdQlL5cUy54hvJBkK5nKz91K314Af2e6vag";
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};

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
				window.location.href = "/UserProfile";
			}
		} catch (err) {
			// errors that expected from back
			if (err.response?.status === 400) {
				alert("Missing Password or Login");
			} else if (err.response?.status === 401) {
				alert("Unathorized");
			} else {
				alert("Login failed");
			}
		}
	};

	return (
		<div className="d-flex justify-content-center mt-5">
			<div className="border p-2">
				<div className="display-3 text-center mb-5">Log In</div>
				<div className="d-inline-flex w-100 p-3">
					<div className="w-25 d-inline-flex">
						<h4>Login:</h4> <p className="ml-2 text-danger">*</p>
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
						<h4>Password:</h4> <p className="ml-2 text-danger">*</p>
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
						<h5>Log In</h5>
					</Button>
				</div>
				<div className="d-inline-flex justify-content-center w-100 m-2">
					<div className="p-2">Not registered yet?</div>
					<div className="p-2">
						<Link to="/Registration" className="text-decoration-none">
							Registration
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Login;
