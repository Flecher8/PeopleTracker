import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
import text from "../../services/localizationService";

function Main() {
	useEffect(() => {}, []);

	const submit = async e => {
		// if (checkValidDateTime()) {
		// 	await getData();
		// }
	};

	return (
		<div className="container">
			<div className="d-flex justify-content-center display-4">{text("Main page")}</div>
			<div className="container mt-3 border border-dark">
				{/* // TODO language */}
				<h3>Done by Vladyslav Bocharov</h3>
				{/* // TODO language */}
				<h5>Email: vladyslav.bocharov@nure.ua</h5>
			</div>
		</div>
	);
}

export default Main;
