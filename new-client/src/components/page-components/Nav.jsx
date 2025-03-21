

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


const  Nav =()=> {
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
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/menus">Menus</Link>
          { ((signedInUser ===null) || (signedInUser.accessLevel === 0)) &&
            <>
            <Link className="nav-link" to="/about-us">About Us</Link>
          <Link className="nav-link" to="/contact-us">Contact Us</Link>         
            </>}
          
        </nav>
      }
      {
        (screenWidth <= 990) &&
        <DropdownButton variant="light" role="button"   aria-labelledby="menu" title={<FaBars 
          role="button" aria-label=" menu" tabIndex="0"
        />}>
          <Dropdown.Item as={Link} to="/">Home</Dropdown.Item>
          <hr />
          <Dropdown.Item as={Link} to="/menus">Menus</Dropdown.Item>
          <hr/>
          {
            ((signedInUser ===null) || (signedInUser.accessLevel === 0)) &&
            <>
            <Dropdown.Item as={Link} to="/about-us">About Us</Dropdown.Item>
          <hr />
          <Dropdown.Item as={Link} to="/contact-us">Contact Us</Dropdown.Item>
            </>
          }
          
         
        </DropdownButton>}
    </div>
  );
}


export default Nav
