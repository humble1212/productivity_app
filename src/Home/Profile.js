import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Profile() {
  return (
    <section className=" w-full h-full p-2">
      <header className=" flex w-full h-12 border shadow-2xl items-center justify-end p-2 rounded">
        <NavLink
          to={"/Login"}
          className="activeElement text-orange-500 hover:underline flex items-center gap-2">
          <FiLogOut />
          Logout
        </NavLink>
      </header>
    </section>
  );
}
