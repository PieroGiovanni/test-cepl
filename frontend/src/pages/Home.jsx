import { useAuth } from "../context/authContext";

function Home() {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      Bienvenido {user.displayName}
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Home;
