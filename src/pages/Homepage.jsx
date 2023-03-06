import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importing contexts
import { UserContext } from "../contexts/User";

// Importing components
import Todo from "../components/Todo";
import Header from "../components/Header";

const Homepage = () => {
  const {user, loadingUser} = useContext(UserContext);
  console.log("homepage", user)
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = () => (!user && loadingUser ===false) && navigate("/login");

    return () => {
      checkUser();
    }
  }, [user, loadingUser])
  
  return (
    <main className="">
      <Header />
      <Todo status="inProcess" />
      <Todo status="excellent" />
      <Todo status="good" />
      <Todo status="bad" />
    </main>
  );
};

export default Homepage;
