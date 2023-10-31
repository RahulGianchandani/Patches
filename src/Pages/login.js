import axios from 'axios';
import React, { useState } from 'react'

import Wrapper from '../Components/Wrapper';

import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",

  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    // const name = e.target.name
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault()
    axios.post('https://backend.royalpatchescustomize.com/v1/signin/login', { ...formData })
      .then(res => {
        console.log("res", res);
        if (res?.data?.success) {
          localStorage.setItem("token", res?.data?.message?.token)
          localStorage.setItem("role", res?.data?.message?.role)
          toast.success('Logged in Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.href = '/dashboard'
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
      <div id='loginPage' className='relative h-full '>
        <div className='h-screen'>
          <div className='flex justify-center align-middle h-full items-center'>
            <form className='max-w-[400px] p-[50px] bg-[#fcd04b]'>
              <h3 className='h3 text-center mb-5'>Sign In</h3>
              <div className="mb-3 ">
                <label for="email" className="form-label mb-0">Email address</label>
                <input type="email" name='email' onChange={handleChange} className="form-control rounded-none py-2" id="email" aria-describedby="emailHelp" required />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-1 ">
                <label for="password" className="form-label mb-0">Password</label>
                <input type="password" name='password' onChange={handleChange} className="form-control rounded-none py-2" id="password" required />
              </div>
              <Link to={"/forgot-pass"}><span className='text-xs text-[#0081e7] font-bold hover:!underline'>Forgot Password?</span></Link>
              <button onClick={(e) => login(e)} type="submit" className=" hover:!bg-zinc-700 duration-200 mt-3 btn btn-primary rounded-none text-white border-none bg-black w-full py-3 hover:bg-zinc-800">Login</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Login