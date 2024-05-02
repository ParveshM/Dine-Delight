import{j as e,g as D,r as l,u as T,R as f,M as P,I as R,J as B}from"./index-B9ZM9xO7.js";import{T as O}from"./index-B1cvg4c3.js";import{R as A}from"./index-BAbPGxLl.js";import{B as E}from"./Button-BIYKJnQL.js";import{a as g}from"./axiosService-CMzqa1ug.js";import{s as N}from"./toaster-CNrqpvc8.js";import{C as F}from"./calendar-p2P4a4Oo.js";import{U as M}from"./users-iCQS1Eut.js";import{C as v}from"./chevron-down-6YgtehVG.js";import"./axios-B6xwUs71.js";import"./index-VWaDGczM.js";import"./logout-IlbNoRIl.js";const n=()=>e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"animate-pulse h-4 w-40 bg-gray-200 rounded-md"}),e.jsx("div",{className:"animate-pulse h-4 w-48 bg-gray-200 rounded-md"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"animate-pulse h-4 w-4 bg-gray-200 rounded-full"}),e.jsx("div",{className:"animate-pulse h-4 w-16 bg-gray-200 rounded-md"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"animate-pulse h-4 w-4 bg-gray-200 rounded-full"}),e.jsx("div",{className:"animate-pulse h-4 w-36 bg-gray-200 rounded-md"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"animate-pulse h-4 w-4 bg-gray-200 rounded-full"}),e.jsx("div",{className:"animate-pulse h-4 w-12 bg-gray-200 rounded-md"})]})]}),K=()=>{var h,p,j;const{id:i}=D(),[s,b]=l.useState(null),[r,y]=l.useState([]),[c,m]=l.useState("Pending"),[x,o]=l.useState("Accepted"),[d,S]=l.useState(!0),u=T();l.useEffect(()=>{g.get(f+`/bookings/${i}`).then(({data:a})=>{const{bookingDetails:t,preOrder:I}=a;b(t),y(I),S(!1),m(t.bookingStatus),o(t.foodStatus)}).catch(a=>console.log(a))},[]);const w=a=>{a.preventDefault(),g.patch(f+`/booking/edit/${i}`,{bookingStatus:c,userID:s==null?void 0:s.userId._id,foodStatus:x}).then(({data:t})=>{N(t.message),u("/restaurant/reservations")}).catch(()=>{N("Oops! Something went wrong","error"),u("/restaurant/reservations")})},C=l.useMemo(()=>{if(r&&r.length)return r.reduce((a,t)=>a+=t.price,0)},[r]);return e.jsx("div",{className:"flex flex-col items-center justify-center w-full  dark:bg-gray-900",children:e.jsx("div",{className:"w-full max-w-2xl",children:e.jsx("form",{onSubmit:w,children:e.jsxs("div",{className:"bg-white rounded-lg shadow-md dark:bg-gray-700",children:[e.jsxs("div",{className:"p-6 md:p-8",children:[e.jsx("h2",{className:"text-2xl font-semibold text-gray-900 dark:text-white mb-2",children:"Update Reservation"}),e.jsx("hr",{}),e.jsxs("div",{className:"text-gray-600 dark:text-gray-400 grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white dark:bg-gray-800 p-6 ",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Customer Information"}),d?e.jsx(n,{}):e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"",children:[e.jsx("p",{className:"text-sm font-semibold",children:"Name:"}),e.jsx("p",{className:"text-sm",children:(h=s==null?void 0:s.userId)==null?void 0:h.name})]}),e.jsxs("div",{className:"",children:[e.jsx("p",{className:"text-sm font-semibold",children:"Email:"}),e.jsx("p",{className:"text-sm",children:(p=s==null?void 0:s.userId)==null?void 0:p.email})]}),e.jsxs("div",{className:" flex items-center gap-2",children:[e.jsx("p",{className:"text-2xl",children:e.jsx(P,{})}),e.jsx("p",{className:"text-sm",children:s==null?void 0:s.tableId.tableNumber})]}),e.jsxs("div",{className:" flex items-center gap-2",children:[e.jsx(F,{}),e.jsxs("p",{className:"text-sm",children:[((j=s==null?void 0:s.tableSlotId)==null?void 0:j.slotDate)&&new Date(s==null?void 0:s.tableSlotId.slotDate).toLocaleDateString("en-us",{weekday:"long",year:"numeric",month:"long",day:"numeric"})," ","- ",s==null?void 0:s.tableSlotId.startTime]})]}),e.jsxs("div",{className:" flex items-center gap-2",children:[e.jsx("p",{className:"text-sm font-semibold",children:e.jsx(M,{})}),e.jsxs("p",{className:"text-sm",children:[s==null?void 0:s.tableId.capacity," guests"]})]})]})]}),e.jsxs("div",{className:"bg-white dark:bg-gray-800 p-6 ",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Booking Details"}),d?e.jsx(n,{}):e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold",children:"Booking ID:"}),e.jsx("p",{className:"text-sm",children:s==null?void 0:s.bookingId})]}),e.jsxs("div",{className:"",children:[e.jsx("p",{className:"text-sm font-semibold",children:"Payment Method :"}),e.jsxs("div",{className:"text-sm flex items-center gap-2",children:[e.jsx("p",{children:s==null?void 0:s.paymentMethod}),e.jsxs("p",{className:"inline-flex gap-2 items-center",children:["- ",s==null?void 0:s.paymentStatus,(s==null?void 0:s.paymentStatus)==="Paid"?e.jsx(R,{color:"#2eff51"}):(s==null?void 0:s.paymentStatus)==="Failed"?e.jsx(O,{className:"text-red-500"}):e.jsx(A,{className:"text-blue-500"})]})]})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("p",{className:"text-sm font-semibold mr-2",children:"Booking Status:"}),e.jsxs("div",{className:"relative",children:[e.jsx("select",{className:"block appearance-none bg-white border border-gray-300 text-sm py-1 px-2 pr-8 rounded-md focus:outline-none focus:border-blue-500",value:c,onChange:a=>m(a.target.value),children:(s==null?void 0:s.bookingStatus)==="Cancelled"?e.jsx("option",{value:"Cancelled",children:"Cancelled"}):e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"Pending",children:"Pending"}),e.jsx("option",{value:"Confirmed",children:"Confirmed"}),e.jsx("option",{value:"Cancelled",children:"Cancelled"}),e.jsx("option",{value:"Checked-in",children:"Checked-in"}),e.jsx("option",{value:"No-show",children:"No-show"}),e.jsx("option",{value:"Completed",children:"Completed"})]})}),e.jsx("div",{className:"absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none",children:e.jsx(v,{})})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold",children:"GST:"}),e.jsx("p",{className:"text-sm",children:s==null?void 0:s.gstAmount})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold",children:"Amount Paid:"}),e.jsxs("p",{className:"text-sm",children:["₹ ",s==null?void 0:s.totalAmount]})]})]})]}),(s==null?void 0:s.foodStatus)&&e.jsxs("div",{className:"bg-white dark:bg-gray-800 -mt-10 p-6 ",children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Pre Orders"}),d?e.jsx(n,{}):e.jsxs("ul",{className:"flex flex-col  whitespace-nowrap",children:[r.map(a=>e.jsxs("li",{className:"w-full flex items-center gap-2  bg-white rounded-md",children:[e.jsx("p",{className:"text-sm font-medium text-gray-900 w-36",children:a.itemId.name}),e.jsxs("span",{className:"px-2 text-gray-800 font-semibold",children:["x ",a.quantity]}),e.jsxs("p",{className:"text-sm text-gray-900 ",children:["₹ ",a.price*a.quantity]})]},a._id)),e.jsxs("p",{className:"self-end font-semibold text-lg my-3",children:["Total: ₹ ",C]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("p",{className:"text-sm font-semibold mr-2",children:"Cooking Status:"}),e.jsxs("div",{className:"relative",children:[e.jsx("select",{className:"block appearance-none bg-white border border-gray-300 text-sm py-1 px-2 pr-8 rounded-md focus:outline-none focus:border-blue-500",value:x,onChange:a=>o(a.target.value),children:(s==null?void 0:s.foodStatus)==="Served"?e.jsx("option",{value:"Served",children:"Served"}):e.jsx(e.Fragment,{children:B.map(a=>e.jsx("option",{value:a,children:a}))})}),e.jsx("div",{className:"absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none",children:e.jsx(v,{})})]})]})]})]})]})]}),e.jsx("div",{className:"p-2  flex justify-end border-t ",children:e.jsx(E,{label:"Update",handleButtonclick:()=>"",isDisabled:(s==null?void 0:s.bookingStatus)==="Cancelled",buttontype:"submit",className:`text-white ${(s==null?void 0:s.bookingStatus)==="Cancelled"?"bg-indigo-400":"bg-indigo-600 hover:bg-indigo-800"}  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
              py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`})})]})})})})};export{K as default};