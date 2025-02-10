import "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Avatar, IconButton } from "@mui/material";

// Default placeholder for profile picture
const defaultProfilePicture = "https://via.placeholder.com/150";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGoToDonateePage = () => {
    navigate("/donatee"); // Navigate to the Donatee Page
  };

  const handleGoToProfile = () => {
    navigate("/profile"); // Navigate to Profile Page
  };

  const handleLogout = () => {
    // Handle Logout Logic here (e.g., clearing session, redirecting, etc.)
    console.log("Logged out!");
    navigate("/login"); // Navigate to login page after logout
  };

  return (
    <Box
      sx={{
        padding: 2,
        background: "linear-gradient(to bottom right, #134E5E, #71C9CE)",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Header Section (Navbar) */}
      <Box
        sx={{
          width: "100%",
          height: "15%",
          backgroundColor: "#0F2E3D",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          margin: 0, // Ensuring no margin at the top
          position: "fixed", // Fixed position to keep it at the top
          top: 0, // Ensure it sticks to the top
          zIndex: 9999, // Keep it above other content
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://via.placeholder.com/30" // Replace with your footprint logo
            alt="Logo"
            style={{ marginRight: 10 }}
          />
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "bold",
            }}
          >
            Hariyo Paila
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Profile Picture and Button */}
          <IconButton onClick={handleGoToProfile} sx={{ padding: 0 }}>
            <Avatar
              alt="Profile Picture"
              src={defaultProfilePicture}
              sx={{
                width: 40,
                height: 40,
                marginRight: 2,
                border: "2px solid #fff",
              }}
            />
          </IconButton>

          {/* Buttons */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoToDonateePage}
            sx={{
              backgroundColor: "#134E5E",
              marginRight: 2,
              padding: "12px 20px",
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#134E5E", // Darker shade on hover
              },
            }}
          >
            Announce Donation
          </Button>
          <Button
            variant="contained"
            color="primary" // Change to primary to match style
            onClick={handleLogout}
            sx={{
              backgroundColor: "#134E5E",
              padding: "12px 20px",
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#134E5E", // Darker shade on hover
              },
            }}
          >
            Log Out
          </Button>
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ marginTop: 10, width: "100%", padding: 2 }}>
        {/* Your main content will go here */}
      </Box>

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
  );
};

export default HomePage;
