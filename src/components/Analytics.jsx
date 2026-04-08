import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
    const memberTasks = tasks.filter((t) => t.assignedTo?._id === member._id);

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 🧠 Insights Card */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-xl shadow md:col-span-2">
        <h3 className="font-semibold mb-1">🧠 Insights</h3>
        <p className="text-sm">{insight}</p>
        <p className="text-xs mt-1">Completion Rate: {completionRate}%</p>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow md:col-span-2">
        <h3 className="mb-4 font-bold text-lg text-slate-800 dark:text-white">
          Task Distribution
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60} // Makes it a Donut Chart
              outerRadius={90}
              paddingAngle={5} // Adds space between segments
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              } // Shows % on chart
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />

            {/* Legend makes the colors understandable at a glance */}
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow md:col-span-2">
        <h3 className="mb-4 font-bold text-lg text-slate-800 dark:text-white">
          Member Performance
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={memberData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            {/* Grid lines make it easier to track values */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
              opacity={0.5}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              interval={0} // Shows all names even if many members
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />

            <Tooltip
              cursor={{ fill: "#f1f5f9" }} // Subtle hover background
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
            />

            <Bar
              dataKey="tasks"
              fill="#6366f1"
              radius={[6, 6, 0, 0]} // Rounded top corners
              barSize={40} // Consistent bar width
              label={{
                position: "top",
                fill: "#64748b",
                fontSize: 12,
                offset: 8,
              }} // Shows number on top
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow md:col-span-2">
        <h3 className="mb-4 font-bold text-lg text-slate-800 dark:text-white">
          📈 Task Activity Trend
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={trendArray}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {/* Defines the smooth purple gradient */}
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
              opacity={0.5}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
            />

            {/* The Area provides the gradient fill, the Line provides the stroke */}
            <Area
              type="monotone"
              dataKey="tasks"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTasks)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;
