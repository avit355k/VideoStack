import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom"; // Corrected import
import Login from "./pages/Login";
import CD from "./pages/CD";
import DVD from "./pages/DVD";
import CreateAccount from "./pages/CreateAccount";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewVideoDetails from "./components/ViewVideoDetails/ViewVideoDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddVideo from "./pages/AddVideo";
import UpdateVideo from "./pages/UpdateVideo";
import SearchResults from "./components/SearchResults/SearchResults";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import StoreInfo from "./pages/StoreInfo";

const App = () => {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div>

      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/CD" element={<CD />} />
        <Route path="/DVD" element={<DVD />} />
        <Route path="/Store Info" element={<StoreInfo />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} >
          {role === "user" ? <Route index element={<Favourites />} /> : <Route index element={<AllOrders />} />}
          {role === "admin" && <Route path="/Profile/Add-Video" element={<AddVideo />} />}
          <Route path="/Profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/Profile/settings" element={<Settings />} />
        </Route>
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/Reset-Password" element={<ResetPassword />} />
        <Route path="/Update-video/:id" element={<UpdateVideo />} />
        <Route path="/view-video-details/:id" element={<ViewVideoDetails />} />

      </Routes>
      <Footer />

    </div>
  );
};

export default App;
