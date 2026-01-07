// Dashboard.jsx
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Dashboard() {
  const user = useContext(AuthContext);

  return (
    <h2>
      {user.loggedIn ? `Welcome ${user.name}` : "Please login"}
    </h2>
  );
}

export default Dashboard;
