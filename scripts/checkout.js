import {renderOrderSummary} from "../checkout/orderSummary.js"
import { renderPaymentSummary } from "../checkout/paymentSummary.js"
import { products, loadProducts } from "../data/products.js"
//import './cart-class.js';
//import '../data/backendpractice.js'


loadProducts(()=>{
     console.log("Products loaded:", products);
    renderOrderSummary(products)
    renderPaymentSummary()
})
