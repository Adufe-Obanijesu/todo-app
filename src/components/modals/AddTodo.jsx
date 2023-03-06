import { useState } from "react";
import SelectInput from "../inputs/SelectInput";

// Importing components
import TextInput from "../inputs/TextInput";

// Importing icons
import { FaPlus } from "react-icons/fa";

const AddTodo = ({addTodoModal, setAddTodoModal}) => {
    
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("");

  return (
    <div
    className={`h-screen w-full fixed left-0 top-0 flex justify-center items-center z-20 ${
        !addTodoModal && "hidden"
      }`}>
    <div
        className="h-screen w-full absolute z-10 bg-black bg-opacity-50 cursor-pointer"
        onClick={() => setAddTodoModal(false)}
    ></div>
    <div className="bg-white shadow-lg w-2/5 p-3" style={{zIndex: 1000}}>
        <div className="border-b border-1 border-gray-200 py-2 mb-2">
        <h3 className="text-xl font-bold tracking-md">Add a task</h3>
        </div>

        <div className="mt-4">
        <form>
            <TextInput name="Task" input={task} setInput={setTask} />
            
            <SelectInput name="Priority" input={priority} setInput={() => setPriority()} />

            <button
            type="submit"
            className="mt-2 text-md bg-green-400 py-2 rounded-sm pl-4 pr-1 text-white hover:shadow hover:bg-green-500 transition ease-in duration-300 rounded"
            >Add <span className="ml-2"><FaPlus className="icon text-sm" /></span>
            </button>
        </form>
        </div>
    </div>
    </div>
  )
}

export default AddTodo