import React, { createContext, useContext, useEffect, useState } from "react";
import * as userService from "../services/user.service";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

function UserProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL USERS
  const getUsers = async () => {
    try {
      if (!token) return;

      setLoading(true);

      const res = await userService.getUsers(token);

      setUsers(res.data);
    } catch (error) {
      console.log( "GET USERS ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // GET USER BY ID
  const getUserById = async (id) => {
    try {
      if (!token) return;

      const res = await userService.getUserById(token, id);

      return res.data;
    } catch (error) {
      console.log( "GET USER ERROR:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUsers();
    } else {
      setUsers([]);
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        getUsers,
        getUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;