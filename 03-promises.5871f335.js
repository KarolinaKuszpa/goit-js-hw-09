function e(e,o){return new Promise(((t,n)=>{setTimeout((()=>{Math.random()>.3?t({position:e,delay:o}):n({position:e,delay:o})}),o)}))}document.querySelector(".form").addEventListener("submit",(o=>{o.preventDefault();const t=document.querySelector('input[name="delay"]'),n=document.querySelector('input[name="step"]'),u=document.querySelector('input[name="amount"]'),i=Number(t.value),l=Number(n.value),r=Number(u.value);for(let o=1;o<=r;o++){e(o,i+(o-1)*l).then((({position:e,delay:o})=>{console.log(`✅ Fulfilled promise ${e} in ${o}ms`)})).catch((({position:e,delay:o})=>{console.log(`❌ Rejected promise ${e} in ${o}ms`)}))}}));
//# sourceMappingURL=03-promises.5871f335.js.map