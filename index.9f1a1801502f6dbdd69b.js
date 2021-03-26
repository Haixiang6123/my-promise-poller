(()=>{"use strict";var t="CANCEL_TOKEN",n=function(t){return new Promise((function(n){setTimeout(n,t)}))},e={"fixed-interval":{defaults:{interval:1e3},getNextInterval:function(t,n){return n.interval}},"linear-backoff":{defaults:{start:1e3,increment:1e3},getNextInterval:function(t,n){return n.start+n.increment*t}},"exponential-backoff":{defaults:{min:1e3,max:3e4},getNextInterval:function(t,n){return Math.min(n.max,Math.round(Math.random()*(1e3*Math.pow(2,t)-n.min)+n.min))}}},r=function(){return(r=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++)for(var o in n=arguments[e])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}).apply(this,arguments)};const o=function(o){var i,u=e[o.strategy]||e["fixed-interval"],a=r(r({},u.defaults),o),c=a.taskFn,f=a.masterTimeout,l=a.taskTimeout,s=a.shouldContinue,v=a.retries,d=!0,h=[],m=void 0===v?5:v;return new Promise((function(e,r){f&&(i=window.setTimeout((function(){r(new Error("Master timeout")),d=!1}),f));var v=function(){var f=c();!1===f&&(f=Promise.reject(f),r(h),d=!1);var p,y,w=Promise.resolve(f);l&&(p=w,y=l,w=new Promise((function(t,n){var e=setTimeout((function(){return n(new Error("Task timeout"))}),y);p.then((function(n){clearTimeout(e),t(n)}))}))),w.then((function(t){if(s(null,t)){var r=u.getNextInterval(m,a);n(r).then(v)}else null!==i&&clearTimeout(i),e(t)})).catch((function(e){if(e.message===t&&(r(h),d=!1),h.push(e),0!=--m&&s(e)){if(d){var i=u.getNextInterval(m,o);n(i).then(v)}}else r(h)}))};v()}))};var i=function(t,n,e,r){return new(e||(e=Promise))((function(o,i){function u(t){try{c(r.next(t))}catch(t){i(t)}}function a(t){try{c(r.throw(t))}catch(t){i(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(u,a)}c((r=r.apply(t,n||[])).next())}))},u=function(t,n){var e,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(e)throw new TypeError("Generator is already executing.");for(;u;)try{if(e=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=n.call(t,u)}catch(t){i=[6,t],r=0}finally{e=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},a=document.querySelector("#start"),c=document.querySelector("#async-stop"),f=document.querySelector("#fixed-counter"),l=document.querySelector("#linear-counter"),s=document.querySelector("#exponential-counter"),v=0,d=0,h=0,m=!1,p=99999;a.onclick=function(){return i(void 0,void 0,void 0,(function(){return u(this,(function(n){return o({strategy:"fixed-interval",interval:100,taskFn:function(){return i(void 0,void 0,void 0,(function(){return u(this,(function(n){if(m)throw new Error(t);return v+=1,f.innerText=v.toString(),[2]}))}))},shouldContinue:function(){return v<p}}),o({strategy:"linear-backoff",start:100,increment:100,taskFn:function(){return i(void 0,void 0,void 0,(function(){return u(this,(function(n){if(m)throw new Error(t);return d+=1,l.innerText=d.toString(),[2]}))}))},shouldContinue:function(){return d<p}}),o({strategy:"exponential-backoff",min:100,max:3e3,taskFn:function(){return i(void 0,void 0,void 0,(function(){return u(this,(function(n){if(m)throw new Error(t);return h+=1,s.innerText=h.toString(),[2]}))}))},shouldContinue:function(){return d<p}}),[2]}))}))},c.onclick=function(){return m=!0}})();
//# sourceMappingURL=index.9f1a1801502f6dbdd69b.js.map