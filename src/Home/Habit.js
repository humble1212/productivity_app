import { IoMdAdd } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
// import { toast } from "react-hot-toast";

import { LuAlarmCheck } from "react-icons/lu";
import { BsCalendar2Date } from "react-icons/bs";
import { GrFormNext } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { BiSolidCustomize } from "react-icons/bi";
import { FaRegSquare } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import { FaRegCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

export default function Habit() {
  const [habitDetail, setHabitDeatils] = useState([]);
  const sendValues = (
    habit,
    firstTime,
    secondTime,
    thirdTime,
    repeatRemind,
    timeline,
    numberOfDays
  ) => {
    const habitItems = {
      id: uuidv4(),
      habit: habit,
      repeatRemind: repeatRemind,
      firstTime: firstTime,
      secondTime: secondTime,
      thirdTime: thirdTime,
      timeline: timeline,
      numberOfDays: numberOfDays,
      complete: false,
      done: false,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    };
    setHabitDeatils([...habitDetail, habitItems]);
  };

  useEffect(() => {
    if (habitDetail.length === 0) return;
    localStorage.setItem("habitDetail", JSON.stringify(habitDetail));
  }, [habitDetail]);

  useEffect(() => {
    let habitDetail = JSON.parse(localStorage.getItem("habitDetail"));
    setHabitDeatils(habitDetail);
  }, []);

  return (
    <NavLinksItems>
      <Routes>
        <Route
          path="/*"
          element={
            <Week habitDetail={habitDetail} setHabitDeatils={setHabitDeatils} />
          }
        />
        <Route path="/Month/*" element={<Month />} />
        <Route path="/Annual/*" element={<Annual />} />
        <Route path="/Alltime/*" element={<Alltime />} />
        <Route path="/AddNew/*" element={<AddNew sendValues={sendValues} />} />
      </Routes>
    </NavLinksItems>
  );
}

function NavLinksItems(props) {
  const navItems = [
    {
      title: "Week",
      path: "./Week",
    },
    {
      title: "Month",
      path: "./Month",
    },
    {
      title: "Annual",
      path: "./Annual",
    },
    {
      title: "All Time",
      path: "./Alltime",
    },
  ];

  return (
    <section className=" full h-full p-2 flex flex-col w-full gap-2 relative">
      <header className=" h-16 w-full flex flex-col p-1 item-start justify-center border-b border-slate-500">
        <strong>Progress ... </strong>
        <span>5hr, 42 mins till bed time</span>
      </header>
      <div className="w-full flex-1 flex items-center justify-between gap-2">
        <ul className=" flex-1 flex items-center justify-start gap-4 bg-blue-50 p-2 rounded">
          {navItems.map((items) => {
            return (
              <li className="w-max  h-10 text-gray-500 rounded-full font-semibold flex items-center justify-center">
                <NavLink
                  to={items.path}
                  key={uuidv4()}
                  className={({ isActive }) => {
                    return (
                      "activeElement px-8 w-full h-full rounded-full flex items-center justify-start gap-2 shadow-xl hover:bg-blue-500 hover:text-white  " +
                      (isActive
                        ? "bg-blue-600 font-medium text-white "
                        : "bg-gray-50 ")
                    );
                  }}>
                  <strong className=" sm:text-xl">{items.icons}</strong>
                  <span className=" sm:hidden">{items.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <NavLink
          to={"./AddNew"}
          className={({ isActive }) => {
            return (
              "activeElement w-1/6 h-12 rounded-full text-blue-600 flex items-center justify-center gap-2 shadow-xl hover:bg-blue-700 hover:text-white " +
              (isActive ? "bg-blue-700 font-bold text-white" : "bg-gray-50")
            );
          }}>
          <strong className=" flex items-center justify-center gap-2">
            <IoMdAdd />
            Add New
          </strong>
        </NavLink>
      </div>
      <section className="border w-full h-full p-1">{props.children}</section>
    </section>
  );
}

function Week({ habitDetail, setHabitDeatils }) {
  const [translate, setTranslate] = useState(0);

  function RemoveHabit(data) {
    setHabitDeatils(
      habitDetail.filter((item) => {
        return item.id !== data.id;
      })
    );
  }

  function CompletedTask(data) {
    setHabitDeatils(
      habitDetail.map((item) => {
        if (item.id === data.id) {
          return { ...item, complete: !item.complete };
        }
        return item;
      })
    );
  }
  function dayCount(data) {
    setHabitDeatils(
      habitDetail.map((item) => {
        if (item.id === data.id) {
          return { ...item, done: !item.done };
        }
        return item;
      })
    );
  }

  function monCount(data) {
    setHabitDeatils(
      habitDetail.map((item) => {
        if (item.id === data.id) {
          return { ...item, mon: !item.mon };
        }
        return item;
      })
    );
  }
  function tueCount(data) {
    setHabitDeatils(
      habitDetail.map((item) => {
        if (item.id === data.id) {
          return { ...item, tue: !item.tue };
        }
        return item;
      })
    );
  }
  function wedCount(data) {
    setHabitDeatils(
      habitDetail.map((item) => {
        if (item.id === data.id) {
          return { ...item, wed: !item.wed };
        }
        return item;
      })
    );
  }
  function thuCount(data) {
    setHabitDeatils(
      habitDetail.map((item) => {
        if (item.id === data.id) {
          return { ...item, thu: !item.thu };
        }
        return item;
      })
    );
  }
  function friCount(data) {
    setHabitDeatils(
      habitDetail.map((item) => {
        if (item.id === data.id) {
          return { ...item, fri: !item.fri };
        }
        return item;
      })
    );
  }
  function satCount(data) {
    setHabitDeatils(
      habitDetail.map((item) => {
        if (item.id === data.id) {
          return { ...item, sat: !item.sat };
        }
        return item;
      })
    );
  }
  function sunCount(data) {
    setHabitDeatils(
      habitDetail.map((item) => {
        if (item.id === data.id) {
          return { ...item, sun: !item.sun };
        }
        return item;
      })
    );
  }

  const [doneDays, setDoneDays] = useState([]);

  return (
    <section className="h-full w-full flex flex-col capitalize">
      <header className=" w-full flex items-center justify-center p-1 gap-2 ">
        <div className=" w-max flex items-center justify-start gap-2">
          <button
            type="button"
            className=" activeElement border rounded-full flex items-center justify-center w-10 h-10 text-2xl hover:bg-gray-300"
            style={{
              transition: "400ms ease-in-out",
            }}>
            <GrFormPrevious />
          </button>
          <button
            type="button"
            className="activeElement  border rounded-full flex items-center justify-center w-10 h-10 text-2xl hover:bg-gray-300"
            style={{
              transition: "400ms ease-in-out",
            }}>
            <GrFormNext />
          </button>
        </div>
        <strong className="flex flex-1 items-center justify-start gap-2 p-1 ">
          Mon, 2/4 - Sun, 2/10
        </strong>
        <div className=" flex items-center justify-end gap-2">
          <span
            className="flex items-center justify-end w-16 h-8 rounded-full bg-gray-300"
            onClick={() => {
              setTranslate(translate === 0 ? 2 : 0);
            }}>
            <span
              className=" w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"
              style={{
                transform: `translateX(-${translate}rem)`,
                transition: "400ms ease-in-out",
              }}>
              1
            </span>
          </span>
        </div>
      </header>
      <div className=" w-full h-8 mt-2 flex items-center">
        <input
          type="range"
          name="progress"
          id="progress"
          min={0}
          max={habitDetail.numberOfDays}
          className=" w-full "
        />
      </div>
      <div className=" h-12 border-b-2 border-gray-300 flex items-center justify-between p-2">
        <p>⬆️ 23% from previous week</p>
        {habitDetail.map((data) => {
          return (
            <p>
              {parseFloat(
                (data.totalTast / data.numberOfDays) * 100
              ).toPrecision(3)}
              % achieved
            </p>
          );
        })}
      </div>
      <section className=" flex-1 h-full flex flex-col">
        <div className="w-full flex items-center border-b">
          <div className=" w-1/4 flex items-center justify-center">
            <button type="button">1</button>
          </div>
          <ul className="flex-1 h-12 flex items-center justify-center  gap-2 ">
            <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
              Mon
            </li>
            <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
              Tue
            </li>
            <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
              Wed
            </li>
            <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
              Thu
            </li>
            <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
              Fri
            </li>
            <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
              Sat
            </li>
            <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
              Sun
            </li>
          </ul>
          <div className=" w-1/4 flex items-center justify-center">1</div>
        </div>
        <div className=" w-full flex-1 flex flex-col gap-2 mt-2 ">
          {habitDetail.map((data) => {
            return (
              <div
                className="w-full flex flex-col items-center border-b mt-2 shadow-md hover:shadow-2xl"
                style={{
                  transition: "400ms ease-in-out",
                }}
                key={data.id}>
                <div className="w-full flex items-center border-b">
                  <div className=" w-1/4 flex items-center justify-start px-2">
                    <strong className=" text-lg text-gray-600 ">
                      {data.habit}
                    </strong>
                  </div>
                  <ul className="flex-1 h-12 flex items-center justify-center  gap-2 ">
                    <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
                      {data.mon && (
                        <FaCheckCircle
                          onClick={() => {
                            monCount(data);
                            data.id.mon && setDoneDays([...doneDays, "monday"]);
                          }}
                        />
                      )}
                      {!data.mon && (
                        <FaRegCircle
                          onClick={() => {
                            monCount(data);
                            doneDays.splice(1, doneDays.length);
                          }}
                        />
                      )}
                    </li>
                    <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
                      {data.tue && (
                        <FaCheckCircle
                          onClick={() => {
                            tueCount(data);
                          }}
                        />
                      )}
                      {!data.tue && (
                        <FaRegCircle
                          onClick={() => {
                            tueCount(data);
                          }}
                        />
                      )}
                    </li>
                    <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
                      {data.wed && (
                        <FaCheckCircle
                          onClick={() => {
                            wedCount(data);
                          }}
                        />
                      )}
                      {!data.wed && (
                        <FaRegCircle
                          onClick={() => {
                            wedCount(data);
                          }}
                        />
                      )}
                    </li>
                    <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
                      {data.thu && (
                        <FaCheckCircle
                          onClick={() => {
                            thuCount(data);
                          }}
                        />
                      )}
                      {!data.thu && (
                        <FaRegCircle
                          onClick={() => {
                            thuCount(data);
                          }}
                        />
                      )}
                    </li>
                    <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
                      {data.fri && (
                        <FaCheckCircle
                          onClick={() => {
                            friCount(data);
                          }}
                        />
                      )}
                      {!data.fri && (
                        <FaRegCircle
                          onClick={() => {
                            friCount(data);
                          }}
                        />
                      )}
                    </li>
                    <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
                      {data.sat && (
                        <FaCheckCircle
                          onClick={() => {
                            satCount(data);
                          }}
                        />
                      )}
                      {!data.sat && (
                        <FaRegCircle
                          onClick={() => {
                            satCount(data);
                          }}
                        />
                      )}
                    </li>
                    <li className=" w-12 h-8 px-1 font-semibold flex items-center justify-center">
                      {data.sun && (
                        <FaCheckCircle
                          onClick={() => {
                            sunCount(data);
                          }}
                        />
                      )}
                      {!data.sun && (
                        <FaRegCircle
                          onClick={() => {
                            sunCount(data);
                          }}
                        />
                      )}
                    </li>
                  </ul>
                  <div className=" w-1/4 flex items-center justify-between">
                    <p className=" flex gap-2">
                      Day <span>{doneDays.length} </span> of
                      <span>{data.numberOfDays}</span> completed
                    </p>
                    <button
                      type="button"
                      className=" p-2 bg-teal-950 text-white rounded w-max text-sm"
                      onClick={() => {
                        dayCount(data);
                      }}>
                      {data.done && "Show More"}
                      {!data.done && "Hide Menu"}
                    </button>
                  </div>
                </div>
                {!data.done && (
                  <div
                    className=" w-full h-auto flex items-center justify-between"
                    style={{
                      transition: "400ms ease-in-out",
                    }}>
                    <div className="sm:w-full md:w-full sm:flex-col flex-1 flex items-center justify-start gap-6 p-1 text-sm text-nowrap">
                      <p className="sm:w-full md:w-full p-1 flex flex-col items-start">
                        <span className="flex items-center justify-start gap-1  font-semibold border-l-4 px-1 border-blue-400">
                          <LuAlarmCheck />
                          Reminder
                        </span>

                        {data.repeatRemind === 1 && (
                          <span className=" text-orange-800 flex flex-col items-start gap-1">
                            <span> Reminder: {data.firstTime}</span>
                          </span>
                        )}

                        {data.repeatRemind === 2 && (
                          <span className=" text-orange-800 flex flex-col items-start gap-1">
                            <span>1st Reminder: {data.firstTime}</span>
                            <span>2nd Reminder: {data.secondTime}</span>
                          </span>
                        )}

                        {data.repeatRemind === 3 && (
                          <span className=" text-orange-800 flex flex-col items-start gap-1">
                            <span>1st Reminder: {data.firstTime}</span>
                            <span>2nd Reminder: {data.secondTime}</span>
                            <span>3rd Reminder: {data.thirdTime}</span>
                          </span>
                        )}
                      </p>

                      <p className="sm:w-full md:w-full p-1 flex flex-col items-start">
                        <span className="flex items-center justify-start gap-1 font-semibold border-l-4 px-1 border-blue-400">
                          <BsCalendar2Date />
                          Daily Repeat
                        </span>
                        <span className=" text-orange-800">
                          {data.repeatRemind === 1 &&
                            `${data.repeatRemind} once a day`}
                          {data.repeatRemind > 1 &&
                            `${data.repeatRemind} times a day`}
                        </span>
                      </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-0 gap-2">
                      Repeat {data.timeline}
                    </div>
                    <div className="flex-1 flex items-center justify-end p-0 gap-2">
                      <span
                        className="w-max px-2 flex items-center justify-end gap-2 text-red-500 activeElement cursor-pointer"
                        onClick={() => {
                          RemoveHabit(data);
                        }}>
                        <FaTrash
                          onClick={() => {
                            RemoveHabit(data);
                          }}
                        />
                        Remove
                      </span>

                      <span
                        className="w-max px-2 flex items-center justify-end gap-2 activeElement cursor-pointer"
                        onClick={() => {
                          CompletedTask(data);
                        }}>
                        <span className=" text-sm">
                          {data.complete && <FaCheckSquare />}
                          {!data.complete && <FaRegSquare />}
                        </span>

                        {data.complete ? "Achieved" : "In progress"}
                      </span>

                      <span className="w-max px-2 flex items-center justify-end gap-2 activeElement cursor-pointer">
                        <BiSolidCustomize />
                        Customize
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}

function Month(params) {
  return <h2> month Link</h2>;
}
function Annual(params) {
  return <h2> year Link</h2>;
}
function Alltime(params) {
  return <h2> all Link</h2>;
}
function AddNew(props) {
  const [habit, setHabit] = useState("");

  var [timeline, setTimeline] = useState("");
  var [repeatRemind, setRepeatRemind] = useState("");

  const [firstTime, setFirstTime] = useState();
  const [secondTime, setSecondTime] = useState();
  const [thirdTime, setThirdTime] = useState();
  // const ValidityPeriod = endDate.getTime() - startDate.getTime();

  const [initial, setInitial] = useState(false);
  const [secondInit, setSecondInit] = useState(false);

  const [numberOfDays, setnumberOfDays] = useState(0);

  const Ctimes = "05:30:00";
  const Workout = moment(Ctimes, "HH:mm:ss").format("HH:mm:ss A");

  const Btimes = "9:00:00";
  const Breakfast = moment(Btimes, "HH:mm:ss").format("HH:mm:ss A");

  const Stimes = "17:00:00";
  const Supper = moment(Stimes, "HH:mm:ss").format("HH:mm:ss A");

  const bdimes = "21:30:00";
  const bedtime = moment(bdimes, "HH:mm:ss").format("HH:mm:ss A");

  const dispatchHabitValue = () => {
    props.sendValues(
      habit,
      firstTime,
      secondTime,
      thirdTime,
      repeatRemind,
      timeline,
      numberOfDays
    );
  };

  return (
    <section className=" flex">
      <div className=" b--input flex items-start flex-1 h-auto overflow-auto rounded p-2 border-r relative">
        <div className=" flex-1 flex flex-col items-start p-2 border-b border-green-900">
          <div className=" w-full flex flex-col items-start pb-2 my-2 border-b border-green-900">
            <label
              htmlFor="habit"
              className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
              Habit to Track
            </label>
            <input
              type="text"
              placeholder="Enter Habit"
              value={habit}
              onChange={(e) => {
                setHabit(e.target.value);
              }}
              className=" focus:outline-none w-full h-9 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </div>
          <div className=" w-full flex flex-col max-h-44 overflow-auto gap-1 items-start pb-1 my-2 border-b border-green-900">
            <label
              htmlFor="Type"
              className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
              how Many days in a week will this task be performed
            </label>
            <select
              name="Type"
              id="Type"
              className=" focus:outline-none w-full h-9 border
            rounded-lg p-2 text-gray-400 text-sm font-normal"
              onChange={(e) => {
                setTimeline(e.target.value);

                e.target.value === "Every Day" && setnumberOfDays(7);
                e.target.value === "Once a week" && setnumberOfDays(1);
                e.target.value === "2x/week" && setnumberOfDays(2);
                e.target.value === "3x/week" && setnumberOfDays(3);
                e.target.value === "4x/week" && setnumberOfDays(3);
                e.target.value === "week days" && setnumberOfDays(5);
              }}>
              <option value="Every Day">Every Day</option>
              <option value="Once a week">Once a week</option>
              <option value="2x/week">2x/week</option>
              <option value="3x/week">3x/week</option>
              <option value="4x/week">4x/week</option>
              <option value="week days">week days</option>
            </select>
          </div>
          <ul className="w-full p-0 flex flex-col gap-2 cursor-pointer">
            <li className=" w-full border-b border-gray-600 flex flex-col items-start pb-1">
              <strong className=" flex items-center gap-1 py-2">
                Reminder
              </strong>
              <strong className=" w-full text-right text-gray-500">
                Click to select or Pick Custome
              </strong>
            </li>
            <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
              <label htmlFor="no_reminder">No Reminder</label>
              <input
                type="radio"
                name="alarm"
                id="no_reminder"
                value={"No Reminder"}
                onChange={(e) => {
                  setFirstTime(e.target.value);
                }}
              />
            </li>
            <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
              <label htmlFor="Workout">Workout at 05:30:00 AM</label>
              <input
                type="radio"
                name="alarm"
                id="Workout"
                value={`${Workout}`}
                onChange={(e) => {
                  setFirstTime(e.target.value);
                }}
              />
            </li>
            <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
              <label htmlFor="breakfast">Breakfast at 9:00 AM</label>
              <input
                type="radio"
                name="alarm"
                id="breakfast"
                value={`${Breakfast}`}
                onChange={(e) => {
                  setFirstTime(e.target.value);
                }}
              />
            </li>

            <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
              <label htmlFor="super">Supper at 05:00:00 PM</label>
              <input
                type="radio"
                name="alarm"
                id="super"
                value={`${Supper}`}
                onChange={(e) => {
                  setFirstTime(e.target.value);
                }}
              />
            </li>
            <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
              <label htmlFor="bedtime">Bed Time at 09:30:00 PM</label>
              <input
                type="radio"
                name="alarm"
                id="bedtime"
                value={`${bedtime}`}
                onChange={(e) => {
                  setFirstTime(e.target.value);
                }}
              />
            </li>
          </ul>
          <label
            htmlFor="reminder"
            className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
            Or selected Time:
          </label>
          <input
            type="time"
            value={firstTime}
            onChange={(e) => {
              setFirstTime(
                moment(e.target.value, "HH:mm:ss").format("HH:mm:ss A")
              );
            }}
            className=" focus:outline-none w-full h-9 border rounded-lg p-2 text-gray-400 text-sm font-normal"
          />
        </div>
        <div className=" flex-1 flex flex-col items-start p-2 border-b border-green-900">
          <div className=" w-full flex flex-col max-h-44 overflow-auto gap-1 items-start pb-1 my-2 border-b border-green-900">
            <label
              htmlFor="Type"
              className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
              how Many Times in a days will this task be performed
            </label>
            <select
              name="Type"
              id="Type"
              className=" focus:outline-none w-full h-9 border
            rounded-lg p-2 text-gray-400 text-sm font-normal"
              onChange={(e) => {
                e.target.value === "Twice" && setInitial(!initial);
                e.target.value === "Thrice" &&
                  setInitial(!initial) &&
                  setSecondInit(!secondInit);

                e.target.value === "Once" && setRepeatRemind(1);
                e.target.value === "Twice" && setRepeatRemind(2);
                e.target.value === "Thrice" && setRepeatRemind(3);
              }}>
              <option value="Once">Once a day</option>
              <option value="Twice">Twice a day</option>
              <option value="Thrice">3x a day</option>
            </select>
          </div>
          {initial && (
            <>
              <label
                htmlFor="reminder"
                className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
                Second Reminder:
              </label>
              <input
                type="time"
                value={secondTime}
                onChange={(e) => {
                  setSecondTime(
                    moment(e.target.value, "HH:mm:ss").format("HH:mm:ss A")
                  );
                }}
                className=" focus:outline-none w-full h-9 border rounded-lg p-2 text-gray-400 text-sm font-normal"
              />
            </>
          )}
          {secondInit && (
            <>
              <label
                htmlFor="reminder"
                className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
                Third Reminder:
              </label>
              <input
                type="time"
                value={thirdTime}
                onChange={(e) => {
                  setThirdTime(
                    moment(e.target.value, "HH:mm:ss").format("HH:mm:ss A")
                  );
                }}
                className=" focus:outline-none w-full h-9 border rounded-lg p-2 text-gray-400 text-sm font-normal"
              />
            </>
          )}
        </div>
      </div>
      <div className=" w-1/3 flex flex-col gap-2 items-center justify-center">
        <p>
          Tracking <strong> {habit} </strong>for
        </p>
        <p>
          <strong className=" text-6xl">{numberOfDays}</strong>
          days a week
        </p>
        <p>
          Reminder: <strong> {firstTime} </strong>
        </p>
        <NavLink
          to={"../Week"}
          onClick={() => {
            dispatchHabitValue();
          }}
          className={({ isActive }) => {
            return (
              "activeElement w-2/5 h-12 rounded-full text-blue-600 flex items-center justify-center gap-2 shadow-xl hover:bg-blue-700 hover:text-white " +
              (isActive ? "bg-blue-700 font-bold text-white" : "bg-gray-50")
            );
          }}>
          <strong className=" flex items-center justify-center gap-2">
            <IoMdAdd />
            Save
          </strong>
        </NavLink>
        <NavLink
          to={"../Week"}
          className={({ isActive }) => {
            return (
              "activeElement w-2/5 h-12 rounded-full text-orange-500 flex items-center justify-center gap-2 shadow-xl hover:bg-orange-400 hover:text-white " +
              (isActive ? "bg-orange-500 font-bold text-white" : "bg-gray-50")
            );
          }}>
          <strong className=" flex items-center justify-center gap-2">
            Cancel
          </strong>
        </NavLink>
      </div>
    </section>
  );
}
