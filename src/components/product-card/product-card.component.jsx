import './product-card.styles.scss';

import Button from '../button/button.component';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl, id } = product;
  return (
    <div key={id} className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttontype='inverted'>Add to card</Button>
    </div>
  );
};

export default ProductCard;
