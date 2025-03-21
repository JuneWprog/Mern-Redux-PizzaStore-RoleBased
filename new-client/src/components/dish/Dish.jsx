/**
 * Component for one dish in the menu
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {  useDispatch } from "react-redux";
import { increamentAmount } from "../../store/slices/cart-slice";



export default function Dish({ dish}) {
  const dispatch = useDispatch();
  const onAdd = (dish) => {
    dispatch(increamentAmount(dish));
  }

  let { name, description, _id, imagePath, price } = dish;

  return (
    <Fragment>
      <div className="dishContainer">
        <Card>
          <Link to={`/dishes/${_id}`}>
            <Card.Img variant="top" src={`/${imagePath}`} alt={name} />
          </Link>
          <Card.Body>
            <Link to={`/dishes/${_id}`}>
              <Card.Title>{name}</Card.Title>
              <Card.Text className="dishDiscrip">{description}</Card.Text>
              <Card.Text>Price:${price}</Card.Text>
            </Link>
            <div className="buttonGroupDish">
          
            <Button variant="danger" onClick={() => onAdd(dish)}>Add To Cart</Button>
              
            </div>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
}
