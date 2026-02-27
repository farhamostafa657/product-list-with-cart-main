/* Elemens*/

const productList = document.getElementById("products-list");
const emptyCart = document.getElementById("empty-cart");
const fullCart = document.getElementById("full-cart");

/**list of products */
let cart = [];

const products = [
  {
    id: 0,
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
    image: "./assets/images/image-waffle-desktop.jpg",
    quantity: 0,
  },
  {
    id: 1,
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
    image: "./assets/images/image-creme-brulee-mobile.jpg",
    quantity: 0,
  },
  {
    id: 2,
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
    image: "./assets/images/image-macaron-mobile.jpg",
    quantity: 0,
  },
  {
    id: 3,
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
    image: "./assets/images/image-tiramisu-mobile.jpg",
    quantity: 0,
  },
  {
    id: 4,
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
    image: "./assets/images/image-baklava-mobile.jpg",
    quantity: 0,
  },
  {
    id: 5,
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
    image: "./assets/images/image-meringue-mobile.jpg",
    quantity: 0,
  },
  {
    id: 6,
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
    image: "./assets/images/image-cake-mobile.jpg",
    quantity: 0,
  },
  {
    id: 7,
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
    image: "./assets/images/image-brownie-mobile.jpg",
    quantity: 0,
  },
  {
    id: 8,
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
    image: "./assets/images/image-panna-cotta-mobile.jpg",
    quantity: 0,
  },
];

/**logic */

productList.innerHTML = products.map(
  (p) => `
    <div class="product select">
          <img onclick="addToCart(${p.id})" id="img-${p.id}" src="${p.image}" alt="${p.name}" />
          <button id="btn-${p.id}" onclick="addToCart(${p.id})" class="add-btn">
            <span
              ><img src="./assets/images/icon-add-to-cart.svg" alt="" /></span
            >Add to Cart
          </button>

          <button id="quantity-${p.id}" class="quantity-btn">
            <span  onclick="minus(${p.id})"
              ><img src="./assets/images/icon-decrement-quantity.svg" alt=""
            /></span>

            <span id="counter-${p.id}">1</span>
              
             
           
            <span onclick="add(${p.id})"
              ><img src="./assets/images/icon-increment-quantity.svg" alt=""
            /></span>
          </button>
          <h3>${p.name}</h3>
          <p>${p.category}</p>
          <p class="price">$${p.price.toFixed(2)}</p>
        </div>
    
    `,
);

function renderProducts() {
  productList.innerHTML = products.map(
    (p) => `
    <div class="product select">
          <img onclick="addToCart(${p.id})" id="img-${p.id}" src="${p.image}" alt="${p.name}" />
          <button id="btn-${p.id}" onclick="addToCart(${p.id})" class="add-btn">
            <span
              ><img src="./assets/images/icon-add-to-cart.svg" alt="" /></span
            >
            <span class="add-to-cart-btn">Add to Cart</span>
          </button>

          <button id="quantity-${p.id}" class="quantity-btn">
            <span  onclick="minus(${p.id})"
              ><img src="./assets/images/icon-decrement-quantity.svg" alt=""
            /></span>

            <span id="counter-${p.id}">1</span>
              
             
           
            <span onclick="add(${p.id})"
              ><img src="./assets/images/icon-increment-quantity.svg" alt=""
            /></span>
          </button>
          <h3>${p.name}</h3>
          <p>${p.category}</p>
          <p class="price">$${p.price.toFixed(2)}</p>
        </div>
    
    `,
  );
}

renderProducts();

function add(id) {
  const counter = document.getElementById(`counter-${id}`);
  const product = products.find((p) => p.id == id);

  const exists = cart.some((el) => el.id == id);

  if (exists) {
    cart = cart.map((el) =>
      el.id == id ? { ...el, quantity: el.quantity + 1 } : el,
    );
  } else {
    cart = [...cart, { ...product, quantity: 1 }];
  }

  const updatedProduct = cart.find((el) => el.id == id);
  counter.innerHTML = updatedProduct.quantity;
  let cartProduct = cart.find((el) => el.id == id);

  if (!cartProduct || cart.length === 0) {
    const img = document.getElementById(`img-${id}`);
    const btn = document.getElementById(`btn-${id}`);
    const quantityBtn = document.getElementById(`quantity-${id}`);

    img.style.border = "none";
    btn.style.display = "flex";
    quantityBtn.style.display = "none";
  }

  displayEmptyCart();
  displayFullCart();
}

