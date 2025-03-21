/**
 * Responsive navigation menu
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React, { useState, useEffect } from 'react'
import AdminCategory from './AdminCategory'



export default function AdminMenus() {

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

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
  }, [isLoading,error]);
  return (
    <>
      {
        isLoading ? <p> Loading...</p> :
          error && error.menuError ? <h4 className="text-danger">{error.menuError}</h4> :
            categories.length > 0 ?
              (
                <ul className='menus'>
                  {categories.map((item) => (
                    <AdminCategory key={item._id} category={item}  />
                  ))}
                </ul>
              )
              : (
                <h4>Coming Soon</h4>
              )
      }
    </>
  );
}






