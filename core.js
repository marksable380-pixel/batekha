// Pure ordering logic (no DOM) – used by the site and unit-tested in Node.
(function (g) {
  const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
  const latin = s => String(s).replace(/[٠-٩]/g, d => AR_DIGITS.indexOf(d));
  const findItem = (menu, id) => { for (const c of menu.categories) for (const i of c.items) if (i.id === id) return { item: i, cat: c }; return null; };
  const sizeOf = (item, idx) => item.sizes ? item.sizes[idx == null ? 0 : idx] : null;

  function lineInfo(menu, l) {
    const f = findItem(menu, l.itemId); if (!f) return null;
    const sz = sizeOf(f.item, l.size);
    const base = sz ? sz.price : f.item.price;
    const ex = (l.extras || []).map(id => menu.extras.find(e => e.id === id)).filter(Boolean);
    const unit = base + ex.reduce((s, e) => s + e.price, 0);
    return { item: f.item, size: sz, extras: ex, unit, total: unit * l.qty };
  }

  function calc(menu, cfg, cart, mode, code) {
    const subtotal = cart.reduce((s, l) => { const i = lineInfo(menu, l); return s + (i ? i.total : 0); }, 0);
    let discount = 0, applied = null;
    const d = code && (cfg.discounts || []).find(x => x.code.toLowerCase() === code.trim().toLowerCase());
    if (d) { applied = d; discount = Math.min(subtotal, d.type === 'percent' ? Math.round(subtotal * d.value / 100) : d.value); }
    const fee = mode === 'delivery' ? (cfg.deliveryFee == null ? null : cfg.deliveryFee) : 0;
    const total = subtotal - discount + (fee || 0);
    const minOk = !cfg.minOrder || subtotal - discount >= cfg.minOrder;
    return { subtotal, discount, applied, fee, feeUnknown: fee === null, total, minOk };
  }

  function validate(f) {
    const e = {};
    if (!f.name || f.name.trim().length < 2) e.name = 1;
    if (!/^(\+?20|0)?1[0125]\d{8}$/.test(latin(f.phone || '').replace(/[\s-]/g, ''))) e.phone = 1;
    if (f.mode === 'delivery') {
      if (!f.area || !f.area.trim()) e.area = 1;
      if (!f.address || f.address.trim().length < 5) e.address = 1;
      if (!f.building || !f.building.trim()) e.building = 1;
    }
    return e;
  }

  function orderRef(now = new Date(), rnd = Math.random) {
    const p = n => String(n).padStart(2, '0');
    const code = Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(rnd() * 32)]).join('');
    return `BTK-${String(now.getFullYear()).slice(2)}${p(now.getMonth() + 1)}${p(now.getDate())}-${code}`;
  }

  function buildMessage({ ref, f, cart, menu, cfg, c }) {
    const cur = cfg.currencyAr, L = [];
    L.push(`🍉 *طلب جديد - ${cfg.nameAr}*`, `🔖 رقم الطلب: *${ref}*`, '');
    L.push('👤 *بيانات العميل*', `الاسم: ${f.name.trim()}`, `الموبايل: ${latin(f.phone).replace(/[\s-]/g, '')}`,
      `نوع الطلب: ${f.mode === 'delivery' ? 'توصيل 🛵' : 'استلام من الفرع 🏪'}`);
    if (f.mode === 'delivery') {
      L.push(`المنطقة: ${f.area.trim()}`, `العنوان: ${f.address.trim()}`, `رقم العمارة: ${f.building.trim()}`);
      if (f.apt && f.apt.trim()) L.push(`الشقة: ${f.apt.trim()}`);
      if (f.instr && f.instr.trim()) L.push(`تعليمات التوصيل: ${f.instr.trim()}`);
      if (f.geo) L.push(`الموقع على الخريطة: ${f.geo}`);
    }
    L.push('', '🧾 *الطلبات*');
    cart.forEach((l, n) => {
      const i = lineInfo(menu, l); if (!i) return;
      L.push(`${n + 1}) ${i.item.ar}${i.size ? ` (${i.size.ar})` : ''} × ${l.qty} = ${i.total} ${cur}`);
      if (i.extras.length) L.push(`   + إضافات: ${i.extras.map(e => e.ar).join('، ')}`);
      if (l.note && l.note.trim()) L.push(`   ملاحظة: ${l.note.trim()}`);
    });
    if (f.notes && f.notes.trim()) L.push('', `📝 ملاحظات على الطلب: ${f.notes.trim()}`);
    L.push('', '💰 *الحساب*', `المجموع: ${c.subtotal} ${cur}`);
    if (c.discount) L.push(`الخصم (${c.applied.code}): -${c.discount} ${cur}`);
    if (f.mode === 'delivery') L.push(`رسوم التوصيل: ${c.feeUnknown ? 'تُحدد عند التأكيد' : c.fee + ' ' + cur}`);
    L.push(`*الإجمالي: ${c.total} ${cur}${c.feeUnknown ? ' (بدون رسوم التوصيل)' : ''}*`);
    return L.join('\n');
  }

  const waUrl = (num, msg) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  const api = { latin, findItem, lineInfo, calc, validate, orderRef, buildMessage, waUrl };
  if (typeof module !== 'undefined') module.exports = api; else g.BTK = api;
})(typeof window !== 'undefined' ? window : globalThis);
