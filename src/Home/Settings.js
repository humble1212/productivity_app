import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Settings() {
  return (
    <section className=" w-full h-full p-2">
      <header className=" flex w-full h-12 border shadow-xl items-center justify-end p-2 rounded">
        <NavLink
          to={"/Signup"}
          className="activeElement text-orange-500 hover:underline flex items-center gap-2">
          <FiLogOut />
          Delete Account
        </NavLink>
      </header>
    </section>
  );
}
