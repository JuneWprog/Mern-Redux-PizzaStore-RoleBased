/**
 * Admin user can update the dish(product) information
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { selectUser} from '../../store/slices/user-slice';
import { useSelector } from "react-redux";


export default function UpdateDish() {
  const signedInUser = useSelector(selectUser);
  const tableRef = useRef(null);
  const dishId = useParams().dishId;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [spice, setSpice] = useState("");
  const [image, setImage] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/dishes/${dishId}`);
        if (!response.ok) {
          setError(await response.json());
          return;
        }
        const data = await response.json();
        setName(data.name);
        setImage(data.imagePath);
        setOldImage(data.imagePath);
        setCategory(data.category.name);
        setPrice(data.price);
        setDescription(data.description);
        setSpice(data.spice);
      } catch (err) {
        console.log(err);
      }
    }
    tableRef.current.focus();
    fetchData();
  }, [dishId]);

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

    if (Number(price) < 1) {
      error.price = "Price cannot less than $1."
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
      const response = await fetch(`/api/dishes/${dishId}`, {
        method: "PUT",
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
  };

  return (
    signedInUser && signedInUser.accessLevel === 1 ? (

      <div className="editDishContainer">
        <h2>Edit Dish</h2>
        <form className="addDishForm" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="input-container">
            <label htmlFor="name">Dish Name *</label>
            <br />
            <input
              tableindex="-1"
              ref={tableRef}
              id="name"
              className="form-control"
              value={name}
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
              <option value="Pizza and Pasta"> Pizza and Pasta </option>
              <option value="Sides"> Sides</option>
              <option value="Drinks"> Drinks</option>
              <option value="Desserts"> Desserts</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="image">Image</label>
            <br />
            <div className="d-flex justify-content-center">
              <img src={`/${oldImage}`} alt={name} />
            </div>
            <br />
            <input
              id="image"
              className="form-control"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image"
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
              id="price"
              className="form-control"
              type="number"
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
            </select>
          </div>

          {error && error.updateDish && (
            <div className="text-danger">{error.updateDish}</div>
          )}

          {error && error.dishError && (
            <div className="text-danger">{error.dishError}</div>
          )}

          <div className="button-container d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-outline-primary"
              type="submit"
              value="Submit"
            >
              Submit
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => { navigate(`/admin/dishes/${dishId}`) }}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    ) : (<Navigate to={`/admin/dishes/${dishId}`} />)

  );
}
