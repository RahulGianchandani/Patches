import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const ResetPass = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    cPass: "",
  });
  console.log("formData", formData);
  const handleChange = (e) => {
    const { value, name } = e.target;
    // const name = e.target.name
    setFormData({ ...formData, [name]: value });
  };
  const resetPass = (e) => {
    e.preventDefault()
    axios.post('http://172.16.1.58:9090/v1/signin/login', { ...formData })
      .then(res => {
        console.log("res", res);
        if (res?.data?.success) {
          localStorage.setItem("token", res?.data?.message?.token)
          toast.success('Password Has Been Reset Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/")
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
    <div id='resetPass' className='relative h-full '>
      <div className='h-screen'>
        <div className='flex justify-center align-middle h-full items-center'>
          <form className=' min-w-[400px] p-[50px] bg-[#fcd04b]'>
            <h3 className='h3 text-center mb-5'>Reset Password</h3>

            <div className="mb-3 ">
              <label for="password" className="form-label mb-0">Password</label>
              <input type="password" name='password' onChange={handleChange} className="form-control rounded-none py-2" id="password" required />
            </div>
            <div className="mb-3 ">
              <label for="cPass" className="form-label mb-0">Confirm Password</label>
              <input type="password" name='cPass' onChange={handleChange} className="form-control rounded-none py-2" id="cPass" required />
            </div>
            <button type="submit" onClick={(e) => resetPass(e)} className="mt-3 btn btn-primary rounded-none text-white border-none bg-black w-full py-3  hover:!bg-zinc-700 duration-200">Reset</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPass