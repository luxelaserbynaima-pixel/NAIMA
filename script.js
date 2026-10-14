/* ═══════════════════════════════════════════════════════════════
   لوحة التعديل السريع — غيّري هذه البيانات فقط لإضافة منتجاتكِ
   ═══════════════════════════════════════════════════════════════ */
const STORE = {
  name: 'Luxe Laser by Naima',
  email: 'luxelaserbynaaima@gmail.com', // البريد الذي سيستقبل الطلبات
  formEndpoint: 'https://formsubmit.co/ajax/luxelaserbynaaima@gmail.com', // غيّري البريد هنا أيضاً
  currency: 'DH',
  products: [
    // أضيفي حتى ٨ صور داخل images لكل منتج، مثلاً:
    // images:['ipl-device.jpeg','ipl-device-2.jpeg','ipl-device-3.jpeg']
    // إذا لم تستخدمي images فسيتم استعمال image القديمة تلقائياً.
    {id:1,name:'MLAY14',price:3800,images: [
  'IMG1.jpg',
  'IMG10.jpg',
  'IMG2.jpg',
  'IMG4.jpg',
  'IMG5.jpg',
  'IMG6.jpg',
  'IMG7.jpg',
  'IMG8.jpg'
],emoji:'⚡',description:'500.000 ومضة +تبريد ICE',colors:[{name:'أبيض ووردي',hex:'#f6eee9'},{name:'أسود وذهبي',hex:'#292323'}]},
    {id:2,name:'Generic Mini IPL',price:1400,images: [
  'IMG.jpg',
],description:'600.000 ومضة',colors:[{name:'أبيض',hex:'#f4f1ed'},{name:'وردي',hex:'#d88b82'}]},
    {id:3,name:'MLAY T4',price:2700,images: [
  'M1.jpg',
  'M2.jpg',
  'M3.jpg',
  'M4.jpg',

],description:'500.000 ومضة مع شاشة LCD',colors:[{name:'وردي فاتح',hex:'#e8aaa0'},{name:'أبيض',hex:'#f5f3f0'}]},
    {id:4,name:'MyLady Happy Skin',price:1700,images: [
  'IMG-20261008-WA0002.jpg',
],description:'999.999 ومضة',colors:[{name:'أسود',hex:'#292323'}]},
    {id:5,name:'Ulike Sapphire Air+Copy',price:2500,images: [
  'T1.jpeg',
  'T2.jpg',
],description:'تبريد 3 مستويات',colors:[{name:'طبيعي',hex:'#dcece8'}]},
    {id:6,name:'Photon IPL',price:2900,images: [
  'L1.jpg',
]
,description:'990.000 ومضة +شاشة رقمية',colors:[{name:'ذهبي',hex:'#c99968'}]},
    {id:7,name:'Mini IPL Handset',price:1000,images: [
  'O1.jpg',
],description:'300.000-500.000 ومضة',colors:[{name:'أبيض',hex:'#f4f1ed'}]},
    {id:8,name:'ICE-COOL',price:3200,images: [
  'q1.jpeg',
  'q2.jpg',
  'q3.jpg',
],description:'600.000 ومضة',colors:[{name:'أبيض',hex:'#f4f1ed'},{name:'وردي',hex:'#d88b82'}]},
      {id:8,name:'SAAOOT',price:5500,images: [
  'q1.jpeg',
  'q2.jpg',
],description:'600.000 ومضة',colors:[{name:'أبيض',hex:'#f4f1ed'},{name:'وردي',hex:'#d88b82'}]},
     {id:9,name:'Mini IPL Handset',price:1000,images: [
  'N1.jpg',
],description:'300.000-500.000 ومضة',colors:[{name:'روز',hex:'#c98478'},{name:'أسود',hex:'#292323'}]}]};
let cart = JSON.parse(localStorage.getItem('luxeCart') || '[]');
let activeProduct = null, selectedColor = null, quantity = 1, activeCategory = 'الكل';
const $ = s => document.querySelector(s);
const money = n => `${n.toLocaleString('fr-FR')} ${STORE.currency}`;
function save(){localStorage.setItem('luxeCart',JSON.stringify(cart)); updateCart();}

