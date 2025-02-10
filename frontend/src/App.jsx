import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import { sampleDonation, sampleUser } from "./assets/sampleData";
import DonationDetail from "./Pages/DonationDetail";
import PaymentPage from "./Pages/PaymentPage";

import SignupPage from "./Pages/SignupPage";
// import DonationDetail from "./Pages/DonationDetail";
import HomePage from "./Pages/HomePage";
import DonateePage from "./Pages/DonateePage";


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
          path="/donation-detail/:id"
          element={
            <DonationDetail
              donation={sampleDonation}
              onBack={() => navigate("/home")}
            />
          }
        ></Route>
        <Route
          path="/payment"
          element={
            <PaymentPage
            />
          }
        ></Route>

        
        <Route path="/login" element={<LoginPage />} />

        {/* <Route path="/login" element={<LoginPage />} /> */}

        <Route path="/home" element={<HomePage />} />
        <Route path="/donatee" element={<DonateePage />} />

      </Routes>
    </Router>
  );
};

export default App;
