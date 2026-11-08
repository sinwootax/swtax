/* 상담 신청서(팝업): Web3Forms로 wetax77@naver.com 전달 */
(function(){
  var W3F_KEY='fa2c2ce3-1f67-400d-8c88-c8a3322038f7';
  var HTML="<div id=\"modal\" class=\"modal\" hidden role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"mt\"><div class=\"mb\" data-close></div><div class=\"mc\"><div class=\"mh\"><strong id=\"mt\">상담 신청</strong><button type=\"button\" class=\"mx\" data-close aria-label=\"닫기\">×</button></div><p class=\"mcat\" id=\"mcat\"></p><div class=\"mf\"><form id=\"aform\" class=\"af\" hidden novalidate autocomplete=\"on\">\n<p class=\"fn\">* 상담 내용에 따라 상담료가 발생할 수 있습니다.<br>* 아래 내용을 남겨주시면 연락드리겠습니다.</p>\n<label>상담 분야<select name=\"category\" id=\"fcat\"><option value=\"\">선택해 주세요</option><option>사업자 세금 관리 및 절세 컨설팅</option><option>부동산/주식 관련 절세 컨설팅</option><option>세무조사 및 조세불복 등 대행</option><option>공익법인 및 비영리 분야 세무</option><option>기타</option></select></label>\n<label>상담 내용 한 줄 요약 <em>(필수)</em><input name=\"summary\" type=\"text\" maxlength=\"100\" required placeholder=\"예) 아파트 양도 시 비과세 가능 여부\"></label>\n<label>자세한 내용 <em>(선택)</em><textarea name=\"message\" rows=\"4\" maxlength=\"2000\" placeholder=\"추가로 알려주실 내용이 있으면 적어 주세요. 주민등록번호, 계좌번호 등 민감한 개인정보는 입력하지 마세요.\"></textarea></label>\n<label>성함 <em>(필수)</em><input name=\"name\" type=\"text\" maxlength=\"40\" required autocomplete=\"name\"></label>\n<label>연락처 <em>(필수)</em><input name=\"phone\" type=\"tel\" inputmode=\"tel\" maxlength=\"30\" required autocomplete=\"tel\" placeholder=\"010-0000-0000\"><small class=\"hint\">해외 번호는 국가번호부터 입력해 주세요. 예) +1 212 555 0123</small></label>\n<label>이메일 <em>(선택)</em><input name=\"email\" type=\"email\" maxlength=\"100\" autocomplete=\"email\"></label>\n<input class=\"hp\" type=\"text\" name=\"website\" tabindex=\"-1\" autocomplete=\"off\" aria-hidden=\"true\">\n<fieldset class=\"cs\"><legend>개인정보 수집·이용 동의 (필수)</legend>\n<div class=\"ct\">신우세무회계사무소는 「개인정보 보호법」에 따라 상담 신청을 위해 아래와 같이 개인정보를 수집·이용합니다.<br><br><b>① 수집·이용 목적</b><br>세무 상담 신청 접수, 상담 일정 안내 및 회신<br><br><b>② 수집 항목</b><br>상담분야, 상담내용, 성함, 연락처, 이메일(선택)<br><br><b>③ 보유 및 이용 기간</b><br>상담 종료 후 1년간 보관하며, 보유 기간이 지나면 지체 없이 파기합니다. 다만 관계 법령에 따라 보존해야 하는 경우에는 해당 기간 동안 보관합니다.<br><br><b>④ 동의 거부 권리 및 불이익</b><br>귀하는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 다만 동의하지 않으실 경우 온라인 상담 신청이 제한됩니다. 이 경우 전화(02-792-3579)로 문의해 주세요.<br><br>※ 상담 내용란에는 주민등록번호, 계좌번호 등 민감한 개인정보를 입력하지 마세요.</div>\n<label class=\"ck\"><input type=\"checkbox\" name=\"consent\" required> 위 개인정보 수집·이용에 동의합니다.</label></fieldset>\n<p class=\"er\" id=\"aerr\" role=\"alert\" hidden></p>\n<button type=\"submit\" class=\"sb\" id=\"asub\">상담 신청하기</button>\n</form>\n<div id=\"adone\" class=\"ad\" hidden><div class=\"ok\">✓</div><h3>상담 신청이 접수되었습니다</h3><p>확인 후 남겨주신 연락처로 연락드리겠습니다.<br>급하신 경우 전화 02-792-3579로 문의해 주세요.</p><button type=\"button\" class=\"sb\" data-close>닫기</button></div>\n</div>\n<p class=\"mfoot\">문의: 전화 <a href=\"tel:027923579\">02-792-3579</a></p></div></div>";
  var wrap=document.createElement('div');wrap.innerHTML=HTML;document.body.appendChild(wrap.firstChild);
  var modal=document.getElementById('modal'),form=document.getElementById('aform'),done=document.getElementById('adone'),err=document.getElementById('aerr'),sub=document.getElementById('asub'),last=null;
  function open(cat){last=document.activeElement;
    cat=cat||document.body.getAttribute('data-cat')||'';
    document.getElementById('mcat').textContent=cat?'상담 분야: '+cat:'상담 내용을 남겨 주시면 확인 후 연락드립니다.';
    done.hidden=true;form.hidden=false;err.hidden=true;sub.disabled=false;sub.textContent='상담 신청하기';
    form.querySelector('#fcat').value=cat;
    modal.hidden=false;document.body.classList.add('mo');
    setTimeout(function(){var f=cat?form.querySelector('[name=summary]'):form.querySelector('#fcat');if(f)f.focus()},30)}
  function close(){modal.hidden=true;document.body.classList.remove('mo');if(last&&last.focus)last.focus()}
  var ph=form.querySelector('[name=phone]');
  ph.addEventListener('input',function(){var v=ph.value;
    if(/^\s*\+/.test(v)){ph.value='+'+v.replace(/[^\d\s\-().]/g,'').replace(/^\s+/,'').slice(0,24);return}
    var d=v.replace(/\D/g,'').slice(0,11),o;
    if(d.indexOf('02')===0){o=d.length<=2?d:d.length<=5?d.slice(0,2)+'-'+d.slice(2):d.length<=9?d.slice(0,2)+'-'+d.slice(2,d.length-4)+'-'+d.slice(-4):d.slice(0,2)+'-'+d.slice(2,6)+'-'+d.slice(6)}
    else{o=d.length<=3?d:d.length<=7?d.slice(0,3)+'-'+d.slice(3):d.length<=10?d.slice(0,3)+'-'+d.slice(3,d.length-4)+'-'+d.slice(-4):d.slice(0,3)+'-'+d.slice(3,7)+'-'+d.slice(7)}
    ph.value=o});
  function bad(m,el){err.textContent=m;err.hidden=false;if(el&&el.focus)el.focus()}
  form.addEventListener('submit',function(e){e.preventDefault();
    var f=form.elements,msg=f.message.value.trim(),sm=f.summary.value.trim(),nm=f.name.value.trim(),tel=f.phone.value.trim(),em=f.email.value.trim(),cat=f.category.value;
    if(!cat)return bad('상담 분야를 선택해 주세요.',f.category);
    if(!sm)return bad('상담 내용을 한 줄로 간단히 적어 주세요.',f.summary);
    if(!nm)return bad('성함을 입력해 주세요.',f.name);
    var dg=tel.replace(/\D/g,'');if(tel.charAt(0)==='+'?(dg.length<8||dg.length>15):!/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(tel))return bad('연락처를 정확히 입력해 주세요. (국내 예: 010-1234-5678 / 해외 예: +1 212 555 0123)',f.phone);
    if(em&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em))return bad('이메일 형식을 확인해 주세요.',f.email);
    if(!f.consent.checked)return bad('개인정보 수집·이용에 동의해 주세요.',f.consent);
    err.hidden=true;sub.disabled=true;sub.textContent='전송 중…';
    var when=new Date().toLocaleString('ko-KR',{timeZone:'Asia/Seoul'});
    var data={access_key:W3F_KEY,subject:'[홈페이지 상담신청] '+cat+' - '+nm+' ('+sm+')',from_name:'신우세무회계사무소 홈페이지',
      '상담 분야':cat,'성함':nm,'연락처':tel,'한 줄 요약':sm,'자세한 내용':msg||'(입력 없음)','신청자 이메일':em||'(입력 없음)','개인정보 수집·이용 동의':'동의함','접수 시각':when,'신청 페이지':location.pathname.split('/').pop()||'index.html',botcheck:f.website.value};
    if(em)data.email=em;
    var ctl=window.AbortController?new AbortController():null,t=setTimeout(function(){if(ctl)ctl.abort()},20000);
    fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data),signal:ctl?ctl.signal:undefined})
      .then(function(r){return r.json()})
      .then(function(j){clearTimeout(t);if(j&&j.success){form.hidden=true;done.hidden=false;form.reset();var b=done.querySelector('.sb');if(b)b.focus()}else throw 0})
      .catch(function(){clearTimeout(t);sub.disabled=false;sub.textContent='상담 신청하기';bad('전송에 실패했습니다. 잠시 후 다시 시도하시거나 전화 02-792-3579로 문의해 주세요.')})});
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-apply]');
    if(a){e.preventDefault();open(a.getAttribute('data-apply'));return}
    if(e.target.hasAttribute&&e.target.hasAttribute('data-close'))close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!modal.hidden)close()});
})();
