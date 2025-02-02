import AdminDashboard from "@/src/components/admin/sidebar-component/Sidebar";
import Stats from "@/src/components/admin/stats-component/Stats";
import UserTable from "@/src/components/admin/usertable-component/UserTable";





const Product: React.FC = () => {
  return (
    <div>
        <AdminDashboard/>
        <Stats/>
        <UserTable/>

      {/* Add other components or content here */}
    </div>
  );
};

export default Product;