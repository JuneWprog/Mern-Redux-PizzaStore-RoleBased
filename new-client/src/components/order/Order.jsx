/**
 * Display a specific order
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React, { Fragment } from "react";
import Table from 'react-bootstrap/Table';

export default function Order({ order }) {
  const {
    _id,
    createdOn,
    subTotal,
    taxPrice,
    shippingPrice,
    totalPrice,
    dishes,
    address,
  } = order;
  const totalNumber = dishes.reduce((a, c) => a + c.quantity, 0);
 
  return (
    <Fragment>
      <div className="orderContainer">
        <p className="storeName">Italian Pizza</p>
        <p className="orderDate">{new Date(createdOn).toDateString()}</p>
        <p className="orderNumber">Order Number: {_id}</p>
        <p className="orderNumber">Customer Address: {address}</p>

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
            {dishes.map((item) => (
              <tr key={item._id}>
                <td>{item.quantity}</td>
                <td>{item.dishName}</td>
                <td>{item.price}</td>
                <td>{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
         <p>
          Subtotal: <span data-testid ="subtotal">{subTotal}</span>
        </p>
        <p>
          Order Tax GST 5%: <span data-testid ="taxPrice">{taxPrice}</span>
        </p>
        <p>
          Shipping:<span data-testid ="shipping">{shippingPrice}</span>
        </p>

        <hr />
        <p>
          {totalNumber} items <span data-testid ="total">${totalPrice}</span>
        </p>
      
      </div>
    </Fragment>
  );
}

