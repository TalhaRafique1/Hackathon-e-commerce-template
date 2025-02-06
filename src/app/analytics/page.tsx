"use client";

import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Required for Doughnut Chart
);

const AnalyticsDashboard = () => {
  // Data for KPIs
  const kpiData = [
    { title: "Total Sales", value: "$12,345", change: "+5.2%", changeType: "positive" },
    { title: "User Traffic", value: "45,678", change: "+12.3%", changeType: "positive" },
    { title: "Popular Products", value: "3,456", change: "-2.1%", changeType: "negative" },
  ];

  // Data for the bar chart (Sales by Month)
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales ($)",
        data: [5000, 7000, 4500, 8000, 6000, 9000, 7500],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for the line chart (User Traffic)
  const trafficData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Users",
        data: [10000, 12000, 11000, 14000, 13000, 15000, 14500],
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
      },
    ],
  };

  // Data for the Donut Chart (Sales Distribution by Category)
  const donutData = {
    labels: ["Sedans", "SUVs", "Luxury Cars", "Economy Cars"],
    datasets: [
      {
        label: "Sales Distribution",
        data: [30, 25, 20, 25], // Percentage distribution
        backgroundColor: [
          "rgba(59, 130, 246, 0.6)", // Blue
          "rgba(16, 185, 129, 0.6)", // Green
          "rgba(245, 158, 11, 0.6)", // Yellow
          "rgba(239, 68, 68, 0.6)", // Red
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600">Track and analyze your platforms performance.</p>
      </div>

      {/* KPIs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{kpi.title}</h2>
                <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
              </div>
              <div
                className={`p-3 rounded-full ${
                  kpi.changeType === "positive" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <p
                  className={`text-sm ${
                    kpi.changeType === "positive" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {kpi.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart - Sales */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales by Month</h2>
          <p className="text-sm text-gray-600 mb-6">Monthly sales data for the current year.</p>
          <Bar
            data={salesData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                  },
                },
                x: {
                  grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                  },
                },
              },
            }}
          />
        </div>

        {/* Line Chart - User Traffic */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Traffic</h2>
          <p className="text-sm text-gray-600 mb-6">Monthly user activity and engagement.</p>
          <Line
            data={trafficData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                  },
                },
                x: {
                  grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Donut Chart Section */}
      <div className="mt-12">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Sales Distribution by Category</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">Breakdown of sales across different car categories.</p>
          <div className="flex justify-center">
            <Doughnut
              data={donutData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                  title: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;