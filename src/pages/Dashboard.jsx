import LeaderDashboard from "./LeaderDashboard";
import MemberDashboard from "./MemberDashboard";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "leader") {
    return <LeaderDashboard user={user} />;
  }

  return <MemberDashboard user={user} />;
}

export default Dashboard;