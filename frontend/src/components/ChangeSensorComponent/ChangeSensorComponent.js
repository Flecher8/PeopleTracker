import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";

import axios from "../../api/axios";
import { config } from "../../services/configeService";

function ChangeSensorComponent(props) {
	const smartDeviceId = useRef(0);
	const leftSensorId = useRef(0);
	const rightSensorId = useRef(0);
	const leftRoomId = useRef(0);
	const rightRoomId = useRef(0);
	const pinNumber = useRef(0);
	const name = useRef("");

	useEffect(() => {
		setNewValue();
	}, []);

	function setNewValue() {
		smartDeviceId.current.value = props.sensor.smartDeviceId;
		leftSensorId.current.value = props.sensor.leftSensorId;
		rightSensorId.current.value = props.sensor.rightSensorId;
		leftRoomId.current.value = props.sensor.leftRoomId;
		rightRoomId.current.value = props.sensor.rightRoomId;
		pinNumber.current.value = props.sensor.pinNumber;
		name.current.value = props.sensor.name;
	}

	function createNewSensor(method) {
		if (method === "POST") {
			let sensor = {
				smartDeviceId: Number(smartDeviceId.current.value),
				leftSensorId: Number(leftSensorId.current.value),
				rightSensorId: Number(rightSensorId.current.value),
				leftRoomId: Number(leftRoomId.current.value),
				rightRoomId: Number(rightRoomId.current.value),
				pinNumber: Number(pinNumber.current.value),
				name: name.current.value
			};
			return sensor;
		}
		if (method === "PUT") {
			let sensor = {
				id: props.sensor.id,
				smartDeviceId: Number(smartDeviceId.current.value),
				leftSensorId: Number(leftSensorId.current.value),
				rightSensorId: Number(rightSensorId.current.value),
				leftRoomId: Number(leftRoomId.current.value),
				rightRoomId: Number(rightRoomId.current.value),
				pinNumber: Number(pinNumber.current.value),
				name: name.current.value
			};
			return sensor;
		}
		return null;
	}

	async function changeSensors() {
		try {
			if (props.method === "POST") {
				const response = await axios.post("/Sensors/", createNewSensor(props.method), config);
				if (response.status === 201) {
					props.close();
					window.location.reload();
				}
			}
			if (props.method === "PUT") {
				const response = await axios.put("/Sensors/" + props.sensor.id, createNewSensor(props.method), config);
				if (response.status === 200) {
					props.close();
					window.location.reload();
				}
			}
		} catch (err) {
			// errors that expected from back
			alert(err.response.data);

			// TODO language
		}
	}

	const close = async e => {
		props.close();
	};

	const submit = async e => {
		await changeSensors();
	};

	return (
		<div className="container">
			<div className="d-flex justify-content-end">
				{/* // TODO language */}

				<Button onClick={close}>Close</Button>
			</div>
			<div className="d-flex justify-content-center mb-3">
				{/* // TODO language */}
				<h5>{props.text}</h5>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				{/* // TODO language */}
				<div className="w-25">Smart Device Id:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="1"
						type="number"
						size="sm"
						ref={smartDeviceId}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				{/* // TODO language */}
				<div className="w-25">Left Sensor Id:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="1"
						type="number"
						size="sm"
						ref={leftSensorId}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				{/* // TODO language */}
				<div className="w-25">Right Sensor Id:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="1"
						type="number"
						size="sm"
						ref={rightSensorId}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				{/* // TODO language */}
				<div className="w-25">Left Room Id:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="1"
						type="number"
						size="sm"
						ref={leftRoomId}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				{/* // TODO language */}
				<div className="w-25">Right Room Id:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="1"
						type="number"
						size="sm"
						ref={rightRoomId}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				{/* // TODO language */}
				<div className="w-25">Pin Number:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="1"
						type="number"
						size="sm"
						ref={pinNumber}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				{/* // TODO language */}
				<div className="w-25">Name:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="Name"
						type="text"
						size="sm"
						ref={name}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-start w-100 mb-5">
				{/* // TODO language */}
				<Button onClick={submit}>{props.text}</Button>
			</div>
		</div>
	);
}

export default ChangeSensorComponent;
