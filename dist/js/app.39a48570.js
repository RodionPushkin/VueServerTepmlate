(function(){"use strict";var e={4457:function(e,t,o){var n=o(536),i=o(9242),a=o(3396);function r(e,t,o,n,i,r){const s=(0,a.up)("callComponent"),l=(0,a.up)("communicationComponent"),c=(0,a.up)("headerComponent"),h=(0,a.up)("router-view"),d=(0,a.up)("mainComponent"),u=(0,a.up)("footerComponent");return(0,a.wg)(),(0,a.iD)(a.HY,null,[this.$store.getters.ISCALLING?((0,a.wg)(),(0,a.j4)(s,{key:0,onAccept:r.accept,onDecline:r.decline},null,8,["onAccept","onDecline"])):(0,a.kq)("",!0),this.$store.getters.SHOWCOMMUNICATION?((0,a.wg)(),(0,a.j4)(l,{key:1,onCompleteCall:r.completeCall},null,8,["onCompleteCall"])):(0,a.kq)("",!0),(0,a.Wm)(c),(0,a.Wm)(d,null,{default:(0,a.w5)((()=>[(0,a.Wm)(h)])),_:1}),(0,a.Wm)(u)],64)}o(7658);const s={class:"header"},l={class:"container"},c=(0,a.uE)('<label for="burger" data-v-3810cd6e><svg class="feather feather-menu" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" data-v-3810cd6e><line x1="3" x2="21" y1="12" y2="12" data-v-3810cd6e></line><line x1="3" x2="21" y1="6" y2="6" data-v-3810cd6e></line><line x1="3" x2="21" y1="18" y2="18" data-v-3810cd6e></line></svg></label>',1),h={class:"nav"};function d(e,t,o,n,r,d){const u=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("header",s,[(0,a._)("div",l,[(0,a.Wm)(u,{class:"logo",to:"/",onClick:t[0]||(t[0]=e=>r.isMenuOpened=!1)},{default:(0,a.w5)((()=>[(0,a.Uk)("лого")])),_:1}),(0,a.wy)((0,a._)("input",{id:"burger","onUpdate:modelValue":t[1]||(t[1]=e=>r.isMenuOpened=e),type:"checkbox"},null,512),[[i.e8,r.isMenuOpened]]),c,(0,a._)("nav",h,[(0,a.Wm)(u,{to:"/",onClick:t[2]||(t[2]=e=>r.isMenuOpened=!1)},{default:(0,a.w5)((()=>[(0,a.Uk)("главная")])),_:1})])])])}var u={name:"header.component",data(){return{isMenuOpened:!1}}},m=o(89);const f=(0,m.Z)(u,[["render",d],["__scopeId","data-v-3810cd6e"]]);var p=f;const v={class:"main"};function g(e,t,o,n,i,r){return(0,a.wg)(),(0,a.iD)("main",v,[(0,a.WI)(e.$slots,"default",{},void 0,!0)])}var w={name:"main.component"};const C=(0,m.Z)(w,[["render",g],["__scopeId","data-v-037f739d"]]);var k=C;function _(e,t,o,n,i,a){return null}var y={name:"footer.component"};const T=(0,m.Z)(y,[["render",_]]);var b=T,S=o(7139);const M=e=>((0,a.dD)("data-v-7de5cc00"),e=e(),(0,a.Cn)(),e),I={class:"call",ref:"call"},E={class:"bar"},x={class:"m"},O=M((()=>(0,a._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"feather feather-phone-off"},[(0,a._)("path",{d:"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"}),(0,a._)("line",{x1:"23",y1:"1",x2:"1",y2:"23"})],-1))),N=[O],A=M((()=>(0,a._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"feather feather-phone-call"},[(0,a._)("path",{d:"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})],-1))),$=[A];function V(e,t,o,n,i,r){return(0,a.wg)(),(0,a.iD)("div",I,[(0,a._)("div",E,[(0,a._)("p",x,(0,S.zw)(i.text),1),(0,a._)("div",{class:"decline",onClick:t[0]||(t[0]=t=>e.$emit("decline"))},N),(0,a._)("div",{class:"accept",onClick:t[1]||(t[1]=t=>e.$emit("accept"))},$)])],512)}var L={name:"call.component",data(){return{text:null}},mounted(){this.text="ислам";let e=new Audio;e.loop=!0,e.src="/sounds/call.mp3",e.src="/sounds/call.wav",e.volume=.15,this.$refs.call.appendChild(e),e.play(),setTimeout((()=>{this.$emit("decline")}),21e4)}};const j=(0,m.Z)(L,[["render",V],["__scopeId","data-v-7de5cc00"]]);var D=j;const P=e=>((0,a.dD)("data-v-18d7ca3f"),e=e(),(0,a.Cn)(),e),U={class:"bar shadow"},R={key:0,class:"feather feather-mic-off",fill:"none",height:"24",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},W=(0,a.uE)('<line x1="1" x2="23" y1="1" y2="23" data-v-18d7ca3f></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" data-v-18d7ca3f></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" data-v-18d7ca3f></path><line x1="12" x2="12" y1="19" y2="23" data-v-18d7ca3f></line><line x1="8" x2="16" y1="23" y2="23" data-v-18d7ca3f></line>',5),B=[W],G={key:1,class:"feather feather-mic",fill:"none",height:"24",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},H=P((()=>(0,a._)("path",{d:"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"},null,-1))),Z=P((()=>(0,a._)("path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"},null,-1))),q=P((()=>(0,a._)("line",{x1:"12",x2:"12",y1:"19",y2:"23"},null,-1))),F=P((()=>(0,a._)("line",{x1:"8",x2:"16",y1:"23",y2:"23"},null,-1))),z=[H,Z,q,F],K={key:0,class:"feather feather-video-off",fill:"none",height:"24",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},Y=P((()=>(0,a._)("path",{d:"M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"},null,-1))),J=P((()=>(0,a._)("line",{x1:"1",x2:"23",y1:"1",y2:"23"},null,-1))),Q=[Y,J],X={key:1,class:"feather feather-video",fill:"none",height:"24",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},ee=P((()=>(0,a._)("polygon",{points:"23 7 16 12 23 17 23 7"},null,-1))),te=P((()=>(0,a._)("rect",{height:"14",rx:"2",ry:"2",width:"15",x:"1",y:"5"},null,-1))),oe=[ee,te],ne=P((()=>(0,a._)("svg",{class:"feather feather-rotate-cw",fill:"none",height:"24",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},[(0,a._)("polyline",{points:"23 4 23 10 17 10"}),(0,a._)("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})],-1))),ie=[ne],ae=P((()=>(0,a._)("svg",{class:"feather feather-monitor",fill:"none",height:"24",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},[(0,a._)("rect",{height:"14",rx:"2",ry:"2",width:"20",x:"2",y:"3"}),(0,a._)("line",{x1:"8",x2:"16",y1:"21",y2:"21"}),(0,a._)("line",{x1:"12",x2:"12",y1:"17",y2:"21"})],-1))),re=[ae],se=P((()=>(0,a._)("svg",{class:"feather feather-phone-off",fill:"none",height:"24",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},[(0,a._)("path",{d:"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"}),(0,a._)("line",{x1:"23",x2:"1",y1:"1",y2:"23"})],-1))),le=[se];function ce(e,t,o,n,r,s){return(0,a.wg)(),(0,a.iD)("div",{class:(0,S.C_)([r.isMobile?"mobile":"","communication"])},[(0,a.wy)((0,a._)("div",{id:"selfvideo",ref:"selfvideo",class:(0,S.C_)({screencast:r.showScreen,"pos-1":1==r.position,"pos-2":2==r.position,"pos-3":3==r.position,"pos-4":4==r.position}),onClick:t[0]||(t[0]=e=>s.changepos())},null,2),[[i.F8,r.showScreen||r.enableCamera]]),(0,a._)("div",{id:"videoconainer",ref:"videoconainer",class:(0,S.C_)({multiple:this.$store.getters.CONNECTIONS.length>1})},null,2),(0,a._)("div",U,[(0,a._)("div",{class:(0,S.C_)(["shadow",r.enableMic?"active-mic":""]),onClick:t[1]||(t[1]=e=>s.toggleMic())},[r.enableMic?((0,a.wg)(),(0,a.iD)("svg",G,z)):((0,a.wg)(),(0,a.iD)("svg",R,B))],2),(0,a._)("div",{class:(0,S.C_)(["shadow",r.enableCamera?"active-cam":""]),onClick:t[2]||(t[2]=e=>s.toggleCamera())},[r.enableCamera?((0,a.wg)(),(0,a.iD)("svg",X,oe)):((0,a.wg)(),(0,a.iD)("svg",K,Q))],2),r.countCameras>1&&r.enableCamera?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"shadow",onClick:t[3]||(t[3]=e=>s.rotateCamera())},ie)):(0,a.kq)("",!0),(0,a._)("div",{class:(0,S.C_)(["shadow",r.showScreen?"active-cast":""]),onClick:t[4]||(t[4]=e=>s.toggleScreenCast())},re,2),(0,a._)("div",{class:"shadow complete",onClick:t[5]||(t[5]=e=>s.completeCall())},le)])],2)}var he={name:"communication.component",data(){return{isMobile:!1,userMedia:null,stream:null,enableMic:!0,cameraRotation:!1,enableCamera:!1,myVideo:null,countCameras:null,showScreen:!1,selfAudioTrack:null,selfVideoTrack:null,position:1}},mounted(){console.log(this.$store.getters.CONNECTIONS),navigator.mediaDevices.enumerateDevices().then((e=>{this.countCameras=e.filter((e=>"videoinput"==e.kind)).length})),this.userMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia,this.isMobile=navigator.userAgentData.mobile,this.stream=new MediaStream,this.reload(),setInterval((()=>{this.stream.getVideoTracks().forEach((e=>{"ended"==e.readyState&&(this.enableCamera&&(this.enableCamera=!1),this.showScreen&&(this.showScreen=!1),this.stream.removeTrack(e),this.selfVideoTrack=null,this.reload())}))}),500),console.log("id",this.$route.params.id),this.$peer.call(this.$route.params.id,this.stream),this.$peer.on("call",(e=>{e.answer(),this.$peer.on("stream",(e=>{}))}))},methods:{reload(){this.enableCamera&&0==this.stream.getVideoTracks().length&&this.userMedia.call(navigator,{video:this.enableCamera?{width:{max:this.isMobile?1080:1920,ideal:this.isMobile?720:1280,min:this.isMobile?0:640},height:{max:this.isMobile?1920:1080,ideal:this.isMobile?1280:720,min:this.isMobile?0:480},facingMode:this.cameraRotation?"environment":"user",frameRate:{ideal:60,min:10}}:this.enableCamera},(e=>{this.reloadSelfCamera(e)}),(e=>{this.enableCamera&&(this.enableCamera=!1),console.log(e)})),this.enableMic&&0==this.stream.getAudioTracks().length&&this.userMedia.call(navigator,{audio:this.enableMic?{sampleRate:{ideal:48e3,min:44100},channelCount:{ideal:2,min:1},volume:1,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}:this.enableMic},(e=>{this.reloadSelfCamera(e)}),(e=>{this.enableMic&&(this.enableMic=!1),console.log(e)})),this.showScreen&&0==this.stream.getVideoTracks().length?navigator.mediaDevices.getDisplayMedia({audio:!1,video:!0}).then((e=>{this.reloadSelfCamera(e)})).catch((e=>{this.showScreen=!1,this.reload(),this.selfVideoTrack=null,console.log(e)})):this.enableCamera||this.showScreen||this.enableMic||!this.myVideo||this.myVideo.remove()},toggleCamera(){this.showScreen=!1,this.enableCamera=!this.enableCamera,this.stream&&this.stream.getVideoTracks().length>0&&this.stream.getVideoTracks().forEach((e=>{e.stop(),this.stream.removeTrack(e),this.selfVideoTrack=null})),this.reload()},toggleMic(){this.enableMic=!this.enableMic,this.stream&&this.stream.getAudioTracks().length>0&&this.stream.getAudioTracks().forEach((e=>{e.stop(),this.stream.removeTrack(e),this.selfAudioTrack=null})),this.reload()},rotateCamera(){this.cameraRotation=!this.cameraRotation,this.reload()},toggleScreenCast(){this.enableCamera=!1,this.showScreen=!this.showScreen,this.stream&&this.stream.getVideoTracks().length>0&&this.stream.getVideoTracks().forEach((e=>{e.stop(),this.stream.removeTrack(e),this.selfVideoTrack=null})),this.reload()},reloadSelfCamera(e){e.getAudioTracks().length>0&&(this.selfAudioTrack&&this.selfAudioTrack.stop(),this.selfAudioTrack=e.getAudioTracks()[0]),e.getVideoTracks().length>0&&(this.selfVideoTrack&&this.selfVideoTrack.stop(),this.selfVideoTrack=e.getVideoTracks()[0]),this.selfVideoTrack&&this.stream.addTrack(this.selfVideoTrack),this.selfAudioTrack&&this.stream.addTrack(this.selfAudioTrack),null!=this.myVideo&&this.myVideo.remove(),this.myVideo=document.createElement("video"),this.myVideo.muted=!0,window.webkitURL?this.myVideo.srcObject=this.stream:this.myVideo.src=this.stream,this.myVideo.addEventListener("loadedmetadata",(()=>{this.myVideo.play()})),this.$refs.selfvideo.appendChild(this.myVideo)},completeCall(){this.stream.getTracks().forEach((e=>{e.stop(),this.stream.removeTrack(e)})),this.$emit("completeCall")},changepos(){this.position++,this.position>4&&(this.position=1)}}};const de=(0,m.Z)(he,[["render",ce],["__scopeId","data-v-18d7ca3f"]]);var ue=de,me={components:{communicationComponent:ue,callComponent:D,headerComponent:p,mainComponent:k,footerComponent:b},data(){return{callInfo:null}},mounted(){this.$peer.on("open",(e=>{this.$store.dispatch("SET_PEER_ID",e),console.log("waiting for calls"),this.$peer.on("call",(e=>{console.log(1),this.callInfo||(this.$store.dispatch("SET_IS_CALLING",!0),this.callInfo=e)}))})),this.$peer.on("disconnected",(()=>{})),this.$peer.on("error",(e=>{console.log("peer error",e),this.$peer.PEER.reconnect()}))},methods:{decline(){this.callInfo&&(this.$store.dispatch("SET_IS_CALLING",!1),this.callInfo.close(),this.callInfo=null)},accept(){if(this.callInfo){console.log(this.callInfo),this.$store.dispatch("SET_IS_CALLING",!1),this.callInfo.answer();let e=Array.from(this.$store.getters.CONNECTIONS);e.push(this.callInfo),console.log(1,e),this.$store.dispatch("SET_CONNECTIONS",e),this.$store.dispatch("SET_SHOW_COMMUNICATION",!0),this.$router.push(`/room/${this.callInfo.peer}`),console.log(this.$store.getters.PEER.connections)}},completeCall(){this.$store.dispatch("SET_SHOW_COMMUNICATION",!1),this.$store.dispatch("SET_IS_CALLING",!1),this.$store.dispatch("SET_CONNECTIONS",[]),this.$router.push("/")}}};const fe=(0,m.Z)(me,[["render",r]]);var pe=fe,ve=o(2483);const ge=[{path:"/",name:"главная",component:()=>o.e(793).then(o.bind(o,1793))},{path:"/room/:id",name:"комната",component:()=>o.e(361).then(o.bind(o,3361))},{path:"/:pathMatch(.*)*",component:()=>o.e(912).then(o.bind(o,7912))}],we=(0,ve.p7)({history:(0,ve.PO)("/"),routes:ge});var Ce=we,ke=o(65),_e=(0,ke.MT)({state:{peerid:null,connections:[],showCommunication:!1,isCalling:!1},getters:{PEERID:e=>e.peerid,CONNECTIONS:e=>e.connections,SHOWCOMMUNICATION:e=>e.showCommunication,ISCALLING:e=>e.isCalling},mutations:{SET_PEER_ID:(e,t)=>{e.peerid=t},SET_CONNECTIONS:(e,t)=>{e.connections=t},SET_SHOW_COMMUNICATION:(e,t)=>{e.showCommunication=t},SET_IS_CALLING:(e,t)=>{e.isCalling=t}},actions:{SET_PEER_ID:(e,t)=>{e.commit("SET_PEER_ID",t)},SET_CONNECTIONS:(e,t)=>{e.commit("SET_CONNECTIONS",t)},SET_SHOW_COMMUNICATION:(e,t)=>{e.commit("SET_SHOW_COMMUNICATION",t)},SET_IS_CALLING:(e,t)=>{e.commit("SET_IS_CALLING",t)}},modules:{}});const ye=(0,i.ri)(pe).mixin({data(){return{componentId:(0,n.Z)()}}});ye.config.globalProperties.$peer=new Peer(void 0,{host:"rodionpushkin.ru",secure:!0,port:"443",path:"/peerjs"}),ye.use(_e).use(Ce).mount("#app")}},t={};function o(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,n,i,a){if(!n){var r=1/0;for(h=0;h<e.length;h++){n=e[h][0],i=e[h][1],a=e[h][2];for(var s=!0,l=0;l<n.length;l++)(!1&a||r>=a)&&Object.keys(o.O).every((function(e){return o.O[e](n[l])}))?n.splice(l--,1):(s=!1,a<r&&(r=a));if(s){e.splice(h--,1);var c=i();void 0!==c&&(t=c)}}return t}a=a||0;for(var h=e.length;h>0&&e[h-1][2]>a;h--)e[h]=e[h-1];e[h]=[n,i,a]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.f={},o.e=function(e){return Promise.all(Object.keys(o.f).reduce((function(t,n){return o.f[n](e,t),t}),[]))}}(),function(){o.u=function(e){return"js/"+e+"."+{361:"43e33d55",793:"6c6cc911",912:"a99abaf4"}[e]+".js"}}(),function(){o.miniCssF=function(e){return"css/"+e+"."+{793:"c28271fd",912:"d36987f3"}[e]+".css"}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="awesomeclient:";o.l=function(n,i,a,r){if(e[n])e[n].push(i);else{var s,l;if(void 0!==a)for(var c=document.getElementsByTagName("script"),h=0;h<c.length;h++){var d=c[h];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+a){s=d;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,o.nc&&s.setAttribute("nonce",o.nc),s.setAttribute("data-webpack",t+a),s.src=n),e[n]=[i];var u=function(t,o){s.onerror=s.onload=null,clearTimeout(m);var i=e[n];if(delete e[n],s.parentNode&&s.parentNode.removeChild(s),i&&i.forEach((function(e){return e(o)})),t)return t(o)},m=setTimeout(u.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=u.bind(null,s.onerror),s.onload=u.bind(null,s.onload),l&&document.head.appendChild(s)}}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p="/"}(),function(){var e=function(e,t,o,n){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var a=function(a){if(i.onerror=i.onload=null,"load"===a.type)o();else{var r=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=r,l.request=s,i.parentNode.removeChild(i),n(l)}};return i.onerror=i.onload=a,i.href=t,document.head.appendChild(i),i},t=function(e,t){for(var o=document.getElementsByTagName("link"),n=0;n<o.length;n++){var i=o[n],a=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(a===e||a===t))return i}var r=document.getElementsByTagName("style");for(n=0;n<r.length;n++){i=r[n],a=i.getAttribute("data-href");if(a===e||a===t)return i}},n=function(n){return new Promise((function(i,a){var r=o.miniCssF(n),s=o.p+r;if(t(r,s))return i();e(n,s,i,a)}))},i={143:0};o.f.miniCss=function(e,t){var o={793:1,912:1};i[e]?t.push(i[e]):0!==i[e]&&o[e]&&t.push(i[e]=n(e).then((function(){i[e]=0}),(function(t){throw delete i[e],t})))}}(),function(){var e={143:0};o.f.j=function(t,n){var i=o.o(e,t)?e[t]:void 0;if(0!==i)if(i)n.push(i[2]);else{var a=new Promise((function(o,n){i=e[t]=[o,n]}));n.push(i[2]=a);var r=o.p+o.u(t),s=new Error,l=function(n){if(o.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var a=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+r+")",s.name="ChunkLoadError",s.type=a,s.request=r,i[1](s)}};o.l(r,l,"chunk-"+t,t)}},o.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,a,r=n[0],s=n[1],l=n[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(i in s)o.o(s,i)&&(o.m[i]=s[i]);if(l)var h=l(o)}for(t&&t(n);c<r.length;c++)a=r[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(h)},n=self["webpackChunkawesomeclient"]=self["webpackChunkawesomeclient"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(4457)}));n=o.O(n)})();
//# sourceMappingURL=app.39a48570.js.map