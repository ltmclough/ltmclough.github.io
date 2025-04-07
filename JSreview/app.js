
const itemsForSale = [
    { name: "Eggs", price: 8.99, image: "https://" },
    { name: "Apples", price: 5.99, image: "https://" },
    { name: "Cheese", price: 9.99, image: "https://" }
];

let cart = [];

function displayItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; // Clear the current list

    itemsForSale.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button class="add-to-cart" data-name="${item.name}">Add to Cart</button>
        `;

        itemList.appendChild(itemDiv);
    });

    // Attach event listeners for "Add to Cart" buttons
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}
function addToCart(event) {
    const itemName = event.target.dataset.name;
    const item = itemsForSale.find(item => item.name === itemName);

    cart.push(item);

    updateCart();
}
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    cartItems.innerHTML = ''; // Clear the current cart

    let total = 0;

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button class="remove-from-cart" data-index="${index}">Remove from Cart</button>
        `;

        cartItems.appendChild(cartItemDiv);

        total += item.price;
    });

    totalPrice.textContent = total.toFixed(2);

    // Attach event listeners for "Remove from Cart" buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}
function removeFromCart(event) {
    const index = event.target.dataset.index;
    
    cart.splice(index, 1);

    updateCart();
}

displayItems();
