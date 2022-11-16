import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";
import ChangeRoomComponent from "../../components/ChangeRoomComponent/ChangeRoomComponent";

import axios from "../../api/axios";

function AdminPanelRooms() {
	const [rooms, setRooms] = useState([]);
	const [room, setRoom] = useState([]);

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
		getRooms();
	}, []);

	const config = {
		headers: { Authorization: `Bearer ${localStorage["PeopleTracker-userToken"]}` }
	};

	async function getRooms() {
		try {
			const response = await axios.get("/Rooms/", config);
			if (response.status === 200) {
				setRooms(response.data);
			}
		} catch (err) {
			// errors that expected from back
			alert(err.response.data);

			// TODO language
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
		// TODO language
		if (window.confirm("Are you sure?")) {
			try {
				const response = await axios.delete("/Rooms/" + id, config);
				document.location.reload();
			} catch (err) {
				// errors that expected from back
				alert(err.response.data);
				// TODO language
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
			{/* // TODO language */}
			<div className="d-flex justify-content-center display-4">Rooms</div>
			<div className="d-flex border border-dark w-100">
				<AdminMenu />
			</div>
			<div className="container mt-5" align="right">
				{/* // TODO language */}
				<Button onClick={() => addModalShow()} variant="outline-primary">
					Create new room
				</Button>
			</div>
			<Modal size="lg" centered show={changeItemModelShow} onHide={changeItemModelHandleClose}>
				{/* // TODO X */}
				<ChangeRoomComponent
					close={changeItemModelHandleClose}
					room={room}
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
							<th>PlacementId</th>
							<th>Name</th>
							<th>NumberOfPeopleInRoom</th>
							<th>isExit</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{/* // TODO X */}
						{rooms.map(e => (
							<tr key={e.id}>
								<td>{e.placementId}</td>
								<td>{e.name}</td>
								<td>{e.numberOfPeopleInRoom}</td>
								<td>{e.isExit.toString()}</td>
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

export default AdminPanelRooms;
