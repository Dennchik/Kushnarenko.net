import{b as l}from"./vendors/build-swiper-Bbce2EWT.js";import{S as a}from"./vendors/vendor-RgJYKdhY.js";function c(r=".card-slide"){if(r){let t=function(){const s=document.querySelector(".card-thumb");if(!s)return 4;const o=s.querySelectorAll(".swiper-slide").length;return o<=3?o:4},e=new a(".card-thumb",{spaceBetween:15,speed:800,slidesPerView:t(),freeMode:!0,watchSlidesProgress:!0,updateOnWindowResize:!0,navigation:{nextEl:".btn-next",prevEl:".btn-prev"}});new a(".card-product__slide",{spaceBetween:22,speed:800,grabCursor:!0,loop:!0,slidesPerView:1,updateOnWindowResize:!0,thumbs:{swiper:e}});const u=new MutationObserver(()=>{e.params.slidesPerView=t(),e.update()}),n=document.querySelector(".card-thumb");n&&u.observe(n,{childList:!0,subtree:!0})}}l();c();const i=document.createElement("style");i.textContent=`
@keyframes arrowShake {
  0% { transform: translateX(0); }
  12.5% { transform: translateX(-5px); }
  25% { transform: translateX(4px); }
  37.5% { transform: translateX(-4px); }
  50% { transform: translateX(3px); }
  62.5% { transform: translateX(-3px); }
  75% { transform: translateX(2px); }
  87.5% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}
`;document.head.appendChild(i);function d(){document.querySelectorAll(".card-product__button-prev").forEach(t=>{const e=t.querySelector(".icon-arrow-left");e&&(e.style.display="inline-block",e.style.transition="transform 0.3s ease",t.addEventListener("mouseenter",()=>{e.style.animation="arrowShake 0.6s ease-in-out"}),t.addEventListener("mouseleave",()=>{setTimeout(()=>{e.style.animation="none"},600)}))})}document.addEventListener("DOMContentLoaded",d);const m=new MutationObserver(()=>{d()});m.observe(document.body,{childList:!0,subtree:!0});const p=document.querySelector(".card-product__button-prev");p.addEventListener("click",function(){window.history.back()});
