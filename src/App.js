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


export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-pass" element={<ForgotPass />} />
        <Route path="/reset-pass" element={<ResetPass />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </Router>
  );
}

