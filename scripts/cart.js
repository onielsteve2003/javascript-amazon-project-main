export const cart = [];

export function addToCart(productId){
  let matchingItem;
       
       cart.forEach((item)=>{
        if(productId === item.productId){
          matchingItem = item
        }
        })

        const quantitySelector = document.querySelector(`.quantity-option-${productId}`)
        const quantity = Number(quantitySelector.value)

        if(matchingItem){
          matchingItem.quantity += quantity;
        }
        else{
        cart.push({
        productId,
        quantity
       });
        }
}