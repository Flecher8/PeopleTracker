import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
import text from "../../services/localizationService";

function Contacts() {
	return (
		<div className="container">
			<div className="d-flex justify-content-center display-4">{text("Contacts")}</div>
			<div className="container mt-3 border border-dark">
				{/* // TODO language */}
				<h3>
					{text("Done by")} {text("Vladyslav Bocharov")}
				</h3>
				{/* // TODO language */}
				<h5>{text("Email")}: vladyslav.bocharov@nure.ua</h5>
			</div>
		</div>
	);
}

export default Contacts;
