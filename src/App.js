import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import Read from "./components/Read";
// import Update from "./components/Update";

function App() {
  return (
    <div className="app min-vh-100">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/" element={<Read />}></Route>
          <Route path="/edit/:id" element={<Create />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;