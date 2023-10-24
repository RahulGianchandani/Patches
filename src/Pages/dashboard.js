import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '../Components/Wrapper';
const token = localStorage.getItem("token");

const Dashboard = () => {






  return (
    <Wrapper>
      <div id='dashboard' className='relative h-full bg-[#eee]'>
        <h2 className='h2 font-bold py-3 px-5 mb-5'>My Dashboard</h2>
        <div className='py-10 container'>
          <div className='grid grid-cols-4 gap-10'>

            <div className="card text-white bg-danger mb-3 max-w-[25rem]" >
              <div className="card-header">Total Orders</div>
              <div className="card-body">
                <h5 className="card-title">Secondary card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
            <div className="card text-white bg-success mb-3 max-w-[25rem]" >
              <div className="card-header">Total Amount</div>
              <div className="card-body">
                <h5 className="card-title">Success card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
            <div className="card text-dark bg-warning mb-3 max-w-[25rem]" >
              <div className="card-header">Header</div>
              <div className="card-body">
                <h5 className="card-title">Warning card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
            <div className="card text-dark bg-info mb-3 max-w-[25rem]" >
              <div className="card-header">Header</div>
              <div className="card-body">
                <h5 className="card-title">Warning card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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