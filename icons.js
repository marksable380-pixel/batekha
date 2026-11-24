// Custom line-icon set (24x24). Class "a" = soft brand-pink fill accent.
(function (g) {
  const I = {
    shake: '<path class="a" d="M6.5 9h11l-1.4 11a1.5 1.5 0 0 1-1.5 1.3H9.4a1.5 1.5 0 0 1-1.5-1.3z"/><path d="M5.5 9h13M8 9c0-3 2-4.5 4-4.5s4 1.5 4 4.5M13 4.5l1.5-3"/><path d="M10 14h.01M14 16h.01"/>',
    juice: '<path class="a" d="M6 8h12l-1.3 12a1.5 1.5 0 0 1-1.5 1.3H8.8a1.5 1.5 0 0 1-1.5-1.3z"/><path d="M6 8h12M14 8l3-5"/><circle class="a" cx="17.5" cy="9" r="2.5"/>',
    strawberry: '<path class="a" d="M12 21c-5-3-7-7-6-10 1-2 4-2.5 6-1.5 2-1 5-.5 6 1.5 1 3-1 7-6 10z"/><path d="M9 5c1 1 2 1.5 3 1.5S14 6 15 5M12 6.5V4M10 12v1M13 14v1M15 11v1M11 17v1"/>',
    mango: '<path class="a" d="M5 14c0-5 4-9 9-9 3 0 5 1 5 3 0 6-5 11-10 11-2.5 0-4-2-4-5z"/><path d="M14 5c0-2 1-3 3-3M13 8c-2 1-3 3-3 5"/>',
    banana: '<path class="a" d="M5 5c0 8 5 14 15 14l1-3C14 15 10 11 9 4z"/><path d="M5 5l1.5-2M9 4L8 2.500M21 16l1.500 1"/>',
    guava: '<circle class="a" cx="12" cy="13" r="7.5"/><path d="M12 5.5c0-2 1-3 3-3.5M12 5.5C11 4 9.500 3.500 8 4M9 12.500h.01M14 11h.01M13 16h.01"/>',
    lemon: '<path class="a" d="M3 12c0-4 4-7 9-7s9 3 9 7-4 7-9 7-9-3-9-7z"/><path d="M21 12l1.5-1M3 12l-1.5 1M8 10c1-1 2-1.5 4-1.5M9 15c2 1 4 1 6 0"/>',
    date: '<path class="a" d="M7 6c4-3 12 0 11 7-1 5-6 8-9 5S3 9 7 6z"/><path d="M8 9c2 0 3 1 4 3"/>',
    pomegranate: '<circle class="a" cx="12" cy="13.5" r="7.5"/><path d="M8.5 6.500L9.500 3 12 5l2.500-2 1 3.500M10 12h.01M14 12h.01M12 15.500h.01M9.500 16h.01M14.500 16h.01"/>',
    kiwi: '<circle class="a" cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.500"/><path d="M12 3.500v3M12 17.500v3M3.500 12h3M17.500 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/>',
    peach: '<path class="a" d="M12 21c-5 0-8-4-8-8s3-7 8-7 8 3 8 7-3 8-8 8z"/><path d="M12 6c-1 4 0 9 0 15M12 6c0-2 2-4 5-4-1 2-2 3-5 4"/>',
    watermelon: '<path class="a" d="M3 11a9 9 0 0 0 18 0z"/><path d="M3 11h18M8 15h.01M12 17h.01M16 15h.01"/>',
    pineapple: '<path class="a" d="M12 22c-4 0-6-3-6-7s2-7 6-7 6 3 6 7-2 7-6 7z"/><path d="M12 8c-1-2-3-3-4-5 2 0 3 1 4 2 1-1 2-2 4-2-1 2-3 3-4 5zM9 13l6 6M15 13l-6 6"/>',
    passion: '<circle class="a" cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.500"/><path d="M10 11h.01M14 11h.01M12 14h.01"/>',
    berries: '<circle class="a" cx="8" cy="15" r="4.5"/><circle class="a" cx="16" cy="15" r="4.5"/><circle class="a" cx="12" cy="8.5" r="4"/><path d="M12 4.500V2M8 11.500h.01M16 11.500h.01"/>',
    mint: '<path d="M12 22V10"/><path class="a" d="M12 10C8 10 5 7 5 3c4 0 7 3 7 7zM12 14c4 0 7-3 7-7-4 0-7 3-7 7zM12 19c-3 0-5-2-5-5 3 0 5 2 5 5z"/>',
    choco: '<rect class="a" x="5" y="3" width="14" height="18" rx="2"/><path d="M5 9h14M5 15h14M12 3v18"/>',
    cookie: '<circle class="a" cx="12" cy="12" r="9"/><path d="M9 9h.01M15 8h.01M8 14h.01M13 13h.01M16 16h.01M11 17h.01"/>',
    caramel: '<path class="a" d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/><path d="M9.500 15a2.500 2.500 0 0 0 2.500 2.500"/>',
    nut: '<path class="a" d="M12 21c-4 0-7-3-7-8 0-4 3-8 7-10 4 2 7 6 7 10 0 5-3 8-7 8z"/><path d="M12 3v18M8 9c2 1 2 3 0 5M16 9c-2 1-2 3 0 5"/>',
    honey: '<path class="a" d="M7 9h10v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"/><path d="M6 9h12V6H6zM12 2v4M10 13c1 1 3 1 4 0"/>',
    icedcoffee: '<path class="a" d="M6.5 8h11l-1.3 12a1.5 1.5 0 0 1-1.5 1.3H9.3a1.5 1.5 0 0 1-1.500-1.300z"/><path d="M5.500 8h13M6.500 8c0-2 2-3 5.500-3s5.500 1 5.500 3M13 5l2-4M10 13h.01M14 15h.01M11 17h.01"/>',
    mug: '<path class="a" d="M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 11h2a2.5 2.5 0 0 1 0 5h-2M8 2v3M12 2v3"/>',
    espresso: '<path class="a" d="M6 10h9v3a4 4 0 0 1-4 4h-1a4 4 0 0 1-4-4z"/><path d="M15 11h1.500a1.500 1.500 0 0 1 0 3H15M3 20h16M9 3v3M12 4v2"/>',
    tea: '<path class="a" d="M4 10h12v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 12h2a2 2 0 0 1 0 4h-2M10 3v5M10 8l2 2"/>',
    turkish: '<path class="a" d="M7 9h10l-1 10a2 2 0 0 1-2 1.5h-4A2 2 0 0 1 8 19z"/><path d="M6 9l2-3h8l2 3M17 11h3v5h-3M12 3v3"/>',
    sahlab: '<path class="a" d="M5 9h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"/><path d="M17 11h1.500a2.500 2.500 0 0 1 0 5H17M9 12h.01M12 13h.01M14 12h.01M8 6c1-1 1-2 0-3M12 6c1-1 1-2 0-3"/>',
    mojito: '<path class="a" d="M6 6h12l-1.500 14a1.500 1.500 0 0 1-1.500 1.300H9a1.500 1.500 0 0 1-1.500-1.300z"/><path d="M6 6h12M11 6C10 4 8 3 6 3c0 2 2 3 5 3M13 6c1-2 3-2 5-2 0 2-2 3-5 2M9 12h.01M14 14h.01"/>',
    yogurt: '<path class="a" d="M5 8h14l-1.500 12a1.500 1.500 0 0 1-1.500 1.300H8A1.500 1.500 0 0 1 6.500 20z"/><path d="M4 8h16M4 5h16v3M9 13c1 1 5 1 6 0"/>',
    can: '<rect class="a" x="7" y="4" width="10" height="17" rx="2"/><path d="M7 8h10M7 17h10M10 4V2.500h4V4"/>',
    redbull: '<rect class="a" x="7" y="4" width="10" height="17" rx="2"/><path d="M13 8l-3 5h4l-3 5"/>',
    bottle: '<path class="a" d="M10 2h4v4l2 3v11a1.500 1.500 0 0 1-1.500 1.500h-5A1.500 1.500 0 0 1 8 20V9l2-3z"/><path d="M8 13h8"/>',
    cone: '<circle class="a" cx="12" cy="8" r="5"/><path d="M7.500 11L12 22l4.500-11M9 15h6M11 8h.01"/>',
    cake: '<path class="a" d="M3 19h18v-6H3z"/><path d="M3 13c0-3 2-4 4-4h10c2 0 4 1 4 4M12 9V6.500"/><circle cx="12" cy="5" r="1.500"/>',
    waffle: '<rect class="a" x="3.500" y="3.500" width="17" height="17" rx="3.500"/><path d="M9.200 3.500v17M14.800 3.500v17M3.500 9.200h17M3.500 14.800h17"/>',
    pancake: '<ellipse class="a" cx="12" cy="17" rx="8" ry="3"/><ellipse class="a" cx="12" cy="12.500" rx="8" ry="3"/><ellipse class="a" cx="12" cy="8" rx="8" ry="3"/>',
    bowl: '<path class="a" d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 21h8M8 7c0-1.500 1.500-1.500 1.500-3M13 7c0-1.500 1.500-1.500 1.500-3"/>',
    ricepud: '<path class="a" d="M5 10h14l-1.500 10a1.500 1.500 0 0 1-1.500 1.300H8A1.500 1.500 0 0 1 6.500 20z"/><path d="M5 10c0-2 3-3.500 7-3.500s7 1.500 7 3.500M13 6.500L17 2"/>',
    zalabia: '<circle class="a" cx="8" cy="9" r="4.500"/><circle class="a" cx="16" cy="9" r="4.500"/><circle class="a" cx="12" cy="16" r="4.500"/><circle cx="8" cy="9" r="1.500"/><circle cx="16" cy="9" r="1.500"/><circle cx="12" cy="16" r="1.500"/>',
    sandwich: '<path class="a" d="M3 11a9 7 0 0 1 18 0z"/><path d="M3 14h18"/><path class="a" d="M5 17h14v1a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z"/>',
    gift: '<rect class="a" x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 13h18M12 8C9 8 8 4.500 10 4s2 4 2 4zm0 0c3 0 4-3.500 2-4s-2 4-2 4z"/>',
    fresca: '<path class="a" d="M6 10h12l-1.300 10a1.500 1.500 0 0 1-1.500 1.300H8.800A1.500 1.500 0 0 1 7.300 20z"/><path d="M6 10c0-3 2-4 3-4 0-2 1.500-3 3-3s3 1 3 3c1 0 3 1 3 4M10 14h.01M14 16h.01"/>',
    plus: '<circle class="a" cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    spark: '<path class="a" d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>'
  };
  const CAT = { milkshake:'shake','fresh-juice':'juice','fresh-mix':'juice','iced-coffee':'icedcoffee','hot-drinks':'mug',espresso:'espresso',sahlab:'sahlab',mojito:'mojito',yogurt:'yogurt',smoothie:'juice',soft:'can',frappe:'icedcoffee','ice-cream':'cone',dessert:'cake',zalabia:'zalabia',boxes:'gift',inventions:'spark',fresca:'fresca',pancake:'pancake','om-ali':'bowl',waffle:'waffle','rice-pudding':'ricepud',sandwiches:'sandwich',extras:'plus' };
  const FLAV = [[/جواف/,'guava'],[/فراول|تونكز/,'strawberry'],[/مانج/,'mango'],[/موز/,'banana'],[/ليمون/,'lemon'],[/بلح/,'date'],[/رمان/,'pomegranate'],[/كيوي/,'kiwi'],[/خوخ/,'peach'],[/بطيخ/,'watermelon'],[/أناناس|بيناكولا/,'pineapple'],[/باشون/,'passion'],[/بيري/,'berries'],[/نعن/,'mint'],[/بيستاشيو|مكسرات|سوداني|بندق/,'nut'],[/عسل/,'honey'],[/نوتيلا|شوكولاتة|شوكليت|شيكولاتة|كيندر|مورو|رافاهيلو|رفاهيلو|فيروروشية|هوهوز/,'choco'],[/لوتس|بسكريم|بسكوت|أوريو|اوريو|جلاكسي|كابري/,'cookie'],[/كراميل/,'caramel']];
  const FLAV_CATS = ['milkshake','fresh-juice','fresh-mix','smoothie','frappe','fresca','mojito'];
  function iconFor(item, cat) {
    const n = item.ar || '', id = cat.id;
    if (id === 'soft') return /مياه/.test(n) ? 'bottle' : /ريدبول/.test(n) ? 'redbull' : 'can';
    if (id === 'hot-drinks') return /شاي/.test(n) ? 'tea' : /تركي/.test(n) ? 'turkish' : /أعشاب/.test(n) ? 'mint' : 'mug';
    if (id === 'espresso') return /إسبريسو|ميكاتو/.test(n) ? 'espresso' : 'mug';
    if (id === 'extras') return /كاب/.test(n) ? 'cone' : /عسل/.test(n) ? 'honey' : /سوداني|مكسرات/.test(n) ? 'nut' : /آيس/.test(n) ? 'cone' : /صوص/.test(n) ? 'caramel' : /قشطة/.test(n) ? 'bowl' : 'cake';
    if (id === 'ice-cream') return /بسكوته/.test(n) ? 'cookie' : 'cone';
    if (id === 'dessert') return /براونيز/.test(n) ? 'choco' : /فتة|ديسباسيتو/.test(n) ? 'bowl' : 'cake';
    if (FLAV_CATS.includes(id)) { if (id === 'mojito' && !/فليفر/.test(n)) return 'mojito'; for (const [re, k] of FLAV) if (re.test(n)) return k; }
    return CAT[id] || 'spark';
  }
  const ic = n => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n] || I.spark}</svg>`;
  g.ICONS = { ic, iconFor, CAT, I };
})(window);
