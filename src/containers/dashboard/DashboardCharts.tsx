"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import WeeklySales from "./WeeklySales";
import BestSellers from "./BestSellers";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip
);

export default function DashboardCharts() {
  ChartJS.defaults.font.family = "'Poppins', sans-serif";
  ChartJS.defaults.font.size = 12;
  ChartJS.defaults.font.weight = "normal";
  ChartJS.defaults.responsive = true;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <WeeklySales />
      <BestSellers />
    </div>
  );
}
