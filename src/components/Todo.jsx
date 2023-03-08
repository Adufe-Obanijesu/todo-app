import { useState, useEffect } from "react";
import { doc, db, onSnapshot, deleteDoc } from "../firebase/index";

// Importing icons
import { ImBin } from "react-icons/im";
import { FaPlus } from "react-icons/fa";

// Importing components
import EachTodo from "./EachTodo";
import AddTodo from "./modals/AddTodo";
import DeleteTodo from "./modals/DeleteTodo.jsx";

const Todo = ({status, data}) => {

    const [ todo, setTodo ] = useState({});

    const [addTodoModal, setAddTodoModal] = useState(false);
    const [deleteTodoModal, setDeleteTodoModal] = useState(false);

    const date = new Date(data.date);

    // Reference on document
    const docRef = doc(db, "todos", data.id);

    useEffect(() => {
        const unsub = () => {
            onSnapshot(docRef, snapshot => {
                setTodo(snapshot.data());
            })
        }
        
        return () => {
            unsub();
        }
    }, [])

  return (
    <div className="flex justify-center">

    <div className={`w-5/6 md:w-2/3 lg:w-1/3 lg:1/3 my-4 rounded drop-shadow px-4 py-8 bg-green-400 ${status === "excellent" && "bg-green-400"} ${status === "good" && "bg-orange-400"} ${status === "bad" && "bg-red-400"} ${status === "inProcess" && "bg-white"} text-white`}>
        <div className="flex justify-between mb-2">
            <h3 className={`font-bold text-xl mb-2 ${status === "inProcess" && "text-gray-600"}`}>{date.toDateString()}</h3>
            <button className={`py-2 pl-3 ${status === "inProcess" && "bg-gray-500 hover:bg-gray-600"} ${status === "excellent" && "bg-green-600 hover:bg-green-700"} ${status === "good" && "bg-orange-600 hover:bg-orange-700"} ${status === "bad" && "bg-red-500 hover:bg-red-600"} transitionItem rounded text-white text-sm`} onClick={() => setAddTodoModal(true)}>Add a new task<span><FaPlus className="icon ml-2" /></span></button>
        </div>
        <ul>
            {
                todo.todos && todo?.todos.length !== 0 ? todo?.todos.map(eachTodo => <EachTodo key={eachTodo.id} todo={eachTodo} status={status} todos={todo.todos} docRef={docRef} />) : <h3 className="text-xl font-semibold text-gray-500 mt-3">No todo found</h3>
            }
        </ul>
        <div className="flex gap-5 items-center justify-between mt-6">
            <p className={`${status === "inProcess" && "text-gray-500"}`}>Your day was productive. Well done &#x1F44D;</p>
            <button className="py-2 pl-3 bg-red-500 hover:bg-red-600 transitionItem rounded text-white"><span onClick={() => setDeleteTodoModal(true)}><ImBin className="icon" /></span></button>
        </div>
    </div>
    {/* Adding Modal */}
    <AddTodo addTodoModal={addTodoModal} setAddTodoModal={() => setAddTodoModal()} docRef={docRef} todos={todo.todos} />
    <DeleteTodo deleteTodoModal={deleteTodoModal} setDeleteTodoModal={() => setDeleteTodoModal()} docRef={docRef} />
    </div>
  )
}

export default Todo