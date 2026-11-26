
let cart = [];
let selectedCategory = "All";

const foodCards = document.querySelectorAll(".food-card");
const searchInput = document.getElementById("searchInput");

function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cartCount").textContent =
        `${count} Items`;

    document.getElementById("cartTotal").textContent =
        `₹${total}`;
}

document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
    });
});

function filterFood() {
    const searchText = searchInput.value.toLowerCase();

    foodCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = name.includes(searchText);
        const matchesCategory =
            selectedCategory === "All" ||
            category === selectedCategory;

        card.classList.toggle(
            "hidden",
            !(matchesSearch && matchesCategory)
        );
    });
}

searchInput.addEventListener("input", filterFood);

document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".category.active")
            .classList.remove("active");

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        filterFood();
    });
});

document.getElementById("cartButton").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const orderDetails = cart.map(item =>
        `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join("\n");

    alert(
        "Your Cart:\n\n" + orderDetails +
        "\n\nTotal: " +
        cart.reduce((sum, item) =>
            sum + item.price * item.quantity, 0)
    );
});

updateCart();