// تقرأ images بحد أقصى ٨ صور، وتدعم image القديمة كصورة احتياطية.
function productImages(p){
  const images = Array.isArray(p.images) ? p.images.filter(Boolean).slice(0,8) : [];
  if(images.length) return images;
  return p.image ? [p.image] : [];
}
function productVisual(p, cls=''){
  const firstImage = productImages(p)[0];
  return firstImage ? `<img class="product-photo ${cls}" src="${firstImage}" alt="${p.name}">` : `<span class="product-emoji ${cls}">${p.emoji || ''}</span>`;
}
function renderFilters(){const cats=['الكل',...new Set(STORE.products.map(p=>p.category))];$('#filters').innerHTML=cats.map(c=>`<button class="filter-btn ${c===activeCategory?'active':''}" data-cat="${c}">${c}</button>`).join('');document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat;renderFilters();renderProducts()});}
function renderProducts(){const list=activeCategory==='الكل'?STORE.products:STORE.products.filter(p=>p.category===activeCategory);$('#productsGrid').innerHTML=list.map(p=>`<article class="product-card" data-id="${p.id}"><div class="product-image">${productVisual(p)}</div><div class="product-info"><div class="product-category">${p.category}</div><div class="product-title">${p.name}</div><div class="product-bottom"><span class="product-price">${money(p.price)}</span><button class="quick-add" aria-label="إضافة ${p.name}">+</button></div></div></article>`).join('');document.querySelectorAll('.product-card').forEach(card=>card.onclick=()=>openProduct(+card.dataset.id));}

function ensureGalleryStyles(){
  if($('#productGalleryStyles')) return;
  const style=document.createElement('style');
  style.id='productGalleryStyles';
  style.textContent=`
    .product-gallery-main{display:flex;align-items:center;justify-content:center;width:100%;min-height:260px}
    .product-gallery-main img{max-width:100%;max-height:360px;object-fit:contain}
    .product-gallery-thumbs{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:12px}
    .product-gallery-thumb{width:56px;height:56px;padding:3px;border:1px solid #ded4d0;border-radius:8px;background:#fff;cursor:pointer;overflow:hidden}
    .product-gallery-thumb.selected{border:2px solid #b87970}
    .product-gallery-thumb img{width:100%;height:100%;object-fit:cover}
  `;
  document.head.appendChild(style);
}
function renderProductGallery(p){
  const images=productImages(p);
  ensureGalleryStyles();
  if(!images.length) return `<div class="product-gallery-main">${productVisual(p,'modal-photo')}</div>`;
  return `<div class="product-gallery"><div class="product-gallery-main" id="galleryMain">${productVisual({...p,image:images[0],images:[]},'modal-photo')}</div><div class="product-gallery-thumbs" aria-label="صور ${p.name}">${images.map((src,i)=>`<button type="button" class="product-gallery-thumb ${i===0?'selected':''}" data-gallery-index="${i}" aria-label="عرض الصورة ${i+1}"><img src="${src}" alt="${p.name} - صورة ${i+1}"></button>`).join('')}</div></div>`;
}
function openProduct(id){
  activeProduct=STORE.products.find(p=>p.id===id);quantity=1;selectedColor=activeProduct.colors[0];
  $('#modalImage').innerHTML=renderProductGallery(activeProduct);
  const images=productImages(activeProduct);
  document.querySelectorAll('[data-gallery-index]').forEach(thumb=>thumb.onclick=()=>{
    const index=Number(thumb.dataset.galleryIndex);
    $('#galleryMain').innerHTML=productVisual({...activeProduct,image:images[index],images:[]},'modal-photo');
    document.querySelectorAll('[data-gallery-index]').forEach(x=>x.classList.remove('selected'));thumb.classList.add('selected');
  });
  $('#modalCategory').textContent=activeProduct.category;$('#modalTitle').textContent=activeProduct.name;$('#modalDescription').textContent=activeProduct.description;$('#modalPrice').textContent=money(activeProduct.price);$('#quantity').textContent=quantity;$('#colorOptions').innerHTML=activeProduct.colors.map((c,i)=>`<button class="swatch ${i===0?'selected':''}" title="${c.name}" style="background:${c.hex}" data-color="${c.name}"></button>`).join('');document.querySelectorAll('.swatch').forEach(s=>s.onclick=()=>{selectedColor=activeProduct.colors.find(c=>c.name===s.dataset.color);document.querySelectorAll('.swatch').forEach(x=>x.classList.remove('selected'));s.classList.add('selected')});$('#productModal').classList.add('open');}
