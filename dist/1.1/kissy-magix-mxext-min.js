KISSY.add("magix/magix",function(e){var t=[].slice,r=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,n=/\/[^\/]*$/,i=/[#?].*$/,a="",o=/([^=&?\/#]+)=?([^&=#?]*)/g,s="pathname",c=/^https?:\/\//i,u=0,f="/",v="vframe",h=function(){},l={tagName:v,rootId:"magix_vf_root",execError:h},d={}.hasOwnProperty,m=function(e){return function(t,r,n){switch(arguments.length){case 0:n=e;break;case 1:n=$.isObject(t)?y(e,t):g(e,t)?e[t]:null;break;case 2:null===r?(delete e[t],n=r):e[t]=n=r}return n}},p=function(e,t){var r=this;return r.get?(r.c=[],r.x=e||20,r.b=r.x+(isNaN(t)?5:t),void 0):new p(e,t)},g=function(e,t){return e?d.call(e,t):e},y=function(e,t,r){for(var n in t)r&&g(r,n)||(e[n]=t[n]);return e};y(p.prototype,{get:function(e){var t,r=this,n=r.c;return e=s+e,g(n,e)&&(t=n[e],t.f>=1&&(t.f++,t.t=u++,t=t.v)),t},set:function(e,t,r){var n=this,i=n.c,a=s+e,o=i[a];if(!g(i,a)){if(i.length>=n.b){i.sort(function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f});for(var c=n.b-n.x;c--;)o=i.pop(),delete i[o.k],o.m&&b(o.m,o.o,o)}o={},i.push(o),i[a]=o}return o.o=e,o.k=a,o.v=t,o.f=1,o.t=u++,o.m=r,o},del:function(e){e=s+e;var t=this.c,r=t[e];r&&(r.f=-1e5,r.v=a,delete t[e],r.m&&(b(r.m,r.o,r),r.m=0))},has:function(e){return e=s+e,g(this.c,e)}});var x=p(60),w=p(),b=function(e,t,r,n,i,a){for($.isArray(e)||(e=[e]),t&&($.isArray(t)||t.callee)||(t=[t]),n=0;e.length>n;n++)try{a=e[n],i=a&&a.apply(r,t)}catch(o){l.execError(o)}return i},$={isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},mix:y,has:g,safeExec:b,noop:h,config:m(l),start:function(e){var t=this;y(l,e),t.libRequire(l.iniFile,function(r){l=y(l,r,e),l.tagNameChanged=l.tagName!=v;var n=l.progress;t.libRequire(["magix/router","magix/vom"],function(e,r){e.on("!ul",r.locChged),e.on("changed",r.locChged),n&&r.on("progress",n),t.libRequire(l.extensions,e.start)})})},keys:Object.keys||function(e){var t=[];for(var r in e)g(e,r)&&t.push(r);return t},local:m({}),path:function(e,t){var o=e+"\n"+t,s=w.get(o);if(!s){if(c.test(t))s=t;else if(e=e.replace(i,a).replace(n,a)+f,t.charAt(0)==f){var u=c.test(e)?8:0,v=e.indexOf(f,u);s=e.substring(0,v)+t}else s=e+t;for(;r.test(s);)s=s.replace(r,"$1/");w.set(o,s)}return s},pathToObject:function(e,t){var r=x.get(e);if(!r){r={};var n={},u=a;i.test(e)?u=e.replace(i,a):~e.indexOf("=")||(u=e);var v=e.replace(u,a);if(u&&c.test(u)){var h=u.indexOf(f,8);u=-1==h?f:u.substring(h)}v.replace(o,function(e,r,i){if(t)try{i=decodeURIComponent(i)}catch(a){}n[r]=i}),r[s]=u,r.params=n,x.set(e,r)}return r},objectToPath:function(e,t){var r,n=e[s],i=[],a=e.params;for(var o in a)r=a[o],t&&encodeURIComponent(r),i.push(o+"="+r);return i.length&&(n=n+"?"+i.join("&")),n},listToMap:function(e,t){var r,n,i,a={};if($.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(r=0;i>r;r++)n=e[r],a[t?n[t]:n]=t?n:1;return a},cache:p};return y($,{libRequire:function(r,n){r?e.use(r+"",function(e){n&&n.apply(e,t.call(arguments,1))}):n&&n()},isArray:e.isArray,isFunction:e.isFunction,isObject:e.isObject,isRegExp:e.isRegExp,isString:e.isString,isNumber:e.isNumber})}),KISSY.add("magix/router",function(e,t,r,n){var i,a,o,s,c,u=window,f="",v="pathname",h=t.has,l=t.mix,d=document,m=/^UTF-8$/i.test(d.charset||d.characterSet||"UTF-8"),p=t.config(),g=t.cache(),y=t.cache(40),x=/#.*$/,w=/^[^#]*#?!?/,b="params",$=p.nativeHistory,C=function(e,r,n){if(e){n=this[b],t.isString(e)&&(e=e.split(","));for(var i=0;e.length>i&&!(r=h(n,e[i]));i++);}return r},E=function(){return h(this,v)},M=function(){return h(this,"view")},S=function(e,t,r){return t=this,r=t[b],r[e]},T=function(e){var r=t.pathToObject(e,m),n=r[v];return n&&c&&(r[v]=t.path(u.location[v],n)),r},I=l({getView:function(e,r){if(!o){o={rs:p.routes||{},nf:p.notFoundView};var n=p.defaultView;if(!n)throw Error("unset defaultView");o.home=n;var i=p.defaultPathname||f;o.rs[i]=n,o[v]=i}var a;e||(e=o[v]);var s=o.rs;return a=t.isFunction(s)?s.call(p,e,r):s[e],{view:a?a:o.nf||o.home,pathname:a||$?e:o.nf?e:o[v]}},start:function(){var e=I,t=u.history;s=$&&t.pushState,c=$&&!s,s?e.useState():e.useHash(),e.route()},parseQH:function(e,t){e=e||u.location.href;var r=I,n=g.get(e);if(!n){var i=e.replace(x,f),a=e.replace(w,f),o=T(i),s=T(a),c={};l(c,o[b]),l(c,s[b]),n={get:S,href:e,srcQuery:i,srcHash:a,query:o,hash:s,params:c},g.set(e,n)}if(t&&!n.view){var h;h=$?n.hash[v]||n.query[v]:n.hash[v];var d=r.getView(h,n);l(n,d)}return n},getChged:function(e,t){var r=e.href,n=t.href,i=r+"\n"+n,a=y.get(i);if(a||(i=n+"\n"+i,a=y.get(i)),!a){var o,s,c;a={params:{}},s=e[v],c=t[v],s!=c&&(a[v]={from:s,to:c},o=1),s=e.view,c=t.view,s!=c&&(a.view={from:s,to:c},o=1);var u,f=e[b],h=t[b];for(u in f)s=f[u],c=h[u],f[u]!=h[u]&&(o=1,a[b][u]={from:s,to:c});for(u in h)s=f[u],c=h[u],f[u]!=h[u]&&(o=1,a[b][u]={from:s,to:c});a.occur=o,a.isParam=C,a.isPathname=E,a.isView=M,y.set(i,a)}return a},route:function(){var e=I,t=e.parseQH(0,1),r=a||{params:{},href:"~"},n=!a;a=t;var o=e.getChged(r,t);o.occur&&(i=t,e.fire("changed",{location:t,changed:o,force:n}))},navigate:function(e,r,n){var a=I;if(!r&&t.isObject(e)&&(r=e,e=f),r&&(e=t.objectToPath({params:r,pathname:e},m)),e){var o=T(e),u={};if(u[b]=l({},o[b]),u[v]=o[v],u[v]){if(c){var d=i.query;if(d&&(d=d[b]))for(var p in d)h(d,p)&&!h(u[b],p)&&(u[b][p]=f)}}else{var g=l({},i[b]);u[b]=l(g,u[b]),u[v]=i[v]}var y,x=t.objectToPath(u);y=s?x!=i.srcQuery:x!=i.srcHash,y&&(s?(a.poped=1,history[n?"replaceState":"pushState"](null,null,x),a.route()):(l(u,i,u),u.srcHash=x,u.hash={params:u[b],pathname:u[v]},a.fire("!ul",{loc:i=u}),x="#!"+x,n?location.replace(x):location.hash=x))}}},r);return I.useState=function(){var e=I,t=location.href;n.on(u,"popstate",function(){var r=location.href==t;(e.poped||!r)&&(e.poped=1,e.route())})},I.useHash=function(){n.on(u,"hashchange",I.route)},I},{requires:["magix/magix","magix/event","event"]}),KISSY.add("magix/body",function(e,t,r){var n,i=t.has,a=t.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),o=document.body,s={},c=String.fromCharCode(26),u="mx-owner",f="mx-ie",v={},h=65536,l=function(e){return e.id||(e.id="mx-e-"+h--)},d=function(e,t,r){return r?e.setAttribute(t,r):r=e.getAttribute(t),r},m={process:function(e){for(var t=e.target||e.srcElement;t&&1!=t.nodeType;)t=t.parentNode;var r=t,a=e.type,s=v[a]||(v[a]=RegExp("(?:^|,)"+a+"(?:,|$)"));if(!s.test(d(t,f))){for(var h,m,p="mx-"+a,g=[];r&&r!=o&&(h=d(r,p),m=d(r,f),!h&&!s.test(m));)g.push(r),r=r.parentNode;if(h){var y,x=h.indexOf(c);x>-1&&(y=h.slice(0,x),h=h.slice(x));var w=d(r,u)||y;if(!w)for(var b=r,$=n.all();b&&b!=o;){if(i($,b.id)){d(r,u,w=b.id);break}b=b.parentNode}if(!w)throw Error("miss "+u+":"+h);var C=n.get(w),E=C&&C.view;E&&E.processEvent({info:h,se:e,st:a,tId:l(t),cId:l(r)})}else for(var M;g.length;)M=g.shift(),m=d(M,f),s.test(m)||(m=m?m+","+a:a,d(M,f,m))}},on:function(e,t){var r=this;if(s[e])s[e]++;else{n=t,s[e]=1;var i=a[e];i?r.unbubble(0,o,e):o["on"+e]=function(e){e=e||window.event,e&&r.process(e)}}},un:function(e){var t=this,r=s[e];if(r>0){if(r--,!r){var n=a[e];n?t.unbubble(1,o,e):o["on"+e]=null}s[e]=r}}};return m.unbubble=function(e,t,n){var i=e?r.undelegate:r.delegate;i.call(r,t,n,"[mx-"+n+"]",m.process)},m},{requires:["magix/magix","event","sizzle"]}),KISSY.add("magix/event",function(e,t){var r=function(e){return"~"+e},n=t.safeExec,i={fire:function(e,t,i,a){var o=r(e),s=this,c=s[o];if(c){t||(t={}),t.type||(t.type=e);for(var u,f,v=c.length,h=v-1;v--;)u=a?v:h-v,f=c[u],(f.d||f.r)&&(c.splice(u,1),h--),f.d||n(f.f,t,s)}i&&delete s[o]},on:function(e,n,i){var a=r(e),o=this[a]||(this[a]=[]);t.isNumeric(i)?o.splice(i,0,{f:n}):o.push({f:n,r:i})},un:function(e,t){var n=r(e),i=this[n];if(i)if(t){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==t&&!a.d){a.d=1;break}}else delete this[n]}};return i},{requires:["magix/magix"]}),KISSY.add("magix/vframe",function(e,t,r,n){var i,a,o,s=document,c=65536,u=t.safeExec,f=[].slice,v=t.mix,h=t.config("tagName"),l=t.config("rootId"),d=!t.config("tagNameChanged"),m=t.has,p="mx-view",g=d?"mx-defer":"mx-vframe",y="alter",x="created",w=function(e){return"object"==typeof e?e:s.getElementById(e)},b=function(e,t,r){return r=w(e),r?r.getElementsByTagName(t):[]},$=function(e){return s.createElement(e)},C=function(e){return e.id||(e.id="magix_vf_"+c--)},E=function(e,t,r){if(e=w(e),t=w(t),e&&t)if(e!==t)try{r=t.contains?t.contains(e):16&t.compareDocumentPosition(e)}catch(n){r=0}else r=1;return r},M=/<script[^>]*>[\s\S]*?<\/script>/gi,S=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<30,t.rM={}};return v(S,{root:function(e,t){if(!i){o=t;var r=w(l);r||(r=$(h),r.id=l,s.body.insertBefore(r,s.body.firstChild)),i=new S(l),e.add(i)}return i}}),v(v(S.prototype,r),{mountView:function(e,r,i){var a=this,s=w(a.id);if(s._bak?s._chgd=1:(s._bak=1,s._tmpl=s.innerHTML.replace(M,"")),a.unmountView(),e){var c=t.pathToObject(e),f=c.pathname,h=--a.sign;t.libRequire(f,function(e){if(h==a.sign){var t=a.owner;n.prepare(e);var l=new e({owner:a,id:a.id,$:w,path:f,vom:t,location:o});a.view=l,l.on("interact",function(e){e.tmpl||(s._chgd&&(s.innerHTML=s._tmpl),a.mountZoneVframes(0,0,1)),l.on("rendered",function(){a.mountZoneVframes(0,0,1)}),l.on("prerender",function(){a.unmountZoneVframes(0,1)||a.cAlter()}),l.on("inited",function(){a.viewInited=1,a.fire("viewInited",{view:l}),i&&u(i,l,a)})},0),r=r||{},l.load(v(r,c.params,r))}})}},unmountView:function(){var e=this;if(e.view){a||(a={}),e.unmountZoneVframes(0,1),e.cAlter(a),e.view.destroy();var t=w(e.id);t&&t._bak&&(t.innerHTML=t._tmpl),delete e.view,delete e.viewInited,a=0,e.fire("viewUnmounted")}e.sign--},mountVframe:function(e,t,r){var n=this,i=n.owner,a=i.get(e);return a||(a=new S(e),a.pId=n.id,m(n.cM,e)||n.cC++,n.cM[e]=1,i.add(a)),a.mountView(t,r),a},mountZoneVframes:function(e,t){var r=this,n=e||r.id;r.unmountZoneVframes(n,1);var i=b(n,h),a=i.length,o={};if(a)for(var s,c,u,f,v=0;a>v;v++)if(s=i[v],c=C(s),!m(o,c)&&(u=s.getAttribute(p),f=!s.getAttribute(g),f=f==d,f||u)){r.mountVframe(c,u,t);for(var l,y=b(s,h),x=0,w=y.length;w>x;x++)l=y[x],u=l.getAttribute(p),f=!l.getAttribute(g),f=f==d,f||u||(o[C(l)]=1)}r.cCreated()},unmountVframe:function(e,t){var r=this;e=e||r.id;var n=r.owner,i=n.get(e);if(i){i.unmountView(),n.remove(e),r.fire("destroy");var a=n.get(i.pId);a&&m(a.cM,e)&&(delete a.cM[e],a.cC--,t||a.cCreated())}},unmountZoneVframes:function(e,t){var r,n,i,a=this;if(e){var o=a.cM,s={};for(i in o)E(i,e)&&(s[i]=1);r=s}else r=a.cM;for(i in r)n=1,a.unmountVframe(i,1);return t||a.cCreated(),n},invokeView:function(e){var t,r=this,n=r.view,i=f.call(arguments,1);return r.viewInited&&n[e]&&(t=u(n[e],i,n)),t},cCreated:function(e){var t=this;if(t.cC==t.rC){var r=t.view;r&&!t.fcc&&(t.fcc=1,delete t.fca,r.fire(x,e),t.fire(x,e));var n=t.owner;n.vfCreated();var i=t.id,a=n.get(t.pId);a&&!m(a.rM,i)&&(a.rM[i]=a.cM[i],a.rC++,a.cCreated(e))}},cAlter:function(e){var t=this;if(e||(e={}),delete t.fcc,!t.fca){var r=t.view,n=t.id;r&&(t.fca=1,r.fire(y,e),t.fire(y,e));var i=t.owner,a=i.get(t.pId);a&&m(a.rM,n)&&(a.rC--,delete a.rM[n],a.cAlter(e))}},locChged:function(e,r){var n=this,i=n.view;if(i&&i.sign>0&&i.rendered){var a=i.olChanged(r),o={location:e,changed:r,prevent:function(){this.cs=[]},toChildren:function(e){e=e||[],t.isString(e)&&(e=e.split(",")),this.cs=e}};a&&u(i.locationChange,o,i);for(var s,c=o.cs||t.keys(n.cM),f=0,v=c.length,h=n.owner;v>f;f++)s=h.get(c[f]),s&&s.locChged(e,r)}}}),S},{requires:["magix/magix","magix/event","magix/view"]}),KISSY.add("magix/view",function(e,t,r,n,i){var a=t.safeExec,o=t.has,s=",",c=[],u=t.noop,f=t.mix,v={render:1,renderUI:1},h="~",l=function(e){return function(){var t,r=this,n=r.notifyUpdate();return n&&(t=e.apply(r,arguments)),t}},d=t.cache(40),m=/\smx-(?!view|defer|owner)[a-z]+\s*=\s*['"]/g,p=String.fromCharCode(26),g=function(){this.render()},y={prevent:function(e){e=e||this.domEvent,e.preventDefault?e.preventDefault():e.returnValue=!1},stop:function(e){e=e||this.domEvent,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},halt:function(e){this.prevent(e),this.stop(e)}},x=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,w=/(\w+):([^,]+)/g,b=/([$\w]+)<([\w,]+)>/,$=function(e){var t=this;f(t,e),t.sign=1,a($.ms,[e],t)};$.ms=[],$.prepare=function(e){var t=this,r=e.superclass;if(r&&t.prepare(r.constructor),!e[h]){e[h]=1,e.extend=t.extend;var n,i,a,c,f,d=e.prototype,m={};for(var g in d)if(o(d,g))if(n=d[g],i=g.match(b))for(a=i[1],c=i[2],c=c.split(s),f=c.length-1;f>-1;f--)i=c[f],m[i]=1,d[a+p+i]=n;else o(v,g)&&n!=u&&(d[g]=l(n));c&&(d.$evts=m)}},$.mixin=function(e,t){$.ms.push(t),f($.prototype,e)},f(f($.prototype,r),{render:u,locationChange:u,init:u,hasTmpl:!0,enableEvent:!0,load:function(){var e=this,t=e.hasTmpl,r=arguments,n=e.sign,i=o(e,"template"),s=function(o){if(n==e.sign){i||(e.template=e.wrapMxEvent(o)),e.delegateEvents(),e.fire("interact",{tmpl:t},1),a(e.init,r,e),e.fire("inited",0,1),a(e.render,c,e);var s=!t&&!e.rendered;s&&(e.rendered=!0,e.fire("primed",null,1))}};t&&!i?e.fetchTmpl(s):s()},beginUpdate:function(){var e=this;e.sign&&e.rendered&&(e.fire("refresh",0,1),e.fire("prerender"))},endUpdate:function(){var e=this;e.sign&&(e.rendered||e.fire("primed",0,1),e.rendered=!0,e.fire("rendered"))},notifyUpdate:function(){var e=this;return e.sign&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return(e+"").replace(m,"$&"+this.id+p)},setViewHTML:function(e){var t,r=this;r.beginUpdate(),r.sign&&(t=r.$(r.id),t&&(t.innerHTML=e)),r.endUpdate()},observeLocation:function(e){var r,n=this;n.$ol||(n.$ol={keys:[]}),r=n.$ol;var i=r.keys;t.isObject(e)&&(r.pn=e.pathname,e=e.keys),e&&(r.keys=i.concat((e+"").split(s))),n.locationChange==u&&(n.locationChange=g)},olChanged:function(e){var t=this,r=t.$ol;if(r){var n=0;if(r.pn&&(n=e.isPathname()),!n){var i=r.keys;n=e.isParam(i)}return n}return 1},destroy:function(){var e=this;e.sign>0&&(e.sign=0),e.sign--,e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.delegateEvents(1)},processEvent:function(e){var t=this;if(t.enableEvent&&t.sign){var r=e.info,n=e.se,i=d.get(r);i||(i=r.match(x),i={n:i[1],f:i[2],i:i[3],p:{}},i.i&&i.i.replace(w,function(e,t,r){i.p[t]=r}),d.set(r,i));var o=i.n+p+n.type,s=t[o];if(s){var c=y[i.f];c&&c.call(y,n),a(s,f({currentId:e.cId,targetId:e.tId,type:e.st,domEvent:n,params:i.p},y),t)}}},delegateEvents:function(e){var t=this,r=t.$evts,i=e?n.un:n.on,a=t.vom;for(var o in r)i.call(n,o,a)}});var C,E="?t="+e.now(),M={},S={};return $.prototype.fetchTmpl=function(t){var r=this,n="template"in r;if(n)t(r.template);else if(o(M,r.path))t(M[r.path]);else{if(!C){var s=r.path.substring(0,r.path.indexOf("/")),c=e.Config.packages[s];C=c.base||c.path}var u=C+r.path+".html",f=S[u],v=function(e){t(M[r.path]=e)};f?f.push(v):(f=S[u]=[v],i({url:u+E,success:function(e){a(f,e),delete S[u]},error:function(e,t){a(f,t),delete S[u]}}))}},$.extend=function(t,r,n){var i=this,o=function(){o.superclass.constructor.apply(this,arguments),r&&a(r,arguments,this)};return o.extend=i.extend,e.extend(o,i,t,n)},$},{requires:["magix/magix","magix/event","magix/body","ajax"]}),KISSY.add("magix/vom",function(e,t,r,n){var i=r.has,a=r.mix,o=0,s=0,c=0,u=0,f={},v={},h=r.mix({all:function(){return f},add:function(e){i(f,e.id)||(o++,f[e.id]=e,e.owner=h,h.fire("add",{vframe:e}))},get:function(e){return f[e]},remove:function(e){var t=f[e];t&&(o--,t.fcc&&s--,delete f[e],h.fire("remove",{vframe:t}))},vfCreated:function(){if(!u){s++;var e=s/o;e>c&&h.fire("progress",{percent:c=e},u=1==e)}},root:function(){return t.root(h,v)},locChged:function(e){var t,r=e.loc;if(r?t=1:r=e.location,a(v,r),!t){var n=h.root(),i=e.changed;i.isView()?n.mountView(r.view):n.locChged(r,i)}}},n);return h},{requires:["magix/vframe","magix/magix","magix/event"]}),KISSY.add("mxext/mmanager",function(e,t){var r=t.has,n=t.safeExec,i=t.mix,a=t.isFunction,o=function(e){var r=this;r.$mClass=e,r.$mCache=t.cache(),r.$mCacheKeys={},r.$mMetas={}},s=[].slice,c={urlParams:1,postParams:1,cacheKey:1,cacheTime:1,before:1,after:1},u=function(e,t,r){return function(){return e.apply(t,[t,r].concat(s.call(arguments)))}},f=function(e){return e&&e.mxViewCtor&&e.manage},v=function(e,t,r){var i=r.key,a=r.cKeys,o=a[i];if(o){var s=o.q;delete a[i],n(s,e)}},h=function(e){return function(){var t=new g(this),r=arguments,n=r[r.length-1];return f(n)&&(n.manage(t),r=s.call(r,0,-1)),t[e].apply(t,r)}},l=function(e,t){return function(r,n){var i=s.call(arguments,1);return this.send(r,i.length>1?i:n,e,t)}};i(o,{create:function(e){if(!e)throw Error("ungiven modelClass");return new o(e)}});var d={ALL:1,ONE:2,ORDER:4},m=Date.now||function(){return+new Date},p=m(),g=function(e){this.$host=e,this.$doTask=!1,this.$reqModels={},this.id="mr"+p--};return i(g.prototype,{send:function(e,i,a,o){var s=this;if(s.$doTask)return s.next(function(){this.send(e,i,a,o)}),s;s.$doTask=!0;var c=s.$host,f=c.$mCache,h=c.$mCacheKeys,l=s.$reqModels;t.isArray(e)||(e=[e]);var p,g,y,x=e.length,w=0,b=Array(x),$=[],C={},E=[],M=t.isArray(i);M&&($=Array(i.length));for(var S,T=function(e,t,r){if(!s.$destroy){w++,delete l[e.id];var o=e.$mm,c=o.cacheKey;if(b[t]=e,r)p=!0,y=!0,g=r,C.msg=r,C[t]=r;else{if(y=!1,!c||c&&!f.has(c)){c&&f.set(c,e),o.doneAt=m();var u=o.after,v=o.meta;u&&n(u,[e,v])}!e.fromCache&&o.used>0&&(e.fromCache=!0),o.used++}if(a==d.ONE){var h=M?i[t]:i;h&&($[t]=n(h,[y?C:null,e,C],s))}else if(a==d.ORDER){E[t]={m:e,e:y,s:r};for(var S,T,I=E.i||0;S=E[I];I++)T=M?i[I]:i,S.e&&(C.msg=S.s,C[I]=S.s),$[I]=n(T,[S.e?C:null,S.m,C].concat($),s);E.i=I}w>=x&&(p||(C=null),a==d.ALL?(b.unshift(C),$[0]=C,$[1]=n(i,b,s)):$.unshift(C),s.$ntId=setTimeout(function(){s.doNext($)},30))}},I=0;e.length>I;I++){if(S=e[I],!S)throw Error("miss attrs:"+e);var O=c.getModel(S,o),P=O.cKey,V=O.entity,k=u(T,V,I);k.id=s.id,P&&r(h,P)?h[P].q.push(k):O.update?(l[V.id]=V,P&&(h[P]={q:[k],e:V},k=v),V.request(k,{key:P,cKeys:h})):k()}return s},fetchAll:function(e,t){return this.send(e,t,d.ALL)},saveAll:function(e,t){return this.send(e,t,d.ALL,1)},fetchOrder:l(d.ORDER),saveOrder:l(d.ORDER,1),saveOne:l(d.ONE,1),fetchOne:l(d.ONE),abort:function(){var e=this;clearTimeout(e.$ntId);var t=e.$host,i=e.$reqModels,a=t.$mCacheKeys;for(var o in i){var s=i[o],c=s.$mm.cacheKey;if(c&&r(a,c)){for(var u,f=a[c],v=f.q,h=[],l=[],d=0;v.length>d;d++)u=v[d],u.id!=e.id?h.push(u):e.$destroy||l.push(u);n(l,["abort"],e),h.length?f.q=h:s.abort()}else s.abort()}e.$reqModels={},e.$queue=[],e.$doTask=!1},next:function(e){var t=this;if(t.$queue||(t.$queue=[]),t.$queue.push(e),!t.$doTask){var r=t.$latest;t.doNext(r)}return t},doNext:function(e){var t=this;t.$doTask=!1;var r=t.$queue;if(r){var i=r.shift();i&&n(i,e,t)}t.$latest=e},destroy:function(){var e=this;e.$destroy=!0,e.abort()}}),i(o.prototype,{registerModels:function(e){var r=this,n=r.$mMetas;t.isArray(e)||(e=[e]);for(var i,a,o=0;e.length>o;o++){if(i=e[o],a=i.name,i&&!a)throw Error("miss name attribute");if(n[a])throw Error("already exist:"+a);n[a]=i}},registerMethods:function(e){var t=this;i(t,e)},createModel:function(e){var t=this,r=t.getModelMeta(e),i=new t.$mClass;i.set(r,c),i.$mm={used:0};var o=e.before||r.before;a(o)&&n(o,[i,r,e]);var s=e.after||r.after;i.$mm.after=s;var u=e.cacheKey||r.cacheKey;return a(u)&&(u=n(u,[r,e])),i.$mm.cacheKey=u,i.$mm.meta=r,i.set(e,c),i.setUrlParams(r.urlParams),i.setPostParams(r.postParams),i.setUrlParams(e.urlParams),i.setPostParams(e.postParams),i},getModelMeta:function(e){var r,n=this,i=n.$mMetas;r=t.isString(e)?e:e.name;var a=i[r];if(!a)throw Error("Unfound:"+r);return a},getModel:function(e,t){var r,n,i=this;return t||(r=i.getCachedModel(e)),r||(n=!0,r=i.createModel(e)),{entity:r,cKey:r.$mm.cacheKey,update:n}},saveAll:h("saveAll"),fetchAll:h("fetchAll"),saveOrder:h("saveOrder"),fetchOrder:h("fetchOrder"),saveOne:h("saveOne"),fetchOne:h("fetchOne"),createMRequest:function(e){var t=new g(this);return f(e)&&e.manage(t),t},clearCacheByKey:function(e){var t=this,r=t.$mCache;r.del(e)},clearCacheByName:function(e){for(var t=this,r=t.$mCache,n=r.c,i=0;n.length>i;i++){var a=n[i],o=a.v,s=o&&o.$mm;if(s){var c=s.meta.name;c==e&&r.del(s.cacheKey)}}},getCachedModel:function(e){var r,i,o=this,s=o.$mCache,c=null;if(t.isString(e)?r=e:(i=o.getModelMeta(e),r=e.cacheKey||i.cacheKey,a(r)&&(r=n(r,[i,e]))),r){var u=o.$mCacheKeys,f=u[r];if(f)c=f.e;else if(c=s.get(r)){i||(i=c.$mm.meta);var v=e.cacheTime||i.cacheTime||0;a(v)&&(v=n(v,[i,e])),v>0&&m()-c.$mm.doneAt>v&&(o.clearCacheByKey(r),c=null)}}return c}}),o},{requires:["magix/magix"]}),KISSY.add("mxext/model",function(e,t){var r=function(r,n){var i=function(){i.superclass.constructor.apply(this,arguments),n&&t.safeExec(n,[],this)};return t.mix(i,this,{prototype:!0}),e.extend(i,this,r)},n=+new Date,i=function(e){e&&this.set(e),this.id="m"+n--},a=encodeURIComponent;return t.mix(i,{GET:"GET",POST:"POST",extend:r}),t.mix(i.prototype,{sync:t.noop,parse:function(e){return e},getPostParams:function(){return this.getParams(i.POST)},getUrlParams:function(){return this.getParams(i.GET)},getParams:function(e){var r=this;e=e?e.toUpperCase():i.GET;var n,o="$"+e,s=r[o],c=[];if(s)for(var u in s)if(n=s[u],t.isArray(n))for(var f=0;n.length>f;f++)c.push(u+"="+a(n[f]));else c.push(u+"="+a(n));return c.join("&")},setUrlParamsIf:function(e,t){this.setParams(e,t,i.GET,!0)},setPostParamsIf:function(e,t){var r=this;r.setParams(e,t,i.POST,!0)},setParams:function(e,r,n,a){n=n?n.toUpperCase():i.GET;var o=this;o.$types||(o.$types={}),o.$types[n]=!0;var s="$"+n;if(o[s]||(o[s]={}),t.isObject(e))for(var c in e)a&&o[s][c]||(o[s][c]=e[c]);else e&&(a&&o[s][e]||(o[s][e]=r))},setPostParams:function(e,t){var r=this;r.setParams(e,t,i.POST)},setUrlParams:function(e,t){this.setParams(e,t,i.GET)},reset:function(){var e=this,r=e.$types;if(r){for(var n in r)t.has(r,n)&&delete e["$"+n];delete e.$types}var i=e.$keys,a=e.$attrs;if(i){for(var o=0;i.length>o;o++)delete a[i[o]];delete e.$keys}},get:function(e){var t=this,r=!arguments.length,n=t.$attrs;return n?r?n:n[e]:null},set:function(e,r,n){var i=this;if(i.$attrs||(i.$attrs={}),n&&!i.$keys&&(i.$keys=[]),t.isObject(e)){t.isObject(r)||(r={});for(var a in e)n&&i.$keys.push(a),t.has(r,a)||(i.$attrs[a]=e[a])}else e&&(n&&i.$keys.push(e),i.$attrs[e]=r)},request:function(e,r){e||(e=function(){});var n=this;n.$abort=!1;var i=function(i,a){if(n.$abort)e("abort",null,r);else if(i)e(i,a,r);else{if(a){var o=n.parse(a);t.isObject(o)||(o={data:o}),n.set(o,null,!0)}e(i,a,r)}};n.$trans=n.sync(i,r)},abort:function(){var e=this,t=e.$trans;t&&t.abort&&t.abort(),delete e.$trans,e.$abort=!0},isAborted:function(){return this.$abort}}),i},{requires:["magix/magix"]}),KISSY.add("mxext/view",function(e,t,r,n){var i=window,a=t.mix,o=function(e){i.clearTimeout(e),i.clearInterval(e)},s=function(e){u(e.destroy,[],e)},c=0,u=t.safeExec,f=t.has,v=r.extend({navigate:function(){n.navigate.apply(n,arguments)},manage:function(e,r){var n=this,i=arguments,a=!0;1==i.length&&(r=e,e="res_"+c++,a=!1),n.$res||(n.$res={});var u;t.isNumber(r)?u=o:r&&r.destroy&&(u=s);var f={hasKey:a,res:r,sign:n.sign,destroy:u};return n.$res[e]=f,r},getManaged:function(e){var t=this,r=t.$res;if(r&&f(r,e)){var n=r[e],i=n.res;return i}return null},removeManaged:function(e){var t=this,r=null,n=t.$res;return n&&f(n,e)&&(r=n[e].res,delete n[e]),r},destroyManaged:function(){var e=this,t=e.$res;if(t)for(var r in t){var n=t[r];if(n.sign!=e.sign){var i=n.res,a=n.destroy,o=!1;a&&(a(i),o=!0),n.hasKey||delete t[r],e.fire("destroyManaged",{resource:i,processed:o})}}},destroyMRequest:function(){var e=this,t=e.$res;if(t)for(var r in t){var n=t[r],i=n.res;i&&i.fetchOne&&i.fetchAll&&(i.destroy(),delete t[r])}}},function(){var e=this;e.on("interact",function(){e.on("rendercall",e.destroyMRequest),e.on("prerender",e.destroyManaged),e.on("destroy",e.destroyManaged)}),u(v.ms,arguments,e)},{ms:[],mixin:function(e,t){v.ms.push(t),a(v.prototype,e)}});return v},{requires:["magix/magix","magix/view","magix/router"]}),document.createElement("vframe");