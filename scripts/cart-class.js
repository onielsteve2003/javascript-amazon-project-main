class Cart{
     cartItems;
     localStorageKey;

     constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    

     }


     //to make a method private, put hashtag
    loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey))

    if (!this.cartItems){
    this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 1,
        deliveryOptionsId:'1'
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85b6d',
        quantity : 1,
        deliveryOptionsId: '3'

    }];
}
}

        saveToStorage(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems))
}


addToCart(productId){
  let matchingItem;
       
  this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

        const quantitySelector = document.querySelector(`.quantity-option-${productId}`)
        const quantity = Number(quantitySelector.value)

        if(matchingItem){
          matchingItem.quantity += quantity;
        }
        else{
        this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
       });
        }
        this.saveToStorage();
}

 removeProduct(productId){
  const newCart = [];

  this.cartItems.forEach((cartItem)=>{
    if(cartItem.productId !== productId ){
      newCart.push(cartItem)
    }
  })

  this.cartItems = newCart;

  this.saveToStorage();
}
updateDeliveryOption(productId, deliveryOptionId){
   let matchingItem;
       
       this.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem = cartItem
        }
        });

        matchingItem.deliveryOptionsId = deliveryOptionId
        this.saveToStorage()
}

 updateQuantity(productId, newQuantity) {
  this.cartItemst.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });

  this.saveToStorage();
}

calculateCartQuantity(){
  let cartQuantity = 0;

        this.cartItems.forEach((cartItem)=>{
          cartQuantity += cartItem.quantity
 })

 return cartQuantity

}

}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);











