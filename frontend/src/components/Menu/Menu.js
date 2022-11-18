import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
import text from "../../services/localizationService";

function Menu() {
	useEffect(() => {
		if (localStorage.getItem("Localization") === null) {
			getLocalization();
		}
	}, []);

	async function getLocalization() {
		try {
			const response = await axios.get("/Languages/");
			if (response.status === 200) {
				localStorage.setItem("Localization", JSON.stringify(response.data));
				localStorage.setItem("LocalizationType", "EN");
				window.location.reload();
			}
		} catch (err) {
			// errors that expected from back
			alert(text(err.response.data));
		}
	}

	async function localizationUA() {
		try {
			const response = await axios.get("/Languages?Ui-culture=uk-UA");
			if (response.status === 200) {
				localStorage.setItem("Localization", JSON.stringify(response.data));
				localStorage.setItem("LocalizationType", "UA");
				window.location.reload();
			}
		} catch (err) {
			// errors that expected from back
			alert(text(err.response.data));
		}
	}

	async function localizationEN() {
		try {
			const response = await axios.get("/Languages?Ui-culture=en-US");
			if (response.status === 200) {
				localStorage.setItem("Localization", JSON.stringify(response.data));
				localStorage.setItem("LocalizationType", "EN");
				window.location.reload();
			}
		} catch (err) {
			// errors that expected from back
			alert(text(err.response.data));
		}
	}

	function LastElementOfMenu() {
		console.log(localStorage);
		if (localStorage.getItem("PeopleTracker-userId") !== null) {
			if (localStorage.getItem("PeopleTracker-userType") === "User") {
				return (
					<Link to="/UserProfile" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white w-100">{text("Profile")}</Button>
					</Link>
				);
			}
			if (localStorage.getItem("PeopleTracker-userType") === "Admin") {
				return (
					<Link to="/AdminPanelPlacements" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white w-100">{text("Admin Panel")}</Button>
					</Link>
				);
			}
		} else {
			return (
				<Link to="/Login" className="text-decoration-none text-reset">
					<Button className="btn btn-dark border border-white w-100">{text("Sign in")}</Button>
				</Link>
			);
		}
		return (
			<Link to="/Login" className="text-decoration-none text-reset">
				<Button className="btn btn-dark border border-white w-100">{text("Sign in")}</Button>
			</Link>
		);
	}
	return (
		<div className="Menu">
			<div className="d-inline-flex justify-content-center border w-100 p-3 mb-2 bg-dark text-white">
				<div className="d-flex justify-content-beetween w-50">
					<div className="mr-2">
						<Link to="/Main" className="text-decoration-none text-reset">
							<Button className="btn btn-dark border border-white w-100">{text("Main")}</Button>
						</Link>
					</div>
					<div className="mr-2">
						<Link to="/Contacts" className="text-decoration-none text-reset">
							<Button className="btn btn-dark border border-white w-100">{text("Contacts")}</Button>
						</Link>
					</div>
				</div>
				<div className="d-flex justify-content-end w-25">
					<div className="dropdown m-0 mr-2">
						<button
							className="btn dropdown-toggle btn-dark border border-white"
							type="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false">
							{localStorage.getItem("LocalizationType")}
						</button>
						<div className="dropdown-menu p-0" aria-labelledby="dropdownMenuButton">
							<Button onClick={() => localizationEN()} className="btn btn-dark border border-white w-100">
								EN
							</Button>
							<Button onClick={() => localizationUA()} className="btn btn-dark border border-white w-100">
								UA
							</Button>
						</div>
					</div>
					<div className="mr-2">{LastElementOfMenu()}</div>
				</div>
			</div>
		</div>
	);
}

export default Menu;
