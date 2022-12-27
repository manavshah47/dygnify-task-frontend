import React, { useEffect, useState } from 'react'

import axios from "axios";

const BusinessTable = () => {
  const [businessData, setBusinessData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  useEffect(() => {
    // axios.get(`http://127.0.0.1:3001/api/user/get-all-business?page=${currPage}&limit=${limit}`,{ headers: { "Content-Type": "application/json" } }) // localhost
    axios.get(`http://3.83.166.79:3001/api/user/get-all-business?page=${currPage}&limit=${limit}`,{ headers: { "Content-Type": "application/json" } }) // ec2 backend
    .then(response => {
      setBusinessData(response.data.business)
      setTotalPages(response.data.totalPages)
    })
    .catch(error => console.log("axios error: ", error))
  },[currPage])

  const selectPageHandler = (index) => {
    setCurrPage(index)
  }

  const prevPage = () => {
    setCurrPage(currPage - 1)
  }

  const nextPage = () => {
    setCurrPage(currPage + 1)
  }

  return (
    <>
    <div className='width-80 margin-container flex-container align-center justify-center'>
    <table className="table">
    <thead>
      <tr>
        <th scope="col">ID Number</th>
        <th scope="col">Business name</th>
        <th scope="col">email</th>
        <th scope="col">phoneNo</th>
        <th scope="col">address</th>
        <th scope="col">business employees</th>
        <th scope="col">business estabblish year</th>
        <th scope="col">business loans</th>
      </tr>
    </thead>
    <tbody>
      {
        businessData.length > 0 && 
        businessData.map((business,index) => {
          return (
            <tr key={index}>
              <td> <span> {index + 1} </span> </td>
              <td> <span> {business.name} </span> </td>
              <td> <span> {business.email} </span> </td>
              <td> <span> {business.phoneNo} </span> </td>
              <td> <span> {business.address} </span> </td>
              <td> <span> {business.empCount} </span> </td>
              <td> <span> {business.eshYear} </span> </td>
              <td> <span> {business.loan ? business.loan.length : 0} </span> </td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
    </div>
    <div className='flex-container align-center justify-center'>
      {
        currPage !== 1 && <span className='page' onClick={() => prevPage()} > ◀ </span>
      }
      {
        [...Array(totalPages)].map((_,index) => {
          return <span className={currPage === (index+1 )? 'page currentPage' : 'page'} onClick={() => selectPageHandler(index+1)} key={index}>{index+1}</span>
        })
      }
      {
        currPage !== totalPages && <span className='page' onClick={() => nextPage()} > ▶  </span>
      }
    </div>
    </>
  )
}

export default BusinessTable