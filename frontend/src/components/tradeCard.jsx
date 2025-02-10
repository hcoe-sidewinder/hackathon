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
  tradeId,
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
    console.log(tradeId)
    navigate(`/donation-detail/${tradeId}`);
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
            marginLeft: 3,
            marginRight: 3,
            marginTop: 1,
          }}
        >
          <Box sx={{ display: "flex", align: "center", mb: 3 }}>
            <Avatar
              src={profilePic || "/placeholder.svg"}
              sx={{ width: 100, height: 100, mr: 3, padding: 1 }}
            />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {nob}
              </Typography>

              <Typography
                variant="body1"
                sx={{ flex: 1, overflow: "auto", textWrap: "wrap", mb: 0 }}
              >
                <strong>Description:</strong> {desc}
              </Typography>
            </Box>
          </Box>

          <Divider
            sx={{
              mt: 0,
              width: "100%",
              align: "center",
              mr: "3",
              color: "gray-800",
            }}
          />

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Amount Needed:</strong> {total}
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Total Phases: </strong> {phaseid}
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>PAN No:</strong> {panno}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TradeCard;
