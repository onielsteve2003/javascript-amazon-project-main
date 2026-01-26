import {cart, removeProduct, calculateCartQuantity, updateQuantity} from "./cart.js"
import {products} from "../data/products.js"
import { formatCurrency } from "../utilities/money.js"



function updateCartQuantity(){
let cartQuantity = calculateCartQuantity();
 document.querySelector('.js-checkout-page').innerHTML = `${cartQuantity} items`
}

updateCartQuantity();

let cartSummaryHTML = '';

cart.forEach((cartItem)=>{
    const productId = cartItem.productId


let matchingProduct ;

products.forEach((product) => {
    if(product.id === productId){
        matchingProduct = product
    }
})

 cartSummaryHTML +=   `
<div class="cart-item-container js-cart-container-${matchingProduct.id}">
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingProduct.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="js-quantity-label">${cartItem.quantity}</span>
            </span>
           
             <span
            class="update-quantity-link js-update-link link-primary"
            data-product-id="${matchingProduct.id}">
            Update
            </span>

            <input
            class="quantity-input"
            type="number"
            min="1">

            <span
            class="save-quantity-link link-primary js-save-link"
            data-product-id="${matchingProduct.id}">
            Save
            </span>


            <span class="delete-quantity-link js-delete-link link-primary"
             data-product-id="${matchingProduct.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Tuesday, June 21
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Wednesday, June 15
            </div>
            <div class="delivery-option-price">
                $4.99 - Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Monday, June 13
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>

    
    `
});


document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const container = link.closest('.cart-item-container');
    container.classList.add('is-editing-quantity');
  });
});
// LIVE preview of quantity before saving
document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('input', (e) => {
        const container = input.closest('.cart-item-container');
        const newQuantity = Number(input.value);

        if (newQuantity < 1 || Number.isNaN(newQuantity)) return;

        // update the quantity label live as the user changes it
        container.querySelector('.js-quantity-label').textContent = newQuantity;
    });
});


document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const container = link.closest('.cart-item-container');
    const input = container.querySelector('.quantity-input');
    const newQuantity = Number(input.value);

     if (newQuantity < 1 || Number.isNaN(newQuantity)) {
      return;
    }

    updateQuantity(productId, newQuantity);

    container.querySelector('.js-quantity-label').innerHTML = newQuantity;
    container.classList.remove('is-editing-quantity');

    updateCartQuantity();
  });
});


document.querySelectorAll('.js-delete-link').forEach((link) =>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId
        removeProduct(productId)
        updateCartQuantity();
    
   const container = document.querySelector(`.js-cart-container-${productId}`)

   container.remove()
    })
})

document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId
        console.log(productId)
    })
})