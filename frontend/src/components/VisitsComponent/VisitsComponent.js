import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";

import axios from "../../api/axios";
import text from "../../services/localizationService";
import { config } from "../../services/configeService";

function VisitsComponent(props) {
	const minDate = new Date("2022-01-01").toISOString().split("T")[0];
	const maxDate = new Date().toISOString().split("T")[0];
	const startDate = useRef(new Date());
	const startTime = useRef(new Date());
	const endDate = useRef(new Date());
	const endTime = useRef(new Date());
	// Value that will be returned after axios post request
	const [visits, setVisits] = useState(null);

	useEffect(() => {}, []);

	function getDateTime(date, time = "00:00") {
		return date.toString() + "T" + time.toString();
	}

	function checkValidDateTime() {
		if (props.getTime && (startTime.current.value === "" || endTime.current.value === "")) {
			alert(text("Time is not filled"));
			return false;
		}

		if (startDate.current.value === "" || endDate.current.value === "") {
			alert(text("Date is not filled"));
			return false;
		}
		let stringStartTime;
		let stringEndTime;
		if (props.getTime) {
			stringStartTime = getDateTime(startDate.current.value, startTime.current.value);
			stringEndTime = getDateTime(endDate.current.value, endTime.current.value);
		} else {
			stringStartTime = getDateTime(startDate.current.value);
			stringEndTime = getDateTime(endDate.current.value);
		}

		let timeStart = Date.parse(stringStartTime);
		let timeEnd = Date.parse(stringEndTime);
		if (timeStart >= timeEnd) {
			alert(text("Start point in time can't be same as end point or it can't starts after end point"));
			return false;
		}
		return true;
	}

	async function getData() {
		let TimePeriod;

		if (props.getTime) {
			TimePeriod = {
				StartDateTime: getDateTime(startDate.current.value, startTime.current.value),
				EndDateTime: getDateTime(endDate.current.value, endTime.current.value)
			};
		} else {
			TimePeriod = {
				StartDateTime: getDateTime(startDate.current.value),
				EndDateTime: getDateTime(endDate.current.value)
			};
		}
		try {
			const response = await axios.post(props.request + props.itemId, TimePeriod, config);
			if (response.status === 200) {
				if (response.data.value != null) {
					setVisits(response.data.value);
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
		if (checkValidDateTime()) {
			await getData();
		}
	};
	return (
		<div className="container m-2">
			<div className="d-flex justify-content-end">
				<Button onClick={close}>{text("Close")}</Button>
			</div>
			<div className="d-flex justify-content-center mb-3">
				<h5>{props.mainText}</h5>
			</div>
			<div className="d-inline-flex justify-content-center w-100">
				<div className="w-25">{text("Start date")}:</div>
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
			{props.getTime ? (
				<div className="d-inline-flex justify-content-center w-100 mb-5">
					<div className="w-25">{text("Start time")}:</div>
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
			) : (
				<div></div>
			)}
			<div className="d-inline-flex justify-content-center w-100">
				<div className="w-25">{text("End date")}:</div>
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
			{props.getTime ? (
				<div className="d-inline-flex justify-content-center w-100 mb-5">
					<div className="w-25">{text("End time")}:</div>
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
			) : (
				<div></div>
			)}
			{visits != null ? (
				<div className="d-inline-flex justify-content-start w-100 mb-5">
					<div className="w-100">
						<h5>
							{props.textResult}{" "}
							{visits.days !== undefined ? visits.result.count / visits.days : visits.result.count}
						</h5>
					</div>
				</div>
			) : (
				<div></div>
			)}
			<div className="d-inline-flex justify-content-start w-100 mb-5">
				<Button onClick={submit}>{text("Find")}</Button>
			</div>
		</div>
	);
}

export default VisitsComponent;
