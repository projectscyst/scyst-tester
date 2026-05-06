let products = [
  { id: 1, name: "💧Aqua pure", price: 20, desc: "Fresh purified water"},
  { id: 2, name: "🍊Tropical orange", price: 50, desc: "Sweet orange drink"},
  { id: 3, name: "☕Dream coffee", price: 36, desc: "Rich coffee blend"},
  { id: 4, name: "🍬 Sour candy", price: 21, desc: "Craving candy with a punch?." },
  { id: 5, name: "🥛Premium Milk", price: 79, desc: "Fresh premium milk"},
];

let cart = [];

function displayProducts() {
  let container = document.getElementById("productList");
  container.innerHTML = "";

  products.forEach((p) => {
    let div = document.createElement("div");
    div.className = "product";

    let inCart = cart.find((item) => item.id === p.id);

    div.innerHTML = `
                <p> ${p.name}</p>
                <small>${p.desc}</small>
                <p>Price: ₱${p.price}</p>
                <button onclick="addToCart(${p.id})" ${inCart ? "disabled" : ""}>
                    ${inCart ? "Already in cart" : "🛒Add to Cart"}
                </button>
            `;

    container.appendChild(div);
  });
}

function addToCart(id) {
  let existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++; 
  } else {
    let product = products.find(p => p.id === id);

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
    });
  }

  updateCart();
}

function updateCart() {
  let cartDiv = document.getElementById("cartItems");
  let total = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = "Cart is empty";
  } else {
    cartDiv.innerHTML = "";

    cart.forEach((item) => {
      let subtotal = item.price * item.qty;
      total += subtotal;

      let div = document.createElement("div");

      div.innerHTML = `
                    <p>${item.name} - ₱${item.price}</p>
                    <p>Qty: 
                        <button onclick="changeQty(${item.id}, -1)">-</button>
                        ${item.qty}
                        <button onclick="changeQty(${item.id}, 1)">+</button>
                    </p>
                    <p>Subtotal: ₱${subtotal}</p>
                    <button onclick="removeItem(${item.id})">Remove</button>
                    <hr>
                `;

      cartDiv.appendChild(div);
    });
  }

  document.getElementById("total").innerText = total;
  document.getElementById("cartCount").innerText = cart.length;

  displayProducts();
}

function changeQty(id, change) {
  let item = cart.find((i) => i.id === id);

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }

  updateCart();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

displayProducts();
