import React, { useEffect, useState } from 'react'

import axios from "axios";

const LoanTable = () => {
  const [loanData, setLoanData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  useEffect(() => {
    axios.get(`http://127.0.0.1:3001/api/user/get-all-loan?page=${currPage}&limit=${limit}`,{ headers: { "Content-Type": "application/json" } }) // localhost
    // axios.get(`http://3.83.166.79:3001/api/user/get-all-loan?page=${currPage}&limit=${limit}`,{ headers: { "Content-Type": "application/json" } }) // ec2 backend
    .then(response => {
      setLoanData(response.data.loan)
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
        <th scope="col">Bank name</th>
        <th scope="col">principal amount</th>
        <th scope="col">interest rate</th>
        <th scope="col">loan tenure</th>
        <th scope="col">final amount</th>
        <th scope="col">business id</th>
      </tr>
    </thead>
    <tbody>
      {
        loanData.length > 0 && 
        loanData.map((loan,index) => {
          return (
            <tr key={index}>
              <td> <span> {index + 1} </span> </td>
              <td> <span> {loan.bank} </span> </td>
              <td> <span> {loan.principalAmount} </span> </td>
              <td> <span> {loan.interestRate} </span> </td>
              <td> <span> {loan.loanTenure} </span> </td>
              <td> <span> {loan.amount} </span> </td>
              <td> <span> {loan.business} </span> </td>
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

export default LoanTable