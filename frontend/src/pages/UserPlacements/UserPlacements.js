import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import VisitsPlacementComponent from "../../components/VisitsPlacementComponent/VisitsPlacementComponent";
import VisitsRoomComponent from "../../components/VisitsRoomComponent/VisitsRoomComponent";
import axios from "../../api/axios";

function UserPlacements() {
	const [placements, setPlacements] = useState([]);
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
	useEffect(() => {}, [placements]);

	const config = {
		headers: { Authorization: `Bearer ${localStorage["PeopleTracker-userToken"]}` }
	};

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

	// Show VisitsPlacementComponent modal function
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
						<div className="d-inline-flex border">
							{/* // TODO language */}
							<div className="mr-auto">Placement name: {e.name}</div>
							<div className="" align="right">
								{/* // TODO language */}
								<Button onClick={() => visitsPlacementModelShow(e.id)} variant="outline-primary">
									View visits of placement by period of time
								</Button>
							</div>
						</div>
						<div className="d-flex flex-column mt-2">
							{e.rooms.map(r => (
								<div className="d-flex m-2 p-2 border-bottom border-top border-dark" key={r.id}>
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
