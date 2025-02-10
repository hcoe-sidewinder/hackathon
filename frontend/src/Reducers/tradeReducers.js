const tradeReducer = (state, action) => {
  // console.log("hello")
  switch (action.type) {
    case "set_allTrades":
      console.log("Previous State:", state);
      console.log("New Payload:", action.payload);
      // Ensure we're returning a new object with the updated allTrades
      return {
        ...state,
        allTrades: Array.isArray(action.payload) ? action.payload : [],
      };
    case "set_doneeTrades":
      return {
        ...state,
        doneeTrades: Array.isArray(action.payload) ? action.payload : [],
      };
    case "set_donorTrades":
      return {
        ...state,
        donorTrades: Array.isArray(action.payload) ? action.payload : [],
      };
    case "addTrades":
      return {
        ...state,
        allTrades: [...state.allTrades, action.payload],
        doneeTrades: [...state.doneeTrades, action.payload],
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

export default tradeReducer;
