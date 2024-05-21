/* eslint-disable use-isnan */
import { NavLink } from "react-router-dom";
import Calendar from "react-calendar";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

// import { FaRegCircle } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

export default function ShoppingInput(props) {
  const [showStart, setShowStart] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [excessError, setExcessError] = useState(false);
  const [incomeError, setIncomeError] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [shoppingAmount, setShoppingAmount] = useState("");
  const [timeline, setTimeline] = useState("");
  const [label, setLabel] = useState("");

  const onStart = (startDate) => {
    setStartDate(startDate);
    setShowStart(false);
  };

  const [detailsList, setDetailslist] = useState([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Allocated, setAllocated] = useState(0.0);
  const [count, setCount] = useState(0);

  const detailDispatch = (count, item, Allocated, quantity, shoppingAmount) => {
    const renderDetails = {
      id: uuidv4(),
      count: count,
      item: item,
      Allocated: Allocated,
      quantity: quantity,
      shoppingAmount: shoppingAmount,
      purchasedItems: false,
      expand: false,
    };
    setDetailslist([...detailsList, renderDetails]);
  };
  const detTotal = detailsList.length;

  const totalLeft = detailsList.filter(
    (item) => item.purchasedItems === false
  ).length;

  // const amountSpent = ;
  const [totalSpend, setTotalSpend] = useState(0);
  const Balance = shoppingAmount - totalSpend;

  const showAddButton = () => {
    Allocated.length > 0 ? setShowAdd(true) : setShowAdd(false);
  };
  const commenceRendering = () => {
    !excessError &&
      !incomeError &&
      detailDispatch(count, item, Allocated, quantity, shoppingAmount);
  };
  const showExcessError = () => {
    shoppingAmount !== "" && Allocated > Balance
      ? setExcessError(true)
      : setExcessError(false);
  };
  const showIncomeError = () => {
    shoppingAmount === "" ? setIncomeError(true) : setIncomeError(false);
  };

  const [preparedDate, setPreparedDate] = useState(new Date());
  const [pDate, setPdate] = useState(false);
  const onPrepare = (preparedDate) => {
    setPreparedDate(preparedDate);
    setPdate(false);
  };

  return (
    <section className=" w-full h-auto flex p-1">
      <div className="b--input flex flex-col items-start w-1/4 h-pHgt overflow-auto rounded p-2 border-r">
        <div className=" w-full border-b border-orange-500 py-2 flex flex-col justify-between items-start gap-1">
          <span className="text-xl font-bold">List description</span>
          <span className=" text-sm">
            Date Prepared: {new Date().toDateString()}
          </span>
        </div>
        <ul className=" w-full mt-2 h-auto">
          <li className=" w-full flex items-center p-1 my-2 border-b border-green-900">
            <strong className=" w-full  text-gray-500 flex items-center justify-between">
              Select Label
            </strong>
          </li>
          <li
            className=" w-full flex flex-col items-start pb-1 my-2 overflow-hidden border-b border-green-900"
            style={{ height: "auto", transition: "300ms ease-in-out" }}>
            <div className="w-full h-auto flex flex-col font-semibold">
              <label
                htmlFor="personal"
                className=" h-9 hover:rounded-md hover:px-2 cursor-pointer text-sm flex items-center justify-between hover:shadow-xl hover:bg-green-200 activeElement"
                style={{ transition: "300ms ease-in-out" }}>
                <span> Personal </span>
                <input
                  type="radio"
                  id="personal"
                  name="labels"
                  value={"Personal Grocery List"}
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                />
              </label>
              <label
                htmlFor="Family"
                className=" h-9 hover:rounded-md hover:px-2 cursor-pointer text-sm flex items-center justify-between hover:shadow-xl hover:bg-green-200 activeElement"
                style={{ transition: "300ms ease-in-out" }}>
                <span> Family </span>
                <input
                  type="radio"
                  id="Family"
                  name="labels"
                  value={"Family Grocery List"}
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                />
              </label>
              <label
                htmlFor="Wedding"
                className=" h-9 hover:rounded-md hover:px-2 cursor-pointer text-sm flex items-center justify-between hover:shadow-xl hover:bg-green-200 activeElement"
                style={{ transition: "300ms ease-in-out" }}>
                <span> Wedding </span>
                <input
                  type="radio"
                  id="Wedding"
                  name="labels"
                  value={"Wedding Grocery List"}
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                />
              </label>
              <label
                htmlFor="Funeral"
                className=" h-9 hover:rounded-md hover:px-2 cursor-pointer text-sm flex items-center justify-between hover:shadow-xl hover:bg-green-200 activeElement"
                style={{ transition: "300ms ease-in-out" }}>
                <span> Funeral </span>
                <input
                  type="radio"
                  id="Funeral"
                  name="labels"
                  value={"Funeral Grocery List"}
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                />
              </label>
              <label
                htmlFor="Party"
                className=" h-9 hover:rounded-md hover:px-2 cursor-pointer text-sm flex items-center justify-between hover:shadow-xl hover:bg-green-200 activeElement"
                style={{ transition: "300ms ease-in-out" }}>
                <span> Special Ocassion </span>
                <input
                  type="radio"
                  id="Party"
                  name="labels"
                  value={"Party Grocery List"}
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                />
              </label>
              <span className=" h-auto text-md flex gap-2 items-center">
                <input
                  type="text"
                  name="customeLabel"
                  id="customeLabel"
                  placeholder="Type Custom Label"
                  value={label}
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                  className=" focus:outline-none flex-1 h-9 border rounded-lg p-2 text-gray-400 text-sm font-normal"
                />
                <button
                  type="button"
                  className=" w-9 h-8 px-2 flex items-center justify-center rounded-lg bg-teal-950 text-white">
                  <span>
                    <IoMdAdd />
                  </span>
                </button>
              </span>
            </div>
          </li>

          <li className=" w-full flex flex-col gap-1 items-start pb-1 my-2 border-b border-green-900">
            <div className=" w-full flex flex-col h-auto items-start font-semibold ">
              <div className=" w-full flex flex-col gap-1 items-start pb-1 my-2 border-b border-green-900">
                <div className=" w-full flex rounded h-10 item-center justify-between gap-2 relative">
                  <span className=" w-max flex items-center justify-start">
                    Date Prepared:
                  </span>
                  <p className=" flex-1 flex items-center justify-center font-semibold text-orange-900">
                    {preparedDate.toDateString()}
                  </p>

                  <button
                    type="button"
                    className=" w-9 h-8 px-2 flex items-center justify-center rounded-lg bg-gray-600 text-white"
                    onClick={() => {
                      setPdate(!pDate);
                    }}>
                    <span>
                      <IoMdAdd />
                    </span>
                  </button>
                  {pDate && (
                    <span className="z-10 w-full flex items-center justify-center absolute top-10 left-1 right-1">
                      <Calendar value={preparedDate} onChange={onPrepare} />
                    </span>
                  )}
                </div>
              </div>
              <div className=" w-full flex rounded h-10 item-center justify-between gap-2 relative">
                <span className=" w-max flex items-center justify-start">
                  Add Due Date:
                </span>
                <p className=" flex-1 flex items-center justify-center font-semibold text-orange-900">
                  {startDate.toDateString()}
                </p>
                <button
                  type="button"
                  className=" w-9 h-8 p-1 flex items-center justify-center rounded-lg bg-gray-600 text-white"
                  onClick={() => {
                    setShowStart(!showStart);
                  }}>
                  <span>
                    <IoMdAdd />
                  </span>
                </button>
                {showStart && (
                  <span className="z-10 w-full flex items-center justify-center absolute top-10 left-1 right-1">
                    <Calendar value={startDate} onChange={onStart} />
                  </span>
                )}
              </div>
              <div className=" w-full flex rounded h-10 item-center justify-between gap-2 relative">
                <span className=" w-max flex items-center justify-start">
                  Reminder:
                </span>
                <div className=" flex-1 flex items-center justify-center font-semibold text-orange-900">
                  <input
                    type="time"
                    name="remindTime"
                    id="remindTime"
                    value={timeline}
                    onChange={(e) => {
                      setTimeline(
                        moment(e.target.value, "HH:mm:ss").format("HH:mm:ss A")
                      );
                    }}
                    placeholder="Enter Custome TimeLine"
                    className=" focus:outline-none flex-1 h-9 border rounded-lg p-2 text-gray-400 text-sm font-normal"
                  />
                </div>
                <button
                  type="button"
                  className=" w-9 h-8 px-2 flex items-center justify-center rounded-lg bg-gray-600 text-white">
                  <span>
                    <IoMdAdd />
                  </span>
                </button>
              </div>
            </div>
          </li>

          <li className=" w-full flex flex-col items-start pb-2 my-2 border-b border-green-900">
            <label
              htmlFor="amount"
              className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
              Amount for Shopping
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={shoppingAmount}
              onChange={(e) => {
                setShoppingAmount(e.target.value);
                setIncomeError(false);
              }}
              placeholder="Total Amount for Shopping"
              className=" focus:outline-none w-full h-9 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </li>
        </ul>
      </div>
      <div className=" flex-1 flex flex-col items-center h-full p-1">
        <div className=" w-full flex items-center justify-center">
          <ul className=" w-3/4 flex items-center p-0">
            <li className=" flex-1 flex flex-col items-start p-1 rounded my-2">
              <label
                htmlFor="Label"
                className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
                Item
              </label>
              <input
                type="text"
                name="Label"
                id="Label"
                value={item}
                onChange={(e) => {
                  setItem(e.target.value);
                }}
                placeholder="budget Item"
                className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
              />
            </li>
            <li className=" flex-1 flex flex-col items-start p-1 rounded my-2">
              <label
                htmlFor="saving"
                className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
                Quantity
              </label>
              <input
                type="Number"
                name="saving"
                id="saving"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                onKeyUp={() => {
                  showAddButton();
                }}
                placeholder="Quantity to buy"
                className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
              />
            </li>
            <li className=" flex-1 flex flex-col items-start p-1 rounded my-2">
              <label
                htmlFor="saving"
                className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
                Price per Item ($)
              </label>
              <input
                type="Number"
                name="saving"
                id="saving"
                value={Allocated}
                onChange={(e) => {
                  setAllocated(e.target.value);
                  showIncomeError();
                  showExcessError();
                }}
                onKeyUp={() => {
                  showAddButton();
                }}
                className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
              />
            </li>
          </ul>
          {showAdd && (
            <button
              type="button"
              className="activeElement mt-8 w-12 h-11 px-2 flex items-center justify-center rounded-xl bg-teal-950 text-white"
              onClick={() => {
                commenceRendering();
                setTotalSpend(
                  Number(totalSpend) + Number(Allocated * quantity)
                );
                setCount((prev) => prev + 1);
                setItem("");
                setAllocated(0);
                setShowAdd(false);
              }}>
              <span>
                <IoMdAdd />
              </span>
            </button>
          )}
        </div>
        {excessError && (
          <div className="w-3/4 flex items-center justify-center">
            <span className=" text-red-600">Not enough Balance!</span>
          </div>
        )}
        {incomeError && (
          <div className="w-3/4 flex items-center justify-center">
            <span className=" text-red-600">
              Please Enter Total Budget Amount
            </span>
          </div>
        )}
        {!excessError && !incomeError && (
          <div className="w-3/4 flex items-center justify-center gap-10 ">
            <span className=" text-green-600">
              Total Spent:
              {`${parseFloat(totalSpend)} out of ${shoppingAmount}`}
            </span>
            <span className=" text-black">
              Amount Remaining: {parseFloat(Balance)}
            </span>
          </div>
        )}

        <div className=" w-full h-auto max-h-DtInpHgt bg-gray-600 overflow-auto text-white p-2">
          {detailsList.map((Data) => {
            return (
              <DetailRender
                key={Data.id}
                {...Data}
                setDetailslist={setDetailslist}
                detailsList={detailsList}
                Data={Data}
              />
            );
          })}
        </div>
        <div className=" w-3/4 flex items-center justify-center gap-2 p-1 rounded my-2">
          <button
            type="button"
            onClick={() => {
              props.fullShopDispatch(
                timeline,
                label,
                startDate.toDateString(),
                shoppingAmount,
                totalSpend,
                Balance,
                detTotal,
                totalLeft,
                preparedDate.toDateString(),
                [...detailsList]
              );
              setDetailslist([]);
            }}
            className="w-1/4 activeElement hover:bg-teal-950 hover:border-none hover:text-white border rounded-lg border-green-800 h-12 flex items-center justify-center p-2 font-bold text-gray-600">
            <NavLink to={"../ShoppingList"} className={"w-full h-full"}>
              Save
            </NavLink>
          </button>
          <button
            type="reset"
            className="w-1/4 activeElement hover:bg-orange-500 hover:border-none hover:text-white border rounded-lg border-orange-500 h-12 flex items-center justify-center p-2 font-bold text-gray-600">
            <NavLink to={"../ShoppingList"} className={"w-full h-full"}>
              Cancel
            </NavLink>
          </button>
        </div>
      </div>
    </section>
  );
}

function DetailRender(props) {
  const [editItem, setEditItem] = useState(false);
  const [editAmount, setEditAmount] = useState(false);
  const removeTask = () => {
    props.setDetailslist(
      props.detailsList.filter((item) => {
        return item.id !== props.Data.id;
      })
    );
  };
  const renameBudgetItem = (newValue) => {
    props.setDetailslist(
      props.detailsList.map((item) => {
        if (item.id === props.Data.id) {
          return { ...item, item: newValue };
        }
        return item;
      })
    );
  };
  const newAllAmount = (newAmount) => {
    props.setDetailslist(
      props.detailsList.map((item) => {
        if (item.id === props.Data.id) {
          return { ...item, Allocated: newAmount };
        }
        return item;
      })
    );
  };

  return (
    <div className="flex w-full h-14 border border-gray-500 items-center px-1 rounded gap-2 my-4 capitalize">
      <p className="flex-1 h-10 flex items-center justify-start gap-2 capitalize mr-2 border border-gray-500 px-2 rounded">
        <span className=" flex items-center justify-start gap-2">
          <FaTasks />
          Items:
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
                renameBudgetItem(e.target.value);
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
      <p className="flex-1 h-10 flex items-center justify-start gap-2 capitalize mr-2 border border-gray-500 px-2 rounded">
        <span className=" flex items-center justify-start gap-2">
          <FaTasks />
          Price per Item:
        </span>
        {!editAmount && <strong className=" flex-1">{props.Allocated}</strong>}
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
      <span className="flex-1 flex items-center justify-center gap-2 capitalize">
        Quantity: {props.quantity}
      </span>
      <span className="flex-1 flex items-center justify-center gap-2 capitalize">
        Total Cost: {props.Allocated * props.quantity}
      </span>
      <span className="flex-1 flex items-center justify-center gap-2 capitalize">
        Percentage Cost:
        <span>
          {`${(
            ((props.Allocated * props.quantity) / props.shoppingAmount) *
            100
          ).toPrecision(3)} %`}
        </span>
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
