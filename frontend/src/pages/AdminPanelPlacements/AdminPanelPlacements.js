import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";
import ChangePlacementComponent from "../../components/ChangePlacementComponent/ChangePlacementComponent";

import axios from "../../api/axios";
import text from "../../services/localizationService";
import { config } from "../../services/configeService"; // TODO CONFIG

function AdminPanelPlacements() {
	// TODO X
	const [placements, setPlacements] = useState([]);
	const [placement, setPlacement] = useState([]);

	// Modale data
	const [modaleMethod, setModaleMethod] = useState([]);
	const [modaleText, setModaleText] = useState("");
	const modaleMethodPost = "POST";
	const modaleMethodPut = "PUT";
	const modaleTextPost = "Create";
	const modaleTextPut = "Update";

	// Modal show
	const [changeItemModelShow, SetchangeItemModelShow] = useState(false);
	const changeItemModelHandleClose = () => SetchangeItemModelShow(false);
	const changeItemModelHandleShow = () => SetchangeItemModelShow(true);

	useEffect(() => {
		// TODO X
		getPlacements();
		console.log(text("Contacts"));
	}, []);

	// TODO X
	async function getPlacements() {
		try {
			const response = await axios.get("/Placements/", config);
			if (response.status === 200) {
				setPlacements(response.data);
			}
		} catch (err) {
			// errors that expected from back
			alert(err.response.data);

			// TODO language
		}
	}
	// TODO X
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
	// TODO X
	// Delete item function
	async function deleteClick(id) {
		// TODO language
		if (window.confirm("Are you sure?")) {
			try {
				const response = await axios.delete("/Placements/" + id, config);
				document.location.reload();
			} catch (err) {
				// errors that expected from back
				alert(err.response.data);
				// TODO language
			}
		}
	}
	// TODO X
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
			{/* // TODO language */}
			{/* // TODO X */}
			<div className="d-flex justify-content-center display-4">Placements</div>
			<div className="d-flex border border-dark w-100">
				<AdminMenu />
			</div>
			<div className="container mt-5" align="right">
				{/* // TODO language */}
				<Button onClick={() => addModalShow()} variant="outline-primary">
					{/* // TODO X */}
					Create new placement
				</Button>
			</div>
			<Modal size="lg" centered show={changeItemModelShow} onHide={changeItemModelHandleClose}>
				{/* // TODO X */}
				<ChangePlacementComponent
					close={changeItemModelHandleClose}
					placement={placement}
					method={modaleMethod}
					text={modaleText}
				/>
			</Modal>
			<div className="mt-5">
				<Table className="table table-striped auto__table text-center" striped bordered hover size="lg">
					{/* // TODO language */}
					{/* // TODO X */}
					<thead>
						<tr>
							<th>Id</th>
							<th>User Id</th>
							<th>Name</th>
							<th>Number of rooms</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{/* // TODO X */}
						{placements.map(e => (
							<tr key={e.id}>
								<td>{e.id}</td>
								<td>{e.userId}</td>
								<td>{e.name}</td>
								<td>{e.numberOfRooms}</td>
								<td>
									{/* // TODO language */}
									<Button onClick={() => editModalShow(e)} variant="outline-dark">
										Edit
									</Button>
									{/* // TODO language */}
									<Button onClick={() => deleteClick(e.id)} variant="outline-danger">
										Delete
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
