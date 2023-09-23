import './product-card.styles.scss';
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl, id } = product;
  const {addItemToCart} = useContext(CartContext)
  const addItemToCartHandler = () => addItemToCart(product)

  return (
    <div key={id} className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttontype='inverted' onClick={addItemToCartHandler}> Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
