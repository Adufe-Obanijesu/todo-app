import { useState } from "react";
import moment from "moment";
import { ClipLoader } from "react-spinners";
import { updateDoc } from "../firebase/index";

// Importing icons
import { ImBin, ImCheckmark } from "react-icons/im";
import { FaTimes } from "react-icons/fa";

const EachTodo = ({todo, todos, status, docRef, date}) => {

    const [ loadingForDelete, setLoadingForDelete ] = useState(false);
    const [ loadingForMarkAsDone, setLoadingForMarkAsDone ] = useState(false);

    const deleteTask = () => {
        setLoadingForDelete(true);
        const newTodos = todos.filter(eachTodo => todo.id !== eachTodo.id);
        updateDoc(docRef, {
            todos: newTodos
        })
        .then(() => {
            setLoadingForDelete(false);
            console.log("Task deleted");
        })
        .catch(err => {
            setLoadingForDelete(false);
            console.log(err);
        })
    }

    const markAsDoneOrUndone = (status = true) => {
        const tomorrowDate = Date.parse(moment().startOf("day").add(1, "days")._d);
        const tomorrowDateString = new Date(tomorrowDate);
        
        if (date === tomorrowDate) {
            console.log(`Chill, its not yet ${tomorrowDateString.toDateString()}`);
            return;
        }

        if (status === false) setLoadingForMarkAsDone(true);

        const newTodos = todos.map(eachTodo => {
            if(todo.id === eachTodo.id) {
                eachTodo.done = !eachTodo.done
            }

            return eachTodo
        });
        updateDoc(docRef, {
            todos: newTodos
        })
        .then(() => {
            setLoadingForMarkAsDone(false);
            console.log("Task updated");
        })
        .catch(err => {
            setLoadingForMarkAsDone(false);
            console.log(err);
        })
    }

    const override = {
        borderColor: "white",
        margin: "0",
        padding: "0"
      };

      const overrideUndo = {
        borderColor: "red",
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
            {
                !todo.done ? (
                    <>
                        <button className="py-1 w-16 px-2 bg-orange-500 hover:bg-orange-600 transitionItem rounded text-sm" onClick={() => markAsDoneOrUndone()}>Done</button>
                        <button className="py-1 pl-2 w-8 bg-red-500 hover:bg-red-600 transitionItem rounded text-white">
                        {!loadingForDelete ? (
                            <span><ImBin className="icon" onClick={() => deleteTask()} /></span>
                        ) : (
                            <ClipLoader
                            size={20}
                            loading={loadingForDelete}
                            cssOverride={override}
                            />
                        )}
                        
                        </button>
                    </>
                ) : (
                    <>
                        <span><ImCheckmark className="icon text-green-500 text-lg"/>
                        </span>
                        {!loadingForMarkAsDone ? (
                            <span><FaTimes className="icon text-red-400 hover:text-red-500 cursor-pointer text-lg" onClick={() => markAsDoneOrUndone(false)} /></span>
                        ) : (
                            <ClipLoader
                            size={20}
                            loading={loadingForMarkAsDone}
                            cssOverride={overrideUndo}
                            />
                        )}
                        
                    </>
                )
            }
        </p>
    </li>
  )
}

export default EachTodo;