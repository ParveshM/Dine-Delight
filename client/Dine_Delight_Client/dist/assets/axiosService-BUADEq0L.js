import{a as c}from"./axios-B6xwUs71.js";import{j as n}from"./index-VWaDGczM.js";import{a8 as i}from"./index-DLCA8CUi.js";import{l}from"./logout-DcSaUvZa.js";import{g as k}from"./Set_GetLs-jfIHgayU.js";const m=c.create(),u=async()=>{try{let e=k("refresh_token");const{data:r}=await c.post(i+"/refresh_token",{refresh_token:e});return r==null?void 0:r.access_token}catch{l("Session expired ,please Login")}},g=async()=>{try{let e,r,t=k("access_token");const{data:o}=await c.get(i+"/accessToken",{params:{access_token:t}});e=o==null?void 0:o.access_token,r=o==null?void 0:o.user;const s=await n(e),{role:a}=s;return(a==="seller"||a==="user")&&r.isBlocked&&l("Your account has been blocked by administrator","error"),e}catch(e){console.log(e,"Error in getting token")}};m.interceptors.request.use(async e=>{let r=new Date,t,o;try{o=await g(),t=await n(o)}catch(s){console.log("error in decodeToken"+s)}return t.exp*1e3<r.getTime()&&(o=await u()),e.headers.Authorization="Bearer "+o,e});export{m as a};