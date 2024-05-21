import { FaTasks } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { LuAlarmCheck } from "react-icons/lu";
import { BsCalendar2Date } from "react-icons/bs";
import { TbCalendarRepeat } from "react-icons/tb";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { MdDownloadDone } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbUrgent } from "react-icons/tb";
import Calendar from "react-calendar";
import { FaTrash } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { BiSolidCustomize } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegSquare } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

import { IoPlay } from "react-icons/io5";
import { FaPauseCircle } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { FaSquareCheck } from "react-icons/fa6";

export default function Schedules() {
  const [showTitle, setShowTitle] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [dueDate, setDuedate] = useState(false);
  const [repeatTask, setRepeatTask] = useState(false);
  const [submitTask, setSubmitTask] = useState(false);
  const [status, setStatus] = useState("All");
  const [sortedTasks, setSortedTasks] = useState([]);
  //dispatch values

  const [taskValue, setTaskValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [catValue, setCatValue] = useState("");
  const [reminderValues, setReminderValues] = useState("");
  const [dateValues, setDateValues] = useState("");
  const [repeatValues, setRepeatValues] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const showSubmitButton = () => {
    taskValue.length > 0 ? setSubmitTask(true) : setSubmitTask(false);
  };

  const allTimeFormat = moment(reminderValues, "HH:mm:ss");
  const currentTime = moment();
  const [taskData, setTaskData] = useState([]);

  const renderTaskLists = (
    taskValue,
    titleValue,
    catValue,
    reminderValues,
    dateValues,
    repeatValues
  ) => {
    const arrayData = {
      id: uuidv4(),
      taskValue: taskValue,
      titleValue: titleValue,
      catValue: catValue,
      reminderValues: reminderValues,
      dateValues: dateValues,
      repeatValues: repeatValues,
      diffInMinutes: allTimeFormat.diff(currentTime, "minutes"),
      done: false,
      urgent: false,
      focused: false,
    };
    setTaskData([...taskData, arrayData]);
  };

  const totalTast = taskData.length;
  const totalDone = taskData.filter((task) => task.done === true).length;
  const totalPending = taskData.filter((task) => task.done === false).length;
  const totalUrgent = taskData.filter((task) => task.urgent === true).length;

  useEffect(() => {
    if (taskData.length === 0) return;
    localStorage.setItem("taskData", JSON.stringify(taskData));
  }, [taskData]);

  useEffect(() => {
    let taskData = JSON.parse(localStorage.getItem("taskData"));
    setTaskData(taskData);
  }, []);

  useEffect(() => {
    switch (status) {
      case "completed":
        setSortedTasks(taskData.filter((task) => task.done === true));
        break;
      case "pending":
        setSortedTasks(taskData.filter((task) => task.done === false));
        break;
      case "urgent":
        setSortedTasks(taskData.filter((task) => task.urgent === true));
        break;
      case "normal":
        setSortedTasks(taskData.filter((task) => task.urgent === false));
        break;
      default:
        setSortedTasks(taskData);
        break;
    }
  }, [taskData, status]);

  const Ctimes = "YYYY-MM-DD 07:30:00";
  const coffeeTime = moment(Ctimes, "HH:mm:ss").format("HH:mm:ss A");

  const Btimes = "YYYY-MM-DD  10:00:00";
  const breakFastTime = moment(Btimes, "HH:mm:ss").format("HH:mm:ss A");

  const Ltimes = "YYYY-MM-DD  13:00:00";
  const lunchTime = moment(Ltimes, "HH:mm:ss").format("HH:mm:ss A");

  const Stimes = "YYYY-MM-DD  17:30:00";
  const superTime = moment(Stimes, "HH:mm:ss").format("HH:mm:ss A");

  return (
    <section className="w-full h-full p-1 relative sm:overflow-auto">
      <header className="h-auto w-full flex items-center justify-center sm:text-md">
        <ul className="w-full flex items-center justify-center gap-2 p-1 sm:flex-col">
          <li className="sm:w-full w-max flex items-center justify-center rounded-lg border p-1 shadow-2xl gap-4">
            <span
              data-count={notificationCount}
              className="notify-count relative p-1">
              <IoNotifications />
            </span>
            <span className=" flex p-1 items-center">
              <FaTasks />: {totalTast}
            </span>
            <span className=" flex p-1 items-center">
              <MdDownloadDone />: {totalDone}
            </span>
            <span className=" flex p-1 items-center">
              <MdOutlinePendingActions />: {totalPending}
            </span>
            <span className=" flex p-1 items-center">
              <TbUrgent />: {totalUrgent}
            </span>
          </li>

          <li className="sm:w-full w-max flex items-center justify-center rounded-lg border p-1 shadow-2xl gap-2">
            <span className="flex items-center justify-start gap-2">
              <MdOutlineLocalPrintshop className="activeElement text-lg" />
              <IoShareSocialSharp className="activeElement text-lg" />
            </span>
            <select
              name="sortBy"
              id="sortBy"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              className="w-max rounded border border-orange-200 p-1 bg-transparent focus:outline-none">
              <option defaultValue="">Sort by</option>
              <option value="All">All</option>
              <option value="completed">completed</option>
              <option value="pending">pending</option>
              <option value="urgent">urgent</option>
              <option value="normal">normal</option>
            </select>
          </li>
        </ul>
      </header>

      <div className="flex gap-1 h-auto border my-2 relative p-1">
        <ul className="flex-1 sm:grid sm:grid-col sm:h-mhgt h-Ahgt rounded-lg overflow-auto">
          {sortedTasks.map((data) => {
            return (
              <li
                className={`sm:flex-col md:flex-col flex items-center justify-center w-full p-2 h-auto border rounded hover:shadow-lg my-4 gap-2 relative + ${
                  data.done ? "  opacity-50 " : " bg-gray-50"
                } + ${data.urgent ? " bg-gray-300 !text-black" : ""}`}
                key={data.id}>
                <Taskrender
                  {...data}
                  id={data.id}
                  data={data}
                  setTaskData={setTaskData}
                  taskData={taskData}
                  notificationCount={notificationCount}
                  setNotificationCount={setNotificationCount}
                />
              </li>
            );
          })}
        </ul>

        {showTitle && (
          <div
            className={`sm:w-full w-80 p-2 border rounded shadow-lg absolute right-0 bottom-0 bg-teal-50 z-10 ${
              showTitle ? "show--frame " : ""
            }`}>
            <TitleFunction
              setShowTitle={setShowTitle}
              titleValue={titleValue}
              setTitleValue={setTitleValue}
            />
          </div>
        )}
        {showCategory && (
          <div
            className={`sm:w-full w-80 p-2 border rounded shadow-lg absolute right-0 bottom-0 bg-teal-50 z-10 ${
              showCategory ? "show--frame " : ""
            }`}>
            <Category
              setShowCategory={setShowCategory}
              catValue={catValue}
              setCatValue={setCatValue}
            />
          </div>
        )}
        {showReminder && (
          <div
            className={`sm:w-full w-80 p-2 border rounded shadow-lg absolute right-0 bottom-0 bg-teal-50 z-10 ${
              showReminder ? "show--frame " : ""
            }`}>
            <Reminders
              setShowReminder={setShowReminder}
              reminderValues={reminderValues}
              setReminderValues={setReminderValues}
              coffeeTime={coffeeTime}
              breakFastTime={breakFastTime}
              lunchTime={lunchTime}
              superTime={superTime}
            />
          </div>
        )}
        {dueDate && (
          <div
            className={`sm:w-full w-80 p-2 border rounded shadow-lg absolute right-0 bottom-0 bg-teal-50 z-10 ${
              dueDate ? "show--frame " : ""
            }`}>
            <Duedate
              dueDate={dueDate}
              setDuedate={setDuedate}
              dateValues={dateValues}
              setDateValues={setDateValues}
            />
          </div>
        )}
        {repeatTask && (
          <div
            className={`sm:w-full w-80 p-2 border rounded shadow-lg absolute right-0 bottom-0 bg-teal-50 z-10 ${
              repeatTask ? "show--frame " : ""
            }`}>
            <RepeatTask
              repeatTask={repeatTask}
              setRepeatTask={setRepeatTask}
              repeatValues={repeatValues}
              setRepeatValues={setRepeatValues}
            />
          </div>
        )}
        {submitTask && (
          <div
            className={`activeElement w-40 p-2 border rounded shadow-lg absolute right-4 bottom-4 sm:bottom-10 sm:right-4 flex items-center justify-center gap-2 cursor-pointer ${
              submitTask ? "show--frame " : ""
            }`}
            onClick={() => {
              renderTaskLists(
                taskValue,
                titleValue,
                catValue,
                reminderValues,
                dateValues,
                repeatValues
              );
              setTaskValue("");
              setTitleValue("");
              setCatValue("");
              setReminderValues("");
              setDateValues("");
              setRepeatValues("");
              setSubmitTask(false);
            }}>
            <IoSend />
            Submit
          </div>
        )}
      </div>

      <footer className="footer--shadow w-full h-16 flex items-center justify-between sm:text-md p-2 border rounded-lg sm:flex-col sm:h-auto">
        <div className="sm:w-full flex-1 p-1 flex items-center justify-start gap-2">
          <label
            htmlFor="Tasks"
            className=" flex items-center gap-2 font-bold border-r-2 px-2 text-gray-500 sm:hidden">
            <FaTasks />
            Add Task
          </label>
          <input
            type="text"
            name="Tasks"
            id="Tasks"
            placeholder=" Type activity here"
            value={taskValue}
            onChange={(e) => {
              setTaskValue(e.target.value);
            }}
            onKeyUp={() => {
              showSubmitButton();
            }}
            className=" flex-1 p-2 bg-transparent rounded focus:outline-1 outline-orange-200"
          />
        </div>
        <div className="flex w-auto sm:p-1 p-2 items-center justify-center gap-2 text-nowrap sm:border sm:rounded sm:text-white sm:w-full">
          <span
            className="activeElement flex flex-1 items-center justify-center gap-2 Tittle--menu more--option relative border rounded w-8 h-8 text-lg bg-orange-500 text-white"
            onClick={() => {
              setShowTitle(!showTitle);
              setShowCategory(false);
              setShowReminder(false);
              setDuedate(false);
              setRepeatTask(false);
            }}>
            <MdSubject />
          </span>
          <span
            className="activeElement flex flex-1 items-center justify-center gap-2 category--menu more--option relative border rounded w-8 h-8 text-lg bg-orange-500 text-white"
            onClick={() => {
              setShowCategory(!showCategory);
              setShowTitle(false);
              setShowReminder(false);
              setDuedate(false);
              setRepeatTask(false);
            }}>
            <BiCategory />
          </span>
          <span
            className="activeElement flex flex-1 items-center justify-center gap-2 alarm-menu more--option relative border rounded w-8 h-8 text-lg bg-orange-500 text-white"
            onClick={() => {
              setShowReminder(!showReminder);
              setShowTitle(false);
              setShowCategory(false);
              setDuedate(false);
              setRepeatTask(false);
            }}>
            <LuAlarmCheck />
          </span>
          <span
            className="activeElement flex flex-1 items-center justify-center gap-2 date--menu more--option relative border rounded w-8 h-8 text-lg bg-orange-500 text-white"
            onClick={() => {
              setDuedate(!dueDate);
              setRepeatTask(false);
              setShowReminder(false);
              setShowTitle(false);
              setShowCategory(false);
            }}>
            <BsCalendar2Date />
          </span>
          <span
            className="activeElement flex flex-1 items-center justify-center gap-2 repeat--menu more--option relative border rounded w-8 h-8 text-lg bg-orange-500 text-white"
            onClick={() => {
              setRepeatTask(!repeatTask);
              setDuedate(false);
              setShowReminder(false);
              setShowTitle(false);
              setShowCategory(false);
            }}>
            <TbCalendarRepeat />
          </span>
        </div>
      </footer>
    </section>
  );
}

function TitleFunction(props) {
  return (
    <div className="w-full flex flex-col">
      <ul
        className="w-full p-0 flex flex-col gap-2 cursor-pointer relative"
        onClick={() => {
          props.setShowTitle(false);
        }}>
        <li className=" w-full border-b border-gray-600 flex flex-col items-start pb-1">
          <strong className=" flex items-center gap-1 py-2">
            <MdSubject />
            Title
          </strong>
          <strong className=" w-full text-right text-gray-500">
            Click to select or type to add
          </strong>
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="tittle" className=" flex-1 h-full">
            Examination
          </label>
          <input
            type="radio"
            name="tittle"
            value={"Examination"}
            id="tittle"
            onChange={(e) => {
              props.setTitleValue(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="slides" className=" flex-1 h-full">
            Slides
          </label>
          <input
            type="radio"
            name="tittle"
            value={"Slides"}
            id="slides"
            onChange={(e) => {
              props.setTitleValue(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="tutorials" className=" flex-1 h-full">
            Tutorials
          </label>
          <input
            type="radio"
            name="tittle"
            value={"Tutorials"}
            id="tutorials"
            onChange={(e) => {
              props.setTitleValue(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="practicals" className=" flex-1 h-full">
            Practicals
          </label>
          <input
            type="radio"
            name="tittle"
            value={"Practicals"}
            id="practicals"
            onChange={(e) => {
              props.setTitleValue(e.target.value);
            }}
          />
        </li>
      </ul>
      <form
        className=" w-full flex flex-col items-start pb-1"
        onSubmit={(e) => {
          e.preventDefault();
          props.setShowTitle(false);
        }}>
        <label htmlFor="taskTitle" className=" w-full text-gray-500">
          <strong>Add Custome Title</strong>
        </label>
        <div className=" w-full p-2 flex items-center gap-1">
          <input
            type="text"
            name="taskTitle"
            id="taskTitle"
            placeholder="Type to add"
            value={props.titleValue}
            onChange={(e) => {
              props.setTitleValue(e.target.value);
            }}
            className="flex-1 border border-teal-400 rounded p-1 h-8 mt-1 bg-transparent focus:outline-none text-gray-500"
          />
          <button
            type="submit"
            className=" w-8 h-8 rounded bg-orange-500 text-white text-2xl flex items-center justify-center activeElement">
            <IoIosAddCircle />
          </button>
        </div>
      </form>
    </div>
  );
}
function Category(props) {
  return (
    <div className="w-full flex flex-col">
      <ul
        className="w-full p-0 flex flex-col gap-2 cursor-pointer"
        onClick={() => {
          props.setShowCategory(false);
        }}>
        <li className=" w-full border-b border-gray-600 flex flex-col items-start pb-1">
          <strong className=" flex items-center gap-1 py-2">
            <BiCategory />
            Category
          </strong>
          <strong className=" w-full text-right text-gray-500">
            Click to select or type to add
          </strong>
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setCatValue(e.target.innerText);
          }}>
          <label htmlFor="academics">Academics</label>
          <input
            type="radio"
            name="category"
            value={"Academics"}
            id="academics"
            onChange={(e) => {
              props.setCatValue(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="work">Work Schedule</label>
          <input
            type="radio"
            name="category"
            value={"Work Schedule"}
            id="work"
            onChange={(e) => {
              props.setCatValue(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="religion">Religious Activity</label>
          <input
            type="radio"
            name="category"
            value={"Religious Activity"}
            id="religion"
            onChange={(e) => {
              props.setCatValue(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="personal">Personal Routines</label>
          <input
            type="radio"
            name="category"
            value={"Personal Routines"}
            id="personal"
            onChange={(e) => {
              props.setCatValue(e.target.value);
            }}
          />
        </li>
      </ul>
      <form
        className=" w-full flex flex-col items-start pb-1"
        onSubmit={(e) => {
          e.preventDefault();
          props.setShowCategory(false);
        }}>
        <label htmlFor="taskTitle" className=" w-full text-gray-500">
          <strong>Add Custom Category</strong>
        </label>
        <div className=" w-full p-2 flex items-center gap-1">
          <input
            type="text"
            name="taskCategory"
            id="taskCategory"
            placeholder="Type to add"
            value={props.catValue}
            onChange={(e) => {
              props.setCatValue(e.target.value);
            }}
            className=" w-full border border-teal-400 rounded p-1 mt-1 bg-transparent focus:outline-none text-gray-500"
          />
          <button
            type="submit"
            className=" w-8 h-8 rounded bg-orange-500 text-white text-2xl flex items-center justify-center activeElement">
            <IoIosAddCircle />
          </button>
        </div>
      </form>
    </div>
  );
}
function Reminders(props) {
  return (
    <div className="w-full flex flex-col">
      <ul
        className="w-full p-0 flex flex-col gap-2 cursor-pointer"
        onClick={() => {
          props.setShowReminder(false);
        }}>
        <li className=" w-full border-b border-gray-600 flex flex-col items-start pb-1">
          <strong className=" flex items-center gap-1 py-2">
            <BiCategory />
            Reminder
          </strong>
          <strong className=" w-full text-right text-gray-500">
            Click to select or type to add
          </strong>
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="coffee">Coffee at 07:30:00 AM</label>
          <input
            type="radio"
            name="alarm"
            value={`Coffee at ${props.coffeeTime}`}
            id="coffee"
            onChange={(e) => {
              props.setReminderValues(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="breakfast">Breakfast at 10:00 AM</label>
          <input
            type="radio"
            name="alarm"
            value={`Breakfast at ${props.breakFastTime}`}
            id="breakfast"
            onChange={(e) => {
              props.setReminderValues(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="lunch">Lunch at 01:00:00 PM</label>
          <input
            type="radio"
            name="alarm"
            value={`Lunch at ${props.lunchTime}`}
            id="lunch"
            onChange={(e) => {
              props.setReminderValues(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="super">Supper at 05:00:00 PM</label>
          <input
            type="radio"
            name="alarm"
            value={`Super at ${props.superTime}`}
            id="super"
            onChange={(e) => {
              props.setReminderValues(e.target.value);
            }}
          />
        </li>
      </ul>

      <form
        className=" w-full flex flex-col items-start pb-1"
        onSubmit={(e) => {
          e.preventDefault();
          props.setShowReminder(false);
        }}>
        <label htmlFor="taskTime" className=" w-full text-gray-500">
          <strong>Select Reminder</strong>
        </label>
        <div className=" w-full p-2 flex items-center gap-1">
          input:d
          <input
            type="datetime-local"
            name="taskTime"
            id="taskTime"
            value={props.reminderValues}
            onChange={(e) => {
              props.setReminderValues(
                moment(e.target.value, "YYYY-MM-DD HH:mm:ss").format(
                  "HH:mm:ss A"
                )
              );
            }}
            className=" w-full border border-teal-400 rounded p-1 mt-1 bg-transparent focus:outline-none text-gray-500"
          />
          <button
            type="submit"
            className=" w-8 h-8 rounded bg-orange-500 text-white text-2xl flex items-center justify-center activeElement">
            <IoIosAddCircle />
          </button>
        </div>
      </form>
    </div>
  );
}

function Duedate(props) {
  const newDate = new Date().toDateString();
  const [calenderDate, setCalenderDate] = useState(new Date());
  const [showCallender, setShowCallender] = useState(false);
  const onChange = (calenderDate) => {
    setCalenderDate(calenderDate);
    props.setDateValues(calenderDate.toDateString());
    props.setDuedate(!props.dueDate);
  };
  return (
    <div className="w-full flex flex-col">
      <ul
        className="w-full p-0 flex flex-col items-center gap-2 cursor-pointer overflow-auto"
        onClick={() => {
          props.setDuedate(false);
        }}>
        <li className=" w-full border-b border-gray-600 flex flex-col items-start pb-1">
          <strong className=" flex items-center gap-1 py-2">
            <BsCalendar2Date />
            Due date
          </strong>
          <strong className=" w-full text-right text-gray-500">
            Click to select or type to add
          </strong>
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setDateValues(e.target.textContent);
          }}>
          Today: {newDate},
        </li>
      </ul>
      <div
        className=" w-full flex flex-col items-start py-2"
        onClick={() => {
          setShowCallender(!showCallender);
        }}>
        <label
          htmlFor="taskDate"
          className=" w-full text-gray-500 flex items-center justify-between p-1">
          <strong>Select date</strong>
          <span>{calenderDate.toDateString()}</span>
        </label>

        <span className=" w-full inline-block items-center justify-center">
          <Calendar
            plugins={[
              {
                startAccessor: "start",
                endAccessor: "end",
                labelAccessor: "title",
              },
            ]}
            value={calenderDate}
            onChange={onChange}
          />
        </span>
      </div>
    </div>
  );
}
function RepeatTask(props) {
  const [calenderDate, setCalenderDate] = useState(new Date());
  const [showCallender, setShowCallender] = useState(false);

  const onChange = (calenderDate) => {
    setCalenderDate(calenderDate);
    props.setRepeatValues(calenderDate.toDateString());
    props.setRepeatTask(!props.repeatTask);
  };

  return (
    <div className="w-full flex flex-col ">
      <ul
        className="w-full p-0 flex flex-col items-center gap-2 cursor-pointer sm:h-mhgt overflow-auto"
        onClick={() => {
          props.setRepeatTask(false);
        }}>
        <li className=" w-full border-b border-gray-600 flex flex-col items-start pb-1">
          <strong className=" flex items-center gap-1 py-2">
            <BsCalendar2Date />
            Repeat Task
          </strong>
          <strong className=" w-full text-right text-gray-500">
            Click to select or type to add
          </strong>
        </li>

        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="no_repeat">No repeat</label>
          <input
            type="radio"
            name="repeat"
            value={"No repeat"}
            id="no_repeat"
            onChange={(e) => {
              props.setRepeatValues(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="daily">Daily</label>
          <input
            type="radio"
            name="repeat"
            value={"daily"}
            id="Daily"
            onChange={(e) => {
              props.setRepeatValues(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="weekly">Weekly</label>
          <input
            type="radio"
            name="repeat"
            value={"Weekly"}
            id="weekly"
            onChange={(e) => {
              props.setRepeatValues(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <label htmlFor="monthly">Monthly</label>
          <input
            type="radio"
            name="repeat"
            value={"Monthly"}
            id="monthly"
            onChange={(e) => {
              props.setRepeatValues(e.target.value);
            }}
          />
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <span className=" text-nowrap">Select days to repeat </span>
        </li>
      </ul>
      <div className=" w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
        <ol
          className=" p-1 w-full flex items-center justify-center gap-2 cursor-pointer"
          onClick={(e) => {
            props.setRepeatValues((prev) => {
              return prev.includes(e.target.innerText)
                ? prev.filter((item) => {
                    return item !== e.target.innerText;
                  })
                : [...prev, e.target.innerText];
            });
          }}>
          <li className="activeElement w-6 h-6 rounded-full bg-orange-500 text-teal-50 flex items-center justify-center text-xs font-bold">
            Mo
          </li>
          <li className="activeElement w-6 h-6 rounded-full bg-orange-500 text-teal-50 flex items-center justify-center text-xs font-bold">
            Tu
          </li>
          <li className="activeElement w-6 h-6 rounded-full bg-orange-500 text-teal-50 flex items-center justify-center text-xs font-bold">
            We
          </li>
          <li className="activeElement w-6 h-6 rounded-full bg-orange-500 text-teal-50 flex items-center justify-center text-xs font-bold">
            Th
          </li>
          <li className="activeElement w-6 h-6 rounded-full bg-orange-500 text-teal-50 flex items-center justify-center text-xs font-bold">
            Fr
          </li>
          <li className="activeElement w-6 h-6 rounded-full bg-orange-500 text-teal-50 flex items-center justify-center text-xs font-bold">
            Sa
          </li>
          <li className="activeElement w-6 h-6 rounded-full bg-orange-500 text-teal-50 flex items-center justify-center text-xs font-bold">
            Su
          </li>
        </ol>
      </div>
      <div
        className=" w-full flex flex-col items-start py-2"
        onClick={() => {
          setShowCallender(!showCallender);
        }}>
        <label
          htmlFor="taskDate"
          className=" w-full text-gray-500 flex items-center justify-between p-1">
          <strong>Select date</strong>
          <span>{calenderDate.toDateString()}</span>
        </label>

        <span className=" w-full inline-block items-center justify-center">
          <Calendar
            plugins={[
              {
                startAccessor: "start",
                endAccessor: "end",
                labelAccessor: "title",
              },
            ]}
            value={calenderDate}
            onChange={onChange}
          />
        </span>
      </div>
    </div>
  );
}

function Taskrender(props) {
  const [editTask, setEditTask] = useState(false);
  const [completeCheck, setCompleteCheck] = useState(false);
  const [urgentCheck, setUrgentCheck] = useState(false);

  function CompletedTask() {
    props.setTaskData(
      props.taskData.map((item) => {
        if (item.id === props.data.id) {
          return { ...item, done: !item.done };
        }
        return item;
      })
    );
  }
  function setToFocused() {
    props.setTaskData(
      props.taskData.map((item) => {
        if (item.id === props.data.id) {
          return { ...item, focused: !item.focused };
        }
        return item;
      })
    );
  }

  const urgentTask = () => {
    props.setTaskData(
      props.taskData.map((item) => {
        if (item.id === props.data.id) {
          return { ...item, urgent: !item.urgent };
        }
        return item;
      })
    );
  };

  const removeTask = () => {
    props.setTaskData(
      props.taskData.filter((item) => {
        return item.id !== props.data.id;
      })
    );
  };

  const renameTaskValue = (newValue) => {
    props.setTaskData(
      props.taskData.map((item) => {
        if (item.id === props.data.id) {
          return { ...item, taskValue: newValue };
        }
        return item;
      })
    );
  };

  return (
    <>
      <div className="sm:w-full md:w-full flex-1 flex flex-col gap-2 items-start justify-between p-0">
        <p className="w-full flex items-center justify-start gap-2 capitalize">
          <span className=" flex items-center justify-start gap-2">
            <FaTasks />
            Task:
          </span>
          {!editTask && <strong className=" flex-1">{props.taskValue}</strong>}
          {editTask && (
            <form
              action="post"
              className=" flex-1"
              onSubmit={(e) => {
                e.preventDefault();
                setEditTask(!editTask);
              }}>
              <input
                type="text"
                name="edittask"
                id="edittask"
                value={props.taskValue}
                onChange={(e) => {
                  renameTaskValue(e.target.value);
                }}
                className=" w-5/6 p-1 indent-2 rounded border focus:outline-dashed font-medium"
              />
            </form>
          )}
          <AiOutlineEdit
            className=" activeElement"
            onClick={() => {
              setEditTask(!editTask);
            }}
          />
        </p>
        <div className=" flex items-center justify-start gap-2 w-full border rounded p-1">
          <div className=" flex-1 flex items-center justify-start gap-2 text-sm">
            <span className=" flex items-center gap-1 justify-start">
              <MdSubject /> Title: {props.titleValue}
            </span>
            <span className=" flex items-center gap-1 justify-start">
              <BiCategory />
              Category: {props.catValue}
            </span>
          </div>
          <div className="w-1/4 flex items-center gap-1 justify-end pr-2">
            <span
              className=" activeElement text-sm"
              onClick={() => {
                setUrgentCheck(!urgentCheck);
                urgentTask();
              }}>
              {props.data.urgent && <FaStar />}
              {!props.data.urgent && <FaRegStar />}
            </span>
            {props.data.urgent ? "Prioritized" : "Normal"}
          </div>
        </div>
      </div>
      <div className="sm:w-full md:w-full sm:flex-col flex-1 flex items-center justify-end gap-6 p-1 text-sm text-nowrap">
        <p className="sm:w-full md:w-full p-1 flex flex-col items-start">
          <span className="flex items-center justify-start gap-1  font-semibold border-l-4 px-1 border-blue-400">
            <LuAlarmCheck />
            Due Time
          </span>
          <span className=" text-orange-800">{props.reminderValues}</span>
        </p>
        <p className="sm:w-full md:w-full p-1 flex flex-col items-start">
          <span className="flex items-center justify-start gap-1 font-semibold border-l-4 px-1 border-blue-400">
            <BsCalendar2Date />
            Due date
          </span>
          <span className=" text-orange-800">{props.dateValues}</span>
        </p>
        <p className="sm:w-full md:w-full p-1 flex flex-col items-start">
          <span className="flex items-center justify-start gap-1 font-semibold border-l-4 px-1 border-blue-400">
            <TbCalendarRepeat /> Repeat
          </span>
          <span className=" text-orange-800 flex items-center gap-2">
            {props.repeatValues}
          </span>
        </p>
      </div>
      <div className="flex-1 flex items-center justify-end p-0 gap-2">
        <span
          className="w-max px-2 flex items-center justify-end gap-2 text-red-500 activeElement cursor-pointer"
          onClick={removeTask}>
          <FaTrash className=" activeElement" onClick={removeTask} />
          Remove
        </span>

        <span className="w-max px-2 flex items-center justify-end gap-2 activeElement cursor-pointer">
          <span
            className=" activeElement text-sm"
            onClick={() => {
              setCompleteCheck(!completeCheck);
              CompletedTask();
            }}>
            {props.data.done && <FaCheckSquare />}
            {!props.data.done && <FaRegSquare />}
          </span>
          {props.data.done ? "Done" : "Pending"}
        </span>

        <span
          className="w-max px-2 flex items-center justify-end gap-2 activeElement cursor-pointer"
          onClick={setToFocused}>
          <BiSolidCustomize />
          focus
        </span>
      </div>
      <div className=" absolute top-full right-0 w-3/5 h-auto z-10 bg-inherit">
        {props.data.focused && (
          <Focus
            taskValue={props.taskValue}
            notificationCount={props.notificationCount}
            setNotificationCount={props.setNotificationCount}
          />
        )}
      </div>
    </>
  );
}

function Focus({ taskValue, notificationCount, setNotificationCount }) {
  const [startTimer, setStartTimer] = useState(false);
  const [breakSession, setBreakSession] = useState(false);
  const [height, setHeight] = useState(0);

  const [focus, setFocus] = useState([
    {
      id: uuidv4(),
      target: "",
      breakTime: "",
      clearTime: "",
    },
  ]);

  useEffect(() => {
    if (focus.length === 1) return;
    localStorage.setItem("focus", JSON.stringify(focus));
  }, [focus]);

  useEffect(() => {
    let focus = JSON.parse(localStorage.getItem("focus"));
    setFocus(focus);
  }, []);

  var breakPoint = 0;
  if (focus.target > 0 && focus.target < 2) {
    breakPoint = 1;
  } else if (focus.target >= 2 && focus.target < 3) {
    breakPoint = 2;
  } else if (focus.target >= 3 && focus.target <= 5) {
    breakPoint = 3;
  } else if (focus.target > 5) {
    breakPoint = 4;
  }

  var activeSession = Math.round((focus.target * 60) / breakPoint);
  const restPeriod = Math.round(activeSession / breakPoint);

  const [timeInterval, setTimeInterval] = useState(null);
  var [timer, setTimer] = useState(0);

  let runTimer = true;

  const onStart = () => {
    setTimeInterval(
      setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000)
    );
  };

  const onPause = () => {
    setStartTimer(false);
    clearInterval(timeInterval);
  };

  const onReset = () => {
    setStartTimer(false);
    clearInterval(timeInterval);
    setTimer(0);
  };

  const onBreak = () => {
    setBreakSession(false);
  };

  const onContinue = () => {
    setBreakSession(true);
  };

  const onExtendHeight = () => {
    setHeight(height === 0 ? "23.5" : 0);
  };

  const [minuteCovered, setMinuteCovered] = useState(0);
  const [dailyCovered, setDailyCovered] = useState(0);
  let currentRef = 0;
  for (let i = 1; i <= breakPoint + 1; i++) {
    if (minuteCovered >= restPeriod * i) {
      currentRef = i;
    }
  }

  const CustomToast = () => {
    toast.custom(
      <div className=" bg-teal-50 text-black rounded border border-white p-2 flex flex-col gap-2 w-80 h-auto items-start text-sm shadow-lg">
        <h2 className=" font-semibold">Great Job!, </h2>
        <p>You can pause and take a {focus.breakTime} minute break</p>
        <div className=" w-full flex items-center justify-center gap-2">
          <button
            className="activeElement flex-1 h-9 rounded text-center text-black font-semibold bg-white shadow-md border hover:bg-gray-300"
            onClick={() => {
              setStartTimer(startTimer);
              onStart();
            }}>
            {focus.target - dailyCovered === 0 ? "Restart" : "Continue"}
          </button>
          <button
            className="activeElement flex-1 h-9 rounded text-center text-black font-semibold bg-white shadow-md border hover:bg-gray-300"
            onClick={() => toast.dismiss()}>
            Dismiss
          </button>
        </div>
      </div>,
      {
        duration: 10000,
        position: "top-center",
      }
    );
    return <Toaster />;
  };

  if (timer === restPeriod) {
    onPause();
    setMinuteCovered((prev) => prev + restPeriod);
    setTimer(0);
    setTimeInterval(null);
    CustomToast();
    setTimeout(() => {
      runTimer = true;
    }, 5000);
  }

  if (minuteCovered === restPeriod * breakPoint) {
    setMinuteCovered(0);
    setDailyCovered((prev) => prev + Math.round(activeSession / 60));
  }

  if (focus.target - dailyCovered === 0) {
    setTimeout(() => {
      setDailyCovered(0);
    }, 5000);
  }

  return (
    <div className=" w-full h-auto p-1 border flex flex-col">
      <Toaster />
      <div className=" flex items-center justify-between p-1 w-full h-12 border-b border-orange-500 relative">
        <div className=" flex items-center justify-start p-1 w-max text-sm">
          Valid Till: {focus.clearTime}
        </div>
        <strong className=" flex items-center justify-center p-1 flex-1">
          Title: <span className=" w-3/4 truncate mx-1"> {taskValue} </span>
        </strong>
        <div className=" flex items-center justify-end p-1 w-max">
          <button
            type="button"
            className="activeElement w-20 h-8 rounded-lg bg-green-800 shadow-2xl text-center hover:bg-green-600 text-white font-semibold"
            style={{ transition: "300ms ease-in-out" }}
            onClick={onExtendHeight}>
            Update
          </button>
        </div>
        <section
          className=" bg-slate-700 text-white absolute right-0 top-full w-80 overflow-hidden px-1 flex flex-col gap-2 capitalize rounded-lg z-50"
          style={{
            height: `${height}rem`,
            transition: "400ms ease-in-out",
          }}>
          <strong className=" w-full border-b text-left py-2 border-rose-400">
            Update your focus items
          </strong>
          <ul className=" flex flex-col gap-2 h-auto">
            <li className=" w-full h-auto flex flex-col gap-1 items-start border-b border-teal-50 py-1 ">
              <label
                htmlFor="amount"
                className="flex flex-row items-center gap-2 h-8 text-gray-300 font-semibold">
                Select Daily Target
              </label>
              <input
                type="number"
                name="target"
                id="target"
                value={focus.target}
                onChange={(e) => {
                  setFocus({ ...focus, target: e.target.value });
                }}
                placeholder="Daily Target (hrs)"
                className=" focus:outline-none w-full h-10 border rounded p-2 text-gray-800 text-sm font-normal"
              />
            </li>
            <li className=" w-full h-auto flex flex-col gap-1 items-start border-b border-teal-50 py-1 ">
              <label
                htmlFor="amount"
                className="flex flex-row items-center gap-2 h-8 text-gray-300 font-semibold">
                Minutes to Rest
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={focus.breakTime}
                onChange={(e) => {
                  setFocus({ ...focus, breakTime: e.target.value });
                }}
                placeholder="0-59 (min)"
                className=" focus:outline-none w-full h-10 border rounded p-2 text-gray-800 text-sm font-normal"
              />
            </li>
            <li className=" w-full h-auto flex flex-col gap-1 items-start border-b border-teal-50 py-1 ">
              <label
                htmlFor="amount"
                className="flex flex-row items-center gap-2 h-8 text-gray-300 font-semibold">
                Focus Expires on
              </label>
              <input
                type="datetime-local"
                value={focus.clearTime}
                onChange={(e) => {
                  setFocus({
                    ...focus,
                    clearTime: moment(
                      e.target.value,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format(`MM/DD, YYYY; HH:mm:ss A`),
                  });
                }}
                className=" focus:outline-none w-full h-10 border rounded p-2 text-gray-800 text-sm font-normal"
              />
            </li>
            <li className=" w-full h-auto flex items-center justify-center gap-2 py-1 ">
              <button
                type="button"
                className="activeElement w-1/4 h-9 rounded-lg flex items-center justify-center gap-2 text-black font-bold bg-teal-50 hover:bg-gray-300"
                onClick={onExtendHeight}>
                Close
              </button>
            </li>
          </ul>
        </section>
      </div>
      <div className=" flex items-center justify-between p-1 w-full flex-1 h-60">
        <div className=" w-1/3 h-60 gap-2 flex flex-col justify-between">
          <div className="h-full w-full gap-2 flex flex-col items-center justify-center">
            <p className=" w-max flex gap-2">
              <span className=" flex items-start">Active now </span>
              <strong className=" text-3xl">{activeSession}</strong>
              <span className="flex items-end">minutes</span>
            </p>
            <p className="w-3/4 flex items-start gap-1 font-semibold">
              Time to break: {`${timer} mins`}
            </p>
            <p className="w-3/4 flex items-start gap-1 font-semibold">
              Time Convered: {`${minuteCovered} mins`}
            </p>
          </div>
          <div className=" w-full h-10 p-1 flex items-center justify-center">
            {timeInterval === null && (
              <span className=" text-green-800">
                Break for {focus.breakTime} mins
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 h-full flex flex-col items-center gap-1 p-1">
          <div className=" w-full h-10 p-1 flex items-center justify-center bg-gray-200">
            break count {currentRef} of {breakPoint}
          </div>
          <div className=" w-full h-40 flex items-center justify-center gap-1 px-1">
            <p className=" flex-1 h-full p-1 border flex items-center justify-center flex-col gap-1">
              {`${dailyCovered} hrs`}
              <span>Completed</span>
            </p>
            <p className=" flex-1 h-full p-1 border flex items-center justify-center flex-col gap-1">
              <strong>{`${activeSession} / Session`}</strong>
              <span>{`${parseFloat(
                (dailyCovered / focus.target) * 100
              ).toPrecision(3)}% Completed`}</span>
              <span>{`${focus.target - dailyCovered}hrs Remaining`}</span>
            </p>
            <p className=" flex-1 h-full p-1 border flex items-center justify-center flex-col gap-1">
              {`${focus.target} hrs`}
              <span>Targeted</span>
            </p>
          </div>
          <div className=" w-full h-10 p-1 flex items-center justify-center border">
            {focus.target - dailyCovered !== 0 && (
              <span className=" font-bold text-slate-700">
                Keep going, you can do this...
              </span>
            )}
            {focus.target - dailyCovered === 0 && (
              <span className=" font-bold text-green-700">
                Target Achieved! congratulations! give yourself a treat...
              </span>
            )}
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-between p-1 w-full h-12 bg-gray-50 border-t border-slate-600">
        <div className=" flex items-center justify-start p-1 flex-1">
          {breakSession && (
            <span className=" flex items-center justify-start gap-2 p-1 w-full">
              <FaRegSquare onClick={onBreak} />
              Focus set to continuos
            </span>
          )}
          {!breakSession && (
            <span className=" flex items-center justify-start gap-2 p-1 w-full text-nowrap">
              <FaSquareCheck onClick={onContinue} />
              session breaks after {restPeriod} minute
            </span>
          )}
        </div>
        <div
          className=" flex items-center justify-center py-1 px-4 w-max shadow-xl border bg-gray-50 cursor-pointer activeElement"
          onClick={() => {
            setStartTimer(!startTimer);
            startTimer ? onPause() : onStart();
          }}>
          <span className=" flex items-center justify-start gap-2 p-1">
            {!startTimer && <IoPlay />}
            {!startTimer && "Start"}
          </span>
          <span className=" flex items-center justify-start gap-2 p-1">
            {startTimer && <FaPauseCircle />}
            {startTimer && "Pause"}
          </span>
        </div>
        <div className="w-full flex items-center justify-end p-1 flex-1">
          <button
            type="button"
            className="activeElement w-2/5 h-10 rounded-lg bg-orange-500 shadow-2xl flex items-center justify-center gap-1 hover:bg-orange-100 hover:text-black text-white"
            style={{ transition: "300ms ease-in-out" }}
            onClick={onReset}>
            <VscDebugRestart /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
