import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

interface BarChartProps {
  chartData: ChartData<"bar", number[], string>;
  chartTitle?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  chartData,
  chartTitle = "Bar Chart",
}) => {
  const options: ChartOptions<"bar"> = {
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
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};
