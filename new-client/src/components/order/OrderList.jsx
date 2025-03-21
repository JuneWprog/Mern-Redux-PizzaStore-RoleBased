/**
 * Orders history for one specific user
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React, { useEffect, useState } from "react";
import Order from "./Order";
import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/slices/user-slice";


export default function OrderList() {

  const signedInUser = useSelector(selectUser);
  const userEmail = signedInUser ? signedInUser.email : "";
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/orders", {
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
        setOrderList(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    if (userEmail !== "") {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [userEmail]);

  return (
    signedInUser ? (
      <div className="orderList">
        <h2>Your orders</h2>
        {
          isLoading ? <p>loading...</p> :
            error && error.orderError ? <h4 className="text-danger">{error.orderError}</h4> :
              orderList.length > 0 ?
                (
                  <ul>
                    {orderList.map((order) => (
                      <li key={order._id}>
                        <Order order={order} />
                      </li>))}

                  </ul>
                ) : <h4>You have no orders!</h4>
        }
      </div>
      )
      : (<Navigate to="/login" />)
  );
}
