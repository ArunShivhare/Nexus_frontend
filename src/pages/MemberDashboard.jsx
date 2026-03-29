import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MemberDashboard({ user }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get(
      `https://nexus-backend-dioy.onrender.com/api/tasks/member/${user.email}`
    );
    setTasks(res.data);
  };

  const markComplete = async (id) => {
    await axios.patch(`https://nexus-backend-dioy.onrender.com/api/tasks/complete/${id}`);
    fetchTasks();
  };

  const markFailed = async (id) => {
    await axios.patch(`https://nexus-backend-dioy.onrender.com/api/tasks/failed/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ---------------- STATS ----------------
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;
  const failed = tasks.filter(t => t.status === "failed").length;

  return (
    <>
      <Navbar user={user} />

      <div className="
        min-h-screen px-6 py-10 space-y-10

        bg-linear-to-br from-purple-50 via-white to-blue-50
        dark:from-black dark:via-gray-900 dark:to-black
      ">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Member Dashboard 👤
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track your assigned work
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border text-center">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-xl font-bold">{total}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border text-center">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-xl font-bold text-green-500">{completed}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border text-center">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-xl font-bold text-yellow-500">{pending}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border text-center">
            <p className="text-sm text-gray-500">Failed</p>
            <p className="text-xl font-bold text-red-500">{failed}</p>
          </div>

        </div>

        {/* TASK LIST */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">

          <h2 className="font-semibold mb-4">Your Tasks</h2>

          {tasks.length === 0 ? (
            <p className="text-gray-400">No tasks assigned</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800"
                >
                  <h3 className="font-semibold text-lg">{task.title}</h3>

                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {task.description}
                  </p>

                  <p className="text-xs mt-2">
                    Assigned by: {task.assignedBy?.name}
                  </p>

                  {/* Status */}
                  <p className={`mt-2 text-sm font-medium
                    ${task.status === "completed" && "text-green-500"}
                    ${task.status === "pending" && "text-yellow-500"}
                    ${task.status === "failed" && "text-red-500"}
                  `}>
                    Status: {task.status}
                  </p>

                  {/* Actions */}
                  {task.status === "pending" && (
                    <div className="flex gap-3 mt-3">

                      <button
                        onClick={() => markComplete(task._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Complete
                      </button>

                      <button
                        onClick={() => markFailed(task._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Fail
                      </button>

                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
      <Footer />
    </>
  );
}

export default MemberDashboard;