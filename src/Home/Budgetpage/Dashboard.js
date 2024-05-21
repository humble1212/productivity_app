import { NavLink } from "react-router-dom";
export default function Dashboard(props) {
  return (
    <section className=" w-full h-full p-1 flex">
      <div className=" flex-1 h-full">
        <div className="flex w-full h-1/2">
          <div className=" h-full w-1/2 bg-green-100 p-2 flex">
            <div className="flex h-full flex-col items-center justify-center gap-4 w-full">
              <div className=" w-3/5 flex items-start justify-between gap-2">
                <strong className="flex w-1/6 h-12 items-center justify-center text-3xl font-bold">
                  {props.totalfDvalues}
                </strong>
                <p className="flex-1 flex flex-col items-start justify-end">
                  <span className=" text-lg font-bold">Budgets</span>
                  <span className=" text-xlg">List Currently Available</span>
                </p>
              </div>
              <div className="flex w-3/4 items-center justify-center font-bold">
                <button
                  type="button"
                  className="activeElement w-3/4 h-12 rounded-lg shadow-2xl bg-gray-100 text-center hover:bg-green-700 hover:text-white"
                  style={{ transition: "300ms ease-in-out" }}>
                  <NavLink
                    to={"../BudgetInput/"}
                    className={
                      "w-full h-full flex items-center justify-center p-2"
                    }>
                    Prepare New Budget +
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-2 items-center justify-evenly h-full w-1/2 bg-gray-50">
            <div className="flex flex-col">
              <strong className="flex w-full items-center justify-center text-3xl font-bold">
                {props.totalDone}
              </strong>
              <p className=" flex items-center w-full justify-center gap-2">
                <span className=" text-lg font-bold">Budget(s)</span>
                <span className=" text-xlg"> Expired</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full h-1/2">
          <div className="flex flex-col p-2 items-center justify-center gap-4 h-full flex-1 bg-gray-50">
            <div className="flex flex-col">
              <strong className="flex w-full items-center justify-center text-3xl font-bold">
                {props.totalPending}
              </strong>
              <p className=" flex items-center w-full justify-center gap-2">
                <span className=" text-lg font-bold">Active</span>
                <span className=" text-xlg"> Budget(s)</span>
              </p>
            </div>
            <div className="flex w-full items-center justify-center font-bold">
              <button
                type="button"
                className="activeElement w-3/5 h-12 rounded-full shadow-xl text-center hover:bg-green-700 hover:text-white"
                style={{ transition: "300ms ease-in-out" }}>
                <NavLink
                  to={"../MyBudgets"}
                  className={
                    "w-full h-full flex items-center justify-center p-2"
                  }>
                  View Budget List
                </NavLink>
              </button>
            </div>
          </div>
          <div className="flex-1 flex p-2 items-center justify-center h-full bg-teal-950 text-white">
            <div className="w-max flex flex-col items-start gap-2">
              <strong className=" text-3xl font-bold">
                {props.totalUrgent}
              </strong>
              <span> Budget(s)</span>
              <span> Flagged as important</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 h-full">
        <div className="flex w-full h-1/2">
          <div className="flex h-full flex-col items-center justify-center gap-4 w-1/2 bg-gray-500 text-white">
            <div className=" w-3/5 flex items-start justify-between gap-2">
              <strong className="flex w-1/6 h-12 items-center justify-center text-3xl font-bold">
                {props.totalfsvalues}
              </strong>
              <p className="flex-1 flex flex-col items-start justify-end">
                <span className=" text-lg font-bold">Shoppings</span>
                <span className=" text-xlg">List Currently Available</span>
              </p>
            </div>
            <div className="flex w-3/4 items-center justify-center font-bold">
              <button
                type="button"
                className="activeElement w-3/4 h-12 rounded-lg bg-teal-950 text-white text-center hover:bg-orange-500"
                style={{ transition: "300ms ease-in-out" }}>
                <NavLink
                  to={"../ShoppingInput/"}
                  className={
                    "w-full h-full flex items-center justify-center p-2"
                  }>
                  Prepare New List +
                </NavLink>
              </button>
            </div>
          </div>
          <span className=" h-full w-1/2 bg-gray-50">
            <div className="flex flex-col h-full items-center justify-center">
              <strong className="flex w-full items-center justify-center text-3xl font-bold">
                {props.totalpurchased}
              </strong>
              <p className=" flex items-center w-full justify-center gap-2">
                <span className=" text-lg font-bold">Shopping(s)</span>
                <span className=" text-xlg"> Completed </span>
              </p>
            </div>
          </span>
        </div>
        <div className="w-full h-1/2 flex items-center justify-evenly header--shadow font-bold">
          <div className="w-max h-full flex flex-col justify-center items-start">
            <strong className="flex w-full items-center justify-start text-3xl font-bold">
              {props.totalunpurchased}
            </strong>
            <span>Pending</span>
            <span> Shopping(s)</span>
          </div>
          <div className="flex flex-col p-2 items-start justify-center h-full">
            <strong className="flex w-full items-center justify-start text-3xl font-bold">
              {props.totalImportant}
            </strong>
            <span>Shopping List(s)</span>
            <span> Flagged as important</span>
          </div>
          <button
            type="button"
            className="activeElement w-1/4 h-11 rounded-lg bg-green-200 shadow-2xl text-center hover:bg-teal-950 hover:text-white mt-10"
            style={{ transition: "300ms ease-in-out" }}>
            <NavLink
              to={"../ShoppingList"}
              className={"w-full h-full flex items-center justify-center p-2"}>
              View Shopping List
            </NavLink>
          </button>
        </div>
      </div>
    </section>
  );
}
