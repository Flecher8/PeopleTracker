import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
import text from "../../services/localizationService";

function Main() {
	return (
		<div className="container">
			<div className="d-flex justify-content-center display-4">{text("Main page")}</div>
			<div className="container mt-3 border border-dark">
				<div className="container mt-3 ">
					{/* // TODO language */}
					<h3>{text("Product description")}</h3>
					{/* // TODO language */}
					{/* MainText */}
					<p>{text("MainText")}</p>
				</div>
				<div className="container mt-5">
					{/* // TODO language */}
					<h5>{text("Smart device price")}: 10$</h5>
				</div>
				<div className="container mt-3">
					{/* // TODO language */}
					<h5>
						{text("Subscription price")}: 10$ / {text("month")}
					</h5>
				</div>
				<div className="container mt-5">
					{/* // TODO language */}
					{/* ContactsText */}
					<p>{text("ContactsText")}</p>
				</div>
			</div>
		</div>
	);
}

export default Main;
