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
    <div>
      <button onClick={handleClick}>Iniciar Sesión</button>
    </div>
  );
}
