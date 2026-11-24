// Restaurant settings. Editable from admin.html (saved in the browser) or directly here.
window.CONFIG_DEFAULT = {
  nameAr: "بطيخة", nameEn: "Batekha",
  whatsapp: "201288190765",          // international format, no + or spaces
  currencyAr: "ج.م", currencyEn: "EGP",
  hours: { ar: "من ١٠ ص حتى ٤ ص", en: "10 AM – 4 AM", open: 10, close: 4 },
  deliveryFee: null,                 // null = not set yet -> shown as "confirmed on WhatsApp"
  minOrder: 0,
  discounts: [],                     // e.g. {code:"WELCOME10", type:"percent", value:10}
  address: "", mapUrl: "", phone: "", instagram: "", facebook: "", tiktok: "",
  adminPass: "change-me"
};
