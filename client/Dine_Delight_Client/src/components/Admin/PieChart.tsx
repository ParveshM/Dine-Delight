import { useState } from "react";
import { Data } from "../../constants";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(CategoryScale);
const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="h-[400px] flex justify-center items-center">
      <>
        <Doughnut
          className="h-[200px] w-full"
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Users Gained between 2016-2020",
              },
            },
            layout: {
              padding: 20,
            },
          }}
        />
      </>
    </div>
  );
};

export default PieChart;
