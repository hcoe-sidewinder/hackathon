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
import TaxCalculator from "../components/TaxCalculator";

const HomePage = () => {
  const authString = localStorage.getItem("auth");
  const auth = JSON.parse(authString);
  const { state, dispatch } = useTrade();
  // Change this line to use state.allTrades instead of sampleUsers
  const filteredCards = state.allTrades
    ? state.allTrades.filter((card) => !(card.donorId && card.doneeId))
    : [];

  return (
    <Box>
      <Header />
      <Hero />
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 4,
            width: "100%",
            padding: 2,
          }}
        >
          {filteredCards.map((trade, index) => {
            return (
              <TradeCard
                key={index}
                tradeId={trade._id}
                index={trade.index}
                nob={trade.nob}
                phaseid={trade.phaseId?.length}
                total={trade.totalAmount}
                desc={trade.desc}
                panno={trade.doneeId?.panNo}
                profilePic={trade.doneeId?.profilePic}
                donorId={trade.donorId?._id}
                doneeId={trade.doneeId?._id}
              />
            );
          })}
        </Box>
      </Box>
      <HowItWorks />
      <Footer />
      <ChatBot />
    </Box>
  );
};
export default HomePage;
