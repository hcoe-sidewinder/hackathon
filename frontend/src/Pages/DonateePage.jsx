import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Avatar,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";
import { sampleUser } from "../assets/sampleDetails"; // Import the sample data

const defaultProfilePicture = "https://via.placeholder.com/150"; // Default placeholder for profile picture

const DonateePage = ({ onPublish }) => {
  const navigate = useNavigate();

  const [donateeData, setDonateeData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
  const [numPhases, setNumPhases] = useState(1);
  const [amountsPerPhase, setAmountsPerPhase] = useState([""]);
  const [seekingAmount, setSeekingAmount] = useState("");
  const [reason, setReason] = useState("");

  // Simulate fetching donatee data and profile picture (can be from API or context)
  useEffect(() => {
    const fetchedDonateeData = {
      seekingAmount: "",
      reason: "To invest in an electric delivery van",
    };

    setDonateeData(fetchedDonateeData);
    setProfilePicture(defaultProfilePicture);
  }, []);

  const handleBackToHome = () => {
    navigate("/home"); // Navigate back to HomePage
  };

  const handleNumPhasesChange = (e) => {
    const newNumPhases = Math.min(Math.max(e.target.value, 1), 5); // Clamp between 1 and 5
    setNumPhases(newNumPhases);
    setAmountsPerPhase(new Array(newNumPhases).fill("")); // Directly fill with empty values, no need for prev
  };

  const handleAmountChange = (index, value) => {
    const newAmounts = [...amountsPerPhase];
    newAmounts[index] = value;
    setAmountsPerPhase(newAmounts);
  };

  const handlePublish = () => {
    const totalAmount = amountsPerPhase.reduce(
      (acc, amount) => acc + parseInt(amount || 0),
      0
    );
    if (totalAmount > seekingAmount) {
      alert("The total amount per phase cannot exceed the seeking amount.");
      return;
    }

    const formData = {
      businessName: sampleUser.nob, // Use sampleUser data
      panCardNumber: sampleUser.panNo, // Use sampleUser data
      seekingAmount: seekingAmount,
      reason: reason,
      numPhases: numPhases,
      amountsPerPhase: amountsPerPhase,
    };
    console.log("Form Data to be Published:", formData);
    if (onPublish) onPublish(formData); // Call the passed in onPublish function
  };

  return (
    <Box
      sx={{
        padding: 2,
        background: "linear-gradient(to bottom right, #134E5E, #71C9CE)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#d7e6e8",
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
          maxWidth: 600, // Smaller card size
          margin: "auto",
        }}
      >
        {/* Profile Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #0F2E3D",
            paddingBottom: 2,
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Profile Picture"
              src={profilePicture}
              sx={{
                width: 100, // Larger profile picture size
                height: 100,
                border: "4px solid #134E5E",
                boxShadow: 3,
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
            <Box sx={{ marginLeft: 2 }}>
              <Typography
                variant="h4" // Larger heading for the card
                sx={{ color: "#134E5E", fontWeight: "bold" }}
              >
                {sampleUser.nob} {/* Use sampleUser business name */}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                doneeemail@example.com
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Donatee Data Form Section */}
        {donateeData ? (
          <Card
            sx={{
              boxShadow: 3,
              marginBottom: 3,
              borderRadius: 2,
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                align="center"
                sx={{ marginBottom: 2, color: "#134E5E", fontSize: "1.8rem" }} // Larger font size for heading
              >
                Donatee Details
              </Typography>

              <form>
                <Grid container spacing={2}>
                  {/* Business Name (filled from user state) */}
                  <Grid item xs={12}>
                    <TextField
                      label="Business Name"
                      variant="outlined"
                      fullWidth
                      value={sampleUser.nob} // Use sampleUser business name
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: 1,
                        "& .MuiInputBase-root": {
                          borderColor: "#134E5E",
                          color: "#0F2E3D", // Darker shade of primary color
                        },
                      }}
                      disabled
                    />
                  </Grid>

                  {/* PAN Card Number (filled from user state) */}
                  <Grid item xs={12}>
                    <TextField
                      label="PAN Card Number"
                      variant="outlined"
                      fullWidth
                      value={sampleUser.panNo} // Use sampleUser pan number
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: 1,
                        "& .MuiInputBase-root": {
                          borderColor: "#134E5E",
                          color: "#0F2E3D", // Darker shade of primary color
                        },
                      }}
                      disabled
                    />
                  </Grid>

                  {/* Seeking Amount */}
                  <Grid item xs={12}>
                    <TextField
                      label="Seeking Amount"
                      variant="outlined"
                      fullWidth
                      value={seekingAmount}
                      onChange={(e) => setSeekingAmount(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: 1,
                        "& .MuiInputBase-root": {
                          borderColor: "#134E5E",
                          color: "#0F2E3D", // Darker shade of primary color
                        },
                      }}
                    />
                  </Grid>

                  {/* Reason */}
                  <Grid item xs={12}>
                    <TextField
                      label="Reason"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: 1,
                        "& .MuiInputBase-root": {
                          borderColor: "#134E5E",
                          color: "#0F2E3D", // Darker shade of primary color
                        },
                      }}
                    />
                  </Grid>

                  {/* Number of Phases */}
                  <Grid item xs={12}>
                    <TextField
                      label="Number of Phases"
                      variant="outlined"
                      type="number"
                      fullWidth
                      value={numPhases}
                      onChange={handleNumPhasesChange}
                      InputProps={{
                        inputProps: {
                          min: 1,
                          max: 5,
                        },
                      }}
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: 1,
                        "& .MuiInputBase-root": {
                          borderColor: "#134E5E",
                          color: "#0F2E3D", // Darker shade of primary color
                        },
                      }}
                    />
                  </Grid>

                  {/* Amount per Phase Fields */}
                  {new Array(numPhases).fill(0).map((_, index) => (
                    <Grid item xs={12} key={index}>
                      <TextField
                        label={`Amount for Phase ${index + 1}`}
                        variant="outlined"
                        fullWidth
                        value={amountsPerPhase[index]}
                        onChange={(e) =>
                          handleAmountChange(index, e.target.value)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}
                        sx={{
                          backgroundColor: "#fff",
                          borderRadius: 1,
                          "& .MuiInputBase-root": {
                            borderColor: "#134E5E",
                            color: "#0F2E3D", // Darker shade of primary color
                          },
                        }}
                      />
                    </Grid>
                  ))}

                  {/* Publish and Back to Home Buttons */}
                  <Grid item xs={12} container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          backgroundColor: "#134E5E", // Primary color
                          color: "#FFFFFF", // White text
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#0F2E3D", // Darker shade of primary color on hover
                          },
                        }}
                        onClick={handlePublish}
                      >
                        Publish
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          backgroundColor: "#134E5E", // Primary color
                          color: "#FFFFFF", // White text
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#0F2E3D", // Darker shade of primary color on hover
                          },
                        }}
                        onClick={handleBackToHome}
                      >
                        Back to Home
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1" align="center">
            Loading donatee data...
          </Typography>
        )}
      </Box>
    </Box>
  );
};

DonateePage.propTypes = {
  onPublish: PropTypes.func,
};

export default DonateePage;
