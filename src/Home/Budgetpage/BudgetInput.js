/* eslint-disable use-isnan */
import { NavLink } from "react-router-dom";
import Calendar from "react-calendar";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { AiOutlineEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

export default function BudgetInput(props) {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [excessError, setExcessError] = useState(false);
  const [incomeError, setIncomeError] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [budgetIncome, setBudgetIncome] = useState("");
  const [timeline, setTimeline] = useState("");
  const [label, setLabel] = useState("");
  const [savingValue, setSavingValue] = useState("");

  const onStart = (startDate) => {
    setStartDate(startDate);
    setShowStart(false);
  };
  const onEnd = (endDate) => {
    setEndDate(endDate);
    setShowEnd(false);
  };
  const ValidityPeriod = endDate.getTime() - startDate.getTime();
  const numberOfDays = Math.round(ValidityPeriod / (1000 * 60 * 60 * 24));

  const [detailsList, setDetailslist] = useState([]);
  const [item, setItem] = useState("");
  const [Allocated, setAllocated] = useState(0.0);
  const [count, setCount] = useState(0);

  const detailDispatch = (
    count,
    item,
    Allocated,
    amountToSpend,
    budgetIncome
  ) => {
    const renderDetails = {
      id: uuidv4(),
      count: count,
      item: item,
      Allocated: Allocated,
      budgetIncome: budgetIncome,
      amountToSpend: amountToSpend,
    };
    setDetailslist([...detailsList, renderDetails]);
  };

  const amountToSpend = budgetIncome - savingValue;
  const [totalSpend, setTotalSpend] = useState(0);
  const Balance = amountToSpend - totalSpend;

  const showAddButton = () => {
    Allocated.length > 0 ? setShowAdd(true) : setShowAdd(false);
  };
  const commenceRendering = () => {
    Balance > 0
      ? detailDispatch(count, item, Allocated, amountToSpend)
      : setExcessError(true);
  };
  const showExcessError = () => {
    budgetIncome !== "" && Allocated > Balance
      ? setExcessError(true)
      : setExcessError(false);
  };
  const showIncomeError = () => {
    budgetIncome === "" ? setIncomeError(true) : setIncomeError(false);
  };

  const balanceToSpend = parseFloat(budgetIncome) - parseFloat(savingValue);

  return (
    <section className=" w-full h-auto flex p-1">
      <div className="b--input flex flex-col items-start w-1/4 h-pHgt overflow-auto rounded p-2">
        <div className=" w-full border-b border-orange-500 py-2 flex justify-between items-center font-bold">
          <span className="text-xl">Budget description</span>
          <span className=" text-md">{new Date().toDateString()}</span>
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
              <span
                className=" h-9 hover:rounded-md hover:px-2 cursor-pointer text-sm flex items-center hover:shadow-xl hover:bg-green-200 activeElement"
                style={{ transition: "300ms ease-in-out" }}
                onClick={(e) => {
                  setLabel(e.target.textContent);
                }}>
                Project budget
              </span>
              <span
                className=" h-9 hover:rounded-md hover:px-2 cursor-pointer text-sm flex items-center hover:shadow-xl hover:bg-green-200 activeElement"
                style={{ transition: "300ms ease-in-out" }}
                onClick={(e) => {
                  setLabel(e.target.textContent);
                }}>
                Personal budget
              </span>
              <span
                className=" h-9 hover:rounded-md hover:px-2 cursor-pointer text-sm flex items-center hover:shadow-xl hover:bg-green-200 activeElement"
                style={{ transition: "300ms ease-in-out" }}
                onClick={(e) => {
                  setLabel(e.target.textContent);
                }}>
                Family budget
              </span>
              <span
                className=" h-9 hover:rounded-md hover:px-2 cursor-pointer text-sm flex items-center hover:shadow-xl hover:bg-green-200 activeElement"
                style={{ transition: "300ms ease-in-out" }}
                onClick={(e) => {
                  setLabel(e.target.textContent);
                }}>
                Academics budget
              </span>
              <span className=" h-auto text-md flex gap-2 items-center">
                <input
                  type="text"
                  name="customeLabel"
                  id="customeLabel"
                  placeholder="Enter Custom Label"
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
            <label
              htmlFor="Type"
              className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
              Select Budget TimeLine
            </label>
            <select
              name="Type"
              id="Type"
              className=" focus:outline-none w-full h-9 border
            rounded-lg p-2 text-gray-400 text-sm font-normal"
              onChange={(e) => {
                setTimeline(e.target.value);
              }}>
              <option value="Today">Today</option>
              <option value="One Week">One Week</option>
              <option value="Bi-Weekly">Bi-Weekly</option>
              <option value="One Month">One Month</option>
              <option value="Two Months">Two Months</option>
              <option value="Three Months">Three Months</option>
              <option value="Four Months">Four Months</option>
              <option value="Six Months">Six Months</option>
              <option value="A Year or More">A Year or More</option>
            </select>

            <form
              className=" w-full h-auto flex items-center justify-center gap-2 pr-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <input
                type="text"
                name="timeLabel"
                id="timeLabel"
                value={timeline}
                onChange={(e) => {
                  setTimeline(e.target.value);
                }}
                placeholder="Enter Custome TimeLine"
                className=" focus:outline-none flex-1 h-9 border rounded-lg p-2 text-gray-400 text-sm font-normal"
              />
              <button
                type="submit"
                className=" w-9 h-8 px-2 flex items-center justify-center rounded-lg bg-teal-950 text-white">
                <span>
                  <IoMdAdd />
                </span>
              </button>
            </form>
            <div className=" w-full flex flex-col p-1 h-auto items-start font-semibold">
              <div className=" w-full flex p-1 rounded h-10 item-center justify-between gap-2 relative">
                <span className=" w-max flex items-center justify-start">
                  Effective Date:
                </span>
                <p className=" flex-1 flex items-center justify-center font-semibold text-orange-900">
                  {startDate.toDateString()}
                </p>

                <button
                  type="button"
                  className=" w-9 h-8 px-2 flex items-center justify-center rounded-lg bg-gray-600 text-white"
                  onClick={() => {
                    setShowStart(!showStart);
                    setShowEnd(false);
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
              <div className=" w-full flex p-1 rounded h-10 item-center justify-between gap-2 relative">
                <span className=" w-max flex items-center justify-start">
                  Expiring Date:
                </span>
                <p className=" flex-1 flex items-center justify-center font-semibold text-orange-900">
                  {endDate.toDateString()}
                </p>
                <button
                  type="button"
                  className=" w-9 h-8 px-2 flex items-center justify-center rounded-lg bg-gray-600 text-white"
                  onClick={() => {
                    setShowEnd(!showEnd);
                    setShowStart(false);
                  }}>
                  <span>
                    <IoMdAdd />
                  </span>
                </button>
                {showEnd && (
                  <span className="z-10 w-full flex items-center justify-center absolute top-10 left-1 right-1">
                    <Calendar value={endDate} onChange={onEnd} />
                  </span>
                )}
              </div>
            </div>
          </li>

          <li className=" w-full flex flex-col items-start pb-2 my-2 border-b border-green-900">
            <label
              htmlFor="amount"
              className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
              {label === "Project budget"
                ? "Estimated Amount"
                : "Budget Amount"}
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={budgetIncome}
              onChange={(e) => {
                setBudgetIncome(e.target.value);
                setIncomeError(false);
              }}
              placeholder="Total Budget Amount"
              className=" focus:outline-none w-full h-9 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </li>
          <li className=" w-full flex flex-col items-start pb-2 my-2 border-b border-green-900">
            <label
              htmlFor="saving"
              className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
              {label === "Project budget"
                ? "Amount to Invest"
                : "Projected Amount to Save"}
            </label>
            <input
              type="number"
              name="saving"
              id="saving"
              placeholder="Enter Amount Intended to save"
              value={savingValue}
              onChange={(e) => {
                setSavingValue(e.target.value);
              }}
              className=" focus:outline-none  w-full h-9 border rounded-lg p-2 text-gray-400 text-sm font-normal"
            />
          </li>
          <li className=" w-full flex flex-col items-start pb-2 rounded my-2">
            <label
              htmlFor="expenses"
              className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
              Available Amount to Spend
            </label>
            <span className=" shadow-lg w-full h-9 border rounded-lg p-2 text-gray-400 text-sm font-normal">
              {savingValue === "" ? 0 : balanceToSpend}
            </span>
          </li>

          <li className=" w-full flex flex-col items-start p-1 rounded my-2">
            <label
              htmlFor="expenses"
              className="flex flex-row items-center gap-2 h-8 text-gray-500 font-bold">
              Effective Period
            </label>
            <span className=" shadow-lg w-full h-9 border rounded-lg p-2 text-gray-400 text-sm font-normal">
              {timeline === "Today" ? 1 : numberOfDays} day(s)
            </span>
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
                Label
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
                Amount
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
                placeholder="Allocated Amount"
                className=" focus:outline-none shadow-lg w-full h-12 border rounded-lg p-2 text-gray-400 text-sm font-normal"
              />
            </li>
          </ul>
          {showAdd && (
            <button
              type="submit"
              className="activeElement mt-8 w-12 h-11 px-2 flex items-center justify-center rounded-xl bg-teal-950 text-white"
              onClick={() => {
                commenceRendering();
                setIncomeError(false);
                setTotalSpend(() => {
                  return Math.round(
                    parseFloat(Number(totalSpend) + Number(Allocated))
                  );
                });
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
              Total Spent: {`${parseFloat(totalSpend)} out of ${amountToSpend}`}
            </span>
            <span className=" text-black">
              Amount Remaining: {parseFloat(Balance)}
            </span>
          </div>
        )}

        <div className=" w-full h-DtInpHgt bg-gray-600 overflow-auto text-white p-2">
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
              props.fullDispatch(
                timeline,
                label,
                numberOfDays,
                savingValue,
                budgetIncome,
                amountToSpend,
                startDate.toDateString(),
                endDate.toDateString(),
                [...detailsList]
              );
              setDetailslist([]);
            }}
            className="w-1/4 activeElement hover:bg-teal-950 hover:border-none hover:text-white border rounded-lg border-green-800 h-12 flex items-center justify-center p-2 font-bold text-gray-600">
            <NavLink to={"../MyBudgets"} className={"w-full h-full"}>
              Save
            </NavLink>
          </button>
          <button
            type="button"
            className="w-1/4 activeElement hover:bg-orange-500 hover:border-none hover:text-white border rounded-lg border-orange-500 h-12 flex items-center justify-center p-2 font-bold text-gray-600">
            <NavLink to={"../MyBudgets"} className={"w-full h-full"}>
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
    <div className="flex w-full h-14 border border-gray-500 items-center px-1 rounded gap-2 my-4">
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
          Allocated Amount:
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
        Percentage:
        <span>
          {`${((props.Allocated / props.amountToSpend) * 100).toPrecision(
            3
          )} %`}
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
