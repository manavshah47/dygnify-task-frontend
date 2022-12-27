import React, { useEffect, useState } from 'react'

import axios from "axios";

const UserTable = () => {
  const [userData, setUserData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  useEffect(() => {
    // axios.get(`http://127.0.0.1:3001/api/user/get-all-users?page=${currPage}&limit=${limit}`,{ headers: { "Content-Type": "application/json" } }) // localhost
    axios.get(`http://3.83.166.79:3001/api/user/get-all-users?page=${currPage}&limit=${limit}`,{ headers: { "Content-Type": "application/json" } }) // ec2 backend
    .then(response => {
      setUserData(response.data.user)
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
        <th scope="col">first name</th>
        <th scope="col">last name</th>
        <th scope="col">email</th>
        <th scope="col">phoneNo</th>
        <th scope="col">gender</th>
        <th scope="col">Number of business</th>
      </tr>
    </thead>
    <tbody>
      {
        userData.length > 0 && 
        userData.map((user,index) => {
          return (
            <tr key={index}>
              <td> <span> {index + 1} </span> </td>
              <td> <span> {user.firstName} </span> </td>
              <td> <span> {user.lastName} </span> </td>
              <td> <span> {user.email} </span> </td>
              <td> <span> {user.phoneNo} </span> </td>
              <td> <span> {user.gender} </span> </td>
              <td> <span> {user.business ? user.business.length : 0} </span> </td>
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

export default UserTable