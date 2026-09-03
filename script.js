const orderEmail = "thegardenbasket2026@gmail.com";
let basket = [];

function addToBasket(name, price) {

    const existingItem = basket.find(function(item) {
        return item.name === name;
    });

    if (existingItem) {

        existingItem.quantity += 1;
        existingItem.total += price;

    } else {

        basket.push({
            name: name,
            price: price,
            quantity: 1,
            total: price
        });
    }

    updateBasket();

    document.getElementById("basket").scrollIntoView({
        behavior: "smooth"
    });
}
    });
}


function updateBasket() {

    const basketItems = document.getElementById("basket-items");
    const basketTotal = document.getElementById("basket-total");

    if (basket.length === 0) {

        basketItems.innerHTML = "<p>Your basket is empty.</p>";
        basketTotal.textContent = "0";

        return;
    }

    let total = 0;

    basketItems.innerHTML = "";

    basket.forEach(function(item, index) {

        total += item.price;

        basketItems.innerHTML += `
            <p>
                ${item.name} — $${item.price}
                <button onclick="removeFromBasket(${index})">
                    Remove
                </button>
            </p>
        `;
    });

    basketTotal.textContent = total.toFixed(2);
}


function removeFromBasket(index) {

    basket.splice(index, 1);

    updateBasket();
}


function showOrderForm() {

    if (basket.length === 0) {

        alert("Your basket is empty.");

        return;
    }

    document.getElementById("order-form").style.display = "block";

    document.getElementById("order-form").scrollIntoView({
        behavior: "smooth"
    });
}

function placeOrder(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    let orderDetails = "";

    basket.forEach(function(item) {
        orderDetails +=
            item.name +
            " × " +
            item.quantity +
            " - $" +
            item.total.toFixed(2) +
            "\n";
    });

    let total = 0;

    basket.forEach(function(item) {
        total += item.total;
    });

    const subject = "New Garden Basket Order";

    const body =
        "NEW GARDEN BASKET ORDER\n\n" +
        "Customer: " + name + "\n" +
        "Mobile: " + phone + "\n" +
        "Email: " + email + "\n\n" +
        "ORDER:\n" +
        orderDetails +
        "\nTOTAL: $" + total.toFixed(2) +
        "\n\nCUSTOMER MESSAGE:\n" +
        message;

    window.location.href =
        "mailto:" + orderEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
}
