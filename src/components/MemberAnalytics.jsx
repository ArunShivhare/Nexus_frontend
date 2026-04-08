import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"]; // Green, Yellow, Red

function MemberAnalytics({ tasks }) {
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const failed = tasks.filter((t) => t.status === "failed").length;
  const total = tasks.length;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "Failed", value: failed },
  ].filter(d => d.value > 0); // Hide empty sections

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Gradient Insight Card */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-5 rounded-[2rem] shadow-lg shadow-purple-500/20">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🧠</span>
          <h3 className="font-bold text-sm uppercase tracking-wider">AI Insight</h3>
        </div>
        <p className="text-sm font-medium leading-relaxed opacity-90">
          {progress > 70 ? "🔥 You're crushing it! Performance is peak." : 
           progress > 40 ? "⚡ Good pace. Keep closing those pending tasks." : 
           "⚠️ Focus required. Let's aim for a higher completion rate."}
        </p>
      </div>

      {/* 2. Modern Donut Chart Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Task Distribution</h3>
        
        <div className="h-[200px] w-full relative">
          {/* Centered Percentage Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{progress}%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Success</span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.name === "Completed" ? COLORS[0] : entry.name === "Pending" ? COLORS[1] : COLORS[2]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="flex justify-center gap-4 mt-2">
          {["Done", "Wait", "Fail"].map((label, i) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Progress Bar Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-end mb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Goal Progress</h3>
            <span className="text-xs font-black text-purple-600">{progress}%</span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MemberAnalytics;
