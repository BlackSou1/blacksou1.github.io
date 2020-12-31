const body=document.querySelector("body"),root=document.documentElement,style=getComputedStyle(root);let fixedItem;function bodyLock(){fixedItem=document.querySelectorAll(".fixed-item");const e=window.innerWidth-body.offsetWidth+"px";body.style.overflow="hidden",body.style.marginRight=e,fixedItem.forEach(t=>t.style.paddingRight=e)}function bodyUnlock(){body.style.overflow="",body.style.marginRight="",fixedItem.forEach(e=>e.style.paddingRight="")}const hamburger=document.querySelector(".hamburger"),hamburgerWrapper=document.querySelector(".hamburger__wrapper"),hamburgerButton=document.querySelector(".hamburger__button");let hamburgerOpen=!1;function openHamburger(){0==hamburgerOpen&&(bodyLock(),hamburger.classList.add("hamburger--open"),hamburgerWrapper.classList.add("hamburger__wrapper--open"),hamburgerOpen=!0)}function showHiddenVideos(){document.querySelectorAll(".music__video-container--hidden").forEach(e=>{e.classList.remove("music__video-container--hidden")})}null!=hamburgerButton&&(hamburgerButton.onclick=openHamburger),window.onclick=function(e){hamburgerOpen&&e.target==hamburger&&(hamburgerWrapper.classList.remove("hamburger__wrapper--open"),setTimeout((function(){hamburger.classList.remove("hamburger--open"),hamburgerOpen=!1,bodyUnlock()}),200))};const accordion=document.querySelectorAll(".accordion"),accordionWrapper=document.querySelectorAll(".accordion__wrapper"),accordionButton=document.querySelectorAll(".accordion__button"),accordionText=[],accordionOpen=[];for(let e=0;e<accordion.length;e++)accordionText[e]=accordion[e].querySelector(".accordion__text"),accordionButton[e].addEventListener("click",()=>accordionClick(e)),accordionWrapper[e].addEventListener("transitionend",t=>accordionTransition(e,t)),accordionWrapper[e].classList.contains("accordion__wrapper--active")?accordionOpen[e]=!0:accordionOpen[e]=!1;function accordionClick(e){if(accordionOpen[e]){accordionOpen[e]=!1,accordionButton[e].classList.remove("accordion__button--active"),accordionWrapper[e].style.maxHeight=accordionWrapper[e].scrollHeight+"px";accordionWrapper[e].scrollHeight;setTimeout((function(){accordionWrapper[e].style.maxHeight=0}),0)}else accordionOpen[e]=!0,accordionWrapper[e].classList.add("accordion__wrapper--active"),accordionButton[e].classList.add("accordion__button--active"),accordionWrapper[e].style.maxHeight=0,setTimeout((function(){accordionWrapper[e].style.maxHeight=accordionWrapper[e].scrollHeight+"px"}),0)}function accordionTransition(e,t){t.target==accordionWrapper[e]&&(accordionOpen[e]||accordionWrapper[e].classList.remove("accordion__wrapper--active"),accordionWrapper[e].style.maxHeight="")}const anchors=document.querySelectorAll('a[href^="#"]');let hash;window.location.href.indexOf("#")>-1&&(hash=window.location.hash,""!=hash&&("index"==document.querySelector(hash)&&(window.location.href="index"+hash),null!=document.querySelector(""+hash)&&(document.querySelector(""+hash).scrollIntoView({behavior:"auto",block:"start"}),history.replaceState("",document.title,window.location.pathname+window.location.search)))),window.onload=function(){""!=hash&&null!=document.querySelector(""+hash)&&document.querySelector(""+hash).scrollIntoView({behavior:"smooth",block:"start"})};for(let e of anchors)e.addEventListener("click",(function(t){t.preventDefault();let i=e.getAttribute("href");"#"!=i&&(null==document.querySelector(i)&&(window.location.href="index"+i),hamburger.click(),document.querySelector(""+i).scrollIntoView({behavior:"smooth",block:"start"}))}));const modal=document.querySelectorAll(".modal"),modalWrapper=document.querySelectorAll(".modal__wrapper"),modalClose=document.querySelectorAll(".modal__close"),modalImg=document.querySelector(".modal__img-image");let modalClicked,currentModal,modalsCount=0,openModalsCount=document.querySelectorAll(".modal--open").length;const modalButton=[];for(let e=0;e<modal.length;e++)modalButton[e]=document.querySelectorAll(".modal"+(e+1)+"__button"),modal[e].addEventListener("transitionend",modalTransitioned);function modalButtonEvent(e){const t=modalsCount;e.forEach(e=>e.addEventListener("click",e=>toggleModal(t,"open",e))),modalsCount++}function toggleModal(e,t,i=null){null!=i&&i.preventDefault(),sliderLinkDragged||("open"==t?(bodyLock(),openModalsCount=document.querySelectorAll(".modal--open").length,modal[e].classList.add("modal--open"),currentModal=e,null!=i&&null!=i.target.closest(".modal-img")&&null!=modalImg&&(modalImg.src=i.target.closest(".modal-img").dataset.modalImg,modalImg.alt=i.target.closest(".modal-img").dataset.modalImgAlt,"undefined"==modalImg.alt&&(modalImg.alt=""))):modal[e].classList.remove("modal--open"))}modalButton[modal.length-1]=document.querySelectorAll(".modal-img"),modalButton.forEach(e=>modalButtonEvent(e)),window.addEventListener("mousedown",(function(e){for(let t=0;t<modal.length;t++)e.target==modalWrapper[t]&&(modalClicked=!0)})),window.addEventListener("mouseup",(function(e){modalClicked&&e.target==modalWrapper[currentModal]?toggleModal(currentModal,"close"):modalClicked=!1}));for(let e=0;e<modal.length;e++)modalClose[e].onclick=()=>toggleModal(e,"close");function modalTransitioned(){const e=document.elementFromPoint(0,0);for(let t=0;t<modal.length;t++)if(modal[t]==e.closest(".modal")){currentModal=t;break}openModalsCount=document.querySelectorAll(".modal--open").length,0==openModalsCount&&bodyUnlock()}document.addEventListener("keydown",(function(e){27==e.which&&toggleModal(currentModal,"close")}));class Slider{constructor(){this.slider=document.querySelectorAll(".slider"),this.sliderWrapper=document.querySelectorAll(".slider__wrapper"),this.sliderImg=document.querySelectorAll(".slider__img"),this.sliderLink=document.querySelectorAll(".slider__link"),this.sliderPrevBtn=document.querySelectorAll(".slider__prev"),this.sliderNextBtn=document.querySelectorAll(".slider__next"),this.sliderWrapperTranslate=[],this.sliderWrapperDragOffset=[],this.sliderButton=[],this.sliderItem=[],this.sliderVisibleItems=[],this.currentSlider=[],this.sliderDisabled=[],this.sliderAutoplayTimer=[];for(let e=0;e<this.slider.length;e++){this.sliderWrapperTranslate[e]=0,this.sliderWrapperDragOffset[e]=0,this.sliderItem[e]=this.slider[e].querySelectorAll(".slider__item"),this.sliderButton[e]=this.slider[e].querySelectorAll(".slider__button");for(let t=0;t<this.sliderButton[e].length;t++)this.sliderButton[e][t].addEventListener("click",e=>this.sliderSwitch(e));null!=this.sliderButton[e][0]&&this.sliderButton[e][0].classList.add("slider__button--active"),this.sliderVisibleItemsCount(e),this.currentSlider[e]=0,this.sliderToggle(e),this.slider[e].classList.contains("slider__autoplay")&&(this.sliderAutoplayTimer[e]=setInterval(()=>this.sliderNext(e),5e3),this.slider[e].addEventListener("mouseenter",()=>this.sliderAutoplayUnpause(e)),this.slider[e].addEventListener("mouseleave",()=>this.sliderAutoplayPause(e))),null!=this.sliderNextBtn[e]&&this.sliderNextBtn[e].addEventListener("click",()=>this.sliderNext(e)),null!=this.sliderPrevBtn[e]&&this.sliderPrevBtn[e].addEventListener("click",()=>this.sliderPrev(e))}this.sliderHeight(),window.addEventListener("load",()=>this.sliderHeight()),this.sliderImg.forEach(e=>e.addEventListener("load",()=>this.sliderHeight())),window.addEventListener("resize",()=>this.sliderResize()),this.sliderDragged=!1,this.sliderDragOffset=0,this.draggedSlider;for(let e=0;e<this.slider.length;e++)this.slider[e].addEventListener("mousedown",t=>this.sliderDragStart(t,e)),this.slider[e].addEventListener("touchstart",t=>this.sliderDragStart(t,e));window.addEventListener("mousemove",e=>this.sliderDragMove(e)),window.addEventListener("touchmove",e=>this.sliderDragMove(e)),window.addEventListener("mouseup",()=>this.sliderDragEnd()),window.addEventListener("touchend",()=>this.sliderDragEnd());for(let e=0;e<this.slider.length;e++)this.slider[e].addEventListener("mouseleave",()=>this.sliderDragEnd());this.sliderLinkDragged,this.sliderDragLinkOffset,this.sliderLink.forEach(e=>e.addEventListener("click",e=>this.sliderLinkClick(e))),window.addEventListener("click",()=>{this.sliderLinkDragged=!1}),this.scrollX,this.scrollY,this.scrollXEnabled,this.scrollYEnabled,window.addEventListener("touchstart",e=>this.scrollStart(e)),window.addEventListener("touchmove",e=>this.scrollMove(e),{passive:!1})}function;sliderNext(e){this.sliderDisabled[e]||(this.currentSlider[e]>=this.sliderItem[e].length-this.sliderVisibleItems[e]?(this.currentSlider[e]=0,this.sliderMove(e)):(this.currentSlider[e]++,this.sliderMove(e)))}function;sliderPrev(e){this.sliderDisabled[e]||(0==this.currentSlider[e]?(this.currentSlider[e]=this.sliderItem[e].length-this.sliderVisibleItems[e],this.sliderMove(e)):(this.currentSlider[e]--,this.sliderMove(e)))}function;sliderSwitch(e){for(let t=0;t<this.slider.length;t++)for(let i=0;i<this.sliderButton[t].length;i++)if(e.target.closest(".slider__button")==this.sliderButton[t][i])return this.currentSlider[t]=i,void this.sliderMove(t)}function;sliderMove(e){this.sliderWrapperTranslate[e]=this.currentSlider[e]*(-1*this.sliderWrapper[e].offsetWidth/this.sliderVisibleItems[e]),this.sliderWrapper[e].style.transform="translateX("+this.sliderWrapperTranslate[e]+"px)",null!=this.sliderButton[e][this.currentSlider[e]]&&(this.sliderButton[e].forEach(e=>e.classList.remove("slider__button--active")),this.sliderButton[e][this.currentSlider[e]].classList.add("slider__button--active")),this.sliderHeight()}function;sliderVisibleItemsCount(e){const t=window.getComputedStyle(this.sliderItem[e][0]);this.sliderVisibleItems[e]=Math.round(this.sliderWrapper[e].offsetWidth/(this.sliderItem[e][0].offsetWidth+parseInt(t.marginRight)+parseInt(t.marginRight)))}function;sliderResize(){for(let e=0;e<this.slider.length;e++){this.sliderVisibleItemsCount(e);let t=this.sliderItem[e].length-this.sliderVisibleItems[e];if(this.currentSlider[e]>t){for(;t<0;)t++;this.currentSlider[e]=t}this.sliderMove(e),this.sliderToggle(e)}}function;sliderHeight(){for(let e=0;e<this.slider.length;e++)this.sliderWrapper[e].style.maxHeight=this.sliderItem[e][this.currentSlider[e]].offsetHeight+"px"}function;sliderToggle(e){if(this.sliderItem[e].length<=this.sliderVisibleItems[e]){this.sliderDisabled[e]=!0,this.slider[e].classList.add("slider--disabled"),this.slider[e].classList.add("slider__wrapper--disabled");for(let t=0;t<this.sliderButton[e].length;t++)this.sliderNextBtn[e].classList.add("slider__button--disabled");null!=this.sliderNextBtn[e]&&this.sliderNextBtn[e].classList.add("slider__next--disabled"),null!=this.sliderPrevBtn[e]&&this.sliderPrevBtn[e].classList.add("slider__prev--disabled")}else{this.sliderDisabled[e]=!1,this.slider[e].classList.remove("slider--disabled"),this.slider[e].classList.remove("slider__wrapper--disabled");for(let t=0;t<this.sliderButton[e].length;t++)this.sliderNextBtn[e].classList.remove("slider__button--disabled");null!=this.sliderNextBtn[e]&&this.sliderNextBtn[e].classList.remove("slider__next--disabled"),null!=this.sliderPrevBtn[e]&&this.sliderPrevBtn[e].classList.remove("slider__prev--disabled")}}function;sliderAutoplayPause(e){this.sliderAutoplayTimer[e]=setInterval(()=>this.sliderNext(e),5e3)}function;sliderAutoplayUnpause(e){clearInterval(this.sliderAutoplayTimer[e])}function;sliderLinkClick(e){this.sliderLinkDragged&&e.preventDefault()}function;sliderDragStart(e,t){this.sliderDisabled[t]||(this.draggedSlider=t,this.slider[this.draggedSlider].classList.add("slider--dragged"),this.sliderWrapper[this.draggedSlider].classList.add("slider__wrapper--dragged"),this.sliderDragged=!0,"touchstart"==e.type?this.sliderDragOffset=e.touches[0].clientX:(e.preventDefault(),this.sliderDragOffset=e.clientX,this.sliderLinkDragged=!1,this.sliderDragLinkOffset=e.clientX),this.sliderWrapperDragOffset[this.draggedSlider]=this.sliderWrapperTranslate[this.draggedSlider])}function;sliderDragMove(e){if(this.sliderDragged){const t=10;let i;Math.abs(this.sliderDragLinkOffset-e.clientX)>t&&(this.sliderLinkDragged=!0),"touchmove"==e.type?(i=e.touches[0].clientX-this.sliderDragOffset,this.sliderDragOffset=e.touches[0].clientX):(i=e.clientX-this.sliderDragOffset,this.sliderDragOffset=e.clientX),this.sliderWrapperDragOffset[this.draggedSlider]+=i,this.sliderWrapper[this.draggedSlider].style.transform="translateX("+this.sliderWrapperDragOffset[this.draggedSlider]+"px)",this.sliderDragCheck()}}function;sliderDragCheck(){this.sliderWrapperTranslate[this.draggedSlider]<0?this.sliderWrapperTranslate[this.draggedSlider]+-1*this.sliderWrapperDragOffset[this.draggedSlider]<=this.sliderWrapper[this.draggedSlider].offsetWidth/this.sliderVisibleItems[this.draggedSlider]*-.3?(this.sliderDragEnd(),this.sliderPrev(this.draggedSlider)):this.sliderWrapperTranslate[this.draggedSlider]+-1*this.sliderWrapperDragOffset[this.draggedSlider]>=this.sliderWrapper[this.draggedSlider].offsetWidth/this.sliderVisibleItems[this.draggedSlider]*.3&&(this.sliderDragEnd(),this.sliderNext(this.draggedSlider)):this.sliderWrapperTranslate[this.draggedSlider]-this.sliderWrapperDragOffset[this.draggedSlider]<=this.sliderWrapper[this.draggedSlider].offsetWidth/this.sliderVisibleItems[this.draggedSlider]*-.3?(this.sliderDragEnd(),this.sliderPrev(this.draggedSlider)):this.sliderWrapperTranslate[this.draggedSlider]-this.sliderWrapperDragOffset[this.draggedSlider]>=this.sliderWrapper[this.draggedSlider].offsetWidth/this.sliderVisibleItems[this.draggedSlider]*.3&&(this.sliderDragEnd(),this.sliderNext(this.draggedSlider))}function;sliderDragEnd(){this.sliderDragged&&(this.slider[this.draggedSlider].classList.remove("slider--dragged"),this.sliderWrapper[this.draggedSlider].classList.remove("slider__wrapper--dragged"),this.sliderDragged=!1,this.sliderWrapper[this.draggedSlider].style.transform="translateX("+this.sliderWrapperTranslate[this.draggedSlider]+"px)")}function;scrollStart(e){this.scrollX=e.touches[0].clientX,this.scrollY=e.touches[0].clientY,this.scrollXEnabled=!0,this.scrollYEnabled=!0}function;scrollMove(e){this.scrollXEnabled&&this.scrollYEnabled&&(Math.abs(this.scrollX-e.touches[0].clientX)>10?this.scrollYEnabled=!1:Math.abs(this.scrollY-e.touches[0].clientY)>10&&(this.scrollXEnabled=!1)),0==this.scrollYEnabled?e.preventDefault():0==this.scrollXEnabled&&this.sliderDragEnd()}}const slider=new Slider,submenu=document.querySelectorAll(".submenu"),submenuButton=document.querySelectorAll(".submenu__button");for(let e=0;e<submenu.length;e++)submenuButton[e].addEventListener("click",()=>submenuToggle(e));function submenuToggle(e){submenuButton[e].classList.contains("submenu__button--open")?submenuClose(e):submenuOpen(e)}function submenuOpen(e){submenu[e].classList.add("submenu--open"),submenuButton[e].classList.add("submenu__button--open")}function submenuClose(e){submenu[e].classList.remove("submenu--open"),submenuButton[e].classList.remove("submenu__button--open")}window.addEventListener("click",(function(e){for(let t=0;t<submenu.length;t++)e.target.closest(".submenu")!=submenu[t]&&e.target.closest(".submenu__button")!=submenuButton[t]&&submenuClose(t)}));const delay=200;let scrollOffset=150,transformOffset=100,animationDisabled=!1;function fade(e,t){document.querySelectorAll("."+e).forEach(i=>{let r=scrollAnimateCount(i);switch(t){case"+":pageYOffset>=r+transformOffset&&setTimeout(scrollAnimate,200,i,e);break;case"-":pageYOffset>=r-transformOffset&&setTimeout(scrollAnimate,200,i,e);break;case"":pageYOffset>=r&&setTimeout(scrollAnimate,200,i,e);break;default:console.log("INVALID SIGN")}})}function scrollAnimate(e,t){e.classList.remove(t),e.classList.add("fade-anim")}function scrollAnimateCount(e){const t=e.getBoundingClientRect(),i=window.pageYOffset||document.documentElement.scrollTop;let r=t.top+i-window.innerHeight;return 1!=e.classList.contains("fade-no-offset")&&(r+=scrollOffset),r}function disableAnimation(e){animItem=document.querySelectorAll("."+e),animItem.forEach(t=>{t.classList.remove(e)})}window.addEventListener("scroll",()=>fade("fade-up","-")),window.addEventListener("scroll",()=>fade("fade-down","+")),window.addEventListener("scroll",()=>fade("fade-left","")),window.addEventListener("scroll",()=>fade("fade-right","")),window.addEventListener("resize",()=>fade("fade-up","-")),window.addEventListener("resize",()=>fade("fade-down","+")),window.addEventListener("resize",()=>fade("fade-left","")),window.addEventListener("resize",()=>fade("fade-right","")),fade("fade-up","-"),fade("fade-down","+"),fade("fade-left",""),fade("fade-right",""),setInterval((function(){0==animationDisabled&&window.innerWidth<=1e3&&(animationDisabled=!0,disableAnimation("fade-up"),disableAnimation("fade-down"),disableAnimation("fade-left"),disableAnimation("fade-right"))}),1);