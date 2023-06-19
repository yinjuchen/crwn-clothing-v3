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

const removeCartItem = (cartItems, productToRemove) => {

  // find if cartItem contains productToAdd
const existingCartItem = cartItems.find((cartItem) =>
  cartItem.id === productToRemove.id
)

  // if found, increment quantity
  if(existingCartItem === 1) {
    return (
      cartItems.filter((cartItem) =>
      cartItem.id !== productToRemove.id
      )
    )
  }
  return cartItems.map((cartItem)=>
  cartItem.id === productToRemove.id
  ? {...cartItem, quantity: cartItem.quantity -1}
  : cartItem
  )
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemToCart: () => {}
})

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  

  // create a function when user clicks add to cart
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemToCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems,productToRemove))

  }

  // create a funtion for increment 
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0)
    setCartCount(newCartCount)
  },[cartItems])


  const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart,cartItems, cartCount}


  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}