import { v4 as uuidv4 } from "uuid";
import { Routes, Route, NavLink } from "react-router-dom";
import Schedules from "../Home/Schedulepage/Schedules";
import Budgets from "../Home/Budgetpage/Budgets";
import Focus from "../Home/Focus";
import Settings from "../Home/Settings";
import Habit from "../Home/Habit";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { BsBank2 } from "react-icons/bs";
import { MdCenterFocusStrong } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { CgPerformance } from "react-icons/cg";

export default function Explore() {
  return (
    <NavigationBar>
      <Routes>
        <Route path="/*" element={<Schedules />} />
        <Route path="/Budgets/*" element={<Budgets />} />
        <Route path="/Focus/*" element={<Focus />} />
        <Route path="/Habit/*" element={<Habit />} />
        <Route path="/Settings/*" element={<Settings />} />
      </Routes>
    </NavigationBar>
  );
}

function NavigationBar(props) {
  const navItems = [
    {
      title: "Schedules",
      path: "./Schedules",
      icons: <RiCalendarScheduleFill />,
    },
    {
      title: "Budgets",
      path: "./Budgets",
      icons: <BsBank2 />,
    },
    {
      title: "Focus Mode",
      path: "./Focus",
      icons: <MdCenterFocusStrong />,
    },
    {
      title: "Habit Tracker",
      path: "./Habit",
      icons: <CgPerformance />,
    },
  ];

  return (
    <section className=" w-full h-full bg-teal-50 flex">
      <nav
        className={`h-full w-60 flex flex-col gap-2 items-end  bg-teal-950 text-white top-0 z-10 + 
              sm:w-14 sm:text-sm overflow-hidden
            }`}>
        <div className="flex items-end sm:items-center justify-center w-full h-24 pb-4 border-b border-gray-500">
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
            <p className="flex flex-col items-start sm:hidden">
              <span>username</span>
              <span>user@gmail.com</span>
            </p>
          </NavLink>
        </div>
        <div className=" w-11/12 h-3/4">
          {navItems.map((items) => {
            return (
              <NavLink
                to={items.path}
                key={uuidv4()}
                className={({ isActive }) => {
                  return (
                    "activeElement w-full h-12 rounded-full rounded-e-md p-2 flex items-center justify-start gap-3 " +
                    (isActive
                      ? "bg-teal-50 text-black font-medium"
                      : "bg-teal-950 text-white")
                  );
                }}>
                <strong className=" sm:text-xl">{items.icons}</strong>
                <span className=" sm:hidden">{items.title}</span>
              </NavLink>
            );
          })}
        </div>
        <div className=" w-full h-1/4 border-t py-4 flex flex-col gap-3 items-center justify-center">
          <NavLink
            to={"./Settings"}
            className={({ isActive }) => {
              return (
                "activeElement w-11/12 h-12 rounded-full p-2 flex items-center justify-center gap-2 shadow-xl " +
                (isActive
                  ? "bg-teal-50 text-black font-medium"
                  : "bg-teal-950 text-teal-50 border-2 border-orange-300")
              );
            }}>
            <span className=" sm:text-xl">
              <IoSettingsSharp />
            </span>
            <strong className=" sm:hidden">Settings</strong>
          </NavLink>
        </div>
      </nav>

      <section className="h-full flex-1">{props.children}</section>
    </section>
  );
}
