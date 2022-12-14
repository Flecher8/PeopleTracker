import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Menu from "./components/Menu/Menu";
import UserProfile from "./pages/UserProfile/UserProfile";
import AdminPanelPlacements from "./pages/AdminPanelPlacements/AdminPanelPlacements";
import Main from "./pages/Main/Main";
import Registration from "./pages/Registration/Registration";
import UserPlacements from "./pages/UserPlacements/UserPlacements";
import UserSmartDevice from "./pages/UserSmartDevice/UserSmartDevice";
import UserSubscription from "./pages/UserSubscription/UserSubscription";
import AdminPanelRooms from "./pages/AdminPanelRooms/AdminPanelRooms";
import AdminPanelSmartDevices from "./pages/AdminPanelSmartDevices/AdminPanelSmartDevices";
import AdminPanelSensors from "./pages/AdminPanelSensors/AdminPanelSensors";
import Contacts from "./pages/Contacts/Contacts";

function App() {
	return (
		<BrowserRouter>
			<Menu />
			<Routes>
				<Route path="/Login" element={<Login />} />
				<Route path="/Main" element={<Main />} />
				<Route path="/Contacts" element={<Contacts />} />
				<Route path="/UserProfile" element={<UserProfile />} />
				<Route path="/UserPlacements" element={<UserPlacements />} />
				<Route path="/UserSmartDevice" element={<UserSmartDevice />} />
				<Route path="/UserSubscription" element={<UserSubscription />} />
				<Route path="/AdminPanelPlacements" element={<AdminPanelPlacements />} />
				<Route path="/AdminPanelRooms" element={<AdminPanelRooms />} />
				<Route path="/AdminPanelSmartDevices" element={<AdminPanelSmartDevices />} />
				<Route path="/AdminPanelSensors" element={<AdminPanelSensors />} />
				<Route path="/Registration" element={<Registration />} />
				{/* Default Router */}
				<Route path="/" element={<Navigate to="/Main" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

