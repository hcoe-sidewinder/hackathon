import { createContext, useContext, useReducer } from "react";
import tradeReducer from "../Reducers/tradeReducers";

// const initialState = {
//   allTrades: [],
//   doneeTrades: [],
//   donorTrades: [],
// };

// const TradeContext = createContext({
//   // state: initialState,
//   // dispatch: () => {},
// });

const TradeContext = createContext();

export const TradeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tradeReducer, {
    allTrades: [],
    doneeTrades: [],
    donorTrades: [],
  });

  return (
    <TradeContext.Provider value={{ state, dispatch }}>
      {children}
    </TradeContext.Provider>
  );
};

export const useTrade = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error("useTrade must be used inside a TradeProvider.");
  }
  return context;
};
