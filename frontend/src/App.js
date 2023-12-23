import React from "react";
import NavBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={Home} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
