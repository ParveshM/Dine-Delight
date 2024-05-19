import{r as n,j as e,A as f}from"./index-PhVsbpnH.js";import{a as j}from"./axiosService-D1EHKbpV.js";import{u as N,P as k}from"./usePaginateState-n096rT9V.js";import{s as v}from"./toaster-keYC6E8y.js";import"./axios-B6xwUs71.js";import"./index-VWaDGczM.js";import"./logout-DKSxkwX5.js";const R=({isModalOpen:a,sendAction:s,name:t,email:o})=>e.jsx("div",{tabIndex:-1,"aria-hidden":"true",className:"fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center",children:e.jsxs("div",{className:"relative bg-white rounded-lg shadow-lg max-w-md w-full",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border-b",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"Restaurant Details"}),e.jsxs("button",{type:"button",className:"text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center",onClick:()=>a(!1),children:[e.jsx("svg",{className:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})}),e.jsx("span",{className:"sr-only",children:"Close modal"})]})]}),e.jsxs("div",{className:"p-4 md:p-5",children:[e.jsxs("div",{className:"grid gap-4 mb-4 grid-cols-2",children:[e.jsxs("div",{className:"col-span-2",children:[e.jsx("label",{htmlFor:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Restaurant name"}),e.jsx("input",{type:"text",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ",value:t,readOnly:!0})]}),e.jsxs("div",{className:"col-span-2 ",children:[e.jsx("label",{htmlFor:"Email",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Email"}),e.jsx("input",{type:"text",className:"bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",value:o,readOnly:!0})]})]}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx("button",{className:"text-white  bg-red-600  focus:ring-2 focus:ring-red-300 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center ",onClick:()=>s("rejected"),children:"Reject"}),e.jsx("button",{className:"text-white  bg-green-500 hover:bg-green-600 focus:ring-green-400 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center ",onClick:()=>s("approved"),children:"Approve"})]})]})]})}),P=n.memo(R),C=({_id:a,restaurantName:s,email:t,createdAt:o,isModalOpen:i,sendDetails:l})=>e.jsxs("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600",children:[e.jsx("th",{scope:"row",className:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:s}),e.jsx("td",{className:"px-6 py-4",children:t}),e.jsx("td",{className:"px-6 py-4",children:new Date(o).toLocaleDateString("en-US",{day:"numeric",month:"numeric",year:"numeric"})}),e.jsx("td",{className:"px-6 py-4",children:e.jsx("button",{className:"py-2 px-5 rounded-md bg-green-400 text-white font-semibold hover:bg-green-500 transition duration-150",onClick:()=>{l({id:a,name:s,email:t}),i(!0)},children:"View"})})]}),A=n.memo(C),M=()=>{const[a,s]=n.useState([]),[t,o]=n.useState([]),{currentPage:i,setCurrentPage:l,pageSize:x,setPageSize:u,itemsPerPage:h,setItemsPerPage:p}=N();return n.useEffect(()=>{j.get(f+"/restaurants?new_registrations=true",{params:{page:i}}).then(({data:c})=>{const{restaurants:m,count:g,limit:y}=c;s(m),o(m),p(y),u(g)}).catch(c=>console.log(c))},[s,i]),{newRestaurants:a,setNewRestaurants:s,filteredRegistration:t,setFilteredRegistration:o,setCurrentPage:l,currentPage:i,pageSize:x,itemsPerPage:h}},S=(a,s)=>s.filter(t=>t._id!==a),L=()=>{const[a,s]=n.useState(!1),[t,o]=n.useState(null),{newRestaurants:i,filteredRegistration:l,setNewRestaurants:x,setFilteredRegistration:u,setCurrentPage:h,currentPage:p,pageSize:c,itemsPerPage:m}=M(),g=n.useCallback(r=>{s(r)},[s]),y=n.useCallback(r=>{o(r)},[]),w=r=>{j.patch(f+`/validate_restaurant/${t==null?void 0:t.id}`,{action:r}).then(({data:d})=>{const b=S(t==null?void 0:t.id,l);s(!1),x(b),u(b),v(d==null?void 0:d.message,"success")}).catch(d=>console.log(d))};return i.length?e.jsxs(e.Fragment,{children:[e.jsx("h1",{className:"mb-2 text-xl font-semibold ",children:"New Registrations "}),e.jsxs("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg h-screen ",children:[e.jsxs("table",{className:"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Restaurant name"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Email"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Registration Date"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Action"})]})}),e.jsx("tbody",{children:l.map(r=>e.jsx(A,{...r,isModalOpen:g,sendDetails:y},r._id))})]}),e.jsx(k,{currentPage:p,totalCount:c,itemsPerPage:m,onPageChange:r=>h(r)})]}),a&&e.jsx(P,{isModalOpen:g,sendAction:w,name:t==null?void 0:t.name,email:t==null?void 0:t.email})]}):e.jsx("h1",{className:"mt-2 text-xl font-semibold",children:"No registerations yet"})};export{L as default};