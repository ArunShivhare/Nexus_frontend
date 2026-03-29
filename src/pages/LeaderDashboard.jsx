import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LeaderDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  // ---------------- MEMBER ----------------
  const fetchMembers = async () => {
    const res = await axios.get(
      `https://nexus-backend-dioy.onrender.com/api/users/team/${user.email}`,
    );
    setMembers(res.data);
  };

  const addMember = async () => {
    await axios.post("https://nexus-backend-dioy.onrender.com/api/users/add-member", {
      leaderEmail: user.email,
      memberEmail: email,
    });
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
    await axios.post("https://nexus-backend-dioy.onrender.com/api/tasks/assign", {
      title,
      description,
      memberEmail: selectedMember,
      leaderEmail: user.email,
    });

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

      <div
        className="
        min-h-screen px-6 py-10 space-y-10

        bg-linear-to-br from-purple-50 via-white to-blue-50
        dark:from-black dark:via-gray-900 dark:to-black
      "
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Leader Dashboard 👑
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your team & tasks
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-6">
            {/* Assign Task */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
              <h2 className="font-semibold mb-4">Assign Task</h2>

              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-gray-800"
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-gray-800"
              />

              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-gray-800"
              >
                <option value="">Select Member</option>
                {members.map((m) => (
                  <option key={m._id} value={m.email}>
                    {m.name}
                  </option>
                ))}
              </select>

              <button
                onClick={assignTask}
                className="w-full bg-linear-to-r from-purple-600 to-blue-500 text-white py-2 rounded"
              >
                Assign Task
              </button>
            </div>

            {/* TASK TABLE */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
              <h2 className="font-semibold mb-4">Tasks Overview</h2>

              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th>Task</th>
                      <th>Assigned To</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task._id} className="border-b">
                        <td>{task.title}</td>
                        <td>{task.assignedTo?.name}</td>
                        <td
                          className={
                            task.status === "completed"
                              ? "text-green-500"
                              : "text-yellow-500"
                          }
                        >
                          {task.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Add Member */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
              <h2 className="mb-3">Add Member</h2>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 mb-3 rounded bg-gray-100 dark:bg-gray-800"
              />

              <button
                onClick={addMember}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Add
              </button>
            </div>

            {/* MEMBER STATS */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
              <h2 className="mb-4">Team Overview</h2>

              {members.map((m) => {
                const stats = getStats(m._id);
                return (
                  <div
                    key={m._id}
                    className="mb-3 p-3 bg-gray-100 dark:bg-gray-800 rounded"
                  >
                    <p className="font-medium">{m.name}</p>

                    <div className="text-xs text-gray-500 flex flex-wrap gap-2 mt-1">
                      <span>Total: {stats.total}</span>
                      <span className="text-green-500">
                        Completed: {stats.completed}
                      </span>
                      <span className="text-yellow-500">
                        Pending: {stats.pending}
                      </span>
                      <span className="text-red-500">
                        Failed: {stats.failed}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LeaderDashboard;
