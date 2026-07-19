import React, { createContext, useContext, useEffect, useState,} from "react";
import { AuthContext } from "./AuthContext";
import * as dashboardService from "../services/dashboard.service";

export const DashboardContext = createContext();

function DashboardProvider({ children }) {

  const { token } = useContext(AuthContext);
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(false);

  const getDashboard = async () => {

    try {

      if (!token) return;

      setLoading(true);

      const res = await dashboardService.getDashboard(token);

      setDashboard(res.data);

    } catch (error) {

      console.log( "GET DASHBOARD ERROR:", error.response?.data || error.message);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    getDashboard();

  }, [token]);

  return (
    <DashboardContext.Provider
      value={{
        dashboard,
        loading,
        getDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;