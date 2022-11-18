import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";

import axios from "../../api/axios";
import text from "../../services/localizationService";
import { config } from "../../services/configeService";

function ChangeRoomComponent(props) {
	const placementId = useRef();
	const name = useRef();
	const numberOfPeopleInRoom = 0;
	const [isExit, setIsExit] = useState("");

	useEffect(() => {
		placementId.current.value = props.room.placementId;
		name.current.value = props.room.name;
		setNewValue();
	}, []);

	function setNewValue() {
		setIsExit(props.room.isExit);
	}

	function createNewRoom(method) {
		if (method === "POST") {
			let room = {
				placementId: Number(placementId.current.value),
				name: name.current.value,
				numberOfPeopleInRoom: numberOfPeopleInRoom,
				isExit: isExit === "true" ? true : false
			};
			return room;
		}
		if (method === "PUT") {
			let room = {
				id: props.room.id,
				placementId: Number(placementId.current.value),
				name: name.current.value,
				numberOfPeopleInRoom: numberOfPeopleInRoom,
				isExit: isExit === "true" ? true : false
			};
			return room;
		}
		return null;
	}

	async function changeRooms() {
		try {
			if (props.method === "POST") {
				const response = await axios.post("/Rooms/", createNewRoom(props.method), config);
				if (response.status === 201) {
					props.close();
					window.location.reload();
				}
			}
			if (props.method === "PUT") {
				const response = await axios.put("/Rooms/" + props.room.id, createNewRoom(props.method), config);
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
		await changeRooms();
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
				<div className="w-50">{text("Placement Id")}:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="1"
						type="number"
						size="sm"
						ref={placementId}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				<div className="w-50">{text("Name")}:</div>
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
			<div className="d-inline-flex justify-content-center w-100">
				<div className="w-50">{text("Is exit")}:</div>
				<InputGroup className="mb-3">
					<Form.Select onChange={e => setIsExit(e.target.value)} size="lg">
						<option defaultValue="selected">{isExit}</option>
						<option>{isExit === "true" ? "false" : "true"}</option>
					</Form.Select>
				</InputGroup>
			</div>

			<div className="d-inline-flex justify-content-start w-100 mb-5">
				<Button onClick={submit}>{props.text}</Button>
			</div>
		</div>
	);
}

export default ChangeRoomComponent;
