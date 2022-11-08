import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

function Menu() {
	function LastElementOfMenu() {
		if (localStorage.getItem("PeopleTracker-user") !== null) {
			if (localStorage.getItem("PeopleTracker-userRole") === "user") {
				return (
					<Button className="btn btn-dark border border-white w-100" to="/UserProfile">
						Profile
					</Button>
				);
			}
			if (localStorage.getItem("PeopleTracker-userRole") === "admin") {
				return (
					<Button className="btn btn-dark border border-white w-100" to="/AdminPanel">
						Profile
					</Button>
				);
			}
		} else {
			return (
				<Button className="btn btn-dark border border-white w-100" to="/Login">
					Log In
				</Button>
			);
		}
		return (
			<Button className="btn btn-dark border border-white w-100" to="/Login">
				LogIn
			</Button>
		);
	}
	return (
		<div className="Menu">
			<div className="d-inline-flex justify-content-around border w-100 p-3 mb-2 bg-dark text-white">
				<div className="d-flex justify-content-around w-50">
					<div>
						<Button className="btn btn-dark border border-white w-100">Main</Button>
					</div>
					<div>
						<Button className="btn btn-dark border border-white w-100">Smart Device</Button>
					</div>
					<div>
						<Button className="btn btn-dark border border-white w-100">Mobile app</Button>
					</div>
					<div>
						<Button className="btn btn-dark border border-white w-100">Developers</Button>
					</div>
				</div>
				<div className="d-flex justify-content-around w-25">
					<div className="dropdown m-0">
						<button
							className="btn dropdown-toggle btn-dark border border-white"
							type="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false">
							EN
						</button>
						<div className="dropdown-menu p-0" aria-labelledby="dropdownMenuButton">
							<Button className="btn btn-dark border border-white w-100">EN</Button>
							<Button className="btn btn-dark border border-white w-100">UKR</Button>
						</div>
					</div>
					<div>{LastElementOfMenu()}</div>
				</div>
			</div>
		</div>
	);
}

export default Menu;
