
/**
 * Update an existing category in the database
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
 import React, { useState, useEffect, useRef } from "react";
 import { useNavigate, Navigate } from "react-router-dom";
 import { useParams } from "react-router-dom";
 import { useSelector } from "react-redux";
  import { selectUser } from "../../store/slices/user-slice";

 export default function UpdateCategory() {
   const [name, setName] = useState("");   
   const [link, setLink] = useState (useParams().link)
   const [image, setImage] = useState("");
   const [oldImage, setOldImage] = useState("");
   const categoryId = useParams().categoryId;
   let navigate = useNavigate();
   const tableRef = useRef(null);
   const [error, setError] = useState({});

const signedInUser = useSelector(selectUser);


   useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/menus/detail/${categoryId}`);
        if (!response.ok) {
          setError(await response.json());
          return;
        }
        const data = await response.json();
        setName(data.name);
        setImage(data.imagePath);
        setOldImage(data.imagePath);
        setLink(data.link);
      } catch (err) {
        console.log(err);
      }
    }
    tableRef.current.focus();
    fetchData();
  }, [categoryId]);

   const handleSubmit = async (e) => {
     let error = {};
     let alphaNumeric = /^[a-zA-Z0-9\s]*$/;

     e.preventDefault();
 
     if (!name.match(alphaNumeric) && name.length > 60) {
       error.name = "Name should be AlphaNumeric and should not exceed 60 characters.";
     }

     setError(error);
 
     if (Object.keys(error).length !== 0) {
       return;
     }
 
     const formData = new FormData();
     formData.append("name", name);
     formData.append("link", link);
     formData.append("image", image);
  
     try {
       const response = await fetch(`/api/menus/detail/${categoryId}`, {
         method: "PUT",
         body: formData,
       });
       if (!response.ok) {
         setError(await response.json());
         return;
       }
       const data = await response.json();
       console.log(data)
       navigate(`/admin/menus`);
     } catch (err) {
       console.log(err);
     }
    
   };
 
   return (
     signedInUser && signedInUser.accessLevel === 1 ? (
       <div className="addDishContainer">
         <h2>Edit Category</h2>
         <form className="addCategoryForm" onSubmit={handleSubmit} encType="multipart/form-data">
           <div className="input-container">
             <label htmlFor="name">Category Name *</label>
             <br/>
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
             <label htmlFor="link">Link *</label>
             <br />
             <input
               id="link"
               className="form-control"
               name="link"
               required
               value={link}
               onChange={(e) => setLink(e.target.value)}
             />
             </div>
            {error && error.UpdateCategory&& (
            <div className="text-danger">{error.updateDish}</div>
          )}

          {error && error.categoryError && (
            <div className="text-danger">{error.categoryError}</div>
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
     ) : (<Navigate to="/admin/menus" />)
   );
 }
 

