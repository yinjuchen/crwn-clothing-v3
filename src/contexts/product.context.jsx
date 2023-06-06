import { createContext, useState } from "react";
import PRODUCTS from '../shop.data.json'

export const ProductsContext = createContext({
  // pass an empty array to store data
  products: []

})

export const ProductsProvider = ({children}) => {
  // pass the inital data PRODUCTS for useState
  const [products, setProducts] = useState(PRODUCTS)
  const value = {products}

  return<ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>

}

