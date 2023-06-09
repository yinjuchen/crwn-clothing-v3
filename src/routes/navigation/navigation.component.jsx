import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../contexts/cart.context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import CheckOut from "../checkout/checkout.component";
 
const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  console.log(currentUser)
  
  const {isCartOpen} = useContext(CartContext)


  return (
  <Fragment>
    <div className="navigation-container">
        <Link className="logo-container" to='/'>
          <CrwnLogo className="logo"/>
       </Link>
      <div className="nav-link-container">
        <Link className="nav-link" to='/shop'>
         SHOP
        </Link>
        {
          currentUser 
          ? (<span className="nav-link"onClick={signOutUser}>SIGN OUT</span>)
          : (<Link className="nav-link" to='/auth'>SIGN IN</Link>)
        }
        <CartIcon />
      </div>
       { isCartOpen && < CartDropDown /> }
    </div>
    <Outlet />
  </Fragment>
  )
}

export default Navigation