document.addEventListener('DOMContentLoaded', function () {
    const coffeeTypeSelect = document.getElementById('coffeeType');
    const quantityInput = document.getElementById('quantity');
    const orderButton = document.getElementById('orderButton');
    const orderResult = document.getElementById('orderResult');
    const totalDisplay = document.getElementById('totalDisplay');
    let orders = [];

    // Consigue ordenes de LocalStorage si hay disponibles
    const storedOrders = localStorage.getItem('coffeeShopOrders');
    if (storedOrders) {
        orders = JSON.parse(storedOrders);
        updateOrderResult();
        updateTotalDisplay();
    }

    orderButton.addEventListener('click', function () {
        const coffeeType = coffeeTypeSelect.value;
        const quantity = parseInt(quantityInput.value);

        // Revisar si la cantidad de cafe o el cafe son validos
        if (coffeeType && !isNaN(quantity) && quantity > 0) {
            const totalPrice = calculateTotalPrice(coffeeType, quantity);
            const orderDetails = { coffeeType, quantity, totalPrice };
            orders.push(orderDetails);

            updateOrderResult();
            updateTotalDisplay();

            // Guarda las ordenes en el LocalStorage
            localStorage.setItem('coffeeShopOrders', JSON.stringify(orders));

            coffeeTypeSelect.value = 'espresso';
            quantityInput.value = 1;
        } else {
            alert('Por favor, seleccione un tipo de café válido y una cantidad válida.');
        }
    });

    function calculateTotalPrice(coffeeType, quantity) {
        const coffeePrices = {
            espresso: 2.5,
            latte: 3.0,
            cappuccino: 3.5
        };

        const pricePerCup = coffeePrices[coffeeType];
        return pricePerCup * quantity;
    }

    function updateOrderResult() {
        orderResult.innerHTML = '';
        orders.forEach((order, index) => {
            const orderText = `${order.quantity} ${order.coffeeType}(s) - $${order.totalPrice.toFixed(2)}`;
            const removeButton = document.createElement('button');
            removeButton.innerText = 'Remover';
            removeButton.addEventListener('click', function () {
                orders.splice(index, 1);
                updateOrderResult();
                updateTotalDisplay();

                // Guarda ordenes actualizadas en el LocalStorage
                localStorage.setItem('coffeeShopOrders', JSON.stringify(orders));
            });

            const orderItem = document.createElement('div');
            orderItem.appendChild(document.createTextNode(orderText));
            orderItem.appendChild(removeButton);
            orderResult.appendChild(orderItem);
        });
    }

    function updateTotalDisplay() {
        const total = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        totalDisplay.innerText = `Total: $${total.toFixed(2)}`;
    }
});
