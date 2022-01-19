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

  }
}