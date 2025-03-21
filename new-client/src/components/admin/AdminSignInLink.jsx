/**
 * User sign in link and links for signed in user (profile, logout, cart, orders)
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import { BsPersonCircle } from "react-icons/bs";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser} from '../../store/slices/user-slice';


export default function AdminSignInLink() {

  const dispatch = useDispatch();
  const signedInUser = useSelector(selectUser);
  const setLoggedInUser = (user) => {
    dispatch(setUser(user));
  }

  return signedInUser ? (
    <SignedIn
      setLoggedInUser={setLoggedInUser}
      signedInUser={signedInUser}
    />
  ) : (
    <LoginButton />
  );
}

function LoginButton() {
  let navigate = useNavigate();
  return (
    <div className="logIn">
      <button onClick={() => navigate("/login")}>Sign In</button>
    </div>
  );
}

function logout( setLoggedInUser) {
  setLoggedInUser(null);

  <Navigate to="/" />;
}

function LogoutButton({ setLoggedInUser }) {
  return (
    <div className="logOut">
      <button
        data-testid="logout"
        aria-label="logout"
        onClick={() => {
          logout( setLoggedInUser);
        }}
      >
        Log out
      </button>
    </div>
  );
}

function SignedIn({ setLoggedInUser}) {
  return (
    <nav>
      <DropdownButton
        id="dropdown-button"
        variant="light"
        title={<BsPersonCircle role="img" aria-label="signed in user" />}
      >
        <Dropdown.Item as={Link} to="/profile">Your Profile</Dropdown.Item>

        <hr />
        <Dropdown.Item>
          <LogoutButton
            setLoggedInUser={setLoggedInUser}
          />
        </Dropdown.Item>
      </DropdownButton>
    </nav>
  );
}

