import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("pizzajoint-user")) || null;
//user slice
export const userSlice = createSlice({
  name: "user", //slice name
  initialState, //initial state
  reducers: {
    setUser: (state, action) => {
        
        localStorage.setItem("pizzajoint-user", JSON.stringify(action.payload));
        return action.payload;
    },
    logOut: () => {
        if (localStorage.getItem("pizzajoint-user")) {
        localStorage.removeItem("pizzajoint-user");
    }
        return null;
    },
    
}
    
});
export const selectUser = (state) => state.user;
export const selectAccess  = (state) => state.user?.accessLevel

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;