import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../api/axios";

function ProfileMenu() {
	return (
		<div className="d-inline-flex w-100">
			<div className="d-inline-flex justify-content-start  align-items-stretch flex-nowrap w-100">
				<div className="">
					<Link to="/" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">Profile</Button>
					</Link>
				</div>
				<div className="">
					<Link to="/" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">Placements</Button>
					</Link>
				</div>
				<div className="">
					<Link to="/" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">Statistics</Button>
					</Link>
				</div>
			</div>
			<div className="d-inline-flex justify-content-start  flex-wrap w-100">
				<div className="">
					<Link to="/" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">Smart Device</Button>
					</Link>
				</div>
				<div className="">
					<Link to="/" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">Subscription</Button>
					</Link>
				</div>
				<div className="">
					<Link to="/" className="text-decoration-none text-reset">
						<Button className="btn btn-dark border border-white">Sign Out</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ProfileMenu;
