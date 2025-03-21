/**
 * Dish details of a specific dish(product)
 * General users can see the details of the dish and add it to the cart.
 * Admin users can edit and delete the dish.
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { increamentAmount } from "../../store/slices/cart-slice";



export default function DishDetails() {

  const dispatch = useDispatch();
  const onAdd = (dish) => {
    dispatch(increamentAmount(dish));
  }

  const { dishId } = useParams();
  const [dish, setDish] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  const [error, setError] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/dishes/${dishId}`);
        if (!response.ok) {
          setError(await response.json());
          setIsLoading(false);
          return;
        }
        const data = await response.json();
        setDish(data);
        
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [dishId]);

  if (error && error.dishError) {
    return <h4 className="text-danger">{error.dishError}</h4>;
  }

  return (
    <div className="dishDetailContainer">
      <DishInfo isLoading={isLoading} dish={dish} />
      <Button variant="danger" onClick={() => onAdd(dish)}>Add To Cart</Button>
      <Button variant="secondary" onClick={() => navigate(`/menus/${dish.category.link}`)}>Back</Button>
    </div>
  );
}

function DishInfo({ isLoading, dish, error }) {
  
  return (
    <>
      {
        isLoading ? <p> Loading...</p> :
          error && error.dishError ? <h4 className="text-danger">{error.dishError}</h4> :
            dish ? (
              <>
                <div>
                  <div className="dishDetailImg d-flex justify-content-center">
                    <img src={`/${dish.imagePath}`} alt={dish.name} />
                  </div>
                  <div className="dishDetailInfo">
                    <h2>Name: {dish.name}</h2>
                    <p>{dish.description}</p>
                    <p>Price: ${dish.price}</p>
                    <p>Spice:{dish.spice}</p>
                  </div>
                </div>
              </>
            ) : (
              <li>Coming Soon</li>
            )
      }
    </>
  );
}

