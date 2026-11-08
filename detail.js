(function(){
  var r=document.documentElement;
  /* 진행 표시줄 + 머리글 */
  var bar=document.getElementById('bar'),hd=document.getElementById('hd');
  function sc(){var y=window.pageYOffset,h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?Math.min(100,y/h*100):0)+'%';hd.classList.toggle('shadow',y>8)}
  addEventListener('scroll',sc,{passive:true});sc();
  /* 등장 효과 */
  var ups=[].slice.call(document.querySelectorAll('.up'));
  if(!('IntersectionObserver' in window)){ups.forEach(function(e){e.classList.add('in')})}
  else{var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.1,rootMargin:'0px 0px -4% 0px'});ups.forEach(function(e){io.observe(e)});
    setTimeout(function(){ups.forEach(function(e){e.classList.add('in')})},6000)}
  /* 밝은/어두운 화면 전환 */
  var b=document.getElementById('themeBtn'),tl=b.querySelector('.tl');
  function ui(){var l=r.getAttribute('data-theme')==='light';b.setAttribute('aria-pressed',l?'true':'false');b.setAttribute('aria-label',l?'어두운 화면으로 바꾸기':'밝은 화면으로 바꾸기');tl.textContent=l?'어둡게':'밝게';var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',l?'#F6F3EC':'#0C0F14')}
  ui();
  b.addEventListener('click',function(){var l=r.getAttribute('data-theme')==='light';if(l)r.removeAttribute('data-theme');else r.setAttribute('data-theme','light');try{localStorage.setItem('theme',l?'dark':'light')}catch(e){}ui()});
})();
