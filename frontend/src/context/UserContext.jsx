import { createContext, useState } from "react";

import PropTypes from "prop-types"; // Import PropTypes

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // Stores the form data

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// PropTypes validation for children
UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // children should be a node and is required
};
