import{r as k,c as S,u as _,d as F,U as p,s as f,j as e,G as L,L as b}from"./index-DLCA8CUi.js";import{u as E}from"./formik.esm-CgPWx7Oh.js";import{a as x}from"./axios-B6xwUs71.js";import{s as l}from"./toaster-KMB571tZ.js";import{v as P}from"./validation-DgoJg7bH.js";import{l as I}from"./logo_copy-x91kgQhH.js";import{j as A}from"./index-VWaDGczM.js";import{s as c}from"./Set_GetLs-jfIHgayU.js";import"./index.esm-ClIUyleD.js";const C="/assets/11174-CckAgJ5H.jpg";x.defaults.withCredentials=!0;const D=()=>{const[j,u]=k.useState(!1),[h]=S(),i=_(),g=F(),s=E({initialValues:{email:"",password:""},validate:P,onSubmit:({email:a,password:o})=>{u(!0),x.post(p+"/login",{email:a,password:o}).then(({data:t})=>{const{name:r,role:n,_id:m}=t.user,{message:d,access_token:v,refresh_token:w}=t;l(d,"success"),g(f({isAuthenticated:!0,name:r,role:n,id:m})),c("access_token",v),c("refresh_token",w);const y=h.get("redirectPath");i(y?-1:"/")}).catch(({response:t})=>{var r;console.log(t),u(!1),l((r=t==null?void 0:t.data)==null?void 0:r.message,"error")})}}),N=a=>{x.post(p+"/google_signIn",{user:a}).then(({data:o})=>{const{message:t,user:r,access_token:n,refresh_token:m}=o;l(t,"success"),g(f({name:r.name,isAuthenticated:!0,role:r.role,id:r._id})),c("access_token",n),c("refresh_token",m);const d=h.get("redirectPath");i(d?-1:"/")}).catch(({response:o})=>l(o.data.message,"error"))};return e.jsxs("section",{className:"flex items-center justify-center min-h-screen",children:[e.jsxs("div",{className:"relative ml-16 h-96 mt-10 flex-1 hidden md:block ",children:[e.jsx("h1",{className:"font-bold text-3xl text-center font-serif  ",children:"Dining Elevated: Reserve Your Culinary Experience Now!"}),e.jsx("div",{className:"absolute w-20 rounded-xl max-w-md:top-14  left-5",children:e.jsx("img",{src:I,alt:"Website logo",className:"max-w-full h-auto items-center"})}),e.jsx("img",{src:C,alt:"image of a couple enjoying dinner with dine delight",className:"max-w-full h-auto  rounded-lg"})]}),e.jsx("div",{className:"flex-1  flex flex-col items-center justify-center px-6 py-8 mx-auto md:mx-0 md:ml-8 lg:ml-16 xl:ml-24",children:e.jsx("div",{className:"w-full bg-white rounded-2xl shadow-2xl md:max-w-md xl:p-0",children:e.jsxs("div",{className:"p-6 space-y-4 md:p-8",children:[e.jsx("h1",{className:"text-xl font-bold leading-tight tracking-tight text-headerText md:text-2xl",children:"Welcome Back!"}),e.jsxs("form",{className:"space-y-4",onSubmit:s.handleSubmit,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-secondaryColor",children:"Email"}),e.jsx("input",{type:"text",id:"email",placeholder:"jhondoe@gmail.com",className:" border-b-2 border-b-slate-200 text-gray-900 outline-none sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ",...s.getFieldProps("email")}),s.errors.email&&s.touched.email&&e.jsx("div",{className:"text-red-500",children:s.errors.email})]}),e.jsxs("div",{className:"relative",children:[e.jsx("label",{htmlFor:"password",className:"block mb-2 text-sm font-medium text-secondaryColor",children:"Password"}),e.jsx("input",{type:"password",id:"password",placeholder:"••••••••",className:" border-b-2 border-b-slate-200 text-gray-900 outline-none sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ",...s.getFieldProps("password")}),s.errors.password&&s.touched.password&&e.jsx("div",{className:"text-red-500",children:s.errors.password}),e.jsx("div",{className:"absolute top-1/2 right-2 transForm -translate-y-1/2 cursor-pointer"})]}),e.jsx("button",{type:"submit",className:"w-full px-6 py-2 text-white rounded-lg bg-gradient-to-l from-red-500 to-red-600 hover:bg-gradient-to-r  transition-all duration-500 ",disabled:!!j,children:e.jsx("span",{className:"font-semibold",children:" SignIn"})})]}),e.jsxs("div",{className:"flex items-center mt-4",children:[e.jsx("div",{className:"border-b border-gray-300 flex-1 "}),e.jsx("div",{className:"mx-3 text-sm text-gray-500 ",children:"Or"}),e.jsx("div",{className:"border-b border-gray-300 flex-1"})]}),e.jsx("div",{className:"px-4 py-2 w-full  flex justify-center gap-2 ",children:e.jsx(L,{onSuccess:a=>{const o=A(a==null?void 0:a.credential);N(o)},onError:()=>{l("Login Failed","error")}})}),e.jsx("p",{className:"text-sm  text-black text-center",children:e.jsx(b,{to:"/user/auth/forgot_password",className:" pl-1 hover:underline font-medium ",children:"Forgot password ?"})}),e.jsxs("p",{className:"text-sm  text-black text-center",children:["Dont have an account ?",e.jsx(b,{to:"/user/auth/signup",className:" pl-1 hover:underline font-medium ",children:"Sign up"})]})]})})})]})},Y=()=>e.jsx(D,{});export{Y as default};