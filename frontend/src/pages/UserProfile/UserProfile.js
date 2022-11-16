import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";

import axios from "../../api/axios";
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
			alert(err.response.data);

			// TODO language
		}
	}

	return (
		<div className="container">
			{/* // TODO language  */}
			<div className="d-flex justify-content-center display-4">Profile</div>
			<div className="d-flex border border-dark w-100">
				<ProfileMenu />
			</div>
			<div className="ProfileInfo container mt-3">
				<div className="d-flex justify-content-center">
					{/* // TODO language  */}
					<h4>Information about user</h4>
				</div>
				<div className="d-flex">
					<div>
						{/* // TODO language  */}
						<h5>Email:</h5>
					</div>
					<div className="ml-3">{user.email}</div>
				</div>
				<div className="d-inline-flex">
					<div>
						{/* // TODO language  */}
						<h5>Company:</h5>
					</div>
					<div className="ml-3">{user.companyName}</div>
				</div>
			</div>
		</div>
	);
}

export default UserProfile;
