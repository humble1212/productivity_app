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
import { TfiDownload } from "react-icons/tfi";
import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FiMoreVertical } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

export default function ShoppingList(props) {
  const [Starred, setStarred] = useState(false);
  const [Expire, setExpire] = useState(false);

  const removeItem = (value) => {
    props.setFsValues(
      props.fsvalues.filter((item) => {
        return item.id !== value.id;
      })
    );
  };
  function expiredCheck(value) {
    props.setFsValues(
      props.fsvalues.map((item) => {
        if (item.id === value.id) {
          return { ...item, Expired: !item.Expired };
        }
        return item;
      })
    );
  }

  const starredCheck = (value) => {
    props.setFsValues(
      props.fsvalues.map((item) => {
        if (item.id === value.id) {
          return { ...item, Starred: !item.Starred };
        }
        return item;
      })
    );
  };

  const hideCheck = (value) => {
    props.setFsValues(
      props.fsvalues.map((item) => {
        if (item.id === value.id) {
          return { ...item, Hide: !item.Hide };
        }
        return item;
      })
    );
  };

  const [status, setStatus] = useState("All");
  const [sortedTasks, setSortedTasks] = useState([]);

  useEffect(() => {
    switch (status) {
      case "expired":
        setSortedTasks(props.fsvalues.filter((item) => item.Expired === true));
        break;
      case "active":
        setSortedTasks(props.fsvalues.filter((item) => item.Expired === false));
        break;
      case "starred":
        setSortedTasks(props.fsvalues.filter((item) => item.Starred === true));
        break;
      case "unstarred":
        setSortedTasks(props.fsvalues.filter((item) => item.Starred === false));
        break;
      default:
        setSortedTasks(props.fsvalues);
        break;
    }
  }, [props.fsvalues, status]);

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
                  <FaTasks />: {props.totalfsvalues}
                </span>
                <span className=" flex p-1 items-center">
                  <MdDownloadDone />: {props.totalpurchased}
                </span>
                <span className=" flex p-1 items-center">
                  <MdOutlinePendingActions />: {props.totalunpurchased}
                </span>
                <span className=" flex p-1 items-center">
                  <TbUrgent />: {props.totalImportant}
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
                to={"../ShoppingInput/"}
                className={
                  "activeElement hover:bg-teal-950 hover:border-none hover:text-white border rounded-full border-green-600 h-10  font-bold text-gray-600  w-3/5 flex items-center justify-center p-2"
                }>
                Prepare New List +
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
                  <div className=" w-full flex items-center justify-between p-2 h-11 relative">
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
                                  (value.Balance / value.shoppingAmount) * 100
                                ).toPrecision(3)}
                                %
                              </span>
                            </span>
                            <span className=" w-full flex item-center justify-between">
                              <span>Spent:</span>
                              <span>
                                {parseFloat(
                                  (value.totalSpend / value.shoppingAmount) *
                                    100
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
                              (value.Balance / value.shoppingAmount) * 100
                            ).toPrecision(3) < 10
                              ? "Saving too small"
                              : "Fair Amount Saved"}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className=" w-max flex justify-start gap-10 items-center ">
                      <strong className="w-max flex items-center justify-start gap-2">
                        <span>{`Reminder Date: ${value.startDate},`}</span>
                        <span>{`Time: ${value.timeline}`}</span>
                      </strong>
                      <span className="w-max flex items-end justify-end text-md">
                        {`Label: ${value.label}`}
                      </span>
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
                        }  h-8 rounded-full flex items-center justify-center activeElement `}>
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
                        className=" w-8 h-8 rounded-full flex items-center justify-center activeElement hover:bg-red-400 hover:text-white"
                        onClick={() => {
                          removeItem(value);
                        }}>
                        <SlTrash />
                      </span>
                      <span
                        className=" w-8 h-8 rounded-full flex items-center justify-center activeElement text-gray-700 text-lg hover:bg-gray-300"
                        onClick={() => {
                          hideCheck(value);
                        }}>
                        <FiMoreVertical />
                      </span>
                    </div>
                  </div>
                  <div className=" w-full flex items-center justify-center gap-2 p-2 h-auto border-b border-orange-300">
                    <span className="w-max flex items-center justify-start p-2 font-semibold">
                      Allocated Amount: {`$${value.shoppingAmount}`}
                    </span>
                    <span className="w-max flex items-center justify-start p-2 font-semibold">
                      Total Spent: {`$${value.totalSpend}`}
                    </span>
                    <span className="w-max flex items-center justify-start p-2 font-semibold">
                      Balance: {`$${value.Balance}`}
                    </span>
                    <div className="flex-1 flex items-center justify-end gap-2">
                      <span>List: {value.detTotal}</span>
                      <p className="flex gap-1 items-center justify-start">
                        Purchased:
                        <span>
                          {
                            value.detailsList.filter(
                              (item) => item.purchasedItems === true
                            ).length
                          }
                        </span>
                      </p>
                      <p className="flex gap-1 items-center justify-start">
                        Left:
                        <span>
                          {value.detTotal -
                            value.detailsList.filter(
                              (item) => item.purchasedItems === true
                            ).length}
                        </span>
                      </p>
                    </div>
                  </div>
                </header>

                <div className=" w-full flex flex-col gap-2 max-h-mpHgt bg-gray-50 overflow-auto text-black px-1 py-4 relative">
                  {value.detailsList.map((Data) => {
                    return (
                      <RenderFinal
                        key={Data.id}
                        {...Data}
                        Data={Data}
                        value={value}
                        setFsValues={props.setFsValues}
                        fsvalues={props.fsvalues}
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

function RenderFinal(props) {
  const completeFunction = () => {
    props.setFsValues(
      props.fsvalues.map((prev) => {
        if (prev.id === props.value.id) {
          return {
            ...prev,
            detailsList: prev.detailsList.map((items) => {
              if (items.id === props.Data.id) {
                return {
                  ...items,
                  purchasedItems: !items.purchasedItems,
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
  const expandFunction = () => {
    props.setFsValues(
      props.fsvalues.map((prev) => {
        if (prev.id === props.value.id) {
          return {
            ...prev,
            detailsList: prev.detailsList.map((items) => {
              if (items.id === props.Data.id) {
                return {
                  ...items,
                  expand: !items.expand,
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

  const [showExpandButton, setShowExpandButton] = useState(false);

  return (
    <div
      className={`flex footer--shadow w-full border border-gray-200 items-center px-1 py-2 gap-2 mt-3 relative hover:shadow-lg + ${
        props.purchasedItems ? " opacity-50 line-through line-" : "opacity-100"
      }`}
      key={props.id}
      style={{
        transition: "500ms ease-in-out",
      }}
      onMouseEnter={() => {
        setShowExpandButton(true);
      }}
      onMouseLeave={() => {
        setShowExpandButton(false);
      }}>
      {showExpandButton && (
        <button
          className="z-20 cursor-pointer activeElement absolute left-1/2 bottom-full bg-orange-500 text-white hover:bg-slate-800 shadow-2xl rounded-md h-1 hover:h-6 hover:px-3 overflow-hidden w-max"
          onClick={() => {
            expandFunction();
          }}
          style={{
            transition: "400ms ease-in-out",
          }}>
          Expand
        </button>
      )}
      <div className=" flex-1 flex items-center justify-start gap-1">
        <span
          className="w-max h-10 flex items-center justify-start gap-2 capitalize px-2 rounded"
          onClick={() => {
            completeFunction();
          }}>
          {!props.purchasedItems && <FaRegCircle />}
          {props.purchasedItems && <FaCircleCheck />}
        </span>
        <p className="flex-1 h-10 flex items-center justify-start gap-2 capitalize px-2 rounded">
          <span className=" flex items-center justify-start gap-2">
            {props.count}.
          </span>
          <strong>{props.item}</strong>
        </p>
      </div>
      <p className="flex-1 h-10 flex items-center justify-center gap-2 capitalize rounded">
        <span>
          <GiPayMoney />
        </span>
        <span>Price per item:</span>
        <span>{`$${props.Allocated}`}</span>
      </p>
      <span className="flex-1 flex items-center justify-center gap-2 capitalize">
        Quantity: {props.quantity}
      </span>

      <span className="flex-1 flex items-center justify-start gap-2">
        Total Cost:
        <span>
          {`$${props.Allocated * props.quantity} out of $${
            props.shoppingAmount
          }`}
        </span>
      </span>
      <span className="flex-1 flex items-center justify-end gap-2 capitalize">
        <strong
          className="bg-orange-500 text-white text-sm p-1 text-left text-nowrap truncate"
          style={{
            width: ` ${
              3 +
              (((props.Allocated * props.quantity) / props.shoppingAmount) *
                100) /
                10
            }rem`,
          }}>
          {`${(
            ((props.Allocated * props.quantity) / props.shoppingAmount) *
            100
          ).toPrecision(3)} %`}
        </strong>
      </span>
      <div className="expand--css bg-gray-700 rounded-lg">
        {props.expand && (
          <ExtentList
            item={props.item}
            Data={props.Data}
            value={props.value}
            setFsValues={props.setFsValues}
            fsvalues={props.fsvalues}
            expand={props.expand}
          />
        )}
      </div>
    </div>
  );
}

function ExtentList({ item, Data }) {
  const [height, setHeight] = useState(0);
  const [addItem, setAddItem] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [appendValues, setAppendValues] = useState([]);

  const addMoreList = (addItem, itemAmount) => {
    const addList = {
      id: Data.id,
      addItem: addItem,
      itemAmount: itemAmount,
      purchasedSub: false,
    };
    setAppendValues([...appendValues, addList]);
    setAddItem("");
    setItemAmount("");
  };

  return (
    <div className="flex flex-col gap-1  w-auto h-auto p-2 text-white rounded-lg">
      <header className="w-full h-auto flex items-center justify-between border-b border-orange-300">
        <p>
          Lists under <strong>{item}</strong>
        </p>
        <span
          className=" w-6 h-6 rounded-full flex items-center justify-center activeElement text-lg hover:bg-gray-300 hover:text-black m-1 "
          onClick={() => {
            setHeight(height === 0 ? "auto" : 0);
          }}>
          <FiMoreVertical />
        </span>
      </header>
      <div
        className=" overflow-hidden flex flex-col gap-2 "
        style={{
          height: `${height}`,
          transition: "400ms ease-in-out",
        }}>
        <div className="flex w-full items-center justify-between h-11 gap-1 p-1">
          <input
            type="text"
            placeholder="Item"
            value={addItem}
            onChange={(e) => {
              setAddItem(e.target.value);
            }}
            className=" focus:outline-none flex-1 h-8 border rounded-md p-2 text-gray-400 text-sm font-normal"
          />
          <input
            type="number"
            placeholder="Amount"
            value={itemAmount}
            onChange={(e) => {
              setItemAmount(e.target.value);
            }}
            className=" focus:outline-none flex-1 h-8 border rounded-md p-2 text-gray-400 text-sm font-normal"
          />
          <button
            type="button"
            className=" w-9 h-8 px-2 flex items-center justify-center rounded-lg bg-teal-50 text-black"
            onClick={() => {
              addMoreList(addItem, itemAmount);
            }}>
            <span>
              <IoMdAdd />
            </span>
          </button>
        </div>
        <ul className=" w-full h-auto max-h-96 overflow-auto">
          {[...appendValues].map((value) => {
            if (value.id === Data.id) {
              return (
                <li className="flex w-full items-center justify-between h-11 gap-1">
                  <p>{value.addItem}</p>
                  <p>{value.itemAmount}</p>
                </li>
              );
            }
            return value;
          })}
        </ul>
      </div>
    </div>
  );
}
