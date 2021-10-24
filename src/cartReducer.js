export default function cartReducer(cart, action) {
  switch (action.type) {
    case "empty":
      return [];
    case "add":
      const { id, action } = action;
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        // Return a new array with matching item replaced
        console.log(itemInCart, '--itemInCart')
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...cart, { id: id, sku: sku, quantity: 1 }]
      }
    case "update":
      const { sku, quantity } = action;
      return quantity === 0 ? items.filter(item => item.sku !== sku)
        : items.map(item => (item.sku === sku ? { ...item, quantity: quantity } : item));
    default:
      throw new Error("Unhandle action" + action.type);
  }
}