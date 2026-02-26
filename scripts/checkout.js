import {renderOrderSummary} from "../checkout/orderSummary.js"
import { renderPaymentSummary } from "../checkout/paymentSummary.js"
import { products, loadProducts } from "../data/products.js"
//import './cart-class.js';
//import '../data/backendpractice.js'


loadProducts(()=>{
    
    renderOrderSummary(products)
    renderPaymentSummary()
})
