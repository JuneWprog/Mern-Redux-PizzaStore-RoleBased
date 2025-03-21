/**
 * User profile
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React, { useState, useEffect } from "react";
import Script from 'react-load-script';
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from '../../store/slices/user-slice';

export default function Profile() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({});
  let autocomplete = "";
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const signedInUser = useSelector(selectUser);

  
  const setLoggedInUser = (user) => {
    dispatch(setUser(user));
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (signedInUser) {
          setFirstName(signedInUser.firstName);
          setLastName(signedInUser.lastName);
          setEmail(signedInUser.email);
          setAddress(signedInUser.address);
          setPhone(signedInUser.phone);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [signedInUser]);

  const handleScriptLoad = () => {
    autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('address'), {});
    autocomplete.setFields(['formatted_address']);
    autocomplete.addListener('place_changed',
      handlePlaceSelect);
  }

  const handlePlaceSelect = () => {
    const addressObject = autocomplete.getPlace();
    const address = addressObject.formatted_address;
    if (address) {
      setAddress(address);
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault();

    let error = {};
    let alpha = /^[a-zA-Z\s]*$/;

    if (!firstName || !lastName || !address || !phone || !email) {
      error.profile = "Fill all fields!";
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

    setError(error);

    if (Object.keys(error).length !== 0) {
      return;
    }

    const newUser = {
      firstName, lastName, address, phone, email
    };

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        setError(await response.json());
        return;
      }
      const data = await response.json();
      const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phone: data.mobileNumber,
        email,
        token: signedInUser.token,
        accessLevel: data.userType === 'Admin' ? 1 : 0
      }
      setLoggedInUser(user);
      alert("Profile Updated Successfully!");
      navigate(`/profile`);
    } catch (err) {
      console.log(err);
    }
  };

  return (isLoading && <p>Loading</p>) || (
    signedInUser ? (
      <div className="registerContainer">
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_MWjNlxuEBGUiJoJ42jzyvrZTn_iRKX0&libraries=places"
          onLoad={handleScriptLoad}
        />
        <h2>Account Details</h2>
        <form className="registerForm" onSubmit={updateProfile}>
          <div className="input-container">
            <label htmlFor="firstName">First Name *</label>
            <br />
            <input className="form-control"
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder="Enter First Name"
              value={firstName}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} />
            {error && error.lastName && (
              <div className="text-danger">{error.lastName}</div>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="email">Email *</label>
            <br />
            <input
              id="email"
              className="form-control"
              type="email"
              name="email"
              placeholder="name@example.com"
              value={email}
              required
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
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
              value={address}
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
              min="0"
              required
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} />
            {error && error.phone && (
              <div className="text-danger">{error.phone}</div>
            )}
          </div>

          <br />

          {error && error.profile && (
            <div className="text-danger">{error.profile}</div>
          )}

          <div className="button-container d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-outline-primary"
              type="submit"
              value="Sign Up"
            >
              Update Details
            </button>
          </div>

        </form>
      </div>
    ) : (<Navigate to="/" />)
  );
}

