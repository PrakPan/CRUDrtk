import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Read from "./components/Read";
import UserForm from "./components/UserForm";


const PATH =[
  {
    path:'/',
    element:<Read/>
  },
  {
    path:'/create',
    element:<UserForm/>,
  },
  {
    path:'/edit/:id',
    element:<UserForm/>,
  }
];

function App() {

  return (
    <>
    <div className="app min-vh-100">
      <BrowserRouter>
   
        <Navbar />
        <Routes>
          {PATH.map((route) => <Route key ={route.path} path={route.path} element={route.element}></Route> )}
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;