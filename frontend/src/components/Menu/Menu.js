import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../api/axios";

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
			alert(err.response.data);

			// TODO language
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
			alert(err.response.data);

			// TODO language
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
			alert(err.response.data);

			// TODO language
		}
	}

	function LastElementOfMenu() {
		console.log(localStorage);
		if (localStorage.getItem("PeopleTracker-userId") !== null) {
			if (localStorage.getItem("PeopleTracker-userType") === "User") {
				// TODO language

				return (
					<Link to="/UserProfile" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white w-100">Profile</Button>
					</Link>
				);
			}
			if (localStorage.getItem("PeopleTracker-userType") === "Admin") {
				// TODO language
				return (
					<Link to="/AdminPanelPlacements" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white w-100">Admin Panel</Button>
					</Link>
				);
			}
		} else {
			// TODO language
			return (
				<Link to="/Login" className="text-decoration-none text-reset">
					<Button className="btn btn-dark border border-white w-100">LogIn</Button>
				</Link>
			);
		}
		// TODO language
		return (
			<Link to="/Login" className="text-decoration-none text-reset">
				<Button className="btn btn-dark border border-white w-100">LogIn</Button>
			</Link>
		);
	}
	return (
		<div className="Menu">
			<div className="d-inline-flex justify-content-center border w-100 p-3 mb-2 bg-dark text-white">
				<div className="d-flex justify-content-beetween w-50">
					<div className="mr-2">
						{/* // TODO language  */}
						<Link to="/Main" className="text-decoration-none text-reset">
							<Button className="btn btn-dark border border-white w-100">Main</Button>
						</Link>
					</div>
					<div className="mr-2">
						{/* // TODO language  */}
						<Link to="/SmartDevice" className="text-decoration-none text-reset">
							<Button className="btn btn-dark border border-white w-100">SmartDevice</Button>
						</Link>
					</div>
					<div className="mr-2">
						{/* // TODO language  */}
						<Link to="/MobileApp" className="text-decoration-none text-reset">
							<Button className="btn btn-dark border border-white w-100">Mobile</Button>
						</Link>
					</div>
					<div className="mr-2">
						{/* // TODO language  */}
						<Link to="/Developers" className="text-decoration-none text-reset">
							<Button className="btn btn-dark border border-white w-100">Developers</Button>
						</Link>
					</div>
				</div>
				{/* // TODO language  */}
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
						{/* // TODO language  */}
						{/* // TODO language  */}
						<div className="dropdown-menu p-0" aria-labelledby="dropdownMenuButton">
							<Button onClick={() => localizationEN()} className="btn btn-dark border border-white w-100">
								EN
							</Button>
							<Button onClick={() => localizationUA()} className="btn btn-dark border border-white w-100">
								UA
							</Button>
						</div>
					</div>
					{/* // TODO language  */}
					<div className="mr-2">{LastElementOfMenu()}</div>
				</div>
			</div>
		</div>
	);
}

export default Menu;
