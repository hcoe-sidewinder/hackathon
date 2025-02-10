import React from "react";
import { useNavigate } from "react-router-dom";
import TradeCard from "../components/tradeCard"; // Adjust the path as needed
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

// Sample Data Array - This can be expanded in the future
export const sampleUsers = [
  {
    doneeId: "12345",
    donorId: "67890",
    phaseId: "3",
    nob: "Khatri Ceramics",
    totalAmount: "500000",
    desc: "I need the aforementioned amount to buy an electricity powered oven to replace the wood burning oven that i use to bake my pottery.",
    panNo: "775976",
  },
  // More items can be added here
];

// Default placeholder for profile picture
const defaultProfilePicture = "https://via.placeholder.com/150";

const HomePage = () => {
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
      {/* Enhanced Header */}
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
              src={defaultProfilePicture}
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
        {[1, 2, 3, 4, 5].map((_, index) => (
          <TradeCard key={index} />
        ))}

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
