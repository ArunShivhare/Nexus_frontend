import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TaskChat from "../components/TaskChat";

function MemberDashboard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [activeChatTask, setActiveChatTask] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get(
      `https://nexus-backend-dioy.onrender.com/api/tasks/member/${user.email}`,
    );
    setTasks(res.data);
  };

  const markComplete = async (id) => {
    await axios.patch(
      `https://nexus-backend-dioy.onrender.com/api/tasks/complete/${id}`,
    );
    fetchTasks();
  };

  const markFailed = async (id) => {
    await axios.patch(
      `https://nexus-backend-dioy.onrender.com/api/tasks/failed/${id}`,
    );
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------- STATS ----------------
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const failed = tasks.filter((t) => t.status === "failed").length;
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <>
      <Navbar user={user} />

      <div className="min-h-svh w-full bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8 sm:space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Member Dashboard <span className="text-2xl">👤</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base">
              Your personal mission control. Track and execute tasks.
            </p>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                label: "Total",
                value: total,
                bg: "bg-slate-100 dark:bg-slate-800",
                color: "text-slate-900 dark:text-white",
              },
              {
                label: "Completed",
                value: completed,
                bg: "bg-emerald-100 dark:bg-emerald-900/30",
                color: "text-emerald-700 dark:text-emerald-400",
              },
              {
                label: "Pending",
                value: pending,
                bg: "bg-amber-100 dark:bg-amber-900/30",
                color: "text-amber-700 dark:text-amber-400",
              },
              {
                label: "Failed",
                value: failed,
                bg: "bg-red-100 dark:bg-red-900/30",
                color: "text-red-700 dark:text-red-400",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`${stat.bg} p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-[1.02]`}
              >
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                  {stat.label}
                </p>
                <p className={`text-2xl sm:text-3xl font-black ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* TASK LIST SECTION */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Your Missions
              </h2>
              <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-full text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
                {tasks.length} Assigned
              </span>
            </div>

            {tasks.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
                <p className="text-slate-400 font-medium">
                  No tasks assigned yet. Enjoy the breather! ✨
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                {[...tasks].reverse().map((task) => (
                  <div
                    key={task._id}
                    className="group relative bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {task.title}
                          </h3>
                          {/* NEW: Chat Toggle Button */}
                          <button
                            onClick={() => setActiveChatTask(task)}
                            className="p-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:scale-110 transition-transform relative group"
                            title="Open Task Chat"
                          >
                            <span className="text-lg">💬</span>
                            {/* Subtle notification dot if you want */}
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                          </button>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                              task.status === "completed"
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : task.status === "pending"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {task.status}
                            {/* <TaskChat taskId={task._id} user={user} /> */}
                          </span>
                        </div>

                        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                          {task.description.length > 100
                            ? task.description.slice(0, 100) + "..."
                            : task.description}
                        </p>

                        {task.description.length > 100 && (
                          <button
                            onClick={() => setSelectedTask(task)}
                            className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline mt-1"
                          >
                            Read more
                          </button>
                        )}

                        <div className="pt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[8px]">
                            {task.assignedBy?.name?.charAt(0)}
                          </div>
                          Assigned by {task.assignedBy?.name}
                        </div>
                      </div>

                      {/* Actions Box */}
                      {task.status === "pending" && (
                        <div className="flex sm:flex-col gap-5 shrink-0">
                          <button
                            onClick={() => markComplete(task._id)}
                            className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-slate-900/10"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => markFailed(task._id)}
                            className="flex-1 sm:flex-none px-6 py-2.5 bg-transparent border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 active:scale-95 transition-all"
                          >
                            Mark Failed
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      {/* CHAT OVERLAY */}
      {activeChatTask && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:justify-end p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[2rem] sm:rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/50">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Chat: {activeChatTask.title}
                </h4>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  Leader: {activeChatTask.assignedBy?.name}
                </p>
              </div>
              <button
                onClick={() => setActiveChatTask(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* The Actual Chat Component */}
            <div className="h-[450px] overflow-hidden">
              <TaskChat taskId={activeChatTask._id} user={user} />
            </div>
          </div>
        </div>
      )}

      {selectedTask && (
        <div
          onClick={() => setSelectedTask(null)} // click outside
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
            className="
        w-full max-w-lg max-h-[80vh] overflow-hidden
        p-6 rounded-2xl shadow-xl

        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        flex flex-col
      "
          >
            {/* Title */}
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              {selectedTask.title}
            </h2>

            {/* SCROLLABLE CONTENT */}
            <div className="overflow-y-auto pr-2 mb-6 space-y-2">
              {selectedTask.description.split("\n").map((line, i) => (
                <p
                  key={i}
                  className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed break-words"
                >
                  {line.split(" ").map((word, j) =>
                    word.startsWith("http") ? (
                      <a
                        key={j}
                        href={word}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 dark:text-purple-400 underline mr-1"
                      >
                        {word}
                      </a>
                    ) : (
                      word + " "
                    ),
                  )}
                </p>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MemberDashboard;
