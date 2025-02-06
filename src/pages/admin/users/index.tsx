import UsersList from "@/src/components/admin/user-component/User";
import Sidebar from "@/src/components/admin/sidebar-component/Sidebar";

const User: React.FC = () => {
  return (
    <div>
       <Sidebar/>
        <UsersList/>
       
      {/* Add other components or content here */}
    </div>
  );
};

export default User;