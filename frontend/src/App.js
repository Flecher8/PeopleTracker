import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login.js";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/Login" element={<Login />} />
				{/* Default Router */}
				<Route path="/" element={<Navigate to="/Login" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

