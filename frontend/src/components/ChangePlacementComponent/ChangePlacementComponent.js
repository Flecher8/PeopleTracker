import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";

import axios from "../../api/axios";
import text from "../../services/localizationService";
import { config } from "../../services/configeService";

function ChangePlacementComponent(props) {
	const numberOfRooms = useRef(0);
	const userId = useRef(0);
	const name = useRef("");

	useEffect(() => {
		setNewValue();
	}, []);

	function setNewValue() {
		numberOfRooms.current.value = props.placement.numberOfRooms;
		userId.current.value = props.placement.userId;
		name.current.value = props.placement.name;
	}

	function createNewPlacement(method) {
		if (method === "POST") {
			let placement = {
				userId: Number(userId.current.value),
				name: name.current.value,
				numberOfRooms: Number(numberOfRooms.current.value)
			};
			return placement;
		}
		if (method === "PUT") {
			let placement = {
				id: props.placement.id,
				userId: Number(userId.current.value),
				name: name.current.value,
				numberOfRooms: Number(numberOfRooms.current.value)
			};
			return placement;
		}
		return null;
	}

	async function changePlacements() {
		try {
			if (props.method === "POST") {
				const response = await axios.post("/Placements/", createNewPlacement(props.method), config);
				if (response.status === 201) {
					props.close();
					window.location.reload();
				}
			}
			if (props.method === "PUT") {
				const response = await axios.put(
					"/Placements/" + props.placement.id,
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
		await changePlacements();
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
				{/* // TODO language */}
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
				{/* // TODO language */}
				<div className="w-25">{text("Name")}:</div>
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
				<div className="w-25">{text("Number Of Rooms")}:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="12"
						type="number"
						size="sm"
						ref={numberOfRooms}
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

export default ChangePlacementComponent;
