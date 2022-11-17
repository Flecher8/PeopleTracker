import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";

import axios from "../../api/axios";
import text from "../../services/localizationService";
import { config } from "../../services/configeService";

function UserProfile() {
	const [user, setUser] = useState([]);

	useEffect(() => {
		getUser();
	}, []);

	async function getUser() {
		try {
			const response = await axios.get("/Users/" + localStorage["PeopleTracker-userId"], config);
			if (response.status === 200) {
				setUser(response.data);
			}
		} catch (err) {
			// errors that expected from back
			alert(text(err.response.data));
		}
	}

	return (
		<div className="container">
			<div className="d-flex justify-content-center display-4">{text("Profile")}</div>
			<div className="d-flex border border-dark w-100">
				<ProfileMenu />
			</div>
			<div className="ProfileInfo container mt-3">
				<div className="d-flex justify-content-center">
					<h4>{text("Information about user")}</h4>
				</div>
				<div className="d-flex">
					<div>
						<h5>{text("Email")}:</h5>
					</div>
					<div className="ml-3">{user.email}</div>
				</div>
				<div className="d-inline-flex">
					<div>
						{/* // TODO language  */}
						<h5>{text("Company name")}:</h5>
					</div>
					<div className="ml-3">{user.companyName}</div>
				</div>
			</div>
		</div>
	);
}

export default UserProfile;
