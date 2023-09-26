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

const removeCartItem = (cartItems, cartItemToRemove)=> {
  const existItems = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

  if(existItems.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
    ? {...cartItem, quantity: cartItem.quantity -1}
    : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)}


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {}, 
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0, 
  removeItemFromCart: () => {}, 
  clearItemFromCart: () => {}, 
  cartTotal: 0
})

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItem] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)


  const addItemToCart = (product) => {
    setCartItem(addCartItem(cartItems, product))
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItem(removeCartItem(cartItems, cartItemToRemove))
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItem(clearCartItem(cartItems, cartItemToClear))
  }

  useEffect(()=> {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0 )
    setCartCount(newCartCount)
  },[cartItems])

    useEffect(()=> {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0 )
    setCartTotal(newCartTotal)
  },[cartItems])


 
  const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal}

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}