import React from "react";
import { useSelector } from "react-redux";

const TestAuth = () => {
  const authState = useSelector((state) => state.Auth);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Auth Debug</h2>
      <pre>{JSON.stringify(authState, null, 2)}</pre>
      <hr />
      <h3>LocalStorage</h3>
      <p>Token: {localStorage.getItem("token")}</p>
      <p>User: {localStorage.getItem("user")}</p>
    </div>
  );
};

export default TestAuth;
