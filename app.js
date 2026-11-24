(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const menu = load('btk_menu', window.MENU_DEFAULT);
const cfg = Object.assign({}, window.CONFIG_DEFAULT, load('btk_config', {}));
let lang = load('btk_lang', 'ar'), cart = load('btk_cart', []), mode = 'delivery', code = '', draft = {};

const T = {
 ar: { nav_menu:'المنيو', nav_about:'عنّا', nav_contact:'تواصل معانا', order_now:'اطلب دلوقتي', cats:'أقسام المنيو', featured:'بوكسات واختراعات', search:'ابحث في المنيو...',
  hero_h:'كل حاجة حلوة، في مكان واحد', hero_p:'عصائر فريش، ميلك شيك، وافل، ديزرت وأكتر. اختار طلبك وابعته على واتساب في دقيقة.',
  about_t:'عن بطيخة', about_p:'Good Coffee, Better Mood. عصائر فريش وديزرت وقهوة في مكان واحد.', hours_t:'مواعيد العمل', contact_t:'تواصل معانا', foot:'بطيخة – Fresh Juice & Desert',
  view_cart:'عرض السلة', cart:'السلة', add:'أضف للسلة', update:'تحديث', size:'الحجم', extras:'إضافات', qty:'الكمية', note:'ملاحظات خاصة (اختياري)', unavailable:'غير متاح حاليًا', from:'يبدأ من',
  added:'تمت الإضافة', empty:'السلة فاضية', remove:'حذف', edit:'تعديل', coupon:'كود الخصم', apply:'تطبيق', bad_code:'الكود غير صحيح', subtotal:'المجموع', discount:'الخصم', fee:'رسوم التوصيل', total:'الإجمالي',
  fee_unknown:'تُحدد عند التأكيد', checkout:'إتمام الطلب', delivery:'توصيل', pickup:'استلام', name:'الاسم بالكامل', phone:'رقم الموبايل', area:'المنطقة / المدينة (اكتبها)', address:'العنوان بالتفصيل', building:'رقم العمارة',
  apt:'رقم الشقة (اختياري)', instr:'تعليمات التوصيل (اختياري)', notes:'ملاحظات على الطلب (اختياري)', geo:'مشاركة موقعي على الخريطة', geo_ok:'تم إضافة موقعك', req:'بيانات ناقصة أو غير صحيحة', min:'الحد الأدنى للطلب', send:'أرسل الطلب على واتساب',
  wa_note:'هتتفتح واتساب برسالة جاهزة. اضغط «إرسال» هناك. الطلب لا يُعتبر مؤكدًا إلا بعد استلام المطعم له وتأكيده عليك.', no_match:'مفيش نتائج', close:'إغلاق', open:'مفتوح الآن', closed:'مغلق الآن', min_order_msg:'الحد الأدنى للطلب', e_name:'اكتب اسمك', e_phone:'رقم موبايل مصري صحيح (مثال 01012345678)', e_field:'مطلوب', phone_l:'تليفون', addr_l:'العنوان', sent:'تم فتح واتساب. لم يُؤكد الطلب بعد حتى يستلمه المطعم.' },
 en: { nav_menu:'Menu', nav_about:'About', nav_contact:'Contact', order_now:'Order now', cats:'Categories', featured:'Boxes & Inventions', search:'Search the menu...',
  hero_h:'Everything sweet, in one place', hero_p:'Fresh juice, milkshakes, waffles, desserts and more. Pick your order and send it on WhatsApp in a minute.',
  about_t:'About Batekha', about_p:'Good Coffee, Better Mood. Fresh juice, desserts and coffee in one place.', hours_t:'Opening hours', contact_t:'Contact', foot:'Batekha – Fresh Juice & Desert',
  view_cart:'View cart', cart:'Cart', add:'Add to cart', update:'Update', size:'Size', extras:'Extras', qty:'Quantity', note:'Special instructions (optional)', unavailable:'Currently unavailable', from:'From',
  added:'Added', empty:'Your cart is empty', remove:'Remove', edit:'Edit', coupon:'Discount code', apply:'Apply', bad_code:'Invalid code', subtotal:'Subtotal', discount:'Discount', fee:'Delivery fee', total:'Total',
  fee_unknown:'Confirmed on WhatsApp', checkout:'Checkout', delivery:'Delivery', pickup:'Pickup', name:'Full name', phone:'Phone number', area:'City / Area (type it)', address:'Detailed address', building:'Building number',
  apt:'Apartment (optional)', instr:'Delivery instructions (optional)', notes:'Order notes (optional)', geo:'Share my map location', geo_ok:'Location added', req:'Some fields are missing or invalid', min:'Minimum order', send:'Send order on WhatsApp',
  wa_note:'WhatsApp will open with your order ready. Press “Send” there. The order is NOT confirmed until the restaurant receives and confirms it.', no_match:'No results', close:'Close', open:'Open now', closed:'Closed now', min_order_msg:'Minimum order', e_name:'Enter your name', e_phone:'Valid Egyptian mobile (e.g. 01012345678)', e_field:'Required', phone_l:'Phone', addr_l:'Address', sent:'WhatsApp opened. The order is not confirmed until the restaurant receives it.' }
};
const t = k => T[lang][k] ?? k;
const cur = () => lang === 'ar' ? cfg.currencyAr : cfg.currencyEn;
const nm = o => lang === 'en' && o.en ? o.en : o.ar;
const money = n => `${n} ${cur()}`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

const { ic, iconFor, CAT } = window.ICONS;
const minPrice = i => i.sizes ? Math.min(...i.sizes.map(s => s.price)) : i.price;

function applyLang() {
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $('#langBtn').textContent = lang === 'ar' ? 'EN' : 'ع';
  $$('[data-i]').forEach(e => e.textContent = t(e.dataset.i));
  $$('[data-i-ph]').forEach(e => e.placeholder = t(e.dataset.iPh));
  $$('[data-i-aria]').forEach(e => e.setAttribute('aria-label', t(e.dataset.iAria)));
  const h = cfg.hours; $('#hours').textContent = lang === 'ar' ? h.ar : h.en;
  const hr = new Date().getHours(), open = h.close < h.open ? (hr >= h.open || hr < h.close) : (hr >= h.open && hr < h.close);
  $('#openState').textContent = open ? t('open') : t('closed');
  const cb = [];
  if (cfg.phone) cb.push(`<p>${t('phone_l')}: <a href="tel:${esc(cfg.phone)}">${esc(cfg.phone)}</a></p>`);
  cb.push(`<p>WhatsApp: <a href="https://wa.me/${cfg.whatsapp}" target="_blank" rel="noopener">+${cfg.whatsapp.replace(/^(\d{2})(\d{2})(\d+)/, '$1 $2 $3')}</a></p>`);
  if (cfg.address) cb.push(`<p>${t('addr_l')}: ${esc(cfg.address)}${cfg.mapUrl ? ` · <a href="${esc(cfg.mapUrl)}" target="_blank" rel="noopener">Google Maps</a>` : ''}</p>`);
  [['instagram','Instagram'],['facebook','Facebook'],['tiktok','TikTok']].forEach(([k, n]) => cfg[k] && cb.push(`<p><a href="${esc(cfg[k])}" target="_blank" rel="noopener">${n}</a></p>`));
  $('#contactBody').innerHTML = cb.join('');
  renderChips(); renderMenu(); renderFeatured(); renderCartUi();
}

function chipHtml(c) { return `<button class="chip" data-cat="${c.id}">${ic(CAT[c.id] || 'spark')}${esc(nm(c))}</button>`; }
function renderChips() {
  const h = menu.categories.map(chipHtml).join('');
  $('#homeChips').innerHTML = h; $('#chips').innerHTML = h;
  $$('[data-cat]').forEach(b => b.onclick = () => { const el = $('#cat-' + b.dataset.cat); $('#q').value = ''; if (!el) { renderMenu(); } ($('#cat-' + b.dataset.cat) || $('#menu')).scrollIntoView({ behavior: 'smooth' }); $$('#chips .chip').forEach(x => x.classList.toggle('on', x.dataset.cat === b.dataset.cat)); });
}
const selSize = {};
function card(i, c) {
  const k = selSize[i.id] ?? 0, sz = i.sizes ? i.sizes[k] : null, p = sz ? sz.price : i.price;
  return `<div class="it ${i.available ? '' : 'off'}" data-id="${i.id}">
   <div class="tp"><b class="n">${esc(nm(i))}</b><span class="p">${i.available ? money(p) : ''}</span></div>
   ${i.contents ? `<span class="ct">${esc(i.contents)}</span>` : ''}
   <div class="ac">${i.sizes ? `<div class="sizes" role="radiogroup">${i.sizes.map((s, j) => `<button class="pill ${j === k ? 'on' : ''}" role="radio" aria-checked="${j === k}" data-sz="${j}">${esc(nm(s))}</button>`).join('')}</div>` : ''}
   <button class="btn add" data-add ${i.available ? '' : 'disabled'}>${i.available ? '＋ ' + t('add') : t('unavailable')}</button></div></div>`;
}
function onList(e) {
  const root = e.target.closest('.it'); if (!root) return;
  const f = BTK.findItem(menu, root.dataset.id); if (!f) return;
  const pill = e.target.closest('[data-sz]');
  if (pill) { selSize[f.item.id] = +pill.dataset.sz; root.outerHTML = card(f.item, f.cat); return; }
  if (e.target.closest('[data-add]')) {
    const size = f.item.sizes ? (selSize[f.item.id] ?? 0) : null;
    const same = cart.find(l => l.itemId === f.item.id && l.size === size && !(l.extras || []).length && !l.note);
    same ? same.qty++ : cart.push({ id: 'l' + Date.now() + Math.random().toString(36).slice(2, 5), itemId: f.item.id, size, extras: [], qty: 1, note: '' });
    save('btk_cart', cart); renderCartUi();
    const cb = $('#cartBtn'); cb.classList.remove('bump'); void cb.offsetWidth; cb.classList.add('bump');
    const btn = e.target.closest('[data-add]'); btn.textContent = '✓ ' + t('added'); setTimeout(() => { if (btn.isConnected) btn.textContent = '＋ ' + t('add'); }, 1200);
  }
}
function renderMenu() {
  const q = $('#q').value.trim().toLowerCase(); let n = 0;
  const html = menu.categories.map(c => {
    const items = c.items.filter(i => !q || [i.ar, i.en, i.contents, c.ar, c.en].some(s => s && s.toLowerCase().includes(q)));
    n += items.length;
    return items.length ? `<div class="cat reveal in" id="cat-${c.id}"><h3>${ic(CAT[c.id] || 'spark')}${esc(nm(c))}</h3><div class="list">${items.map(i => card(i, c)).join('')}</div></div>` : '';
  }).join('');
  $('#menuBody').innerHTML = html || `<p class="empty">${t('no_match')}</p>`;
}
function renderFeatured() {
  const items = ['boxes', 'inventions'].flatMap(id => { const c = menu.categories.find(x => x.id === id); return c ? c.items.map(i => ({ i, c })) : []; });
  $('#featGrid').innerHTML = items.map(({ i, c }) => card(i, c)).join('');
}

const ov = $('#ov'), sheet = $('#sheet');
function show(html) { sheet.innerHTML = `<button class="iconbtn x" aria-label="${t('close')}">✕</button>` + html; sheet.classList.add('on'); ov.classList.add('on'); $('.x', sheet).onclick = hide; sheet.focus?.(); }
function hide() { sheet.classList.remove('on'); ov.classList.remove('on'); }
ov.onclick = hide; document.addEventListener('keydown', e => e.key === 'Escape' && hide());

function openItem(id, preset) {
  const f = BTK.findItem(menu, id); if (!f) return; const { item, cat } = f;
  const st = Object.assign({ size: item.sizes ? 0 : null, extras: [], qty: 1, note: '' }, preset || {});
  const price = () => BTK.lineInfo(menu, { itemId: id, size: st.size, extras: st.extras, qty: st.qty }).total;
  show(`<div class="card" style="border:0;box-shadow:none"><div class="ph" style="border-radius:18px;aspect-ratio:16/9">${ic(iconFor(item, cat))}</div></div>
   <h3 style="margin-top:10px">${esc(nm(item))}</h3>${item.contents ? `<p class="ct" style="color:var(--mute)">${esc(item.contents)}</p>` : ''}
   ${item.sizes ? `<b>${t('size')}</b><div class="opt" id="sizes">${item.sizes.map((s, k) => `<label><span><input type="radio" name="sz" value="${k}" ${k === st.size ? 'checked' : ''}> ${esc(nm(s))}</span><b>${money(s.price)}</b></label>`).join('')}</div>` : `<p style="font-weight:800;color:var(--mag)">${money(item.price)}</p>`}
   ${menu.extras.length?`<b>${t('extras')}</b>`:''}<div class="opt" id="exs">${menu.extras.map(e => `<label><span><input type="checkbox" value="${e.id}" ${st.extras.includes(e.id) ? 'checked' : ''}> ${esc(nm(e))}</span><b>+${e.price}</b></label>`).join('')}</div>
   <label class="f" style="margin:0"><span>${t('note')}</span><textarea id="inote" rows="2">${esc(st.note)}</textarea></label>
   <div class="row" style="margin-top:14px"><div class="qty"><button id="qm" aria-label="-">−</button><b id="qv">${st.qty}</b><button id="qp" aria-label="+">+</button></div>
   <button class="btn" id="addBtn" style="flex:1" ${item.available ? '' : 'disabled'}>${item.available ? (preset?.lineId ? t('update') : t('add')) + ' · <span id="ap"></span>' : t('unavailable')}</button></div>`);
  const upd = () => { st.qty = Math.max(1, st.qty); $('#qv').textContent = st.qty; const a = $('#ap'); if (a) a.textContent = money(price()); };
  $$('input[name=sz]', sheet).forEach(r => r.onchange = () => { st.size = +r.value; upd(); });
  $$('#exs input', sheet).forEach(c => c.onchange = () => { st.extras = $$('#exs input:checked', sheet).map(x => x.value); upd(); });
  $('#qm').onclick = () => { st.qty--; upd(); }; $('#qp').onclick = () => { st.qty++; upd(); };
  $('#addBtn').onclick = () => {
    st.note = $('#inote').value;
    const line = { id: preset?.lineId || 'l' + Date.now() + Math.random().toString(36).slice(2, 5), itemId: id, size: st.size, extras: st.extras, qty: st.qty, note: st.note };
    const k = cart.findIndex(l => l.id === line.id); k >= 0 ? cart[k] = line : cart.push(line);
    save('btk_cart', cart); renderCartUi(); $('#cartBtn').classList.remove('bump'); void $('#cartBtn').offsetWidth; $('#cartBtn').classList.add('bump'); hide();
  };
  upd();
}

function cartCalc() { return BTK.calc(menu, cfg, cart, mode, code); }
function renderCartUi() {
  cart = cart.filter(l => BTK.findItem(menu, l.itemId)); const n = cart.reduce((s, l) => s + l.qty, 0);
  const b = $('#badge'); b.hidden = !n; b.textContent = n;
  $('#fab').classList.toggle('show', n > 0); $('#fabTotal').textContent = money(cartCalc().subtotal);
}
$('#cartBtn').onclick = openCart; $('#fabBtn').onclick = openCart;
function openCart() {
  if (!cart.length) return show(`<h3>${t('cart')}</h3><p class="empty">${t('empty')}</p>`);
  const c = cartCalc();
  show(`<h3>${t('cart')}</h3>${cart.map(l => { const i = BTK.lineInfo(menu, l); return `<div class="line"><div class="row"><b>${esc(nm(i.item))}${i.size ? ` (${esc(nm(i.size))})` : ''}</b><b>${money(i.total)}</b></div>
   ${i.extras.length ? `<small>+ ${i.extras.map(e => esc(nm(e))).join('، ')}</small>` : ''}${l.note ? `<small>“${esc(l.note)}”</small>` : ''}
   <div class="row" style="margin-top:6px"><div class="qty"><button data-q="-1" data-l="${l.id}">−</button><b>${l.qty}</b><button data-q="1" data-l="${l.id}">+</button></div>
   <span><button class="btn ghost" style="min-height:40px;padding:0 14px" data-e="${l.id}">${t('edit')}</button> <button class="btn ghost" style="min-height:40px;padding:0 14px" data-r="${l.id}">${t('remove')}</button></span></div></div>`; }).join('')}
   <div class="row f" style="grid-template-columns:1fr auto;margin-top:12px"><input id="cc" placeholder="${t('coupon')}" value="${esc(code)}" aria-label="${t('coupon')}"><button class="btn ghost" id="ca">${t('apply')}</button></div><div class="err" id="ce" style="color:#c0123c;font-size:13px"></div>
   <div class="tot">${totals(c)}</div>
   <button class="btn" id="go" style="width:100%;margin-top:12px">${t('checkout')}</button>`);
  $$('[data-q]', sheet).forEach(b => b.onclick = () => { const l = cart.find(x => x.id === b.dataset.l); l.qty += +b.dataset.q; if (l.qty < 1) cart = cart.filter(x => x !== l); save('btk_cart', cart); renderCartUi(); cart.length ? openCart() : hide(); });
  $$('[data-r]', sheet).forEach(b => b.onclick = () => { cart = cart.filter(x => x.id !== b.dataset.r); save('btk_cart', cart); renderCartUi(); cart.length ? openCart() : hide(); });
  $$('[data-e]', sheet).forEach(b => b.onclick = () => { const l = cart.find(x => x.id === b.dataset.e); openItem(l.itemId, { size: l.size, extras: l.extras, qty: l.qty, note: l.note, lineId: l.id }); });
  $('#ca').onclick = () => { code = $('#cc').value.trim(); const ok = !code || cartCalc().applied; if (!ok) { $('#ce').textContent = t('bad_code'); code = ''; $('.tot', sheet).innerHTML = totals(cartCalc()); } else openCart(); };
  $('#go').onclick = openCheckout;
}
function totals(c) {
  return `<div><span>${t('subtotal')}</span><span>${money(c.subtotal)}</span></div>${c.discount ? `<div><span>${t('discount')}</span><span>-${money(c.discount)}</span></div>` : ''}
  ${mode === 'delivery' ? `<div><span>${t('fee')}</span><span>${c.feeUnknown ? t('fee_unknown') : money(c.fee)}</span></div>` : ''}<div class="g"><span>${t('total')}</span><span>${money(c.total)}</span></div>`;
}
function openCheckout() {
  const d = draft, f = (k, l, ex = '') => `<label>${l}<input id="f_${k}" value="${esc(d[k] || '')}" ${ex}><span class="err" id="e_${k}" hidden></span></label>`;
  const c = cartCalc();
  show(`<h3>${t('checkout')}</h3><div class="seg" style="margin-top:10px"><button class="btn ${mode === 'delivery' ? '' : 'ghost'}" data-m="delivery">${t('delivery')}</button><button class="btn ${mode === 'pickup' ? '' : 'ghost'}" data-m="pickup">${t('pickup')}</button></div>
   <form class="f" id="form" novalidate>${f('name', t('name'), 'autocomplete="name"')}${f('phone', t('phone'), 'type="tel" inputmode="tel" autocomplete="tel"')}
   <div id="dl" ${mode === 'pickup' ? 'hidden' : ''} class="f">${f('area', t('area'))}${f('address', t('address'))}${f('building', t('building'))}${f('apt', t('apt'))}${f('instr', t('instr'))}
   <button type="button" class="btn ghost" id="geo">${t('geo')}</button></div>
   <label>${t('notes')}<textarea id="f_notes" rows="2">${esc(d.notes || '')}</textarea></label></form>
   <div class="tot">${totals(c)}</div>${!c.minOk ? `<p class="err" style="color:#c0123c;font-weight:700">${t('min_order_msg')}: ${money(cfg.minOrder)}</p>` : ''}
   <p class="note">${t('wa_note')}</p><button class="btn" id="send" style="width:100%" ${c.minOk ? '' : 'disabled'}>${t('send')}</button><p class="note" id="sent" hidden>${t('sent')}</p>`);
  const read = () => { ['name','phone','area','address','building','apt','instr','notes'].forEach(k => d[k] = ($('#f_' + k) || {}).value || ''); };
  $$('[data-m]', sheet).forEach(b => b.onclick = () => { read(); mode = b.dataset.m; openCheckout(); });
  $('#geo').onclick = () => navigator.geolocation?.getCurrentPosition(p => { d.geo = `https://maps.google.com/?q=${p.coords.latitude},${p.coords.longitude}`; $('#geo').textContent = '✓ ' + t('geo_ok'); }, () => {});
  $('#send').onclick = () => {
    read(); const fd = { ...d, mode }, errs = BTK.validate(fd);
    ['name','phone','area','address','building'].forEach(k => { const e = $('#e_' + k), i = $('#f_' + k); if (!e) return; const bad = errs[k]; e.hidden = !bad; e.textContent = k === 'name' ? t('e_name') : k === 'phone' ? t('e_phone') : t('e_field'); i.classList.toggle('bad', !!bad); i.setAttribute('aria-invalid', !!bad); });
    if (Object.keys(errs).length) return $('#' + 'f_' + Object.keys(errs)[0]).focus();
    const c2 = cartCalc(), ref = BTK.orderRef(), msg = BTK.buildMessage({ ref, f: fd, cart, menu, cfg, c: c2 });
    window.open(BTK.waUrl(cfg.whatsapp, msg), '_blank', 'noopener'); $('#sent').hidden = false;
  };
}

$('#menuBody').addEventListener('click', onList); $('#featGrid').addEventListener('click', onList);
$('#langBtn').onclick = () => { lang = lang === 'ar' ? 'en' : 'ar'; save('btk_lang', lang); applyLang(); };
$('#q').oninput = renderMenu;
if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target)))); $$('.reveal').forEach(e => io.observe(e)); } else $$('.reveal').forEach(e => e.classList.add('in'));
$$('[data-ico]').forEach(e => e.innerHTML = ic(e.dataset.ico));
applyLang();
window.__btk = { cfg, menu, get cart() { return cart; } };
})();
