/**
 * Component for Dish(Products) category
 *  @author Jun Wang (wang.jun6@northeastern.edu)
 *
 */

import React from "react";
import { Link } from "react-router-dom";


export default function Category({ category}) {


  let { name, imagePath, link } = category;


  return (
    <li>
      <div className="categoryContainer">
        <Link to={`/menus/${link}`}>
          <div className="imgContainer">
            <img src={`/${imagePath}`} alt={name} />
          </div>
          <div className="categoryTitle">
            <p>{name}</p>
          </div>
        </Link>
        
      </div>
    </li>
  );
}
