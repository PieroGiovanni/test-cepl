import { useState } from "react";
import { getPing } from "../api/ping";
import { useAuth } from "../context/authContext";
import { makeDeposit } from "../api/requests";

function Home() {
  const [ping, setPing] = useState(null);

  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  const handlePing = async () => {
    const res = await getPing(user.accessToken);
    setPing(res.data);
    console.log(res.data);
  };

  const handleDeposit = async () => {
    const res = await makeDeposit(user.accessToken, {
      quantity: 69,
    });

    console.log(res.data);
  };

  return (
    <div>
      Bienvenido {user.displayName}
      <p>{ping}</p>
      <button onClick={handlePing}>ping</button>
      <button onClick={handleDeposit}>deposito de 100</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Home;
