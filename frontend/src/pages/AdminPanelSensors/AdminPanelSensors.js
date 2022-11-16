import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";
import ChangeSensorComponent from "../../components/ChangeSensorComponent/ChangeSensorComponent";

import axios from "../../api/axios";
import text from "../../services/localizationService";
import { config } from "../../services/configeService";

function AdminPanelSensors() {
	const [sensors, setSensors] = useState([]);
	const [sensor, setSensor] = useState([]);

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
		getSensors();
	}, []);

	async function getSensors() {
		try {
			const response = await axios.get("/Sensors/", config);
			if (response.status === 200) {
				setSensors(response.data);
			}
		} catch (err) {
			// errors that expected from back
			alert(text(err.response.data));
		}
	}

	// Show edit modal function
	function editModalShow(sensor) {
		changeItemModelHandleShow();
		setModaleText(modaleTextPut);
		setModaleMethod(modaleMethodPut);
		setSensor({
			id: sensor.id,
			smartDeviceId: sensor.smartDeviceId,
			leftSensorId: sensor.leftSensorId,
			rightSensorId: sensor.rightSensorId,
			leftRoomId: sensor.leftRoomId,
			rightRoomId: sensor.rightRoomId,
			pinNumber: sensor.pinNumber,
			name: sensor.name
		});
	}

	// Delete item function
	async function deleteClick(id) {
		if (window.confirm(text("Are you sure?"))) {
			try {
				const response = await axios.delete("/Sensors/" + id, config);
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
		setSensor({
			smartDeviceId: 0,
			leftSensorId: 0,
			rightSensorId: 0,
			leftRoomId: 0,
			rightRoomId: 0,
			pinNumber: 0,
			name: ""
		});
	}

	return (
		<div className="container">
			<div className="d-flex justify-content-center display-4">{text("Sensors")}</div>
			<div className="d-flex border border-dark w-100">
				<AdminMenu />
			</div>
			<div className="container mt-5" align="right">
				<Button onClick={() => addModalShow()} variant="outline-primary">
					{text("Create new sensor")}
				</Button>
			</div>
			<Modal size="lg" centered show={changeItemModelShow} onHide={changeItemModelHandleClose}>
				<ChangeSensorComponent
					close={changeItemModelHandleClose}
					sensor={sensor}
					method={modaleMethod}
					text={modaleText}
				/>
			</Modal>
			<div className="mt-5">
				<Table className="table table-striped auto__table text-center" striped bordered hover size="lg">
					{/* // TODO language */}
					<thead>
						<tr>
							<th>{text("Id")}</th>
							<th>{text("Smart Device Id")}</th>
							<th>{text("Left Sensor Id")}</th>
							<th>{text("Right Sensor Id")}</th>
							<th>{text("Left Room Id")}</th>
							<th>{text("Right Room Id")}</th>
							<th>{text("Pin Number")}</th>
							<th>{text("Name")}</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{sensors.map(e => (
							<tr key={e.id}>
								<td>{e.id}</td>
								<td>{e.smartDeviceId}</td>
								<td>{e.leftSensorId}</td>
								<td>{e.rightSensorId}</td>
								<td>{e.leftRoomId}</td>
								<td>{e.rightRoomId}</td>
								<td>{e.pinNumber}</td>
								<td>{e.name}</td>
								<td>
									{/* // TODO language */}
									<Button onClick={() => editModalShow(e)} variant="outline-dark">
										{text("Edit")}
									</Button>
									{/* // TODO language */}
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

export default AdminPanelSensors;
