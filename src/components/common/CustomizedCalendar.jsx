
// import React, { useState } from "react";
// import {
//   Calendar,
//   dateFnsLocalizer,
//   Views,
//   momentLocalizer,
// } from "react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { addDays } from "date-fns";
// import enUS from "date-fns/locale/en-US";

// // Setup localizer
// const locales = {
//   "en-US": enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// // Dummy event data
// const events = [
//   {
//     id: 1,
//     title: "Project Meeting",
//     start: new Date(),
//     end: addDays(new Date(), 1),
//   },
//   {
//     id: 2,
//     title: "Code Review",
//     start: addDays(new Date(), 2),
//     end: addDays(new Date(), 2),
//   },
// ];

// const CustomCalendar = () => {
//   const [view, setView] = useState(Views.WEEK);
//   const [date, setDate] = useState(new Date());

//   const handleNavigate = (action) => {
//     switch (action) {
//       case "TODAY":
//         setDate(new Date());
//         break;
//       case "PREV":
//         setDate((prevDate) => addDays(prevDate, -7));
//         break;
//       case "NEXT":
//         setDate((prevDate) => addDays(prevDate, 7));
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="p-4 shadow-md rounded-lg bg-white">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">My Calendar</h2>
//         <div className="flex gap-2">
//           <button
//             onClick={() => handleNavigate("TODAY")}
//             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//           >
//             Today
//           </button>
//           <button
//             onClick={() => handleNavigate("PREV")}
//             className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
//           >
//             Prev
//           </button>
//           <button
//             onClick={() => handleNavigate("NEXT")}
//             className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
//           >
//             Next
//           </button>
//           <select
//             value={view}
//             onChange={(e) => setView(e.target.value)}
//             className="border rounded px-2 py-1 text-sm"
//           >
//             <option value="month">Month</option>
//             <option value="week">Week</option>
//             <option value="day">Day</option>
//             <option value="agenda">Agenda</option>
//           </select>
//         </div>
//       </div>

//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         date={date}
//         view={view}
//         onView={(newView) => setView(newView)}
//         onNavigate={(newDate) => setDate(newDate)}
//         style={{ height: 500 }}
//       />
//     </div>
//   );
// };

// export default CustomCalendar;

// src/components/common/CustomCalendar.jsx

import React, { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import addDays from "date-fns/addDays";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    id: 1,
    title: "Project Meeting",
    start: new Date(),
    end: addDays(new Date(), 1),
  },
  {
    id: 2,
    title: "Code Review",
    start: addDays(new Date(), 2),
    end: addDays(new Date(), 2),
  },
];

const CustomCalendar = () => {
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const handleNavigate = (action) => {
    switch (action) {
      case "TODAY":
        setDate(new Date());
        break;
      case "PREV":
        setDate(addDays(date, view === "month" ? -30 : -7));
        break;
      case "NEXT":
        setDate(addDays(date, view === "month" ? 30 : 7));
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6 rounded-lg bg-white shadow-md">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        {/* <h2 className="text-2xl font-bold text-gray-800">📅 Calendar Overview</h2> */}

        <div className="flex gap-2 items-center">
          <button
            onClick={() => handleNavigate("TODAY")}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
          >
            Today
          </button>
          <button
            onClick={() => handleNavigate("PREV")}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
          >
            Prev
          </button>
          <button
            onClick={() => handleNavigate("NEXT")}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
          >
            Next
          </button>
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="border px-2 py-1 rounded text-sm focus:outline-none"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
            <option value="agenda">Agenda</option>
          </select>
        </div>
      </div>

      {/* Calendar */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        view={view}
        onView={(newView) => setView(newView)}
        onNavigate={(newDate) => setDate(newDate)}
        style={{ height: 550 }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "#2563eb", // Tailwind blue-600
            color: "white",
            borderRadius: "6px",
            padding: "2px 4px",
            fontWeight: "500",
          },
        })}
      />
    </div>
  );
};

export default CustomCalendar;
