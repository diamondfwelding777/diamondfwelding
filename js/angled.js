const images = [
    "images/products/angled/1x2-raw-1.png",
    "images/products/angled/1x2-painted-1.jpeg",
    "images/products/angled/3x2-raw-1.png",
    "images/products/angled/3x2-painted-1.png",
    "images/products/angled/5x2-raw-1.png",
    "images/products/angled/5x2-patina-1.jpeg"
];

let currentImage = 0;
let quantity = 1;

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += Number(item.quantity);
    });

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function updateImages() {
    let previous = currentImage - 1;
    let next = currentImage + 1;

    if (previous < 0) {
        previous = images.length - 1;
    }

    if (next >= images.length) {
        next = 0;
    }

    document.getElementById("product-image").src = images[currentImage];
    document.getElementById("prev-image").src = images[previous];
    document.getElementById("next-image").src = images[next];
}

function nextImage() {
    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    updateImages();
}

function previousImage() {
    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    updateImages();
}

function updateProduct() {
    const size = document.getElementById("size").value;

    if (size === "1x2") {
        currentImage = 0;
    }

    if (size === "3x2") {
        currentImage = 2;
    }

    if (size === "5x2") {
        currentImage = 4;
    }

    updateImages();
    updatePrice();
}

function getPrice() {
    const size = document.getElementById("size").value;
    const finish = document.getElementById("finish").value;

    let price = 1295;

    if (size === "3x2") {
        price = 1495;
    }

    if (size === "5x2") {
        price = 1895;
    }

    if (finish === "patina") {
        price += 75;
    }

    if (finish === "painted") {
        price += 175;
    }

    return price;
}

function updatePrice() {
    const price = getPrice();

    document.getElementById("price").textContent =
        "$" + price.toFixed(2);
}

function increaseQuantity() {
    quantity++;

    document.getElementById("quantity").textContent = quantity;
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
    }

    document.getElementById("quantity").textContent = quantity;
}

function addToCart() {
    const size = document.getElementById("size").value;
    const finish = document.getElementById("finish").value;

    const item = {
        product: "Angled Planter",
        size: size,
        finish: finish,
        quantity: quantity,
        price: getPrice()
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    window.location.href = "checkout.html";
}

updateProduct();
updateCartCount();