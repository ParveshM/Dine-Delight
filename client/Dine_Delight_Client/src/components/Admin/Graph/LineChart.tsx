import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import { GraphData } from "../../../types/PropsType";
import { CalculateData } from "../../../utils/util";
import { labels } from "../../../constants";

Chart.register(CategoryScale);

const LineChart: React.FC<{ data?: GraphData[] }> = ({ data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Profit",
        data: CalculateData(data),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.08)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: "rgb(99, 102, 241)",
      },
    ],
  };

  return (
    <Line
      className="mt-2"
      data={chartData}
      options={{
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              drawOnChartArea: true,
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Monthly profit ",
          },
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        maintainAspectRatio: false,
      }}
    />
  );
};

export default LineChart;
