import{r as f,u as b,d as w,R as j,s as N,j as e,L as v}from"./index-Clsr7cZy.js";import{u as y}from"./formik.esm-Dt9TmMOy.js";import{v as k}from"./validation-BFByy6V9.js";import{s as l}from"./toaster-Cxs57kxq.js";import{a as L}from"./axios-B6xwUs71.js";import{s as i}from"./Set_GetLs-jfIHgayU.js";import"./index.esm-CyhFtDQD.js";const S="/assets/pexels-wendy-wei-1546039-ZsKZopL1.jpg",A=()=>{const[a,o]=f.useState(!1),n=b(),d=w(),s=y({initialValues:{email:"",password:""},validate:k,onSubmit:({email:c,password:m})=>{o(!0),L.post(j+"/login",{email:c,password:m}).then(({data:t})=>{const{restaurantName:r,role:u,_id:x}=t.restaurant,{message:h,access_token:g,refresh_token:p}=t;l(h,"success"),d(N({isAuthenticated:!0,name:r,role:u,id:x})),i("access_token",g),i("refresh_token",p),setTimeout(()=>{n("/restaurant/dashboard")},1e3)}).catch(({response:t})=>{const{message:r}=t.data;o(!1),l(r,"error")})}});return e.jsxs("section",{className:"flex flex-col md:flex-row h-screen items-center",children:[e.jsxs("div",{className:"relative hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen",children:[e.jsxs("h1",{className:"absolute top-24 left-8 font-bold text-3xl text-white leading-snug",children:["Turn Tables into Profit!",e.jsx("br",{}),e.jsx(v,{to:"/restaurant/auth/signup",children:e.jsx("span",{className:" text-red-500  hover:text-red-600 transition duration-200 hover:underline",children:"Register now."})})]}),e.jsx("img",{src:S,alt:"Restaurant table image ",className:"w-full h-full object-cover"})]}),e.jsx("div",{className:"bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center",children:e.jsxs("div",{className:"w-full h-100",children:[e.jsx("h1",{className:"text-xl md:text-2xl font-bold leading-tight mt-12",children:"Log in to your account"}),e.jsxs("form",{className:"mt-6",onSubmit:s.handleSubmit,children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-700",children:"Email Address"}),e.jsx("input",{type:"text",placeholder:"Enter Email Address",className:"w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none",autoFocus:!0,...s.getFieldProps("email")}),s.errors.email&&s.touched.email&&e.jsx("div",{className:"text-red-500",children:s.errors.email})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx("label",{className:"block text-gray-700",children:"Password"}),e.jsx("input",{type:"password",placeholder:"Enter Password",className:"w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none",...s.getFieldProps("password")}),s.errors.password&&s.touched.password&&e.jsx("div",{className:"text-red-500",children:s.errors.password})]}),e.jsx("button",{type:"submit",className:`w-full block  bg-indigo-700 hover:bg-indigo-600 transition duration-300 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 ${a?"cursor-not-allowed":"cursor-pointer"}`,disabled:a,children:"LogIn"})]})]})})]})},U=()=>e.jsx(A,{});export{U as default};
