import { FaTasks } from "react-icons/fa";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { MdSubject } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { LuAlarmCheck } from "react-icons/lu";
import { BsCalendar2Date } from "react-icons/bs";
import { TbCalendarRepeat } from "react-icons/tb";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { MdDownloadDone } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbUrgent } from "react-icons/tb";
import Calendar from "react-calendar";

export default function Schedules() {
  const [showTitle, setShowTitle] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [dueDate, setDuedate] = useState(false);
  const [repeatTask, setRepeatTask] = useState(false);
  const [submitTask, setSubmitTask] = useState(false);
  const [taskValue, setTaskValue] = useState("");

  const showSubmitButton = () => {
    taskValue.length > 0 ? setSubmitTask(true) : setSubmitTask(false);
  };

  return (
    <section className="w-full h-full p-2 relative">
      <header className="h-auto w-full flex items-center justify-center sm:text-md">
        <ul className="w-full flex items-center justify-center gap-2 p-1 sm:flex-col">
          <li className="sm:w-full w-max flex items-center justify-center rounded-lg border p-1 shadow-2xl gap-4">
            <span data-count="0" className="notify-count relative p-1">
              <IoNotifications />
            </span>
            <span className=" flex p-1 items-center">
              <FaTasks />: 20
            </span>
            <span className=" flex p-1 items-center">
              <MdDownloadDone />: 5
            </span>
            <span className=" flex p-1 items-center">
              <MdOutlinePendingActions />: 15
            </span>
            <span className=" flex p-1 items-center">
              <TbUrgent />: 5
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
              className="w-max rounded border border-orange-200 p-1 bg-transparent focus:outline-none">
              <option defaultvalue="">Sort by</option>
              <option value="completed">completed</option>
              <option value="uncompleted">uncompleted</option>
              <option value="urgent">urgent</option>
              <option value="due date">due date</option>
              <option value="due time">due time</option>
            </select>
          </li>
        </ul>
      </header>

      <ul className=" sm:grid sm:grid-col sm:h-mhgt h-Ahgt border my-2 rounded-lg relative overflow-auto p-1">
        {showTitle && (
          <div
            className={`sm:w-full w-80 p-2 border rounded shadow-lg absolute right-0 bottom-0 ${
              showTitle ? "show--frame " : ""
            }`}>
            <TitleFunction setShowTitle={setShowTitle} />
          </div>
        )}
        {showCategory && (
          <div
            className={`sm:w-full w-80 p-2 border rounded shadow-lg absolute right-0 bottom-0 ${
              showCategory ? "show--frame " : ""
            }`}>
            <Category setShowCategory={setShowCategory} />
          </div>
        )}
        {showReminder && (
          <div
            className={`sm:w-full w-80 p-2 border rounded shadow-lg absolute right-0 bottom-0 ${
              showReminder ? "show--frame " : ""
            }`}>
            <Reminders setShowReminder={setShowReminder} />
          </div>
        )}

        {dueDate && (
          <div
            className={`sm:w-full w-80 p-2 border rounded shadow-lg absolute right-0 bottom-0 ${
              dueDate ? "show--frame " : ""
            }`}>
            <Duedate setDuedate={setDuedate} />
          </div>
        )}
        {repeatTask && (
          <div
            className={`sm:w-full w-80 p-2 border rounded shadow-lg absolute right-0 bottom-0 ${
              repeatTask ? "show--frame " : ""
            }`}>
            <RepeatTask setRepeatTask={setRepeatTask} />
          </div>
        )}
        {submitTask && (
          <div
            className={`activeElement w-40 p-2 border rounded shadow-lg absolute right-10 bottom-10 sm:bottom-10 sm:right-4 flex items-center justify-center gap-2 cursor-pointer ${
              submitTask ? "show--frame " : ""
            }`}>
            <IoSend />
            Submit
          </div>
        )}
      </ul>

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
        <div className="flex w-auto p-2 items-center justify-center gap-6 text-nowrap sm:bg-teal-950 sm:h-12 sm:rounded-2xl sm:text-white sm:w-full">
          <span className="activeElement flex flex-1 items-center justify-center gap-2 Tittle--menu more--option relative">
            <MdSubject
              onClick={() => {
                setShowTitle(!showTitle);
                setShowCategory(false);
                setShowReminder(false);
                setDuedate(false);
                setRepeatTask(false);
              }}
            />
          </span>
          <span className="activeElement flex flex-1 items-center justify-center gap-2 category--menu more--option relative">
            <BiCategory
              onClick={() => {
                setShowCategory(!showCategory);
                setShowTitle(false);
                setShowReminder(false);
                setDuedate(false);
                setRepeatTask(false);
              }}
            />
          </span>
          <span className="activeElement flex flex-1 items-center justify-center gap-2 alarm-menu more--option relative">
            <LuAlarmCheck
              onClick={() => {
                setShowReminder(!showReminder);
                setShowTitle(false);
                setShowCategory(false);
                setDuedate(false);
                setRepeatTask(false);
              }}
            />
          </span>
          <span className="activeElement flex flex-1 items-center justify-center gap-2 date--menu more--option relative">
            <BsCalendar2Date
              onClick={() => {
                setDuedate(!dueDate);
                setRepeatTask(false);
                setShowReminder(false);
                setShowTitle(false);
                setShowCategory(false);
              }}
            />
          </span>
          <span className="activeElement flex flex-1 items-center justify-center gap-2 repeat--menu more--option relative">
            <TbCalendarRepeat
              onClick={() => {
                setRepeatTask(!repeatTask);
                setDuedate(false);
                setShowReminder(false);
                setShowTitle(false);
                setShowCategory(false);
              }}
            />
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
          Examination
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          Slides
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          Tutorials
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          Practicals
        </li>
      </ul>
      <div className=" w-full flex flex-col items-start pb-1">
        <label htmlFor="taskTitle" className=" w-full text-gray-500">
          <strong>Add Title</strong>
        </label>
        <input
          type="text"
          name="taskTitle"
          id="taskTitle"
          placeholder="Type to add"
          className=" w-full border border-teal-400 rounded p-1 mt-1 bg-transparent focus:outline-none text-gray-500"
        />
      </div>
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
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          Academics
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          Work Schedule
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          Religious Activity
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          Personal Routines
        </li>
      </ul>
      <div className=" w-full flex flex-col items-start py-2">
        <label htmlFor="taskTitle" className=" w-full text-gray-500">
          <strong>Add Category</strong>
        </label>
        <input
          type="text"
          name="taskCategory"
          id="taskCategory"
          placeholder="Type to add"
          className=" w-full border border-teal-400 rounded p-1 mt-1 bg-transparent focus:outline-none text-gray-500"
        />
      </div>
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
          Coffee at 08:00 AM
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          Breakfast at 10:00 AM
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          Lunch at 01:00 PM
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          Supper at 05:00 PM
        </li>
      </ul>
      <div className=" w-full flex flex-col items-start py-2">
        <label htmlFor="taskTime" className=" w-full text-gray-500">
          <strong>Select Reminder</strong>
        </label>
        <input
          type="time"
          name="taskTime"
          id="taskTime"
          className=" w-full border border-teal-400 rounded p-1 mt-1 bg-transparent focus:outline-none text-gray-500"
        />
      </div>
    </div>
  );
}

