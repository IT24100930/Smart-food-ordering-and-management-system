import Table from "../common/Table";

function UserTable({ users }) {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  return <Table columns={columns} data={users} />;
}

export default UserTable;
