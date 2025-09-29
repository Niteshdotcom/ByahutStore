let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    total += price;
    saveCart();
    updateCart();
    toggleCart(true);
}

function updateCart() {
    let cartList = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let totalDisplay = document.getElementById("total");

    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">❌</button>`;
        cartList.appendChild(li);
    });

    cartCount.textContent = cart.length;
    totalDisplay.textContent = `Total: ₹${total}`;
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function clearCart() {
    cart = [];
    total = 0;
    saveCart();
    updateCart();
}

function toggleCart(forceOpen = false) {
    let cartSidebar = document.getElementById("cart-sidebar");
    if (forceOpen) {
        cartSidebar.classList.add("active");
    } else {
        cartSidebar.classList.toggle("active");
    }
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Search filter
document.getElementById("search").addEventListener("input", function() {
    let query = this.value.toLowerCase();
    document.querySelectorAll(".product").forEach((product) => {
        let name = product.querySelector("h3").textContent.toLowerCase();
        product.style.display = name.includes(query) ? "block" : "none";
    });
});

// Cart button toggle
document.getElementById("cart-btn").addEventListener("click", function(e) {
    e.preventDefault();
    toggleCart();
});

// Initialize cart display
updateCart();