import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Homepage from "./Home/Homepage";
import Explore from "./HeaderLinks/Explore";
import Donate from "./HeaderLinks/Donate";
import About from "./HeaderLinks/About";
import Contact from "./HeaderLinks/Contact";
import Profile from "./Home/Profile";

import { IoHomeSharp } from "react-icons/io5";
import { FaLayerGroup } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdExplore } from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import * as React from "react";
import "./App.css";

import Login from "./UserPage/Login";
import Signup from "./UserPage/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <AppHeader>
        <Routes>
          <Route path="/*" element={<Homepage />} />
          <Route path="/Explore/*" element={<Explore />} />
          <Route path="/Donate/*" element={<Donate />} />
          <Route path="/About/*" element={<About />} />
          <Route path="/Contact/*" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </AppHeader>
    </BrowserRouter>
  );
}

function AppHeader(props) {
  const navMeniLinks = [
    {
      title: "Welcome",
      path: "/Homepage",
      icons: <IoHomeSharp />,
    },
    {
      title: "Home",
      path: "/Explore",
      icons: <MdExplore />,
    },
    {
      title: "Donate",
      path: "/Donate",
      icons: <FaDonate />,
    },
    {
      title: "About Us",
      path: "/About",
      icons: <FaInfo />,
    },
    {
      title: "Contact Us",
      path: "/Contact",
      icons: <IoCall />,
    },

    {
      title: (
        <input
          type="Search"
          name="Search"
          id="Search"
          placeholder="Search"
          className=" bg-transparent ml-1 h-8 focus:outline-2 outline-orange-500 indent-2 rounded"
        />
      ),
      path: "/Search",
      icons: <FaSearch />,
    },
  ];

  return (
    <main className=" w-dvw h-dvh bg-teal-50 flex flex-col">
      <header
        className={`h-14 w-full shadow-lg p-2 flex items-center justify-between bg-teal-950 text-white md:visible`}>
        <h1 className=" w-max p-2 flex items-center justify-between gap-2 sm:hidden">
          <span className="flex items-center gap-2">
            <FaLayerGroup />
            Dockris
          </span>
        </h1>

        <div className=" flex-1 h-full flex items-center justify-center gap-2">
          {navMeniLinks.map((items) => {
            return (
              <NavLink
                to={items.path}
                key={uuidv4()}
                className={({ isActive }) => {
                  return (
                    "activeElement w-max h-8 rounded p-2 flex items-center justify-start gap-1 " +
                    (isActive ? "bg-teal-50 font-bold text-black" : "")
                  );
                }}>
                <strong className=" sm:text-xl">{items.icons}</strong>
                <span className=" sm:hidden">{items.title}</span>
              </NavLink>
            );
          })}
        </div>
        <NavLink
          to={"/Profile"}
          className={({ isActive }) => {
            return (
              "activeElement w-max flex items-center justify-end" +
              (isActive
                ? "bg-gray-600 text-white font-medium"
                : "bg-teal-950 text-gray-400")
            );
          }}>
          <img
            src="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="myPic"
            className=" w-10 h-10 border rounded-full flex items-center justify-center mr-2"
          />
        </NavLink>
      </header>
      <section className="h-mpHgt flex-1">{props.children}</section>
    </main>
  );
}
