import { useEffect, useState } from "react";
import UserTable from "../../components/admin/UserTable";
import PageHeader from "../../components/layout/PageHeader";
import { getAdminUsers } from "../../services/adminService";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAdminUsers().then(setUsers);
  }, []);

  return (
    <section>
      <PageHeader
        title="Manage Users"
        description="View users registered in the application."
      />
      <UserTable users={users} />
    </section>
  );
}

export default ManageUsers;
