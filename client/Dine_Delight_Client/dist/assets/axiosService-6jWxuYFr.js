import{a as c}from"./axios-B6xwUs71.js";import{j as a}from"./index-VWaDGczM.js";import{a8 as n}from"./index-Clsr7cZy.js";import{l as i}from"./logout-D3s9NhJa.js";import{g as l}from"./Set_GetLs-jfIHgayU.js";const k=c.create();let m=l("access_token"),u=l("refresh_token");const g=async()=>{try{const{data:e}=await c.post(n+"/refresh_token",{refresh_token:u});return e==null?void 0:e.access_token}catch{i("Session expired ,please Login")}},p=async()=>{try{let e,t;const{data:o}=await c.get(n+"/accessToken",{params:{access_token:m}});e=o==null?void 0:o.access_token,t=o==null?void 0:o.user;const r=await a(e),{role:s}=r;return(s==="seller"||s==="user")&&t.isBlocked&&i("Your account has been blocked by administrator","error"),e}catch(e){console.log(e,"Error in getting token")}};k.interceptors.request.use(async e=>{let t=new Date,o,r;try{r=await p(),o=await a(r)}catch(s){console.log("error in decodeToken"+s)}return o.exp*1e3<t.getTime()&&(r=await g()),e.headers.Authorization="Bearer "+r,e});export{k as a};
