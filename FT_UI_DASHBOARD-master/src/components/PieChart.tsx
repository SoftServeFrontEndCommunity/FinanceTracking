import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface PieChartProps {
  chartData: ChartData<"pie", number[], string>;
  chartTitle?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  chartData,
  chartTitle = "Pie Chart",
}) => {
  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
    >
      <Pie data={chartData} options={options} />
    </div>
  );
};
