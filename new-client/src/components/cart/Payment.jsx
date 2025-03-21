/**
 * Pay for the items in the cart 
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { selectUser} from '../../store/slices/user-slice';
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../../store/slices/cart-slice";
import {setOrder, selectOrder} from "../../store/slices/order-slice";

export default function Payment() {

  const navigate = useNavigate();
  const [error, setError] = useState({});
  const signedInUser = useSelector(selectUser);
  const order = useSelector(selectOrder);
  const dispatch = useDispatch();


  const createOrder = (order) => {
      dispatch(setOrder(order));
    }
  

  const resetCartItems = () => {
    dispatch(resetCart());
  }

  const handleSubmit = () => {
    async function submitOrder() {
      if (!signedInUser) {
        navigate("/login");
      } else {
        let dishes = [];
        order.cartItems.forEach(item => {
          dishes.push({
            "dishName": item.name,
            "quantity": item.quantity,
            "price": item.price,
            "totalItemPrice": (item.quantity * item.price).toFixed(2)
          })
        });
        const orderSubmit = {
          "userEmail": signedInUser.email,
          "subTotal": order.itemsPrice,
          "taxPrice": order.taxPrice,
          "shippingPrice": order.shippingPrice,
          "totalPrice": order.totalPrice,
          "address": signedInUser.address,
          dishes
        };

        try {
          const response = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(orderSubmit),
          });
          if (!response.ok) {
            setError(await response.json());
            return;
          }
          const data = await response.json();
          navigate(`/orders/${data._id}`);
        } catch (err) {
          console.log(err);
        }
      }
    }
    submitOrder();
  }

  return (
    error && error.orderError ? <h4 className="text-danger">{error.orderError}</h4> :
      order ?
        (<>
          <div className="orderContainer">
            <h4 className="storeName">Italian Pizza</h4>
            <p className="orderDate">{order.date}</p>

            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Item</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.quantity}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p>
              Subtotal: <span>{order.itemsPrice}</span>
            </p>
            <p>
              Order Tax GST 5%: <span>{order.taxPrice}</span>
            </p>
            <p>
              Shipping:<span>{order.shippingPrice}</span>
            </p>

            <hr />
            <p>
              {order.totalNumber} items <span>${order.totalPrice}</span>
            </p>
            <Button variant="danger" onClick={() => {
              handleSubmit();
              resetCartItems([]);
              createOrder(null);
            }}>Pay</Button>
            <Button variant="secondary" onClick={() => navigate("/cart")}>Back to Cart</Button>
          </div>
        </>)
        : (<>
          <h1>Please add food to your cart</h1>
          <Button variant="secondary" onClick={() => navigate("/menus")}>Back to Menu</Button>
        </>)
  );
}
