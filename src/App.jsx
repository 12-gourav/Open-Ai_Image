import React from "react";
import "./App.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
      <p style={{ marginBottom: "1rem", textAlign: "center" }}>
        Developed By @CoolDeveloper
      </p>
    </>
  );
};

export default App;
