import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";

import axios from "../../api/axios";
import text from "../../services/localizationService";
import { config } from "../../services/configeService";

function ChangeSmartDeviceComponent(props) {
	const numberOfSensors = useRef(0);
	const userId = useRef(0);
	const placementId = useRef(0);

	useEffect(() => {
		setNewValue();
	}, []);

	function setNewValue() {
		numberOfSensors.current.value = props.smartDevice.numberOfSensors;
		userId.current.value = props.smartDevice.userId;
		placementId.current.value = props.smartDevice.placementId;
	}

	function createNewPlacement(method) {
		if (method === "POST") {
			let smartDevice = {
				userId: Number(userId.current.value),
				placementId: placementId.current.value,
				numberOfSensors: Number(numberOfSensors.current.value)
			};
			return smartDevice;
		}
		if (method === "PUT") {
			let smartDevice = {
				id: props.smartDevice.id,
				userId: Number(userId.current.value),
				placementId: placementId.current.value,
				numberOfSensors: Number(numberOfSensors.current.value)
			};
			return smartDevice;
		}
		return null;
	}

	async function changeSmartDevices() {
		try {
			if (props.method === "POST") {
				const response = await axios.post("/SmartDevice/", createNewPlacement(props.method), config);
				if (response.status === 201) {
					props.close();
					window.location.reload();
				}
			}
			if (props.method === "PUT") {
				const response = await axios.put(
					"/SmartDevice/" + props.smartDevice.id,
					createNewPlacement(props.method),
					config
				);
				if (response.status === 200) {
					props.close();
					window.location.reload();
				}
			}
		} catch (err) {
			// errors that expected from back
			alert(text(err.response.data));
		}
	}

	const close = async e => {
		props.close();
	};

	const submit = async e => {
		await changeSmartDevices();
	};

	return (
		<div className="container">
			<div className="d-flex justify-content-end">
				<Button onClick={close}>{text("Close")}</Button>
			</div>
			<div className="d-flex justify-content-center mb-3">
				<h5>{props.text}</h5>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				<div className="w-25">{text("User Id")}:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="1"
						type="number"
						size="sm"
						ref={userId}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				<div className="w-25">{text("Placement Id")}:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="Name"
						type="number"
						size="sm"
						ref={placementId}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				<div className="w-25">{text("Number of sensors")}:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="12"
						type="number"
						size="sm"
						ref={numberOfSensors}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-start w-100 mb-5">
				<Button onClick={submit}>{props.text}</Button>
			</div>
		</div>
	);
}

export default ChangeSmartDeviceComponent;
