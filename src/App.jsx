import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Importing pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Importing components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App bg-cyan-500 pb-14">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={
              <Login />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
