import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'

import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '../Components/Wrapper';
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const CompleteOrders = () => {




  const [discount, setDiscount] = useState("")
  const [price, setPrice] = useState("")
  const [data, setData] = useState("")
  const [id, setID] = useState("")
  const [userName, setUserName] = useState("")
  const [img, setImg] = useState("")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAllQuotes()
  }, [])

  const getAllQuotes = (userName) => {
    axios({
      method: 'POST',
      url: `https://backend.royalpatchescustomize.com/v1/${role === "customer" ? "customer/getallusersquotes" : "admin/getallquotes"}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        userName
      }
    }).then(res => {
      setData(res?.data?.message)
      console.log("res", res);
      setLoading(false)
    }).catch((err) => {
      setLoading(false)
    })
  }


  const sendQuote = (_id) => {
    axios({
      method: 'POST',
      url: `https://backend.royalpatchescustomize.com/v1/${role === "customer" ? "customer/getallusersquotes" : "admin/sendtocustomer"}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        _id: id,
        imgC: "asdsada"
      }
    }).then(res => {
      setData(res?.data?.message)
      console.log("res", res);
      setDiscount("")
      setPrice("")
      setImg("")
      setLoading(false)
      toast.success('Quote Sent Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getAllQuotes()
    }).catch((err) => {
      setLoading(false)
    })

  }
  const downloadImage = (imgURL) => {
    saveAs(imgURL, 'image.jpg') // Put your image URL here.
  }
  const pay = (_id) => {
    axios({
      method: 'POST',
      url: `https://backend.royalpatchescustomize.com/v1/${role === "customer" ? "customer/pay" : "admin/sendtocustomer"}`,
      headers: { Authorization: `Bearer ${token}` },

    }).then(res => {
      window.location.href = res?.data?.approvalUrl
      console.log("res", res);
      setLoading(false)
      // toast.success('Payment Sent Successfully!', {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      getAllQuotes()
    }).catch((err) => {
      setLoading(false)
    })

  }
  const handleImage = (e) => {
    setImg(e.target.files[0]);
  }

  console.log("img", img);
  return (
    <Wrapper>
      {
        !loading &&
        <div id='allQuotes' className='relative h-full bg-gray-100 '>
          <h2 className='h2 font-bold py-3 px-5 '>Complete Orders</h2>
          <div className='container'>
            <div className='flex items-center place-items-center mb-5 '>

              <div className="">
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control w-44" id="userName" aria-describedby="nameHelp" placeholder='Enter User Name' />
              </div>
              <button className=' bg-sky-600 rounded-md py-2 ms-4 px-3 text-white' onClick={() => getAllQuotes(userName)}>
                Search
              </button>
              <button className='bg-gray-500 rounded-md py-2 ms-2 px-3 text-white' onClick={() => { setUserName(""); getAllQuotes("") }}>
                Reset
              </button>
            </div>


            <table className="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  {role === "admin" && <th scope="col">User Name</th>}
                  <th scope="col">Patch Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Embroidery</th>
                  <th scope="col">Height</th>
                  <th scope="col">Width </th>
                  <th scope="col">Backing_type</th>
                  <th scope="col">Bording_type</th>
                  <th scope="col">Image</th>
                  <th scope="col">Image (Completed)</th>
                  <th scope="col">Message</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Price</th>
                  <th scope="col">Payment</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.data?.map((order, ind) => {
                    if (order?.User_Approved === "false") {
                    } else if (order?.Admin_Approved === "true") {
                      return (
                        <tr>
                          <th scope="row">{ind + 1}</th>
                          {role === "admin" && <td>{order?.users?.fname}</td>}
                          <td>{order?.patchName}</td>
                          <td>{order?.quantity}</td>
                          <td>{order?.embroidery}</td>
                          <td>{order?.patchH}</td>
                          <td>{order?.patchW}</td>
                          <td>{order?.backingT}</td>
                          <td>{order?.borderT}</td>
                          <td> <img className='cursor-pointer' src={order?.img} height={"30px"} width={"40px"} /></td>
                          <td className='flex justify-center'><img className='cursor-pointer' src={order?.img2} onClick={() => downloadImage(order?.img2)} height={"50px"} width={"50px"} /></td>
                          <td>{order?.msg}</td>
                          <td>{order?.discount}</td>
                          <td>{order?.Price}</td>
                          <td>
                            {role === "admin" ? <span className='text-sm border border-black rounded-sm px-2 py-1 bg-gray-800 text-white duration-200' >Pending</span> :

                              <button type="button" onClick={() => pay()} className='text-sm border border-black rounded-sm px-2 py-1  bg-green-600 hover:bg-green-700 text-white duration-200' >
                                pay</button>
                            }
                          </td>
                        </tr>
                      )
                    }
                  })
                }
              </tbody>
            </table>
          </div>


          <div className="modal fade" id="imageModal" tabindex="-1" aria-labelledby="quoteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title font-bold" id="quoteModalLabel">Write your Quote</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <label for="formFile" class="form-label">Upload Image</label>
                  <input accept="image/png, image/gif, image/jpeg" class="form-control" onChange={handleImage} name='img' type="file" id="formFile" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary bg-[#5c636a]" data-bs-dismiss="modal">Close</button>
                  <button onClick={() => sendQuote()} type="button" className="btn btn-primary bg-[#0b5ed7] text-white">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </Wrapper>
  )
}

export default CompleteOrders