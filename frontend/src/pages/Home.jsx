import { useState, useEffect, useCallback, Suspense } from "react";
import { useAuth } from "../context/authContext";
import {
  getBalance,
  getLastTransactions,
  makeDeposit,
  makeWithdrawal,
} from "../api/requests";
import { Button, Toast } from "flowbite-react";
import { Table } from "flowbite-react";

function Home() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState(null);
  const [depositInput, setDepositInput] = useState(0);
  const [withdrawalInput, setWithdrawalInput] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const { logout, user } = useAuth();

  const fetchData = useCallback(async () => {
    const balance = await getBalance(user.accessToken);
    const lastTransactions = await getLastTransactions(user.accessToken);
    setTransactions(lastTransactions.data);
    setBalance(balance.data.balance);
    setLoading(false);
  }, [user.accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    await logout();
  };

  const handleDeposit = async () => {
    setLoading(true);
    const res = await makeDeposit(user.accessToken, {
      quantity: Number(depositInput),
    });
    setDepositInput(0);
    setToastMessage(res.data.message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    fetchData();
  };

  const handleWithdrawal = async () => {
    setLoading(true);
    const res = await makeWithdrawal(user.accessToken, {
      quantity: Number(withdrawalInput),
    });
    setWithdrawalInput(0);
    setToastMessage(res.data.message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    fetchData();
  };

  return (
    <div className="max-w-sm p-6 flex flex-col gap-5 justify-center items-center w-[500px] h-[600px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-4xl">Hola {user.displayName}</h1>
      {!loading ? (
        <p>
          Tienes S/. <strong className="text-xl"> {balance}</strong>
        </p>
      ) : (
        <div>cargando..</div>
      )}
      <div className="flex items-center gap-4">
        <Button
          disabled={depositInput < 1}
          onClick={handleDeposit}
          className="w-32"
          color="green"
        >
          DEPOSITAR
        </Button>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 text-center p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          onChange={(e) => setDepositInput(e.target.value)}
          value={depositInput}
        />
      </div>
      <div className="flex items-center gap-4">
        <Button
          disabled={withdrawalInput < 1}
          color="red"
          className="w-32"
          onClick={handleWithdrawal}
        >
          RETIRAR
        </Button>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 text-center p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          onChange={(e) => setWithdrawalInput(e.target.value)}
          value={withdrawalInput}
        />
      </div>

      <Suspense fallback={<h2>Cargando...</h2>}>
        <div className="overflow-x-auto w-full">
          <Table className="text-xs">
            <Table.Head className="text-center">
              <Table.HeadCell className="text-white">Cantidad</Table.HeadCell>
              <Table.HeadCell className="text-white">
                Hora y Fecha
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {transactions?.map((transaction) => {
                const bgColor =
                  transaction.type === "DEPOSIT"
                    ? "bg-green-900"
                    : "bg-red-900";

                return (
                  <Table.Row
                    color="red"
                    key={transaction.id}
                    className={`bg-white text-white dark:border-white dark:${bgColor} text-center`}
                  >
                    <Table.Cell>
                      {transaction.type === "DEPOSIT"
                        ? "S/. " + transaction.quantity
                        : "- S/. " + transaction.quantity}
                    </Table.Cell>
                    <Table.Cell>{transaction.date}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </Suspense>
      <Button onClick={handleLogout}>Cerrar Sesión</Button>
      {showToast && (
        <Toast className="fixed bottom-2 right-2">{toastMessage}</Toast>
      )}
    </div>
  );
}

export default Home;
