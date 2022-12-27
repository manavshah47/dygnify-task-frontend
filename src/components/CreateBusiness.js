import React, { useRef, useEffect, useState } from 'react'
import { useFormik } from "formik";

import { businessSchema } from "../schemas";

import axios from "axios";

// import { useNavigate } from "react-router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  name: "",
  email: "",
  address: "",
  gstNo: "",
  eshYear:2000,
  empCount:5
};

const CreateBusiness = () => {
    const [userId, setUserId] = useState()
    const [businessId, setBusinessId] = useState()

  // const navigate = useNavigate()

  const submitForm = async (e) => {
      e.preventDefault();
      try {
        const resp = await axios.post(
            // `http://127.0.0.1:3001/api/user/create-business/${userId}`, // localhost
            `http://3.83.166.79:3001/api/user/create-business/${userId}`, // ec2 backend
          {
            name: e.target.name.value,
            gstNo: e.target.gstNo.value,
            email: e.target.email.value,
            address: e.target.address.value,
            empCount: parseInt(e.target.empCount.value),
            eshYear: parseInt(e.target.eshYear.value)
          },
          { headers: { "Content-Type": "application/json" } }
        );
        if(!resp || resp.error){
            console.log(resp.error);
          toast.error("Error while creating business", { position: "top-center" });
      }
      else{
          setBusinessId(resp.data.businessId)
          localStorage.setItem("businessId",resp.data.businessId)
          toast.success("Business created succesfully", { position: "top-center" });
          // navigate("/")
      }
      } catch (error) {
        console.log(error);
        toast.error("Internal server error while creating business", { position: "top-center" });
      }
      e.target.reset();
    };

  const initialInputRef = useRef();
  const { values, errors, handleBlur, handleChange } = useFormik({
  initialValues: initialValues,
  validationSchema: businessSchema,
  });

  useEffect(() => {
    localStorage.setItem("businessId",businessId)
  }, [businessId])

  useEffect(() => {
    initialInputRef.current.focus();
    setUserId(localStorage.getItem("userId"))
  }, []);
  return (
    <>
    <h2 className='margin-container text-center'>Create Business page</h2>
    <div className='width-50 margin-container'>

      <form onSubmit={submitForm} autoComplete="off">
        <div className="form-group flex-container align-center justify-center margin-container-small">
          <label htmlFor="name" className='margin-right-10 small-width'>Business Name: </label>
          <div>
            <input type="text" ref={initialInputRef} className="form-control mid-width" id="name" name="name" placeholder="Enter Business name" value={values.name} onChange={handleChange} onBlur={handleBlur}/>
            { errors.name ? (<p className="font-red font-small">* Enter valid business name</p>) : null}
          </div>
        </div>
        <div className="form-group flex-container align-center justify-center margin-container-small">
          <label htmlFor="gstNo" className='margin-right-10 small-width'>gst no: </label>
          <div>
            <input type="text" className="form-control mid-width" id="gstNo" name="gstNo" placeholder="Enter gst number" value={values.gstNo} onChange={handleChange} onBlur={handleBlur}/>
            { errors.gstNo ? (<p className="font-red font-small">* Enter valid gst number</p>) : null}
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
          <label htmlFor="address" className='margin-right-10 small-width'>Address: </label>
          <div>
            <input type="text" className="form-control mid-width" id="address" name="address" placeholder="Enter business address" value={values.address} onChange={handleChange} onBlur={handleBlur}/>
            { errors.address ? (<p className="font-red font-small">* Enter valid business address</p>) : null}
          </div>
        </div>
        <div className="form-group flex-container align-center justify-center margin-container-small">
          <label htmlFor="empCount" className='margin-right-10 small-width'>Employee count: </label>
          <div>
            <input type="number" className="form-control mid-width" id="empCount" name="empCount" placeholder="Enter company employee count" value={values.empCount} onChange={handleChange} onBlur={handleBlur}/>
            { errors.empCount ? (<p className="font-red font-small">* Enter employee count</p>) : null}
          </div>
        </div>
        <div className="form-group flex-container align-center justify-center margin-container-small">
          <label htmlFor="empCount" className='margin-right-10 small-width'>Establish year: </label>
          <div>
            <input type="number" className="form-control mid-width" id="eshYear" name="eshYear" placeholder="Enter company establish year" value={values.eshYear} onChange={handleChange} onBlur={handleBlur}/>
            { errors.eshYear ? (<p className="font-red font-small">* Enter valid establis year</p>) : null}
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

export default CreateBusiness
