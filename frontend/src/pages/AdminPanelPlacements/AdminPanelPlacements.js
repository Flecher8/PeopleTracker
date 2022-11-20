import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";
import ChangePlacementComponent from "../../components/ChangePlacementComponent/ChangePlacementComponent";

import axios from "../../api/axios";
import text from "../../services/localizationService";
import { config } from "../../services/configeService";

function AdminPanelPlacements() {
	const [placements, setPlacements] = useState([]);
	const [placement, setPlacement] = useState([]);

	// Modale data
	const [modaleMethod, setModaleMethod] = useState([]);
	const [modaleText, setModaleText] = useState("");
	const modaleMethodPost = "POST";
	const modaleMethodPut = "PUT";
	const [modaleTextPost, setModaleTextPost] = useState("");
	const [modaleTextPut, setModaleTextPut] = useState("");

	// Modal show
	const [changeItemModelShow, SetchangeItemModelShow] = useState(false);
	const changeItemModelHandleClose = () => SetchangeItemModelShow(false);
	const changeItemModelHandleShow = () => SetchangeItemModelShow(true);

	useEffect(() => {
		getPlacements();
		console.log(JSON.parse(localStorage["Localization"]));
		setModaleTextPost(text("Create"));
		setModaleTextPut(text("Update"));
	}, []);

	async function getPlacements() {
		try {
			const response = await axios.get("/Placements/", config);
			if (response.status === 200) {
				setPlacements(response.data);
			}
		} catch (err) {
			// errors that expected from back
			alert(text(err.response.data));
		}
	}
	// Show edit modal function
	function editModalShow(placement) {
		changeItemModelHandleShow();
		setModaleText(modaleTextPut);
		setModaleMethod(modaleMethodPut);
		setPlacement({
			id: placement.id,
			userId: placement.userId,
			name: placement.name,
			numberOfRooms: placement.numberOfRooms
		});
	}
	// Delete item function
	async function deleteClick(id) {
		if (window.confirm(text("Are you sure?"))) {
			try {
				const response = await axios.delete("/Placements/" + id, config);
				document.location.reload();
			} catch (err) {
				// errors that expected from back
				alert(text(err.response.data));
			}
		}
	}

	// Show add modal function
	function addModalShow() {
		changeItemModelHandleShow();
		setModaleText(modaleTextPost);
		setModaleMethod(modaleMethodPost);
		setPlacement({
			userId: 0,
			name: "",
			numberOfRooms: 0
		});
	}

	return (
		<div className="container">
			<div className="d-flex justify-content-center display-4">{text("Placements")}</div>
			<div className="d-flex border border-dark w-100">
				<AdminMenu />
			</div>
			<div className="container mt-5" align="right">
				<Button onClick={() => addModalShow()} variant="outline-primary">
					{text("Create new placement")}
				</Button>
			</div>
			<Modal size="lg" centered show={changeItemModelShow} onHide={changeItemModelHandleClose}>
				<ChangePlacementComponent
					close={changeItemModelHandleClose}
					placement={placement}
					method={modaleMethod}
					text={modaleText}
				/>
			</Modal>
			<div className="mt-5">
				<Table className="table table-striped auto__table text-center" striped bordered hover size="lg">
					<thead>
						<tr>
							<th>{text("Id")}</th>
							<th>{text("User Id")}</th>
							<th>{text("Name")}</th>
							<th>{text("Number of rooms")}</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{placements.map(e => (
							<tr key={e.id}>
								<td>{e.id}</td>
								<td>{e.userId}</td>
								<td>{e.name}</td>
								<td>{e.numberOfRooms}</td>
								<td>
									<Button onClick={() => editModalShow(e)} variant="outline-dark">
										{text("Edit")}
									</Button>
									<Button onClick={() => deleteClick(e.id)} variant="outline-danger">
										{text("Delete")}
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default AdminPanelPlacements;
