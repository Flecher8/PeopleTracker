import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
import text from "../../services/localizationService";

function ProfileMenu() {
	function clearUserInfo() {
		localStorage.removeItem("PeopleTracker-userId");
		localStorage.removeItem("PeopleTracker-userToken");
		localStorage.removeItem("PeopleTracker-userType");
	}

	const signOut = async e => {
		e.preventDefault();
		clearUserInfo();
		window.location = "/Main";
	};
	return (
		<div className="d-inline-flex w-100 p-3">
			<div className="d-inline-flex justify-content-start flex-wrap w-100">
				<div className="">
					<Link to="/UserProfile" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">{text("Profile")}</Button>
					</Link>
				</div>
				<div className="mr-auto">
					<Link to="/UserPlacements" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">{text("Placements")}</Button>
					</Link>
				</div>
				<div className="">
					<Link to="/UserSmartDevice" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">{text("Smart Device")}</Button>
					</Link>
				</div>
				<div className="mr-auto">
					<Link to="/UserSubscription" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">{text("Subscription")}</Button>
					</Link>
				</div>
				<div className="">
					<Link to="/" className="text-decoration-none text-reset">
						<Button onClick={signOut} className="btn btn-dark border border-white">
							{text("Sign Out")}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ProfileMenu;
