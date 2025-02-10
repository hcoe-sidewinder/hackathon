import { useNavigate } from "react-router-dom"; // Import for navigation
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";

function TradeCard({
  index,
  nob,
  phaseid,
  total,
  desc,
  panno,
  profilePic,
  donorId,
  userId,
}) {
  const navigate = useNavigate();

  // Handle card click to navigate to DonationDetail
  const handleClick = () => {
    navigate(`/donation-detail/${index}`);
  };

  return (
    <Box sx={{ maxWidth: 600, width: "100%", marginTop: 3 }}>
      <Card
        key={index}
        onClick={handleClick} // Add click event
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          display: donorId && doneeId ? "none" : "flex", // Hide card if donorId matches userId
          flexDirection: "column",
          height: 400,
          cursor: "pointer",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            align: "center",
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <Box sx={{ display: "flex", align: "center", mb: 3 }}>
            <Avatar
              src={profilePic || "/placeholder.svg"}
              sx={{ width: 60, height: 60, mr: 15, padding: 1 }}
            />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {nob}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phase ID: {phaseid}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1, flex: 1, overflow: "auto" }}
              >
                <strong>Description:</strong> {desc}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {nob}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Amount Needed:</strong> {total}
          </Typography>
          <Typography variant="body2">
            <strong>PAN No:</strong> {panno}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TradeCard;
