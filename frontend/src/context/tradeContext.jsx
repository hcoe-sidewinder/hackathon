import { createContext, useContext, useReducer } from "react";
import tradeReducer from "../Reducers/tradeReducers";

const initialState = {
  allTrades: [],
  doneeTrades: [],
  donorTrades: [],
};

const TradeContext = createContext({
  state: initialState,
  dispatch: () => {},
});

export const TradeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tradeReducer, initialState);

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
