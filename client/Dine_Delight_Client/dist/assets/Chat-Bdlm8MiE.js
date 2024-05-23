import{C as T,f as H,r,Z as X,U as ee,j as e,c as se,u as te}from"./index-DLCA8CUi.js";import{a as $}from"./axios-B6xwUs71.js";import{d as V}from"./dummyUserImg-Dvp0fbEd.js";import{a as ae}from"./timeConverter-D2pGrZyb.js";import{L as re}from"./LoadingAnimation-BSddrea3.js";import{d as ne}from"./index-DS0oADGo.js";import{N as le}from"./Navbar-DFo9gpoD.js";import{P as Z}from"./panel-right-open-9bxcAkaY.js";import{b as oe}from"./index-ChFGO7Uu.js";import{P as Y}from"./panel-right-close-C-lNwVnA.js";import{C as ie}from"./chevron-left-C40hcVsN.js";import{X as ce}from"./x-BvVeCmLO.js";import"./logo_copy-x91kgQhH.js";import"./reverseGeocode-Ba47HzVd.js";import"./index-hfQJGkmq.js";import"./util-D-aj_Cqt.js";import"./chevron-down-BMkYRQSZ.js";async function O(a,g,m){try{const{data:o}=await $.get(T+`/conversation/${a}`,{params:{recieverId:g,senderId:m}});return o}catch(o){console.log(o)}}const G=({members:a,userId:g,_id:m,currentChat:o,onlineUsers:f})=>{var y;const{role:t,id:j}=H(i=>i.UserSlice),[u,E]=r.useState(null),[b,w]=r.useState(null),[p,S]=r.useState([]),[C,v]=r.useState(0),x=X(),[U,k]=r.useState(!1);return r.useEffect(()=>{const i=o&&o._id===m;return x==null||x.on("notification",async({count:N,senderId:h,chatId:M,text:n})=>{!i||M!==m?a.includes(h)&&v(c=>c+N):S(c=>[...c,{senderId:h,text:n,createdAt:new Date}]),await O(M,h)}),()=>{x==null||x.off("notification")}},[o]),r.useEffect(()=>{const i=f.some(N=>a.filter(h=>h!==j).includes(N));k(i)},[f]),r.useEffect(()=>{const i=a.find(n=>n!==g),N=t==="user"?"/restaurants":"/users",h=$.get(ee+`${N}/${i}`),M=$.get(T+"/messages/",{params:{conversationId:m,unReadMessages:!0,recieverId:i}});Promise.all([h,M]).then(n=>{const[c,R]=n,{user:_,restaurant:L}=c.data;t==="user"?E(L):w(_),S(R.data.messages.reverse()),v(R.data.latestMessages.length)}).catch(n=>{console.error("Error:",n)})},[g,o]),e.jsxs("div",{className:"flex items-center p-2 gap-2 mt-2 hover:bg-gray-200 hover:cursor-pointer rounded-md transition ease-in-out",children:[e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:`absolute top-0 right-1 ${U?"bg-green-500":"bg-gray-500"}  h-3 w-3 rounded-full`}),e.jsx("img",{src:t==="user"?(u==null?void 0:u.primaryImage)??V:(b==null?void 0:b.profilePicture)??V,alt:"User image",className:" w-10 h-10 rounded-full object-cover"})]}),e.jsxs("div",{className:"flex flex-col items-start ml-2",children:[e.jsx("span",{className:"font-semibold",children:t==="user"?(u==null?void 0:u.restaurantName)??"Unnamed":(b==null?void 0:b.name)??"Unnamed"}),e.jsxs("div",{className:"flex items-center gap-2",children:[C>0&&e.jsx("span",{className:"text-sm font-medium text-gray-600",children:C===1?"You have a new message":`${C} new messages`}),C>0&&e.jsx("span",{className:"bg-red-400 rounded-full h-2 w-2"})]}),e.jsx("div",{className:"w-44",children:C===0&&e.jsx("p",{className:"font-medium text-sm text-gray-500 break-words",children:((y=p.at(-1))==null?void 0:y.text)??"No recent messages"})})]})]})},D=({createdAt:a,text:g,isRead:m,own:o,isTyping:f})=>{let t=new Date(a).getHours().toString();return t+=`: ${new Date(a).getMinutes()}`,e.jsx("div",{className:`flex items-start  ${o?"justify-end":"justify-start"} gap-2.5  `,children:e.jsxs("div",{className:"flex flex-col gap-1 w-full max-w-[320px]",children:[e.jsx("div",{className:"flex items-center space-x-2 rtl:space-x-reverse"}),e.jsx("div",{className:`flex flex-col leading-1.5 p-4 border-gray-200 ${o?"bg-indigo-100 rounded-s-xl rounded-ee-xl":"bg-gray-100 rounded-e-xl rounded-es-xl"}  dark:bg-gray-700 break-words  `,children:f?e.jsx(re,{className:"flex "}):e.jsx("p",{className:"text-sm font-normal text-gray-900 dark:text-white",children:g})}),e.jsxs("div",{className:"flex justify-end gap-2 mr-2",children:[e.jsx("span",{className:"text-xs text-end font-normal text-gray-500 dark:text-gray-400",children:a&&ae(t)}),o?e.jsx(ne,{className:`${m?"text-blue-500":"text-gray-500"}`}):null]})]})})};function de(){const a=H(s=>s.UserSlice),[g,m]=r.useState(!0),[o,f]=r.useState([]),[t,j]=r.useState(null),[u,E]=r.useState([]),[b,w]=r.useState([]),[p,S]=r.useState(""),[C,v]=r.useState(null),[x,U]=r.useState(null),[k,y]=r.useState(!1),[i,N]=r.useState(1),[h,M]=r.useState(!1),[n,c]=r.useState(!1),[R,_]=r.useState(!1),[L,F]=r.useState(!1),[J]=se(),q=r.useRef(null),B=r.useRef(null),l=X(),A=r.useRef(),Q=r.useCallback(s=>{n||R||(A.current&&A.current.disconnect(),A.current=new IntersectionObserver(d=>{d[0].isIntersecting&&L&&h&&N(I=>I+1)}),s&&A.current.observe(s))},[n,R,h,L]),z=r.useMemo(()=>t==null?void 0:t.members.find(s=>s!==a.id),[t]);r.useEffect(()=>{async function s(){const I=new URLSearchParams(window.location.search).get("conversation");if(I){const W=await O(I??"",z??"",a.id??"");j(W),new URLSearchParams(window.location.search).delete("conversation"),window.history.replaceState({},"",window.location.pathname)}}s()},[J]),r.useEffect(()=>{x&&(t!=null&&t.members.includes(x.senderId))&&(w(s=>[...s,x]),U(null),l==null||l.emit("update_message_status",{status:!0,recieverId:x.senderId}))},[x,t]),r.useEffect(()=>{l&&(l.on("connect",()=>{console.log("connected to socket")}),l==null||l.emit("addUser",a.id),l==null||l.on("getUsers",s=>{E(s)}),l==null||l.on("getMessage",s=>{y(!1),U({senderId:s.senderId,text:s.text,createdAt:new Date})}),l==null||l.on("get_message_status",s=>{console.log(s),w(d=>d.map(I=>(I.isRead=!0,I)))}),l==null||l.on("senderTyping",s=>{y(!!s)}))},[]),r.useEffect(()=>{a.id&&$.get(T+`/conversations/${a.id}`).then(({data:s})=>{f(s)}).catch(s=>console.log(s))},[]),r.useEffect(()=>{N(1),F(!1),w([])},[t]),r.useEffect(()=>{t!=null&&t._id&&(i===1?c(!0):_(!0),$.get(T+`/messages/?conversationId=${t==null?void 0:t._id}`,{params:{page:i}}).then(({data:s})=>{w(d=>d&&d.length?[...s.messages.reverse(),...d]:s.messages.reverse()),M(s.messages.length>0)}).catch(s=>console.log(s)).finally(()=>i===1?c(!1):_(!1))),v(null),y(!1),S("")},[t,i]),r.useEffect(()=>{var s;(s=B.current)==null||s.scrollIntoView({behavior:"smooth"})},[b,k]),r.useEffect(()=>{const s=setTimeout(()=>{p.length?P(!0):P(!1)},500);return()=>clearTimeout(s)},[p]);const P=s=>{l==null||l.emit("typing",{recieverId:z,isTyping:s})};return{user:a,chats:o,error:C,topRef:q,messages:b,isTyping:k,scrollRef:B,isLoading:n,newMessage:p,onlineUsers:u,currentChat:t,firstChat:Q,handleChange:s=>{const{value:d}=s.target;d.trim().length?v(null):v("Please enter a message"),S(d)},handleSubmit:()=>{if(p.trim().length)v(null);else return P(!1),v("Please enter a message");P(!1),l==null||l.emit("sendMessage",{senderId:a.id,recieverId:z,text:p,chatId:t==null?void 0:t._id}),$.post(T+"/messages",{conversationId:t==null?void 0:t._id,senderId:a.id,text:p.trim()}).then(({data:s})=>{w(d=>[...d,s]),S("")}).catch(s=>console.log(s))},handleScroll:()=>{var d;const s=(d=q.current)==null?void 0:d.scrollTop;s!==void 0&&s<=20?F(!0):F(!1)},setNewMessage:S,isLoadingMore:R,setCurrentChat:j,arrivalMessage:x,showChatsidebar:g,setShowChatSidebar:m,handleTypingStatus:s=>P(s==="focus"),handleCurrentChatClick:async s=>{j(s),m(!1);const d=s.members.find(I=>I!==a.id);await O(s._id,d??"")}}}const me=({chats:a,currentChat:g,showChatsidebar:m,setShowChatSidebar:o,handleCurrentChatClick:f,onlineUsers:t})=>{const j=H(u=>u.UserSlice);return e.jsx(e.Fragment,{children:e.jsxs("aside",{id:"logo-sidebar",className:`fixed top-2 z-20 left-0 w-[275px] h-screen pt-20 shadow-md  transition-transform ${m?"translate-x-0":"sm:-translate-x-0 -translate-x-full"} sm:translate-x-0 bg-gray-50 border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700`,children:[e.jsxs("div",{className:"flex justify-center items-center gap-2",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Restaurants"}),e.jsx(Z,{className:"md:hidden focus:outline-none cursor-pointer",onClick:()=>o(!1)})]}),e.jsx("div",{className:"h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800",children:e.jsx("ul",{className:"space-y-2 font-medium",children:a.length?e.jsx(e.Fragment,{children:a.map(u=>e.jsxs("li",{onClick:()=>f(u),children:[e.jsx(G,{...u,userId:(j==null?void 0:j.id)??"",currentChat:g,onlineUsers:t}),a.length>1&&e.jsx("hr",{className:"mt-2"})]},u._id))}):e.jsx("p",{className:"text-lg font-semibold",children:"No conversations "})})})]})})},ue=r.memo(me),K=({className:a})=>e.jsx("div",{className:`flex justify-center items-center ${a}`,children:e.jsx(oe,{className:"animate-spin mx-auto h-5 w-5"})}),Le=()=>{const{user:a,chats:g,error:m,topRef:o,messages:f,isTyping:t,firstChat:j,scrollRef:u,isLoading:E,newMessage:b,onlineUsers:w,currentChat:p,handleChange:S,handleScroll:C,handleSubmit:v,isLoadingMore:x,setCurrentChat:U,arrivalMessage:k,showChatsidebar:y,setShowChatSidebar:i,handleTypingStatus:N,handleCurrentChatClick:h}=de(),M=te();return e.jsxs(e.Fragment,{children:[a.role==="user"&&e.jsx(le,{}),e.jsxs("div",{className:`flex ${a.role==="user"&&"mt-[70px]"}  p-6 custom-vh border shadow-md rounded-md `,children:[a.role==="user"?e.jsx(ue,{chats:g,showChatsidebar:y,setShowChatSidebar:i,currentChat:p,handleCurrentChatClick:h,onlineUsers:w}):e.jsxs("div",{className:"md:w-1/4   border rounded-md h-[33rem]",children:[e.jsx("h1",{className:"text-center font-semibold text-lg",children:"Users"}),e.jsx("hr",{className:"mt-2"}),g.map((n,c)=>e.jsxs("div",{onClick:()=>h(n),children:[e.jsx(G,{...n,userId:(a==null?void 0:a.id)??"",currentChat:p,onlineUsers:w}),g.length>1&&c!==g.length-1&&e.jsx("hr",{className:"mt-2"})]},n._id))]}),e.jsxs("div",{className:`relative flex-1 my-3  ${a.role==="user"?" md:ml-64":"ml-2"}`,children:[!y&&e.jsx(Y,{className:"md:hidden mr-4 focus:outline-none cursor-pointer",onClick:()=>i(!0)}),p?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`absolute z-10 mt-[-30px] left-0 right-0  py-4 px-6 bg-slate-300 rounded-md
                  dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700`,children:e.jsxs("div",{className:"flex justify-between  items-center ",children:[y?e.jsx(Z,{className:"md:hidden mr-4 focus:outline-none cursor-pointer",onClick:()=>i(!1)}):e.jsx(Y,{className:"md:hidden mr-4 focus:outline-none cursor-pointer",onClick:()=>i(!0)}),e.jsx(ie,{className:"hidden md:block cursor-pointer",onClick:()=>M(-1)}),e.jsx("h2",{className:"text-lg text-center font-semibold text-gray-800 dark:text-gray-200",children:a.name}),e.jsx(ce,{onClick:()=>U(null)})]})}),e.jsxs("div",{className:"flex justify-between h-full flex-col",children:[E?e.jsx(K,{className:"mt-20"}):e.jsxs("div",{className:" pr-4 mt-10 mb-20 overflow-y-auto",onScroll:C,ref:o,children:[x?e.jsx(K,{className:"mt-20"}):null,f.length?f.map((n,c)=>c===0?e.jsx("div",{ref:j,children:e.jsxs("div",{ref:u,children:[e.jsx(D,{...n,own:n.senderId===a.id}),t&&c===f.length-1&&!k&&e.jsx(D,{...n,own:!1,isTyping:t&&c===f.length-1})]})},n._id??c):e.jsxs("div",{ref:u,children:[e.jsx(D,{...n,own:n.senderId===a.id}),t&&c===f.length-1&&!k&&e.jsx(D,{...n,own:!1,isTyping:t&&c===f.length-1})]},n._id??c)):e.jsx("h1",{className:"absolute top-[30%] left-[50%] text-xl text-gray-400 cursor-default",children:"No messages yet"})]}),e.jsx("div",{className:"absolute bottom-0 right-0 left-0 flex items-center mb-[-35px] py-6  px-4 bg-gray-50 rounded-lg dark:bg-gray-700 ",children:e.jsxs("div",{className:"flex flex-col w-full gap-2 mx-4 ",children:[e.jsxs("div",{className:"flex",children:[e.jsx("textarea",{name:"message",onChange:S,value:b,rows:1,className:`p-2.5 ${m?"border-red-500":"border-gray-300"} focus:outline-none w-full text-sm text-gray-900 bg-white rounded-lg border ${m?"focus:border-red-500":"focus:border-blue-500"} focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none`,placeholder:"Your message...",onKeyDown:n=>{n.key==="Enter"&&v()},onBlur:()=>N("blur"),onFocus:()=>N("focus"),autoFocus:!0}),e.jsx("button",{type:"submit",className:"inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600 transition ease-out",onClick:n=>{n.preventDefault(),v()},children:e.jsx("svg",{className:"w-6 h-6 rotate-90",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"})})})]}),m&&e.jsx("p",{className:"ml-4 text-red-500 ",children:m})]})})]})]}):e.jsxs("div",{className:"absolute top-[30%] text-center w-full",children:[e.jsx("h1",{className:"text-4xl text-gray-400 cursor-default mb-4",children:"Start a Conversation!"}),e.jsx("p",{className:"text-lg text-gray-600",children:"Click on a conversation to start chatting."})]})]})]})]})};export{Le as default};