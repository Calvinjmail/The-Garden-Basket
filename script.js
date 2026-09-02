let basket = [];

function addToBasket(name, price) {

    basket.push({
        name: name,
        price: price
    });

    updateBasket();

    document.getElementById("basket").scrollIntoView({
        behavior: "smooth"
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

    alert(
        "Thanks " + name +
        "! Your order has been recorded."
    );
}