function minus(id) {
  const counter = document.getElementById(`counter-${id}`);

  const exists = cart.some((el) => el.id == id);

  if (!exists) return;

  cart = cart
    .map((el) => (el.id == id ? { ...el, quantity: el.quantity - 1 } : el))
    .filter((el) => el.quantity > 0);

  const updatedProduct = cart.find((el) => el.id == id);

  counter.innerHTML = updatedProduct ? updatedProduct.quantity : 1;
  let cartProduct = cart.find((el) => el.id == id);

  if (!cartProduct || cart.length === 0) {
    const img = document.getElementById(`img-${id}`);
    const btn = document.getElementById(`btn-${id}`);
    const quantityBtn = document.getElementById(`quantity-${id}`);

    img.style.border = "none";
    btn.style.display = "flex";
    quantityBtn.style.display = "none";
  }

  displayEmptyCart();
  displayFullCart();
}

function addToCart(id) {
  const btn = document.getElementById(`btn-${id}`);
  const quantityBtn = document.getElementById(`quantity-${id}`);
  const product = products.find((p) => p.id == id);
  const img = document.getElementById(`img-${id}`);
  const emptyCart = document.getElementById("empty-cart");

  img.style.border = " solid 2px hsl(14, 86%, 42%)";
  btn.style.display = "none";
  quantityBtn.style.display = "flex";
  cart = cart.some((el) => el.id == id)
    ? cart.map((el) =>
        el.id == id ? { ...el, quantity: el.quantity + 1 } : el,
      )
    : [...cart, { ...product, quantity: 1 }];
  let cartProduct = cart.find((el) => el.id == id);

  if (cartProduct.quantity == 0 || cart.length == 0) {
    img.style.border = "none";
    btn.style.display = "flex";
    quantityBtn.style.display = "none";
  }

  displayEmptyCart();
  displayFullCart();
}

function displayEmptyCart() {
  const emptyCart = document.getElementById("empty-cart");

  if (cart.length >= 1) {
    emptyCart.style.display = "none";
  } else {
    emptyCart.style.display = "flex";
  }

  console.log(cart.length);
  console.log(cart);
}

function displayFullCart() {
  if (cart.length === 0) {
    fullCart.style.display = "none";
    return;
  }
  fullCart.style.display = "flex";
  let cartPrice = cart.map((p) => p.quantity * p.price);
  let total = cartPrice.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  fullCart.innerHTML = `
   <p>Your Cart (<span>${cart.length}</span>)</p>
        <div class="items">
          ${cart
            .map(
              (p) => `
              <div class="item">
            <p>${p.name}</p>
            <span class="close-icon"
              ><img src="./assets/images/icon-remove-item.svg" alt=""
            /></span>
            <div class="item-price">
              <span>${p.quantity}x</span> <span>@$${p.price}</span> <span>$${p.quantity * p.price}</span>
            </div>
            </div>`,
            )
            .join("")}
          </div>
          
              <div class="order-total">
          <p>order total</p>
          <p>$${total}</p>
        </div>

        <div class="carbon-nuetral">
          <span
            ><img src="./assets/images/icon-carbon-neutral.svg" alt=""
          /></span>
          <p>this is <span>carbon-nuetral</span> delivery</p>
        </div>

        <button  class="confirm-order" onclick="showConfirmOrder">Confirm Order</button>
          
          `;
}

displayEmptyCart();

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("confirm-order")) {
    showConfirmOrder();
  }
});

function showConfirmOrder() {
  const confirmContainer = document.getElementById("confirm-order");

  const total = cart.reduce((acc, el) => {
    return acc + el.quantity * el.price;
  }, 0);

  confirmContainer.style.display = "flex";

  confirmContainer.innerHTML = `
    <div class="order-card">

      <div class="icon-order">
        <img src="./assets/images/icon-order-confirmed.svg" alt="" />
      </div>

      <div class="order-header">
        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>
      </div>

      <div class="order-items">
        ${cart
          .map(
            (el) => `
            <div class="order-item">
              <img
                class="img-order"
                src="${el.image}"
                alt=""
              />

              <div class="order-info">
                <p>${el.name}</p>
                <div class="item-price">
                  <span>${el.quantity}x</span>
                  <span>@ $${el.price}</span>
                </div>
              </div>

              <p class="order-price">$${el.quantity * el.price}</p>
            </div>
          `,
          )
          .join("")}
      </div>

      <div class="order-total">
        <p>Order Total</p>
        <h3>$${total}</h3>
      </div>

      <button class="new-order">Start New Order</button>

    </div>
  `;

  document.querySelector(".new-order").addEventListener("click", () => {
    cart = [];
    fullCart.style.display = "none";
    emptyCart.style.display = "flex";
    confirmContainer.style.display = "none";
    document.body.style.overflow = "auto";
    renderProducts();
  });
}
