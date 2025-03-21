/**
 * A button in header link to search page
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function SearchButton() {

  let navigate = useNavigate();

  const handleClick = () => {
    navigate(`/searchDish`);
  }

  return (
    <div className="searchContainer">
      <button type="submit" value="Submit" onClick={handleClick}>
        <BsSearch role="img" aria-label="search icon" className="search-icon" />
      </button>
    </div>
  );
}

