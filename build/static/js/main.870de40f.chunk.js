(this["webpackJsonpswc-traverse-in-ccfv3"]=this["webpackJsonpswc-traverse-in-ccfv3"]||[]).push([[0],{63:function(e,t,n){"use strict";n.r(t);var r=n(12),a=n(6),i=n.n(a),s=n(49),c=n.n(s),o=n(14),u=n(68),l=n(29),f=n(15),p=n(19),h=n(13),j=n(16),b=n.n(j),d=n(0),m=n(64),O=n(42),x=n.n(O),v=n(34),g=x()((function(e,t){return{tracks:[],setTracks:function(t){return e(Object(v.a)((function(e){var n=e.tracks;return t(n)})))},animation:{index:0,phase:0},setAnimation:function(t){return e(Object(v.a)((function(e){var n=e.animation;return t(n)})))},skeletons:[],setSkeletons:function(t){return e(Object(v.a)((function(e){var n=e.skeletons;return t(n)})))},neurons:[],setNeurons:function(t){return e(Object(v.a)((function(e){var n=e.neurons;return t(n)})))},initAnimation:function(e){Object(o.b)((function(){var n=t(),r=n.tracks,a=n.animation,i=Date.now(),s=null;if(1===a.phase?(s=e.t=0,e.startTime=i):3===a.phase&&(s=e.t=1),r.length>0){if(null===s){var c=2.5*r[a.index].parameters.path.getLength();(s=e.t=(i-e.startTime)/c)>1&&(s=e.t=1)}e.position=r[a.index].parameters.path.getPointAt(s)}}))}}})),y=x()((function(e,t){return{mutation:{t:0,position:new d.Vector3,startTime:Date.now()}}})),w=n(10);function k(e){var t=e.children,n=Object(a.useRef)(),r=Object(a.useRef)(),i=g(),s=i.tracks,c=i.animation,u=y((function(e){return e.mutation})),l=Object(o.g)().mouse,f=new d.Vector3,p=new d.Vector3(0,1,0),h=new d.Quaternion,j=0;return Object(o.e)((function(e){var t=e.camera,r=u.t;if(s.length>0){var a=u.position.clone();n.current.position.copy(u.position.clone()),n.current.position.y=19e3,a.x+=800,a.y-=800-5e3*r,a.z*=1.3,j>100?t.position.lerp(a,.003*j):(t.position.lerp(a,.003*j),j+=1),r>0&&r<1&&t.position.lerp(f.set(2e3*l.x,2e3*l.y,0),.05);var i=s[c.index].parameters.path.getPointAt(Math.min(1,r+.1));i.z*=1.1,t.matrix.lookAt(t.position,i,p),h.setFromRotationMatrix(t.matrix),t.quaternion.slerp(h,.8),t.zoom=1,t.updateProjectionMatrix()}})),Object(w.jsx)(w.Fragment,{children:Object(w.jsxs)("group",{ref:n,children:[Object(w.jsx)(m.a,{args:[100],visible:2===c.phase}),Object(w.jsx)("group",{ref:r,position:[0,0,0],children:t})]})})}var P=n(54),_=n(33),S=n(53),R=n(55);function C(e){var t=e.camera,n=e.viewport,r=e.priority,i=Object(a.useRef)(),s=Object(o.g)(),c=s.scene,u=s.gl,l=s.size,p=Object(a.useMemo)((function(){return new d.Vector2(512,512)}),[]);return"undefined"===typeof t&&(t=s.camera),"undefined"===typeof n&&(n=[0,0,l.width,l.height]),Object(a.useEffect)((function(){i.current.setSize(l.width,l.height)}),[l]),Object(o.e)((function(){u.setScissorTest(!0),u.setViewport.apply(u,Object(f.a)(n)),u.setScissor.apply(u,Object(f.a)(n)),i.current.render(),u.setScissorTest(!1)}),r),Object(w.jsxs)("effectComposer",{ref:i,args:[u],children:[Object(w.jsx)("renderPass",{attachArray:"passes",scene:c,camera:t}),Object(w.jsx)("unrealBloomPass",{attachArray:"passes",args:[p,1.5,1,0]})]})}Object(o.d)({EffectComposer:P.a,ShaderPass:_.a,RenderPass:S.a,UnrealBloomPass:R.a}),C.defaultProps={priority:1};var E=n(65);function z(e){var t=e.mapWidth,n=e.mapHeight,r=e.anchor,i=Object(o.g)((function(e){return e.size})),s=i.width,c=i.height,u=Object(a.useRef)(),l="ne"===r||"nw"===r?c-n:0,f="ne"===r||"se"===r?s-t:0;return Object(a.useEffect)((function(){u.current.lookAt(0,-1,0)}),[u]),Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(E.a,{ref:u,far:1e5,left:-6e3,right:6e3,top:7e3,bottom:-7e3,up:[-1,0,0],position:[0,2e4,0]}),Object(w.jsx)(C,{camera:u.current,viewport:[f,l,t,n],noClear:!0,priority:10})]})}var M=n(18),A=n(67),T=["filename"];function B(e){var t,n=e.filename,a=Object(M.a)(e,T),i=Object(A.a)("/obj/"+n).nodes;return t=Object.values(i)[0].geometry.clone(!0).scale(-1,-1,-1).translate(6600,4e3,5700),Object(w.jsxs)("mesh",{children:[Object(w.jsx)("primitive",{object:t,attach:"geometry"}),Object(w.jsx)("meshPhysicalMaterial",Object(r.a)({wireframe:!0},a))]})}B.defaultProps={opacity:.1,transparent:!0,metalness:.7,roughness:0,clearcoat:1,clearcoatRoughtness:0,side:d.DoubleSide,color:"#f0f0f0"};var F=n(66);function V(e){var t=e.skeleton,n=e.uniColor,r=e.dendriteColor,a=e.apicalColor,i=e.axonColor,s=e.somaColor,c=e.visible;"undefined"!==typeof n&&(i=n,r=n,a=n);var u=[s,i,r,a],l=Object.values(t).filter((function(e){return null===e.near})),f=Object(o.g)().size;return Object(w.jsxs)("group",{visible:c,children:[l.map((function(e,t){var n=e.traversal;return Object(w.jsx)(m.a,{args:[10,100,100],position:n[0],children:Object(w.jsx)("meshPhysicalMaterial",{color:u[0],transparent:!1,clearcoat:1,roughness:.5,metalness:0,clearcoatRoughness:1})},t)})),Object.values(t).filter((function(e){return null!==e.near})).map((function(e){var t=e.traversal,n=e.types;return Object(w.jsx)(F.a,{points:t,lineWidth:1080/Math.hypot(f.width,f.height),color:n.includes(4)?a:n.includes(3)?r:i})}))]})}V.defaultProps={somaColor:"snow",dendriteColor:"seagreen",axonColor:"orangered",apicalColor:"royalblue"};var L=n(22),N=n(21),D=n(25);function W(e,t){return"hsl("+Math.floor(360*Math.random())+","+e+","+t+")"}function H(e){var t=e.skeleton,n=e.nextPhase,r=Object.values(t).filter((function(e){var t=e.near,n=e.types;return null!==t&&!n.includes(2)})),s=Object(D.a)(r.map((function(e){return e.far}))),c=Object.values(t).filter((function(e){var t=e.near,n=e.types;return null!==t&&n.includes(2)})),o=Object(D.a)(c.map((function(e){return e.far}))),u=Object(D.a)(r.map((function(e,t){var n=e.children,r=e.types;return 0!==n.length||r.includes(2)?null:t})).filter((function(e){return null!==e}))),l=Object(D.a)(c.map((function(e,n){var r=e.near,a=e.types;return null===t[r].near&&a.includes(2)?n:null})).filter((function(e){return null!==e}))),f=i.a.useState(Object(D.a)()),j=Object(h.a)(f,2),d=j[0],O=j[1],x=i.a.useState(Object(D.a)()),v=Object(h.a)(x,2),g=v[0],y=v[1],k=i.a.useState(!1),P=Object(h.a)(k,2),_=P[0],S=P[1],R=Object(L.useSprings)(r.length,(function(e){var t=r[e],n=t.far,a=t.traversal;return{to:function(){var e=Object(p.a)(b.a.mark((function e(t,n){var r,i,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=Object(N.a)(a.concat().reverse()),e.prev=1,r.s();case 3:if((i=r.n()).done){e.next=9;break}return s=i.value,e.next=7,t({position:s,visible:!0});case 7:e.next=3;break;case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),r.e(e.t0);case 14:return e.prev=14,r.f(),e.finish(14);case 17:return e.next=19,t({visible:!1});case 19:case"end":return e.stop()}}),e,null,[[1,11,14,17]])})));return function(t,n){return e.apply(this,arguments)}}(),from:{position:a[a.length-1],visible:!1},config:{duration:1},pause:!0,onRest:function(){O((function(e){return e.add(n)}))}}})),C=Object(h.a)(R,2),E=C[0],z=C[1],M=Object(L.useSprings)(c.length,(function(e){var t=c[e],n=t.far,r=t.traversal;return{to:function(){var e=Object(p.a)(b.a.mark((function e(t,n){var a,i,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Object(N.a)(r),e.prev=1,a.s();case 3:if((i=a.n()).done){e.next=9;break}return s=i.value,e.next=7,t({position:s,visible:!0});case 7:e.next=3;break;case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),a.e(e.t0);case 14:return e.prev=14,a.f(),e.finish(14);case 17:return e.next=19,t({visible:!1});case 19:case"end":return e.stop()}}),e,null,[[1,11,14,17]])})));return function(t,n){return e.apply(this,arguments)}}(),from:{position:r[0],visible:!1},config:{duration:1},pause:!0,onRest:function(){y((function(e){return e.add(n)}))}}})),A=Object(h.a)(M,2),T=A[0],B=A[1];return Object(a.useEffect)((function(){_?B.start((function(e){if(l.has(e))return{pause:!1}})):z.start((function(e){if(u.has(e))return{pause:!1}}))}),[_]),Object(a.useEffect)((function(){g.isSuperset(o)&&n(),_&&B.start((function(e){var t=c[e],n=t.far,r=t.near;if(!g.has(n))return g.has(r)?{pause:!1}:void 0}))}),[g]),Object(a.useEffect)((function(){d.isSuperset(s)&&S(!0),z.start((function(e){var t=r[e],n=t.far,a=t.children;if(!d.has(n))return d.isSuperset(Object(D.a)(a))?{pause:!1}:void 0}))}),[d]),Object(w.jsxs)(w.Fragment,{children:[E.map((function(e,t){var n=e.position,r=e.visible;return Object(w.jsx)(L.animated.group,{position:n,visible:r,children:Object(w.jsx)(m.a,{args:[10,4,2],children:Object(w.jsx)("meshPhysicalMaterial",{color:W("100%","80%"),transparent:!1,clearcoat:1,roughness:.5,metalness:0,clearcoatRoughness:1})})},t)})),T.map((function(e,t){var n=e.position,r=e.visible;return Object(w.jsx)(L.animated.group,{position:n,visible:r,children:Object(w.jsx)(m.a,{args:[20,4,2],children:Object(w.jsx)("meshPhysicalMaterial",{color:W("100%","80%"),transparent:!1,clearcoat:1,roughness:.5,metalness:0,clearcoatRoughness:1})})},t)}))]})}var J=["filename","style"];function q(e){var t=e.filename,n=e.style,a=Object(M.a)(e,J),i=Object(A.a)("/obj/"+t).nodes,s=Object.values(i)[0].geometry.clone(!0).scale(-1,-1,-1).translate(6600,4e3,5700);return Object(w.jsxs)(L.animated.mesh,{position:n.opacity.to((function(e){return[0,1e3*e,0]})),children:[Object(w.jsx)("primitive",{object:s,attach:"geometry"}),Object(w.jsx)(L.animated.meshPhysicalMaterial,Object(r.a)({opacity:n.opacity.to((function(e){return e+.2})),roughness:n.roughness.to((function(e){return e}))},a))]})}function G(e){var t=e.brains,n=e.nextPhase,r=Object(L.useSpring)({to:function(){var e=Object(p.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t({opacity:.5,roughness:.5});case 2:return e.next=4,t({opacity:.1,roughness:0});case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),delay:1e3,from:{opacity:.1,roughness:0},onRest:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];t[0].finished&&n()}});return t.map((function(e){var t=e.filename,n=e.color;return Object(w.jsx)(q,{style:r,filename:t,color:n})}))}function I(e){var t=e.startBrains,n=e.skeleton,r=e.endBrains,i=e.phase,s=e.setPhase;return Object(a.useEffect)((function(){0===i&&setTimeout((function(){s(1)}),3e3)}),[i]),Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(L.SpringContext,{pause:1!==i,children:Object(w.jsx)(G,{brains:t,nextPhase:function(){return s(2)}})}),Object(w.jsx)(L.SpringContext,{pause:3!==i,children:Object(w.jsx)(G,{brains:r,nextPhase:function(){return s(4)}})}),2===i?Object(w.jsx)(H,{skeleton:n,nextPhase:function(){return s(3)}}):null]})}function Q(e){return U.apply(this,arguments)}function U(){return(U=Object(p.a)(b.a.mark((function e(t){var n,r,a,i;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.text();case 5:return r=e.sent,a={},(i=r.split("\n").filter((function(e){return!e.startsWith("#")&&e})).map((function(e,t){var n=e.split(" "),r=Object(h.a)(n,7),i=r[0],s=r[1],c=r[2],o=r[3],u=r[4],l=r[5],f=r[6];return i=Number(i),s=Number(s),f=Number(f),a[i]=t,{n:i,type:s,x:25*-c+6600,y:25*-o+4e3,z:25*-u+5700,r:25*l,parent:f,parent_index:null,index:t,children:[]}}))).forEach((function(e,t){a.hasOwnProperty(e.parent)&&(e.parent_index=a[e.parent],i[e.parent_index].children.push(t))})),e.abrupt("return",i);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Z(e){var t=[],n=[],r=[];function a(i){var s=i.children,c=i.x,o=i.y,u=i.z,l=i.type;r.push([c,o,u]),s.length?s.forEach((function(t){return a(e[t])})):2===l?t.push(r.concat()):n.push(r.concat().reverse()),r.pop()}return e.filter((function(e){return-1===e.parent})).forEach((function(e){return a(e)})),{fromRoot:t,toRoot:n}}function K(e){var t=Z(e),n=t.fromRoot;t.toRoot;return n.reduce((function(e,t){return e.length>t.length?e:t}))}function X(e){var t={};function n(r){r.children.forEach((function(a){for(var i=e[a],s=[[r.x,r.y,r.z],[i.x,i.y,i.z]];1===i.children.length;)i=e[i.children[0]],s.push([i.x,i.y,i.z]);t[i.index]={traversal:s,far:i.index,near:r.index,children:[],types:0===i.children.length?[e[i.index].type]:[]},i.children.length>0&&n(i)}))}for(var r in e.filter((function(e){return-1===e.parent})).forEach((function(e){t[e.index]={traversal:[[e.x,e.y,e.z]],far:e.index,near:null,children:[],types:[e.index.type]},n(e)})),t){var a=t[r],i=a.far,s=a.near;t.hasOwnProperty(s)&&t[s].children.push(i)}return function(e){for(var n=e,r=function(){var e=t[n.shift()],r=e.types,a=e.near;if(null===a)return"continue";var i=!1;r.forEach((function(e){t[a].types.includes(e)||(t[a].types.push(e),i=!0)})),i&&!n.includes(a)&&n.push(a)};n.length>0;)r()}(Object.keys(t).filter((function(e){return 0===t[e].children.length}))),t}function Y(){var e=g(),t=e.skeletons,n=e.animation,r=e.setAnimation,i=e.setNeurons,s=e.setSkeletons,c=e.setTracks,u=e.tracks,j=Object(o.g)().size,m=Object(a.useState)(["17109_2401_x8977_y24184.semi_r.swc","236174_3729_x12692_y9419.semi_r.swc","17302_00039.semi_r.swc"]),O=Object(h.a)(m,2),x=O[0];O[1];return Object(a.useEffect)((function(){function e(){return e=Object(p.a)(b.a.mark((function e(){var t,n,r,a,o=arguments;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=o.length>0&&void 0!==o[0]&&o[0],e.next=3,Promise.all(x.map((function(e){return Q("/swc/"+e)})));case 3:n=e.sent,i((function(e){e.splice(0),e.push.apply(e,Object(f.a)(n))})),r=n.map(K).map((function(e){var t=new d.CatmullRomCurve3(e.filter((function(t,n){return n%100===0||n===e.length-1})).map((function(e){return Object(l.a)(d.Vector3,Object(f.a)(e))})),!1,"catmullrom",1);return new d.TubeGeometry(t,10*e.length,.2,10,!0)})),c((function(e){e.splice(0),e.push.apply(e,Object(f.a)(r))})),t&&(a=n.map(X),s((function(e){e.splice(0),e.push.apply(e,Object(f.a)(a))})));case 8:case"end":return e.stop()}}),e)}))),e.apply(this,arguments)}!function(){e.apply(this,arguments)}(!0)}),[x]),Object(a.useEffect)((function(){4===n.phase&&u.length>0&&r((function(e){e.index=(e.index+1)%u.length,e.phase=0}))}),[n.phase]),Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("color",{attach:"background",args:["#050409"]}),Object(w.jsx)("fog",{attach:"fog",args:["#070710",0,1e5]}),Object(w.jsx)("pointLight",{position:[0,1e4,1e4],intensity:.3}),Object(w.jsx)("pointLight",{position:[0,1e4,-1e4],intensity:.3}),Object(w.jsx)("directionalLight",{position:[1e4,-1e4,0],intensity:.5}),Object(w.jsx)("directionalLight",{position:[-1e4,-1e4,0],intensity:.5}),Object(w.jsxs)(a.Suspense,{fallback:null,children:[Object(w.jsx)(k,{}),t.length>n.index?Object(w.jsx)(I,{skeleton:t[n.index],phase:n.phase,setPhase:function(e){return r((function(t){t.phase=e}))},startBrains:[[{filename:"985_1.gltf",color:[31/255,157/255,90/255]}],[{filename:"583_1.gltf",color:[138/255,218/255,135/255]}],[{filename:"170_1.gltf",color:[1,128/255,132/255]}]][n.index],endBrains:[[{filename:"993_2.gltf",color:[31/255,157/255,90/255]},{filename:"985_2.gltf",color:[31/255,157/255,90/255]},{filename:"993_1.gltf",color:[31/255,157/255,90/255]}],[{filename:"886_1.gltf",color:[26/255,166/255,152/255]},{filename:"879_1.gltf",color:[26/255,166/255,152/255]}],[{filename:"385_1.gltf",color:[8/255,13/255,140/255]},{filename:"262_1.gltf",color:[155/255,144/255,159/255]}]][n.index]}):null,t.map((function(e,t){return Object(w.jsx)(V,{skeleton:e,visible:n.index===t},t)})),Object(w.jsx)(B,{filename:"997.gltf",color:[1,1,1],opacity:.1,clearcoatRoughness:0,clearcoat:1,metalness:1,roughness:.6})]}),Math.hypot(j.width,j.height)>1080?Object(w.jsx)(z,{mapWidth:j.height/2*6/7,mapHeight:j.height/2,anchor:"sw"}):null,Object(w.jsx)(C,{})]})}function $(){var e=y().mutation,t=g().initAnimation;return Object(w.jsxs)(o.a,{camera:{far:1e5,near:.1,position:[1e5,1e5,1e5]},onCreated:function(){t(e)},children:[Object(w.jsx)(u.a,{enableZoom:!1,enablePan:!1,enableRotate:!1}),Object(w.jsx)(Y,{})]})}function ee(e){return Object(w.jsx)("div",Object(r.a)({style:{position:"absolute",inset:0}},e))}q.defaultProps={transparent:!0,metalness:.7,clearcoat:1,clearcoatRoughness:0,side:d.DoubleSide,color:"#f0f0f0"},c.a.render(Object(w.jsx)(ee,{children:Object(w.jsx)($,{})}),document.getElementById("root"))}},[[63,1,2]]]);
//# sourceMappingURL=main.870de40f.chunk.js.map