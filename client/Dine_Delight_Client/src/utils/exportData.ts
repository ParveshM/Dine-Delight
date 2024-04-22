import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ReportDataInterface } from "../types/PropsType";
import { RestaurantReportInterface } from "../types/RestaurantInterface";

const PDF_MARGIN_LEFT = 40;
const PDF_FONT_SIZE = 15;

export function pdfGenerator(
  data: ReportDataInterface[] | RestaurantReportInterface[],
  startDate: string,
  endDate: string,
  heading: string,
  role: string | null
) {
  try {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(PDF_FONT_SIZE);

    const title = `${startDate}-${endDate} ${heading}`;
    let tableData: any[] = [];
    let headers: string[][] = [];

    if (role === "admin") {
      const reportData = data as ReportDataInterface[];
      headers.push(["SL", "Restaurant Name", "Date", "Amount"]); // headers for table

      tableData = reportData.map((d, i) => [
        i + 1,
        d.restaurant.restaurantName,
        new Date(d.createdAt).toLocaleDateString(),
        d.adminPayment,
      ]);

      const totalSum = reportData.reduce(
        (sum, item) => (sum += item.adminPayment),
        0
      );
      tableData.push(["Total", "", "", totalSum]);
    } else {
      const reportData = data as RestaurantReportInterface[];
      headers.push([
        "SL",
        "Booking ID",
        "Customer name",
        "Table Number",
        "Date",
        "Time",
        "No:guest",
        "Payment Method",
        "Booking Status",
        "Amount",
      ]);

      tableData = reportData.map((d, i) => [
        i + 1,
        d.bookingId,
        d.user.name,
        d.table.tableNumber,
        new Date(d.createdAt).toLocaleDateString(),
        `${d.tableSlot.startTime} - ${d.tableSlot.endTime}`,
        d.table.capacity,
        d.paymentMethod,
        d.bookingStatus,
        d.totalAmount,
      ]);
      const totalSum = reportData.reduce(
        (sum, item) => (sum += item.totalAmount),
        0
      );
      tableData.push(["Total", "", "", "", "", "", "", "", "", totalSum]);
    }

    const tableOptions = {
      startY: 50,
      head: headers,
      body: tableData,
    };

    doc.text(title, PDF_MARGIN_LEFT, 40);
    autoTable(doc, tableOptions);
    doc.save(`${startDate}-${endDate}_report.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}

export const arrayToExcel = (function () {
  //STEP 2: Append Table data to Spreadsheet XML Template.
  const createXMLTable = (table: string, fileName: string) => {
    const xmlTable = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns="http://www.w3.org/TR/REC-html40"
      >
         <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
         <head>
            <xml>
              <x:ExcelWorkbook>
                  <x:ExcelWorksheets>
                      <x:ExcelWorksheet>
                          <x:Name>${fileName}</x:Name>
                          <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
                      </x:ExcelWorksheet>
                  </x:ExcelWorksheets>
              </x:ExcelWorkbook>
            </xml>
         </head>
         <body>
           ${table}
         </body>
      </html> `;
    return xmlTable;
  };

  //STEP 3: Create fileURL from XML template for download
  const createFileUrl = (xmlTable: string) => {
    const tableBlob = new Blob([xmlTable], {
      type: "application/vnd.ms-excel;base64,",
    });
    const downloadURL = URL.createObjectURL(tableBlob);
    return downloadURL;
  };

  //STEP 5: Create download link on button click
  const downloadFile = (downloadURL: string, fileName: string) => {
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    downloadLink.download = fileName;
    downloadLink.href = downloadURL;
    downloadLink.click();
  };

  return {
    convertArrayToTable: async (
      apiArray: RestaurantReportInterface[] | ReportDataInterface[],
      fileName: string,
      role: string | null
    ) => {
      let tableHeaders: string;
      let tableRows;
      if (role === "admin") {
        const data = apiArray as ReportDataInterface[];
        const headers = ["SL", "Restaurant Name", "Date", "Amount"];

        tableHeaders = `<tr>${headers
          .map((header) => `<td>${header}</td>`)
          .join("")}</tr>`;
        let row: string[];
        row = data.map((d, i) => {
          return `<tr>
          <td>${i + 1}</td>
          <td>${d.restaurant.restaurantName}</td>
          <td>${new Date(d.createdAt).toLocaleDateString()}</td>
          <td>${d.adminPayment}</td>
        </tr>`;
        });

        const totalSum = data.reduce(
          (sum, item) => (sum += item.adminPayment),
          0
        );
        row.push(`<tr>
        <td>Total :</td>
        <td></td>
        <td></td>
        <td>${totalSum}</td>       
      </tr>`);
        tableRows = row.join("");
      } else {
        const data = apiArray as RestaurantReportInterface[];
        const headers = [
          "SL",
          "Booking ID",
          "Customer name",
          "Table Number",
          "Date",
          "Time",
          "No:guest",
          "Payment Method",
          "Booking Status",
          "Amount",
        ];
        tableHeaders = `<tr>${headers
          .map((header) => `<td>${header}</td>`)
          .join("")}</tr>`;

        let row: string[];
        row = data.map((d, i) => {
          return `<tr>
                <td>${i + 1}</td>
                <td>${d.bookingId}</td>
                <td>${d.user.name}</td>
                <td>${d.table.tableNumber}</td>
                <td>${new Date(d.createdAt).toLocaleDateString()}</td>
                <td>${d.tableSlot.startTime} - ${d.tableSlot.endTime}</td>
                <td>${d.table.capacity}</td>
                <td>${d.paymentMethod}</td>
                <td>${d.bookingStatus}</td>
                <td>${d.totalAmount}</td>
              </tr>`;
        });

        const totalSum = data.reduce(
          (sum, item) => (sum += item.totalAmount),
          0
        );
        row.push(`<tr>
        <td>Total :</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>${totalSum}</td>
      </tr>`);
        tableRows = row.join("");
      }

      const table = `<table>${tableHeaders}${tableRows}</table>`.trim();
      const xmlTable = createXMLTable(table, fileName);
      const downloadURL = createFileUrl(xmlTable);
      downloadFile(downloadURL, fileName);
    },
  };
})();
