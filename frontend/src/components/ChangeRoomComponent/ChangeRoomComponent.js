import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";

import axios from "../../api/axios";

function ChangeRoomComponent(props) {
	const placementId = useRef();
	const name = useRef();
	const numberOfPeopleInRoom = useRef(0);
	const [isExit, setIsExit] = useState("");

	const config = {
		headers: { Authorization: `Bearer ${localStorage["PeopleTracker-userToken"]}` }
	};

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
				numberOfPeopleInRoom: Number(0),
				isExit: isExit === "true" ? true : false
			};
			return room;
		}
		if (method === "PUT") {
			let room = {
				id: props.room.id,
				placementId: Number(placementId.current.value),
				name: name.current.value,
				numberOfPeopleInRoom: Number(0),
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
			alert(err.response.data);

			// TODO language
		}
	}

	const close = async e => {
		props.close();
	};

	const submit = async e => {
		//console.log(createNewRoom("POST"));
		await changeRooms();
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
				<div className="w-50">Placement Id:</div>
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
				{/* // TODO language */}
				<div className="w-50">Name:</div>
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
				{/* // TODO language */}
				<div className="w-50">Is exit:</div>
				<InputGroup className="mb-3">
					<Form.Select onChange={e => setIsExit(e.target.value)} size="lg">
						<option defaultValue="selected">{isExit}</option>
						<option>{isExit === "true" ? "false" : "true"}</option>
					</Form.Select>
				</InputGroup>
			</div>

			<div className="d-inline-flex justify-content-start w-100 mb-5">
				{/* // TODO language */}
				<Button onClick={submit}>{props.text}</Button>
			</div>
		</div>
	);
}

export default ChangeRoomComponent;
