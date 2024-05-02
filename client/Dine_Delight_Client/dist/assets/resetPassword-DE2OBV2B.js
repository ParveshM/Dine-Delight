import{u as i,g as l,j as s,U as n}from"./index-B9ZM9xO7.js";import{u as m}from"./formik.esm-pdf8A3fL.js";import{b as c}from"./validation-DgTpuHX6.js";import{a as p}from"./axios-B6xwUs71.js";import{s as a}from"./toaster-CNrqpvc8.js";import{C as u}from"./chevron-left-Bi33ixbq.js";import"./index.esm-Ct0SCpd3.js";const P=()=>{const o=i(),{id:t}=l(),e=m({initialValues:{password:"",confirmPassword:""},validate:c,onSubmit:({password:d})=>{p.post(n+`/reset_password/${t}`,{password:d}).then(({data:r})=>{a(r.message,"success"),o("/user/auth/login")}).catch(({response:r})=>a(r.data.message,"error"))}});return s.jsx("div",{className:"flex  justify-center items-center h-screen bg-slate-50",children:s.jsxs("div",{className:" my-10 bg-white p-8 rounded-xl border shadow shadow-slate-300",children:[s.jsx(u,{className:"mb-2 cursor-pointer",onClick:()=>o(-1)}),s.jsx("h1",{className:"text-2xl font-medium",children:"Reset password"}),s.jsx("form",{className:"my-5 ",onSubmit:e.handleSubmit,children:s.jsxs("div",{className:"flex flex-col space-y-5 ",children:[s.jsxs("label",{htmlFor:"text",children:[s.jsx("p",{className:"font-medium text-slate-700 pb-2",children:"Password"}),s.jsx("input",{type:"password",className:"w-full py-3 px-3 border md:px-20 border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow",placeholder:"Enter new password",...e.getFieldProps("password")}),!e.errors.password||e.touched.password&&s.jsx("p",{className:"text-red-500",children:e.errors.password})]}),s.jsxs("label",{htmlFor:"confirm Password",children:[s.jsx("p",{className:"font-medium text-slate-700 pb-2",children:"confirm Password"}),s.jsx("input",{type:"password",className:"w-full py-3 px-3 border md:px-20 border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow",placeholder:"Confirm new  Password ",...e.getFieldProps("confirmPassword")}),!e.errors.confirmPassword||e.touched.confirmPassword&&s.jsx("p",{className:"text-red-500",children:e.errors.confirmPassword})]}),s.jsx("button",{className:"w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center",type:"submit",children:s.jsx("span",{children:"Submit"})})]})})]})})};export{P as default};
