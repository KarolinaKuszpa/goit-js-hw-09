!function(){function e(e,n){return new Promise((function(o,t){setTimeout((function(){Math.random()>.3?o({position:e,delay:n}):t({position:e,delay:n})}),n)}))}document.querySelector(".form").addEventListener("submit",(function(n){n.preventDefault();for(var o=document.querySelector('input[name="delay"]'),t=document.querySelector('input[name="step"]'),u=document.querySelector('input[name="amount"]'),c=Number(o.value),i=Number(t.value),a=Number(u.value),r=1;r<=a;r++){e(r,c+(r-1)*i).then((function(e){var n=e.position,o=e.delay;console.log("✅ Fulfilled promise ".concat(n," in ").concat(o,"ms"))})).catch((function(e){var n=e.position,o=e.delay;console.log("❌ Rejected promise ".concat(n," in ").concat(o,"ms"))}))}}))}();
//# sourceMappingURL=03-promises.838b059f.js.map
