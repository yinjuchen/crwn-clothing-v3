import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";


const CheckOut = () => {
  const {cartItems, addItemToCart, removeItemToCart} = useContext(CartContext)
  return (
   <div>
     <div>
      {cartItems.map((cartItem) => {
        const {id, name, quantity} = cartItem
        return(
          <div key={id}>
            <h2>{name}</h2>
            <span>{quantity}</span>
            <span onClick={() =>addItemToCart(cartItem)}>increment</span>
            <br/>
            <span onClick={()=>removeItemToCart(cartItem)}>Decrement</span>
          </div>
       )
      })}
     </div>
   </div>
  )
}

export default CheckOut