import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../api/axios";

function VisitsRoomComponent(props) {
	const minDate = new Date("2022-01-01").toISOString().split("T")[0];
	const maxDate = new Date().toISOString().split("T")[0];
	const startDate = useRef(new Date());
	const startTime = useRef(new Date());
	const endDate = useRef(new Date());
	const endTime = useRef(new Date());
	// Value that will be returned after axios post request
	const [visits, setVisits] = useState(null);

	useEffect(() => {}, []);

	const config = {
		headers: { Authorization: `Bearer ${localStorage["PeopleTracker-userToken"]}` }
	};
	// -----------------------------
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
		if (startTime.current.value === "" || endTime.current.value === "") {
			// TODO language
			alert("Time is not filled");
			return false;
		}
		if (startDate.current.value === "" || endDate.current.value === "") {
			// TODO language
			alert("Date is not filled");
			return false;
		}
		let stringStartTime = getDateTime(startDate.current.value, startTime.current.value);
		let stringEndTime = getDateTime(endDate.current.value, endTime.current.value);
		let timeStart = Date.parse(stringStartTime);
		let timeEnd = Date.parse(stringEndTime);
		if (timeStart >= timeEnd) {
			// TODO language
			alert("Start point in time starts after end point in time, please correct your time");
			return false;
		}
		return true;
	}
	// -----------------------------
	async function getNumberOfVisitsRoomByTimePeriod() {
		let TimePeriod = {
			StartDateTime: getDateTime(startDate.current.value, startTime.current.value),
			EndDateTime: getDateTime(endDate.current.value, endTime.current.value)
		};
		/*
			axios requests :
			argument : StartDateTime, EndDateTime
			returns: roomId, count (number of visits room by time period)
		*/
		try {
			const response = await axios.post(
				"/Rooms/GetNumberOfVisitsRoomByTimePeriod/roomId:" + props.roomId,
				TimePeriod,
				config
			);
			if (response.status === 200) {
				if (response.data.value != null) {
					setVisits(response.data.value.count);
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
		if (checkValidDateTime()) {
			await getNumberOfVisitsRoomByTimePeriod();
		}
	};
	return (
		<div className="container m-2">
			<div className="d-flex justify-content-end">
				{/* // TODO language */}
				<Button onClick={close}>Close</Button>
			</div>
			<div className="d-flex justify-content-center mb-3">
				{/* // TODO language */}
				<h5>View visits of room by period of time</h5>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				{/* // TODO language */}
				<div className="w-25">Start date:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="login"
						type="date"
						size="sm"
						ref={startDate}
						min={minDate}
						max={maxDate}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100 mb-5">
				{/* // TODO language */}
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
				{/* // TODO language */}
				<div className="w-25">End date:</div>
				<InputGroup className="mb-3">
					<FormControl
						aria-label="Default"
						placeholder="login"
						type="date"
						size="sm"
						ref={endDate}
						min={minDate}
						max={maxDate}
						aria-describedby="inputGroup-sizing-default"
					/>
				</InputGroup>
			</div>
			<div className="d-inline-flex justify-content-center w-100 mb-5">
				{/* // TODO language */}
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
					<div className="w-100">
						{/* // TODO language */}
						<h5>Number of people visited room: {visits}</h5>
					</div>
				</div>
			) : (
				<div></div>
			)}
			<div className="d-inline-flex justify-content-start w-100 mb-5">
				{/* // TODO language */}
				<Button onClick={submit}>Find</Button>
			</div>
		</div>
	);
}

export default VisitsRoomComponent;
