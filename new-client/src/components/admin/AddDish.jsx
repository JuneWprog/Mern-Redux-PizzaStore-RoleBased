/**
 * Create a new dish(product) in the database
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { selectUser } from "../../store/slices/user-slice";
import { useSelector } from "react-redux";

export default function AddDish() {
  const signedInUser = useSelector(selectUser);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Pizza and Pasta");
  const [price, setPrice] = useState("");
  const [spice, setSpice] = useState("Hot");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  let navigate = useNavigate();
  const tableRef = useRef(null);
  const [error, setError] = useState({});
  const [categories, setCategories]=useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/menus");
    if (!response.ok) {
      setError(await response.json());
      setIsLoading(false);
      return;
    }
    const data = await response.json();
    setCategories(data);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
  }
}

fetchData();

if(tableRef.current){
  tableRef.current.focus();
}

}, []);




  const handleSubmit = async (e) => {
    let error = {};
    let alphaNumeric = /^[a-zA-Z0-9\s]*$/;
    let descriptionRegex = /^[a-zA-Z0-9\s() .?!,-_:;\n\r]*$/;


    e.preventDefault();

    if (!name || !category || !price || !spice || !image || !description) {
      error.addDish = "Fill all fields!";
    }

    if (!name.match(alphaNumeric) && name.length > 60) {
      error.name = "Name should be AlphaNumeric and should not exceed 60 characters.";
    }

    if (!description.match(descriptionRegex)) {
      error.description = "Description should be AlphaNumeric.";
    }

    if (Number(price) < 0) {
      error.price = "Price cannot be less than $0."
    }

    setError(error);

    if (Object.keys(error).length !== 0) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("spice", spice);
    formData.append("image", image);
    formData.append("description", description);
    try {
      const response = await fetch("/api/dishes/addDish", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        setError(await response.json());
        return;
      }
      const data = await response.json();
      navigate(`/admin/dishes/${data._id}`);
    } catch (err) {
      console.log(err);
    }
    setName("");
    setCategory("");
    setPrice("");
    setSpice("");
    setImage("");
    setDescription("");
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    signedInUser && signedInUser.accessLevel === 1 ? (
      <div className="addDishContainer">
        <h2>Add A Dish to Menu</h2>
        <form className="addDishForm" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="input-container">
            <label htmlFor="name">Dish Name *</label>
            <br />
            <input
              className="form-control"
              ref={tableRef}
              value={name}
              id="name"
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            />
            {error && error.name && (
              <div className="text-danger">{error.name}</div>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="category">Category *</label>
            <br />
            <select
              id="category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => {
                return (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="image">Image *</label>
            <br />
            <input
              className="form-control"
              id="image"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="input-container">
            <label htmlFor="description">Description *</label>
            <br />
            <textarea
              id="description"
              className="form-control"
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error && error.description && (
              <div className="text-danger">{error.description}</div>
            )}
          </div>

          <div className="input-container">
            <label htmlFor="price">Price $ *</label>
            <br />
            <input
              className="form-control"
              type="number"
              id="price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {error && error.price && (
              <div className="text-danger">{error.price}</div>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="spice">Spice*</label>
            <br />
            <select
              id="spice"
              className="form-control"
              value={spice}
              onChange={(e) => setSpice(e.target.value)}
            >
              <option value="Mild"> Mild </option>
              <option value="Medium"> Medium</option>
              <option value="Hot"> Hot</option>
              <option value="None"> None</option>

            </select>
          </div>

          {error && error.addDish && (
            <div className="text-danger">{error.addDish}</div>
          )}

          <div className="button-container d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-outline-primary"
              type="submit"
              value="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    ) : (<Navigate to="/" />)
  );
}

