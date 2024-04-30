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
import { IoMdAdd } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function Schedules() {
  const [showTitle, setShowTitle] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [dueDate, setDuedate] = useState(false);
  const [repeatTask, setRepeatTask] = useState(false);
  const [submitTask, setSubmitTask] = useState(false);
  const [showSideEditBar, setShowSideEditBar] = useState(false);
  const [status, setStatus] = useState("All");
  const [sortedTasks, setSortedTasks] = useState([]);
  //dispatch values

  const [taskValue, setTaskValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [catValue, setCatValue] = useState("");
  const [reminderValues, setReminderValues] = useState("");
  const [dateValues, setDateValues] = useState("");
  const [repeatValues, setRepeatValues] = useState("");

  const showSubmitButton = () => {
    taskValue.length > 0 ? setSubmitTask(true) : setSubmitTask(false);
  };

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
      done: false,
      urgent: false,
    };
    setTaskData([...taskData, arrayData]);
  };

  const updatedTaskRender = (
    newtaskValue,
    newtitleValue,
    newcatValue,
    newreminderValues,
    newdateValues,
    newrepeatValues
  ) => {
    const newUpdated = taskData.map((newData) => {
      return {
        ...newData,
        taskValue: newtaskValue,
        titleValue: newtitleValue,
        catValue: newcatValue,
        reminderValues: newreminderValues,
        dateValues: newdateValues,
        repeatValues: newrepeatValues,
      };
    });
    setTaskData(newUpdated);
  };

  const totalTast = taskData.length;
  const totalDone = taskData.filter((task) => task.done === true).length;
  const totalPending = taskData.filter((task) => task.done === false).length;
  const totalUrgent = taskData.filter((task) => task.urgent === true).length;

  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(taskData));
  }, [taskData]);

  useEffect(() => {
    if (localStorage.getItem("taskData") === null) {
      localStorage.setItem("taskData", JSON.stringify([]));
    } else {
      let taskData = JSON.parse(localStorage.getItem("taskData"));
      setTaskData(taskData);
    }
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

  return (
    <section className="w-full h-full p-2 relative">
      <header className="h-auto w-full flex items-center justify-center sm:text-md">
        <ul className="w-full flex items-center justify-center gap-2 p-1 sm:flex-col">
          <li className="sm:w-full w-max flex items-center justify-center rounded-lg border p-1 shadow-2xl gap-4">
            <span data-count="0" className="notify-count relative p-1">
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
                className={`sm:flex-col md:flex-col flex items-center justify-center w-full p-2 h-auto border rounded hover:shadow-lg my-4 gap-2 activeElement + ${
                  data.done ? " bg-orange-200 opacity-50 " : ""
                } + ${data.urgent ? " bg-teal-950 text-white" : ""}`}
                onDoubleClick={() => {
                  setShowSideEditBar(!showSideEditBar);
                }}
                key={data.id}>
                <Taskrender
                  {...data}
                  id={data.id}
                  data={data}
                  setTaskData={setTaskData}
                  taskData={taskData}
                />
              </li>
            );
          })}
        </ul>
        {showSideEditBar && (
          <div className=" w-1/4 sm:h-mhgt h-Ahgt border border-orange-300 rounded-lg overflow-auto sm:absolute right-0 sm:w-4/5 md:absolute md:w-3/4 sm:bg-teal-50 md:bg-teal-50">
            <SideBarEditMenu
              setShowTitle={setShowTitle}
              setShowCategory={setShowCategory}
              setShowReminder={setShowReminder}
              setDuedate={setDuedate}
              setRepeatTask={setRepeatTask}
              setSubmitTask={setSubmitTask}
              setShowSideEditBar={setShowSideEditBar}
              setTaskValue={setTaskValue}
              setTitleValue={setTitleValue}
              setCatValue={setCatValue}
              setReminderValues={setReminderValues}
              setDateValues={setDateValues}
              setRepeatValues={setRepeatValues}
              taskValue={taskValue}
              titleValue={titleValue}
              catValue={catValue}
              reminderValues={reminderValues}
              dateValues={dateValues}
              repeatValues={repeatValues}
              onEditSubmit={updatedTaskRender}
              id={taskData.id}
            />
          </div>
        )}
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
        <div className="flex w-auto p-2 items-center justify-center gap-2 text-nowrap sm:bg-teal-950 sm:h-12 sm:rounded-2xl sm:text-white sm:w-full">
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
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setTitleValue(e.target.innerText);
          }}>
          Examination
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setTitleValue(e.target.innerText);
          }}>
          Slides
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setTitleValue(e.target.innerText);
          }}>
          Tutorials
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setTitleValue(e.target.innerText);
          }}>
          Practicals
        </li>
      </ul>
      <form
        className=" w-full flex flex-col items-start pb-1"
        onSubmit={(e) => {
          e.preventDefault();
          props.setShowTitle(false);
        }}>
        <label htmlFor="taskTitle" className=" w-full text-gray-500">
          <strong>Add Title</strong>
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
          Academics
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setCatValue(e.target.innerText);
          }}>
          Work Schedule
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setCatValue(e.target.innerText);
          }}>
          Religious Activity
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setCatValue(e.target.innerText);
          }}>
          Personal Routines
        </li>
      </ul>
      <form
        className=" w-full flex flex-col items-start pb-1"
        onSubmit={(e) => {
          e.preventDefault();
          props.setShowCategory(false);
        }}>
        <label htmlFor="taskTitle" className=" w-full text-gray-500">
          <strong>Add Category</strong>
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
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setReminderValues(e.target.innerText);
          }}>
          Coffee at 08:00 AM
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setReminderValues(e.target.innerText);
          }}>
          Breakfast at 10:00 AM
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setReminderValues(e.target.innerText);
          }}>
          Lunch at 01:00 PM
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setReminderValues(e.target.innerText);
          }}>
          Supper at 05:00 PM
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
          <input
            type="time"
            name="taskTime"
            id="taskTime"
            value={props.reminderValues}
            onChange={(e) => {
              props.setReminderValues(e.target.value);
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
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setDateValues(e.target.textContent);
          }}>
          Tomorrow: {newDate}
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
            Due date
          </strong>
          <strong className=" w-full text-right text-gray-500">
            Click to select or type to add
          </strong>
        </li>

        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setRepeatValues(e.target.innerText);
          }}>
          No repeat
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setRepeatValues(e.target.innerText);
          }}>
          Daily
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setRepeatValues(e.target.innerText);
          }}>
          Weekly
        </li>
        <li
          className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1"
          onClick={(e) => {
            props.setRepeatValues(e.target.innerText);
          }}>
          Monthly
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
            onClick={() => {
              setEditTask(!editTask);
            }}
          />
        </p>
        <div className=" flex items-center justify-start gap-2 w-full bg-gray-500 text-white rounded p-1">
          <div className=" flex-1 flex items-center justify-start gap-2">
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
              className=" text-sm"
              onClick={() => {
                setUrgentCheck(!urgentCheck);
                urgentTask();
              }}>
              {urgentCheck && <FaStar />}
              {!urgentCheck && <FaRegStar />}
            </span>
            {props.data.urgent ? "Urgent" : "Normal"}
          </div>
        </div>
      </div>
      <div className="sm:w-full md:w-full sm:flex-col flex-1 flex items-center justify-end gap-6 p-1 text-sm text-nowrap">
        <p className="sm:w-full md:w-full p-1 flex flex-col items-start">
          <span className="flex items-center justify-start gap-1 text-gray-600  font-semibold border-l-4 px-1 border-blue-400">
            <LuAlarmCheck />
            Due Time
          </span>
          <span className=" text-orange-800">{props.reminderValues}</span>
        </p>
        <p className="sm:w-full md:w-full p-1 flex flex-col items-start">
          <span className="flex items-center justify-start gap-1 text-gray-600 font-semibold border-l-4 px-1 border-blue-400">
            <BsCalendar2Date />
            Due date
          </span>
          <span className=" text-orange-800">{props.dateValues}</span>
        </p>
        <p className="sm:w-full md:w-full p-1 flex flex-col items-start">
          <span className="flex items-center justify-start gap-1 text-gray-600 font-semibold border-l-4 px-1 border-blue-400">
            <TbCalendarRepeat /> Repeat
          </span>
          <span className=" text-orange-800 flex items-center gap-2">
            {props.repeatValues}
          </span>
        </p>
      </div>

      <div className="flex-1 flex items-center justify-end p-0 gap-2">
        <span
          className="w-max px-2 flex items-center justify-end gap-2 text-orange-500 activeElement cursor-pointer"
          onClick={removeTask}>
          <FaTrash onClick={removeTask} />
          Remove
        </span>

        <span className="w-max px-2 flex items-center justify-end gap-2 activeElement cursor-pointer">
          <span
            className=" text-sm"
            onClick={() => {
              setCompleteCheck(!completeCheck);
              CompletedTask();
            }}>
            {completeCheck && <FaCheckSquare />}
            {!completeCheck && <FaRegSquare />}
          </span>

          {props.data.done ? "Done" : "Pending"}
        </span>

        <span className="w-max px-2 flex items-center justify-end gap-2 activeElement cursor-pointer">
          <BiSolidCustomize />
          Customize
        </span>
      </div>
    </>
  );
}

