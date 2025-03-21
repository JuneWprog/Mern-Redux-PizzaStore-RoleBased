import React from 'react'
import AdminSignInLink from "./AdminSignInLink";
import AdminNav from "./AdminNav";
import { selectUser} from '../../store/slices/user-slice';
import { useSelector } from "react-redux";



export default function AdminHeader() {
  
  const signedInUser = useSelector(selectUser);

  return (
    <header className="headerContainer">
      
      <AdminSignInLink />
      <AdminNav signedInUser={signedInUser} />
    </header>
  );
}


