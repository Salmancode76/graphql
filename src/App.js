import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

function App() {
  return (

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Profile />} />
        {/* 404 catch-all route - MUST be the last route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
