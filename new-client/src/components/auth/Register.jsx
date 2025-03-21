/**
 * User Registeration
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React, { useState, useEffect, useRef } from "react";
// import Script from 'react-load-script';
import { Link, useNavigate, Navigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import PasswordStrengthBar from 'react-password-strength-bar';
import { useSelector } from "react-redux";
import {selectUser} from '../../store/slices/user-slice';

export default function Register() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const signedInUser = useSelector(selectUser);


  let navigate = useNavigate();
  const tableRef = useRef(null);

  useEffect(() => {
    tableRef.current.focus();
  }, []);
  
  // let autocomplete = "";
  // const handleScriptLoad = () => {
  //   autocomplete = new window.google.maps.places.Autocomplete(
  //     document.getElementById('address'), {});
  //   autocomplete.setFields(['formatted_address']);
  //   autocomplete.addListener('place_changed',
  //     handlePlaceSelect);
  // }

  // const handlePlaceSelect = () => {
  //   const addressObject = autocomplete.getPlace();
  //   const address = addressObject.formatted_address;
  //   if (address) {
  //     setAddress(address);
  //   }
  // }

  const register = async (e) => {
    let error = {};
    let alpha = /^[a-zA-Z\s]*$/;

    e.preventDefault();

    if (!firstName || !lastName || !address || !phone || !email || !password) {
      error.register = "Fill all fields!";
    }

    if (!firstName.match(alpha)) {
      error.firstName = "First Name should be Alphabetic";
    }

    if (!lastName.match(alpha)) {
      error.lastName = "Last Name should be Alphabetic";
    }

    if (phone.length !== 10 || Number(phone) < 0) {
      error.phone = "Phone Number should have 10 numbers";
    }

    if (confirmPassword !== password) {
      error.confirmPassword = "Passwords should Match!";
    }

    setError(error);

    if (Object.keys(error).length !== 0) {
      return;
    }

    let encryptedPassword = CryptoJS.AES.encrypt(password, import.meta.env.VITE_APP_KEY).toString();

    const newUser = {
      firstName, lastName, address, phone, email, encryptedPassword
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        setError(await response.json());
        return;
      }
      navigate(`/login`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    !signedInUser ? (
      <div className="registerContainer">
        {/* <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_MWjNlxuEBGUiJoJ42jzyvrZTn_iRKX0&libraries=places"
          onLoad={handleScriptLoad}
        /> */}
        <h2>Register your account</h2>
        <form className="registerForm" onSubmit={register}>

          <div className="input-container">
            <label htmlFor="firstName">First Name *</label>
            <br />
            <input className="form-control"
              ref={tableRef}
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder="Enter First Name"
              onChange={(e) => setFirstName(e.target.value)} />
            {error && error.firstName && (
              <div className="text-danger">{error.firstName}</div>
            )}
          </div>

          <div className="input-container">
            <label htmlFor="lastName">Last Name *</label>
            <br />
            <input className="form-control"
              id="lastName"
              type="text"
              placeholder="Enter Last Name"
              required
              onChange={(e) => setLastName(e.target.value)} />
            {error && error.lastName && (
              <div className="text-danger">{error.lastName}</div>
            )}
          </div>

          <div className="input-container">
            <label htmlFor="email">Email *</label>
            <br />
            <input
              className="form-control"
              id="email"
              type="email"
              name="email"
              placeholder="name@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && error.email && (
              <div className="text-danger">{error.email}</div>
            )}
          </div>

          <div className="input-container">
            <label htmlFor="address">Address *</label>
            <br />
            <input className="form-control"
              id="address"
              name="address"
              type="text"
              required
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)} />
            {error && error.address && (
              <div className="text-danger">{error.address}</div>
            )}
          </div>

          <div className="input-container">
            <label htmlFor="phone">Phone Number *</label>
            <br />
            <input className="form-control"
              id="phone"
              name="phone"
              type="number"
              required
              min="0"
              placeholder="Enter Phone Number"
              onChange={(e) => setPhone(e.target.value)} />
            {error && error.phone && (
              <div className="text-danger">{error.phone}</div>
            )}
          </div>

          <div className="input-container">
            <PasswordStrengthBar password={password} className="p-3" />
            <label htmlFor="password">Password *</label>
            <br />
            <input className="form-control"
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              required
              onChange={(e) => setPassword(e.target.value)} />
            {error && error.password && (
              <div className="text-danger">{error.password}</div>
            )}
          </div>

          <div className="input-container">
            <label htmlFor="confirm password">Confirm Password *</label>
            <br />
            <input className="form-control"
              id="confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Your Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)} />
            {error && error.confirmPassword && (
              <div className="text-danger">{error.confirmPassword}</div>
            )}
          </div>
          <br />

          {error && error.register && (
            <div className="text-danger">{error.register}</div>
          )}

          <div className="button-container d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-outline-primary"
              type="submit"
              value="Sign Up"
            >
              SIGN UP
            </button>
          </div>
          <div>
            <br />
            <p>
              Already have an account? <Link to="/login">Sign in.</Link>
            </p>
          </div>
        </form>
      </div>
    ) : (<Navigate to="/" />)
  );
}
