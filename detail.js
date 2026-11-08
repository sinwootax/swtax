(function(){
  /* 상담 신청 전달 주소(구글 앱스 스크립트 웹 앱 주소). 비어 있으면 기존 Tally 신청서를 사용합니다. */
  var ENDPOINT='';
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
  /* 상담 신청 팝업(Tally) */
  var modal=document.getElementById('modal'),fr=document.getElementById('mframe'),last=null;
  var FORM='https://tally.so/';
  function url(kind,cat){return FORM+kind+'/wgWDql?transparentBackground=1&alignLeft=1&category='+encodeURIComponent('['+cat+'] ')}
  var form=document.getElementById('aform'),done=document.getElementById('adone'),err=document.getElementById('aerr'),sub=document.getElementById('asub'),foot=document.querySelector('.mfoot');
  function open(){var cat=document.body.getAttribute('data-cat')||'';last=document.activeElement;
    document.getElementById('mcat').textContent='상담 분야: '+cat;
    if(ENDPOINT){fr.hidden=true;done.hidden=true;form.hidden=false;err.hidden=true;sub.disabled=false;sub.textContent='상담 신청하기';
      form.querySelector('#fcat').value=cat;
      foot.innerHTML='문의: 전화 <a href="tel:027923579">02-792-3579</a>'}
    else{document.getElementById('mopen').href=url('r',cat);fr.hidden=false;fr.src=url('embed',cat)}
    modal.hidden=false;document.body.classList.add('mo');
    setTimeout(function(){var f=ENDPOINT?form.querySelector('textarea'):modal.querySelector('.mx');if(f)f.focus()},30)}
  function close(){modal.hidden=true;document.body.classList.remove('mo');fr.removeAttribute('src');if(last&&last.focus)last.focus()}
  /* 연락처 자동 하이픈 */
  var ph=form.querySelector('[name=phone]');
  ph.addEventListener('input',function(){var d=ph.value.replace(/\D/g,'').slice(0,11),o;
    if(d.indexOf('02')===0){o=d.length<=2?d:d.length<=5?d.slice(0,2)+'-'+d.slice(2):d.length<=9?d.slice(0,2)+'-'+d.slice(2,d.length-4)+'-'+d.slice(-4):d.slice(0,2)+'-'+d.slice(2,6)+'-'+d.slice(6)}
    else{o=d.length<=3?d:d.length<=7?d.slice(0,3)+'-'+d.slice(3):d.length<=10?d.slice(0,3)+'-'+d.slice(3,d.length-4)+'-'+d.slice(-4):d.slice(0,3)+'-'+d.slice(3,7)+'-'+d.slice(7)}
    ph.value=o});
  function bad(m,el){err.textContent=m;err.hidden=false;if(el&&el.focus)el.focus()}
  form.addEventListener('submit',function(e){e.preventDefault();
    var f=form.elements,msg=f.message.value.trim(),nm=f.name.value.trim(),tel=f.phone.value.trim(),em=f.email.value.trim();
    if(!msg)return bad('상담 내용을 입력해 주세요.',f.message);
    if(!nm)return bad('성함을 입력해 주세요.',f.name);
    if(!/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(tel))return bad('연락처를 정확히 입력해 주세요. (예: 010-1234-5678)',f.phone);
    if(em&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em))return bad('이메일 형식을 확인해 주세요.',f.email);
    if(!f.consent.checked)return bad('개인정보 수집·이용에 동의해 주세요.',f.consent);
    err.hidden=true;sub.disabled=true;sub.textContent='전송 중…';
    var data={category:f.category.value,message:msg,name:nm,phone:tel,email:em,consent:true,website:f.website.value,page:location.pathname.split('/').pop()};
    var ctl=window.AbortController?new AbortController():null,t=setTimeout(function(){if(ctl)ctl.abort()},20000);
    fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data),signal:ctl?ctl.signal:undefined})
      .then(function(r){return r.json()})
      .then(function(j){clearTimeout(t);if(j&&j.ok){form.hidden=true;done.hidden=false;form.reset();var b=done.querySelector('.sb');if(b)b.focus()}else throw 0})
      .catch(function(){clearTimeout(t);sub.disabled=false;sub.textContent='상담 신청하기';bad('전송에 실패했습니다. 잠시 후 다시 시도하시거나 전화 02-792-3579로 문의해 주세요.')})});
  document.querySelectorAll('[data-apply]').forEach(function(a){a.addEventListener('click',open)});
  modal.addEventListener('click',function(e){if(e.target.hasAttribute('data-close'))close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!modal.hidden)close()});
})();
