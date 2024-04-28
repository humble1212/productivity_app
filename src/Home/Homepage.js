import { useState } from "react";

export default function Homepage() {
  const [firstDate, setfirstDate] = useState("");
  const [secondDate, setsecondDate] = useState("");

  let date1 = new Date(firstDate);
  let date2 = new Date(secondDate);

  // Calculating the time difference
  // of two dates
  let Difference_In_Time = date2.getTime() - date1.getTime();

  // Calculating the no. of days between
  // two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  // To display the final no. of days (result)
  const dateDifference = Math.round(Difference_In_Days / 365);

  return (
    <section className=" p-2">
      <h1>This is Homepage</h1>
      <input
        type="date"
        name="date"
        id="date"
        value={firstDate}
        onChange={(e) => {
          setfirstDate(e.target.value);
        }}
      />
      <input
        type="date"
        name="date"
        id="date"
        value={secondDate}
        onChange={(e) => {
          setsecondDate(e.target.value);
        }}
      />
      <span>{`${dateDifference} years`}</span>
    </section>
  );
}
