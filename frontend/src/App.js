import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Menu from "./components/Menu/Menu";
import UserProfile from "./pages/UserProfile/UserProfile";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

function App() {
	return (
		<BrowserRouter>
			<Menu />
			<Routes>
				<Route path="/Login" element={<Login />} />
				<Route path="/UserProfile" element={<UserProfile />} />
				<Route path="/AdminPanel" element={<AdminPanel />} />
				{/* Default Router */}
				<Route path="/" element={<Navigate to="/Login" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

