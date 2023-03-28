import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
      axios
        .get("http://localhost:8000/api/admin/authenticate", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.verified) {
            setAuthenticated(true);
          }
          if (!res.data.verified) {
            setAuthenticated(false);
          }
          setLoaded(true);
        })
        .catch((err) => {
          setLoaded(true);
        });
  }, []);

  return loaded ? (
    authenticated ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/admin" />
    )
  ) : (
    <p>Loading...</p>
  );
};

export default ProtectedRoute;
