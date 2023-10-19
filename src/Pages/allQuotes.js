import axios from 'axios';
import React, { useEffect, useState } from 'react'


import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from '../Components/Wrapper';

const AllQuotes = () => {



  const navigate = useNavigate();


  return (
    <Wrapper>
      <div id='allQuotes' className='relative h-full bg-gray-100 '>
        <h2 className='h2 font-bold py-3 px-5 mb-5'>All Quotes</h2>
        <div className='container'>
          <table class="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Embroidery</th>
                <th scope="col">Height</th>
                <th scope="col">Width </th>
                <th scope="col">Backing_type</th>
                <th scope="col">Bording_type</th>
                <th scope="col">File</th>
                <th scope="col">Messag</th>
                <th scope="col">Discount</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Service5</td>
                <td>Otto</td>
                <td>1232131</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Service2</td>
                <td>Thornton</td>
                <td>213131</td>
                <td>@fat</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Service6</td>
                <td>@twitter</td>
                <td>213213</td>
                <td>@twitter</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  )
}

export default AllQuotes