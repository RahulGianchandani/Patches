import axios from 'axios';
import React, { useEffect, useState } from 'react'


import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

  const [formData, setFormData] = useState({
    quantity: 10,
    embroidery: "",
    patchH: 1,
    patchW: 1,
    patchS: 1,
    backingT: "Standard Backing(Sew-On)",
    borderT: "Merrow Border",
    msg: ""
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    // const name = e.target.name
    setFormData({ ...formData, [name]: value });
    console.log("e", e.target.value);

  };

  useEffect(() => {
    if (formData?.patchW && formData?.patchH) {
      setFormData({ ...formData, patchS: (formData?.patchH + formData?.patchW) / 2 });
    }
  }, [formData?.patchH, formData?.patchW])

  const navigate = useNavigate();
  const quote = (e) => {
    e.preventDefault()
    axios.post('http://172.16.1.58:9090/v1/signin/login', { ...formData })
      .then(res => {
        console.log("res", res);
        if (res?.data?.success) {
          localStorage.setItem("token", res?.data?.message?.token)
          toast.success('Quote Submitted Successfully!', {
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

  console.log("formData", formData);
  return (
    <div id='dashboard' className='relative h-full '>
      <div className='py-10'>
        <div className='flex justify-center align-middle h-full items-center'>
          <form className=' p-[50px] bg-[#fcd04b]'>
            <h3 className='h3 text-center'>Quote Your Price</h3>
            <p className='text-xs text-[#0081e7] font-bold text-center'>Enter your product information to get quote today</p>
            <div className="mb-3 mt-4">
              <label for="quantity" className="form-label mb-0">Quantity</label>
              <input type="number" min={10} name='quantity'  value={formData?.quantity} onChange={handleChange} className="form-control rounded-none py-2" id="quantity" required />
            </div>
            <div className="mb-3 mt-4">
              <label for="emb" className="form-label mb-0">Embroidery</label>
              <div className='flex justify-between gap-2'>
                <div className={`imgBox cursor-pointer rounded-[10px] duration-200 ${formData?.embroidery === "text-only" ? "border-2 !border-black" : ""}`} onClick={() => setFormData({ ...formData, embroidery: "text-only" })}>
                  <img src='https://www.patches4less.com/img/store/patch-embroidered-50.png?w=200&s=a4576e151163b681b53fe1b8fab93094'></img>
                  <h5 className='h5 fw-bold text-center text-sm'>Text Only</h5>
                </div>
                <div className={`imgBox cursor-pointer rounded-[10px] duration-200 ${formData?.embroidery === "twill-backing" ? "border-2 !border-black" : ""}`} onClick={() => setFormData({ ...formData, embroidery: "twill-backing" })}>
                  <img src='https://www.patches4less.com/img/store/patch-embroidered-75.png?w=200&s=3ea16e4f8f2e919756a88684bd70bdda'></img>
                  <h5 className='h5 fw-bold text-center text-sm'>w/ Twill Backing</h5>
                </div>
                <div className={`imgBox cursor-pointer rounded-[10px] duration-200 ${formData?.embroidery === "full-embroidery" ? "border-2 !border-black" : ""}`} onClick={() => setFormData({ ...formData, embroidery: "full-embroidery" })}>
                  <img src='https://www.patches4less.com/img/store/patch-embroidered-100.png?w=200&s=4d64022cdd90ec8d65f6deb7c3b11585'></img>
                  <h5 className='h5 fw-bold text-center text-sm'>Full Embroidery</h5>
                </div>
              </div>
            </div>
            <div className='flex justify-between gap-3'>
              <div className="mb-3 mt-4 w-full">
                <label for="patchW" className="form-label mb-0">Patch Width (inches)</label>
                <input type="number" min={10} name='patchW' value={formData?.patchW} onChange={handleChange} className="form-control rounded-none py-2" id="patchW" required />
              </div>
              <div className="mb-3 mt-4 w-full">
                <label for="patchH" className="form-label mb-0">Patch Height (inches)</label>
                <input type="number" min={10} name='patchH' value={formData?.patchH} onChange={handleChange} className="form-control rounded-none py-2" id="patchH" required />
              </div>
            </div>
            <div className=" mt-4">
              <label for="patchS" className="form-label mb-0">Your Calculated Patch Size (inches)</label>
              <input type="number" min={10} name='patchS' readOnly disabled value={formData?.patchS} className="form-control rounded-none py-2 text-[gray]" id="patchS" required />
            </div>
            <span className='text-xs text-[#0081e7] font-bold opacity-80'>Calculated by adding the height and width together and dividing by 2</span>
            <div className='flex justify-between gap-3'>
              <div className="mb-3 mt-4 w-full">
                <label for="backingT" className="form-label mb-0">Backing Type</label>
                <select id='backingT' className="form-select py-2 rounded-none" name='backingT' onChange={handleChange} aria-label="backing type" required>
                  <option selected value="standard-backing">Standard Backing(Sew-On)</option>
                  <option value="iron-on-backing">Iron-On Backing</option>
                  <option value="velcro-backing">Velcro Backing</option>
                  <option value="adhesive-backing">Adhesive Backing(Tape)</option>
                  <option value="plastic-backing">Plastic Backing</option>
                </select>
              </div>
              <div className="mb-3 mt-4 w-full">
                <label for="borderT" className="form-label mb-0">Border; Type</label>
                <select id='borderT' className="form-select py-2 rounded-none" name='backingT' onChange={handleChange} aria-label="border type" required>
                  <option selected value="merrow-border">Merrow Border&reg;</option>
                  <option value="hot-cut-border">Hot-Cut Border</option>
                </select>
              </div>
            </div>
      
            <div className="mb-3 mt-4">
              <label for="msg" className="form-label mb-0">Message</label>
              <textarea value={formData?.msg} onChange={handleChange} name='msg' class="form-control"id="msg" rows={5}></textarea>
            </div>
            <button onClick={(e) => quote(e)} type="submit" className=" hover:!bg-zinc-700 mt-3 duration-200  btn btn-primary rounded-none text-white border-none bg-black w-full py-3 hover:bg-zinc-800">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Dashboard