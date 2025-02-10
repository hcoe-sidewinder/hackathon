import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import { sampleDonation, sampleUser } from "./assets/sampleData";
import DonationDetail from "./Pages/DonationDetail";
import PaymentPage from "./Pages/PaymentPage";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import DonateePage from "./Pages/DonateePage";
import ChatBot from "./Pages/ChatBot";
import { useEffect } from "react";
import axios from "axios";
import { useTrade } from "./context/tradeContext";

const App = () => {
  const { state, dispatch } = useTrade();
  useEffect(() => {
    const getAllTrade = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}trade`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch({ type: "set_allTrades", payload: response.data.data });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getAllTrade();
  }, []);
  useEffect(() => {
    const getdoneeTrade = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}trade/asked`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch({ type: "set_doneeTrades", payload: response.data.data });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getdoneeTrade();
  }, []);
  useEffect(() => {
    const getdonorTrades = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}trade/donated`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch({ type: "set_donorTrades", payload: response.data.data });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getdonorTrades();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route
          path="/profile"
          element={<ProfilePage user={sampleUser} />}
        ></Route>

        <Route
          path="/donation-detail/:id"
          element={
            <DonationDetail
              donation={sampleDonation}
              onBack={() => navigate("/home")}
            />
          }
        ></Route>
        <Route path="/payment" element={<PaymentPage />}></Route>

        <Route path="/home" element={<HomePage />} />
        <Route path="/donatee" element={<DonateePage />} />
        <Route path="/donationDetail" element={<DonationDetail />} />
        <Route path="/chat" element={<ChatBot />} />
      </Routes>
    </Router>
  );
};

export default App;
