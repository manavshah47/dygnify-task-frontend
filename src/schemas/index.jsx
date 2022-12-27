import * as Yup from "yup";

export const userSchema = Yup.object({
    firstName:Yup.string().min(2).max(50).required("first name is required"),
    lastName:Yup.string().min(2).max(50).required("last name is required"),
    email:Yup.string().email().required("email is required"),
    phoneNo:Yup.string().matches(/^[6-9]\d{9}$/gi,"incorrect phone number").required("phone number is required")
})

export const businessSchema = Yup.object({
    name:Yup.string().min(2).max(50).required("name is required"),
    address:Yup.string().min(5).max(255).required("address is required"),
    gstNo:Yup.string().length(12).required("gstNo is required"),
    email:Yup.string().email().required("email is required"),
    empCount:Yup.number().min(1).max(5000).required("employee count is required"),
    eshYear:Yup.number().min(1800).max(2023).required("establish year is required")
})

export const loanSchema = Yup.object({
    principalAmount:Yup.number().min(1000).max(500000).required("enter valid prinicipal amount"),
    interestRate:Yup.number().min(1).max(20).required("enter valid interest-rate"),
    loanTenure:Yup.number().min(1).max(180).required("enter valid loan tenure"), // max 180 as 15 years (12 months * 15 years)
    amount:Yup.number().min(1800).max(2023).required("calculate valid total amount"),
    bank:Yup.string().min(2).max(50).required("bank name is required")
})