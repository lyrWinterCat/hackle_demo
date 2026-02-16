function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// product: {id, name, price, category, stock}
function addToCart(product, quantity = 1) {
  const cart = getCart();
  const found = cart.find(i => i.productId === product.id);

  if (found) {
    found.quantity += quantity;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: quantity
    });
  }

  saveCart(cart);
  return cart;
}

function updateQuantity(productId, newQty) {
  const cart = getCart();
  const item = cart.find(i => i.productId === productId);
  if (!item) return cart;

  item.quantity = Math.max(1, parseInt(newQty || "1", 10));
  saveCart(cart);
  return cart;
}

function removeFromCart(productId) {
  const cart = getCart().filter(i => i.productId !== productId);
  saveCart(cart);
  return cart;
}

function clearCart() {
  localStorage.removeItem("cart");
}

function cartTotalAmount(cart = getCart()) {
  return cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

function cartItemCount(cart = getCart()) {
  return cart.reduce((sum, i) => sum + i.quantity, 0);
}
