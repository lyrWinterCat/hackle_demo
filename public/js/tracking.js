// ===== user 식별 =====
if (!localStorage.getItem("userId")) {
  const randomId = "user_" + Math.floor(Math.random() * 100000);
  localStorage.setItem("userId", randomId);
}
const userId = localStorage.getItem("userId");

// ===== 서버로 전송 =====
function track(eventName, properties = {}) {
  const payload = {
    userId,
    eventName,
    properties,
    timestamp: new Date().toISOString()
  };

  // 상세 로깅
  console.group(`TRACK: ${eventName}`);
  console.log("User ID:", userId);
  console.log("Properties:", properties);
  console.log("Full Payload:", JSON.stringify(payload, null, 2));
  console.groupEnd();

  fetch("/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (response.ok) {
        console.log(`[SUCCESS] ${eventName} - 전송 성공`);
        
        // Content-Type 확인 후 적절히 파싱
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text();
        }
      } else {
        console.warn(`[WARNING] ${eventName} - 서버 응답 오류:`, response.status);
        return null;
      }
    })
    .then(data => {
      if (data) {
        console.log(`서버 응답:`, data);
      }
    })
    .catch(error => {
      console.error(`[ERROR] ${eventName} - 전송 실패:`, error.message);
    });
}

// ===== 공통 유틸 =====
function getCartTotals(cart) {
  return {
    total_amount: cart.reduce((s, i) => s + i.price * i.quantity, 0),
    total_quantity: cart.reduce((s, i) => s + i.quantity, 0)
  };
}

// ===== 퍼널 핵심 =====
function trackViewHome() {
  track("view_home", { referrer: document.referrer || "direct" });
}

function trackViewList(category) {
  track("view_product_list", { category });
}

function trackClickProductFromList(product, position) {
  track("click_product", {
    product_id: product.id,
    category: product.category,
    price: product.price,
    position
  });
}

function trackViewDetail(product) {
  track("view_product_detail", {
    product_id: product.id,
    category: product.category,
    price: product.price,
    stock_status: product.stock > 0 ? "in_stock" : "out_of_stock"
  });
}

function trackAddToCart(product, quantity, cartAfter) {
  const totals = getCartTotals(cartAfter);
  
  track("add_to_cart", {
    product_id: product.id,
    product_name: product.name,
    category: product.category,
    price: product.price,
    quantity,
    ...totals
  });
}

function trackViewCart(cart) {
  // 각 상품별로 개별 이벤트 전송
  cart.forEach(item => {
    track("view_cart", {
      product_id: item.productId,
      product_name: item.name,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
      item_amount: item.price * item.quantity
    });
  });
}

function trackUpdateCartQuantity(productId, newQty, cartAfter) {
  const totals = getCartTotals(cartAfter);
  const item = cartAfter.find(i => i.productId === productId);
  
  track("update_cart_quantity", {
    product_id: productId,
    product_name: item ? item.name : '',
    quantity: newQty,
    ...totals
  });
}

function trackRemoveFromCart(productId, cartAfter) {
  const totals = getCartTotals(cartAfter);
  
  track("remove_from_cart", {
    product_id: productId,
    ...totals
  });
}

function trackContinueShopping(cart) {
  const totals = getCartTotals(cart);
  track("continue_shopping", totals);
}

function trackEnterCheckout(cart) {
  const totals = getCartTotals(cart);
  track("enter_checkout", totals);
}

function trackPurchaseComplete(cart) {
  const orderId = "order_" + Date.now();
  const totals = getCartTotals(cart);
  
  // 각 상품별로 개별 구매 완료 이벤트 전송
  cart.forEach(item => {
    track("purchase_complete", {
      order_id: orderId,
      product_id: item.productId,
      product_name: item.name,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
      item_amount: item.price * item.quantity,
      ...totals
    });
  });
}
