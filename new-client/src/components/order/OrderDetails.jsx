

/**
 * Details of one specific order
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import { useParams, Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/slices/user-slice";

export default function OrderDetails() {
  const signedInUser = useSelector(selectUser);
  const userEmail = signedInUser ? signedInUser.email : "";
  const [curOrder, setCurOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = useParams();
  const [totalNumber, setTotalNumber] = useState(0);
  const [error, setError] = useState({});

  useEffect(() => {
    async function fetchData() {
      console.log("fetching a single order");
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ "email": userEmail }),
        });
        if (!response.ok) {
          setError(await response.json());
          setIsLoading(false);
          return;
        }
        const data = await response.json();
        setIsLoading(false);
        setCurOrder(data);
        setTotalNumber(data.dishes.reduce((a, c) => a + c.quantity, 0));
      } catch (err) {
        console.log(err);
      }
    }
    if (userEmail !== "") {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [userEmail, orderId]);

  return (
    <>
      {
        isLoading ? <p> Loading...</p> :
          userEmail === "" ? <Navigate to="/login" /> :
            error && error.orderError ? <h4 className="text-danger">{error.orderError}</h4> :
              Object.keys(curOrder).length !== 0 ? (
                <Fragment>
                  <div className="orderContainer">
                    <h4 className="storeName">Italian Pizza</h4>
                    <p className="orderDate">{new Date(curOrder.createdOn).toDateString()}</p>
                    <p>Customer Address: {curOrder.address}</p>

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
                        {curOrder.dishes.map((item) => (
                          <tr key={item._id}>
                            <td>{item.quantity}</td>
                            <td>{item.dishName}</td>
                            <td>{item.price}</td>
                            <td>{item.totalItemPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <p>
                      Subtotal: <span>{curOrder.subTotal}</span>
                    </p>
                    <p>
                      Order Tax GST 5%: <span>{curOrder.taxPrice}</span>
                    </p>
                    <p>
                      Shipping:<span>{curOrder.shippingPrice}</span>
                    </p>

                    <hr />
                    <p>
                      {totalNumber} items <span>${curOrder.totalPrice}</span>
                    </p>

                  </div>
                </Fragment>
              ) : (
                <h4>Order not available</h4>
              )
      }
    </>
  );
}

