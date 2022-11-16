import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";
import ChangeSmartDeviceComponent from "../../components/ChangeSmartDeviceComponent/ChangeSmartDeviceComponent";

import axios from "../../api/axios";
import text from "../../services/localizationService";
import { config } from "../../services/configeService";

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

	async function getSmartDevices() {
		try {
			const response = await axios.get("/SmartDevices/", config);
			if (response.status === 200) {
				setSmartDevices(response.data);
			}
		} catch (err) {
			// errors that expected from back
			alert(text(err.response.data));
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
		if (window.confirm(text("Are you sure?"))) {
			try {
				const response = await axios.delete("/SmartDevices/" + id, config);
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
		setSmartDevice({
			userId: 0,
			placementId: 0,
			numberOfSensors: 0
		});
	}

	return (
		<div className="container">
			<div className="d-flex justify-content-center display-4">{text("Smart Devices")}</div>
			<div className="d-flex border border-dark w-100">
				<AdminMenu />
			</div>
			<div className="container mt-5" align="right">
				<Button onClick={() => addModalShow()} variant="outline-primary">
					{text("Create new smart device")}
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
					<thead>
						<tr>
							<th>{text("Id")}</th>
							<th>{text("User Id")}</th>
							<th>{text("Placement Id")}</th>
							<th>{text("Number of sensors")}</th>
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

export default AdminPanelSmartDevices;
