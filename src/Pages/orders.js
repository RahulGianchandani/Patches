import axios from 'axios';
import React, { useEffect, useState } from 'react'


import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '../Components/Wrapper';
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const Orders = () => {




  const [discount, setDiscount] = useState("")
  const [price, setPrice] = useState("")
  const [data, setData] = useState("")
  const [id, setID] = useState("")
  const [img, setImg] = useState("")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAllQuotes()
  }, [])

  const getAllQuotes = () => {
    axios({
      method: 'POST',
      url: `http://172.16.1.58:9090/v1/${role === "customer" ? "customer/getallusersquotes" : "admin/getallquotes"}`,
      headers: { Authorization: `Bearer ${token}` },
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
      url: `http://172.16.1.58:9090/v1/${role === "customer" ? "customer/getallusersquotes" : "admin/sendtocustomer"}`,
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
  const handleImage = (e) => {
    setImg(e.target.files[0]);
  }

console.log("img", img);
  return (
    <Wrapper>
      {
        !loading &&
        <div id='allQuotes' className='relative h-full bg-gray-100 '>
          <h2 className='h2 font-bold py-3 px-5 mb-5'>Orders</h2>
          <div className='container'>
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.data?.map((order, ind) => {
                    if (order?.User_Approved === "false") {
                    } else if (order?.Admin_Approved === "false") {
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
                          <td>{order?.img}</td>
                          <td className='text-center'>{order?.imgC ? order?.imgC : "-"}</td>
                          <td>{order?.msg}</td>
                          <td>{order?.discount}</td>
                          <td>{order?.Price}</td>
                          <td>
                            {role === "admin" ? <button type="button" onClick={() => setID(order?._id)} className='text-sm border border-black rounded-sm px-2 py-1  bg-green-600 hover:bg-green-700 text-white duration-200' data-bs-toggle="modal" data-bs-target="#imageModal">
                              Send</button> :
                              <span className='text-sm border border-black rounded-sm px-2 py-1 bg-gray-800 text-white duration-200' >Pending</span>
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

export default Orders