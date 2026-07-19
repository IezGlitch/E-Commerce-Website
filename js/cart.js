// ============================================================
//  GramBazaar — cart.js
//  Cart page rendering and checkout flow
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

function renderCart() {
  const cart = window.GB_CART.getCart();
  const container = document.getElementById('cart-items');
  const summaryEl = document.getElementById('cart-summary');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Visit our marketplace and support rural artisans!</p>
        <a href="shop.html" class="btn btn-primary mt-24">Browse Products</a>
      </div>`;
    if (summaryEl) summaryEl.style.display = 'none';
    return;
  }

  container.innerHTML = cart.map(item => buildCartItem(item)).join('');
  if (summaryEl) summaryEl.style.display = 'block';
  renderSummary(cart);
  bindCartActions();
}

function buildCartItem(item) {
  const imgSrc = window.GB?.getImagePath(item.image) || '';
  const pct = Math.round((item.artisanShare / item.price) * 100);
  const product = window.GB?.PRODUCTS.find(p => p.id === item.id);
  const stock = product ? product.stock : 99;
  const isCustomRequest = item.qty > stock;

  return `
  <div class="cart-item" data-id="${item.id}" style="${isCustomRequest ? 'border: 2px dashed var(--primary); background: hsl(25, 85%, 98%);' : ''}">
    <div class="cart-item-img">
      ${imgSrc
        ? `<img src="${imgSrc}" alt="${item.name}">`
        : `<div class="cart-img-placeholder">🎁</div>`}
    </div>
    <div class="cart-item-info">
      <h4 class="cart-item-name">${item.name}</h4>
      <p class="cart-item-meta">By <strong>${item.artisanName}</strong> · ${item.village}</p>
      <div class="cart-profit-bar">
        <span class="text-xs" style="color:var(--secondary)">Artisan earns ${pct}% (₹${item.artisanShare.toLocaleString('en-IN')} per unit)</span>
      </div>
      ${isCustomRequest ? `
        <div style="margin-top: 10px; padding: 12px; background: white; border-radius: var(--radius-md); border: 1px solid hsl(25, 85%, 90%); border-left: 4px solid var(--primary);">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary);">🌾 Custom Production Request (Exceeds ${stock} Ready Stock)</span>
          <p style="font-size: 0.72rem; color: var(--mid); margin-top: 2px;">Submit a custom batch offer to the weaver below:</p>
          <div style="margin-top: 8px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 8px;">
            <input type="text" class="form-control" style="font-size: 0.75rem; padding: 6px 10px;" id="custom-specs-${item.id}" placeholder="Specs (e.g., custom colors, size)" value="${item.customSpecs || ''}" onchange="updateCustomSpec('${item.id}', this.value)">
            <input type="number" class="form-control" style="font-size: 0.75rem; padding: 6px 10px;" id="custom-offer-${item.id}" placeholder="Offer Price (₹/unit)" value="${item.customOffer || ''}" onchange="updateCustomOffer('${item.id}', this.value)">
          </div>
        </div>
      ` : ''}
    </div>
    <div class="cart-item-controls">
      <div class="qty-ctrl">
        <button class="qty-btn qty-dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
        <span class="qty-val" id="qty-${item.id}">${item.qty}</span>
        <button class="qty-btn qty-inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
      </div>
      <div class="cart-item-price">₹${((item.customOffer ? parseInt(item.customOffer) : item.price) * item.qty).toLocaleString('en-IN')}</div>
      <button class="cart-remove" data-id="${item.id}" aria-label="Remove item" title="Remove">✕</button>
    </div>
  </div>`;
}

function updateCustomSpec(productId, val) {
  const cart = window.GB_CART.getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.customSpecs = val;
    window.GB_CART.saveCart(cart);
  }
}

function updateCustomOffer(productId, val) {
  const cart = window.GB_CART.getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.customOffer = val ? parseInt(val) : null;
    window.GB_CART.saveCart(cart);
    renderCart(); // re-render to update order summary
  }
}

function renderSummary(cart) {
  const subtotal = cart.reduce((sum, i) => sum + ((i.customOffer ? parseInt(i.customOffer) : i.price) * i.qty), 0);
  const totalArtisanShare = cart.reduce((sum, i) => sum + ((i.customOffer ? Math.round(parseInt(i.customOffer) * 0.93) : i.artisanShare) * i.qty), 0);
  const shipping = subtotal >= 1500 ? 0 : 99;
  const total = subtotal + shipping;
  const artisanPct = subtotal > 0 ? Math.round((totalArtisanShare / subtotal) * 100) : 0;

  const el = document.getElementById('cart-summary-content');
  if (!el) return;

  el.innerHTML = `
    <div class="summary-row">
      <span>Subtotal</span>
      <span>₹${subtotal.toLocaleString('en-IN')}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>${shipping === 0 ? '<span style="color:var(--secondary);font-weight:600">FREE</span>' : '₹' + shipping}</span>
    </div>
    ${shipping > 0 ? `<div class="summary-note">Add ₹${(1500 - subtotal).toLocaleString('en-IN')} more for free shipping</div>` : ''}
    <div class="summary-divider"></div>
    <div class="summary-row summary-total">
      <span>Total</span>
      <span>₹${total.toLocaleString('en-IN')}</span>
    </div>
    <div class="artisan-impact-box">
      <div class="impact-icon">🌾</div>
      <div>
        <strong>₹${totalArtisanShare.toLocaleString('en-IN')} goes directly to artisans</strong>
        <p>${artisanPct}% of your order supports rural makers directly — no middlemen!</p>
      </div>
    </div>
    <button class="btn btn-primary w-full" id="checkout-btn" onclick="handleCheckout()">
      Proceed to Checkout →
    </button>
    <a href="shop.html" class="btn btn-outline w-full mt-8" style="justify-content:center">
      Continue Shopping
    </a>`;
}

function bindCartActions() {
  document.querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const cart = window.GB_CART.getCart();
      const item = cart.find(i => i.id === id);
      if (item) {
        window.GB_CART.updateQty(id, item.qty + 1);
        renderCart();
      }
    });
  });

  document.querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const cart = window.GB_CART.getCart();
      const item = cart.find(i => i.id === id);
      if (item && item.qty > 1) {
        // If decreasing below stock limit, clear custom requests flags
        const product = window.GB?.PRODUCTS.find(p => p.id === id);
        const stock = product ? product.stock : 99;
        const newQty = item.qty - 1;
        if (newQty <= stock) {
          item.customSpecs = "";
          item.customOffer = null;
        }
        window.GB_CART.updateQty(id, newQty);
        renderCart();
      }
    });
  });

  document.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      window.GB_CART.removeFromCart(id);
      const cartItem = document.querySelector(`.cart-item[data-id="${id}"]`);
      if (cartItem) {
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(-20px)';
        cartItem.style.transition = 'all 0.3s ease';
        setTimeout(() => renderCart(), 320);
      }
    });
  });
}

function handleCheckout() {
  const overlay = document.getElementById('checkout-overlay');
  if (overlay) overlay.classList.add('active');
}

function closeCheckout() {
  const overlay = document.getElementById('checkout-overlay');
  if (overlay) overlay.classList.remove('active');
}

function submitOrder(e) {
  if (e) e.preventDefault();
  const overlay = document.getElementById('checkout-overlay');
  if (!overlay) return;

  // Validate form fields
  const name = document.getElementById('c-name').value.trim();
  const phone = document.getElementById('c-phone').value.trim();
  const address = document.getElementById('c-address').value.trim();
  const requests = document.getElementById('c-requests').value.trim();

  if (!name || !phone || !address) {
    showToast("Please fill in all required fields (Name, Phone, Address)", "error");
    return;
  }

  const cart = window.GB_CART.getCart();
  if (cart.length === 0) return;
  const firstItem = cart[0];
  const product = window.GB?.PRODUCTS.find(p => p.id === firstItem.id);
  const stock = product ? product.stock : 99;
  const isCustom = firstItem.qty > stock;

  // Set up the modal container to host the Karigar.Connect screen
  overlay.innerHTML = `
    <div class="checkout-modal" style="max-width: 920px; width: 95%; max-height: 95vh; position: relative;">
      <button class="modal-close" onclick="closeCheckout()" aria-label="Close">✕</button>
      <h2 style="font-family:'Playfair Display', serif; font-size: 1.6rem; color: var(--secondary)">Karigar.Connect™ Demonstration</h2>
      <p class="modal-sub" style="margin-bottom: 20px;">Connecting the e-commerce storefront directly to basic cellular phones in rural India.</p>
      <div id="karigar-connect-demo"></div>
    </div>`;

  const orderDetails = {
    name: firstItem.name,
    qty: firstItem.qty,
    requests: isCustom
      ? `Specs: ${firstItem.customSpecs || "Standard specs"}. Offer: ₹${(firstItem.customOffer || firstItem.price).toLocaleString('en-IN')}/unit`
      : requests || "No special customizations",
    artisanName: firstItem.artisanName,
    village: firstItem.village,
    isCustom: isCustom
  };

  // Launch the simulation
  if (window.GB_KARIGAR) {
    window.GB_KARIGAR.initKarigarDemo(orderDetails);
  }
}
