import{i,j as e,L as n,c as l,U as d}from"./index-JE-bpBmX.js";import{N as c}from"./Navbar-CewZRdEQ.js";import{C as x}from"./cooking-pot-Bm0Ujo31.js";import{a as p}from"./axiosService-B1H-UEah.js";import"./logo_copy-x91kgQhH.js";import"./reverseGeocode-DUgJrxOo.js";import"./index-D5A46URa.js";import"./util-OTU7ZyNy.js";import"./chevron-down-BocSVaCI.js";import"./axios-B6xwUs71.js";import"./index-VWaDGczM.js";import"./logout-DB6qYUsy.js";import"./toaster-CbQaQdgB.js";const g="/assets/credit-card-B36XrxE3.png",h=({isSuccess:t})=>{const{id:a}=i();return e.jsx("div",{className:"bg-gray-100 min-h-screen flex justify-center items-center px-2",children:e.jsx("div",{className:`bg-white p-6 rounded-lg shadow-md ${t&&"px-10"}`,children:e.jsxs("div",{className:"text-center",children:[t?e.jsx("svg",{viewBox:"0 0 24 24",className:"text-green-600 w-16 h-16 mx-auto my-6 ",children:e.jsx("path",{fill:"currentColor",d:"M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"})}):e.jsx("div",{className:"w-16 h-16 mx-auto my-6",children:e.jsx("img",{src:g,alt:"Payment failed image"})}),e.jsx("h3",{className:"md:text-2xl text-lg text-gray-900 font-semibold mb-2",children:t?"Booking Successfull":"Payment Failed!"}),e.jsx("p",{className:"text-gray-600 mb-4",children:t?"Thank you for completing your  payment.":"Sorry, your payment was unsuccessful. Please try again later."}),e.jsx("p",{className:"text-gray-600 mb-8",children:t?"Have a great day!":"If the problem persists, please contact customer support."}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(n,{to:t?"/booking_history":"/",className:`inline-block px-8 py-3 ${t?"bg-indigo-600 hover:bg-indigo-500":"bg-red-600 hover:bg-red-500"} text-white font-semibold rounded-lg shadow-md transition duration-300`,children:t?"View Booking":"GO BACK"}),t&&e.jsxs(n,{to:`/cart/${a}`,className:`bg-teal-400 hover:bg-teal-500  inline-flex gap-1 items-center
              text-white font-semibold px-8 py-3 rounded-lg 
              `,children:["Have something on mind ? ",e.jsx(x,{className:"h-4 w-4"})]})]})]})})})},F=()=>{const[t]=l(),{id:a}=i(),r=t.get("success"),o=r==="true";if(r){const m=o?"Paid":"Failed";p.patch(d+`/payment/status/${a}`,{paymentStatus:m}).then(({data:s})=>console.log(s)).catch(s=>console.log(s))}return e.jsxs(e.Fragment,{children:[e.jsx(c,{}),e.jsx(h,{isSuccess:o})]})};export{F as default};
