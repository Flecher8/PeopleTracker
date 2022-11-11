import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import react components
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import VisitsPlacementComponent from "../../components/VisitsPlacementComponent/VisitsPlacementComponent";
import VisitsRoomComponent from "../../components/VisitsRoomComponent/VisitsRoomComponent";

import axios from "../../api/axios";

function UserPlacements() {
	const config = {
		headers: { Authorization: `Bearer ${localStorage["PeopleTracker-userToken"]}` }
	};

	// Variables to work with data
	const minDataSting = "2022-01-01";
	const minDate = new Date(minDataSting).toISOString().split("T")[0];
	const maxDate = new Date().toISOString().split("T")[0];

	// Variables to store data
	const [placements, setPlacements] = useState([]);

	// Variables to open new modales
	const [activePlacementId, setActivePlacementId] = useState(0);
	const [activeRoomId, setActiveRoomId] = useState(0);

	// Placement modal show
	const [visitsPlacementComponentShow, SetVisitsPlacementComponentShow] = useState(false);
	const visitsPlacementComponentHandleClose = () => SetVisitsPlacementComponentShow(false);
	const visitsPlacementComponentHandleShow = () => SetVisitsPlacementComponentShow(true);

	// Room modal show
	const [visitsRoomComponentShow, SetVisitsRoomComponentShow] = useState(false);
	const visitsRoomComponentHandleClose = () => SetVisitsRoomComponentShow(false);
	const visitsRoomComponentHandleShow = () => SetVisitsRoomComponentShow(true);

	useEffect(() => {
		getUserPlacements();
	}, []);
	useEffect(() => {
		getUsersTopAndLessVisitedRooms(1006);
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
			alert(err.response.data);
			return [];
			// TODO language
		}
		return [];
	}

	function getTopVisitedRooms(array) {
		array.sort((a, b) => (a.count < b.count ? 1 : -1));
		let maxVisits = array[0].count;
		let topVisitedRooms = [];
		topVisitedRooms.push(array[0].roomInId);
		for (let i = 1; i < array.length; i++) {
			if (array[i].count === maxVisits) {
				topVisitedRooms.push(array[i].roomInId);
			}
		}
		return topVisitedRooms;
	}

	function getLessVisitedRooms(array) {
		array.sort((a, b) => (a.count > b.count ? 1 : -1));
		let minVisits = array[0].count;
		let topVisitedRooms = [];
		topVisitedRooms.push(array[0].roomInId);
		for (let i = 1; i < array.length; i++) {
			if (array[i].count === minVisits) {
				topVisitedRooms.push(array[i].roomInId);
			}
		}
		return topVisitedRooms;
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
				console.log(placement.rooms[i].name);
				return placement.rooms[i].name;
			}
		}
	}

	function getNamesOfRooms(placementId, roomsIds) {
		let placement = findPlacementById(placementId);
		let stringResult = "";
		for (let i = 0; i < roomsIds.length; i++) {
			stringResult += findRoomNameById(placement, roomsIds[i]);
		}
	}

	async function getUsersTopAndLessVisitedRooms(placementId) {
		let roomsVisits = await getAllRoomsVisitsByPlacement(placementId);
		let topVisitedRooms = getTopVisitedRooms(roomsVisits);
		let lessVisitedRooms = getLessVisitedRooms(roomsVisits);
		let result = getNamesOfRooms(placementId, topVisitedRooms);
		return { topVisitedRooms: topVisitedRooms, lessVisitedRooms: lessVisitedRooms };
	}

	async function getRoomsByPlacement(placementId) {
		try {
			const response = await axios.get("/Rooms/GetRoomsByPlacement/placementId:" + placementId, config);
			if (response.status === 200) {
				return response.data;
			}
		} catch (err) {
			// errors that expected from back
			alert(err.response.data);
			return [];
			// TODO language
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
			alert(err.response.data);

			// TODO language
		}
	}

	// Show VisitsPlacementComponent modal function
	function visitsPlacementModelShow(placementId) {
		setActivePlacementId(placementId);
		visitsPlacementComponentHandleShow();
	}

	// Show VisitsRoomComponent modal function
	function visitsRoomModelShow(roomId) {
		setActiveRoomId(roomId);
		visitsRoomComponentHandleShow();
	}

	return (
		<div className="container">
			{/* // TODO language */}
			<div className="d-flex justify-content-center display-4">Placements</div>
			<div className="d-flex border border-dark w-100">
				<ProfileMenu />
			</div>
			{/* Open controller of view to visits of placement */}
			<Modal size="lg" centered show={visitsPlacementComponentShow} onHide={visitsPlacementComponentHandleClose}>
				<VisitsPlacementComponent close={visitsPlacementComponentHandleClose} placementId={activePlacementId} />
			</Modal>
			{/* Open controller of view to visits of room */}
			<Modal size="lg" centered show={visitsRoomComponentShow} onHide={visitsRoomComponentHandleClose}>
				<VisitsRoomComponent close={visitsRoomComponentHandleClose} roomId={activeRoomId} />
			</Modal>
			<div className="mt-3 border border-dark">
				{placements.map(e => (
					<div className="d-flex flex-column m-2" key={e.id}>
						{/* // TODO language */}
						<div className="d-inline-flex m-2 align-items-center">
							{/* // TODO language */}
							<div className="mr-auto">Placement name: {e.name}</div>
							<div className="" align="right">
								{/* // TODO language */}
								<Button onClick={() => visitsPlacementModelShow(e.id)} variant="outline-primary">
									View visits of placement by period of time
								</Button>
							</div>
						</div>
						<div className="d-inline-flex align-items-center m-2">123</div>
						<div className="d-flex flex-column mt-2">
							{e.rooms.map(r => (
								<div
									className="d-flex align-items-center m-2 p-2 border-bottom border-top border-dark"
									key={r.id}>
									{/* // TODO language */}
									<div className="mr-auto">Room name: {r.name}</div>

									<div className="mr-auto">
										{/* // TODO language */}
										<Button onClick={() => visitsRoomModelShow(r.id)} variant="outline-primary">
											View visits of room by period of time
										</Button>
									</div>
									{/* // TODO language */}
									<div className="">Number of people in room: {r.numberOfPeopleInRoom}</div>
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
