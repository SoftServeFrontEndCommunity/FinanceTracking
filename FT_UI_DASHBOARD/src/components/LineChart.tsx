import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chart.js/auto";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  incomeData: number[];
  expenseData: number[];
  months: string[];
}

export const LineChart: React.FC<LineChartProps> = ({
  incomeData,
  expenseData,
  months,
}) => {
  const data = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "#4CAF50", // Green color for income
        backgroundColor: "rgba(76, 175, 80, 0.2)", // Light green background
        tension: 0.3,
        borderWidth: 2,
      },
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "#F44336", // Red color for expenses
        backgroundColor: "rgba(244, 67, 54, 0.2)", // Light red background
        tension: 0.3,
        borderWidth: 2,
      },
    ],
  };

  // Set up the chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        backgroundColor: "#333",
        titleFont: {
          weight: "bold" as "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};
