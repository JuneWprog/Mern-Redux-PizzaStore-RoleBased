/**
 * Display shoppping cart items
 * @author Jun Wang (wang.jun6@northeastern.edu)
 *
 */
import React from "react";
import Button from "react-bootstrap/Button";
// import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTaxPrice,
  selectTotalPrice,
  selectShippingPrice,
  selectItemsCount,
} from "../../store/slices/cart-slice";
import { selectUser } from "../../store/slices/user-slice";
import CartItem from "./cartItem";
import {setOrder} from "../../store/slices/order-slice";


export default function Cart() {
  let navigate = useNavigate();
  // let { setOrder } = props;
  
  const cartItems = useSelector(selectCartItems);
  const itemsPrice = useSelector(selectTotalPrice);
  const totalNumber = useSelector(selectItemsCount);
  const taxPrice = useSelector(selectTaxPrice);
  const shippingPrice = useSelector(selectShippingPrice);
  const totalPrice = useSelector(selectTotalPrice);
  const signedInUser = useSelector(selectUser);
  
  const dispatch = useDispatch();
  const createOrder = (order) => {
    dispatch(setOrder(order));
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signedInUser === null) {
      navigate("/login");
    } else {
      const email = signedInUser.email;
      const newInvoice = {
        email,
        cartItems,
        totalNumber,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };
      createOrder(newInvoice);
      navigate("/payment");
    }
  };

  return cartItems.length > 0 ? (
    <>
      <h2 className="cartTitle"> Your Cart</h2>
      <div className="cartDetailContainer">
        <ul>
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
            />
          ))}
        </ul>
        <div className="summary">
          <p>Free shipping on orders of $30 or more</p>
          <p>{totalNumber} items</p>
          <hr></hr>
          <p>
            Subtotal: <span>{itemsPrice}</span>
          </p>
          <p>
            Order Tax GST 5%: <span>{taxPrice}</span>
          </p>
          <p>
            Shipping:{" "}
            <span>{shippingPrice === 0 ? "Free" : shippingPrice}</span>
          </p>

          <p>
            Total: <span>${totalPrice}</span>
          </p>
          <hr />
          <p>
            {totalNumber}items <span>${totalPrice}</span>
          </p>

          <div className="cartButtons">
            <Button
              className="checkOutBtn"
              onClick={handleSubmit}
              variant="danger"
            >
              Check out
            </Button>
            <br />
            <br></br>
            <Button className="addMoreBtn" href="/menus" variant="secondary">
              Add more food
            </Button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="emptyCart">
      <h2 className="cartTitle"> Your Cart</h2>
      <div className="suggestion">
        <p>Your cart is empty</p>
        <Button className="addMoreBtn" href="/menus" variant="secondary">
          Add food to your cart
        </Button>
      </div>
    </div>
  );
}

