/* eslint-disable use-isnan */
import { v4 as uuidv4 } from "uuid";
import { Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import MyBudgets from "./MyBudgets";
import BudgetInput from "./BudgetInput";
import { MdLocalGroceryStore } from "react-icons/md";
import ShoppingList from "./ShoppingList";
import ShoppingInput from "./ShoppingInput";
import { BsDatabaseFillDash } from "react-icons/bs";
import { BsBank2 } from "react-icons/bs";

export default function Budgets() {
  const [fDvalues, setFdValues] = useState([]);
  const [fsvalues, setFsValues] = useState([]);

  const fullDispatch = (
    timeline,
    label,
    numberOfDays,
    budgetIncome,
    totalSpend,
    Balance,
    preparedDate,
    startDate,
    endDate,
    [...detailsList]
  ) => {
    const renderDispatch = {
      id: uuidv4(),
      timeline: timeline,
      label: label,
      numberOfDays: numberOfDays,
      budgetIncome: budgetIncome,
      totalSpend: totalSpend,
      Balance: Balance,
      preparedDate: preparedDate.toDateString(),
      startDate: startDate.toDateString(),
      endDate: endDate.toDateString(),
      detailsList: [...detailsList],
      Expired: false,
      Starred: false,
      Hide: false,
    };
    setFdValues([...fDvalues, renderDispatch]);
  };

  useEffect(() => {
    if (fDvalues.length === 0) return;
    localStorage.setItem("fDvalues", JSON.stringify(fDvalues));
  }, [fDvalues]);

  useEffect(() => {
    let fDvalues = JSON.parse(localStorage.getItem("fDvalues"));
    setFdValues(fDvalues);
  }, []);

  const fullShopDispatch = (
    timeline,
    label,
    startDate,
    shoppingAmount,
    totalSpend,
    Balance,
    detTotal,
    totalLeft,
    preparedDate,
    [...detailsList]
  ) => {
    const renderDispatch = {
      id: uuidv4(),
      timeline: timeline,
      label: label,
      shoppingAmount: shoppingAmount,
      totalSpend: totalSpend,
      Balance: Balance,
      startDate: startDate,
      detTotal: detTotal,
      totalLeft: totalLeft,
      preparedDate: preparedDate,
      detailsList: [...detailsList],
      Expired: false,
      Starred: false,
      Hide: false,
    };
    setFsValues([...fsvalues, renderDispatch]);
  };

  useEffect(() => {
    if (fsvalues.length === 0) return;
    localStorage.setItem("fsvalues", JSON.stringify(fsvalues));
  }, [fsvalues]);

  useEffect(() => {
    let fsvalues = JSON.parse(localStorage.getItem("fsvalues"));
    setFsValues(fsvalues);
  }, []);

  const totalfDvalues = fDvalues.length;
  const totalDone = fDvalues.filter((task) => task.Expired === true).length;

  const totalPending = fDvalues.filter((task) => task.Expired === false).length;
  const totalUrgent = fDvalues.filter((task) => task.Starred === true).length;

  const totalfsvalues = fsvalues.length;
  const totalpurchased = fsvalues.filter(
    (task) => task.Expired === true
  ).length;
  const totalunpurchased = fsvalues.filter(
    (task) => task.Expired === false
  ).length;
  const totalImportant = fsvalues.filter(
    (task) => task.Starred === true
  ).length;
  return (
    <BudgetNavigation>
      <Routes>
        <Route
          path="/*"
          element={
            <Dashboard
              totalfDvalues={totalfDvalues}
              totalDone={totalDone}
              totalPending={totalPending}
              totalUrgent={totalUrgent}
              totalfsvalues={totalfsvalues}
              totalpurchased={totalpurchased}
              totalunpurchased={totalunpurchased}
              totalImportant={totalImportant}
            />
          }
        />
        <Route
          path="/MyBudgets/*"
          element={
            <MyBudgets
              fDvalues={fDvalues}
              setFdValues={setFdValues}
              totalfDvalues={totalfDvalues}
              totalDone={totalDone}
              totalPending={totalPending}
              totalUrgent={totalUrgent}
            />
          }
        />
        <Route
          path="/BudgetInput/"
          element={<BudgetInput fullDispatch={fullDispatch} />}
        />
        <Route
          path="/ShoppingList/*"
          element={
            <ShoppingList
              fsvalues={fsvalues}
              setFsValues={setFsValues}
              fullShopDispatch={fullShopDispatch}
              totalfsvalues={totalfsvalues}
              totalpurchased={totalpurchased}
              totalunpurchased={totalunpurchased}
              totalImportant={totalImportant}
            />
          }
        />
        <Route
          path="/ShoppingInput/"
          element={<ShoppingInput fullShopDispatch={fullShopDispatch} />}
        />
      </Routes>
    </BudgetNavigation>
  );
}

function BudgetNavigation(props) {
  const navItems = [
    {
      id: uuidv4(),
      title: "Dashboard",
      icons: <BsDatabaseFillDash />,
      path: "./Dashboard",
    },
    {
      id: uuidv4(),
      title: "My Budgets",
      icons: <BsBank2 />,
      path: "./MyBudgets",
    },
    {
      id: uuidv4(),
      title: "Grocery List",
      icons: <MdLocalGroceryStore />,
      path: "./ShoppingList",
    },
  ];

  return (
    <section className=" w-full h-full flex flex-col p-1">
      <header className="header--shadow flex items-center justify-center gap-2 w-full h-14 rounded border bg-gray-50 p-1">
        {navItems.map((items) => {
          return (
            <NavLink
              to={items.path}
              key={items.id}
              className={({ isActive }) => {
                return (
                  "activeElement rounded-xl px-4 h-9 flex items-center justify-center gap-2 " +
                  (isActive
                    ? "bg-teal-950 text-white font-medium"
                    : " text-black")
                );
              }}>
              <span className=" sm:hidden">{items.icons}</span>
              <span className=" sm:hidden">{items.title}</span>
            </NavLink>
          );
        })}
      </header>
      <section className="w-full h-full">{props.children}</section>
    </section>
  );
}
