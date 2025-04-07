// 1. Define items for sale
const itemsForSale = [
    { name: "Item 1", price: 19.99, image: "https://via.placeholder.com/150" },
    { name: "Item 2", price: 29.99, image: "https://via.placeholder.com/150" },
    { name: "Item 3", price: 39.99, image: "https://via.placeholder.com/150" }
];

// 2. Define the cart array to store items added to the cart
let cart = [];

// 3. Function to display items for sale
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

// 4. Function to add items to the cart
function addToCart(event) {
    const itemName = event.target.dataset.name;
    const item = itemsForSale.find(item => item.name === itemName);

    // Add item to cart
    cart.push(item);

    // Update the cart display
    updateCart();
}

// 5. Function to display the cart contents and calculate total
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

        // Update total price
        total += item.price;
    });

    // Update total price display
    totalPrice.textContent = total.toFixed(2);

    // Attach event listeners for "Remove from Cart" buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// 6. Function to remove items from the cart
function removeFromCart(event) {
    const index = event.target.dataset.index;
    
    // Remove item from cart
    cart.splice(index, 1);

    // Update the cart display
    updateCart();
}

// Initialize the page
displayItems();
