import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PhotoListing from "./pages/PhotoListing";
import DisplayGraphs from "./pages/DisplayGraphs";
import CreatePhoto from "./pages/CreatePhoto";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<PhotoListing />} />
        <Route path="/display-graphs" element={<DisplayGraphs />} />
        <Route path="/create-photos" element={<CreatePhoto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
