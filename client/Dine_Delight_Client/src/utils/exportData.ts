import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ReportDataInterface } from "../types/PropsType";
import { RestaurantReportInterface } from "../types/RestaurantInterface";
import { useAppSelector } from "../redux/store/Store";

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
