/* ==================== script.js ==================== */
// Complete JavaScript for ShopEase E-Commerce with Enhanced UI

// ========== PRODUCTS DATA (with ratings, discounts, featured flag) ==========
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    originalPrice: 1199,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
    description:
      "A17 Pro chip, Titanium design, 48MP main camera with 3x zoom, USB-C connector. The ultimate smartphone experience.",
    rating: 4.8,
    reviews: 1243,
    featured: true,
    discount: 17,
    inStock: true,
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: 1999,
    originalPrice: 2299,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    description:
      "M3 Pro chip, 14-inch Liquid Retina XDR display, 18GB RAM, 512GB SSD. Built for professionals.",
    rating: 4.9,
    reviews: 892,
    featured: true,
    discount: 13,
    inStock: true,
  },
  {
    id: 3,
    name: "Premium Cotton Shirt",
    price: 29,
    originalPrice: 49,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    description:
      "100% Egyptian cotton, breathable fabric, classic fit available in S-XXL. Perfect for office or casual wear.",
    rating: 4.5,
    reviews: 567,
    featured: false,
    discount: 41,
    inStock: true,
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 89,
    originalPrice: 129,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1528701800489-20be3c8e7b3b?w=400",
    description:
      "Lightweight mesh upper, responsive cushioning, durable rubber outsole for maximum comfort.",
    rating: 4.6,
    reviews: 2341,
    featured: true,
    discount: 31,
    inStock: true,
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    price: 349,
    originalPrice: 399,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
    description:
      "Industry-leading noise cancellation, 30-hour battery life, crystal-clear hands-free calling.",
    rating: 4.9,
    reviews: 3456,
    featured: true,
    discount: 13,
    inStock: true,
  },
  {
    id: 6,
    name: "Apple Watch Series 9",
    price: 399,
    originalPrice: 429,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
    description:
      "S9 SiP, brighter display, double tap gesture, advanced health and fitness features.",
    rating: 4.7,
    reviews: 1876,
    featured: false,
    discount: 7,
    inStock: true,
  },
  {
    id: 7,
    name: "Winter Puffer Jacket",
    price: 119,
    originalPrice: 199,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400",
    description:
      "Water-resistant, thermal insulation, multiple pockets, perfect for cold weather.",
    rating: 4.4,
    reviews: 892,
    featured: false,
    discount: 40,
    inStock: true,
  },
  {
    id: 8,
    name: "Travel Backpack",
    price: 59,
    originalPrice: 89,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    description:
      "Water-resistant nylon, laptop compartment, USB charging port, anti-theft design.",
    rating: 4.7,
    reviews: 2156,
    featured: false,
    discount: 34,
    inStock: true,
  },
  {
    id: 9,
    name: "Wireless Earbuds",
    price: 79,
    originalPrice: 129,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
    description:
      "Active noise cancellation, 24-hour battery life, IPX4 water resistance.",
    rating: 4.5,
    reviews: 987,
    featured: false,
    discount: 39,
    inStock: true,
  },
  {
    id: 10,
    name: "Cashmere Sweater",
    price: 89,
    originalPrice: 159,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1434389674359-46e8f24aa1ce?w=400",
    description:
      "100% Mongolian cashmere, ultra-soft, available in multiple colors.",
    rating: 4.8,
    reviews: 543,
    featured: true,
    discount: 44,
    inStock: true,
  },
];

// ========== HELPER FUNCTIONS ==========
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = "";
  for (let i = 0; i < fullStars; i++) stars += "★";
  if (hasHalfStar) stars += "½";
  for (let i = stars.length; i < 5; i++) stars += "☆";
  return stars;
}

function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}

// ========== CART FUNCTIONS ==========
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, quantity = 1) {
  let cart = getCart();
  let item = cart.find((i) => i.id === id);

  if (item) {
    item.qty += quantity;
  } else {
    cart.push({ id, qty: quantity });
  }

  saveCart(cart);
  updateCartCount();

  // Show toast notification
  const product = products.find((p) => p.id === id);
  showToast(`✓ ${product.name} added to cart!`);
}

