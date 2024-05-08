import { NavLink } from "react-router-dom";

export default function Explore() {
  return (
    <div className=" w-full h-full p-2 flex items-center justify-center ">
      <div className=" w-1/4 h-full rounded border-r flex justify-center items-end p-2">
        <div className="w-5/6 h-11 flex items-center justify-center rounded gap-2 sm:flex-col sm:w-full mb-4">
          <NavLink
            to={"/Login"}
            className={({ isActive }) => {
              return (
                "activeElement flex items-center justify-center p-2 w-1/2 border border-orange-200 rounded-full footer--shadow sm:w-full" +
                (isActive
                  ? "bg-teal-950 text-white font-medium"
                  : " text-orange-400")
              );
            }}>
            Login
          </NavLink>
          <NavLink
            to={"/Signup"}
            className={({ isActive }) => {
              return (
                "activeElement flex items-center justify-center p-2 w-1/2 border border-orange-200 rounded-full footer--shadow sm:w-full" +
                (isActive
                  ? "bg-teal-950 text-white font-medium"
                  : " text-orange-400")
              );
            }}>
            Signup
          </NavLink>
        </div>
      </div>
      <div className=" w-3/4 h-full p-2">second half</div>
    </div>
  );
}
