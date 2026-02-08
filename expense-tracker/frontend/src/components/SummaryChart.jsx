import { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryChart = () => {
  const [categories, setCategories] = useState([]);
  const [totals, setTotals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5001/categoryExpense", { withCredentials: true });
        if (res.status === 200) {
          const data = res.data;
          setCategories(data.map(item => item._id));
          setTotals(data.map(item => item.total));
        }
      } catch (err) {
        console.log("Chart fetch error:", err.message);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: totals,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <h2>Category Expense Chart</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default SummaryChart;