function showToast(message) {
  let toast = document.querySelector(".toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== id);
  saveCart(cart);
  updateCartCount();
  if (window.location.pathname.includes("cart.html")) displayCart();
}

function updateQuantity(id, newQty) {
  if (newQty < 1) {
    removeFromCart(id);
    return;
  }
  let cart = getCart();
  let item = cart.find((i) => i.id === id);
  if (item) {
    item.qty = newQty;
    saveCart(cart);
    updateCartCount();
    if (window.location.pathname.includes("cart.html")) displayCart();
  }
}

function clearCart() {
  if (confirm("Are you sure you want to clear your entire cart?")) {
    saveCart([]);
    updateCartCount();
    if (window.location.pathname.includes("cart.html")) displayCart();
    showToast("Cart has been cleared.");
  }
}

function checkout() {
  let cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty! Add some items first.");
    return;
  }
  alert("Thank you for your purchase! Your order has been placed.");
  saveCart([]);
  updateCartCount();
  if (window.location.pathname.includes("cart.html")) displayCart();
}

function updateCartCount() {
  let cart = getCart();
  let count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll("#cart-count").forEach((el) => {
    if (el) el.innerText = count;
  });
}

// ========== DISPLAY FUNCTIONS (Enhanced Card UI) ==========
function displayProducts(list, containerId) {
  let container = document.getElementById(containerId);
  if (!container) return;

  if (!list || list.length === 0) {
    container.innerHTML = `<div class="empty-cart"><span>🔍</span><p>No products found.</p></div>`;
    return;
  }

  container.innerHTML = list
    .map(
      (p) => `
        <div class="card" data-id="${p.id}">
            ${p.featured ? '<div class="featured-badge">🔥 Featured</div>' : ""}
            ${p.discount ? `<div class="discount-badge">-${p.discount}%</div>` : ""}
            <div class="card-image">
                <a href="product-detail.html?id=${p.id}">
                    <img src="${p.image}" alt="${p.name}">
                </a>
                ${!p.inStock ? '<div class="out-of-stock">Out of Stock</div>' : ""}
            </div>
            <div class="card-content">
                <a href="product-detail.html?id=${p.id}" class="product-link">
                    <h3>${p.name}</h3>
                </a>
                <div class="rating">
                    <span class="stars">${renderStars(p.rating)}</span>
                    <span class="review-count">(${formatNumber(p.reviews)})</span>
                </div>
                <p class="product-description-short">${p.description.substring(0, 80)}${p.description.length > 80 ? "..." : ""}</p>
                <div class="price-section">
                    <span class="current-price">$${p.price}</span>
                    ${p.originalPrice ? `<span class="original-price">$${p.originalPrice}</span>` : ""}
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${p.id})">
                    🛒 Add to Cart
                </button>
            </div>
        </div>
    `,
    )
    .join("");
}

function displayProductDetail() {
  let params = new URLSearchParams(window.location.search);
  let id = parseInt(params.get("id"));
  let product = products.find((p) => p.id === id);
  let container = document.getElementById("product-detail");

  if (!container) return;

  if (!product) {
    container.innerHTML = `<div class="empty-cart"><span>🔍</span><h2>Product Not Found</h2></div>`;
    return;
  }

  let categoryDisplay =
    product.category === "electronics" ? "💻 Electronics" : "👕 Clothing";

  container.innerHTML = `
        <div class="detail">
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.discount ? `<div class="detail-discount">-${product.discount}%</div>` : ""}
            </div>
            <div class="detail-info">
                <span class="product-category">${categoryDisplay}</span>
                <h2>${product.name}</h2>
                <div class="detail-rating">
                    <span class="stars">${renderStars(product.rating)}</span>
                    <span class="review-count">${product.reviews} reviews</span>
                </div>
                <div class="detail-price">
                    <span class="current-price">$${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ""}
                    ${product.discount ? `<span class="saved">Save $${product.originalPrice - product.price}</span>` : ""}
                </div>
                <p class="detail-description">${product.description}</p>
                <div class="stock-status ${product.inStock ? "in-stock" : "out-of-stock"}">
                    ${product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                </div>
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <div class="quantity-controls">
                        <button class="qty-btn" id="qtyMinus">−</button>
                        <span id="quantityValue">1</span>
                        <button class="qty-btn" id="qtyPlus">+</button>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="btn-add-cart" id="addToCartBtn">🛒 Add to Cart</button>
                    <button class="btn-buy-now" id="buyNowBtn">⚡ Buy Now</button>
                </div>
            </div>
        </div>
    `;

  let quantity = 1;
  const quantitySpan = document.getElementById("quantityValue");
  document.getElementById("qtyMinus")?.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantitySpan.innerText = quantity;
    }
  });
  document.getElementById("qtyPlus")?.addEventListener("click", () => {
    quantity++;
    quantitySpan.innerText = quantity;
  });
  document
    .getElementById("addToCartBtn")
    ?.addEventListener("click", () => addToCart(product.id, quantity));
  document.getElementById("buyNowBtn")?.addEventListener("click", () => {
    addToCart(product.id, quantity);
    window.location.href = "cart.html";
  });
}

