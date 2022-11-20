import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";
import ChangeRoomComponent from "../../components/ChangeRoomComponent/ChangeRoomComponent";

import axios from "../../api/axios";
import text from "../../services/localizationService";
import { config } from "../../services/configeService";

function AdminPanelRooms() {
	const [rooms, setRooms] = useState([]);
	const [room, setRoom] = useState([]);

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
		getRooms();
		setModaleTextPost(text("Create"));
		setModaleTextPut(text("Update"));
	}, []);

	async function getRooms() {
		try {
			const response = await axios.get("/Rooms/", config);
			if (response.status === 200) {
				setRooms(response.data);
			}
		} catch (err) {
			// errors that expected from back
			alert(text(err.response.data));
		}
	}

	// Show edit modal function
	function editModalShow(room) {
		changeItemModelHandleShow();
		setModaleText(modaleTextPut);
		setModaleMethod(modaleMethodPut);
		setRoom({
			id: room.id,
			placementId: room.placementId,
			name: room.name,
			numberOfPeopleInRoom: room.numberOfPeopleInRoom,
			isExit: room.isExit.toString()
		});
	}

	// Delete item function
	async function deleteClick(id) {
		if (window.confirm(text("Are you sure?"))) {
			try {
				const response = await axios.delete("/Rooms/" + id, config);
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
		setRoom({
			placementId: 0,
			name: "",
			numberOfPeopleInRoom: 0,
			isExit: "false"
		});
	}
	return (
		<div className="container">
			<div className="d-flex justify-content-center display-4">{text("Rooms")}</div>
			<div className="d-flex border border-dark w-100">
				<AdminMenu />
			</div>
			<div className="container mt-5" align="right">
				<Button onClick={() => addModalShow()} variant="outline-primary">
					{text("Create new room")}
				</Button>
			</div>
			<Modal size="lg" centered show={changeItemModelShow} onHide={changeItemModelHandleClose}>
				<ChangeRoomComponent
					close={changeItemModelHandleClose}
					room={room}
					method={modaleMethod}
					text={modaleText}
				/>
			</Modal>
			<div className="mt-5">
				<Table className="table table-striped auto__table text-center" striped bordered hover size="lg">
					<thead>
						<tr>
							<th>{text("Id")}</th>
							<th>{text("Placement Id")}</th>
							<th>{text("Name")}</th>
							<th>{text("Number of people in room")}</th>
							<th>{text("Is exit")}</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{rooms.map(e => (
							<tr key={e.id}>
								<td>{e.id}</td>
								<td>{e.placementId}</td>
								<td>{e.name}</td>
								<td>{e.numberOfPeopleInRoom}</td>
								<td>{e.isExit.toString()}</td>
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

export default AdminPanelRooms;