function SideBarEditMenu(props) {
  const [extendTitles, setExtendTitle] = useState(false);
  const [extendCats, setExtendCats] = useState(false);
  const [extendRemind, setExtendRemind] = useState(false);
  const [extendDate, setExtendDate] = useState(false);
  const [extendRepeat, setExtendRepeat] = useState(false);

  const submitEditedTask = () => {
    props.onEditSubmit(
      props.id,
      props.taskValue,
      props.titleValue,
      props.catValue,
      props.reminderValues,
      props.dateValues,
      props.repeatValues
    );
    props.setTaskValue("");
    props.setTitleValue("");
    props.setCatValue("");
    props.setReminderValues("");
    props.setDateValues("");
    props.setRepeatValues("");
  };

  return (
    <aside className="w-full flex-col p-2 rounded border shadow-lg">
      <div className="sm:w-full flex-1 p-1 flex items-center justify-center gap-2 my-2 border-b-2 border-orange-500 rounded">
        <strong className="w-max p-2 ">Edit all Task Field</strong>
      </div>
      <div className="sm:w-full flex-1 p-1 flex items-center justify-start gap-2 mt-3 mb-2 border-2 rounded">
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
          value={props.taskValue}
          onChange={(e) => {
            props.setTaskValue(e.target.value);
          }}
          placeholder=" Type activity here"
          className=" flex-1 p-2 bg-transparent rounded focus:outline-1 outline-orange-200"
        />
      </div>
      <div className=" my-2 shadow-lg">
        <span
          className=" flex w-full items-center justify-between p-2 border-b border-orange-400"
          onClick={() => {
            setExtendTitle(!extendTitles);
            setExtendCats(false);
            setExtendRemind(false);
            setExtendDate(false);
            setExtendRepeat(false);
          }}>
          Change Title <IoMdAdd />
        </span>
        {extendTitles && (
          <TitleFunction
            setShowTitle={props.setShowTitle}
            setTitleValue={props.setTitleValue}
          />
        )}
      </div>
      <div className=" my-2 shadow-lg">
        <span
          className=" flex w-full items-center justify-between p-2 border-b border-orange-400"
          onClick={() => {
            setExtendCats(!extendCats);
            setExtendTitle(false);
            setExtendRemind(false);
            setExtendDate(false);
            setExtendRepeat(false);
          }}>
          Change Category <IoMdAdd />
        </span>
        {extendCats && (
          <Category
            setShowCategory={props.setShowCategory}
            setCatValue={props.setCatValue}
          />
        )}
      </div>
      <div className=" my-2 shadow-lg">
        <span
          className=" flex w-full items-center justify-between p-2 border-b border-orange-400"
          onClick={() => {
            setExtendRemind(!extendRemind);
            setExtendTitle(false);
            setExtendCats(false);
            setExtendDate(false);
            setExtendRepeat(false);
          }}>
          Change Reminder <IoMdAdd />
        </span>
        {extendRemind && (
          <Reminders
            setShowReminder={props.setShowReminder}
            setReminderValues={props.setReminderValues}
          />
        )}
      </div>
      <div className=" my-2 shadow-lg">
        <span
          className=" flex w-full items-center justify-between p-2 border-b border-orange-400"
          onClick={() => {
            setExtendDate(!extendDate);
            setExtendTitle(false);
            setExtendCats(false);
            setExtendRemind(false);
            setExtendRepeat(false);
          }}>
          Edit Due date <IoMdAdd />
        </span>
        {extendDate && (
          <Duedate
            setDuedate={props.setDuedate}
            setDateValues={props.setDateValues}
          />
        )}
      </div>
      <div className=" my-2 shadow-lg">
        <span
          className=" flex w-full items-center justify-between p-2 border-b border-orange-400"
          onClick={() => {
            setExtendRepeat(!extendRepeat);
            setExtendTitle(false);
            setExtendCats(false);
            setExtendRemind(false);
            setExtendDate(false);
          }}>
          Change Task Repeat <IoMdAdd />
        </span>
        {extendRepeat && (
          <RepeatTask
            setRepeatTask={props.setRepeatTask}
            setRepeatValues={props.setRepeatValues}
          />
        )}
      </div>
      <div
        className={`activeElement w-full my-2 p-2 border rounded shadow-lg flex items-center justify-center gap-2 cursor-pointer`}>
        <button
          type="button"
          className=" w-1/2 flex items-center justify-center gap-2 p-2 bg-teal-950 text-white text-center rounded-lg"
          onClick={() => {
            props.setShowSideEditBar(false);
            submitEditedTask();
          }}>
          <IoSend />
          Submit
        </button>
      </div>
    </aside>
  );
}