function displayCart() {
  let cart = getCart();
  let container = document.getElementById("cart-items");
  let totalContainer = document.getElementById("total-container");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart"><span>🛍️</span><p>Your cart is empty</p><a href="products.html" class="btn">Start Shopping →</a></div>`;
    if (totalContainer) totalContainer.innerHTML = "";
    return;
  }

  let total = 0;
  let itemsHtml = "";

  cart.forEach((item) => {
    let product = products.find((p) => p.id === item.id);
    if (!product) return;
    let itemTotal = product.price * item.qty;
    total += itemTotal;
    itemsHtml += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-info">
                    <h3>${product.name}</h3>
                    <p class="cart-item-price">$${product.price} each</p>
                    ${product.originalPrice ? `<p class="cart-item-saved">Saved $${(product.originalPrice - product.price) * item.qty}</p>` : ""}
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.qty - 1})">−</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.qty + 1})">+</button>
                </div>
                <div class="item-total">$${itemTotal}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
  });

  container.innerHTML = itemsHtml;
  if (totalContainer) {
    totalContainer.innerHTML = `
            <div class="total-section">
                <div class="total-left">
                    <div><strong>Subtotal</strong></div>
                    <div class="total-items">${cart.reduce((sum, i) => sum + i.qty, 0)} items</div>
                </div>
                <div class="total-right">
                    <div class="total-amount">$${total.toFixed(2)}</div>
                    <div class="total-actions">
                        <button class="btn-clear" onclick="clearCart()">Clear Cart</button>
                        <button class="btn-checkout" onclick="checkout()">Proceed to Checkout →</button>
                    </div>
                </div>
            </div>
        `;
  }
}

function filterProducts() {
  let search = document.getElementById("search")?.value.toLowerCase() || "";
  let category = document.getElementById("category-filter")?.value || "all";
  let filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search) &&
      (category === "all" || p.category === category),
  );
  displayProducts(filtered, "product-list");
}

// ========== CONTACT FORM ==========
function setupContactForm() {
  let form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your message has been sent successfully.");
      form.reset();
    });
  }
}

// ========== INITIALIZE ==========
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupContactForm();

  // Home page - featured products (first 4 featured items)
  if (document.getElementById("featured-products")) {
    let featuredProducts = products.filter((p) => p.featured).slice(0, 4);
    displayProducts(featuredProducts, "featured-products");
  }

  // Products page
  if (document.getElementById("product-list")) {
    displayProducts(products, "product-list");
    let search = document.getElementById("search");
    let filter = document.getElementById("category-filter");
    if (search) search.addEventListener("input", filterProducts);
    if (filter) filter.addEventListener("change", filterProducts);
  }

  // Product detail page
  if (document.getElementById("product-detail")) {
    displayProductDetail();
  }

  // Cart page
  if (document.getElementById("cart-items")) {
    displayCart();
  }
});

window.addEventListener("pageshow", () => updateCartCount());
