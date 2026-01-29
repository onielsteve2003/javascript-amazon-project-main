import {
  cart,
  removeProduct,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption
} from "../scripts/cart.js";

import { products, getProduct } from "../data/products.js";
import { formatCurrency } from "../utilities/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary(){

function updateCartQuantity(){
let cartQuantity = calculateCartQuantity();
 document.querySelector('.js-checkout-page').innerHTML = `${cartQuantity} items`
}

updateCartQuantity();

let cartSummaryHTML = '';

cart.forEach((cartItem)=>{
    const productId = cartItem.productId


const matchingProduct = getProduct(productId);

const deliveryOptionId = cartItem.deliveryOptionsId;

const deliveryOption = getDeliveryOption(deliveryOptionId);

   const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        );

     const dateString = deliveryDate.format(`dddd, MMMM D`);


 cartSummaryHTML +=   `
<div class="cart-item-container js-cart-container-${matchingProduct.id}">
    <div class="delivery-date">
        Delivery date: ${dateString}
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
   ${deliveryOptionsHTML(matchingProduct, cartItem)}
   </div>
   </div>
   </div>
    `});
    
function deliveryOptionsHTML(matchingProduct, cartItem){

    let html = '';
    
    deliveryOptions.forEach((deliveryOption)=>{
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        );

        const dateString = deliveryDate.format(`dddd, MMMM D`)

        const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        :`$${formatCurrency(deliveryOption.priceCents)} -`;


        const isChecked = deliveryOption.id === cartItem.deliveryOptionsId

      html +=  ` <div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
            value="${deliveryOption.id}">

            <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceString} Shipping
            </div>
            </div>
        </div> `
    })

    return html
}

function calculatePaymentSummary() {
    let itemsTotal = 0;
    let shippingTotal = 0; // you can make this dynamic per item if needed
    const taxRate = 0.1; // 10%

    cart.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.productId);
        if (!product) return;

        itemsTotal += (product.priceCents / 100) * cartItem.quantity; // convert cents to dollars
        // Optional: add shipping per item if needed
        shippingTotal += 4.99; // example flat rate per item
    });

    const subtotal = itemsTotal + shippingTotal;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return { itemsTotal, shippingTotal, subtotal, tax, total };
}


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
    renderPaymentSummary()
  });
  
});


document.querySelectorAll('.js-delete-link').forEach((link) =>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId
        removeProduct(productId)
        updateCartQuantity();
    
   const container = document.querySelector(`.js-cart-container-${productId}`)

   container.remove()

   renderPaymentSummary()
    })
})

document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId
        console.log(productId)
    })
})

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click', ()=>{
        const{productId, deliveryOptionId} = element.dataset
        updateDeliveryOption(productId, deliveryOptionId)
        renderOrderSummary()
        renderPaymentSummary()
    })
})


}
