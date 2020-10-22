import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { FileText } from "react-feather";
interface PropTypes {
  csvData: any;
  fileName: string;
}

const ExportExcel: React.FC<PropTypes> = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  //*Export Excel
  const exportToExcel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    csvData: any,
    fileName: string
  ) => {
    event.preventDefault();
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div className="mr-3 sm:mb-0 mb-2 ">
      <button
        className="flex items-center bg-green-500 hover:bg-green-400 py-1 px-4 text-white rounded-sm"
        onClick={(event) => exportToExcel(event, csvData, fileName)}
      >
        <span>Export</span>
        <i className="ml-3">
          <FileText size="20" />
        </i>
      </button>
    </div>
  );
};

export default ExportExcel;
