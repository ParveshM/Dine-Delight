import{j as e,r as g,q as S}from"./index-B9ZM9xO7.js";const H=({size:l=24,color:r="#000000"})=>e.jsx("div",{style:{color:r},children:e.jsxs("svg",{height:l,viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",fill:"currentColor"}),e.jsx("path",{d:"M0 0h24v24H0z",fill:"none"})]})}),y=({size:l=24,color:r="#000000"})=>e.jsx("div",{style:{color:r},children:e.jsxs("svg",{height:l,viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z",fill:"currentColor"}),e.jsx("path",{d:"M0 0h24v24H0z",fill:"none"})]})}),C=({size:l=24,color:r="#000000"})=>e.jsx("div",{style:{color:r},children:e.jsxs("svg",{height:l,viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z",fill:"currentColor"}),e.jsx("path",{d:"M0 0h24v24H0z",fill:"none"})]})}),w=({className:l,count:r=5,value:n,color:f="#ffd700",hoverColor:u="#ffc107",activeColor:d="#ffc107",size:j=30,edit:o=!1,isHalf:v=!0,onChange:a,emptyIcon:L=e.jsx(C,{}),halfIcon:M=e.jsx(y,{}),fullIcon:c=e.jsx(H,{})})=>{const[i,h]=g.useState(null),p=s=>{o&&h(s)},m=()=>{o&&h(null)},z=s=>{o&&a&&a(s+1)},x=[];for(let s=0;s<r;s++){let t;v&&n-s>0&&n-s<1?t=M:s<n?t=c:t=L,i!==null&&s<=i&&(t=c),x.push(e.jsx("div",{className:`${o&&"hover:cursor-pointer"}`,onMouseMove:()=>p(s),onMouseLeave:m,onClick:()=>z(s),children:S.cloneElement(t,{size:j,color:s<=Number(i)?u:s<n?d:f})},s))}return e.jsx("div",{className:`rating ${l}`,children:x})};export{w as S};
