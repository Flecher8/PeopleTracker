import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import react components
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import VisitsComponent from "../../components/VisitsComponent/VisitsComponent";
import VisitsChartComponent from "../../components/VisitsChartComponent/VisitsChartComponent";

import axios from "../../api/axios";
import text from "../../services/localizationService";
import { config } from "../../services/configeService";

function UserPlacements() {
	const sortingType = {
		bigestFirst: (a, b) => (a.count < b.count ? 1 : -1),
		smallestFirst: (a, b) => (a.count > b.count ? 1 : -1)
	};

	// Variables to work with date
	const minDataSting = "2022-01-01";
	const minDate = new Date(minDataSting).toISOString().split("T")[0];
	const maxDate = new Date().toISOString().split("T")[0];

	// Variables to store data
	const [placements, setPlacements] = useState([]);

	// Variables to open new modale
	const [activeItemId, setActiveItemId] = useState(0);
	const [getTimeModale, setGetTimeModale] = useState(true);
	const [mainTextModale, setMainTextModale] = useState("");
	const [requestModale, setRequestModale] = useState("");
	const [textResultModale, setTextResultModale] = useState("");

	// Modal show
	const [modalComponentShow, SetModalComponentShow] = useState(false);
	const modalComponentHandleClose = () => SetModalComponentShow(false);
	const modalComponentHandleShow = () => SetModalComponentShow(true);

	// Chart modal show
	const [chartModalComponentShow, SetChartModalComponentShow] = useState(false);
	const chartModalComponentHandleClose = () => SetChartModalComponentShow(false);
	const chartModalComponentHandleShow = () => SetChartModalComponentShow(true);

	useEffect(() => {
		getUserPlacements();
	}, []);

	useEffect(() => {
		loadVisitedRoomsByPlacement("topVisitedPlacements", sortingType.bigestFirst);
		loadVisitedRoomsByPlacement("lessVisitedPlacements", sortingType.smallestFirst);
	}, [placements]);

	async function getAllRoomsVisitsByPlacement(placementId) {
		let TimePeriod = {
			StartDateTime: minDate,
			EndDateTime: maxDate
		};

		try {
			const response = await axios.post(
				"/Rooms/GetVisitsInRoomsByPlacement/placementId:" + placementId,
				TimePeriod,
				config
			);
			if (response.status === 200) {
				return response.data.value;
			}
		} catch (err) {
			// errors that expected from back
			//alert(text(err.response.data));
			return [];
		}
		return [];
	}

	async function loadVisitedRoomsByPlacement(textType, sortFunctionType) {
		let newPlacements = placements;
		for (let i = 0; i < newPlacements.length; i++) {
			newPlacements[i][textType] = await getStringVisitedRooms(placements[i].id, sortFunctionType);
		}
		setPlacements(newPlacements);
	}

	function getVisitedRooms(array, sortFunction) {
		array.sort(sortFunction);
		let minVisits = array[0].count;
		let visitedRooms = [];
		visitedRooms.push(array[0].roomInId);
		for (let i = 1; i < array.length; i++) {
			if (array[i].count === minVisits) {
				visitedRooms.push(array[i].roomInId);
			}
		}
		return visitedRooms;
	}

	function findPlacementById(placementId) {
		for (let i = 0; i < placements.length; i++) {
			if (placements[i].id === placementId) {
				return placements[i];
			}
		}
	}

	function findRoomNameById(placement, roomId) {
		for (let i = 0; i < placement.rooms.length; i++) {
			if (placement.rooms[i].id === roomId) {
				return placement.rooms[i].name;
			}
		}
	}

	function getNamesOfRooms(placementId, roomsIds) {
		let placement = findPlacementById(placementId);
		let stringResult = [];
		for (let i = 0; i < roomsIds.length; i++) {
			stringResult.push(findRoomNameById(placement, roomsIds[i]));
		}
		return stringResult;
	}

	async function getStringVisitedRooms(placementId, sortFunction) {
		let roomsVisits = await getAllRoomsVisitsByPlacement(placementId);
		let visitedRooms = getVisitedRooms(roomsVisits, sortFunction);
		let result = getNamesOfRooms(placementId, visitedRooms);
		return result.toLocaleString();
	}

	async function getRoomsByPlacement(placementId) {
		try {
			const response = await axios.get("/Rooms/GetRoomsByPlacement/placementId:" + placementId, config);
			if (response.status === 200) {
				return response.data;
			}
		} catch (err) {
			// errors that expected from back
			//alert(text(err.response.data));
			return [];
		}
		return [];
	}

	async function getUserPlacements() {
		try {
			const response = await axios.get("/Placements/userId:" + localStorage["PeopleTracker-userId"], config);
			if (response.status === 200) {
				let object = response.data;
				for (let i = 0; i < object.length; i++) {
					object[i].rooms = await getRoomsByPlacement(object[i].id);
				}
				setPlacements(object);
			}
		} catch (err) {
			// errors that expected from back
			//alert(text(err.response.data));
		}
	}

	// Show VisitsComponent modal function
	function visitsModelShow(itemId, getTime, mainText, request, textResult) {
		setActiveItemId(itemId);
		setGetTimeModale(getTime);
		setMainTextModale(mainText);
		setRequestModale(request);
		setTextResultModale(textResult);
		modalComponentHandleShow();
	}

	// Show VisitsComponent modal function
	function chartModelShow(itemId, mainText, request) {
		setActiveItemId(itemId);
		setMainTextModale(mainText);
		setRequestModale(request);
		chartModalComponentHandleShow();
	}

	return (
		<div className="container">
			<div className="d-flex justify-content-center display-4">{text("Placements")}</div>
			<div className="d-flex border border-dark w-100">
				<ProfileMenu />
			</div>
			<Modal size="lg" centered show={modalComponentShow} onHide={modalComponentHandleClose}>
				<VisitsComponent
					close={modalComponentHandleClose}
					itemId={activeItemId}
					getTime={getTimeModale}
					mainText={mainTextModale}
					request={requestModale}
					textResult={textResultModale}
				/>
			</Modal>
			<Modal size="lg" centered show={chartModalComponentShow} onHide={chartModalComponentHandleClose}>
				<VisitsChartComponent
					close={chartModalComponentHandleClose}
					itemId={activeItemId}
					mainText={mainTextModale}
					request={requestModale}
				/>
			</Modal>
			<div className="mt-3 border border-dark">
				{placements.map(e => (
					<div className="d-flex flex-column m-2" key={e.id}>
						<div className="d-inline-flex m-2 align-items-center">
							<div className="mr-auto">
								{text("Placement name")}: {e.name}
							</div>
							<div className="" align="right">
								<Button
									onClick={() =>
										visitsModelShow(
											e.id,
											true,
											text("View visits of placement by period of time"),
											"/Placements/GetNumberOfVisitsPlacementByTimePeriod/placementId:",
											text("Number of people visited placement:")
										)
									}
									variant="outline-primary">
									{text("View visits of placement by period of time")}
								</Button>
							</div>
						</div>
						<div className="d-inline-flex align-items-center m-2">
							{text("Top visited rooms by all time")}: {e.topVisitedPlacements}
						</div>
						<div className="d-inline-flex align-items-center m-2">
							{text("Less visited rooms by all time")}: {e.lessVisitedPlacements}
						</div>
						<div className="d-inline-flex align-items-center m-2">
							<Button
								onClick={() =>
									visitsModelShow(
										e.id,
										false,
										text("View AVG visits of placement by period of time"),
										"/Placements/GetAvgVisitsPlacementByTimePeriod/placementId:",
										text("AVG visits of placement by period of time:")
									)
								}
								variant="outline-primary">
								{text("View AVG visits of placement by period of time")}
							</Button>
						</div>
						<div className="d-inline-flex align-items-center m-2">
							<Button
								onClick={() =>
									chartModelShow(
										e.id,
										text("View diagram of visits by 12-hours"),
										"/Placements/GetNumberOfPeopleVisitedPlacementByDayInHours/placementId:"
									)
								}
								variant="outline-primary">
								{text("View diagram of visits by 12-hours")}
							</Button>
						</div>
						<div className="d-flex flex-column mt-2">
							{e.rooms.map(r => (
								<div className="d-flex flex-column m-2 p-2 border-bottom border-top border-dark" key={r.id}>
									<div className="d-inline-flex align-items-center">
										<div className="mr-auto">
											{text("Room name")}: {r.name}
										</div>

										<div className="">
											{text("Number of people in room")}: {r.numberOfPeopleInRoom}
										</div>
									</div>
									<div className="d-inline-flex mt-2">
										<Button
											onClick={() =>
												visitsModelShow(
													r.id,
													true,
													text("View visits of room by period of time"),
													"/Rooms/GetNumberOfVisitsRoomByTimePeriod/roomId:",
													text("Number of people visited room:")
												)
											}
											variant="outline-primary">
											{text("View visits of room by period of time")}
										</Button>
									</div>
									<div className="d-inline-flex mt-2">
										<Button
											onClick={() =>
												visitsModelShow(
													r.id,
													false,
													text("View AVG visits of room by period of time"),
													"/Rooms/GetAvgVisitsRoomByTimePeriod/roomId:",
													text("AVG visits of room by period of time:")
												)
											}
											variant="outline-primary">
											{text("View AVG visits of room by period of time")}
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default UserPlacements;
