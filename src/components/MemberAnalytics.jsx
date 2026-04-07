import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

function MemberAnalytics({ tasks }) {
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;
  const failed = tasks.filter(t => t.status === "failed").length;

  const total = tasks.length;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "Failed", value: failed },
  ];

  const progress =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  let insight = "";

  if (progress > 70) {
    insight = "🔥 You're performing great!";
  } else if (progress > 40) {
    insight = "⚡ Keep pushing, you're doing good.";
  } else {
    insight = "⚠️ Focus more on completing tasks.";
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">

      {/* Insights */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-xl shadow col-span-2">
        <h3 className="font-semibold mb-1">🧠 Your Performance</h3>
        <p className="text-sm">{insight}</p>
        <p className="text-xs mt-1">Completion Rate: {progress}%</p>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow">
        <h3 className="mb-3 font-semibold">Task Distribution</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={80}>
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow">
        <h3 className="mb-3 font-semibold">Progress</h3>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-purple-600 h-4 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm mt-2">{progress}% completed</p>
      </div>

    </div>
  );
}

export default MemberAnalytics;