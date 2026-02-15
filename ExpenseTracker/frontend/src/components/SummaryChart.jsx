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
  const [error, setError] = useState(null);

  useEffect(() => 
  {
    const fetchData = async () => 
    {
      try 
      {
        const res = await axios.get("http://localhost:5001/categoryExpense", { withCredentials: true });
        if (res.status === 200) 
        {
          const data = res.data;
          setCategories(data.map(item => item._id));
          setTotals(data.map(item => item.total));
        }
      } 
      catch (err) 
      {
        const message = err.response?.data?.errors?.general || err.message || "Could not fetch chart data";
        setError(message);
        console.log("Chart fetch error:", message);
      }
    };
    fetchData();
  }, []);

  const chartData = 
  {
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
    <div className="w-72 mx-auto mt-8 p-4 rounded-xl shadow-md text-zinc-100 text-center">
      <h2 className="text-lg font-semibold mb-4 text-blue-500">Category Expense Chart</h2>
      {error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <Doughnut data={chartData} style={{ width: "200px", height: "200px", margin: "0 auto" }}/>
      )}
    </div>
  );
};

export default SummaryChart;
