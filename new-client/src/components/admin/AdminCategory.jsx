/**
 * Component for Dish(Products) category
 *  @author Jun Wang (wang.jun6@northeastern.edu)
 *
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/user-slice";

export default function AdminCategory({ category}) {
    const signedInUser = useSelector(selectUser);
  const navigate = useNavigate();
  let { name, imagePath, link } = category;
  const [error, setError] = useState();

  const deleteCategory = async (e) => {
    e.preventDefault();
    window.alert("Are you sure you want to delete this category?");
    try {
      const response = await fetch(`/api/menus/${category._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        setError(await response.json());
        return;
      }
      navigate("/admin/menus");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li>
      <div className="categoryContainer">
        <Link to={`/admin/menus/${link}`}>
          <div className="imgContainer">
            <img src={`/${imagePath}`} alt={name} />
          </div>
          <div className="categoryTitle">
            <p>{name}</p>
          </div>
        </Link>
        {signedInUser && signedInUser.accessLevel === 1 && (
          <div className="editDeleteCategory">
            <Link to={`/admin/menus/${category._id}/update`}>
              <button className="btn btn-outline-primary editButton">
                Edit
              </button>
            </Link>
            <button
              className="btn btn-outline-primary deleteButton"
              onClick={deleteCategory}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
