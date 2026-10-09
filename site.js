(function(){
  var b=document.querySelector('.menu-btn'),n=document.querySelector('nav');
  if(b)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  var t=document.querySelector('.totop');
  if(t){addEventListener('scroll',function(){t.classList.toggle('show',scrollY>500)},{passive:true});
    t.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});}
  var f=document.getElementById('contact-form');
  if(f)f.addEventListener('submit',function(e){
    e.preventDefault();
    var m=document.getElementById('form-msg'),btn=f.querySelector('button'),d=new FormData(f);
    if(d.get('_honey'))return;
    btn.disabled=true;m.textContent='Sending…';
    fetch(f.dataset.endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify({name:(d.get('first')+' '+d.get('last')).trim(),email:d.get('email'),message:d.get('message'),
      _subject:f.dataset.subject||'New message from sailpro.com.cy',_template:'table',_captcha:'false'})})
    .then(function(r){return r.json()})
    .then(function(j){
      if(j.success===true||j.success==='true'){m.textContent='Thank you! Your message has been sent.';f.reset();}
      else{throw new Error(j.message||'failed')}
    }).catch(function(err){var t=String(err&&err.message||'');m.textContent=/activat/i.test(t)?'Almost ready: the form needs a one-time activation by the site owner (email sent). Please try again shortly, or email sailpro.cy@gmail.com / WhatsApp +357 96774178.':'Sorry, something went wrong. Please email sailpro.cy@gmail.com or WhatsApp +357 96774178.'})
    .finally(function(){btn.disabled=false});
  });
  var v=document.getElementById('interview'),sb=document.getElementById('sound-btn');
  if(v){
    var visible=false,userPaused=false,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    function sync(){sb.hidden=!v.muted}
    v.addEventListener('volumechange',sync);sync();
    sb.addEventListener('click',function(){v.muted=false;v.currentTime=0;userPaused=false;v.play().catch(function(){})});
    v.addEventListener('pause',function(){if(visible&&!v.ended)userPaused=true});
    v.addEventListener('play',function(){userPaused=false});
    if('IntersectionObserver' in window&&!reduce){
      new IntersectionObserver(function(es){
        visible=es[0].isIntersecting;
        if(visible){if(!v.ended&&!userPaused)v.play().catch(function(){})}
        else if(!v.paused){v.pause();userPaused=false}
      },{threshold:.6}).observe(v);
    }
  }
})();
