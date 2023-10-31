import axios from 'axios';
import React, { useEffect, useState } from 'react'


import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '../Components/Wrapper';

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const Invoices = () => {


  const [paidUsers, setPaidUsers] = useState("")
  const [unPaidUsers, setUnPaidUsers] = useState("")
  const [invoiceNo, setInvoiceNo] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPaidUsers();
    getUnPaidUsers();
  }, [])


  const sendEmail = () => {
  }
  const getPaidUsers = (invoice_no) => {
    axios({
      method: 'POST',
      url: `https://backend.royalpatchescustomize.com/v1/${role === "customer" ? "customer/paidUser" : "admin/paidUser"}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        invoice_no,
      }
    }).then(res => {
      setPaidUsers(res?.data?.message?.data)
      console.log("res", res);
    }).catch((err) => {
      setLoading(false)
    })
  }
  const getUnPaidUsers = (invoice_no) => {
    axios({
      method: 'POST',
      url: `https://backend.royalpatchescustomize.com/v1/${role === "customer" ? "customer/unpaidUser" : "admin/unpaidUser"}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        invoice_no,
      }
    }).then(res => {
      setUnPaidUsers(res?.data?.message?.data)
      console.log("res", res);
    }).catch((err) => {
      setLoading(false)
    })
  }

 
  return (
    <Wrapper>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-paid-tab" data-bs-toggle="tab" data-bs-target="#nav-paid" type="button" role="tab" aria-controls="nav-paid" aria-selected="true">Paid Users</button>
          <button className="nav-link" id="nav-unpaid-tab" data-bs-toggle="tab" data-bs-target="#nav-unpaid" type="button" role="tab" aria-controls="nav-unpaid" aria-selected="false">UnPaid Users</button>

        </div>
      </nav>
      <div className="tab-content h-screen bg-gray-100" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-paid" role="tabpanel" aria-labelledby="nav-paid-tab">
          <div id='paidUsers' className='relative h-full  '>
            <h2 className='h2 font-bold py-3 px-5 '>Paid Users</h2>

            <div className='container'>
              <div className='flex items-center place-items-center mb-5 '>
                <div className="">
                  <input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="form-control w-44" id="invoiceNo" aria-describedby="invoiceHelp" placeholder='Enter Invoice No' />
                </div>
                <button className=' bg-sky-600 rounded-md py-2 ms-4 px-3 text-white' onClick={() => getPaidUsers(invoiceNo)}>
                  Search
                </button>
                <button className='bg-gray-500 rounded-md py-2 ms-2 px-3 text-white' onClick={() => { setInvoiceNo(""); getPaidUsers("") }}>
                  Reset
                </button>
              </div>
              <table className="table table-striped table-hover mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Invoice No:</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Billing Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Patch Name </th>
                    <th scope="col">Discount</th>
                    <th scope="col">Price</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paidUsers.length > 0 && paidUsers?.map((user, ind) => {
                    return (
                      <tr>
                        <th scope="row">{ind + 1}</th>
                        <td>{user?.invoice_no}</td>
                        <td>{user?.customerName}</td>
                        <td>{user?.email}</td>
                        <td>{user?.billEmail}</td>
                        <td>{user?.userinfo?.mobile}</td>
                        <td>{user?.patchName}</td>
                        <td>{user?.discount}</td>
                        <td>{user?.amount}</td>
                        <td>{user?.userinfo?.address}</td>
                        <td><button type="button"
                          onClick={() => sendEmail(user?._id)}
                          className='text-sm border border-black rounded-sm px-2 py-1 bg-green-600 hover:bg-green-700 text-white duration-200' >Send Email</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="nav-unpaid" role="tabpanel" aria-labelledby="nav-unpaid-tab">    <div id='unPaidUsers' className='relative h-full  '>
          <h2 className='h2 font-bold py-3 px-5 '>UnPaid Users</h2>
          <div className='container'>
            <div className='flex items-center place-items-center mb-5 '>
              <div className="">
                <input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="form-control w-44" id="invoiceNo" aria-describedby="invoiceHelp" placeholder='Enter Invoice No' />
              </div>
              <button className=' bg-sky-600 rounded-md py-2 ms-4 px-3 text-white' onClick={() => getUnPaidUsers(invoiceNo)}>
                Search
              </button>
              <button className='bg-gray-500 rounded-md py-2 ms-2 px-3 text-white' onClick={() => { setInvoiceNo(""); getUnPaidUsers("") }}>
                Reset
              </button>
            </div>
            <table className="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Invoice No:</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Billing Email</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Patch Name </th>
                  <th scope="col">Discount</th>
                  <th scope="col">Price</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {unPaidUsers.length > 0 && unPaidUsers?.map((user, ind) => {
                  return (
                    <tr>
                      <th scope="row">{ind + 1}</th>
                      <td>{user?.invoice_no}</td>
                      <td>{user?.customerName}</td>
                      <td>{user?.email}</td>
                      <td>{user?.billEmail}</td>
                      <td>{user?.userinfo?.mobile}</td>
                      <td>{user?.patchName}</td>
                      <td>{user?.discount}</td>
                      <td>{user?.amount}</td>
                      <td>{user?.userinfo?.address}</td>
                      <td><button type="button"
                        onClick={() => sendEmail(user?._id)}
                        className='text-sm border border-black rounded-sm px-2 py-1 bg-green-600 hover:bg-green-700 text-white duration-200' >Send Email</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div></div>
      </div>





    </Wrapper>
  )
}

export default Invoices