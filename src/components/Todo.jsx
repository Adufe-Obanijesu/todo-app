import { useState } from "react";

// Importing icons
import { ImBin } from "react-icons/im";
import { FaPlus } from "react-icons/fa";

// Importing components
import EachTodo from "./EachTodo";
import AddTodo from "./modals/AddTodo";

const Todo = ({status, date}) => {

    const [addTodoModal, setAddTodoModal] = useState(false);

  return (
    <div className="flex justify-center">

    <div className={`w-5/6 md:w-2/3 lg:w-1/3 lg:1/3 my-4 rounded drop-shadow px-4 py-8 bg-green-400 ${status === "excellent" && "bg-green-400"} ${status === "good" && "bg-orange-400"} ${status === "bad" && "bg-red-400"} ${status === "inProcess" && "bg-white"} text-white`}>
        <div className="flex justify-between mb-2">
            <h3 className={`font-bold text-xl mb-2 ${status === "inProcess" && "text-gray-600"}`}>02-04-2023</h3>
            <button className={`py-2 pl-3 ${status === "inProcess" && "bg-gray-500 hover:bg-gray-600"} ${status === "excellent" && "bg-green-600 hover:bg-green-700"} ${status === "good" && "bg-orange-600 hover:bg-orange-700"} ${status === "bad" && "bg-red-500 hover:bg-red-600"} transitionItem rounded text-white text-sm`} onClick={() => setAddTodoModal(true)}>Add a new task<span><FaPlus className="icon ml-2" /></span></button>
        </div>
        <ul>
            <EachTodo todo="Learning Javascript Algorithms" priority="A" status={status} />
            <EachTodo todo="Learning Javascript Algorithms" priority="B" status={status} />
            <EachTodo todo="Learning Javascript Algorithms" priority="C" status={status} />
            <EachTodo todo="Learning Javascript Algorithms" priority="A" status={status} />
            <EachTodo todo="Learning Javascript Algorithms" priority="B" status={status} />
        </ul>
        <div className="flex gap-5 items-center justify-between mt-6">
            <p className={`${status === "inProcess" && "text-gray-500"}`}>Your day was productive. Well done &#x1F44D;</p>
            <button className="py-2 pl-3 bg-red-500 hover:bg-red-600 transitionItem rounded text-white"><span><ImBin className="icon" /></span></button>
        </div>
    </div>
    {/* Adding Modal */}
    <AddTodo addTodoModal={addTodoModal} setAddTodoModal={() => setAddTodoModal()} />
    </div>
  )
}

export default Todo