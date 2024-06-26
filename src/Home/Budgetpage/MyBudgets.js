/* eslint-disable use-isnan */
import { NavLink } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { useState, useEffect } from "react";
import { GiPayMoney } from "react-icons/gi";
import { FaCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { MdDownloadDone } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbUrgent } from "react-icons/tb";
import { PiShareNetworkDuotone } from "react-icons/pi";
import { GrPrint } from "react-icons/gr";
import { SlTrash } from "react-icons/sl";
import { FaTrash } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import { AiOutlineEdit } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";

export default function MyBudgets(props) {
  const [Starred, setStarred] = useState(false);
  const [Expire, setExpire] = useState(false);

  const removeItem = (value) => {
    props.setFdValues(
      props.fDvalues.filter((item) => {
        return item.id !== value.id;
      })
    );
  };
  function expiredCheck(value) {
    props.setFdValues(
      props.fDvalues.map((item) => {
        if (item.id === value.id) {
          return { ...item, Expired: !item.Expired };
        }
        return item;
      })
    );
  }

  const starredCheck = (value) => {
    props.setFdValues(
      props.fDvalues.map((item) => {
        if (item.id === value.id) {
          return { ...item, Starred: !item.Starred };
        }
        return item;
      })
    );
  };
  const hideCheck = (value) => {
    props.setFdValues(
      props.fDvalues.map((item) => {
        if (item.id === value.id) {
          return { ...item, Hide: !item.Hide };
        }
        return item;
      })
    );
  };

  const todayDate = new Date().toDateString();

  const [status, setStatus] = useState("All");
  const [sortedTasks, setSortedTasks] = useState([]);

  useEffect(() => {
    switch (status) {
      case "expired":
        setSortedTasks(props.fDvalues.filter((item) => item.Expired === true));
        break;
      case "active":
        setSortedTasks(props.fDvalues.filter((item) => item.Expired === false));
        break;
      case "starred":
        setSortedTasks(props.fDvalues.filter((item) => item.Starred === true));
        break;
      case "unstarred":
        setSortedTasks(props.fDvalues.filter((item) => item.Starred === false));
        break;
      default:
        setSortedTasks(props.fDvalues);
        break;
    }
  }, [props.fDvalues, status]);

  return (
    <section className="flex w-full h-full p-1">
      <div className=" w-80 h-full p-2 border rounded flex-col">
        <div className=" w-full h-2/5 border-b border-orange-500 flex justify-center items-center">
          page 1
        </div>
        <div className=" w-full h-3/5">
          <div className=" w-full h-full footer--shadow flex-col flex items-start py-6 justify-start border-b relative">
            <ul className="w-full flex items-center justify-center gap-1 p-1 flex-col">
              <li className=" w-full flex items-center justify-center rounded-lg border p-1 h-11 gap-4 mb-2">
                <span data-count="0" className="notify-count relative p-1">
                  <IoNotifications />
                </span>
                <span className=" flex p-1 items-center">
                  <FaTasks />: {props.totalfDvalues}
                </span>
                <span className=" flex p-1 items-center">
                  <MdDownloadDone />: {props.totalDone}
                </span>
                <span className=" flex p-1 items-center">
                  <MdOutlinePendingActions />: {props.totalPending}
                </span>
                <span className=" flex p-1 items-center">
                  <TbUrgent />: {props.totalUrgent}
                </span>
              </li>

              <li className=" w-full flex items-center justify-between rounded-lg border p-1 h-11 gap-2 text-gray-500">
                <span className="flex-1 flex items-center justify-start gap-4">
                  <MdOutlineLocalPrintshop className="activeElement text-lg" />
                  <IoShareSocialSharp className="activeElement text-lg" />
                  <TfiDownload className="activeElement text-lg" />
                </span>
                <select
                  name="sortBy"
                  id="sortBy"
                  className="flex-1 rounded border border-orange-200 p-1 bg-transparent focus:outline-none"
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}>
                  <option defaultValue="">Sort by</option>
                  <option value="All">All</option>
                  <option value="expired">Expired</option>
                  <option value="active">Active</option>
                  <option value="starred">Starred</option>
                  <option value="unstarred">Unstarred</option>
                </select>
              </li>
            </ul>
            <div className=" w-full flex items-center justify-center p-1 absolute bottom-1 left-1 right-1 ">
              <NavLink
                to={"../BudgetInput/"}
                className={
                  "activeElement hover:bg-teal-950 hover:border-none hover:text-white border rounded-full border-green-600 h-10  font-bold text-gray-600  w-3/4 flex items-center justify-center p-2"
                }>
                Prepare New Budget +
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex-1 p-1 flex-col h-auto">
        <ul className="w-full h-pHgt p-1 overflow-auto">
          {sortedTasks.map((value) => {
            return (
              <li
                key={value.id}
                className={`w-full h-auto my-4 border-b border-orange-500 cursor-default footer--shadow + ${
                  value.Expired ? " opacity-50" : " opacity-100"
                }`}>
                <header className="w-full flex flex-col items-start justify-center gap-3 p-2 bg-gray-50">
                  <div className=" w-full flex items-center justify-between p-2 h-11 relative ">
                    {value.Hide && (
                      <div className="header--shadow absolute right-0 top-12 w-max h-auto z-10 bg-gray-600 text-white rounded-2xl p-2 border font-semibold">
                        <span className=" flex h-8 px-2 item-center justify-between gap-2 text-sm">
                          <span>Date Prepared:</span>
                          <strong>{value.preparedDate}</strong>
                        </span>
                        <div className=" flex flex-col px-2 item-center justify-between text-sm gap-2">
                          <span className=" w-full border-b border-orange-500">
                            Percentage:
                          </span>
                          <div className=" w-full flex flex-col items-start gap-1">
                            <span className=" w-full flex item-center justify-between">
                              <span>Saved: </span>
                              <span>
                                {parseFloat(
                                  (value.Balance / value.budgetIncome) * 100
                                ).toPrecision(3)}
                                %
                              </span>
                            </span>
                            <span className=" w-full flex item-center justify-between">
                              <span>Spent:</span>
                              <span>
                                {parseFloat(
                                  (value.totalSpend / value.budgetIncome) * 100
                                ).toPrecision(3)}
                                %
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className=" flex h-8 px-2 item-center justify-between text-sm gap-2 border-t pt-1 border-orange-500">
                          <span>Remarks:</span>
                          <span>
                            {parseFloat(
                              (value.Balance / value.budgetIncome) * 100
                            ).toPrecision(3) < 10
                              ? "Saving too small"
                              : "Fair Amount Saved"}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className=" w-max flex justify-start gap-10 items-center">
                      <strong className="w-max flex items-center justify-start text-lg">
                        {`TimeLine: ${value.timeline}`}
                      </strong>
                      <strong className="w-max flex items-end justify-end text-md">
                        {`Label: ${value.label}`}
                      </strong>
                    </div>
                    <div className=" flex-1 flex items-center justify-center gap-2 h-14">
                      <span className="w-max px-2 flex items-center justify-end gap-2 activeElement cursor-pointer">
                        <span
                          className=" text-sm"
                          onClick={() => {
                            setExpire(!Expire);
                            expiredCheck(value);
                          }}>
                          {value.Expired ? <FaCheckSquare /> : <FaRegSquare />}
                        </span>

                        {value.Expired ? "Expired" : "Active"}
                      </span>
                    </div>
                    <div
                      className={`w-max border rounded-full shadow-xl mt-1 flex items-center justify-end p-2 gap-2 ${
                        value.Starred ? " " : ""
                      }`}>
                      <span
                        className={`${
                          value.Starred
                            ? "w-max px-2 bg-teal-950 text-white"
                            : "w-8 hover:bg-gray-300"
                        }  h-8 rounded-full flex items-center justify-center activeElement`}>
                        <span
                          onClick={() => {
                            setStarred(!Starred);
                            starredCheck(value);
                          }}>
                          {value.Starred ? (
                            <span className="flex items-center gap-2 ">
                              Important
                              {
                                <FaStar
                                  className={`flex items-center gap-2 ${
                                    value.Starred ? " text-orange-400" : ""
                                  }`}
                                />
                              }
                            </span>
                          ) : (
                            <FaRegStar />
                          )}
                        </span>
                      </span>
                      <span className=" w-8 h-8 rounded-full flex items-center justify-center activeElement hover:bg-gray-300">
                        <PiShareNetworkDuotone />
                      </span>
                      <span className=" w-8 h-8 rounded-full flex items-center justify-center activeElement hover:bg-gray-300">
                        <GrPrint />
                      </span>
                      <span
                        className=" w-8 h-8 rounded-full flex items-center justify-center activeElement hover:bg-red-400 hover:text-white text-red-500"
                        onClick={() => {
                          removeItem(value);
                        }}>
                        <SlTrash />
                      </span>
                      <span
                        className=" w-8 h-8 rounded-full flex items-center justify-center activeElement hover:bg-gray-300"
                        onClick={() => {
                          hideCheck(value);
                        }}>
                        <FiMoreVertical />
                      </span>
                    </div>
                  </div>
                  <div className=" w-full flex items-center justify-between p-2 h-auto border-b border-orange-300">
                    <div className="flex-1 flex items-center justify-start gap-4">
                      <span className=" flex items-center justify-start w-max gap-1 p-2 font-semibold">
                        <span>From: </span>
                        {`${
                          value.timeline === "Today"
                            ? todayDate
                            : value.startDate
                        }`}
                      </span>
                      <span className=" flex items-center justify-start gap-1 w-max p-2 rounded-lg font-semibold">
                        <span>To: </span>
                        {`${
                          value.timeline === "Today" ? todayDate : value.endDate
                        }`}
                      </span>
                      <span className=" flex items-center justify-start w-max gap-1 p-2 rounded-lg font-semibold">
                        <span>Valid for: </span>
                        {`${
                          value.timeline === "Today" ? 1 : value.numberOfDays
                        }`}
                        <span> day(s)</span>
                      </span>
                    </div>

                    <div className="flex-1 flex items-center justify-end gap-2">
                      <span className=" flex items-center justify-end w-max p-2 font-semibold">
                        Total Income: {`$${value.budgetIncome}`}
                      </span>
                      <span className=" flex items-center justify-end w-max p-2 font-semibold">
                        Amount Saved: {`$${value.Balance}`}
                      </span>
                      <span className=" flex items-center justify-end w-max p-2 font-semibold">
                        Amount Spent: {`$${value.totalSpend}`}
                      </span>
                    </div>
                  </div>
                </header>

                <div className=" w-full max-h-mpHgt bg-gray-50 overflow-auto text-black p-1">
                  {value.detailsList.map((Data) => {
                    return (
                      <ReturnComponent
                        key={Data.id}
                        {...Data}
                        Data={Data}
                        value={value}
                        setFdValues={props.setFdValues}
                        fDvalues={props.fDvalues}
                      />
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ReturnComponent(props) {
  const [editItem, setEditItem] = useState(false);
  const [editAmount, setEditAmount] = useState(false);

  const removeTask = () => {
    props.setFdValues(
      props.fDvalues.map((prev) => {
        if (prev.id === props.value.id) {
          return {
            ...prev,
            detailsList: prev.detailsList.filter((items) => {
              return items.id !== props.Data.id;
            }),
          };
        }
        return prev;
      })
    );
  };

  const onRenameItem = (newItem) => {
    props.setFdValues(
      props.fDvalues.map((prev) => {
        if (prev.id === props.value.id) {
          return {
            ...prev,
            detailsList: prev.detailsList.map((items) => {
              if (items.id === props.Data.id) {
                return {
                  ...items,
                  item: newItem,
                };
              }
              return items;
            }),
          };
        }
        return prev;
      })
    );
  };
  const newAllAmount = (newAmount) => {
    props.setFdValues(
      props.fDvalues.map((prev) => {
        if (prev.id === props.value.id) {
          return {
            ...prev,
            detailsList: prev.detailsList.map((items) => {
              if (items.id === props.Data.id) {
                return { ...items, Allocated: newAmount };
              }
              return items;
            }),
          };
        }
        return prev;
      })
    );
  };

  return (
    <div
      className="flex w-full border-b border-gray-200 items-center p-1 gap-2 my-2 hover:bg-gray-500 hover:text-white hover:rounded hover:p-2"
      key={props.id}
      style={{
        transition: "500ms ease-in-out",
      }}>
      <p className="flex-1 h-10 flex items-center justify-start gap-2 capitalize px-2 rounded">
        <span className=" flex items-center justify-start gap-2">
          {props.count}.
        </span>
        {!editItem && <strong className=" flex-1">{props.item}</strong>}
        {editItem && (
          <form
            action="post"
            className=" flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              setEditItem(!editItem);
            }}>
            <input
              type="text"
              name="edittask"
              id="edittask"
              value={props.item}
              onChange={(e) => {
                onRenameItem(e.target.value);
              }}
              className=" w-5/6 p-1 indent-2 rounded border focus:outline-dashed font-medium bg-transparent text-white"
            />
          </form>
        )}
        <AiOutlineEdit
          onClick={() => {
            setEditItem(!editItem);
          }}
        />
      </p>
      <p className="flex-1 h-10 flex items-center justify-center gap-2 capitalize rounded">
        <span>
          <GiPayMoney />
        </span>
        <span>Allocated Amount:</span>
        {!editAmount && <span>{`$${props.Allocated}`}</span>}
        {editAmount && (
          <form
            action="post"
            className=" flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              setEditAmount(!editAmount);
            }}>
            <input
              type="text"
              name="edittask"
              id="edittask"
              value={props.Allocated}
              onChange={(e) => {
                newAllAmount(e.target.value);
              }}
              className=" w-5/6 p-1 indent-2 rounded border focus:outline-dashed font-medium bg-transparent text-white"
            />
          </form>
        )}
        <AiOutlineEdit
          onClick={() => {
            setEditAmount(!editAmount);
          }}
        />
      </p>
      <span className="flex-1 flex items-center justify-start gap-2">
        <span>{`$${props.Allocated} out of $${props.budgetIncome}`}</span>
      </span>
      <span className="flex-1 flex items-center justify-end gap-2 capitalize">
        <strong
          className="bg-orange-500 text-white text-sm p-1 text-left text-nowrap truncate"
          style={{
            width: `${
              3 + ((props.Allocated / props.budgetIncome) * 100) / 10
            }rem`,
          }}>
          {`${((props.Allocated / props.budgetIncome) * 100).toPrecision(3)} %`}
        </strong>
      </span>
      <span className="w-max px-2 flex items-center justify-end gap-2 activeElement cursor-pointer">
        <span
          className="w-max p-2 rounded-lg hover:bg-gray-200 hover:text-black flex items-center justify-end gap-2 text-orange-400 activeElement cursor-pointer border"
          onClick={removeTask}>
          <FaTrash />
        </span>
      </span>
    </div>
  );
}
