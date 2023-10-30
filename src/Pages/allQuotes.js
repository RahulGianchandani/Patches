import axios from 'axios';
import React, { useEffect, useState } from 'react'


import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '../Components/Wrapper';
import logo from '../images/logo-2.png'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";
import moment from 'moment';
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const AllQuotes = () => {




  const [discount, setDiscount] = useState("")
  const [price, setPrice] = useState("")
  const [data, setData] = useState("")
  const [id, setID] = useState("")
  const [userName, setUserName] = useState("")
  const [pdfData, setPdfData] = useState("")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAllQuotes()
    createInvoice()
  }, [])

  const getAllQuotes = (userName) => {
    axios({
      method: 'POST',
      url: `http://34.230.138.15:9090/v1/${role === "customer" ? "customer/getallusersquotes" : "admin/getallquotes"}`,
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
      url: `http://34.230.138.15:9090/v1/${role === "customer" ? "customer/getallusersquotes" : "admin/updatedprice"}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        _id: id,
        Price: price,
        discount: discount
      }
    }).then(res => {
      setData(res?.data?.message)
      console.log("res", res);
      setDiscount("")
      setPrice("")
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
  const quoteAction = (id) => {
    axios({
      method: 'POST',
      url: `http://34.230.138.15:9090/v1/customer/accepted`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        _id: id,
      }
    }).then(res => {
      setData(res?.data?.message)
      console.log("res", res);
      setID("")
      toast.success('Quote Accepted Successfully!', {
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

  const createInvoice = () => {
    axios({
      method: 'POST',
      url: `http://34.230.138.15:9090/v1/customer/createinvoice`,
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      console.log("res", res);
      setPdfData(res?.data);
    }).catch((err) => {
    })
  }

  const PDF = () => {

    const styles = StyleSheet.create({
      page: {
        padding: 30,
      },
      container: {
        flex: 1,
        flexDirection: 'row',
      },
      image: {
        marginBottom: 10,
      },
      leftColumn: {
        flexDirection: 'column',
        width: 170,
        paddingTop: 30,
        paddingRight: 15,
      },
      footer: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 15,
        paddingTop: 5,
        borderWidth: 3,
        borderColor: 'gray',
        borderStyle: 'dashed',
        '@media orientation: landscape': {
          marginTop: 10,
        },
      },
      headerarea: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
        alignItems: 'stretch',
      },
      detailColumn: {
        flexDirection: 'column',
        flexGrow: 9,
        textTransform: 'uppercase',
      },
      linkColumn: {
        flexDirection: 'column',
        flexGrow: 2,
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
      },
      hname: {
        fontSize: 16,
      },
      rightContainer: {
        // flex: 1,
        flexDirection: 'column',
        paddingLeft: 15,
        marginBottom: 10,
        paddingTop: 10,
      },
      text: {
        fontSize: 15,
        color: 'black',
      },
      headerContainer: {
        marginTop: 30,
      },
      date: {
        fontSize: 10,
        color: 'black',
        textDecoration: 'none',
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
      },
    });

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.headerarea}>
            <View style={styles.detailColumn}>
              <Text style={styles.hname}>Worksheet - {pdfData?.company_information?.Myaddress}</Text>
            </View>
            <View style={styles.linkColumn}>
              <Text style={styles.date}>{moment(pdfData?.invoice?.[0]?.order_date).utc().format("MM-DD-YYYY")}</Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.leftColumn}>
              <Image
                src={logo}
                style={styles.text}
              />

            </View>

            <View style={styles.headerContainer}>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>
                  Company Information
                </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>My Address: {pdfData?.company_information?.Myaddress} </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>My Website: {pdfData?.company_information?.Mywebsite} </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>Contact: {pdfData?.company_information?.contact} </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>Email: {pdfData?.company_information?.email} </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>------------------------------------------------------------------------------------ </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>Invoice </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>Total Amount: {pdfData?.invoice?.[0]?.Total_amount}</Text>
              </View>

              <View style={styles.rightContainer}>
                <Text style={styles.text}>Total Discount: {pdfData?.invoice?.[0]?.Total_discount}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>Address: {pdfData?.invoice?.[0]?.address} </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>Bill Email: {pdfData?.invoice?.[0]?.billEmail} </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>Customer Name: {pdfData?.invoice?.[0]?.customer_name} </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>Email: {pdfData?.invoice?.[0]?.email} </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>Order Date: {pdfData?.invoice?.[0]?.order_date} </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>Paid: {pdfData?.invoice?.[0]?.paid ? "true" : "false"} </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>Total Pay: {pdfData?.invoice?.[0]?.total_pay} </Text>
              </View>

            </View>
          </View>
        </Page>
      </Document>
    );
  };
  return (
    <Wrapper>
      {
        !loading &&
        <div id='allQuotes' className='relative h-full bg-gray-100 '>
          <h2 className='h2 font-bold py-3 px-5'>All Quotes</h2>
          <div className='container'>

            <div className='flex items-center justify-between mb-5 '>
              <div className='flex'>
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
              <PDFDownloadLink document={<PDF data={pdfData} />} fileName={`invoice_patches.pdf`}>
                <button onClick={() => createInvoice()} className=' bg-green-600 rounded-md hover:bg-green-700 duration-200  py-1.5 ms-4 px-3 text-white'>
                  Create Invoice
                </button>
              </PDFDownloadLink>
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
                  <th scope="col">Message</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.data?.map((order, ind) => {
                    if (order?.User_Approved === "true") {
                    } else {
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
                          <td>{order?.msg}</td>
                          <td>{order?.discount}</td>
                          <td>{order?.Price}</td>
                          <td>
                            {role === "admin" ? <button type="button" onClick={() => setID(order?._id)} className='text-sm border border-black rounded-sm px-2 py-1 bg-[#ff9e0d] hover:bg-[#9c7436] text-white duration-200' data-bs-toggle="modal" data-bs-target="#quoteModal">
                              Update</button> :
                              <>
                                <button type="button" onClick={() => quoteAction(order?._id)} className='text-sm border border-black rounded-sm px-2 py-1 bg-green-600 hover:bg-green-700 text-white duration-200' >Accept</button>
                                <button type="button" onClick={() => quoteAction(order?._id)} className='text-sm border border-black rounded-sm px-2 py-1 bg-red-600 hover:bg-red-700 text-white duration-200' >Reject</button>
                              </>
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


          <div className="modal fade" id="quoteModal" tabindex="-1" aria-labelledby="quoteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title font-bold" id="quoteModalLabel">Write your Quote</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <label>
                    Discount
                  </label>
                  <input type='number' onChange={(e) => setDiscount(e.target.value)} className=' ml-3 mr-5 w-28 shadow-sm border-black border px-2 py-1'>
                  </input>
                  <label>
                    Price
                  </label>
                  <input type='number' onChange={(e) => setPrice(e.target.value)} className=' ml-3 mr-5 w-28 shadow-sm border-black border px-2 py-1'>
                  </input>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary bg-[#5c636a]" data-bs-dismiss="modal">Close</button>
                  <button onClick={() => sendQuote()} type="button" className="btn btn-primary bg-[#0b5ed7] text-white">Send Quote</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </Wrapper>
  )
}

export default AllQuotes