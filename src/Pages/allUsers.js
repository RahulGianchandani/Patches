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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllUsers();
  }, [])


  const getAllUsers = () => {
    axios({
      method: 'POST',
      url: `http://172.16.1.58:9090/v1/admin/getalluser`,
      headers: { Authorization: `Bearer ${token}` },
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
      url: `http://172.16.1.58:9090/v1/${role === "customer" ? "customer/getallusersquotes" : "admin/deactiveUser"}`,
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

  return (
    <Wrapper>
      {!loading &&
        <div id='allQuotes' className='relative h-full bg-gray-100 '>
          <h2 className='h2 font-bold py-3 px-5 mb-5'>All Users</h2>
          <div className='container'>
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