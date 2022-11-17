import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import text from "../../services/localizationService";

function AdminMenu() {
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
					<Link to="/AdminPanelPlacements" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">{text("Placements")}</Button>
					</Link>
				</div>
				<div className="">
					<Link to="/AdminPanelRooms" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">{text("Rooms")}</Button>
					</Link>
				</div>
				<div className="">
					<Link to="/AdminPanelSmartDevices" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">{text("Smart Device")}</Button>
					</Link>
				</div>

				<div className="mr-auto">
					<Link to="/AdminPanelSensors" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">{text("Sensors")}</Button>
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

export default AdminMenu;
