"use client";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BiSolidShow } from "react-icons/bi";
import { NavLink } from "react-router-dom";

import { useState } from "react";

export default function SignupPage() {
  const [user, setUser] = useState([
    {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  ]);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [pMatch, setPMatch] = useState(false);

  const onSignup = () => {};

  return (
    <section className="w-full h-full p-2 flex items-center justify-center">
      <div className="w-3/4 h-3/4 border shadow-2xl rounded p-1 flex">
        <div className=" flex-1 flex flex-col justify-center items-center p-1 text-black font-bold">
          <h1 className="text-2xl w-full text-center">Sign Up</h1>
          <hr />
          <div className=" flex w-4/5 h-auto my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="username"
              className="flex flex-row items-center gap-2 h-8 text-orange-400 capitalize">
              <FaUser />
              Username
            </label>
            <input
              type="text"
              name="username"
              id="Username"
              placeholder="Enter username"
              value={user.username}
              onChange={(e) => {
                setUser((prevUser) => ({
                  ...prevUser,
                  username: e.target.value,
                }));
              }}
              className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </div>
          <div className=" flex w-4/5 h-auto my-1 flex-col items-start text-gray-500">
            <label
              htmlFor="usermail"
              className="flex flex-row items-center gap-2 h-8 text-orange-400 capitalize">
              <MdEmail />
              email
            </label>
            <input
              type="text"
              id="usermail"
              name="email"
              placeholder="Enter email"
              value={user.email}
              onChange={(e) => {
                setUser((prevUser) => ({
                  ...prevUser,
                  email: e.target.value,
                }));
              }}
              className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </div>
          <div className=" flex w-4/5 h-auto my-1 flex-col items-start text-gray-500 relative">
            <label
              htmlFor="userpassword"
              className="flex flex-row items-center gap-2 h-8 text-orange-400 capitalize">
              <FaLock />
              password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="userpassword"
              id="userpassword"
              placeholder=" Enter password"
              value={user.password}
              onChange={(e) => {
                setUser((prevUser) => ({
                  ...prevUser,
                  password: e.target.value,
                }));
              }}
              className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
            <span
              className=" absolute right-2 top-2/4 text-2xl"
              onClick={() => {
                setshowPassword(!showPassword);
              }}>
              {showPassword && <AiFillEyeInvisible />}
              {!showPassword && <BiSolidShow />}
            </span>
          </div>
          <div className=" flex w-4/5 h-auto my-1 flex-col items-start text-gray-500 relative">
            <label
              htmlFor="confirmpassword"
              className="flex flex-row items-center gap-2 h-8 text-orange-400 capitalize">
              <FaLock />
              Confirm password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmpassword"
              id="confirmpassword"
              placeholder=" Confirm password"
              value={user.confirmpassword}
              onChange={(e) => {
                setUser((prevUser) => ({
                  ...prevUser,
                  confirmpassword: e.target.value,
                }));
                setPMatch(
                  user.password === user.confirmpassword &&
                    user.password.length === user.confirmpassword.length
                    ? true
                    : false
                );
              }}
              className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
            <span
              className=" absolute right-2 top-2/4 text-2xl"
              onClick={() => {
                setshowPassword(!showPassword);
              }}>
              {showPassword && <AiFillEyeInvisible />}
              {!showPassword && <BiSolidShow />}
            </span>
          </div>
          <hr />
          <div className=" flex w-4/5 h-auto my-1 flex-col items-center gap-2 text-gray-500">
            {pMatch && (
              <span
                className={`${
                  pMatch
                    ? "w-full text-center h-8 text-green-500"
                    : "w-full text-center h-8 text-orange-500"
                }`}>
                password Matches
              </span>
            )}
          </div>
          <div className=" flex w-4/5 h-auto my-1 flex-col items-center gap-2 text-gray-500">
            <button
              type="button"
              className="activeElement flex items-center justify-center w-max px-2 h-12 rounded-lg bg-orange-500 text-white border"
              onClick={onSignup}>
              {buttonEnabled ? "Submit" : "Enter Details"}
            </button>
            <span className="w-full text-center h-8">or signup with</span>
            <button
              type="button"
              className="activeElement flex items-center justify-center w-1/4 h-12 rounded-full border shadow">
              <span>
                <FcGoogle />
              </span>
              oogle
            </button>
          </div>
        </div>

        <div className=" flex-1 flex flex-col justify-center items-center p-1 bg-teal-950 text-white font-bold">
          <h1 className="text-2xl w-full text-center">Hello, Friend</h1>
          <div className=" flex w-3/4 h-auto my-1 flex-col items-start text-gray-500">
            <p className=" w-full p-2 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
              aspernatur. Fugiat saepe maiores adipisci ullam molestiae quis
              corporis vel ab id. Fuga dicta aspernatur dolorem quisquam debitis
              culpa soluta corrupti magni quis. Vel non, quas tenetur, iusto
              esse consequatur, iure quia earum totam minus odit aut neque fuga
              ratione perferendis!
            </p>
          </div>
          <span className=" flex w-full items-center justify-center gap-2">
            have an account already?
            <NavLink
              to={"/login"}
              className="activeElement text-orange-500 hover:underline">
              Login
            </NavLink>
            instead
          </span>
        </div>
      </div>
    </section>
  );
}
