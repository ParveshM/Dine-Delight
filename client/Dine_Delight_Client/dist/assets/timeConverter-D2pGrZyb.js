const u=r=>{if(!r)return"";let[t,n]=r.split(":").map(a=>parseInt(a,10));const o=t.toString().padStart(2,"0"),e=n.toString().padStart(2,"0");return t<12?`${o}:${e} AM`:`${t%12||12}:${e} PM`},i=r=>r?new Date("1970-01-01T"+r+"Z").toLocaleTimeString("en-US",{timeZone:"UTC",hour12:!0,hour:"numeric",minute:"numeric"}):"";export{u as a,i as c};
