import {createContext, useEffect, useState } from "react";


const addCartItem = (cartItems, productToAdd) => {
  const existItems = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  if(existItems) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id
    ? {...cartItem, quantity: cartItem.quantity + 1}
    : cartItem
    )
  }

  return [...cartItems, {...productToAdd, quantity: 1}]

}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {}, 
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0

})

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItem] = useState([])
  const [cartCount, setCartCount] = useState(0)

  const addItemToCart = (product) => {
    setCartItem(addCartItem(cartItems, product))
  }

  useEffect(()=> {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0 )
    setCartCount(newCartCount)
  },[cartItems])

 
  const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount}

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}