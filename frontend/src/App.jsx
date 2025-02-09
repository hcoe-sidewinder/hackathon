import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import { sampleUser } from "./assets/sampleData";
import SignupPage from "./Pages/SignupPage";

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
