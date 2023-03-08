import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { updateDoc } from "../firebase/index";

// Importing icons
import { ImBin } from "react-icons/im";

const EachTodo = ({todo, todos, status, docRef}) => {

    const [ loading, setLoading ] = useState(false);

    const deleteTask = () => {
        setLoading(true);
        const newTodos = todos.filter(eachTodo => todo.id !== eachTodo.id);
        updateDoc(docRef, {
            todos: newTodos
        })
        .then(() => {
            setLoading(false);
            console.log("Task deleted");
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
        })
    }

    const override = {
        borderColor: "white",
        margin: "0",
        padding: "0"
      };

  return (
    <li className={`grid grid-cols-12 gap-1 border-b ${status === "excellent" && "border-green-500"} ${status === "good" && "border-orange-500"} ${status === "bad" && "border-red-500"} py-2 items-center`}>{
        todo.priority === 'A' && <span className="font-bold text-red-700">A</span>
    }
    {
        todo.priority === 'B' && <span className="font-bold text-green-700">B</span>
    }
    {
        (todo.priority === 'C' && status !== "inProcess") && <span className="font-bold text-white">C</span>
    }
    {
        (todo.priority === 'C' && status === "inProcess") && <span className="font-bold text-orange-500">C</span>
    }
        <p className={`col-span-8 ${status === "inProcess" && "text-gray-500"}`}>{todo.task}</p> 
        <p className="col-span-3 flex justify-center gap-2">
            <button className="py-1 w-16 px-2 bg-orange-500 hover:bg-orange-600 transitionItem rounded text-sm">Done</button>
            <button className="py-1 pl-2 w-8 bg-red-500 hover:bg-red-600 transitionItem rounded text-white">
            {!loading ? (
                <span><ImBin className="icon" onClick={() => deleteTask()} /></span>
            ) : (
                <ClipLoader
                size={20}
                loading={loading}
                cssOverride={override}
                />
            )}
            
            </button>
        </p>
    </li>
  )
}

export default EachTodo;