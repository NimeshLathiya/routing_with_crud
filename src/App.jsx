import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import NotFound from "./Components/Layout/NotFound";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import Home from "./Components/Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "./Components/Users/AddUser";
import EditUser from "./Components/Users/EditUser";
import  from "./Components/Users/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={""}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/edituser" element={<EditUser />} />
            <Route path="/view" element={<Users />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
