export const deliveryOptions = [{
    id: '1', 
    deliveryDays: 7,
    priceCents: 0
},  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}]

export function getDeliveryOption(deliveryOptionId) {
  if (!deliveryOptionId) {
    // Default to free delivery if available
    const freeOption = deliveryOptions.find(option => option.priceCents === 0);
    return freeOption || deliveryOptions[0];
  }

  return deliveryOptions.find(option => option.id === deliveryOptionId) || deliveryOptions[0];
}
