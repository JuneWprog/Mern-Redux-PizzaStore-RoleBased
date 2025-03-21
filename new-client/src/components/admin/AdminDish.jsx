/**
 * Component for one dish in the menu
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */

import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { selectUser} from '../../store/slices/user-slice';
import { useSelector } from "react-redux";



export default function AdminDish({ dish}) {
  const signedInUser = useSelector(selectUser);


  let { name, description, _id, imagePath, price } = dish;
  let navigate = useNavigate();

  return (
    <Fragment>
      <div className="dishContainer">
        <Card>
          <Link to={`/admin/dishes/${_id}`}>
            <Card.Img variant="top" src={`/${imagePath}`} alt={name} />
          </Link>
          <Card.Body>
            <Link to={`/admin/dishes/${_id}`}>
              <Card.Title>{name}</Card.Title>
              <Card.Text className="dishDiscrip">{description}</Card.Text>
              <Card.Text>Price:${price}</Card.Text>
            </Link>
            <div className="buttonGroupDish">
              {signedInUser && signedInUser.accessLevel === 1 && (
                <Button variant="danger" onClick={() => navigate(`/admin/dishes/${_id}`)}>Edit / Delete</Button>
              ) }

            </div>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
}
