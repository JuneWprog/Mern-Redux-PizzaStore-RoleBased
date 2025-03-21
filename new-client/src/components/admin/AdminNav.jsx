

/**
 * Responsive navigation links/buttons in the header
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/user-slice";


const  AdminNav =()=> {
  const signedInUser = useSelector(selectUser);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const changeScreenWidth = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
    return () => window.removeEventListener("resize", changeScreenWidth);
  });
  return (
    <div>
      {
        (screenWidth > 990) &&
        <nav className="navContainer">
          <Link className="nav-link" to="/admin/menus">Menus</Link>
         
          {
            signedInUser && signedInUser.accessLevel === 1 &&
            <>            
            <Link className="nav-link" to="/admin/dishes/addDish">Add Dish</Link>
            <Link className="nav-link" to="/admin/menus/addCategory">Add Category</Link>
            <Link className="nav-link" to="/admin/searchOrders">Search Orders</Link>
            </>
          }
        </nav>
      }
      {
        (screenWidth <= 990) &&
        <DropdownButton variant="light" role="button"   aria-labelledby="menu" title={<FaBars 
          role="button" aria-label=" menu" tabIndex="0" z-index="1000"
        />}>
         
          <Dropdown.Item as={Link} to="/admin/menus">Menus</Dropdown.Item>
          <hr/>
        
          {
              signedInUser && signedInUser.accessLevel === 1 &&
              (<>
              <Dropdown.Item as={Link} to="/admin/dishes/addDish">Add Dish</Dropdown.Item>
              <hr/>
              <Dropdown.Item as={Link} to="/admin/menus/addCategory">Add Category</Dropdown.Item>
              <hr/>
              <Dropdown.Item as={Link} to="/admin/searchOrders">Search Orders</Dropdown.Item>
              
            </>)}
        </DropdownButton>}
    </div>
  );
}


export default AdminNav
