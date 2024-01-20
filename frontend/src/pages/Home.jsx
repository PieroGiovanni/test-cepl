import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/authContext";
import { getBalance, makeDeposit, makeWithdrawal } from "../api/requests";

function Home() {
  const [balance, setBalance] = useState(null);

  const { logout, user } = useAuth();

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(user.accessToken);
    setBalance(balance.data.balance);
  }, [user.accessToken]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const handleLogout = async () => {
    await logout();
  };

  const handleDeposit = async () => {
    const res = await makeDeposit(user.accessToken, {
      quantity: 100,
    });

    console.log(res.data);

    fetchBalance();
  };

  const handleWithdrawal = async () => {
    const res = await makeWithdrawal(user.accessToken, {
      quantity: 100,
    });

    console.log(res.data);

    fetchBalance();
  };

  return (
    <div>
      {balance ? (
        <p>
          Bienvenido {user.displayName}, tienes S/. {balance}
        </p>
      ) : (
        <div>cargando..</div>
      )}
      <button onClick={handleDeposit}>depósito de 100</button>
      <button onClick={handleWithdrawal}>retiro de 100</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Home;
