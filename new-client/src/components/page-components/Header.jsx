import React from 'react'
import Logo from "./Logo";
import SignInLink from "./SignInLink";
import Nav from "./Nav";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import SearchButton from "./SearchButton";
import { selectUser} from '../../store/slices/user-slice';
import { selectItemsCount } from '../../store/slices/cart-slice';
import { useSelector } from "react-redux";


export default function Header() {
  
  const signedInUser = useSelector(selectUser);
  const numberOfItemsInCart = useSelector(selectItemsCount);
  

  return (
    <header className="headerContainer">
      <Logo />
      <SearchButton />
      <SignInLink />
      <CartStatus numberOfItemsInCart={numberOfItemsInCart} />

      <Nav signedInUser={signedInUser} />
    </header>
  );
}

function CartStatus({ numberOfItemsInCart }) {
  return (
    <div className="cartStatus">
      <Link to="/cart">
        <span className="cartIcon">
          <AiOutlineShoppingCart role="button" aria-label="shopping cart" />
        </span>
        <Badge pill bg="danger" role="banner" aria-label={`${numberOfItemsInCart} items in cart`}>
        {numberOfItemsInCart}
      </Badge>
      </Link>
      
    </div>
  );
}

