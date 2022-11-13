import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu/AdminMenu";

import axios from "../../api/axios";

function AdminPanelPlacements() {
	const [placements, setPlacements] = useState([]);
	const [placement, setPlacement] = useState([]);

	useEffect(() => {
		getPlacements();
	}, []);

	const config = {
		headers: { Authorization: `Bearer ${localStorage["PeopleTracker-userToken"]}` }
	};

	async function getPlacements() {
		try {
			const response = await axios.get("/Placements/", config);
			if (response.status === 200) {
				console.log(response.data);
				setPlacements(response.data);
			}
		} catch (err) {
			// errors that expected from back
			alert(err.response.data);

			// TODO language
		}
	}

	// Show edit modal function
	function editModalShow(exercise) {
		//editHandleShow();
		//setExercise(exercise);
	}

	// Delete item function
	async function deleteClick(id) {
		// TODO language
		if (window.confirm("Are you sure?")) {
			try {
				const response = await axios.delete("/Placements/" + id, config);
			} catch (err) {
				// errors that expected from back
				alert(err.response.data);

				// TODO language
			}
		}
	}

	// Show add modal function
	function addModalShow() {
		// addHandleShow();
		// setExercise({
		// 	Id: undefined,
		// 	Section: "",
		// 	Name: "",
		// 	Length: 0,
		// 	Instructions: "",
		// 	ImageName: "",
		// 	BurntCalories: 0,
		// 	NumberOfReps: 0
		// });
	}

	return (
		<div className="container">
			<div className="d-flex justify-content-center display-4">Placements</div>
			<div className="d-flex border border-dark w-100">
				<AdminMenu />
			</div>
			<div className="container mt-5" align="right">
				<Button onClick={() => addModalShow()} variant="outline-primary">
					Create new placement
				</Button>
			</div>
			<div className="mt-5">
				<Table className="table table-striped auto__table text-center" striped bordered hover size="lg">
					<thead>
						<tr>
							<th>UserId</th>
							<th>Name</th>
							<th>NumberOfRooms</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{placements.map(e => (
							<tr key={e.id}>
								<td>{e.userId}</td>
								<td>{e.name}</td>
								<td>{e.numberOfRooms}</td>
								<td>
									<Button onClick={() => editModalShow(e)} variant="outline-dark">
										Edit
									</Button>
									<Button onClick={() => deleteClick(e.Id)} variant="outline-danger">
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

export default AdminPanelPlacements;
