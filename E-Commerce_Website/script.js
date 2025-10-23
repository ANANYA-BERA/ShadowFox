// Sample product data
const products = [
  { id: 1, name: "Men's T-Shirt", category: "men", price: 499, image: "images/tshirt.jpg" },
  { id: 2, name: "Women's Dress", category: "women", price: 899, image: "images/dress.jpg" },
  { id: 3, name: "Watch", category: "accessories", price: 1299, image: "images/watch.jpg" },
  { id: 4, name: "Men's Jeans", category: "men", price: 999, image: "images/jeans.jpg" },
  { id: 5, name: "Handbag", category: "accessories", price: 799, image: "images/handbag.jpg" },
];

const productList = document.getElementById("product-list");
const featuredProducts = document.getElementById("featured-products");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display products dynamically
function displayProducts(items, target) {
  if (!target) return;
  target.innerHTML = "";
  items.forEach(item => {
    target.innerHTML += `
      <div class="product">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function updateCartCount() {
  if (cartCount) cartCount.textContent = cart.length;
}

// Filtering & Sorting
if (productList) {
  const categorySelect = document.getElementById("category");
  const sortSelect = document.getElementById("sort");

  function updateDisplay() {
    let filtered = [...products];
    const category = categorySelect.value;
    const sort = sortSelect.value;

    if (category !== "all") {
      filtered = filtered.filter(p => p.category === category);
    }

    if (sort === "low-high") filtered.sort((a, b) => a.price - b.price);
    else if (sort === "high-low") filtered.sort((a, b) => b.price - a.price);

    displayProducts(filtered, productList);
  }

  categorySelect.addEventListener("change", updateDisplay);
  sortSelect.addEventListener("change", updateDisplay);

  updateDisplay();
}

// Featured Products on Home Page
if (featuredProducts) {
  displayProducts(products.slice(0, 3), featuredProducts);
  updateCartCount();
}

// === DARK/LIGHT MODE TOGGLE ===
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    themeToggle.textContent = theme === "dark" ? "☀" : "🌙";
  });
}