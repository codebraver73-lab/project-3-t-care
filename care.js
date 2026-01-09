document.getElementById("menu-btn").addEventListener("click", () => {
  document.getElementById("nav-bar").classList.toggle("active");
});

/*Preloader*/
window.addEventListener("load",function(){
    document.getElementById("preloader").style.display="none";
}) ;

/* cart section*/
document.getElementById("cart1").addEventListener("click", () => {
  document
    .getElementById("shopping-menu1")
    .classList.toggle("cart-active");
    document.getElementById("linear-gradient-div").classList.toggle("cart-active1");
});




/** real js now*/








let cartData = JSON.parse(localStorage.getItem("cartData")) || {};

/* =========================
   PRODUCT ↔ CART DIV MAP
========================= */
const productMap = {
  "Blood pressure machine": "item-in-cart-bloodpressuremachine",
  "Surgical masks": "item-in-cart-surgicalmask",
  "Comode Wheelchair": "item-in-cart-comodewheelchair",
  "Oxygen machine": "item-in-cart-oxygenmachine"
};


/* =========================
   ADD ITEM (+ BUTTON)
========================= */
document.querySelectorAll(".plus-button").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".cards");
    const name = card.querySelector(".item-name").textContent;

    if (!productMap[name]) return;

    cartData[name] = (cartData[name] || 0) + 1;

    saveCart();
    updateCartUI();
  });
});


/* =========================
   REMOVE ITEM (− BUTTON)
========================= */
document.querySelectorAll(".trash-icon").forEach(icon => {
  icon.addEventListener("click", () => {
    const cartItem = icon.closest(".item-in-cart");
    const name = cartItem.querySelector(".item-information p").textContent;

    if (!cartData[name]) return;

    cartData[name]--;

    if (cartData[name] <= 0) {
      delete cartData[name];
    }

    saveCart();
    updateCartUI();
  });
});


/* =========================
   UPDATE CART UI
========================= */
function updateCartUI() {
  let hasItems = false;

  // Hide all items first
  Object.values(productMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  for (let name in cartData) {
    const itemId = productMap[name];
    if (!itemId) continue;

    const cartItem = document.getElementById(itemId);
    const qtyBox = cartItem.querySelector(".number");

    cartItem.style.display = "flex";
    qtyBox.textContent = cartData[name];

    hasItems = true;
  }

  document.getElementById("shopping-menu-btn1").style.display =
    hasItems ? "block" : "none";
}


/* =========================
   SAVE + LOAD
========================= */
function saveCart() {
  localStorage.setItem("cartData", JSON.stringify(cartData));
}


document.getElementById("shopping-menu-btn1").addEventListener("click",function(){
  alert("Transaction successfull.");
  cartData = {};
  localStorage.removeItem("cartData");

  // 2. Hide all cart items & reset quantities
  Object.values(productMap).forEach(id => {
    const cartItem = document.getElementById(id);
    cartItem.style.display = "none";
    cartItem.querySelector(".number").textContent = "";
  });
  document.getElementById("shopping-menu-btn1").style.display="none";


});



window.addEventListener("load", updateCartUI);

