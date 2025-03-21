import React, { useEffect, useState } from "react";
import Order from "../order/Order";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/slices/user-slice";


const SearchOrders=()=> {
  const signedInUser = useSelector(selectUser);
  const userEmail = signedInUser ? signedInUser.email : "";
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [criteria, setCriteria] = useState(useParams().criteria || "");
  let navigate = useNavigate();


  useEffect(() => {
    async function fetchData() {
      try {
        if (criteria) {
          navigate(`/admin/searchOrders/${criteria}`);
          const response = await fetch(`/api/searchOrder/${criteria}`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: userEmail }),
          });
          if (!response.ok) {
            setError(await response.json());
            setIsLoading(false);
            return;
          }
          const data = await response.json();
          setOrders(data);
          console.log(data);
          setIsLoading(false);
        } else {
          navigate(`/admin/searchOrders`);
          setOrders([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [isLoading, criteria, navigate]);

  return (
      <>
          <div className='d-flex justify-content-center'>
              <div className="input-group w-75">
                  <input type="search"
                      value={criteria}
                      className="form-control rounded"
                      placeholder="Search All, Order Number, Date, or Address"
                      aria-label="Search All, Order Number, Date, or Address"
                      aria-describedby="search-addon"
                      onChange={(e) => setCriteria(e.target.value)} />
              </div>
          </div>
          <hr />
          <p className='text-muted'>ALL/all: for all orders</p>
          <p className='text-muted'>Order number o:62c326f2c1a0766ec5dbc755</p>
          <p className='text-muted'>Date d:2022-07-01|2022-07-04</p>
          <p className='text-muted'>Address a:New York</p>
          <hr/>
          {
            isLoading ? <p> Loading...</p> :
                    error && error.dishError ? <h4 className="text-danger">{error.dishError}</h4> :
                      orders.length > 0 ? (
                          <div className="dishContainer">
                              <ul>
                                  {orders.map((order) => (
                                      <li key={order._id}  >
                                          <Order key={order._id} order={order} />
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      ) : (
                          <h3 className='text-muted'>No Results to Show!</h3>
                      )
          }
      </>
  )
}
export default  SearchOrders