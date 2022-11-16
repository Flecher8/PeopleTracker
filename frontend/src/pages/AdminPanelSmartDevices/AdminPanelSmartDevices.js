import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";
import ChangeSmartDeviceComponent from "../../components/ChangeSmartDeviceComponent/ChangeSmartDeviceComponent";

import axios from "../../api/axios";

function AdminPanelSmartDevices() {
	const [smartDevices, setSmartDevices] = useState([]);
	const [smartDevice, setSmartDevice] = useState([]);

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
		getSmartDevices();
	}, []);

	const config = {
		headers: { Authorization: `Bearer ${localStorage["PeopleTracker-userToken"]}` }
	};

	async function getSmartDevices() {
		try {
			const response = await axios.get("/SmartDevices/", config);
			if (response.status === 200) {
				setSmartDevices(response.data);
			}
		} catch (err) {
			// errors that expected from back
			alert(err.response.data);

			// TODO language
		}
	}

	// Show edit modal function
	function editModalShow(smartDevice) {
		changeItemModelHandleShow();
		setModaleText(modaleTextPut);
		setModaleMethod(modaleMethodPut);
		setSmartDevice({
			id: smartDevice.id,
			userId: smartDevice.userId,
			placementId: smartDevice.placementId,
			numberOfSensors: smartDevice.numberOfSensors
		});
	}

	// Delete item function
	async function deleteClick(id) {
		// TODO language
		if (window.confirm("Are you sure?")) {
			try {
				const response = await axios.delete("/SmartDevices/" + id, config);
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
		setSmartDevice({
			userId: 0,
			placementId: 0,
			numberOfSensors: 0
		});
	}

	return (
		<div className="container">
			{/* // TODO language */}
			<div className="d-flex justify-content-center display-4">Smart Devices</div>
			<div className="d-flex border border-dark w-100">
				<AdminMenu />
			</div>
			<div className="container mt-5" align="right">
				{/* // TODO language */}
				<Button onClick={() => addModalShow()} variant="outline-primary">
					Create new smart device
				</Button>
			</div>
			<Modal size="lg" centered show={changeItemModelShow} onHide={changeItemModelHandleClose}>
				<ChangeSmartDeviceComponent
					close={changeItemModelHandleClose}
					smartDevice={smartDevice}
					method={modaleMethod}
					text={modaleText}
				/>
			</Modal>
			<div className="mt-5">
				<Table className="table table-striped auto__table text-center" striped bordered hover size="lg">
					{/* // TODO language */}
					<thead>
						<tr>
							<th>Id</th>
							<th>User Id</th>
							<th>Placement Id</th>
							<th>Number of sensors</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{smartDevices.map(e => (
							<tr key={e.id}>
								<td>{e.id}</td>
								<td>{e.userId}</td>
								<td>{e.placementId}</td>
								<td>{e.numberOfSensors}</td>
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

export default AdminPanelSmartDevices;
