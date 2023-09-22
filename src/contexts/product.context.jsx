import { createContext, useState } from "react";
import PRODUCTS from '../shop.data.json'
// we can name the variable we like, in here we call PRODUCTS

export const ProductsContext = createContext({
// pass an empty array to store data
  products: [],
})

export const ProductProvider = ({children}) => {
// pass the inital data PRODUCTS for useState
  const [products, setProducts] = useState(PRODUCTS)
  const value = {products}
  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  )
}