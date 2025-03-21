import { useDispatch } from "react-redux";
import { increamentAmount, decrementAmount } from "../../store/slices/cart-slice";


export default function CartItem({ item}) {
    const { name, description, imagePath, price, quantity } = item;
    const sub = (price * quantity).toFixed(2);
    const dispatch = useDispatch();
    const onIncrement = (item) => {
      dispatch(increamentAmount(item));
    };
    const onDecrement = (item) => {
      dispatch(decrementAmount(item));
    };
  
    return (
      <>
        <li>
          <div className="itemContainer container">
            <div className="itemImage">
              <img src={`/${imagePath}`} alt={name} />
            </div>
            <div className="itemDetail">
              <div className="itemName">
                {quantity} X {name}
                <span>${sub}</span>
              </div>
              <p className="itemDiscrip">{description}</p>
              <p>Price: ${price}</p>
  
              <div className="updateQuantity">
                <button aria-label="delete" onClick={() => onDecrement(item)}>
                 - 
                </button>
                <span>{quantity}</span>
                <button
                  data-testid="add"
                  aria-label="add"
                  onClick={() => onIncrement(item)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </li>
      </>
    );
  }
  