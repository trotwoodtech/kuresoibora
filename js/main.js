(function(){
  var C = window.KBI || {};
  document.documentElement.classList.add('js');

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle'), menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    menu.addEventListener('click', function(e){ if (e.target.tagName === 'A') { menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); } });
  }

  /* Year + contact details from config */
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-kbi]').forEach(function(el){
    var key = el.getAttribute('data-kbi'), val = C[key];
    if (!val) { el.hidden = true; return; }
    if (key === 'email') { el.href = 'mailto:' + val; el.textContent = val; }
    else if (key === 'phone') { el.href = 'tel:' + val.replace(/\s+/g,''); el.textContent = val; }
    else if (key === 'whatsappNumber') { el.href = 'https://wa.me/' + val; }
    else { el.href = val; }
  });
  document.querySelectorAll('[data-hide-if-empty]').forEach(function(el){
    var keys = el.getAttribute('data-hide-if-empty').split(',');
    var any = keys.some(function(k){ return C[k.trim()]; });
    if (!any) el.hidden = true;
  });

  /* Plan tabs (all panels stay visible without JavaScript) */
  var tabs = document.querySelectorAll('.tab'), panels = document.querySelectorAll('.panel');
  function show(id, focus){
    tabs.forEach(function(t){ t.setAttribute('aria-selected', t.getAttribute('aria-controls') === id); t.tabIndex = t.getAttribute('aria-controls') === id ? 0 : -1; });
    panels.forEach(function(p){ p.hidden = p.id !== id; });
  }
  if (tabs.length) {
    tabs.forEach(function(t, i){
      t.addEventListener('click', function(){ show(t.getAttribute('aria-controls')); });
      t.addEventListener('keydown', function(e){
        var n = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = tabs[(i+1) % tabs.length];
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = tabs[(i-1+tabs.length) % tabs.length];
        if (n) { e.preventDefault(); n.focus(); show(n.getAttribute('aria-controls')); }
      });
    });
    var start = location.hash && document.querySelector('.panel' + location.hash) ? location.hash.slice(1) : tabs[0].getAttribute('aria-controls');
    show(start);
  }

  /* Priority picker -> contact page */
  var picker = document.getElementById('picker');
  if (picker) picker.addEventListener('submit', function(e){
    e.preventDefault();
    var w = picker.querySelector('input[name=ward]:checked'), t = picker.querySelector('input[name=topic]:checked');
    var q = new URLSearchParams(); if (w) q.set('ward', w.value); if (t) q.set('topic', t.value); q.set('type','Feedback');
    location.href = 'contact.html?' + q.toString() + '#form';
  });

  /* Gallery */
  var grid = document.getElementById('gallery-grid');
  if (grid) {
    var items = window.KBI_GALLERY || [], active = 'All';
    var lb = document.getElementById('lightbox'), lbBody = document.getElementById('lb-body');
    function render(){
      grid.innerHTML = '';
      var list = items.filter(function(i){ return active === 'All' || i.category === active; });
      if (!list.length) { grid.outerHTML = '<div class="empty" id="gallery-grid"><p>No photos in this category yet. Check back soon.</p></div>'; grid = document.getElementById('gallery-grid'); return; }
      list.forEach(function(it){
        var f = document.createElement('figure'); f.className = 'tile';
        var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Enlarge: ' + it.caption);
        if (it.placeholder || !it.src) { var d = document.createElement('div'); d.className = 'ph ' + it.category; d.textContent = 'Photo coming soon'; b.appendChild(d); }
        else { var im = document.createElement('img'); im.src = it.src; im.alt = it.caption; im.loading = 'lazy'; b.appendChild(im); }
        b.addEventListener('click', function(){ open(it); });
        var c = document.createElement('figcaption'); var cat = document.createElement('b'); cat.textContent = it.category + (it.date ? ' · ' + it.date : ''); c.appendChild(cat); c.appendChild(document.createTextNode(it.caption));
        f.appendChild(b); f.appendChild(c); grid.appendChild(f);
      });
    }
    function open(it){
      lbBody.innerHTML = '';
      if (it.placeholder || !it.src) { var d = document.createElement('div'); d.className = 'ph ' + it.category; d.textContent = 'Photo coming soon'; lbBody.appendChild(d); }
      else { var im = document.createElement('img'); im.src = it.src; im.alt = it.caption; lbBody.appendChild(im); }
      var cp = document.createElement('figcaption'); cp.textContent = it.caption; lbBody.appendChild(cp);
      lb.classList.add('open'); lb.querySelector('button').focus();
    }
    function close(){ lb.classList.remove('open'); }
    lb.querySelector('button').addEventListener('click', close);
    lb.addEventListener('click', function(e){ if (e.target === lb) close(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
    document.querySelectorAll('.filters button').forEach(function(b){
      b.addEventListener('click', function(){
        active = b.getAttribute('data-cat');
        document.querySelectorAll('.filters button').forEach(function(x){ x.setAttribute('aria-pressed', x === b); });
        render();
      });
    });
    render();

    var ev = document.getElementById('events-list');
    (window.KBI_EVENTS || []).forEach(function(e){
      var a = document.createElement('article'); a.className = 'event';
      var t = document.createElement('time'); t.textContent = e.date;
      var m = document.createElement('div'); var h = document.createElement('h3'); h.textContent = e.title; var p = document.createElement('p'); p.textContent = e.place + (e.note ? '. ' + e.note : '');
      m.appendChild(h); m.appendChild(p);
      var s = document.createElement('span'); s.className = 'status ' + e.status.split(' ')[0]; s.textContent = e.status;
      a.appendChild(t); a.appendChild(m); a.appendChild(s); ev.appendChild(a);
    });
  }

  /* Contact form */
  var form = document.getElementById('contact-form');
  if (form) {
    var params = new URLSearchParams(location.search);
    ['ward','topic','type'].forEach(function(k){
      var v = params.get(k); if (!v) return;
      var el = form.elements[k];
      if (!el) return;
      if (el.length && el[0] && el[0].type === 'radio') { Array.prototype.forEach.call(el, function(r){ r.checked = (r.value === v); }); }
      else el.value = v;
    });
    var msg = document.getElementById('form-status');
    function say(text, cls){ msg.className = 'status-msg ' + cls; msg.textContent = text; }
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (form.elements['company'].value) return; /* honeypot */
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = {}; new FormData(form).forEach(function(v,k){ if (k !== 'company') data[k] = v; });
      if (C.formEndpoint) {
        say('Sending your message...', 'ok');
        fetch(C.formEndpoint, { method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body: JSON.stringify(data) })
          .then(function(r){ if (!r.ok) throw new Error(); form.reset(); say('Thank you. Your message has been received. If you left a phone number or email, we will get back to you.', 'ok'); })
          .catch(function(){ say('Your message could not be sent. Please try again, or email us directly' + (C.email ? ' at ' + C.email : '') + '.', 'err'); });
      } else if (C.email) {
        var body = 'Name: ' + data.name + '\nContact: ' + (data.contact || '') + '\nWard: ' + (data.ward || '') + '\nTopic: ' + (data.topic || '') + '\nType: ' + (data.type || '') + '\n\n' + data.message;
        location.href = 'mailto:' + C.email + '?subject=' + encodeURIComponent('[' + (data.type || 'Message') + '] from ' + data.name) + '&body=' + encodeURIComponent(body);
        say('Your email app should now open with your message ready to send. If it does not, write to ' + C.email + '.', 'ok');
      } else { say('The contact form is not connected yet. Please check back soon.', 'err'); }
    });
  }
})();
