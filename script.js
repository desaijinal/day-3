let pname = document.getElementById('pname');
let pdescription = document.getElementById('pdescription');
let pcatagory = document.getElementById('pcatagory');
let pPrice = document.getElementById('pPrice');

const button = document.getElementById('btn');
const cardbody = document.querySelector("#cards-container");

let cart = []; 

button.addEventListener('click', () => {
    let data = JSON.parse(localStorage.getItem('products')) || [];

    data.push({
        pname: pname.value,
        pdescription: pdescription.value,
        pcatagory: pcatagory.value,
        pPrice: pPrice.value,
    });

    localStorage.setItem('products', JSON.stringify(data));

    pname.value = '';
    pdescription.value = '';
    pcatagory.value = '';
    pPrice.value = '';

    loadData();
});

const loadData = () => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ""; 

    const data = JSON.parse(localStorage.getItem('products')) || [];

    data.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        cardElement.innerHTML = `
          <h3>${card.pname}</h3>
          <p>${card.pdescription}</p>
          <p>${card.pcatagory}</p>
          <h5>${card.pPrice}</h5>
          <button id="addbtn-${index}" class="add-btn" onclick="addToCart(${index})">Add to Cart</button>
        `;
        
        cardsContainer.appendChild(cardElement);
    });
};

const addToCart = (index) => {
    const data = JSON.parse(localStorage.getItem('products')) || [];
    const product = data[index];

    let cart = JSON.parse(localStorage.getItem('carts')) || [];
    cart.push(product);
    localStorage.setItem('carts', JSON.stringify(cart));

    updateCartButton();
};

const updateCartButton = () => {
    const cartButton = document.getElementById('cartbtn');
    const cartData = JSON.parse(localStorage.getItem('carts')) || [];
    cartButton.textContent = `Cart (${cartData.length})`;
};

const showCart = () => {
    const cartContainer = document.getElementById('cart-container');
    const cartItemsContainer = document.getElementById('cart-items-container');

    const cartData = JSON.parse(localStorage.getItem('carts')) || [];

    cartItemsContainer.innerHTML = ''; 

    cartData.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${product.pname}</h3>
            <p>${product.pdescription}</p>
            <p>${product.pcatagory}</p>
            <h5>${product.pPrice}</h5>
            <button class="removebtn" onclick="removeData(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartContainer.style.display = 'block'; 
};

const clearCart = () => {
    localStorage.removeItem('carts');
    updateCartButton();
    document.getElementById('cart-items-container').innerHTML = ''; 
    document.getElementById('cart-container').style.display = 'none'; 
};

document.getElementById('cartbtn').addEventListener('click', showCart);

const removeData = (index) => {
    const cartData = JSON.parse(localStorage.getItem('carts')) || [];
    cartData.splice(index, 1);
    localStorage.setItem('carts', JSON.stringify(cartData));
    updateCartButton();
    showCart();
};

loadData();
updateCartButton();
