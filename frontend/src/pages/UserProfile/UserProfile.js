import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";

import axios from "../../api/axios";

function UserProfile() {
	const [user, setUser] = useState([]);

	useEffect(() => {
		getUser();
	}, []);

	const config = {
		headers: { Authorization: `Bearer ${localStorage["PeopleTracker-userToken"]}` }
	};

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
		<div className="section">
			<div className="display-4">Profile</div>
			<div>
				<ProfileMenu />
			</div>
			<div className="ProfileInfo">
				<div className="">
					<div>
						<h5>Email:</h5>
					</div>
					<div></div>
				</div>
				<div className="">
					<div>
						<h5>Company:</h5>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
}

export default UserProfile;
