import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useNavigate } from 'react-router-dom'

const ForgotPass = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    // const name = e.target.name
    setFormData({ ...formData, [name]: value });
  };
  const forgetPass = (e) => {
    e.preventDefault()
    axios.post('http://172.16.1.58:9090/v1/signin/forget', { ...formData })
      .then(res => {
        console.log("res", res);
        if (res?.data?.success) {
          localStorage.setItem("token", res?.data?.message?.token)
          toast.success('Email Sent Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch(error => {
        toast.error(error?.response?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error(error);
      });
  }
  return (
    <div id='forgotPass' className='relative h-full '>
      <div className='h-screen'>
        <div className='flex justify-center align-middle h-full items-center'>
          <form className='max-w-[400px] p-[50px] bg-[#fcd04b]'>
            <h3 className='h3 text-center mb-5'>Forgot Password</h3>

            <div className="mb-1 ">
              <label for="email" className="form-label mb-0">Email address</label>
              <input type="email" name='email' onChange={handleChange} className="form-control rounded-none" id="email" aria-describedby="emailHelp" required />
            </div>
            <span className='text-xs text-[#0081e7] font-bold '>Enter your Email to receive password reset link</span>
            <button type="submit" onClick={(e) => forgetPass(e)} className="mt-3 btn btn-primary rounded-none text-white border-none bg-black w-full py-3  hover:!bg-zinc-700 duration-200">Send Email</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPass