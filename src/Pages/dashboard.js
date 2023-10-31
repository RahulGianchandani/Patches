import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '../Components/Wrapper';
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const Dashboard = () => {

  const [totalCompleteOrders, setTotalCompleteOrders] = useState(0)
  const [totalCountOrders, setTotalCountOrders] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)

  useEffect(() => {
    getCompleteOrders();
    getCountQuotes();
    getTotalOrders();
  }, [])
  const getCompleteOrders = () => {
    axios({
      method: 'POST',
      url: `https://backend.royalpatchescustomize.com/v1/${role === "customer" ? "customer/completeOrder" : "admin/completeOrder"}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(res => {
      console.log("res", res);
      if (res?.data?.success) {
        setTotalCompleteOrders(res?.data?.CompleteOrder)
      }
    })
      .catch(error => {
        console.error(error);
      });
  }
  const getCountQuotes = () => {
    axios({
      method: 'POST',
      url: `https://backend.royalpatchescustomize.com/v1/${role === "customer" ? "customer/countQuotes" : "admin/countQuotes"}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(res => {
      console.log("res", res);
      if (res?.data?.success) {
        setTotalCountOrders(res?.data?.TotalAdminQuotes)
      }
    })
      .catch(error => {
        console.error(error);
      });
  }
  const getTotalOrders = () => {
    axios({
      method: 'POST',
      url: `https://backend.royalpatchescustomize.com/v1/${role === "customer" ? "customer/totalOrder" : "admin/totalOrder"}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(res => {
      console.log("res", res);
      if (res?.data?.success) {
        setTotalOrders(res?.data?.countOrder)
      }
    })
      .catch(error => {
        console.error(error);
      });
  }




  return (
    <Wrapper>
      <div id='dashboard' className='relative h-full bg-[#eee]'>
        <h2 className='h2 font-bold py-3 px-5 mb-5'>My Dashboard</h2>
        <div className='py-10 container'>
          <div className='grid grid-cols-4 gap-10'>

            <div className="card text-white bg-danger mb-3 max-w-[25rem]" >
              <div className="card-header">Total Complete Orders</div>
              <div className="card-body">
                <p className="card-text text-4xl">{totalCompleteOrders}</p>
              </div>
            </div>
            <div className="card text-white bg-success mb-3 max-w-[25rem]" >
              <div className="card-header">Total Count Orders</div>
              <div className="card-body">
                <p className="card-text text-4xl">{totalCountOrders}</p>
              </div>
            </div>
            <div className="card text-dark bg-warning mb-3 max-w-[25rem]" >
              <div className="card-header">Total Orders</div>
              <div className="card-body">
                <p className="card-text text-4xl">{totalOrders}</p>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </Wrapper>
  )
}

export default Dashboard