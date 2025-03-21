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
import { selectUser} from '../../store/slices/user-slice';
import { useSelector } from "react-redux";



export default function AdminDishDetails() {

  const signedInUser = useSelector(selectUser);
 

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
        console.log("fatched data", data)
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [dishId]);

  const deleteDish = async () => {
    try {
      const response = await fetch(`/api/dishes/${dishId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        setError(await response.json());
        setIsLoading(false);
        return;
      }
      alert("Dish Deleted!");
      navigate("/admin/menus");
    } catch (err) {
      console.log(err);
    }
  };

  return signedInUser && signedInUser.accessLevel === 1 && (
    <div className="dishDetailContainer">
      <DishInfo isLoading={isLoading} dish={dish} error={error} />
      <Button variant="secondary" onClick={() => { navigate(`/admin/dishes/${dish._id}/update`) }}>
        Edit
      </Button>
      <Button variant="secondary" onClick={deleteDish}>
        Delete
      </Button>
    </div>
  ) 
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

