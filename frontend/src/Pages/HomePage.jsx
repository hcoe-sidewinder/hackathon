import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TradeCard from "../components/tradeCard";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Card,
  CardContent,
  AppBar,
  Toolbar,
} from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import axios from "axios";
import { useTrade } from "../context/tradeContext";
import { Cookie } from "lucide-react";

const HomePage = () => {
  const { state, dispatch } = useTrade();
  useEffect(() => {
    const getAllTasks = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}trade`,
        {},
        {
          Headers: {
            Cookie: { access_token: localStorage.getItem("token") },
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.data);
        dispatch({ type: "set_allTrades", payload: response.data.data });
      }
    };
    getAllTasks();
  }, []);
  useEffect(() => {
    const getdoneeTasks = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}trade/asked`,
        { withCredentials: true }
      );
      if (response.data.success) {
        console.log(response.data.data);
        dispatch({ type: "set_doneeTrades", payload: response.data.data });
      }
    };
    getdoneeTasks();
  }, []);
  useEffect(() => {
    const getdonorTasks = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}trade/donated`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        console.log(response.data.data);
        dispatch({ type: "set_donorTrades", payload: response.data.data });
      }
    };
    getdonorTasks();
  }, []);
  const authString = localStorage.getItem("auth");
  const auth = JSON.parse(authString);
  // console.log(auth);
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    console.log("Logged out!");
    navigate("/login");
  };

  const handleGoToDonateePage = () => {
    navigate("/donatee");
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#0F2E3D" }}>
        <Toolbar
          sx={{
            height: 80, // Increased height
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          {/* Left side - Title and Icon */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Hariyo Paila
            </Typography>
            <DirectionsWalkIcon
              sx={{
                color: "#4CAF50", // Green color
                fontSize: 40,
              }}
            />
          </Box>

          {/* Right side - Buttons and Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleGoToDonateePage}
              sx={{
                backgroundColor: "#134E5E",
                height: 40,
                "&:hover": {
                  backgroundColor: "#0d3b47",
                },
              }}
            >
              Announce Donation
            </Button>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                backgroundColor: "#134E5E",
                height: 40,
                "&:hover": {
                  backgroundColor: "#0d3b47",
                },
              }}
            >
              Log Out
            </Button>
            <Avatar
              src={auth.profilePic}
              sx={{
                width: 50,
                height: 50,
                cursor: "pointer",
              }}
              onClick={handleGoToProfile}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          padding: 2,
          background: "linear-gradient(to bottom right, #134E5E, #71C9CE)",
          minHeight: "calc(100vh - 80px)", // Adjusted for new header height
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="grid grid-cols-4 gap-10">
          {[1, 2, 3, 4, 5, 6, 7, 4, 3].map((_, index) => (
            <TradeCard key={index} />
          ))}
        </div>

        {/* Footer Section */}
        <Box
          sx={{
            marginTop: 4,
            padding: "8px 16px",
            backgroundColor: "#0F2E3D",
            width: "100%",
            position: "fixed",
            bottom: 0,
            left: 0,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#fff", fontFamily: "'Roboto', sans-serif" }}
          >
            &copy; 2025, All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
