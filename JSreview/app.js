const itemsForSale = [
    { name: "Eggs", price: 8.99, image: 'https://via.placeholder.com/150?text=Eggs' },
    { name: "Apples", price: 5.99, image: 'https://via.placeholder.com/150?text=Apples' },
    { name: "Cheese", price: 9.99, image: 'https://via.placeholder.com/150?text=Cheese' }
];

let cart = [];

function displayItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; // Clear the current list
    itemsForSale.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.image}" alt="${item.name}" style="width: 150px; height: 150px;">
            <p>$${item.price.toFixed(2)}</p>
            <label for="quantity-${item.name}">Quantity:</label>
            <input type="number" id="quantity-${item.name}" value="1" min="1">
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
    const quantityInput = document.getElementById(`quantity-${itemName}`);
    const quantity = parseInt(quantityInput.value, 10); // Get quantity from input field
    const item = itemsForSale.find(item => item.name === itemName);

    const existingItem = cart.find(cartItem => cartItem.name === itemName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } 
    else {
        cart.push({ ...item, quantity });
        
    }
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
            <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
            <button class="remove-from-cart" data-index="${index}">Remove from Cart</button>
        `;
        // Add fade-in class for smooth transition effect
        cartItemDiv.classList.add('fade-in');
        cartItems.appendChild(cartItemDiv);
        total += item.price * item.quantity;
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
function removeAllFromCart() {
    cart = [];
    updateCart();

}
// Add the "Remove All" button functionality
const removeAllButton = document.getElementById('removeAll');
removeAllButton.addEventListener('click', removeAllFromCart);

displayItems();
