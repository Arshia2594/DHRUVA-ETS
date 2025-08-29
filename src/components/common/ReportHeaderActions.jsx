// import React from "react";
// import { FaDownload } from "react-icons/fa";
// import { FiSliders, FiToggleRight } from "react-icons/fi";

// const ReportHeaderActions = () => {
//   return (
//     <div className="flex items-center gap-4 text-sm text-gray-600">
//       <button className="hover:text-blue-600 flex items-center gap-1">
//         <FaDownload /> Export
//       </button>
//       <button className="hover:text-blue-600 flex items-center gap-1">
//         <FiToggleRight /> Rounding
//       </button>
//       <button className="hover:text-blue-600 flex items-center gap-1">
//         <FiSliders /> Show amount
//       </button>
//     </div>
//   );
// };

// export default ReportHeaderActions;

import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import MUIButton from "./MUIButton";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

const ReportHeaderActions = ({ rows }) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Weekly Timesheet Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Project", "Work Detail", "Date", "Start", "End", "Duration (mins)"]],
      body: rows.map((r) => [
        r.ProjectName,
        r.WorkDetail,
        r.WorkDate,
        r.StartTime,
        r.EndTime,
        r.TotalTimeSpentInMinutes,
      ]),
    });

    doc.save("Report.pdf");
  };

  const handleExportExcel = () => {
    const worksheetData = [
      ["Project", "Work Detail", "Date", "Start", "End", "Duration (mins)"],
      ...rows.map((r) => [
        r.ProjectName,
        r.WorkDetail,
        r.WorkDate,
        r.StartTime,
        r.EndTime,
        r.TotalTimeSpentInMinutes,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, "Report.xlsx");
  };

  return (
   <div className="flex gap-2">
  <MUIButton onClick={handleExportPDF}>
    <FaFilePdf className="w-4 h-4" />
    PDF
  </MUIButton>
  <MUIButton onClick={handleExportExcel}>
    <FaFileExcel className="w-4 h-4" />
    Excel
  </MUIButton>
</div>


  );
};

export default ReportHeaderActions;
