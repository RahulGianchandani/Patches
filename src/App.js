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
import CreateQuote from './Pages/createQuote';
import CreateOrder from './Pages/createOrder';
import Orders from './Pages/orders';
import CompleteOrders from './Pages/completeOrders';
import Invoices from './Pages/invoices';
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
            <Route path="/orders" element={<Orders />} />
            <Route path="/complete-orders" element={<CompleteOrders />} />
            <Route path="/create-quote" element={<CreateQuote />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/invoices" element={<Invoices />} />
          </Routes>
      }

      <ToastContainer />
    </Router>
  );
}

