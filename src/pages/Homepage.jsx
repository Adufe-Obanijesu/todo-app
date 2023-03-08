import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { collection, db, onSnapshot, query, where } from "../firebase/index";

// Importing contexts
import { UserContext } from "../contexts/User";

// Importing components
import Todo from "../components/Todo";
import Header from "../components/Header";

// Creating context for the todo
// export const TodoContext = createContext();

const Homepage = () => {
  const { user } = useContext(UserContext);

  // States
  const [ todos, setTodos ] = useState([]);


  // Reference to todos collection
  const colRef = collection(db, "todos");
  
  useEffect(() => {
    let mounted = true
    if(mounted){
      if (Object.keys(user).length > 0) {
        const q = query(colRef, where("userId", "==", user.uid));
        onSnapshot(q, (snapshot) => {
          let arr = [];
          snapshot.docs.forEach((doc) => {
            arr.push({ ...doc.data(), id: doc.id });
          });
          setTodos(arr);
  
        });
      }
    }

    return () => {
      mounted = false
    };
  }, [user]);
  
  const override = {
    borderColor: "white",
  };

  return (
    <main className="">
      <Header />
      {todos && todos.length === 0 ? (
        <ClipLoader
          size={20}
          loading={true}
          className="mt-1 ml-2"
          cssOverride={override}
        />
      ) : (
        todos.map((todo) => <Todo key={todo.id} data={todo} status="inProcess" />)
      )}
    </main>
  );
};

export default Homepage;
