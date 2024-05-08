/* eslint-disable use-isnan */
import { v4 as uuidv4 } from "uuid";
import { Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "../Dashboardpage/Dashboard";
import MyBudgets from "../Budgetpage/MyBudgets";
import BudgetInput from "../Budgetpage/BudgetInput";

import ShoppingList from "../ShoppingPage/ShoppingList";
import ShoppingInput from "../ShoppingPage/ShoppingList";

export default function Budgets() {
  const [fDvalues, setFdValues] = useState([]);

  const fullDispatch = (
    timeline,
    label,
    numberOfDays,
    savingValue,
    budgetIncome,
    amountToSpend,
    startDate,
    endDate,
    [...detailsList]
  ) => {
    const renderDispatch = {
      id: uuidv4(),
      timeline: timeline,
      label: label,
      numberOfDays: numberOfDays,
      savingValue: savingValue,
      budgetIncome: budgetIncome,
      amountToSpend: amountToSpend,
      startDate: startDate,
      endDate: endDate,
      detailsList: [...detailsList],
      Expired: false,
      Starred: false,
    };
    setFdValues([...fDvalues, renderDispatch]);
  };

  useEffect(() => {
    if (fDvalues.length === 1) return;
    localStorage.setItem("fDvalues", JSON.stringify(fDvalues));
  }, [fDvalues]);

  useEffect(() => {
    let fDvalues = JSON.parse(localStorage.getItem("fDvalues"));
    setFdValues(fDvalues);
  }, []);

  const totalfDvalues = fDvalues.length;
  const totalDone = fDvalues.filter((task) => task.Expired === true).length;
  const totalPending = fDvalues.filter((task) => task.Expired === false).length;
  const totalUrgent = fDvalues.filter((task) => task.Starred === true).length;
  return (
    <BudgetNavigation>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
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
          path="/BudgetInput/*"
          element={<BudgetInput fullDispatch={fullDispatch} />}
        />
        <Route
          path="/ShoppingList/*"
          element={
            <ShoppingList
            // fDvalues={fDvalues}
            // setFdValues={setFdValues}
            // detailsList={detailsList}
            // setDetailslist={setDetailslist}
            // totalfDvalues={totalfDvalues}
            // totalDone={totalDone}
            // totalPending={totalPending}
            // totalUrgent={totalUrgent}
            />
          }
        />
        <Route
          path="/ShoppingInput/*"
          element={
            <ShoppingInput
            // fullDispatch={fullDispatch}
            // detailsList={detailsList}
            // setDetailslist={setDetailslist}
            // item={item}
            // setItem={setItem}
            // Allocated={Allocated}
            // setAllocated={setAllocated}
            // detailDispatch={detailDispatch}
            // count={count}
            // setCount={setCount}
            />
          }
        />
      </Routes>
    </BudgetNavigation>
  );
}

function BudgetNavigation(props) {
  const navItems = [
    { id: uuidv4(), title: "Dashboard", path: "./Dashboard" },
    { id: uuidv4(), title: "My Budgets", path: "./MyBudgets" },
    { id: uuidv4(), title: "Shopping", path: "./ShoppingList" },
  ];

  return (
    <section className=" w-full h-full flex flex-col p-1">
      <header className=" flex items-center justify-center gap-2 w-full h-14 rounded border bg-teal-950 p-1">
        {navItems.map((items) => {
          return (
            <NavLink
              to={items.path}
              key={items.id}
              className={({ isActive }) => {
                return (
                  "activeElement rounded-xl px-4 h-10 flex items-center justify-center " +
                  (isActive
                    ? "bg-teal-50 text-black font-medium"
                    : "bg-teal-950 text-white")
                );
              }}>
              <span className=" sm:hidden">{items.title}</span>
            </NavLink>
          );
        })}
      </header>
      <section className="w-full h-full">{props.children}</section>
    </section>
  );
}
