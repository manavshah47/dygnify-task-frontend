import React, { useRef, useEffect, useState } from 'react'
import { useFormik } from "formik";

import { loanSchema } from "../schemas";

import axios from "axios";

// import { useNavigate } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateLoan = () => {
    // const navigate = useNavigate()
    const [businessId, setBusinessId] = useState()
    const [amount,setAmount] = useState()

    const initialValues = {
        bank: "",
        principalAmount:2000,
        loanTenure:5,
        interestRate:2,
        amount
      };

  const submitForm = async (e) => {
      e.preventDefault();
      try {
        const resp = await axios.post(
            // `http://127.0.0.1:3001/api/user/create-loan/${businessId}`, // localhost
            `http://3.83.166.79:3001/api/user/create-loan/${businessId}`, // ec2 backend
          {
            bank: e.target.bank.value,
            principalAmount: parseInt(e.target.principalAmount.value),
            loanTenure: parseInt(e.target.loanTenure.value),
            interestRate: parseInt(e.target.interestRate.value),
            amount:parseInt(amount)
          },
          { headers: { "Content-Type": "application/json" } }
        );
        if(!resp || resp.error){
            console.log(resp.error);
          toast.error("Error while creating loan", { position: "top-center" });    
      }
      else{
          toast.success("loan created succesfully", { position: "top-center" });
          // navigate("/")
      }
      } catch (error) {
        console.log(error);
        toast.error("Internal server error while creating user", { position: "top-center" });
      }
      e.target.reset();
    };

    const initialInputRef = useRef();
    const { values, errors, handleBlur, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: loanSchema,
    });

    useEffect(() => {
        const finalAmount = (values.interestRate*values.loanTenure*values.principalAmount)/100 + values.principalAmount
        setAmount(finalAmount)
    }, [values.interestRate,values.loanTenure,values.principalAmount])

    useEffect(() => {
        setBusinessId(localStorage.getItem("businessId"))
        initialInputRef.current.focus();
    }, []);

    return (
        <>
        <h2 className='margin-container text-center'>Create Business page</h2>
        <div className='width-50 margin-container'>

        <form onSubmit={submitForm} autoComplete="off">
            <div className="form-group flex-container align-center justify-center margin-container-small">
            <label htmlFor="bank" className='margin-right-10 small-width'>Bank Name: </label>
            <div>
                <input type="text" ref={initialInputRef} className="form-control mid-width" id="bank" name="bank" placeholder="Enter bank name" value={values.bank} onChange={handleChange} onBlur={handleBlur}/>
                { errors.bank ? (<p className="font-red font-small">* Enter valid bank name</p>) : null}
            </div>
            </div>
            <div className="form-group flex-container align-center justify-center margin-container-small">
            <label htmlFor="principalAmount" className='margin-right-10 small-width'>principal amount: </label>
            <div>
                <input type="number" className="form-control mid-width" id="principalAmount" name="principalAmount" placeholder="Enter gst number" value={values.principalAmount} onChange={handleChange} onBlur={handleBlur}/>
                { errors.principalAmount ? (<p className="font-red font-small">* Enter valid principal amount</p>) : null}
            </div>
            </div>
            <div className="form-group flex-container align-center justify-center margin-container-small">
            <label htmlFor="loanTenure" className='margin-right-10 small-width'>Loan tenure: </label>
            <div>
                <input type="number" className="form-control mid-width" id="loanTenure" name="loanTenure" placeholder="Enter company employee count" value={values.loanTenure} onChange={handleChange} onBlur={handleBlur}/>
                { errors.loanTenure ? (<p className="font-red font-small">* Enter valid loan tenure</p>) : null}
            </div>
            </div>
            <div className="form-group flex-container align-center justify-center margin-container-small">
            <label htmlFor="interestRate" className='margin-right-10 small-width'>Interest Rate: </label>
            <div>
                <input type="number" className="form-control mid-width" id="interestRate" name="interestRate" placeholder="Enter company establish year" value={values.interestRate} onChange={handleChange} onBlur={handleBlur}/>
                { errors.interestRate ? (<p className="font-red font-small">* Enter valid interest rate</p>) : null}
            </div>
            </div>
            <div className="form-group flex-container align-center justify-center margin-container-small">
            <label htmlFor="amount" className='margin-right-10 small-width'>Final amount: </label>
            <div>
                <input type="text" className="form-control mid-width" id="amount" name="amount" placeholder="" value={amount} onChange={handleChange} onBlur={handleBlur} readOnly/>
            </div>
            </div>
            {
            errors.name ||
            errors.address ||
            errors.gstNo ||
            errors.email ||
            errors.eshYear ||
            errors.empCount ? (
                <div className='flex-container align-center justify-center margin-container-small'>
                <input
                type="submit"
                value="Send"
                className="button disable-input"
                disabled={true}
                />
                </div>
            ) : (
                <div className='flex-container align-center justify-center margin-container-small'>
                <input type="submit" value="send" name='submit' id="submit" className="button" />
                </div>
            )}
        </form>
        </div>
        <ToastContainer/>
        </>
    )
}

export default CreateLoan
