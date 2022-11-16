import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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
					{/* // TODO language  */}
					<Link to="/AdminPanelPlacements" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">Placements</Button>
					</Link>
				</div>
				<div className="">
					{/* // TODO language  */}
					<Link to="/AdminPanelRooms" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">Rooms</Button>
					</Link>
				</div>
				<div className="">
					{/* // TODO language  */}
					<Link to="/AdminPanelSmartDevices" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">Smart Device</Button>
					</Link>
				</div>

				<div className="mr-auto">
					{/* // TODO language  */}
					<Link to="/AdminPanelSensors" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">Sensors</Button>
					</Link>
				</div>
				<div className="">
					{/* // TODO language  */}
					<Link to="/" className="text-decoration-none text-reset">
						<Button onClick={signOut} className="btn btn-dark border border-white">
							Sign Out
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default AdminMenu;
