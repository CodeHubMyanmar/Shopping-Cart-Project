let productDiv = document.querySelector("#product-div");
let cartsDiv = document.querySelector(".carts-table");
let showDiv = document.querySelector(".show");

// Render Products
function renderProducts() {
  products.forEach((product) => {
    productDiv.innerHTML += `
    <div class="col-12 col-lg-6 mb-4">
        <div class="card">
            <div class="card-body">
                <img src="${product.src}" class="w-100" />
                <hr />
                <p class="fs-5 fw-bold">${product.name}</p>
                <p>
                    Price - <span class="text-primary fs-5 fw-bold">$ ${product.price}</span>
                </p>
                <div class="btn btn-primary w-100 cart-btn fs-6 fw-bold" onclick="addtoCarts(${product.id})">
                    Add to cart
                </div>
            </div>
        </div>
    </div>`;
  });
}
renderProducts();

// cart array
let carts = JSON.parse(localStorage.getItem("productCarts")) || [];

// add to carts array
function addtoCarts(id) {
  if (carts.some((cart) => cart.id === id)) {
    changeQuantity("plus", id);
  } else {
    let cart = products.find((product) => product.id === id);
    carts.push({
      ...cart,
      quantity: 1,
    });
  }
  updateCarts();
}

// render prodct carts
function renderProductsCarts() {
  showDiv.innerHTML = "";
  cartsDiv.innerHTML = "";
  carts.forEach((cart) => {
    cartsDiv.innerHTML += `
    <tr>
      <td>
        <img src="${cart.src}" id="img-cart" title="${cart.name}" />
      </td>
      <td><p class="fs-5 pt-2">$ ${cart.price}</p></td>
      <td>
        <i
          class="fa-solid fa-circle-minus fs-5 text-primary pt-3" onclick="changeQuantity('minus',${cart.id})"
        ></i
        ><span class="mx-2 fs-5 pt-3">${cart.quantity}</span
        ><i
          class="fa-solid fa-circle-plus fs-5 text-primary pt-3" onclick="changeQuantity('plus',${cart.id})"
        ></i>
      </td>
      <td>
        <i
          class="fa-solid fa-trash text-danger fs-5 pt-3" onclick="removeCart(${cart.id})"
          title="Remove"
        ></i>
      </td>
    </tr>
    `;
  });
  show_hide();
}

// change quantity
function changeQuantity(codition, id) {
  carts = carts.map((cart) => {
    let quantity = cart.quantity;

    if (cart.id === id) {
      if (codition == "plus") {
        quantity++;
      } else if (codition == "minus" && quantity > 1) {
        quantity--;
      }
    }

    return {
      ...cart,
      quantity,
    };
  });

  updateCarts();
}

// total price and cart number
function renderNumber() {
  let totalprice = 0,
    totalcart = 0;
  carts.forEach((cart) => {
    totalprice += cart.price * cart.quantity;
    totalcart += cart.quantity;
  });

  document.querySelector("#totalPrice").innerText = `$ ${totalprice}`;
  document.querySelector("#totalCart").innerText = `${totalcart}`;
}

// remove carts
function removeCart(id) {
  carts = carts.filter((cart) => cart.id !== id);
  updateCarts();
}

// show hide
function show_hide() {
  if (!cartsDiv.innerHTML) {
    showDiv.innerHTML = `<h5 class="my-3 text-center text-primary">No item in cart.</h5>
              <hr />`;
  }
}

// update on everything
function updateCarts() {
  renderProductsCarts();
  renderNumber();
  localStorage.setItem("productCarts", JSON.stringify(carts));
}

updateCarts();
