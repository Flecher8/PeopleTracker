import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";

function AdminPanelRooms() {
	return (
		<div className="container">
			<div className="d-flex justify-content-center display-4">Placements</div>
			<div className="d-flex border border-dark w-100">
				<AdminMenu />
			</div>
		</div>
	);
}

export default AdminPanelRooms;
