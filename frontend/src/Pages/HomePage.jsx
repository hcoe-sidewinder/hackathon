import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TradeCard from "../components/tradeCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import ChatBot from "./ChatBot";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useTrade } from "../context/tradeContext";

// Sample Data Array - yo chai pachi hatauda huncha...backend bata data fetch garera lyaune
export const sampleUsers = [
  {
    index: 1,
    doneeId: "12345",
    donorId: "67890",
    phaseId: "3",
    nob: "Khatri Ceramics",
    totalAmount: "500000",
    desc: "I need the aforementioned amount to buy an electricity powered oven to replace the wood burning oven that I use to bake my pottery.",
    panNo: "775976",
    profilePic: "https://via.placeholder.com/150",
  },
  {
    index: 2,
    doneeId: "54321",
    donorId: null, // No donorId
    phaseId: "5",
    nob: "Green Grocers",
    totalAmount: "300000",
    desc: "We need funds to purchase organic seeds and fertilizers to expand our farm.",
    panNo: "123456",
    profilePic: "https://via.placeholder.com/150",
  },
  {
    index: 3,
    doneeId: "09876",
    donorId: null, // No donerId
    phaseId: "7",
    nob: "Eco Builders",
    totalAmount: "700000",
    desc: "Funds are needed to construct eco-friendly housing for low-income families.",
    panNo: "987654",
    profilePic: "https://via.placeholder.com/150",
  },
  {
    index: 4,
    doneeId: "11223",
    donorId: "44556",
    phaseId: "9",
    nob: "Solar Solutions",
    totalAmount: "900000",
    desc: "We aim to install solar panels in rural areas to provide clean energy.",
    panNo: "334455",
    profilePic: "https://via.placeholder.com/150",
  },
  {
    index: 5,
    doneeId: "11623",
    donorId: "44656",
    phaseId: "8",
    nob: "Wind Surfers",
    totalAmount: "50000",
    desc: "We aim to harness wind energy rural areas.",
    panNo: "334455",
    profilePic: "https://via.placeholder.com/150",
  },
];

// yo chai profile picture ko default value
const defaultProfilePicture = "https://via.placeholder.com/150";

const HomePage = () => {
  const { dispatch } = useTrade();
  useEffect(() => {
    const getAllTasks = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}trade`,
        {},
        {
          Headers: {
            Cookie: { access_token: localStorage.getItem("token") },
          },
        },
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
        { withCredentials: true },
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
        },
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

  // dubai donorId and doneeId vayeko cards filter garna
  const filteredCards = sampleUsers.filter(
    (card) => !(card.donorId && card.doneeId),
  );

  const handleGoToDonateePage = () => {};
  const handleLogout = () => {};
  const handleGoToProfile = () => {};
  return (
    <Box>
      <Header />
      <Hero />

      {/* Main Content */}
      <Box
        sx={{
          padding: 4,
          background: "linear-gradient(to bottom right, #134E5E, #71C9CE)",
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" sx={{ color: "white", mb: 4, ml: 2 }}>
          Featured Donations
        </Typography>

        {/* Grid of TradeCards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 4,
            width: "100%",
            padding: 2,
          }}
        >
          {filteredCards.map((user, index) => (
            <TradeCard
              key={index}
              index={user.index}
              nob={user.nob}
              phaseid={user.phaseId}
              total={user.totalAmount}
              desc={user.desc}
              panno={user.panNo}
              profilePic={user.profilePic || defaultProfilePicture}
              donorId={user.donorId}
              doneeId={user.doneeId}
              userId="67890" // esma chai user id rakhda bhayo
            />
          ))}
        </Box>
      </Box>

      <HowItWorks />

      <Footer />

      <ChatBot />
    </Box>
  );
};

export default HomePage;
