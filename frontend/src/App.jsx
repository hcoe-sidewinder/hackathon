import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import { sampleDonation, sampleUser } from "./assets/sampleData";
import DonationDetail from "./Pages/DonationDetail";
import PaymentPage from "./Pages/PaymentPage";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import DonateePage from "./Pages/DonateePage";
import DonationDetail from "./Pages/DonationDetail";

const App = () => {
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
          path="/donation-detail"
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
      </Routes>
    </Router>
  );
};

export default App;
