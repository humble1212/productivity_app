import { v4 as uuidv4 } from "uuid";
import { Routes, Route, NavLink } from "react-router-dom";
import Schedules from "../Home/Schedulepage/Schedules";
import BudgetsRenderfile from "../Home/Budgetpage/BudgetsRenderfile";
import ChatFunction from "../Home/ChatFunction";
import Settings from "../Home/Settings";
import Habit from "../Home/Habit";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { BsBank2 } from "react-icons/bs";
import { BsChatFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { CgPerformance } from "react-icons/cg";
import moment from "moment";

export default function Explore() {
  return (
    <NavigationBar>
      <Routes>
        <Route path="/*" element={<Schedules />} />
        <Route path="/BudgetsRenderfile/*" element={<BudgetsRenderfile />} />
        <Route path="/ChatFunction/*" element={<ChatFunction />} />
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
      path: "./BudgetsRenderfile",
      icons: <BsBank2 />,
    },
    {
      title: "Start Conversasion",
      path: "./ChatFunction",
      icons: <BsChatFill />,
    },
    {
      title: "Habit Tracker",
      path: "./Habit",
      icons: <CgPerformance />,
    },
  ];

  const currentTime = moment().format("HH:mm:ss A");
  const currenDate = new Date().toDateString();

  return (
    <section className=" w-full h-full bg-teal-50 flex">
      <nav
        className={`h-full w-1/6 flex flex-col items-center justify-between  top-0 z-10 + 
              sm:w-14 sm:text-sm overflow-hidden
            }`}>
        <div className="flex flex-col items-center justify-center w-full h-96 border-b border-orange-400">
          <div className="w-full flex-1 rounded-lg flex flex-col items-start gap-2">
            <h2 className=" flex text-nowrap p-2 font-semibold">
              Date: {currenDate}, {currentTime}
            </h2>
            <strong className=" px-2 text-xl ">Welcome, Mr. Christopher</strong>
          </div>
          <div className=" w-full flex items-center justify-center flex-1">
            <NavLink
              to={"/Profile"}
              className={({ isActive }) => {
                return (
                  "activeElement w-1/2 h-12 rounded-full border border-slate-200 flex items-center justify-center shadow-xl hover:border-none hover:bg-gray-600 hover:text-white " +
                  (isActive ? "bg-teal-50 font-medium" : "bg-teal-50")
                );
              }}>
              View Profile
            </NavLink>
          </div>
        </div>
        <div className=" w-full h-3/4 flex flex-col gap-2 items-center justify-center">
          {navItems.map((items) => {
            return (
              <NavLink
                to={items.path}
                key={uuidv4()}
                className={({ isActive }) => {
                  return (
                    "activeElement w-5/6 h-14 rounded-full flex items-center justify-start pl-8 gap-2 shadow-xl hover:bg-green-100 hover:text-black " +
                    (isActive
                      ? "bg-green-700 font-medium text-white "
                      : "bg-gray-50 ")
                  );
                }}>
                <strong className=" sm:text-xl">{items.icons}</strong>
                <span className=" sm:hidden">{items.title}</span>
              </NavLink>
            );
          })}
        </div>
        <div className=" w-full h-1/6 border-t border-orange-400 py-4 flex flex-col gap-3 items-center justify-end">
          <NavLink
            to={"./Settings"}
            className={({ isActive }) => {
              return (
                "activeElement w-11/12 h-12 rounded-full p-2 flex items-center justify-center gap-2 shadow-xl hover:bg-green-100 hover:text-black " +
                (isActive
                  ? "bg-green-700 font-medium text-white"
                  : "bg-gray-50")
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
