// ===== PRODUCT DATA =====
const products = [
  { id: 1, name: "Smart Watch", price: 3999, category: "Electronics", img: "images/smartwatch.jpg" },
  { id: 2, name: "Women's Handbag", price: 899, category: "Fashion", img: "images/handbag.jpg" },
  { id: 3, name: "Office Chair", price: 2449, category: "Home", img: "images/chair.jpg" },
  { id: 4, name: "Skincare Combo", price: 999, category: "Beauty", img: "images/skincare.jpg" },
  { id: 5, name: "Smart TV", price: 24999, category: "Electronics", img: "images/tv.jpg" }
];

let cart = [];

// ===== DISPLAY PRODUCTS =====
function displayProducts(list) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  if (list.length === 0) {
    productList.innerHTML = `<p style="text-align:center; font-size:1.1rem;">No products found 😢</p>`;
    return;
  }

  list.forEach(p => {
    const item = document.createElement("div");
    item.classList.add("product");
    item.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price.toLocaleString()}</p>
      <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(item);
  });
}

// ===== SEARCH + FILTER + SORT =====
function filterAndSearchProducts() {
  const search = document.getElementById("searchInput").value.toLowerCase().trim();
  const category = document.getElementById("categorySelect").value;
  const sortOrder = document.getElementById("sortSelect").value;

  let filtered = [...products];

  // Filter by category
  if (category !== "All") {
    filtered = filtered.filter(p => p.category === category);
  }

  // Search by name
  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }

  // Sort
  if (sortOrder === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

// ===== CART FUNCTIONS =====
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  
  cartItems.innerHTML = "";
  let total = 0;
  
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} (x${item.qty})</span>
      <button onclick="removeFromCart(${item.id})">🗑️</button>
    `;
    cartItems.appendChild(div);
  });
  
  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toFixed(2);
}

function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
}

// ===== DARK MODE =====
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

// ===== INITIAL LOAD =====
document.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);
});
