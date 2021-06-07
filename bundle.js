(()=>{"use strict";(()=>{let e;window.util={MIN_ARRAY_INDEX:0,debounce:()=>{e&&window.clearTimeout(e),e=window.setTimeout((()=>{window.wizardsSetting.updateWizards()}),500)},getRandomNumber:(e,t)=>Math.floor(Math.random()*(t-e)+e),showErrorModal:e=>{const t=document.createElement("div");t.classList.add("modal-error"),t.textContent=e,document.body.insertAdjacentElement("afterbegin",t),setTimeout((()=>{t.remove()}),2e3)}}})(),(()=>{const e="https://21.javascript.pages.academy/code-and-magick",t="https://21.javascript.pages.academy/code-and-magick/data",i=(i,n,s,a)=>{const r=new XMLHttpRequest;r.responseType="json",r.timeout=1e4,r.addEventListener("load",(()=>((e,t,i)=>{200===e.status?t(e.response):i(`Статус ответа: ${e.status} ${e.statusText}`)})(r,i,n))),r.addEventListener("error",(()=>(e=>e("Произошла ошибка соединения"))(n))),r.addEventListener("timeout",(()=>((e,t)=>e(`Запрос не успел выполниться за ${t} мс`))(n,r.timeout)));const o="POST"===s?e:t;r.open(s,o),r.send(a)};window.backend={save:(e,t,n)=>i(t,n,"POST",e),load:(e,t)=>i(e,t,"GET")}})(),window.wizardData={COAT_COLORS:["rgb(101, 137, 164)","rgb(241, 43, 107)","rgb(146, 100, 161)","rgb(56, 159, 117)","rgb(215, 210, 55)","rgb(0, 0, 0)"],EYES_COLORS:["black","red","blue","yellow","green"],FIREBALL_COLORS:["#ee4830","#30a8ee","#5ce6c0","#e848d5","#e6e848"]},(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".upload input[type=file]"),i=document.querySelector(".setup-user-pic"),n=new FileReader,s=()=>{i.src=n.result},a=()=>{const i=t.files[0],a=i.name.toLowerCase();n.readAsDataURL(i),e.some((e=>a.endsWith(e)))&&n.addEventListener("load",s)};window.avatar={addListener:()=>{t.addEventListener("change",a)},reader:n,avatarPreview:i}})(),(()=>{const e=document.querySelector(".setup-open-icon"),t=document.querySelector(".setup"),i=t.querySelector(".setup-wizard-form"),n=t.querySelector(".setup-close"),s=t.querySelector(".setup-user-name"),a=e=>{const t=s===document.activeElement;"Escape"!==e.key||t||(e.preventDefault(),l())},r=e=>{"Enter"===e.key&&l()},o=e=>{"Enter"===e.key&&d()},d=()=>{t.classList.remove("hidden"),document.addEventListener("keydown",a),n.addEventListener("keydown",r),n.addEventListener("click",l),window.input.addListener(),window.wizardsSetting.addListeners(),window.avatar.addListener(),window.moveModal.addListener(),window.moveModal.resetPosition()},l=()=>{t.classList.add("hidden"),document.removeEventListener("keydown",a),n.removeEventListener("keydown",r),n.removeEventListener("click",l),window.input.removeListener(),window.wizardsSetting.removeListener(),window.moveModal.removeListener()},c=t=>{t.preventDefault(),window.backend.save(new FormData(i),l,window.util.showErrorModal),e.src=window.avatar.reader.result};window.modal={activate:()=>{e.addEventListener("keydown",o),e.addEventListener("click",d),i.addEventListener("submit",c)},popup:t,avatar:e}})(),(()=>{const e=document.querySelector(".setup"),t=e.querySelector(".upload");let i,n;const s=e=>{e.preventDefault(),i=!0;const t=n.x-e.clientX,s=n.y-e.clientY;n={x:e.clientX,y:e.clientY},window.modal.popup.style.top=window.modal.popup.offsetTop-s+"px",window.modal.popup.style.left=window.modal.popup.offsetLeft-t+"px"},a=e=>{if(e.preventDefault(),document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",a),i){const e=i=>{i.preventDefault(),t.removeEventListener("click",e)};t.addEventListener("click",e)}},r=e=>{e.preventDefault(),n={x:e.clientX,y:e.clientY},document.addEventListener("mousemove",s),document.addEventListener("mouseup",a)};window.moveModal={addListener:()=>t.addEventListener("mousedown",r),removeListener:()=>t.removeEventListener("mousedown",r),resetPosition:()=>{e.style.top="80px",e.style.left="50%"}}})(),(()=>{const e=window.modal.popup.querySelector(".setup-wizard .wizard-eyes"),t=window.modal.popup.querySelector(".setup-wizard .wizard-coat"),i=window.modal.popup.querySelector(".setup-fireball-wrap"),n=window.modal.popup.querySelector('input[name="coat-color"]'),s=window.modal.popup.querySelector('input[name="eyes-color"]'),a=window.modal.popup.querySelector('input[name="fireball-color"]'),r=window.modal.popup.querySelector(".setup-similar-list"),o=document.querySelector("#similar-wizard-template").content,d=window.modal.popup.querySelector(".setup-similar");let l=[],c="rgb(101, 137, 164)",u="black";const w=e=>{const t=o.cloneNode(!0);return t.querySelector(".setup-similar-label").textContent=e.name,t.querySelector(".wizard-coat").style.fill=e.colorCoat,t.querySelector(".wizard-eyes").style.fill=e.colorEyes,t},h=e=>{let t=0;return t=e.colorCoat===c?t+2:t,t=e.colorEyes===u?t+1:t,t},m=(e,t)=>{let i=h(t)-h(e);return i=0===i?((e,t)=>e>t?1:e<t?-1:0)(e.name,t.name):i,i},p=()=>{(e=>{const t=e.length>4?4:e.length;r.innerHTML="";for(let i=0;i<t;i++)r.appendChild(w(e[i]));d.classList.remove("hidden")})(l.sort(m))},v=(n,s,r)=>{let o=((e,t)=>{let i=e[window.util.getRandomNumber(window.util.MIN_ARRAY_INDEX,e.length)];for(;i===t.value;)i=e[window.util.getRandomNumber(window.util.MIN_ARRAY_INDEX,e.length)];return i})(n,s);r===i?(r.style.background=o,a.value=o):(r===t?c=o:r===e&&(u=o),r.style.fill=o,s.value=o)},g=()=>{v(window.wizardData.COAT_COLORS,n,t),window.util.debounce()},y=()=>{v(window.wizardData.EYES_COLORS,s,e),window.util.debounce()},f=()=>v(window.wizardData.FIREBALL_COLORS,a,i);window.wizardsSetting={renderUpdateWizards:e=>{l=e,p()},updateWizards:p,addListeners:()=>{t.addEventListener("click",g),e.addEventListener("click",y),i.addEventListener("click",f)},removeListener:()=>{t.removeEventListener("click",g),e.removeEventListener("click",y),i.removeEventListener("click",f)}}})(),(()=>{const e=window.modal.popup.querySelector(".setup-user-name"),t=()=>{const t=e.value.trim().length,i=t<2?`Ещё ${2-t} симв.`:"";e.setCustomValidity(i),e.reportValidity()};window.input={addListener:()=>e.addEventListener("input",t),removeListener:()=>e.removeEventListener("input",t)}})(),(()=>{const e=window.wizardsSetting.renderUpdateWizards,t=window.util.showErrorModal;window.backend.load(e,t),window.modal.activate()})(),window.gameSetting={fireballSize:22,wizardSpeed:3,wizardWidth:70,getFireballSpeed:e=>e?2:5,getWizardHeight:()=>93.59,getWizardX:e=>(e-70)/2,getWizardY:e=>e/3},(()=>{const e=(e,t,i,n)=>{e.fillStyle=n,e.fillRect(t,i,500,270)},t=(e,t,i,n)=>{e.fillStyle="#000",e.font="16px PT Mono",e.textBaseline="hanging",e.fillText(n,t,i)},i=(e,i,n,s,a,r,o,d,l,c)=>{t(e,i,n,o),e.fillStyle=r,e.fillRect(i,s,d,l),t(e,i,a,c)};window.renderStatistics=(n,s,a)=>{const r=Math.max(...a);e(n,110,20,"rgba(0, 0, 0, 0.7)"),e(n,100,10,"#fff"),t(n,140,30,"Ура вы победили!"),t(n,140,50,"Список результатов:"),((e,t,n,s)=>{for(let a=0;a<t.length;a++){const r=t[a],o=Math.round(n[a]),d=o/s*150;i(e,160+90*a,250,240-d,240-d-20,"Вы"===r?"rgba(255, 0, 0, 1)":`hsl(240, ${window.util.getRandomNumber(20,100)}%, 50%)`,r,40,d,o)}})(n,s,a,r)}})(),window.GameConstants={Fireball:{size:window.gameSetting.fireballSize||24,speed:window.gameSetting.getFireballSpeed||function(e){return e?2:5}},Wizard:{speed:window.gameSetting.wizardSpeed||2,width:window.gameSetting.wizardWidth||61,getHeight:window.gameSetting.getWizardHeight||function(e){return 1.377*e},getX:window.gameSetting.getWizardX||function(e){return e/3},getY:window.gameSetting.getWizardY||function(e){return e-100}}},window.Game=function(){var e=300,t=700,i=["Кекс","Катя","Игорь"],n={},s="-reversed";n[0]={width:61,height:84,url:"img/wizard.gif"},n[0+s]={width:61,height:84,url:"img/wizard-reversed.gif"},n[1]={width:24,height:24,url:"img/fireball.gif"};var a={0:function(i,n,s){n.keysPressed.UP&&i.y>0&&(i.direction=-9&i.direction,i.direction=4|i.direction,i.y-=i.speed*s*2),n.keysPressed.UP||i.y<e-i.height&&(i.direction=-5&i.direction,i.direction=8|i.direction,i.y+=i.speed*s/3),n.keysPressed.LEFT&&(i.direction=-3&i.direction,i.direction=1|i.direction,i.x-=i.speed*s),n.keysPressed.RIGHT&&(i.direction=-2&i.direction,i.direction=2|i.direction,i.x+=i.speed*s),i.y<0&&(i.y=0),i.y>e-i.height&&(i.y=e-i.height),i.x<0&&(i.x=0),i.x>t-i.width&&(i.x=t-i.width)},1:function(e,i,n){1&e.direction&&(e.x-=e.speed*n),2&e.direction&&(e.x+=e.speed*n),(e.x<0||e.x>t)&&(e.state=1)}},r={CONTINUE:0,WIN:1,FAIL:2,PAUSE:3,INTRO:4},o={0:function(e){return e.garbage.filter((function(e){return 1===e.type})).filter((function(e){return e.x<10&&e.y>240}))[0]?r.WIN:r.CONTINUE}},d={0:function(i){return i.objects.push({direction:2,height:window.GameConstants.Wizard.getHeight(window.GameConstants.Wizard.width),speed:window.GameConstants.Wizard.speed,sprite:n[0],state:0,type:0,width:window.GameConstants.Wizard.width,x:window.GameConstants.Wizard.getX(t),y:window.GameConstants.Wizard.getY(e)}),i}},l=function(e){this.container=e,this.canvas=document.createElement("canvas"),this.canvas.width=e.clientWidth,this.canvas.height=e.clientHeight,this.container.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this._onKeyDown=this._onKeyDown.bind(this),this._onKeyUp=this._onKeyUp.bind(this),this._pauseListener=this._pauseListener.bind(this),this.setDeactivated(!1)};l.prototype={level:0,setDeactivated:function(e){this._deactivated!==e&&(this._deactivated=e,e?this._removeGameListeners():this._initializeGameListeners())},getInitialState:function(){return{currentStatus:r.CONTINUE,garbage:[],lastUpdated:null,keysPressed:{ESC:!1,LEFT:!1,RIGHT:!1,SPACE:!1,UP:!1},levelStartTime:null,objects:[],startTime:null}},initializeLevelAndStart:function(e){(e=void 0===e||e)||!this.state?(this._imagesArePreloaded=void 0,this.state=this.getInitialState(),this.state=d[this.level](this.state)):this.state.currentStatus=r.CONTINUE,this.state.levelStartTime=Date.now(),this.state.startTime||(this.state.startTime=this.state.levelStartTime),this._preloadImagesForLevel(function(){this.render(),this._initializeGameListeners(),this.update()}.bind(this))},pauseLevel:function(e){e&&(this.state.currentStatus=e),this.state.keysPressed.ESC=!1,this.state.lastUpdated=null,this._removeGameListeners(),window.addEventListener("keydown",this._pauseListener),this._drawPauseScreen()},_pauseListener:function(e){if(32===e.keyCode&&!this._deactivated){e.preventDefault();var t=this.state.currentStatus===r.WIN||this.state.currentStatus===r.FAIL;this.initializeLevelAndStart(t),window.removeEventListener("keydown",this._pauseListener)}},_drawPauseScreen:function(){var e;switch(this.state.currentStatus){case r.WIN:if(window.renderStatistics){var t=this._generateStatistics(new Date-this.state.startTime),i=this._shuffleArray(Object.keys(t));return void window.renderStatistics(this.ctx,i,i.map((function(e){return t[e]})))}e="Вы победили Газебо!\nУра!";break;case r.FAIL:e="Вы проиграли!";break;case r.PAUSE:e="Игра на паузе!\nНажмите Пробел, чтобы продолжить";break;case r.INTRO:e="Добро пожаловать!\nНажмите Пробел для начала игры"}this._drawMessage(e)},_generateStatistics:function(e){for(var t={Вы:e},n=0;n<i.length;n++){var s=e+(3e3*Math.random()-1500);s<1e3&&(s=1e3),t[i[n]]=s}return t},_shuffleArray:function(e){for(var t=e.length-1;t>0;t--){var i=Math.floor(Math.random()*(t+1)),n=e[t];e[t]=e[i],e[i]=n}return e},_drawMessage:function(e){var t=this.ctx,i=function(e,i,n,s){t.beginPath(),t.moveTo(e,i),t.lineTo(e+10,i+s/2),t.lineTo(e,i+s),t.lineTo(e+n/2,i+s-10),t.lineTo(e+n,i+s),t.lineTo(e+n-10,i+s/2),t.lineTo(e+n,i),t.lineTo(e+n/2,i+10),t.lineTo(e,i),t.stroke(),t.closePath(),t.fill()};t.fillStyle="rgba(0, 0, 0, 0.7)",i(190,40,320,100),t.fillStyle="rgba(256, 256, 256, 1.0)",i(180,30,320,100),t.fillStyle="#000",t.font="16px PT Mono",e.split("\n").forEach((function(e,i){t.fillText(e,200,80+20*i)}))},_preloadImagesForLevel:function(e){if(void 0===this._imagesArePreloaded&&(this._imagesArePreloaded=[]),this._imagesArePreloaded[this.level])e();else for(var t=Object.keys(n),i=t.length,s=this,a=function(t){var n=new Image(t.width,t.height);n.onload=function(){t.image=n,0==--i&&(s._imagesArePreloaded[s.level]=!0,e())},n.src=t.url},r=0;r<t.length;r++)a(n[t[r]])},updateObjects:function(e){var t=this.state.objects.filter((function(e){return 0===e.type}))[0];this.state.keysPressed.SHIFT&&(this.state.objects.push({direction:t.direction,height:window.GameConstants.Fireball.size,speed:window.GameConstants.Fireball.speed(!!(1&t.direction)),sprite:n[1],type:1,width:window.GameConstants.Fireball.size,x:2&t.direction?t.x+t.width:t.x-window.GameConstants.Fireball.size,y:t.y+t.height/2}),this.state.keysPressed.SHIFT=!1),this.state.garbage=[];var i=this.state.objects.filter((function(t){return a[t.type](t,this.state,e),1!==t.state||(this.state.garbage.push(t),!1)}),this);this.state.objects=i},checkStatus:function(){if(this.state.currentStatus===r.CONTINUE){this.commonRules||(this.commonRules=[function(e){return 1===e.objects.filter((function(e){return 0===e.type}))[0].state?r.FAIL:r.CONTINUE},function(e){return e.keysPressed.ESC?r.PAUSE:r.CONTINUE},function(e){return Date.now()-e.startTime>18e4?r.FAIL:r.CONTINUE}]);for(var e=this.commonRules.concat(o[this.level]),t=r.CONTINUE;t===r.CONTINUE&&e.length;)t=e.shift()(this.state);this.state.currentStatus=t}},setGameStatus:function(e){this.state.currentStatus!==e&&(this.state.currentStatus=e)},render:function(){this.ctx.clearRect(0,0,t,e),this.state.objects.forEach((function(e){if(e.sprite){var t=1&e.direction,i=n[e.type+(t?s:"")]||n[e.type];this.ctx.drawImage(i.image,e.x,e.y,e.width,e.height)}}),this)},update:function(){this.state.lastUpdated||(this.state.lastUpdated=Date.now());var e=(Date.now()-this.state.lastUpdated)/10;switch(this.updateObjects(e),this.checkStatus(),this.state.currentStatus){case r.CONTINUE:this.state.lastUpdated=Date.now(),this.render(),requestAnimationFrame(function(){this.update()}.bind(this));break;case r.WIN:case r.FAIL:case r.PAUSE:case r.INTRO:this.pauseLevel()}},_onKeyDown:function(e){switch(e.keyCode){case 37:this.state.keysPressed.LEFT=!0;break;case 39:this.state.keysPressed.RIGHT=!0;break;case 38:this.state.keysPressed.UP=!0;break;case 27:this.state.keysPressed.ESC=!0}e.shiftKey&&(this.state.keysPressed.SHIFT=!0)},_onKeyUp:function(e){switch(e.keyCode){case 37:this.state.keysPressed.LEFT=!1;break;case 39:this.state.keysPressed.RIGHT=!1;break;case 38:this.state.keysPressed.UP=!1;break;case 27:this.state.keysPressed.ESC=!1}e.shiftKey&&(this.state.keysPressed.SHIFT=!1)},_initializeGameListeners:function(){window.addEventListener("keydown",this._onKeyDown),window.addEventListener("keyup",this._onKeyUp)},_removeGameListeners:function(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp)}},l.Verdict=r;var c=new l(document.querySelector(".demo"));return window.restartGame=function(e,t){n[0].url=e,n[0+s].url=t,c.initializeLevelAndStart(),c.setGameStatus(r.INTRO)},window.restartGame("img/wizard.gif","img/wizard-reversed.gif"),c}()})();