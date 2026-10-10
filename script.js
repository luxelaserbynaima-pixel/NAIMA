/* ═══════════════════════════════════════════════════════════════
   لوحة التعديل السريع — غيّري هذه البيانات فقط لإضافة منتجاتكِ
   ═══════════════════════════════════════════════════════════════ */
const STORE = {
  name: 'Luxe Laser by Naima',
  email: 'luxelaserbynaaima@gmail.com', // البريد الذي سيستقبل الطلبات
  formEndpoint: 'https://formsubmit.co/ajax/luxelaserbynaaima@gmail.com', // غيّري البريد هنا أيضاً
  currency: 'DH',
  products: [
    {id:1,name:'جهاز إزالة الشعر IPL',category:'أجهزة IPL',price:18500,image:'ipl-device.jpeg',emoji:'⚡',description:'جهاز IPL منزلي أنيق مع عدسة واسعة وملحقات كاملة للعناية الآمنة والمريحة في المنزل.',colors:[{name:'أبيض ووردي',hex:'#f6eee9'},{name:'أسود وذهبي',hex:'#292323'}]},
    {id:2,name:'جهاز الليزر المنزلي Pro',category:'أجهزة IPL',price:24500,emoji:'✦',description:'حل عملي للعناية المنزلية بتصميم مريح وخيارات متعددة تناسب روتينكِ.',colors:[{name:'أبيض',hex:'#f4f1ed'},{name:'وردي',hex:'#d88b82'}]},
    {id:3,name:'جهاز إزالة الشعر Mini',category:'أجهزة IPL',price:12900,emoji:'⚡',description:'حجم صغير وسهل الحمل، مناسب للمناطق الصغيرة واللمسات السريعة في أي وقت.',colors:[{name:'وردي فاتح',hex:'#e8aaa0'},{name:'أبيض',hex:'#f5f3f0'}]},
    {id:4,name:'نظارات حماية من الضوء',category:'إكسسوارات',price:1800,emoji:'🥽',description:'نظارات حماية مريحة للاستخدام أثناء جلسات العناية بأجهزة الضوء والليزر المنزلية.',colors:[{name:'أسود',hex:'#292323'}]},
    {id:5,name:'جل تبريد وترطيب',category:'العناية قبل وبعد',price:2200,emoji:'🧴',description:'جل منعش يساعد على تهدئة وترطيب البشرة قبل وبعد جلسة إزالة الشعر.',colors:[{name:'طبيعي',hex:'#dcece8'}]},
    {id:6,name:'شفرة تحضير البشرة',category:'العناية قبل وبعد',price:900,emoji:'✨',description:'أداة دقيقة لتحضير البشرة قبل الجلسة ومنحكِ تجربة أكثر سلاسة.',colors:[{name:'ذهبي',hex:'#c99968'}]},
    {id:7,name:'رأس بديل لجهاز IPL',category:'إكسسوارات',price:4500,emoji:'◈',description:'رأس بديل عملي للحفاظ على أداء جهازكِ وتجديد تجربة العناية المنزلية.',colors:[{name:'أبيض',hex:'#f4f1ed'}]},
    {id:8,name:'حقيبة حفظ الجهاز والملحقات',category:'إكسسوارات',price:3500,emoji:'👜',description:'حقيبة أنيقة لحفظ جهاز IPL والملحقات بطريقة مرتبة وآمنة.',colors:[{name:'روز',hex:'#c98478'},{name:'أسود',hex:'#292323'}]}
  ]
};
let cart = JSON.parse(localStorage.getItem('luxeCart') || '[]');
let activeProduct = null, selectedColor = null, quantity = 1, activeCategory = 'الكل';
const $ = s => document.querySelector(s);
const money = n => `${n.toLocaleString('fr-FR')} ${STORE.currency}`;
function save(){localStorage.setItem('luxeCart',JSON.stringify(cart)); updateCart();}
function productVisual(p, cls=''){return p.image?`<img class="product-photo ${cls}" src="${p.image}" alt="${p.name}">`:`<span class="product-emoji ${cls}">${p.emoji}</span>`}
function renderFilters(){const cats=['الكل',...new Set(STORE.products.map(p=>p.category))];$('#filters').innerHTML=cats.map(c=>`<button class="filter-btn ${c===activeCategory?'active':''}" data-cat="${c}">${c}</button>`).join('');document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat;renderFilters();renderProducts()});}
function renderProducts(){const list=activeCategory==='الكل'?STORE.products:STORE.products.filter(p=>p.category===activeCategory);$('#productsGrid').innerHTML=list.map(p=>`<article class="product-card" data-id="${p.id}"><div class="product-image">${productVisual(p)}</div><div class="product-info"><div class="product-category">${p.category}</div><div class="product-title">${p.name}</div><div class="product-bottom"><span class="product-price">${money(p.price)}</span><button class="quick-add" aria-label="إضافة ${p.name}">+</button></div></div></article>`).join('');document.querySelectorAll('.product-card').forEach(card=>card.onclick=()=>openProduct(+card.dataset.id));}
function openProduct(id){activeProduct=STORE.products.find(p=>p.id===id);quantity=1;selectedColor=activeProduct.colors[0];$('#modalImage').innerHTML=productVisual(activeProduct,'modal-photo');$('#modalCategory').textContent=activeProduct.category;$('#modalTitle').textContent=activeProduct.name;$('#modalDescription').textContent=activeProduct.description;$('#modalPrice').textContent=money(activeProduct.price);$('#quantity').textContent=quantity;$('#colorOptions').innerHTML=activeProduct.colors.map((c,i)=>`<button class="swatch ${i===0?'selected':''}" title="${c.name}" style="background:${c.hex}" data-color="${c.name}"></button>`).join('');document.querySelectorAll('.swatch').forEach(s=>s.onclick=()=>{selectedColor=activeProduct.colors.find(c=>c.name===s.dataset.color);document.querySelectorAll('.swatch').forEach(x=>x.classList.remove('selected'));s.classList.add('selected')});$('#productModal').classList.add('open');}
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
document.addEventListener('DOMContentLoaded',()=>{renderFilters();renderProducts();updateCart();$('#year').textContent=new Date().getFullYear();$('#emailLink').href=`mailto:${STORE.email}?subject=${encodeURIComponent('استفسار من موقع '+STORE.name)}`;$('#plus').onclick=()=>{$('#quantity').textContent=++quantity};$('#minus').onclick=()=>{if(quantity>1)$('#quantity').textContent=--quantity};$('#addToCart').onclick=()=>{const found=cart.find(i=>i.id===activeProduct.id&&i.color===selectedColor.name);if(found)found.qty+=quantity;else cart.push({id:activeProduct.id,name:activeProduct.name,price:activeProduct.price,emoji:activeProduct.emoji,image:activeProduct.image,color:selectedColor.name,qty:quantity});save();$('#productModal').classList.remove('open');showToast()};$('#cartOpen').onclick=()=>{$('#cartModal').classList.add('open');updateCart()};$('#orderEmail').onclick=createOrderEmail;document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('.modal-backdrop').classList.remove('open'));document.querySelectorAll('.modal-backdrop').forEach(m=>m.onclick=e=>{if(e.target===m)m.classList.remove('open')});$('#menuToggle').onclick=()=>$('#mainNav').classList.toggle('open');});
