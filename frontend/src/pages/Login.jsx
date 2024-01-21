import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Login() {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-sm p-6 flex flex-col gap-20 justify-center items-center w-[500px] h-[500px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-2xl">Bienvenido a mi Banco</h1>
      <button
        onClick={handleClick}
        className="text-gray-900 h-16 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Iniciar Sesión
      </button>
    </div>
  );
}
