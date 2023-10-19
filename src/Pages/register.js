import axios from 'axios';
import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import Wrapper from '../Components/Wrapper';

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    phone: "",
    mobile: "",
    companyName: "",
    companyType: "embroidery",
    billEmail: "",
    website: "",
    country: "US",
    state: "",
    postalCode: "",
    city: "",
    address: "",
    password: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    // const name = e.target.name
    setFormData({ ...formData, [name]: value });
  };

  const register = (e) => {
    e.preventDefault()
    axios.post('http://172.16.1.58:9090/v1/signup/reg', { ...formData })
      .then(res => {
        console.log("res", res);
        if (res?.data?.success) {
          localStorage.setItem("token", res?.data?.token)
          toast.success('Registered Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/login")
        }
      })
      .catch(error => {
        toast.success(error?.response?.data?.message, {
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
      <div id='registerPage' className='relative h-full '>
        <div className='py-24'>
          <div className='flex justify-center align-middle h-full items-center '>
            <form className=' p-[50px] bg-[#fcd04b] row justify-between max-w-[1000px]'>
              <h3 className='h3 text-center mb-5'>Sign Up</h3>
              <div className="mb-3 col-6">
                <label for="fname" className="form-label mb-0">Full Name</label>
                <input type="text" name='fname' onChange={handleChange} className="form-control py-2 rounded-none" id="fname" aria-describedby="emailHelp" required />
              </div>
              <div className="mb-3 col-6">
                <label for="email" className="form-label mb-0">Email address</label>
                <input type="email" name='email' onChange={handleChange} className="form-control py-2 rounded-none" id="email" aria-describedby="emailHelp" required />
              </div>
              <div className="mb-3 col-6">
                <label for="phone" className="form-label mb-0">Phone Number</label>
                <input type="number" name='phone' onChange={handleChange} className="form-control py-2 rounded-none" id="phone" />
              </div>
              <div className="mb-3 col-6">
                <label for="cellNum" className="form-label mb-0">Cell Number</label>
                <input type="number" name='mobile' onChange={handleChange} className="form-control py-2 rounded-none" id="cellNum" />
              </div>
              <div className="mb-3 col-6">
                <label for="company" className="form-label mb-0">Company Name</label>
                <input type="text" name='companyName' onChange={handleChange} className="form-control py-2 rounded-none" id="company" />
              </div>

              <div className="mb-3 col-6">
                <label for="compT" className="form-label mb-0">Company Type</label>
                <select id='compT' className="form-select py-2 rounded-none" name='companyType' onChange={handleChange} aria-label="company type">
                  <option selected value="embroidery">Embroidery</option>
                  <option value="distributer">Distributer</option>
                  <option value="exporters">Exporters</option>
                  <option value="marketing">Marketing</option>
                  <option value="manufacturers">Manufacturers</option>
                  <option value="apparels">Uniform/Apparels</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3 col-6">
                <label for="billEmail" className="form-label mb-0">Email for Billing</label>
                <input type="email" name='billEmail' onChange={handleChange} className="form-control py-2 rounded-none" id="billEmail" />
              </div>
              <div className="mb-3 col-6">
                <label for="website" className="form-label mb-0">Website (if any)</label>
                <input type="url" name='website' onChange={handleChange} className="form-control py-2 rounded-none" id="website" />
              </div>
              <div className="mb-3 col-6">
                <label for="country" className="form-label mb-0">Country</label>
                <select id='country' className="form-select py-2 rounded-none" name='country' onChange={handleChange} aria-label="country">
                  <option value="AF">Afghanistan</option>
                  <option value="AX">Aland Islands</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="AI">Anguilla</option>
                  <option value="AQ">Antarctica</option>
                  <option value="AG">Antigua And Barbuda</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AW">Aruba</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BS">Bahamas</option>
                  <option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BB">Barbados</option>
                  <option value="BY">Belarus</option>
                  <option value="BE">Belgium</option>
                  <option value="BZ">Belize</option>
                  <option value="BJ">Benin</option>
                  <option value="BM">Bermuda</option>
                  <option value="BT">Bhutan</option>
                  <option value="BO">Bolivia</option>
                  <option value="BA">Bosnia And Herzegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BV">Bouvet Island</option>
                  <option value="BR">Brazil</option>
                  <option value="IO">British Indian Ocean Territory</option>
                  <option value="BN">Brunei Darussalam</option>
                  <option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="KH">Cambodia</option>
                  <option value="CM">Cameroon</option>
                  <option value="CA">Canada</option>
                  <option value="CV">Cape Verde</option>
                  <option value="KY">Cayman Islands</option>
                  <option value="CF">Central African Republic</option>
                  <option value="TD">Chad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CX">Christmas Island</option>
                  <option value="CC">Cocos (Keeling) Islands</option>
                  <option value="CO">Colombia</option>
                  <option value="KM">Comoros</option>
                  <option value="CG">Congo</option>
                  <option value="CD">Congo, Democratic Republic</option>
                  <option value="CK">Cook Islands</option>
                  <option value="CR">Costa Rica</option>
                  <option value="CI">Cote D'Ivoire</option>
                  <option value="HR">Croatia</option>
                  <option value="CU">Cuba</option>
                  <option value="CW">Curacao</option>
                  <option value="CY">Cyprus</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option>
                  <option value="GQ">Equatorial Guinea</option>
                  <option value="ER">Eritrea</option>
                  <option value="EE">Estonia</option>
                  <option value="ET">Ethiopia</option>
                  <option value="FK">Falkland Islands (Malvinas)</option>
                  <option value="FO">Faroe Islands</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="GF">French Guiana</option>
                  <option value="PF">French Polynesia</option>
                  <option value="TF">French Southern Territories</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>
                  <option value="GI">Gibraltar</option>
                  <option value="GR">Greece</option>
                  <option value="GL">Greenland</option>
                  <option value="GD">Grenada</option>
                  <option value="GP">Guadeloupe</option>
                  <option value="GU">Guam</option>
                  <option value="GT">Guatemala</option>
                  <option value="GG">Guernsey</option>
                  <option value="GN">Guinea</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option>
                  <option value="HT">Haiti</option>
                  <option value="HM">Heard Island &amp; Mcdonald Islands</option>
                  <option value="VA">Holy See</option>
                  <option value="HN">Honduras</option>
                  <option value="HK">Hong Kong</option>
                  <option value="HU">Hungary</option>
                  <option value="IS">Iceland</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran, Islamic Republic Of</option>
                  <option value="IQ">Iraq</option>
                  <option value="IE">Ireland</option>
                  <option value="IM">Isle Of Man</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italy</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japan</option>
                  <option value="JE">Jersey</option>
                  <option value="JO">Jordan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option>
                  <option value="KI">Kiribati</option>
                  <option value="KR">Korea</option>
                  <option value="KW">Kuwait</option>
                  <option value="KG">Kyrgyzstan</option>
                  <option value="LA">Lao People's Democratic Republic</option>
                  <option value="LV">Latvia</option>
                  <option value="LB">Lebanon</option>
                  <option value="LS">Lesotho</option>
                  <option value="LR">Liberia</option>
                  <option value="LY">Libyan Arab Jamahiriya</option>
                  <option value="LI">Liechtenstein</option>
                  <option value="LT">Lithuania</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MO">Macao</option>
                  <option value="MK">Macedonia</option>
                  <option value="MG">Madagascar</option>
                  <option value="MW">Malawi</option>
                  <option value="MY">Malaysia</option>
                  <option value="MV">Maldives</option>
                  <option value="ML">Mali</option>
                  <option value="MT">Malta</option>
                  <option value="MH">Marshall Islands</option>
                  <option value="MQ">Martinique</option>
                  <option value="MR">Mauritania</option>
                  <option value="MU">Mauritius</option>
                  <option value="YT">Mayotte</option>
                  <option value="MX">Mexico</option>
                  <option value="FM">Micronesia, Federated States Of</option>
                  <option value="MD">Moldova</option>
                  <option value="MC">Monaco</option>
                  <option value="MN">Mongolia</option>
                  <option value="ME">Montenegro</option>
                  <option value="MS">Montserrat</option>
                  <option value="MA">Morocco</option>
                  <option value="MZ">Mozambique</option>
                  <option value="MM">Myanmar</option>
                  <option value="NA">Namibia</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option>
                  <option value="AN">Netherlands Antilles</option>
                  <option value="NC">New Caledonia</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NE">Niger</option>
                  <option value="NG">Nigeria</option>
                  <option value="NU">Niue</option>
                  <option value="NF">Norfolk Island</option>
                  <option value="MP">Northern Mariana Islands</option>
                  <option value="NO">Norway</option>
                  <option value="OM">Oman</option>
                  <option value="PK">Pakistan</option>
                  <option value="PW">Palau</option>
                  <option value="PS">Palestinian Territory, Occupied</option>
                  <option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Philippines</option>
                  <option value="PN">Pitcairn</option>
                  <option value="PL">Poland</option>
                  <option value="PT">Portugal</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="QA">Qatar</option>
                  <option value="RE">Reunion</option>
                  <option value="RO">Romania</option>
                  <option value="RU">Russian Federation</option>
                  <option value="RW">Rwanda</option>
                  <option value="BL">Saint Barthelemy</option>
                  <option value="SH">Saint Helena</option>
                  <option value="KN">Saint Kitts And Nevis</option>
                  <option value="LC">Saint Lucia</option>
                  <option value="MF">Saint Martin</option>
                  <option value="PM">Saint Pierre And Miquelon</option>
                  <option value="VC">Saint Vincent And Grenadines</option>
                  <option value="WS">Samoa</option>
                  <option value="SM">San Marino</option>
                  <option value="ST">Sao Tome And Principe</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="SN">Senegal</option>
                  <option value="RS">Serbia</option>
                  <option value="SC">Seychelles</option>
                  <option value="SL">Sierra Leone</option>
                  <option value="SG">Singapore</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="SB">Solomon Islands</option>
                  <option value="SO">Somalia</option>
                  <option value="ZA">South Africa</option>
                  <option value="GS">South Georgia And Sandwich Isl.</option>
                  <option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SD">Sudan</option>
                  <option value="SR">Suriname</option>
                  <option value="SJ">Svalbard And Jan Mayen</option>
                  <option value="SZ">Swaziland</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="SY">Syrian Arab Republic</option>
                  <option value="TW">Taiwan</option>
                  <option value="TJ">Tajikistan</option>
                  <option value="TZ">Tanzania</option>
                  <option value="TH">Thailand</option>
                  <option value="TL">Timor-Leste</option>
                  <option value="TG">Togo</option>
                  <option value="TK">Tokelau</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad And Tobago</option>
                  <option value="TN">Tunisia</option>
                  <option value="TR">Turkey</option>
                  <option value="TM">Turkmenistan</option>
                  <option value="TC">Turks And Caicos Islands</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UG">Uganda</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US" selected="selected">United States</option>
                  <option value="UM">United States Outlying Islands</option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VE">Venezuela</option>
                  <option value="VN">Viet Nam</option>
                  <option value="VG">Virgin Islands, British</option>
                  <option value="VI">Virgin Islands, U.S.</option>
                  <option value="WF">Wallis And Futuna</option>
                  <option value="EH">Western Sahara</option>
                  <option value="YE">Yemen</option>
                  <option value="ZM">Zambia</option>
                  <option value="ZW">Zimbabwe</option>

                </select>
              </div>
              <div className="mb-3 col-6">
                <label for="state" className="form-label mb-0">State</label>
                <input type="text" onChange={handleChange} name='state' className="form-control py-2 rounded-none" id="state" />
              </div>
              <div className="mb-3 col-6">
                <label for="postalCode" className="form-label mb-0">Postal Code</label>
                <input type="number" name='postalCode' onChange={handleChange} className="form-control py-2 rounded-none" id="postalCode" />
              </div>
              <div className="mb-3 col-6">
                <label for="city" className="form-label mb-0">City</label>
                <input type="text" name='city' onChange={handleChange} className="form-control py-2 rounded-none" id="city" />
              </div>
              <div className="mb-3 col-6">
                <label for="address" className="form-label mb-0">Address</label>
                <input type="text" name='address' onChange={handleChange} className="form-control py-2 rounded-none" id="address" />
              </div>
              <div className="mb-3 col-6">
                <label for="password" className="form-label mb-0">Password</label>
                <input type="password" name='password' onChange={handleChange} className="form-control py-2 rounded-none" id="password" />
              </div>

              <div className='flex justify-center w-full grid-cols-none'><button type="submit" onClick={(e) => register(e)} className=" mt-3 btn btn-primary rounded-none text-white border-none bg-black w-full py-3 hover:!bg-zinc-700 duration-200">Register</button></div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Register