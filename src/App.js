import './App.css';
import Header from './Components/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route, Redirect, Navigate
} from "react-router-dom";
import Login from './Pages/login';
import Footer from './Components/Footer';
import Register from './Pages/register';
import ForgotPass from './Pages/forgotPass';
import ResetPass from './Pages/resetPass';
import { ToastContainer } from 'react-toastify';
import Dashboard from './Pages/dashboard';
import AllQuotes from './Pages/allQuotes';
import MyProfile from './Pages/myProfile';
import AllUsers from './Pages/allUsers';
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
console.log("role", role);
export default function App() {
  return (
    <Router>
      {
        !token ?
          <>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />
              <Route path="/Patches" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-pass" element={<ForgotPass />} />
              <Route path="/reset-pass" element={<ResetPass />} />
            </Routes>
            <Footer />
          </>
          :
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/Patches" element={<Dashboard />} />
            <Route path="/all-quotes" element={<AllQuotes />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/all-users" element={<AllUsers />} />
          </Routes>
      }

      <ToastContainer />
    </Router>
  );
}

