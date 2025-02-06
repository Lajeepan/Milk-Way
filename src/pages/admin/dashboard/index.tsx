
import Sidebar from "@/src/components/admin/sidebar-component/Sidebar";
import Stats from "@/src/components/admin/stats-component/Stats";
import UserTable from "@/src/components/admin/usertable-component/UserTable";

const AdminPage: React.FC = () => {


  return (
    <div>
      <Sidebar />
      <Stats />
      <UserTable />
      {/* Other components for the admin page */}
    </div>
  );
};

export default AdminPage;