function updateCart(){const count=cart.reduce((a,i)=>a+i.qty,0);$('#cartCount').textContent=count;const total=cart.reduce((a,i)=>a+i.price*i.qty,0);$('#cartTotal').textContent=money(total);if(!cart.length){$('#cartItems').innerHTML='<p style="color:#756a68;font-size:13px;text-align:center;padding:20px 0">السلة فارغة حالياً. اختاري ما يعجبكِ ✦</p>'}else{$('#cartItems').innerHTML=cart.map((i,n)=>`<div class="cart-row"><div class="cart-thumb">${i.image?`<img src="${i.image}" alt="${i.name}">`:i.emoji}</div><div class="cart-row-info"><strong>${i.name}</strong><small>${i.color} × ${i.qty}</small></div><span class="cart-row-price">${money(i.price*i.qty)}</span><button class="remove-item" data-remove="${n}" aria-label="حذف">×</button></div>`).join('');document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.remove,1);save()})}}
function createOrderEmail(){
  const form=$('#customerForm');
  if(!cart.length){showToastMessage('أضيفي منتجاً إلى السلة أولاً');return;}
  if(!form.reportValidity())return;
  const data=new FormData(form);
  const lines=cart.map(i=>`- ${i.name} | اللون: ${i.color} | الكمية: ${i.qty} | ${money(i.price*i.qty)}`).join('\n');
  const total=cart.reduce((a,i)=>a+i.price*i.qty,0);
  const payload={
    _subject:`طلب جديد من ${data.get('fullName')} - ${STORE.name}`,
    store:STORE.name,
    fullName:data.get('fullName'),
    customerEmail:data.get('customerEmail'),
    phone:data.get('phone'),
    city:data.get('city'),
    location:data.get('location'),
    address:data.get('address'),
    notes:data.get('notes')||'لا توجد',
    products:lines,
    total:money(total),
    _replyto:data.get('customerEmail')
  };
  const button=$('#orderEmail');
  button.disabled=true;button.innerHTML='جارٍ إرسال الطلب...';
  fetch(STORE.formEndpoint,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify(payload)})
    .then(r=>{if(!r.ok)throw new Error('send-failed');return r.json()})
    .then(()=>{form.reset();cart=[];save();button.disabled=false;button.innerHTML='تم إرسال الطلب بنجاح ✓';showToastMessage('تم إرسال طلبكِ بنجاح');setTimeout(()=>{$('#cartModal').classList.remove('open');button.innerHTML='إرسال الطلب مباشرة عبر الموقع ↗'},2200)})
    .catch(()=>{button.disabled=false;button.innerHTML='إرسال الطلب مباشرة عبر الموقع ↗';showToastMessage('تعذر الإرسال. تحققي من إعداد البريد في script.js')});
}
function showToastMessage(message){const t=$('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>{t.classList.remove('show');t.textContent='تمت إضافة المنتج إلى السلة ✦'},2800)}
function showToast(){showToastMessage('تمت إضافة المنتج إلى السلة ✦')}
document.addEventListener('DOMContentLoaded',()=>{renderFilters();renderProducts();updateCart();$('#year').textContent=new Date().getFullYear();$('#emailLink').href=`mailto:${STORE.email}?subject=${encodeURIComponent('استفسار من موقع '+STORE.name)}`;$('#plus').onclick=()=>{$('#quantity').textContent=++quantity};$('#minus').onclick=()=>{if(quantity>1)$('#quantity').textContent=--quantity};$('#addToCart').onclick=()=>{const found=cart.find(i=>i.id===activeProduct.id&&i.color===selectedColor.name);if(found)found.qty+=quantity;else cart.push({id:activeProduct.id,name:activeProduct.name,price:activeProduct.price,emoji:activeProduct.emoji,image:productImages(activeProduct)[0],color:selectedColor.name,qty:quantity});save();$('#productModal').classList.remove('open');showToast()};$('#cartOpen').onclick=()=>{$('#cartModal').classList.add('open');updateCart()};$('#orderEmail').onclick=createOrderEmail;document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('.modal-backdrop').classList.remove('open'));document.querySelectorAll('.modal-backdrop').forEach(m=>m.onclick=e=>{if(e.target===m)m.classList.remove('open')});$('#menuToggle').onclick=()=>$('#mainNav').classList.toggle('open');});
