import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { bookingStatisticsInterface } from "../../../types/PropsType";
import { getBookingStatusData } from "../../../utils/util";
import { statusLabel } from "../../../constants";

Chart.register(CategoryScale);
const PieChart: React.FC<{ data?: bookingStatisticsInterface[] }> = ({
  data,
}) => {
  const chartData = {
    labels: statusLabel,
    datasets: [
      {
        label: "Booking Status",
        data: getBookingStatusData(data),
        backgroundColor: [
          "rgba(245, 158, 11, 0.6)",
          "rgba(16, 185, 129, 0.6)",
          "rgba(239, 68, 68, 0.6)",
          "rgba(59, 130, 246, 0.6)",
          "rgba(107, 114, 128, 0.6)",
          "rgba(99, 102, 241, 0.6)",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut
      className="mt-2"
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Booking Statistics",
          },
        },
        layout: {
          padding: 20,
        },
      }}
    />
  );
};

export default PieChart;
