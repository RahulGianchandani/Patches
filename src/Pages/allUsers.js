import axios from 'axios';
import React, { useEffect, useState } from 'react'


import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '../Components/Wrapper';
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const AllUsers = () => {


  const [data, setData] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllUsers();
  }, [])


  const getAllUsers = (email) => {
    axios({
      method: 'POST',
      url: `https://backend.royalpatchescustomize.com/v1/admin/getalluser`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        email
      }
    }).then(res => {
      setLoading(false)
      setData(res?.data?.message)
      console.log("res", res);
    }).catch((err) => {
      setLoading(false)
    })
  }

  const deActivateUser = (_id) => {
    axios({
      method: 'POST',
      url: `https://backend.royalpatchescustomize.com/v1/${role === "customer" ? "customer/getallusersquotes" : "admin/deactiveUser"}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        _id: _id,
      }
    }).then(res => {
      console.log("res", res);
      setLoading(false)
      toast.success('User DeActivated Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getAllUsers()
    }).catch((err) => {
      setLoading(false)
    })

  }
  const exportEmails = () => {
    axios({
      method: 'POST',
      url: `https://backend.royalpatchescustomize.com/v1/${role === "customer" ? "customer/getallusersquotes" : "admin/export"}`,
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      console.log("res", res);
    }).catch((err) => {
    })

  }

  return (
    <Wrapper>
      {!loading &&
        <div id='allQuotes' className='relative h-full bg-gray-100 '>
          <h2 className='h2 font-bold py-3 px-5'>All Users</h2>
          <div className='container'>
            <div className='flex items-center justify-between mb-5 '>

              <div className='flex'>
                <div className="w-64">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" placeholder='Enter Email' />
                </div>
                <button className=' bg-sky-600 rounded-md py-1.5 ms-4 px-3 text-white' onClick={() => getAllUsers(email)}>
                  Search
                </button>
                <button className='bg-gray-500 rounded-md py-1.5 ms-2 px-3 text-white' onClick={() => { setEmail(""); getAllUsers("") }}>
                  Reset
                </button>
              </div>
              <button onClick={() => exportEmails()} className=' bg-green-600 rounded-md hover:bg-green-700 duration-200  py-1.5 ms-4 px-3 text-white'>
                Export Emails
              </button>
            </div>
            <table class="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Billing Email</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Country</th>
                  <th scope="col">Postal </th>
                  <th scope="col">State</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 && data?.map((user, ind) => {
                  return (
                    <tr>
                      <th scope="row">{ind + 1}</th>
                      <td>{user?.fname}</td>
                      <td>{user?.email}</td>
                      <td>{user?.billEmail}</td>
                      <td>{user?.mobile}</td>
                      <td>{user?.country}</td>
                      <td>{user?.postalCode}</td>
                      <td>{user?.state}</td>
                      <td>{user?.address}</td>
                      <td>{user?.is_active ?
                        <button type="button" onClick={() => deActivateUser(user?._id)} className='text-sm border border-black rounded-sm px-2 py-1 bg-red-600 hover:bg-red-700 text-white duration-200' >DeActivate</button>
                        :
                        <button type="button" onClick={() => deActivateUser(user?._id)} className='text-sm border border-black rounded-sm px-2 py-1 bg-green-600 hover:bg-green-700 text-white duration-200' >Activate</button>
                      }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      }

    </Wrapper>
  )
}

export default AllUsers