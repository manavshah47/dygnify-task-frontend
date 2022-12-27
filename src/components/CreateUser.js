import React, { useRef, useEffect, useState } from 'react'
import { useFormik } from "formik";

import { userSchema } from "../schemas";

import axios from "axios";

// import { useNavigate } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = "http://127.0.0.1:3001/api/user/create-user"; //localhost
// const url = "http://3.83.166.79:3001/api/user/create-user"; // ec2 backend

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: ""
};

const CreateUser = () => {
  const [userId, setUserId] = useState();
  // const navigate = useNavigate()
  const [gender, setGender] = useState("male");

  const submitForm = async (e) => {
      e.preventDefault();
      try {
        const resp = await axios.post(
          url,
          {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            phoneNo: e.target.phoneNo.value,
            gender: gender
          },
          { headers: { "Content-Type": "application/json" } }
        );
        if(!resp || resp.error){
          toast.error("Error while creating user", { position: "top-center" });    
      }
      else{
        setUserId(resp.data.userId)
        toast.success("User created succesfully", { position: "top-center" });
        // navigate("/")
      }
      } catch (error) {
        toast.error("Internal server error while creating user", { position: "top-center" });
      }
      e.target.reset();
    };

  const initialInputRef = useRef();
  const { values, errors, handleBlur, handleChange } = useFormik({
  initialValues: initialValues,
  validationSchema: userSchema,
  });

  useEffect(() => {
    localStorage.setItem("userId",userId)
  },[userId])

  useEffect(() => {
    initialInputRef.current.focus();
  }, []);
  return (
    <>
    <h2 className='margin-container text-center'>Create User page</h2>
    <div className='width-50 margin-container'>

      <form onSubmit={submitForm} autoComplete="off">
        <div className="form-group flex-container align-center justify-center margin-container-small">
          <label htmlFor="name" className='margin-right-10 small-width'>First Name: </label>
          <div>
            <input type="text" ref={initialInputRef} className="form-control mid-width" id="firstName" name="firstName" placeholder="Enter first name" value={values.firstName} onChange={handleChange} onBlur={handleBlur}/>
            { errors.firstName ? (<p className="font-red font-small">* Enter valid first name</p>) : null}
          </div>
        </div>
        <div className="form-group flex-container align-center justify-center margin-container-small">
          <label htmlFor="name" className='margin-right-10 small-width'>Last Name: </label>
          <div>
            <input type="text" className="form-control mid-width" id="lastName" name="lastName" placeholder="Enter last name" value={values.lastName} onChange={handleChange} onBlur={handleBlur}/>
            { errors.lastName ? (<p className="font-red font-small">* Enter valid last name</p>) : null}
          </div>
        </div>
        <div className="form-group flex-container align-center justify-center margin-container-small">
          <label htmlFor="email" className='margin-right-10 small-width'>Email: </label>
          <div>
            <input type="email" className="form-control mid-width" id="email" name="email" placeholder="Enter email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
            { errors.email ? (<p className="font-red font-small">* Enter valid email id</p>) : null}
          </div>
        </div>
        <div className="form-group flex-container align-center justify-center margin-container-small">
          <label htmlFor="phoneNo" className='margin-right-10 small-width'>Phone: </label>
          <div>
            <input type="text" className="form-control mid-width" id="phoneNo" name="phoneNo" placeholder="Enter phone number" value={values.phoneNo} onChange={handleChange} onBlur={handleBlur}/>
            { errors.phoneNo ? (<p className="font-red font-small">* Enter valid phone number</p>) : null}
          </div>
        </div>
        <div className="form-group flex-container align-center justify-center margin-container-small">
          <label htmlFor="phoneNo" className='margin-right-10 small-width'>gender: </label>
          <div className="form-check flex-container" style={{width:"250px"}}>
            <div className='flex-container' style={{width:"80px",marginLeft:"20px"}}>
              <label>Male</label>
              <input className="form-check-input" type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} onBlur={handleBlur} id="flexRadioDefault1" defaultChecked/>
            </div>
            <div className='flex-container'>
              <label>female</label>
              <input className="form-check-input" type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} onBlur={handleBlur} id="flexRadioDefault1" />
            </div>
          </div>
        </div>
        {
          errors.email ||
          errors.firstName ||
          errors.lastName ||
          errors.phoneNo ||
          errors.gender ? (
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

export default CreateUser