function Duedate(props) {
  const newDate = new Date().toDateString();
  const [calenderDate, setCalenderDate] = useState(new Date());
  const [showCallender, setShowCallender] = useState(false);
  return (
    <div className="w-full flex flex-col">
      <ul
        className="w-full p-0 flex flex-col items-center gap-2 cursor-pointer overflow-auto"
        onClick={() => {
          props.setShowDuedate(false);
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
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <span className=" text-nowrap">Today: {newDate}, </span>
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <span className=" text-nowrap">Tomorrow: {newDate}, </span>
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
            onChange={setCalenderDate}
          />
        </span>
      </div>
    </div>
  );
}
function RepeatTask(props) {
  const [calenderDate, setCalenderDate] = useState(new Date());
  const [showCallender, setShowCallender] = useState(false);
  return (
    <div className="w-full flex flex-col">
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

        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <span className=" text-nowrap">Daily </span>
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <span className=" text-nowrap">Weekly </span>
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <span className=" text-nowrap">Monthly </span>
        </li>
        <li className="activeElement w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <span className=" text-nowrap">Select days to repeat </span>
        </li>
        <li className=" w-full border-b border-orange-300 flex items-center justify-between pb-1 hover:shadow-lg my-1">
          <ol className=" p-1 w-full flex items-center justify-center gap-2">
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
            onChange={setCalenderDate}
          />
        </span>
      </div>
    </div>
  );
}
