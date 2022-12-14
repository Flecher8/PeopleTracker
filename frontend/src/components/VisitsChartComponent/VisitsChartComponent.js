import { useState, useEffect, useRef } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
import text from "../../services/localizationService";
import { config } from "../../services/configeService";

import CanvasJSReact from "../../lib/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// mainText={mainTextModale}
function VisitsChartComponent(props) {
	const minDate = new Date("2022-01-01").toISOString().split("T")[0];
	const maxDate = new Date().toISOString().split("T")[0];
	const startDate = useRef(new Date());

	// Value that will be returned after axios post request
	const [visits, setVisits] = useState(null);
	//
	const [chartOptions, setChartOptions] = useState([]);
	const [chartLoaded, setChartLoaded] = useState(false);

	function getDateTime(date, time = "00:00") {
		return date.toString() + "T" + time.toString();
	}

	function checkValidDate() {
		if (startDate.current.value === "") {
			alert(text("Date is not filled"));
			return false;
		}
		return true;
	}

	function createOptions(visitsByTime) {
		const dPoints = [];

		let keys = Object.keys(visitsByTime);
		for (let i = 0; i < keys.length; i++) {
			let obj = {};
			if (visitsByTime[keys[i]] == null) {
				obj = { label: keys[i], y: null };
			} else {
				obj = { label: keys[i], y: visitsByTime[keys[i]].count };
			}
			dPoints.push(obj);
		}
		let options = {
			title: {
				text: props.mainText
			},
			data: [
				{
					type: "column",
					dataPoints: dPoints
				}
			]
		};
		setChartOptions(options);
		setChartLoaded(true);
	}

	async function getData() {
		let TimePeriod = {
			StartDateTime: getDateTime(startDate.current.value),
			EndDateTime: getDateTime(startDate.current.value)
		};

		try {
			const response = await axios.post(props.request + props.itemId, TimePeriod, config);
			if (response.status === 200) {
				if (response.data.value != null) {
					createOptions(response.data.value);
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
		if (checkValidDate()) {
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
				<div className="w-25">{text("Date")}:</div>
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
			{chartLoaded ? (
				<div>
					<div>
						<CanvasJSChart options={chartOptions} />
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

export default VisitsChartComponent;
