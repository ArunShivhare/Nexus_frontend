import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

function Analytics({ tasks, members }) {
  // ---------------- STATUS DATA ----------------
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const failed = tasks.filter((t) => t.status === "failed").length;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "Failed", value: failed },
  ];

  // ---------------- MEMBER DATA ----------------
  const memberData = members.map((member) => {
    const memberTasks = tasks.filter(
      (t) => t.assignedTo?._id === member._id
    );

    return {
      name: member.name,
      tasks: memberTasks.length,
    };
  });

  // ---------------- TREND DATA ----------------
  const trendData = {};

  tasks.forEach((task) => {
    const date = new Date(task.createdAt).toLocaleDateString();

    if (!trendData[date]) trendData[date] = 0;

    trendData[date]++;
  });

  const trendArray = Object.keys(trendData).map((date) => ({
    date,
    tasks: trendData[date],
  }));

  // ---------------- SMART INSIGHTS ----------------
  const total = tasks.length;
  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  let insight = "";

  if (completionRate > 70) {
    insight = "🚀 Team performance is excellent!";
  } else if (completionRate > 40) {
    insight = "⚡ Performance is moderate, can improve.";
  } else {
    insight = "⚠️ Low completion rate, needs attention.";
  }

  // ---------------- UI ----------------
  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* 🧠 Insights Card */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-xl shadow col-span-2">
        <h3 className="font-semibold mb-1">🧠 Insights</h3>
        <p className="text-sm">{insight}</p>
        <p className="text-xs mt-1">Completion Rate: {completionRate}%</p>
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
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow">
        <h3 className="mb-3 font-semibold">Member Performance</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={memberData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Chart */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow col-span-2">
        <h3 className="mb-3 font-semibold">📈 Task Activity Trend</h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendArray}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tasks" stroke="#8b5cf6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Analytics;