import "./App.css";
import { Route, Routes, Router } from "react-router-dom";
import AboutUs from "./components/page-components/AboutUs";
import CarouselComponent from "./components/page-components/Carousel";
import Footer from "./components/page-components/Footer";
import LogIn from "./components/auth/login";
import Profile from "./components/auth/profile";
import ContactUs from "./components/page-components/ContactUs";
import Register from "./components/auth/register";
import NotFound from "./components/page-components/NotFoundPage";
import DishList from "./components/dish/DishList";
import DishDetails from "./components/dish/DishDetails";
import Menu from "./components/menu/Menu";
import Cart from "./components/cart/cart";
import Payment from "./components/cart/Payment";
import OrderList from "./components/order/OrderList";
import OrderDetails from "./components/order/OrderDetails";
import SearchOrders from "./components/admin/SearchOrders";
import Header from "./components/page-components/Header";
import UpdateDish from "./components/admin/UpdateDish";
import UpdateCategory from "./components/admin/UpdateCategory";
import AddDish from "./components/admin/AddDish";
import AddCategory from "./components/admin/AddCategory";
import AdminRoute from "./components/routes/AdminRoute";
import UserRoute from "./components/routes/UserRoute";
import PublicRoute from "./components/routes/PublicRoute";
import AdminDishDetails from "./components/admin/AdminDishDetails";
import AdminPortal from "./components/admin/AdminPortal";
import AdminMenu from "./components/admin/AdminMenu";
import AdminDishList from "./components/admin/AdminDishList";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <CarouselComponent />
              <AboutUs />
            </PublicRoute>
          }
        />
        <Route
          path="/about-us"
          element={
            <PublicRoute>
              <AboutUs />
            </PublicRoute>
          }
        />
        <Route
          path="/contact-us"
          element={
            <PublicRoute>
              <ContactUs />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LogIn />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/menus"
          element={
            <PublicRoute>
              <Menu />
            </PublicRoute>
          }
        />
        <Route
          path="/menus/:category"
          element={
            <PublicRoute>
              <DishList />
            </PublicRoute>
          }
        />
        <Route
          path="/dishes/:dishId"
          element={
            <PublicRoute>
              <DishDetails />
            </PublicRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PublicRoute>
              <Cart />
            </PublicRoute>
          }
        />

        {/* Protected Routes for logined users */}

        <Route
          path="/profile"
          element={
            <UserRoute>
              <Profile />
            </UserRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <UserRoute>
              <Payment />
            </UserRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <UserRoute>
              <OrderList />
            </UserRoute>
          }
        />
        <Route
          path="/orders/:orderId"
          element={
            <UserRoute>
              <OrderDetails />
            </UserRoute>
          }
        />

<Route
          path="/admin"
          element={
            <AdminRoute>
              < AdminPortal/>
            </AdminRoute>
          }
        />


<Route
          path="/admin/menus"
          element={
            <AdminRoute>
              <AdminMenu />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/menus/:category"
          element={
            <AdminRoute>
              <AdminDishList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/dishes/:dishId"
          element={
            <AdminRoute>
              <AdminDishDetails />
            </AdminRoute>
          }
        />



        <Route
          path="/admin/searchOrders"
          element={
            <AdminRoute>
              <SearchOrders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/searchOrders/:criteria"
          element={
            <><AdminRoute>
              <SearchOrders />
              </AdminRoute>
            </>
          }
        />
        


        <Route
          path="/admin/dishes/:dishId/update"
          element={
            <><AdminRoute>
              <UpdateDish />
              </AdminRoute >
            </>
          }
        />

        <Route
          path="/admin/menus/:categoryId/update"
          element={
            <><AdminRoute>
              <UpdateCategory />
              </AdminRoute>
            </>
          }
        />

        <Route
          path="/admin/dishes/addDish"
          element={
            <><AdminRoute>
              <AddDish />
              </AdminRoute>
            </>
          }
        />

        <Route
          path="/admin/menus/addCategory"
          element={
            <><AdminRoute>
              <AddCategory />
            </AdminRoute>
            </>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
