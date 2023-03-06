import { useContext, useState } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp, firebaseConfig, getAuth, signOut } from "../firebase/index";

// Importing components
import CreateTodo from "./modals/CreateTodo";

import { UserContext } from "../contexts/User";

const Header = () => {

  initializeApp(firebaseConfig);

  const navigate = useNavigate();

  const auth = getAuth();

  const user = useContext(UserContext);

  const [ createTodoModal, setCreateTodoModal ] = useState(false);
  const [ date, setDate ] = useState(null);

  const signout = () => {
    signOut(auth)
    .then(() => navigate("/login"))
    .catch(err => console.log(err));
  }

  const planForToday = () => {
    setDate(Date.parse(moment().startOf('day')._d));
    setCreateTodoModal(true);
  }

  const planForTomorrow = () => {
    setDate(Date.parse(moment().startOf('day').add(1, "days")._d));
    setCreateTodoModal(true);
  }

  return (
    <div className="flex justify-center mb-6">
      <div className="pt-8 w-4/5 lg:w-1/2">
        <h1 className="text-xl lg:text-2xl font-black tracking-wide text-center text-white uppercase">Welcome, Obanijesu</h1>
        <p className="text-center text-white mt-2">
          So you have no plan for your life today. <span className="font-bold">CREATE ONE!!!</span>
          <button className="col-span-2 py-1 px-4 ml-4 bg-orange-500 hover:bg-orange-600 font-semibold transitionItem rounded-sm" onClick={() => planForToday()}>Create</button>
          <button className="col-span-2 py-1 px-4 ml-2 bg-orange-500 hover:bg-orange-600 font-semibold transitionItem rounded-sm" onClick={() => signout()}>Log out</button>
        </p>
        <p className="text-center text-white mt-2">
          You want to plan for tomorrow instead?
          <button className="col-span-2 py-1 px-4 ml-4 bg-orange-500 hover:bg-orange-600 font-semibold transitionItem rounded-sm" onClick={() => planForTomorrow()}>Plan for tomorrow</button>
        </p>
      </div>
      {/* Adding Modal */}
      <CreateTodo createTodoModal={createTodoModal} setCreateTodoModal={() => setCreateTodoModal()} date={date} />
    </div>
  )
}

export default Header;