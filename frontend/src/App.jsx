import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import { sampleDonation, sampleUser } from "./assets/sampleData";
import DonationDetail from "./Pages/DonationDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/profile"
          element={<ProfilePage user={sampleUser} />}
        ></Route>
        <Route
          path="/donation-detail"
          element={<DonationDetail donation={sampleDonation} onBack={()=>navigate("/home")}/>} 
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
