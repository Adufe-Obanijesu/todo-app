const EachTodo = ({todo, priority, status}) => {
  return (
    <li className={`grid grid-cols-12 gap-1 border-b ${status === "excellent" && "border-green-500"} ${status === "good" && "border-orange-500"} ${status === "bad" && "border-red-500"} py-2 items-center`}>{
        priority === 'A' && <span className="font-bold text-red-700">A</span>
    }
    {
        priority === 'B' && <span className="font-bold text-green-700">B</span>
    }
    {
        (priority === 'C' && status !== "inProcess") && <span className="font-bold text-white">C</span>
    }
    {
        (priority === 'C' && status === "inProcess") && <span className="font-bold text-orange-500">C</span>
    }
        <p className={`col-span-8 ${status === "inProcess" && "text-gray-500"}`}>{todo}</p> 
        <p className="col-span-3 flex justify-center">
            <button className="py-1 w-16 px-2 bg-orange-500 hover:bg-orange-600 transitionItem rounded text-sm">Done</button>
        </p>
    </li>
  )
}

export default EachTodo;