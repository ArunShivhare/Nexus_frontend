import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TaskChat from "../components/TaskChat";

const LeaderDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [showAllTasks, setShowAllTasks] = useState(false);

  // ---------------- MEMBER ----------------
  const fetchMembers = async () => {
    const res = await axios.get(
      `https://nexus-backend-dioy.onrender.com/api/users/team/${user.email}`,
    );
    setMembers(res.data);
  };

  const addMember = async () => {
    await axios.post(
      "https://nexus-backend-dioy.onrender.com/api/users/add-member",
      {
        leaderEmail: user.email,
        memberEmail: email,
      },
    );
    setEmail("");
    fetchMembers();
  };

  // ---------------- TASK ----------------
  const fetchTasks = async () => {
    const res = await axios.get(
      `https://nexus-backend-dioy.onrender.com/api/tasks/leader/${user.email}`,
    );
    setTasks(res.data);
  };

  const assignTask = async () => {
    await axios.post(
      "https://nexus-backend-dioy.onrender.com/api/tasks/assign",
      {
        title,
        description,
        memberEmail: selectedMember,
        leaderEmail: user.email,
      },
    );

    setTitle("");
    setDescription("");
    setSelectedMember("");
    fetchTasks();
  };

  useEffect(() => {
    fetchMembers();
    fetchTasks();
  }, []);

  // ---------------- MEMBER STATS ----------------
  const getStats = (memberId) => {
    const memberTasks = tasks.filter(
      (task) => task.assignedTo?._id === memberId,
    );

    return {
      total: memberTasks.length,
      completed: memberTasks.filter((t) => t.status === "completed").length,
      pending: memberTasks.filter((t) => t.status === "pending").length,
      failed: memberTasks.filter((t) => t.status === "failed").length,
    };
  };

  return (
    <>
      <Navbar user={user} />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 transition-colors overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                Leader Dashboard <span className="text-2xl">👑</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Monitor performance and orchestrate team tasks.
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                Live Updates
              </span>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column: Task Creation & Table (8 Units) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Assign Task Card */}
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-4 sm:p-6 md:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                  Assign New Mission
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <input
                      placeholder="Task Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <textarea
                      placeholder="Provide a clear description..."
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 dark:text-white"
                    />
                  </div>

                  <select
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-slate-900 dark:text-white appearance-none cursor-pointer"
                  >
                    <option value="">Assign to Member</option>
                    {members.map((m) => (
                      <option key={m._id} value={m.email}>
                        {m.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={assignTask}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold py-3 rounded-xl hover:opacity-90 transition-all active:scale-95"
                  >
                    Deploy Task
                  </button>
                </div>
              </div>

              {/* Task Overview Table */}
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Active Operations
                  </h2>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {tasks.length} Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-950/50">
                      <tr className="text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">
                        <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4">
                          Task Name
                        </th>
                        <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4">
                          Assignee
                        </th>
                        <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {/* Logic: If showAllTasks is true, show all. If false, show only first 5 */}
                      {(showAllTasks
                        ? [...tasks].reverse()
                        : [...tasks].reverse().slice(0, 5)
                      ).map((task) => (
                        <tr
                          key={task._id}
                          className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="px-8 py-5 font-semibold text-slate-700 dark:text-slate-200">
                            {task.title}
                          </td>
                          <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-[10px] text-purple-600 font-bold">
                                {task.assignedTo?.name?.charAt(0)}
                              </div>
                              <span className="text-slate-600 dark:text-slate-400 text-sm">
                                {task.assignedTo?.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                                task.status === "completed"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              }`}
                            >
                              {task.status}
                              <TaskChat taskId={task._id} user={user} />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Only show button if there are more than 5 tasks */}
                {tasks.length > 5 && (
                  <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-center bg-slate-50/30 dark:bg-slate-950/20">
                    <button
                      onClick={() => setShowAllTasks(!showAllTasks)}
                      className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline transition-all"
                    >
                      {showAllTasks
                        ? "Show Less"
                        : `View All Operations (${tasks.length})`}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Add Member & Stats (4 Units) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Add Member Card */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-purple-500/20">
                <h2 className="text-lg font-bold mb-2">Grow the Squad</h2>
                <p className="text-purple-100 text-xs mb-6 font-medium">
                  Invite a new member via email.
                </p>

                <div className="space-y-3">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="team@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/50 outline-none focus:bg-white/20 transition-all text-sm"
                  />
                  <button
                    onClick={addMember}
                    className="w-full bg-white text-purple-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-lg"
                  >
                    Send Invite
                  </button>
                </div>
              </div>

              {/* Team Performance Stats */}
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                  Leaderboard
                </h2>

                <div className="space-y-4">
                  {members.map((m) => {
                    const stats = getStats(m._id);
                    return (
                      <div
                        key={m._id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            {m.name}
                          </span>
                          {/* <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md font-black">LVL 1</span> */}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-bold uppercase tracking-tighter">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-800/30">
                            <span className="p-1">Total:</span> {stats.total}
                          </div>
                          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-800/30">
                            <span className="p-1">Done:</span> {stats.completed}
                          </div>
                          <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg text-amber-600 dark:text-amber-400 border border-amber-100/50 dark:border-amber-800/30">
                            <span className="p-1">Wait:</span> {stats.pending}
                          </div>
                          <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-red-600 dark:text-red-400 border border-red-100/50 dark:border-red-800/30">
                            <span className="p-1">Fail:</span> {stats.failed}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LeaderDashboard;
