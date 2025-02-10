import { createContext, useContext, useReducer } from "react";

const TradeContext = createContext(null);

export const TradeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tradeReducer, {
    allTrades: [],
    doneeTrades: [],
    donorTrades: [],
  });
  <TradeContext.Provider value={{ state, dispatch }}>
    {children}
  </TradeContext.Provider>;
};

export const useTrade = () => {
  const trades = useContext(TradeContext);
  if (!trades) {
    console.log("no any trades");
    return;
  }
  return trades;
};
