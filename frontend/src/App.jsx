import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import { sampleDonation, sampleUser } from "./assets/sampleData";
import SignupPage from "./Pages/SignupPage";
// import DonationDetail from "./Pages/DonationDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage/>}></Route>

        <Route
          path="/profile"
          element={<ProfilePage user={sampleUser} />}
        ></Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
