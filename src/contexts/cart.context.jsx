import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {

  // find if cartItem contains productToAdd
const existingCartItem = cartItems.find((cartItem) =>
  cartItem.id === productToAdd.id
)

  // if found, increment quantity
  if(existingCartItem) {
    return (
      cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
      )
    )
  }
 
  // return new array with modified cartItmes / new cart item
  return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find if cartItem contains productToAdd
const existingCartItem = cartItems.find((cartItem) =>
  cartItem.id === cartItemToRemove.id
)

  // if found quantity is not equal to 1, not remove it, filter and just keep it
  if(existingCartItem.quantity === 1) {
    return (
      cartItems.filter((cartItem) =>
      cartItem.id !== cartItemToRemove.id
      )
    )
  }
  // if found quantity is equal to 1, remove it
  return cartItems.map((cartItem)=>
  cartItem.id === cartItemToRemove.id
  ? {...cartItem, quantity: cartItem.quantity - 1}
  : cartItem
  )
}

// clear cart 
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
})

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)
  

  // create a function when user clicks add to cart
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems,cartItemToRemove))

  }

  // clear item from cart
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
}


  // create a funtion for increment 
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0)
    setCartCount(newCartCount)
  },[cartItems])

  useEffect(() => {
  const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0)
  setCartTotal(newCartTotal)
},[cartItems])


  const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart,clearItemFromCart, cartItems, cartCount, cartTotal}


  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}