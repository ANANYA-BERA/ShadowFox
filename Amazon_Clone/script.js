const products = [
      {id:1, name:"Wireless Headphones", price:1299, img:"images/headphone.jpg", category:"Electronics"},
      {id:2, name:"Smart Watch", price:899, img:"images/smartwatch.jpg", category:"Electronics"},
      {id:3, name:"Smart Watch", price:899, img:"images/smartwatch.jpg", category:"Electronics"},
      {id:4, name:"Leather Handbag", price:599, img:"images/handbag.jpg", category:"Fashion"},
      {id:5, name:"4K Smart TV", price:24999, img:"images/tv.jpg", category:"Home"},
      {id:6, name:"Skincare Set", price:499, img:"images/skincare.jpg", category:"Beauty"},
      {id:7, name:"Office Chair", price:3599, img:"images/chair.jpg", category:"Home"},
      {id:8, name:"Wireless Headphones", price:1299, img:"images/headphone.jpg", category:"Electronics"},
      {id:9, name:"Wireless Headphones", price:1299, img:"images/headphone.jpg", category:"Electronics"},
      {id:10, name:"4K Smart TV", price:24999, img:"images/tv.jpg", category:"Home"},
      {id:11, name:"4K Smart TV", price:24999, img:"images/tv.jpg", category:"Home"},
      {id:12, name:"Leather Handbag", price:599, img:"images/handbag.jpg", category:"Fashion"},
      {id:13, name:"Leather Handbag", price:599, img:"images/handbag.jpg", category:"Fashion"},


   
   
    ];

    const cart = [];

    function renderProducts(list = products) {
      const container = document.getElementById('productList');
      container.innerHTML = list.map(p => `
        <div class="card">
          <img src="${p.img}" alt="${p.name}">
          <div class="info">
            <h3>${p.name}</h3>
            <div class="price">₹${p.price}</div>
            <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
          </div>
        </div>
      `).join('');
    }

    function addToCart(id) {
      const product = products.find(p => p.id === id);
      const found = cart.find(i => i.id === id);
      if (found) found.qty++;
      else cart.push({...product, qty:1});
      updateCart();
    }

    function updateCart() {
      document.getElementById('cartCount').innerText = cart.reduce((s,i)=>s+i.qty,0);
      const cartItems = document.getElementById('cartItems');
      let total = 0;
      cartItems.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `<div class='cart-item'>
          <img src='${item.img}' />
          <div style='flex:1; margin-left:10px;'>${item.name}<br>₹${item.price} x ${item.qty}</div>
          <button onclick='removeFromCart(${item.id})'>❌</button>
        </div>`;
      }).join('');
      document.getElementById('cartTotal').innerText = total.toFixed(2);
    }

    function removeFromCart(id) {
      const index = cart.findIndex(i => i.id === id);
      if (index > -1) cart.splice(index,1);
      updateCart();
    }

    function toggleCart() {
      document.getElementById('cartDrawer').classList.toggle('open');
    }

    function filterProducts() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const category = document.getElementById('categorySelect').value;
      const filtered = products.filter(p =>
        (category === 'All' || p.category === category) &&
        p.name.toLowerCase().includes(query)
      );
      renderProducts(filtered);
    }

    function toggleDarkMode() {
      document.body.classList.toggle('dark');
    }

    window.onscroll = () => {
      const btn = document.getElementById('scrollTop');
      if (window.scrollY > 300) btn.style.display = 'block';
      else btn.style.display = 'none';
    }

    renderProducts();