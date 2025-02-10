const tradeReducer = ({ state, action }) => {
  switch (action.type) {
    case "set_allTrades":
      return { ...state, allTrades: action.payload };
    case "set_doneeTrades":
      return { ...state, doneeTrades: action.payload };
    case "set_donorTrades":
      return { ...state, donorTrades: action.payload };
    case "addTrades":
      return {
        ...state,
        allTrades: [...state.allTrades, action.payload],
        doneeTrades: [...state, doneeTrades, action.payload],
      };
    case "pledgeTrade":
      return {
        ...state,
        allTrades: state.allTrades.map((trade) => {
          return trade.id == action.payload.id ? action.payload : trade;
        }),
        doneeTrades: state.doneeTrades.map((trade) => {
          return trade.id == action.payload.id ? action.payload : trade;
        }),
        donorTrades: state.donorTrades.map((trade) => {
          return trade.id == action.payload.id ? action.payload : trade;
        }),
      };
  }
};
