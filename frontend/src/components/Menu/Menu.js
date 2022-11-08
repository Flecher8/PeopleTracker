import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

function Menu() {
	function LastElementOfMenu() {
		if (localStorage.getItem("PeopleTracker-userId") !== null) {
			if (localStorage.getItem("PeopleTracker-userType") === "User") {
				return (
					<Link to="/UserProfile" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white w-100">Profile</Button>
					</Link>
				);
			}
			if (localStorage.getItem("PeopleTracker-userType") === "Admin") {
				return (
					<Link to="/AdminPanel" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white w-100">Admin Panel</Button>
					</Link>
				);
			}
		} else {
			return (
				<Link to="/Login" className="text-decoration-none text-reset">
					<Button className="btn btn-dark border border-white w-100">Log In</Button>
				</Link>
			);
		}
		return (
			<Link to="/Login" className="text-decoration-none text-reset">
				<Button className="btn btn-dark border border-white w-100">Log In</Button>
			</Link>
		);
	}
	return (
		<div className="Menu">
			<div className="d-inline-flex justify-content-around border w-100 p-3 mb-2 bg-dark text-white">
				<div className="d-flex justify-content-around w-50">
					<div>
						<Link to="/Main" className="text-decoration-none text-reset">
							<Button className="btn btn-dark border border-white w-100">Main</Button>
						</Link>
					</div>
					<div>
						<Link to="/SmartDevice" className="text-decoration-none text-reset">
							<Button className="btn btn-dark border border-white w-100">Smart Device</Button>
						</Link>
					</div>
					<div>
						<Link to="/MobileApp" className="text-decoration-none text-reset">
							<Button className="btn btn-dark border border-white w-100">Mobile app</Button>
						</Link>
					</div>
					<div>
						<Link to="/Developers" className="text-decoration-none text-reset">
							<Button className="btn btn-dark border border-white w-100">Developers</Button>
						</Link>
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
