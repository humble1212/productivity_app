import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Homepage from "./Home/Homepage";
import Schedules from "./Home/Schedules";
import Budgets from "./Home/Budgets";
import Focus from "./Home/Focus";
import Settings from "./Home/Settings";
import Profile from "./Home/Profile";
import Habit from "./Home/Habit";
import Login from "./UserPage/Login";
import Signup from "./UserPage/Signup";
import { IoHomeSharp } from "react-icons/io5";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { BsBank2 } from "react-icons/bs";
import { MdCenterFocusStrong } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FaLayerGroup } from "react-icons/fa6";
import { CgPerformance } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaInfo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdExplore } from "react-icons/md";
import { FaDonate } from "react-icons/fa";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <NavigationBar>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/*" element={<Homepage />} />
          <Route path="/Schedules/*" element={<Schedules />} />
          <Route path="/Budgets/*" element={<Budgets />} />
          <Route path="/Focus/*" element={<Focus />} />
          <Route path="/Habit/*" element={<Habit />} />
          <Route path="/Settings/*" element={<Settings />} />
          <Route path="/Profile/*" element={<Profile />} />
        </Routes>
      </NavigationBar>
    </BrowserRouter>
  );
}

function NavigationBar(props) {
  const navItems = [
    {
      id: 1,
      title: "Homepage",
      path: "/",
      icons: <IoHomeSharp />,
    },
    {
      id: 2,
      title: "Schedules",
      path: "/Schedules",
      icons: <RiCalendarScheduleFill />,
    },
    {
      id: 3,
      title: "Budgets",
      path: "/Budgets",
      icons: <BsBank2 />,
    },
    {
      id: 4,
      title: "Focus Mode",
      path: "/Focus",
      icons: <MdCenterFocusStrong />,
    },
    {
      id: 5,
      title: "Habit Tracker",
      path: "/Habit",
      icons: <CgPerformance />,
    },
  ];

  const newDate = new Date().toDateString();

  return (
    <main className=" w-dvw h-dvh bg-teal-50 flex flex-col pb-1">
      <header className=" h-14 w-full shadow-lg p-2 flex items-center justify-between">
        <h1 className=" flex-1 p-2 flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <FaLayerGroup />
            Dockris
          </span>
          <div className=" flex items-center gap-2">
            <strong className=" text-gray-500">{newDate}, </strong>
            <span data-count="0" className="notify-count relative">
              <IoNotifications />
            </span>
          </div>
        </h1>
        <div className=" flex-1 h-full flex items-center justify-center font-bold text-gray-500">
          <input
            type="Search"
            name="Search"
            id="Search"
            placeholder="Search"
            className=" border indent-4 h-full rounded-s-full w-1/2 focus:outline-none"
          />
          <label
            htmlFor="Search"
            className=" border h-full rounded-e-full flex items-center justify-center border-l-0 w-14 bg-teal-950 text-white">
            <FaSearch />
          </label>
        </div>
        <div className=" flex-1 h-full flex items-center justify-end gap-2">
          <button
            type="button"
            className="w-max p-2 rounded flex items-center justify-center text-orange-500  h-4/5 about--menu more--menu relative">
            <FaInfo />
          </button>
          <button
            type="button"
            className="w-max p-2 rounded flex items-center justify-center text-orange-500  h-4/5 contact--menu more--menu relative">
            <IoCall />
          </button>
          <strong
            type="button"
            className="w-max p-2 rounded flex items-center justify-center text-orange-500  h-4/5 explore--menu more--menu relative">
            <MdExplore />
          </strong>
          <strong
            type="button"
            className="w-max p-2 rounded flex items-center justify-center text-orange-500 h-4/5 donate--menu more--menu relative">
            <FaDonate />
          </strong>
        </div>
      </header>
      <div className=" w-full flex-1 flex">
        <div className="h-full w-60 flex flex-col py-2 gap-2 items-end  bg-teal-950 text-white">
          <div className="flex items-end justify-center w-full h-24 pb-4 border-b border-gray-500 ">
            <NavLink
              to={"/Profile"}
              className={({ isActive }) => {
                return (
                  "activeElement w-11/12 flex items-center justify-start" +
                  (isActive
                    ? "bg-gray-600 text-white font-medium"
                    : "bg-teal-950 text-gray-400")
                );
              }}>
              <img
                src="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="myPic"
                className=" w-11 h-11 border rounded-full flex items-center justify-center mr-2"
              />
              <p className="flex flex-col items-start">
                <span>username</span>
                <span>user@gmail.com</span>
              </p>
            </NavLink>
          </div>
          <nav className=" w-11/12 h-3/4">
            {navItems.map((items) => {
              return (
                <NavLink
                  to={items.path}
                  key={items.id}
                  className={({ isActive }) => {
                    return (
                      "activeElement w-full h-12 rounded-full rounded-e-md p-2 flex items-center justify-start gap-3 " +
                      (isActive
                        ? "bg-teal-50 text-black font-medium"
                        : "bg-teal-950 text-white")
                    );
                  }}>
                  <strong>{items.icons}</strong>
                  <span>{items.title}</span>
                </NavLink>
              );
            })}
          </nav>
          <div className=" w-full h-1/4 border-t py-4 flex flex-col gap-3 items-center justify-center">
            <NavLink
              to={"/Settings"}
              className={({ isActive }) => {
                return (
                  "activeElement w-11/12 h-12 rounded-full p-2 flex items-center justify-center gap-2 shadow-xl " +
                  (isActive
                    ? "bg-teal-50 text-black font-medium"
                    : "bg-teal-950 text-teal-50 border-2 border-orange-300")
                );
              }}>
              <span>
                <IoSettingsSharp />
              </span>
              <strong>Settings</strong>
            </NavLink>
          </div>
        </div>
        <section className="h-full flex-1">{props.children}</section>
      </div>
    </main>
  );
}
