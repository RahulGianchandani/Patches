import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '../Components/Wrapper';

const token = localStorage.getItem("token");



const MyProfile = () => {

  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios({
      method: 'POST',
      url: `http://172.16.1.58:9090/v1/customer/myprofile`,
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setData(res?.data?.message)
      console.log("res", res);
      setLoading(false)
    }).catch((err) => {
      setLoading(false)
    })

  }, [])
  const navigate = useNavigate();

  return (
    <Wrapper>
      {!loading &&
        <div id='allQuotes' className='relative h-full bg-gray-100 '>
          <h2 className='h2 font-bold py-3 px-5 mb-5'>My Profile</h2>
          <div className='container max-w-[1000px] p-5 shadow-md bg-[#fcd04b]'>
            <div className='imgBox flex justify-center mb-5  '>
              <img src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg" className='h-24 w-24 rounded-full' />
            </div>
            <div className='grid grid-cols-2  justify-between'>
              <h4 className='h4 mb-5 font-bold'>
                Email
              </h4>
              <h4 className='h4 mb-5 justify-self-end'>
                {data?.email}
              </h4>
              <h4 className='h4 mb-5 font-bold'>
                Billing Email
              </h4>
              <h4 className='h4 mb-5 justify-self-end'>
                {data?.billEmail}
              </h4>
              <h4 className='h4 mb-5 font-bold'>
                Full Name
              </h4>
              <h4 className='h4 mb-5 justify-self-end'>
                {data?.fname}
              </h4>
              <h4 className='h4 mb-5 font-bold'>
                Mobile
              </h4>
              <h4 className='h4 mb-5 justify-self-end'>
                {data?.mobile}
              </h4>
              <h4 className='h4 mb-5 font-bold'>
                State
              </h4>
              <h4 className='h4 mb-5 justify-self-end'>
                {data?.state}
              </h4>
              <h4 className='h4 mb-5 font-bold'>
                Country
              </h4>
              <h4 className='h4 mb-5 justify-self-end'>
                {data?.country}
              </h4>
              <h4 className='h4 mb-5 font-bold'>
                Address
              </h4>
              <h4 className='h4 mb-5 justify-self-end'>
                {data?.address}
              </h4>
            </div>

          </div>
        </div>
      }
    </Wrapper>
  )
}

export default MyProfile