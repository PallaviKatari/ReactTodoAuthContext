import React from "react";
import {Routes,Route} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TodoCrud from "./components/todoCrud";
import PrivateRoute from "./auth/PrivateRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
   <Routes>
    <Route path="/" element={<LoginPage/>}/>
    <Route path="/todoCrud" element={<PrivateRoute><TodoCrud/></PrivateRoute>}/>
   </Routes>
   <ToastContainer position="top-right" autoClose={3000} />
   </>
  );
}

export default App;
