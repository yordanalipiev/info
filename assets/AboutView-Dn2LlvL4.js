import{d as c,r as l,b as a,e as i,_ as d,c as m,a as t,t as s,o as p}from"./index-COH37EnK.js";const f=c("counter",()=>{const e=l(0),n=a(()=>e.value*2);function u(){e.value++}function r(){e.value--}return{count:e,doubleCount:n,increment:u,decrement:r}}),S=i({setup(){return{countStore:f()}}});function b(e,n,u,r,C,v){return p(),m("div",null,[n[2]||(n[2]=t("h1",null,"This is an about page",-1)),t("div",null,[t("h1",null,"Count: "+s(e.countStore.count),1),t("h2",null,"Double Count: "+s(e.countStore.doubleCount),1),t("button",{onClick:n[0]||(n[0]=(...o)=>e.countStore.increment&&e.countStore.increment(...o))},"Increment"),t("button",{onClick:n[1]||(n[1]=(...o)=>e.countStore.decrement&&e.countStore.decrement(...o))},"Decrement")])])}const $=d(S,[["render",b]]);export{$ as default};
