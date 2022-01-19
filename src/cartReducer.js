// why use reducer --------------------
// 1. extact logic outside component.
// 2. Reuse the reducer 
// 3. Unit test 
// 4. SCALIBILTY

//whatever we return from the useReducer becomes the New State

// swicth from useState to useReducer
export default function cartReducer(cartState, action) {
  switch (action.type) {
    case "emptyCart":
      return [];
    case "add":
      // along with type, action can have many properties
      const { id, sku } = action;
      // chaeck if cart[] has sku id in it
      const itemInCart = cartState.find((i) => i.sku === sku);
      if(itemInCart) {
        // Return a new array with matching items.
        // item already in the cart
        return cartState.map((item) => item.sku === sku ? {...item, quantity: item.quantity + 1} : item);
      } else {
        // if it is not in the item in the cart
        // Return new array with the new item
        // add new cart array of object
        return [...cartState, { id: id, sku: sku, quantity: 1 }]
      }
    case "update":
      const { quantity, sku:skus } = action;
      return quantity === 0 
        ? cartState.filter((item) => item.sku === skus) 
        : cartState.map((item) => item.sku === skus ? {...item, quantity: quantity} : item)
    default:
      throw new Error("Unhandled Action: " + action.type);
  }
}