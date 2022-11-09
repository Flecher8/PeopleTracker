import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import ProfileMenu from "../ProfileMenu/ProfileMenu";

import axios from "../../api/axios";

function VisitsPlacementComponent(props) {
	const startDate = useRef(new Date());
	const startTime = useRef(new Date());
	const endDate = useRef(new Date());
	const endTime = useRef(new Date());

	const [visits, setVisits] = useState(null);

	useEffect(() => {}, []);

	const config = {
		headers: { Authorization: `Bearer ${localStorage["PeopleTracker-userToken"]}` }
	};

	function getDateTime(date, time) {
		return date.toString() + "T" + time.toString();
	}

	function checkValidDate() {
		if (startDate.current.value === "" || endDate.current.value === "") {
			return false;
		}
		if (new Date(startDate.current.value.toString()) > new Date(endDate.current.value.toString())) {
			return false;
		}
		return true;
	}

	function checkValidTime() {
		let timeStart = new Date();
		timeStart.setHours(startTime.current.value.split(":")[0]);
		timeStart.setMinutes(startTime.current.value.split(":")[1]);

		let timeEnd = new Date();
		timeEnd.setHours(endTime.current.value.split(":")[0]);
		timeEnd.setMinutes(endTime.current.value.split(":")[1]);

		if (startTime.current.value === "" || endTime.current.value === "") {
			return false;
		}
		if (timeStart >= timeEnd) {
			return false;
		}
		return true;
	}

	function checkValidDateTime() {
		// TODO Доделать проверку даты и времени!!!
		let timeStart = Date.parse(getDateTime(startDate.current.value, startTime.current.value));
		let timeEnd = Date.parse(getDateTime(endDate.current.value, endTime.current.value));
		if (startTime.current.value === "" || endTime.current.value === "") {
			return false;
		}
		if (timeStart >= timeEnd) {
			return false;
		}
		return true;
	}

	async function getUserPlacements() {
		let TimePeriod = {
			StartDateTime: getDateTime(startDate, startTime),
			EndDateTime: getDateTime(endDate, endTime)
		};
		try {
			const response = await axios.post(
				"/Placements/GetNumberOfVisitsPlacementByTimePeriod/placementId:" + props.placementId,
				config
			);
			if (response.status === 200) {
				console.log(response.data);
			}
		} catch (err) {
			// errors that expected from back
			alert(err.response.data);

			// TODO language
		}
	}

	const close = async e => {
		props.state();
	};

	const submit = async e => {
		checkValidDateTime();
	};
	return (
		<div className="container m-2">
			{/* // TODO language */}
			<div className="d-flex justify-content-end">
				<Button onClick={close}>Close</Button>
			</div>
			<div className="d-flex justify-content-center">
				<h5>View visits of placement by period of time</h5>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				<div className="w-25">Start date:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="login"
						type="date"
						size="sm"
						ref={startDate}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100 mb-5">
				<div className="w-25">Start time:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="login"
						type="time"
						size="sm"
						ref={startTime}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				<div className="w-25">End date:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="login"
						type="date"
						size="sm"
						ref={endDate}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100 mb-5">
				<div className="w-25">End time:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="login"
						type="time"
						size="sm"
						ref={endTime}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			{visits != null ? (
				<div className="d-inline-flex justify-content-start w-100 mb-5">
					<div className="w-25">
						<h3>Visits:</h3>
					</div>
				</div>
			) : (
				<div></div>
			)}
			<div className="d-inline-flex justify-content-start w-100 mb-5">
				<Button onClick={submit}>Find</Button>
			</div>
		</div>
	);
}

export default VisitsPlacementComponent;
